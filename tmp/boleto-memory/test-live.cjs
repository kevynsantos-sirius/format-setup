const fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const cases=[['A IA conhece a estrutura do exemplo Boleto Instituídos?','boleto-instituidos-estrutura',/186/],['No boleto Instituídos qual código de barras e linha digitável devo editar?','boleto-instituidos-barras',/controle|controles/],['As imagens do boleto Instituídos estão completas para preview e PDF?','boleto-instituidos-recursos',/ausentes/]];
 const report={checks:[],responses:[]};
 for(const [pergunta,factId,pattern]of cases){
  const r=await fetch('http://localhost:3217/api/perguntar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({modo:'usuario',pergunta}),signal:AbortSignal.timeout(120000)});assert(r.ok,'HTTP '+r.status);const raw=await r.json();const b=raw.data||raw;
  assert(b.evidencias.some(x=>x.factId===factId));assert.match(b.resposta,pattern);assert.equal(b.alteracao.aplicada,false);assert.equal(b.modelo.model,'qwen2.5-coder:0.5b');assert.equal(b.modelo.status,'accepted',b.modelo.reason);
  report.responses.push(b);report.checks.push({pergunta,factId,model:b.modelo,status:'passed'});fs.writeFileSync('output/boleto-memory-validation/respostas-reais.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.checks.at(-1)));
 }
})().catch(e=>{console.error(e);process.exitCode=1});
