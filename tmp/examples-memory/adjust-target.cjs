const fs=require('fs');const out='output/chat-examples-validation';
const layout=JSON.parse(fs.readFileSync('tmp/examples-memory/SaudeA3-private.json')).layout;
const field=layout.camposEntrada.find(f=>f.nome==='TipoCob');const bytes=fs.readFileSync(out+'/SaudeA3-sintetico.txt');bytes[field.posicao-1]='D'.charCodeAt(0);fs.writeFileSync(out+'/SaudeA3-sintetico.txt',bytes);
for(const name of ['SaudeA3','Etq_SEG_RE']){const file=out+'/'+name+'-plano-teste.json';const plan=JSON.parse(fs.readFileSync(file));if(name==='SaudeA3')Object.assign(plan.target,{index:15,type:'campoSaida',nativePath:'$.documentos[0].listaCpoSai[4]'});plan.target.requestedValue='#0057B8';fs.writeFileSync(file,JSON.stringify(plan,null,2)+'\n');}
