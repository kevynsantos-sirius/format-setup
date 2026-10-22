const fs=require('fs'),assert=require('assert/strict');
const root='C:/workspace/format/format-agent';
const text=fs.readFileSync('docs/boleto-numeracao-preview.md','utf8');
fs.writeFileSync(root+'/knowledge/BOLETO_NUMERACAO_PREVIEW.md',text);
const file=root+'/knowledge/regras-verificadas.json',facts=JSON.parse(fs.readFileSync(file));
const fact={id:'boleto-contador-inteiro-preview',match:[['boleto','_pagenum'],['numeracao','contador','mascara','verso','00001']],answer:'No controle do Boleto Instituídos, a divergência no verso vinha do avaliador Web: para _PageNum=2, ((_Pagenum+1)/2) virava 1.5 e esse argumento era enviado à Sirius32. A DLL real devolveu 1 5  para MASCARA("1.5","99999"), enquanto MASCARA("1","99999") devolveu 00001. O preview foi corrigido para preservar divisão entre operandos inteiros; decimais explícitos continuam fracionários. Em teste HTTP isolado com expressões originais e dados sintéticos, páginas 1/2 tiveram controles 489814700001 e 14700001; páginas 3/4 tiveram sufixo 00002. O .f não foi modificado. Isso não comprova instalação em outro servidor nem valida todas as páginas ou o cálculo financeiro.',source:'BOLETO_NUMERACAO_PREVIEW.md',quote:'A DLL era chamada; a divergência surgia no argumento produzido antes dela.'};
assert(text.includes(fact.quote));const i=facts.findIndex(x=>x.id===fact.id);if(i<0)facts.push(fact);else facts[i]=fact;fs.writeFileSync(file,JSON.stringify(facts,null,2)+'\n');
const {buildIndex,search}=require(root+'/api/knowledge');
for(const mode of ['dev','usuario']){const r=buildIndex(root,mode);assert(search(root,mode,'No boleto a MASCARA dá erro na numeração do verso').some(x=>x.factId===fact.id));console.log(JSON.stringify({mode,files:r.totalFiles,chunks:r.totalChunks,verified:true}));}
