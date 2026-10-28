const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {search,digest}=require('../api/knowledge');
const root=path.resolve(__dirname,'..');
const cases=[
 ['Por que o gravador do SaudeA3 recusou flags e bytes?','saudea3-flags-legadas'],
 ['Como criar elementos preservando o booleano serializedUsedFlag?','flags-legadas-contrato'],
 ['Qual o resultado do teste de edição de cor do SaudeA3?','saudea3-edicao-chat-validada'],
 ['Como ficou a edição do Segurado no preview do Etq_SEG_RE?','etq-seg-re-edicao-chat-validada'],
 ['Por que o alvo selecionado do SaudeA3 era de outro tipo?','exemplos-selecao-tipo-confirmado'],
 ['Quais os limites de validação de imagens e PDF do SaudeA3?','exemplos-validacao-limites'],
 ['O Ollama usou os índices do Etq_SEG_RE?','exemplos-ollama-indices-validados']
];
for(const mode of ['dev','usuario'])test(`new example lessons are retrieved with current proof in ${mode}`,{
 skip:!fs.existsSync(path.join(root,'context',mode==='usuario'?'usuario':'','chunks',mode==='usuario'?'ponto-f-usuario-context.jsonl':'ponto-f-context.jsonl'))
},()=>{
 for(const [question,id]of cases){
  const fact=search(root,mode,question).find(f=>f.factId===id);assert(fact,question);
  const proof=fs.readFileSync(fact.proofPath);assert.equal(digest(proof),fact.proofHash);
  assert(proof.toString('utf8').includes(fact.proofQuote));
 }
});
test('example catalogs retain technical structure without absolute resource paths',()=>{
 for(const name of ['SaudeA3','Etq_SEG_RE']){
  const json=fs.readFileSync(path.join(root,'knowledge/exemplos-saude-etiquetas',name+'.json'),'utf8');
  assert(!/[a-z]:[\\/]/i.test(json),'Absolute resource path in '+name);
  const catalog=JSON.parse(json);assert(catalog.documents.length>0);
  assert(catalog.privacy.includes('Sem massa de dados'));
 }
});
