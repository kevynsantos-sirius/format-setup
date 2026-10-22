const { inspectLayout } = require('./diagnostics');
const { digest } = require('./knowledge');

class FormatToolError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}
function decodeFile(file, limit = 32 * 1024 * 1024) {
  if (!file || typeof file.base64 !== 'string' || !file.base64.length) throw new FormatToolError('arquivo.base64 obrigatorio', 400);
  const base64 = file.base64.replace(/\s/g, '');
  if (base64.length > Math.ceil(limit / 3) * 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) throw new FormatToolError('Base64 invalido ou arquivo excede o limite de diagnostico (32 MiB)', 400);
  const bytes = Buffer.from(base64, 'base64');
  if (!bytes.length || bytes.length > limit || bytes.toString('base64').replace(/=+$/, '') !== base64.replace(/=+$/, '')) throw new FormatToolError('Arquivo base64 invalido', 400);
  return { bytes, name: String(file.name || 'layout.f').replace(/.*[\\/]/, '') };
}
class FormatTools {
  constructor(config, { fetchImpl = fetch, webToken = process.env.FORMAT_WEB_BEARER_TOKEN,
    apiToken = process.env.FORMAT_API_BEARER_TOKEN, authorization = '' } = {}) {
    this.config = config;
    this.fetch = fetchImpl;
    this.tokens = { web: webToken || authorization.replace(/^Bearer\s+/i, ''), api: apiToken };
    this.executions = [];
    this.cookies = '';
    this.csrf = null;
    for (const key of ['webBaseUrl', 'apiBaseUrl']) {
      const url = new URL(config[key]);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') throw new Error(`${key} deve ser uma origem HTTP configurada, sem credenciais ou caminho`);
    }
  }
  async request(service, route, options = {}) {
    const base = service === 'web' ? this.config.webBaseUrl : this.config.apiBaseUrl;
    if (!route.startsWith('/')) throw new Error('Rota invalida');
    const headers = { ...(options.headers || {}) };
    if (this.tokens[service]) headers.authorization = `Bearer ${this.tokens[service]}`;
    if (service === 'web' && this.cookies) headers.cookie = this.cookies;
    if (service === 'web' && this.csrf && options.method === 'POST') headers[this.csrf.headerName] = this.csrf.token;
    const execution = { service, method: options.method || 'GET', route, startedAt: new Date().toISOString(), status: 'running' };
    this.executions.push(execution);
    try {
      const response = await this.fetch(new URL(route, base), { ...options, headers, redirect: 'error', signal: AbortSignal.timeout(this.config.timeoutMs || 120000) });
      const cookies = response.headers.getSetCookie?.() || [];
      if (service === 'web' && cookies.length) {
        const jar = new Map(this.cookies.split('; ').filter(Boolean).map(item => item.split(/=(.*)/s).slice(0, 2)));
        for (const cookie of cookies) { const pair = cookie.split(';')[0]; const index = pair.indexOf('='); jar.set(pair.slice(0, index), pair.slice(index + 1)); }
        this.cookies = [...jar].map(([name, value]) => `${name}=${value}`).join('; ');
      }
      const text = await response.text();
      let body;
      try { body = JSON.parse(text); } catch { throw new FormatToolError(`Resposta nao JSON em ${service}${route} (HTTP ${response.status})`, response.status); }
      execution.httpStatus = response.status;
      if (!response.ok || body.success === false) throw new FormatToolError(body.message || body.error?.details || `Falha HTTP ${response.status}`, response.status);
      execution.status = 'executed';
      return body;
    } catch (error) {
      execution.status = 'failed';
      execution.message = error.message;
      throw error;
    } finally { execution.finishedAt = new Date().toISOString(); }
  }
  async prepareCsrf() {
    if (this.csrf) return;
    const body = await this.request('web', '/api/app/config');
    this.csrf = body.data?.csrf;
    if (!this.csrf?.token || !this.csrf.headerName) throw new FormatToolError('Format Web nao retornou CSRF para as chamadas de diagnostico', 403);
  }
  async parse(file) {
    const decoded = decodeFile(file);
    await this.prepareCsrf();
    const form = new FormData();
    form.append('layoutFile', new Blob([decoded.bytes]), decoded.name);
    const body = await this.request('web', '/api/preview-layout', { method: 'POST', body: form });
    if (!body.data?.layout?.listaDocumentos?.length) throw new FormatToolError('Leitor do Format nao retornou documentos', 422);
    return { layout: body.data.layout, fileHash: digest(decoded.bytes) };
  }
  async catalogue() {
    const body = await this.request('web', '/api/default-user-function-dll');
    if (!Array.isArray(body.data?.functions) || !body.data.functions.length) throw new FormatToolError('Catalogo da DLL vazio', 422);
    return body.data.functions;
  }
  async loadProject(projectId) {
    if (typeof projectId !== 'string' || !/^[A-Za-z0-9-]{1,100}$/.test(projectId)) throw new FormatToolError('projectId invalido', 400);
    // project-assets checks ownership. load-project additionally runs a legacy
    // migration, so use load-layout for this read-only diagnostic instead.
    if (this.checkedProject !== projectId) await this.projectResources(projectId);
    const body = await this.request('web', `/api/load-layout?layoutId=${encodeURIComponent(projectId)}&version=1`);
    const layout = JSON.parse(body.data?.layoutJson || 'null');
    if (!layout?.listaDocumentos?.length) throw new FormatToolError('Projeto nao retornou documentos', 422);
    return layout;
  }
  async projectResources(projectId) {
    if (typeof projectId !== 'string' || !/^[A-Za-z0-9-]{1,100}$/.test(projectId)) throw new FormatToolError('projectId invalido', 400);
    const body = await this.request('web', `/api/project-assets?projectId=${encodeURIComponent(projectId)}`);
    if (!Array.isArray(body.data)) throw new FormatToolError('Projeto nao retornou lista de recursos', 422);
    this.checkedProject = projectId;
    this.loadedResources = body.data.map(asset => ({ name: asset.name }));
    return this.loadedResources;
  }
  async preview(layout, data, pages = [0, 1], context = {}) {
    const decoded = data ? decodeFile(data) : null;
    if (!decoded && !(context.projectId && typeof context.dataAssetPath === 'string' && context.dataAssetPath.trim())) throw new FormatToolError('dados ou projectId/dataAssetPath obrigatorios para preview', 400);
    if (!Array.isArray(pages) || !pages.length || pages.length > 10 || pages.some(index => !Number.isInteger(index) || index < 0)) throw new FormatToolError('paginas deve conter de 1 a 10 indices inteiros (base zero)', 400);
    await this.prepareCsrf();
    const results = [];
    for (const index of [...new Set(pages)]) {
      try {
        const form = new FormData();
        form.append('layout', JSON.stringify({ ...layout, pageIndex: index }));
        if (decoded) form.append('dataFile', new Blob([decoded.bytes]), decoded.name);
        else { form.append('projectId', context.projectId); form.append('dataAssetPath', context.dataAssetPath); }
        const body = await this.request('web', '/api/layout-preview', { method: 'POST', body: form });
        const actual = body.data;
        results.push({ requestedPageIndex: index, pageIndex: actual?.pageIndex,
          document: actual?.page?.name, totalPreviewPages: actual?.totalPreviewPages,
          status: actual?.pageIndex === index && actual?.page ? 'executed' : 'not-confirmed' });
      } catch (error) { results.push({ requestedPageIndex: index, status: 'failed', message: error.message }); }
    }
    return { requestedOnly: true, results, allRequestedPassed: results.every(item => item.status === 'executed') };
  }
  async functionTest(test, catalogue) {
    const name = String(test.functionName || '').toUpperCase();
    if (!catalogue?.some(item => item.toUpperCase() === name)) throw new FormatToolError('Funcao nao verificada no catalogo atual da DLL', 400);
    if (!this.config.diagnosticFunctions.includes(name)) throw new FormatToolError('Funcao fora do conjunto de testes de diagnostico configurados', 400);
    if (!Array.isArray(test.arguments) || test.arguments.length > 8 || test.arguments.some(value => typeof value !== 'string')) throw new FormatToolError('arguments deve conter ate 8 strings', 400);
    const body = await this.request('api', '/api/user-functions/execute', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ functionName: name, arguments: test.arguments }) });
    return { functionName: name, status: 'executed', result: body.result,
      matchesExpected: Object.hasOwn(test, 'expected') ? body.result === test.expected : null };
  }
  async diagnose(body) {
    if (!body.arquivo && !body.layout && !body.projectId) throw new FormatToolError('arquivo, layout ou projectId obrigatorio', 400);
    if (body.projectId) await this.projectResources(body.projectId);
    let layout, fileHash, source;
    if (body.arquivo) { ({ layout, fileHash } = await this.parse(body.arquivo)); source = 'format-web:/api/preview-layout'; }
    else if (body.projectId && !body.layout) { layout = await this.loadProject(body.projectId); source = 'format-web:/api/load-layout'; }
    else { layout = body.layout; source = 'provided-layout-json-not-binary-verified'; }
    const resources = body.recursos == null && body.projectId ? this.loadedResources : body.recursos;
    let catalogue = null, catalogueError;
    try { catalogue = await this.catalogue(); } catch (error) { catalogueError = error.message; }
    const report = inspectLayout(layout, { fileHash, source, catalogue, resources });
    if (catalogueError) report.limitations.push(`Catalogo DLL nao confirmado: ${catalogueError}`);
    if (body.verificarPreview === true) {
      report.preview = await this.preview(layout, body.dados, body.paginas || [0, 1], body);
      report.checks.nativePreview = report.preview.allRequestedPassed ? 'executed-requested-pages' : 'failed-or-not-confirmed';
    }
    if (body.testesFuncoes) {
      if (!Array.isArray(body.testesFuncoes) || body.testesFuncoes.length > 10) throw new FormatToolError('Limite de 10 testes de funcao', 400);
      report.functionTests = [];
      for (const test of body.testesFuncoes) {
        try { report.functionTests.push(await this.functionTest(test, catalogue)); }
        catch (error) { report.functionTests.push({ functionName: test.functionName, status: 'failed', message: error.message }); }
      }
    }
    report.executions = this.executions;
    report.validationComplete = false;
    report.outcome = report.findings.some(item => item.severity === 'error') || report.preview?.allRequestedPassed === false
      || report.functionTests?.some(test => test.status !== 'executed' || test.matchesExpected === false)
      ? 'issues-detected' : 'no-errors-in-executed-checks';
    return report;
  }
}
module.exports = { FormatTools, FormatToolError, decodeFile };
