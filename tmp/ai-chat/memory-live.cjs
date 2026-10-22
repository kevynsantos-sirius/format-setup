const fs=require('fs');
(async()=>{const cases=[
 ['overflow','A fonte Arial e o tamanho podem deixar o texto cortado no limite da caixa?','fonte-limite-caixa'],
 ['selection','Como a IA do chat sabe qual alvo selecionado deve editar e destacar?','chat-selecao-revisao'],
 ['inline-font','Por que a cor do campo texto mudou no JSON mas a fonte interna deixou sem efeito visível?','fonte-interna-efetiva'],
 ['prefix','Edite o campo que contem o inicio do conteudo Prezado(a) em Arial: o trecho deve substituir o texto?','trecho-localiza-nao-substitui'],
 ['native-pdf','O PDF de capturas do preview valida o PDF nativo do FormatBSP se o original falhou na fonte?','pdf-nativo-baseline-fonte']
 ];const results=[];for(const [name,pergunta,expected]of cases){const started=Date.now();const r=await fetch('http://localhost:3217/api/perguntar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({modo:'usuario',pergunta}),signal:AbortSignal.timeout(120000)});const body=await r.json();const passed=JSON.stringify(body).includes(expected);results.push({name,passed,elapsedMs:Date.now()-started,response:body});console.log(JSON.stringify({name,passed,elapsedMs:Date.now()-started}));if(!r.ok||!passed)throw Error('Fato esperado ausente: '+expected);}fs.writeFileSync(__dirname+'/memory-live.json',JSON.stringify(results,null,2));})().catch(e=>{console.error(e);process.exitCode=1});
