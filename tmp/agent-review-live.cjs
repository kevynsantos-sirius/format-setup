const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = 'C:/workspace/format/format-agent';
const { FormatTools } = require(path.join(root, 'api/format-tools'));
async function main() {
  const base = 'C:/workspace/format-local/format/tmp/novo-teste-import';
  const file = { name: 'ApoliceVD2_P1.f', base64: fs.readFileSync(path.join(base, 'ApoliceVD2_P1.f')).toString('base64') };
  const data = { name: 'APPREM_A1P1_0001', base64: fs.readFileSync(path.join(base, 'APPREM_A1P1_0001')).toString('base64') };
  const config = JSON.parse(fs.readFileSync(path.join(root, 'config/format-tools.json')));
  const tools = new FormatTools(config);
  const report = await tools.diagnose({ arquivo: file, recursos: [{ name: data.name }],
    dados: data, verificarPreview: true, paginas: [0, 1], testesFuncoes: [
      { functionName: 'MASCARA', arguments: ['12345678901', '999.999.999-99'], expected: '123.456.789-01' }
    ] });
  assert.equal(report.documents.length, 26);
  assert.equal(report.elements.filter(item => item.type === 'detalhe').length, 146);
  const lin = report.elements.find(item => item.documentIndex === 0 && item.name === 'LIN01');
  assert.ok(lin.conditional.includes('TipoDet'));
  assert.equal(lin.bandCounts.cabecalho, 0); assert.equal(lin.bandCounts.detalhe, 2);
  assert.equal(report.elements.filter(item => item.parentId === lin.id && item.type === 'campoSaida').length, 4);
  assert.equal(report.functions.some(item => item.name === 'CARO'), false);
  assert.equal(report.preview.allRequestedPassed, true);
  assert.deepEqual(report.preview.results.map(item => item.document), ['Frente47', 'Verso50']);
  assert.equal(report.functionTests[0].matchesExpected, true);
  const summary = { testedAt: new Date().toISOString(), status: 'passed',
    snapshotSha256: report.snapshotSha256, documentCount: report.documents.length,
    componentCountIncludingBandChildren: report.elements.length, windowCount: 146,
    preview: report.preview, functionTests: report.functionTests,
    missingStaticResourceNames: [...new Set(report.findings.filter(item => item.code === 'RESOURCE_NOT_SUPPLIED').map(item => item.message))],
    functionFindings: report.findings.filter(item => item.code === 'FUNCTION_NOT_EXPORTED'),
    otherFindingCounts: Object.fromEntries([...new Set(report.findings.map(item => item.code))].map(code => [code, report.findings.filter(item => item.code === code).length])),
    executions: report.executions, completeValidationClaimed: report.validationComplete,
    modelValidation: 'pending-ollama-not-running' };
  const output = path.join(root, 'context/index/review-validation.json');
  fs.writeFileSync(output, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ status: summary.status, documents: summary.documentCount, elements: summary.componentCountIncludingBandChildren,
    windows: summary.windowCount, preview: summary.preview, functions: summary.functionTests, findings: summary.otherFindingCounts, output }));
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
