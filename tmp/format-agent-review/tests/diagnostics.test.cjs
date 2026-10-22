const test = require('node:test');
const assert = require('node:assert/strict');
const { inspectLayout, bounds } = require('../api/diagnostics');
const { FormatTools, decodeFile } = require('../api/format-tools');
const component = (type, extra = {}) => ({ type, x: 10, y: 20, width: 5, height: 5, ...extra });
const layout = (...items) => ({ listaDocumentos: [{ name: 'Frente01', documentSize: { width: 614, height: 296 }, layout: items }] });
const config = { webBaseUrl: 'http://localhost:8081', apiBaseUrl: 'http://localhost:8082', diagnosticFunctions: ['MASCARA'], timeoutMs: 2000 };
const reply = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

test('literal text is never a native call; explicit embedded fields are', () => {
  const value = layout(component('text', { content: 'Caro (a)' }), component('text', { content: 'MASCARA(123,99)' }),
    component('text', { content: [{ type: 'campoSaida', expression: 'MASCARA(Valor, "999")' }] }),
    component('text', { content: '\x1bC\x01RTRIMM(Nome)\x01\x1b' }));
  const report = inspectLayout(value, { catalogue: ['MASCARA', 'RTRIMM'] });
  assert.deepEqual(report.functions.map(item => item.name), ['MASCARA', 'RTRIMM']);
  assert.equal(report.findings.filter(item => item.code === 'FUNCTION_NOT_EXPORTED').length, 0);
});

test('inventories include all component types and detail children, without mixing conditions', () => {
  const value = layout(component('text'), component('image'), component('barcode'), component('qrcode'),
    component('fio'), component('blocoEnderecamento', { campos: [{ expressao: 'MASCARA(Valor,99)' }] }),
    component('detalhe', { nome: 'LIN01', conditional: 'TipoDet = 30', condDet: 'Imprimir = 1',
      nCab: 0, nDet: 1, nRod: 0, nSum: 0, bandas: [{ kind: 'detalhe', defined: true,
        expressaoCondicao: 'TipoDet = 31', camposSaida: [component('campoSaida', { expressao: 'GetStr(Linha,1,36)' })] }] }));
  const report = inspectLayout(value);
  assert.equal(report.elements.length, 8);
  const window = report.elements.find(item => item.name === 'LIN01');
  assert.equal(window.conditional, 'TipoDet = 30'); assert.equal(window.printCondition, 'Imprimir = 1');
  const child = report.elements.find(item => item.parentId);
  assert.equal(child.bandKind, 'detalhe'); assert.equal(child.coordinateSpace, 'band-local');
  assert.equal(report.checks.dllCatalogue, 'not-executed');
});

test('snapshot identities change with file version, not repeated observation', () => {
  const value = layout(component('text', { content: 'A' }));
  const first = inspectLayout(value), again = inspectLayout(value);
  assert.equal(first.elements[0].id, again.elements[0].id);
  const changed = inspectLayout(layout(component('text', { content: 'B' })));
  assert.notEqual(first.elements[0].id, changed.elements[0].id);
});

test('LIN10 uses rotated legacy bounds and stays inside the document', () => {
  const window = component('detalhe', { x: 409.448, y: 292.1, width: 16.9333333333, height: 185.42, orientation: 90 });
  const rectangle = bounds(window);
  assert.ok(Math.abs(rectangle.left - 224.028) < 0.001);
  assert.ok(Math.abs(rectangle.top - 275.1666666667) < 0.001);
  assert.equal(inspectLayout(layout(window)).findings.filter(item => item.code === 'DETAIL_OUTSIDE_DOCUMENT').length, 0);
});

test('missing resources are distinct from resources not checked and dynamic images', () => {
  const value = layout(component('image', { occurrence: 'Logo.gif' }),
    component('image', { occurrence: '${CodServico}_2.jpg' }),
    component('text', { content: [{ type: 'text', content: '\x1bL\x01Assinatura.gif\x01\x1b' }] }));
  const unchecked = inspectLayout(value);
  assert.equal(unchecked.findings.filter(item => item.code === 'RESOURCE_NOT_SUPPLIED').length, 0);
  const checked = inspectLayout(value, { resources: [] });
  assert.equal(checked.findings.filter(item => item.code === 'RESOURCE_NOT_SUPPLIED').length, 2);
  assert.equal(checked.findings.filter(item => item.code === 'DYNAMIC_RESOURCE').length, 1);
});

test('unknown function is a finding only when the current catalogue was read', () => {
  const value = layout(component('campoSaida', { expressao: 'INEXISTENTE(Valor)' }));
  assert.equal(inspectLayout(value).findings.length, 0);
  assert.equal(inspectLayout(value, { catalogue: ['MASCARA'] }).findings[0].code, 'FUNCTION_NOT_EXPORTED');
});

test('decode validates payloads instead of accepting arbitrary file names or garbage', () => {
  assert.throws(() => decodeFile({ base64: 'not-base64!' }), /invalido/);
  assert.throws(() => decodeFile({ base64: 'a' }), /invalido/);
  assert.equal(decodeFile({ base64: 'YWJj', name: '../test.f' }).name, 'test.f');
});

test('diagnostic cannot invent an inventory without a current source', async () => {
  const tools = new FormatTools(config, { fetchImpl: () => { throw new Error('not called'); } });
  await assert.rejects(tools.diagnose({}), error => error.status === 400);
});

test('diagnostic uses CSRF and real route contracts, without save mutations', async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ route: url.pathname, options });
    if (url.pathname === '/api/app/config') return reply({ data: { csrf: { token: 'csrf-test', headerName: 'X-XSRF-TOKEN' } } }, 200, { 'set-cookie': 'XSRF-TOKEN=csrf-cookie; Path=/' });
    if (url.pathname === '/api/preview-layout') {
      assert.equal(options.headers['X-XSRF-TOKEN'], 'csrf-test');
      assert.match(options.headers.cookie, /XSRF-TOKEN=csrf-cookie/);
      assert.equal(options.body.get('layoutFile').name, 'sample.f');
      return reply({ success: true, data: { layout: layout(component('text', { content: 'Caro (a)' })) } });
    }
    if (url.pathname === '/api/default-user-function-dll') return reply({ data: { functions: ['MASCARA'] } });
    if (url.pathname === '/api/layout-preview') {
      const request = JSON.parse(options.body.get('layout'));
      return reply({ data: { pageIndex: request.pageIndex, page: { name: request.pageIndex ? 'Verso50' : 'Frente47' } } });
    }
    if (url.pathname === '/api/user-functions/execute') return reply({ result: '123.456.789-01' });
    throw new Error('Rota inesperada: ' + url.pathname);
  };
  const tools = new FormatTools(config, { fetchImpl, webToken: 'web-secret', apiToken: 'api-secret' });
  const report = await tools.diagnose({ arquivo: { name: 'sample.f', base64: 'YWJj' }, recursos: [],
    dados: { name: 'data.txt', base64: 'WA==' }, verificarPreview: true, paginas: [0, 1],
    testesFuncoes: [{ functionName: 'MASCARA', arguments: ['12345678901', '999.999.999-99'], expected: '123.456.789-01' }] });
  assert.equal(report.preview.allRequestedPassed, true);
  assert.equal(report.functionTests[0].matchesExpected, true);
  assert.equal(report.validationComplete, false);
  assert.equal(report.executions.length, 6);
  assert.equal(calls.some(call => /save|processar|formatar/.test(call.route)), false);
  assert.equal(JSON.stringify(report).includes('web-secret'), false);
});

test('clamped preview page is not counted as a verified requested page', async () => {
  const fetchImpl = async url => url.pathname === '/api/app/config'
    ? reply({ data: { csrf: { token: 'x', headerName: 'X-XSRF-TOKEN' } } })
    : reply({ data: { pageIndex: 0, page: { name: 'Frente' } } });
  const result = await new FormatTools(config, { fetchImpl }).preview(layout(component('text')), { name: 'data.txt', base64: 'WA==' }, [9]);
  assert.equal(result.allRequestedPassed, false); assert.equal(result.results[0].status, 'not-confirmed');
});

test('unauthorized catalogue remains explicitly unverified', async () => {
  const fetchImpl = async () => reply({ message: 'Autenticacao necessaria' }, 401);
  const report = await new FormatTools(config, { fetchImpl }).diagnose({ layout: layout(component('text')) });
  assert.equal(report.checks.dllCatalogue, 'not-executed');
  assert.equal(report.executions[0].status, 'failed');
  assert.equal(report.validationComplete, false);
});

test('native calls require both catalogue evidence and diagnostic capability', async () => {
  const tools = new FormatTools(config, { fetchImpl: () => { throw new Error('not called'); } });
  await assert.rejects(tools.functionTest({ functionName: 'ANYTHING', arguments: [] }, ['ANYTHING']), /conjunto/);
  await assert.rejects(tools.functionTest({ functionName: 'MASCARA', arguments: [] }, []), /catalogo/);
});

test('stored project checks ownership first and uses a load route without migration', async () => {
  const calls = [];
  const fetchImpl = async url => {
    calls.push(url.pathname);
    if (url.pathname === '/api/project-assets') return reply({ data: [{ name: 'data.txt' }] });
    if (url.pathname === '/api/load-layout') return reply({ data: { layoutJson: JSON.stringify(layout(component('text'))) } });
    if (url.pathname === '/api/default-user-function-dll') return reply({ data: { functions: ['MASCARA'] } });
    if (url.pathname === '/api/app/config') return reply({ data: { csrf: { token: 'x', headerName: 'X-XSRF-TOKEN' } } });
    if (url.pathname === '/api/layout-preview') return reply({ data: { pageIndex: 0, page: { name: 'Frente01' } } });
    throw new Error('Unexpected route');
  };
  const result = await new FormatTools(config, { fetchImpl }).diagnose({ projectId: 'abc-123', dataAssetPath: 'data.txt', verificarPreview: true, paginas: [0] });
  assert.equal(calls[0], '/api/project-assets'); assert.equal(calls[1], '/api/load-layout');
  assert.equal(calls.includes('/api/load-project'), false);
  assert.equal(result.preview.allRequestedPassed, true);
});

test('denied project ownership never calls the layout reader', async () => {
  const calls = [];
  const fetchImpl = async url => { calls.push(url.pathname); return reply({ success: false, message: 'Acesso negado' }, 403); };
  await assert.rejects(new FormatTools(config, { fetchImpl }).diagnose({ projectId: 'abc-123' }), /Acesso negado/);
  assert.deepEqual(calls, ['/api/project-assets']);
});
