const path = require('node:path');
const fs = require('node:fs');
const { buildIndex, search } = require('./knowledge');
const { consult } = require('./consultation');
const root = path.resolve(__dirname, '..');
async function main() {
  const [command, mode = 'dev', ...args] = process.argv.slice(2);
  if (!['dev', 'usuario'].includes(mode)) throw new Error('Modo invalido');
  if (command === 'index') {
    const summary = buildIndex(root, mode);
    console.log(JSON.stringify({ mode, files: summary.totalFiles, chunks: summary.totalChunks, sha256: summary.indexSha256, output: summary.output }));
  } else if (command === 'search') {
    console.log(JSON.stringify(search(root, mode, args.join(' ')), null, 2));
  } else if (command === 'ask') {
    const request = args[0] === '--request' ? JSON.parse(fs.readFileSync(args[1], 'utf8')) : { pergunta: args.join(' '), modo: mode };
    request.modo = mode;
    const result = await consult(root, request);
    console.log(result.resposta);
    if (mode === 'dev') console.log('\nFontes: ' + result.evidencias.map(item => `${path.basename(item.path)}#${item.chunk}`).join(', '));
  } else throw new Error('Comandos: index|search|ask dev|usuario [pergunta ou --request arquivo.json]');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
