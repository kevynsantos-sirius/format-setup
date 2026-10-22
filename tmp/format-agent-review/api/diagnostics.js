const { digest } = require('./knowledge');

const bandLists = ['camposTexto', 'camposSaida', 'barCodes', 'barCodesBi', 'logos', 'fios'];
const kinds = ['cabecalho', 'detalhe', 'rodape', 'sumario'];
const builtin = new Set(['IF', 'OR', 'AND', 'NOT', 'RTRIM', 'LTRIM', 'TRIM', 'TRIMM', 'VALNUM', 'I2OF5']);
function bounds(item) {
  const { x, y, width, height } = item;
  if (![x, y, width, height].every(Number.isFinite)) return null;
  let angle = Number(item.orientation) || 0;
  if (item.type === 'detalhe' || item.type === 'campoSaida') angle = (360 - angle) % 360;
  const topAnchored = item.type === 'image' || item.type === 'blocoEnderecamento';
  const top = topAnchored ? 0 : -height;
  const radians = angle * Math.PI / 180, cos = Math.cos(radians), sin = Math.sin(radians);
  const points = [[0, top], [width, top], [width, top + height], [0, top + height]]
    .map(([dx, dy]) => [x + dx * cos - dy * sin, y + dx * sin + dy * cos]);
  return { left: Math.min(...points.map(p => p[0])), top: Math.min(...points.map(p => p[1])),
    right: Math.max(...points.map(p => p[0])), bottom: Math.max(...points.map(p => p[1])) };
}
function callNames(expression) {
  const unquoted = String(expression).replace(/"(?:""|[^"])*"|'(?:''|[^'])*'/g, '');
  return [...unquoted.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)].map(match => match[1].toUpperCase());
}
function explicitTextExpressions(content) {
  if (Array.isArray(content)) return content.flatMap(node => {
    if (['campoSaida', 'outputField', 'output-field'].includes(node?.type) || node?.expressao || node?.expression) {
      return [node.expressao || node.expression || node.content || ''];
    }
    return explicitTextExpressions(node?.content);
  });
  if (typeof content !== 'string') return [];
  return [...content.matchAll(/\x1bC\x01([^\x1b\x01]*)[^\x1b]*\x1b/g)].map(match => match[1]);
}
function textValues(content) {
  if (typeof content === 'string') return [content];
  if (Array.isArray(content)) return content.flatMap(node => textValues(node?.content));
  return [];
}
function resourceName(value) {
  return String(value || '').replace(/\\/g, '/').split('/').pop().replace(/^['"]|['"]$/g, '').toLowerCase();
}
function inspectLayout(layout, options = {}) {
  if (!layout || !Array.isArray(layout.listaDocumentos) || !layout.listaDocumentos.length) {
    throw new Error('Layout sem listaDocumentos; nao ha inventario verificavel');
  }
  const snapshot = options.fileHash || digest(JSON.stringify(layout));
  const prefix = snapshot.slice(0, 16);
  const elements = [], documents = [], findings = [], functions = new Map(), resources = new Map();
  const catalogue = options.catalogue ? new Set(options.catalogue.map(name => String(name).toUpperCase())) : null;
  const supplied = options.resources == null ? null : new Set(options.resources.map(item => resourceName(item.name || item)));
  function finding(code, severity, id, message) { findings.push({ code, severity, elementId: id, message }); }
  function expression(value, id, scope) {
    if (!value) return;
    for (const name of callNames(value)) {
      if (builtin.has(name)) continue;
      if (!functions.has(name)) functions.set(name, []);
      functions.get(name).push({ elementId: id, scope });
      if (catalogue && !catalogue.has(name)) finding('FUNCTION_NOT_EXPORTED', 'error', id, `${name} nao consta no catalogo atual da DLL (${scope}).`);
    }
  }
  function resource(reference, id) {
    if (!reference || typeof reference !== 'string' || reference.startsWith('data:')) return;
    const literal = reference.trim().replace(/^['"]|['"]$/g, '');
    const isStatic = !/[|(){}]/.test(literal) && /\.(bmp|gif|png|jpe?g|tiff?|ps|pdf)$/i.test(literal);
    const name = resourceName(literal);
    if (!resources.has(literal)) resources.set(literal, { reference: literal, static: isStatic, elements: [] });
    resources.get(literal).elements.push(id);
    if (!isStatic) finding('DYNAMIC_RESOURCE', 'info', id, 'Recurso dinamico depende do registro e precisa ser resolvido no preview.');
    else if (supplied && !supplied.has(name)) finding('RESOURCE_NOT_SUPPLIED', 'warning', id, `Recurso referenciado nao informado: ${name}`);
  }
  function visit(component, documentIndex, pointer, parent = null, group = null) {
    if (!component || typeof component !== 'object') return;
    const id = `${prefix}:${pointer}`;
    const entry = { id, pointer, documentIndex, parentId: parent, bandKind: group,
      type: component.type || 'unknown', name: component.nome || component.name || '',
      conditional: component.conditional || '', orientation: Number(component.orientation) || 0,
      xMm: component.x, yMm: component.y, widthMm: component.width, heightMm: component.height,
      boundsMm: bounds(component), coordinateSpace: parent ? 'band-local' : 'document',
      expression: component.type === 'campoSaida' ? component.expressao || component.expression || '' : undefined,
      label: String(typeof component.content === 'string' ? component.content : component.nome || '').slice(0, 180) };
    elements.push(entry);
    expression(component.conditional, id, 'condition');
    if (component.type === 'campoSaida') expression(component.expressao || component.expression, id, 'output-field');
    if (component.type === 'text') {
      explicitTextExpressions(component.content).forEach(value => expression(value, id, 'embedded-output-field'));
      for (const raw of textValues(component.content)) {
        for (const token of raw.matchAll(/\x1bL\x01([^\x1b\x01]+)/g)) resource(token[1], id);
      }
    }
    if (component.type === 'image') {
      const reference = component.assetPath || component.logoFileName || component.occurrence || component.content;
      resource(reference, id);
      if (typeof reference === 'string' && /\bIF\s*\(|\|/.test(reference)) expression(reference, id, 'image-occurrence');
    }
    if (component.type === 'blocoEnderecamento') {
      for (const [i, field] of (component.campos || []).entries()) expression(field.expressao, id, `address-field-${i}`);
    }
    if (component.type === 'detalhe') {
      entry.printCondition = component.condDet || '';
      entry.bandCounts = { cabecalho: component.nCab, detalhe: component.nDet, rodape: component.nRod, sumario: component.nSum };
      expression(component.condDet, id, 'print-condition');
      expression(component.condQuebra, id, 'break-condition');
      if (component.usaDetIndexado) expression(component.ocorrenciaIndDet, id, 'indexed-detail');
      const bands = component.bandas || [];
      bands.forEach((band, bandIndex) => {
        const kind = band.kind;
        if (!kinds.includes(kind)) finding('BAND_GROUP_UNKNOWN', 'warning', id, 'Banda sem grupo explicito; conferir importacao antes de editar.');
        const bandPointer = `${pointer}/bandas/${bandIndex}`;
        expression(band.expressaoCondicao, `${prefix}:${bandPointer}`, 'band-selection');
        for (const list of bandLists) (band[list] || []).forEach((child, i) => visit(child, documentIndex, `${bandPointer}/${list}/${i}`, id, kind));
      });
      for (const [kind, count] of Object.entries(entry.bandCounts)) {
        const actual = bands.filter(band => band.kind === kind && (band.defined || band.expressaoCondicao || bandLists.some(key => band[key]?.length))).length;
        if (Number.isFinite(count) && actual !== count) finding('BAND_COUNT_MISMATCH', 'warning', id, `${kind}: contagem ${count}, definicoes ${actual}.`);
      }
    }
    // Rotated detail windows have a verified legacy anchor; other types require
    // their own rendering conventions before asserting an out-of-bounds error.
    if (!parent && component.type === 'detalhe' && entry.boundsMm) {
      const size = layout.listaDocumentos[documentIndex].documentSize || layout.listaDocumentos[documentIndex].size;
      const b = entry.boundsMm, tolerance = 0.15;
      if (size && (b.left < -tolerance || b.top < -tolerance || b.right > size.width + tolerance || b.bottom > size.height + tolerance)) {
        finding('DETAIL_OUTSIDE_DOCUMENT', 'warning', id, 'Limites da janela rotacionada ultrapassam o documento.');
      }
    }
    if (![component.x, component.y, component.width, component.height].every(Number.isFinite)) {
      finding('GEOMETRY_NOT_NUMERIC', 'warning', id, 'Coordenadas/dimensoes ausentes ou nao numericas.');
    }
  }
  layout.listaDocumentos.forEach((page, index) => {
    documents.push({ index, name: page.name, componentCount: page.layout?.length || 0,
      documentExpression: page.documentExpression, size: page.documentSize || page.size });
    expression(page.documentExpression, `${prefix}:/listaDocumentos/${index}`, 'document-selection');
    (page.layout || []).forEach((item, i) => visit(item, index, `/listaDocumentos/${index}/layout/${i}`));
  });
  return { schemaVersion: 1, snapshotSha256: snapshot, observedAt: new Date().toISOString(),
    source: options.source || 'provided-layout-json', documents, elements, findings,
    functions: [...functions].map(([name, occurrences]) => ({ name, exported: catalogue ? catalogue.has(name) : null, occurrences })),
    resources: [...resources.values()], checks: {
      structure: 'executed', dllCatalogue: catalogue ? 'executed' : 'not-executed',
      suppliedResources: supplied ? 'executed' : 'not-executed', nativePreview: 'not-executed', finalPdf: 'not-executed'
    }, limitations: ['Inventario JSON nao valida byte a byte o binario.',
      'Ausencia de alerta estrutural nao confirma resultado visual, todas as paginas ou PDF final.',
      'IDs e caminhos pertencem somente ao snapshot informado; remapear apos alteracoes.',
      'Geometria de filhos e relativa a banda; nao comparar diretamente ao papel.'] };
}
function brief(report, question = '') {
  const query = String(question).toLowerCase();
  const selected = report.elements.filter(item => item.name && query.includes(item.name.toLowerCase())).slice(0, 8);
  return { snapshotSha256: report.snapshotSha256, source: report.source, observedAt: report.observedAt,
    documents: report.documents.length, elements: report.elements.length, checks: report.checks,
    targets: selected, findings: report.findings.slice(0, 12), findingCount: report.findings.length,
    preview: report.preview, functionTests: report.functionTests, outcome: report.outcome,
    validationComplete: report.validationComplete, limitations: report.limitations };
}
module.exports = { inspectLayout, bounds, callNames, explicitTextExpressions, brief };
