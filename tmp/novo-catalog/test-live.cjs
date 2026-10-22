const fs=require('fs'),assert=require('assert/strict');
const cases=[
 ['Qual a estrutura de documentos e elementos do NovoTeste?','novoteste-catalogo-estrutura',/26 documentos/,/146 janelas/],
 ['Qual a condição da janela LIN01 de Frente01 no NovoTeste?','novoteste-janela-frente01-lin01',/DetQuebra/,/TipoDet/],
 ['Quantos elementos tem o documento Verso52 do NovoTeste?','novoteste-doc-24',/detalhe=16/,/band=36/],
 ['Quais as dependências e imagens do NovoTeste?','novoteste-catalogo-dependencias',/55 literais/,/sem imagens externas/]
];
(async()=>{
 const result={checks:[],responses:[]};
 for(const [pergunta,id,...patterns]of cases){
  const start=performance.now(),r=await fetch('http://localhost:3217/api/perguntar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({modo:'usuario',pergunta}),signal:AbortSignal.timeout(120000)});assert(r.ok,'HTTP '+r.status);const raw=await r.json(),b=raw.data||raw;
  assert(b.evidencias.some(x=>x.factId===id));for(const pattern of patterns)assert.match(b.resposta,pattern);
  assert.equal(b.modelo.model,'qwen2.5-coder:0.5b');assert.equal(b.modelo.status,'accepted',b.modelo.reason);assert.equal(b.alteracao.aplicada,false);
  result.responses.push(b);result.checks.push({question:pergunta,factId:id,passed:true,model:b.modelo,elapsedMs:Math.round(performance.now()-start)});
  fs.writeFileSync('output/novoteste-catalog-validation/respostas-reais.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result.checks.at(-1)));
 }
})().catch(e=>{console.error(e);process.exitCode=1});

