const fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const report={checks:[],responses:[]};
 for(const [pergunta,id,pattern]of [
  ['Conhece a estrutura do exemplo Campos Altos dívida ativa?','campos-altos-estrutura',/2 documentos/],
  ['Como editar as máscaras e imagens da intimação de imóvel de Campos Altos?','campos-altos-mascaras',/BRANCO\.jpg/],
  ['Como é o código de barras de Campos Altos?','campos-altos-codigo-barras',/48 posições/]
 ]){
  const r=await fetch('http://localhost:3217/api/perguntar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({modo:'usuario',pergunta}),signal:AbortSignal.timeout(120000)});assert(r.ok);const raw=await r.json(),b=raw.data||raw;
  assert(b.evidencias.some(x=>x.factId===id));assert.match(b.resposta,pattern);assert.equal(b.modelo.model,'qwen2.5-coder:0.5b');assert.equal(b.modelo.status,'accepted',b.modelo.reason);assert.equal(b.alteracao.aplicada,false);
  report.responses.push(b);report.checks.push({pergunta,factId:id,passed:true,model:b.modelo});fs.writeFileSync('output/campos-altos-catalog-validation/respostas-reais.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.checks.at(-1)));
 }
})().catch(e=>{console.error(e);process.exitCode=1});
