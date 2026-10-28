const fs=require('fs'),root='C:/workspace/format/format-agent';
const colors=`const normalize=s=>String(s||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
const COLORS={azul:'#0057B8',verde:'#198754',vermelho:'#DC3545',vermelha:'#DC3545',preto:'#000000',preta:'#000000',branco:'#FFFFFF',branca:'#FFFFFF',cinza:'#6C757D',laranja:'#FD7E14',roxo:'#6F42C1',roxa:'#6F42C1',amarelo:'#FFFF00',amarela:'#FFFF00',rosa:'#FFC0CB'};
const pattern='#(?:[0-9a-f]{6})\\\\b|\\\\b(?:'+Object.keys(COLORS).join('|')+')\\\\b';
function colorRequest(instruction){
 const n=normalize(instruction),tokens=n.match(new RegExp(pattern,'g'))||[];
 const values=[...new Set(tokens.map(t=>COLORS[t]||t.toUpperCase()))];
 const destinations=[...n.matchAll(new RegExp('\\\\bpara\\\\s+(?:a\\\\s+cor\\\\s+)?('+pattern+')','g'))];
 const destination=destinations.at(-1),alternative=/\\bou\\b/.test(n.slice((destination?.index??n.length)+(destination?.[0].length??0)));
 const value=destination&&!alternative?(COLORS[destination[1]]||destination[1].toUpperCase()):values.length===1?values[0]:undefined;
 return {requested:/\\bcor\\b/.test(n)||tokens.length>0,value,ambiguous:!value&&values.length>1};
}
module.exports={colorRequest};
`;
fs.writeFileSync(root+'/api/editor-colors.js',colors);
const ip=root+'/api/editor-intents.js',pp=root+'/api/editor-properties.js';
let i=fs.readFileSync(ip,'utf8'),p=fs.readFileSync(pp,'utf8');
const start=i.indexOf('const COLORS='),end=i.indexOf('function parse(message)');if(start<0||end<0)throw Error('Intent source changed');
i=i.slice(0,start)+"const {colorRequest}=require('./editor-colors');\n"+i.slice(end);
p=p.replace(/^const COLORS=.*;\r?\n/m,"const {colorRequest}=require('./editor-colors');\n");
const ps=p.indexOf(' const colors=source.match('),pe=p.indexOf(" if(/\\bposicao",ps);if(ps<0||pe<0)throw Error('Properties source changed');
p=p.slice(0,ps)+" const color=colorRequest(source);\n if(color.requested)requests.push({keys:['font/color','cor'],label:'Cor',kind:'color',...(color.value?{value:color.value}:{})});\n"+p.slice(pe);
fs.writeFileSync(ip,i);fs.writeFileSync(pp,p);
const tp=root+'/tests/color-intents.test.cjs';fs.appendFileSync(tp,`
test('feminine color adjectives resolve without asking for a known value',()=>{
 for(const [word,value] of Object.entries({vermelha:'#DC3545',preta:'#000000',branca:'#FFFFFF',roxa:'#6F42C1',amarela:'#FFFF00'})){
  for(const message of ['Mude a cor do texto selecionado para '+word,'Aplique a cor '+word+' ao texto selecionado']){
   const r=run(message,{selectedIds:['t1']});assert.equal(r.status,'resolved',message);assert.deepEqual(r.operation.changes,{'font/color':value});
  }
 }
 assert.deepEqual(parse('Mude de vermelha para azul').changes,{'font/color':'#0057B8'});
 assert.equal(run('Mude a cor do texto selecionado para vermelha ou azul',{selectedIds:['t1']}).status,'clarify');
 assert.deepEqual(parse('Edite o texto que contém "cor vermelha"').changes,{});
 const line=resolveEditor({message:'Mude a cor da linha selecionada para vermelha',inventory:[{id:'l',type:'fio',fields:{cor:0}}],selectedIds:['l']});assert.equal(line.status,'resolved');assert.deepEqual(line.operation.changes,{cor:0x3545DC});
});
`);
console.log('Shared color parser and regression tests updated.');
