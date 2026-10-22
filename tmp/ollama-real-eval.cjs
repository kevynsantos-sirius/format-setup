const fs = require('node:fs');
const cases = [
  {id:'literal-dll',modo:'dev',pergunta:'Texto literal Caro (a) executa MASCARA da Sirius32? Explique a diferenca para campo de saida explicito.'},
  {id:'detail-conditions',modo:'dev',pergunta:'Na janela LIN01, condicao geral, condicao de impressao e selecao de banda sao a mesma coisa? Sem arquivo atual, o que falta verificar?'},
  {id:'preview-not-pdf',modo:'usuario',pergunta:'O preview da primeira pagina abriu e a API retornou PROCESSING. Posso afirmar que todas as paginas e o PDF final estao corretos?'},
  {id:'header-placeholder',modo:'usuario',pergunta:'O cabecalho vazio mostra zeros. Devo criar um detalhe automaticamente? Como verificar sem confundir texto fixo e campo variavel?'},
  {id:'no-invented-inspection',modo:'dev',pergunta:'Sem enviar um arquivo .f atual, voce pode confirmar que corrigiu e salvou a janela LIN10 e validou todas as imagens?'},
  {id:'current-draft',modo:'dev',pergunta:'Neste draft, qual e a condicao geral da LIN01 e qual e sua condicao de impressao? Voce salvou o arquivo?',layout:{listaDocumentos:[{name:'Frente01',documentSize:{width:614,height:296},layout:[{type:'detalhe',nome:'LIN01',x:10,y:20,width:5,height:5,conditional:'TipoDet = 30',condDet:'Imprimir = 1',nCab:0,nDet:1,nRod:0,nSum:0,bandas:[{kind:'detalhe',defined:true,expressaoCondicao:'TipoDet = 31',camposSaida:[]}]}]}]}}
];
(async()=>{
 const report={testedAt:new Date().toISOString(),endpoint:'http://127.0.0.1:3217/api/perguntar',cases:[]};
 for(const item of cases){
  const start=Date.now();
  const res=await fetch(report.endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(item),signal:AbortSignal.timeout(190000)});
  const result=await res.json();
  report.cases.push({...item,status:res.status,seconds:(Date.now()-start)/1000,...result});
  fs.writeFileSync(__dirname+'/ollama-real-eval.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report.cases.at(-1)));
 }
})().catch(e=>{console.error(e);process.exitCode=1;});
