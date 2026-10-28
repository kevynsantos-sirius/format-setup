const fs=require('fs'),assert=require('assert/strict'),{spawn}=require('child_process');
(async()=>{
 const child=spawn(process.execPath,['C:/workspace/format/format-agent/api/server.js'],{env:{...process.env,FORMAT_LLM_API_PORT:'3218',FORMAT_LLM_API_HOST:'127.0.0.1'},windowsHide:true,stdio:'ignore'});
 try{
 for(let i=0;i<40;i++){try{if((await fetch('http://127.0.0.1:3218/health')).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 const result=[];
 for(const [pergunta,id]of [['Qual a estrutura do SaudeA3?','saudea3-estrutura'],['Quais janelas e bandas existem no SaudeA3?','saudea3-janelas'],['Quais condições selecionam Frente e Verso no SaudeA3?','saudea3-condicoes'],['Como são as 12 etiquetas por folha no Etq_SEG_RE?','etq-seg-re-grade'],['Qual o índice de Chave na entrada do Etq_SEG_RE?','etq-seg-re-dados'],['Quais fontes e funções do Etq_SEG_RE?','etq-seg-re-dependencias']]){
  const started=performance.now();
  const response=await fetch('http://127.0.0.1:3218/api/perguntar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({modo:'usuario',pergunta}),signal:AbortSignal.timeout(110000)});
  const data=await response.json();assert(response.ok,JSON.stringify(data));assert(data.evidencias.some(e=>e.factId===id));assert.equal(data.alteracao.aplicada,false);
  assert.equal(data.modelo.status,'accepted','Ollama precisa responder sem fallback: '+JSON.stringify(data.modelo));
  const expected=JSON.parse(fs.readFileSync('C:/workspace/format/format-agent/knowledge/regras-verificadas.json')).find(f=>f.id===id);
  assert(data.resposta.includes(expected.answer),'Resposta não contém o fato esperado');
  for(const evidence of data.evidencias.filter(e=>e.factId))assert(evidence.proofPath.includes('exemplos-saude-etiquetas'),'Fonte diferente do catálogo novo');
  result.push({pergunta,elapsedMs:Math.round(performance.now()-started),resposta:data.resposta,modelo:data.modelo,evidencias:data.evidencias,confiabilidade:data.confiabilidade});
  console.log(JSON.stringify({question:pergunta,model:data.modelo,factMatched:id}));
 }
 fs.writeFileSync('output/examples-memory-validation/respostas-ollama.json',JSON.stringify(result,null,2)+'\n');
 }finally{child.kill();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
