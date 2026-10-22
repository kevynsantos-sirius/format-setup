const fs = require('node:fs');
const assert = require('node:assert/strict');
async function main() {
  const base = 'http://127.0.0.1:3218';
  const openapi = await (await fetch(base + '/openapi.json')).json();
  assert.ok(openapi.paths['/api/pontof/diagnosticar']);
  const file = fs.readFileSync('tmp/novo-teste-import/ApoliceVD2_P1.f');
  const response = await fetch(base + '/api/pontof/diagnosticar', { method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + process.env.FORMAT_WEB_BEARER_TOKEN },
    body: JSON.stringify({ arquivo: { name: 'ApoliceVD2_P1.f', base64: file.toString('base64') }, recursos: [] }) });
  const result = await response.json();
  assert.equal(response.status, 200, JSON.stringify(result));
  assert.equal(result.diagnostico.documents.length, 26);
  assert.equal(result.diagnostico.elements.length, 3168);
  assert.equal(result.diagnostico.validationComplete, false);
  const ask = await fetch(base + '/api/perguntar', { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ modo: 'dev', pergunta: 'O texto literal Caro (a) pode executar MASCARA?' }) });
  const answer = await ask.json();
  if (ask.status === 503) {
    assert.ok(answer.evidencias.length > 0);
    assert.equal(answer.execucoes.length, 0);
  } else {
    assert.equal(ask.status, 200, JSON.stringify(answer));
    assert.ok(answer.resposta);
  }
  const reportPath = 'C:/workspace/format/format-agent/context/index/review-validation.json';
  const report = JSON.parse(fs.readFileSync(reportPath));
  report.httpContract = { status: 'passed', endpoint: '/api/pontof/diagnosticar', parsedDocuments: 26, inventoriedItems: 3168 };
  report.modelValidation = ask.status === 503 ? 'not-executed-ollama-unavailable-memory-retrieval-confirmed' : { status: 'executed', answer: answer.resposta };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ httpStatus: response.status, documents: result.diagnostico.documents.length,
    elements: result.diagnostico.elements.length, askHttpStatus: ask.status,
    sourcesRetrieved: answer.evidencias?.length, modelValidation: report.modelValidation }));
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
