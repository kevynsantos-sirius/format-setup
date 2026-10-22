const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const stop = new Set('a o e os as de da do das dos em no na para por com um uma que como qual quais onde isso esse essa sobre preciso gostaria saber ponto pontof format sistema aplicacao'.split(' '));
function terms(text) {
  return [...new Set(normalize(text).match(/[a-z0-9_]{2,}/g) || [])].filter(word => !stop.has(word));
}
function loadConfig(root, mode = 'dev') {
  const name = mode === 'usuario' ? 'context-sources-usuario.json' : 'context-sources.json';
  return JSON.parse(fs.readFileSync(path.join(root, 'config', name), 'utf8').replace(/^\uFEFF/, ''));
}
function outputPath(root, mode) {
  return path.join(root, 'context', mode === 'usuario' ? 'usuario' : '', 'chunks',
    mode === 'usuario' ? 'ponto-f-usuario-context.jsonl' : 'ponto-f-context.jsonl');
}
function split(text, size, overlap) {
  if (!(size > 0) || overlap < 0 || overlap >= size) throw new Error('chunkSize/chunkOverlap invalidos');
  const chunks = [];
  for (let offset = 0; offset < text.length;) {
    const end = Math.min(offset + size, text.length);
    chunks.push(text.slice(offset, end));
    if (end === text.length) break;
    offset = end - overlap;
  }
  return chunks;
}
function buildIndex(root, mode = 'dev', config = loadConfig(root, mode)) {
  const records = [], files = [], skipped = [], seen = new Set();
  const excluded = new Set(config.excludeDirectories.map(name => name.toLowerCase()));
  const timestamp = new Date().toISOString();
  function visit(file, source) {
    const absolute = path.resolve(file);
    if (absolute.split(/[\\/]/).some(part => excluded.has(part.toLowerCase()))) return;
    if ((config.excludePathContains || []).some(fragment => normalize(absolute).includes(normalize(fragment)))) return;
    const stat = fs.lstatSync(absolute);
    if (stat.isSymbolicLink()) return;
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(absolute).sort()) visit(path.join(absolute, entry), source);
      return;
    }
    if (!config.includeExtensions.includes(path.extname(absolute).toLowerCase())) return;
    const canonical = fs.realpathSync(absolute).toLowerCase();
    if (seen.has(canonical)) return;
    seen.add(canonical);
    if (stat.size > config.maxFileBytes) { skipped.push({ path: absolute, reason: 'maxFileBytes' }); return; }
    const bytes = fs.readFileSync(absolute);
    const text = bytes.toString('utf8').replace(/^\uFEFF/, '');
    if (!text.trim()) return;
    const sourceHash = digest(bytes);
    files.push({ path: absolute, sha256: sourceHash, bytes: stat.size, source: source.name });
    split(text, config.chunkSize, config.chunkOverlap).forEach((chunk, index) => records.push({
      schemaVersion: 2, id: digest(`${absolute}\n${sourceHash}\n${index}`),
      source: source.name, path: absolute, extension: path.extname(absolute), chunk: index + 1,
      sourceHash, indexedAt: timestamp, text: chunk
    }));
  }
  for (const source of config.sources) {
    if (!fs.existsSync(source.path)) throw new Error(`Fonte configurada ausente: ${source.path}`);
    visit(source.path, source);
  }
  // Reviewed atomic facts share the index and its provenance, rather than
  // allowing the small language model to rewrite domain semantics.
  const factFile = path.join(root, 'knowledge', 'regras-verificadas.json');
  if (fs.existsSync(factFile)) {
    const bytes = fs.readFileSync(factFile), facts = JSON.parse(bytes.toString('utf8'));
    const sourceHash = digest(bytes);
    const ids = new Set();
    for (const [index, fact] of facts.entries()) {
      const proofPath = path.resolve(root, 'knowledge', fact.source);
      if (!proofPath.startsWith(path.resolve(root, 'knowledge') + path.sep) || !fact.id || ids.has(fact.id)
        || !fact.answer || !Array.isArray(fact.match) || !fact.match.length || fact.match.some(group => !Array.isArray(group) || !group.length)) throw new Error('Fato verificado invalido');
      const proof = fs.readFileSync(proofPath);
      if (!fact.quote || !proof.toString('utf8').includes(fact.quote)) throw new Error(`Evidencia ausente para ${fact.id}`);
      ids.add(fact.id);
      records.push({ schemaVersion: 2, kind: 'verified-fact', factId: fact.id, match: fact.match,
        id: digest(`${factFile}\n${sourceHash}\n${index}`), source: 'memoria-atomica-revisada', path: factFile,
        sourceHash, chunk: index + 1, indexedAt: timestamp, text: fact.answer,
        proofPath, proofHash: digest(proof), proofQuote: fact.quote });
    }
    files.push({path: factFile, sha256: sourceHash, bytes: bytes.length, source: 'memoria-atomica-revisada'});
  }
  if (!records.length) throw new Error('Nenhum conhecimento encontrado; indice anterior preservado');
  const output = outputPath(root, mode);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const temporary = `${output}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, records.map(item => JSON.stringify(item)).join('\n') + '\n');
  fs.renameSync(temporary, output);
  const summary = { schemaVersion: 2, generatedAt: timestamp, mode, output,
    totalFiles: files.length, totalChunks: records.length, files, skipped,
    indexSha256: digest(fs.readFileSync(output)) };
  const summaryPath = path.join(path.dirname(path.dirname(output)), 'index', 'summary.json');
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  const legacySummary = path.join(path.dirname(summaryPath), mode === 'usuario'
    ? 'ponto-f-usuario-context-summary.json' : 'ponto-f-context-summary.json');
  fs.writeFileSync(legacySummary, JSON.stringify({ ...summary, files: files.map(item => item.path), sourceFiles: files }, null, 2));
  return summary;
}
function retrieve(records, question, config = {}) {
  const aliases = { validar: ['validacao', 'validate'], validacao: ['validar', 'validate'],
    condicao: ['conditional', 'exprcond'], cabecalho: ['ncab'], funcoes: ['funcao', 'dll'] };
  const original = terms(question);
  const query = [...new Set(original.flatMap(term => [term, ...(aliases[term] || [])]))];
  if (!query.length) return [];
  const frequencies = new Map(query.map(term => [term, records.filter(record => terms(record.text).includes(term)).length]));
  const normalizedQuestion = normalize(question);
  const matchedFacts = records.filter(record => record.kind === 'verified-fact' && record.match.every(group => group.some(term => new RegExp(`(^|[^a-z0-9_])${normalize(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9_]|$)`).test(normalizedQuestion))))
    .map(record => ({...record, retrievalScore: record.match.flat().filter(term => normalizedQuestion.includes(normalize(term))).reduce((sum, term) => sum + term.length, 0)}))
    .sort((a,b) => b.retrievalScore-a.retrievalScore).slice(0,3);
  if (matchedFacts.length) return matchedFacts;
  const ranked = records.filter(record => record.kind !== 'verified-fact').map(record => {
    const words = normalize(record.text).match(/[a-z0-9_]{2,}/g) || [];
    const queryHits = query.filter(term => words.includes(term));
    if (!queryHits.length) return { ...record, retrievalScore: 0 };
    const lengthPenalty = 0.6 + 0.4 * words.length / 350;
    let score = queryHits.reduce((sum, term) => {
      const frequency = words.filter(word => word === term).length;
      const idf = Math.log(1 + (records.length + 1) / (1 + frequencies.get(term)));
      return sum + idf * frequency / (frequency + lengthPenalty);
    }, 0);
    score *= 1 + queryHits.length / query.length;
    if (/PONTO_F_(REVISAO_2026|DIAGNOSTICO|CONTRATOS_API|VALIDACAO_USUARIO)/.test(record.path)) score *= 1.25;
    return { ...record, retrievalScore: score };
  }).filter(record => record.retrievalScore > 0).sort((a, b) => b.retrievalScore - a.retrievalScore);
  const selected = [], pathCounts = new Map();
  let remaining = config.maxContextChars || 4200;
  for (const record of ranked) {
    if (selected.length >= (config.maxChunksInPrompt || 3) || remaining < 250) break;
    if ((pathCounts.get(record.path) || 0) >= 2) continue;
    const text = record.text.slice(0, Math.min(remaining, 1800));
    selected.push({ ...record, text });
    remaining -= text.length;
    pathCounts.set(record.path, (pathCounts.get(record.path) || 0) + 1);
  }
  return selected;
}
function search(root, mode, question) {
  const config = loadConfig(root, mode);
  const records = fs.readFileSync(outputPath(root, mode), 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean).map(JSON.parse);
  const hashes=new Map();
  function fresh(file,hash){try{if(!hashes.has(file)) hashes.set(file,digest(fs.readFileSync(file)));return hashes.get(file)===hash;}catch{return false;}}
  const valid = records.filter(record => {
    if (!fresh(record.path,record.sourceHash)) return false;
    return record.kind !== 'verified-fact' || fresh(record.proofPath,record.proofHash);
  });
  return retrieve(valid, question, config);
}
module.exports = { buildIndex, retrieve, search, loadConfig, digest, terms };
