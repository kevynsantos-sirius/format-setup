const fs=require('fs');const root='C:/workspace/format/format-agent';
const file=root+'/knowledge/regras-verificadas.json',facts=JSON.parse(fs.readFileSync(file));
const fact=facts.find(f=>f.id==='saudea3-estrutura');const before=fact.answer;
fact.answer=fact.answer.replace('O usuário informou que o exemplo já foi testado na aplicação; a catalogação atual não repetiu preview ou PDF.','O usuário informou que o exemplo já foi testado na aplicação. A catalogação inicial foi estrutural; uma etapa posterior validou uma edição de cor pelo chat e as duas páginas de preview com dados sintéticos, sem PDF.');
if(fact.answer!==before){fact.quote=fact.answer;for(const p of ['docs/exemplos-saude-etiquetas/fatos.md',root+'/knowledge/'+fact.source]){const s=fs.readFileSync(p,'utf8');if(!s.includes(before))throw Error('Prova original ausente');fs.writeFileSync(p,s.replace(before,fact.answer));}fs.writeFileSync(file,JSON.stringify(facts,null,2)+'\n');}
