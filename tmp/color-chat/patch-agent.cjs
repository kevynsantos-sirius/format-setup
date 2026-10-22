const fs=require('fs');const file='C:/workspace/format/format-agent/api/editor-intents.js';let s=fs.readFileSync(file,'utf8');
function replace(a,b){if(!s.includes(a))throw Error('Missing patch anchor: '+a);s=s.replace(a,b);}
replace("const quote=(s,re)=>re.exec(s)?.[1];",`const quote=(s,re)=>re.exec(s)?.[1];
const COLORS={azul:'#0057B8',verde:'#198754',vermelho:'#DC3545',preto:'#000000',branco:'#FFFFFF',cinza:'#6C757D',laranja:'#FD7E14',roxo:'#6F42C1',amarelo:'#FFFF00',rosa:'#FFC0CB'};
function colorRequest(instruction){
 const n=normalize(instruction),tokens=n.match(/#[0-9a-f]{6}\\b|\\b(?:azul|verde|vermelho|preto|branco|cinza|laranja|roxo|amarelo|rosa)\\b/g)||[];
 const values=[...new Set(tokens.map(t=>COLORS[t]||t.toUpperCase()))];
 const destination=/\\bpara\\s+(?:a\\s+cor\\s+)?(#[0-9a-f]{6}\\b|azul|verde|vermelho|preto|branco|cinza|laranja|roxo|amarelo|rosa)\\b/.exec(n);
 const value=destination?(COLORS[destination[1]]||destination[1].toUpperCase()):values.length===1?values[0]:undefined;
 return {requested:/\\bcor\\b/.test(n)||tokens.length>0,value,ambiguous:!value&&values.length>1};
}`);
replace('(?:cont[eé]m|contendo|in[ií]cio(?:\\s+do\\s+conte[uú]do)?|come[cç]a\\s+com)', '(?:cont[eé]m(?:\\s+o\\s+in[ií]cio\\s+do\\s+conte[uú]do)?|contendo|in[ií]cio(?:\\s+do\\s+conte[uú]do)?|come[cç]a\\s+com|com\\s+(?:a\\s+escrita|o\\s+texto)|que\\s+diz|cujo\\s+texto\\s+[eé])');
replace("const instruction=message.replace(selector||/$^/,'').replace(document||/$^/,'');",`// Literal target/content text cannot introduce accidental color, font or geometry edits.
 const instruction=message.replace(/["'“][^"'”]*["'”]/g,'').replace(document||/$^/,'');`);
replace("const color=/(#[0-9a-f]{6})\\b/i.exec(instruction);if(color)changes['font/color']=color[1].toUpperCase();", "const color=colorRequest(instruction);if(color.value)changes['font/color']=color.value;");
replace('bandKind,changes,data,selected:', 'bandKind,changes,data,colorRequested:color.requested,colorAmbiguous:color.ambiguous,selected:');
replace('(selecionad[oa]|este|esta)', '(selecionad[oa]|selecionei|este|esta|nesse|nessa)');
replace("Object.assign(intent.data,next.data);for(const k", "Object.assign(intent.data,next.data);intent.colorRequested=next.colorRequested;intent.colorAmbiguous=next.colorAmbiguous;for(const k");
replace("if(intent.action==='edit'){\n  const bad=", `if(intent.action==='edit'){
  if(intent.colorRequested&&!Object.hasOwn(intent.changes,'font/color'))return {status:'clarify',message:intent.colorAmbiguous?'Qual deve ser a cor final deste alvo? Informe uma única cor ou um código #RRGGBB.':'Qual cor deseja aplicar neste alvo? Pode informar o nome ou um código #RRGGBB.',intent,target,candidates:[]};
  if(Object.hasOwn(intent.changes,'font/color')&&!Object.hasOwn(target.fields,'font/color'))return {status:'clarify',message:'Este alvo não oferece cor de texto no contrato nativo. Selecione um campo texto ou especifique outra propriedade compatível.',intent,target,candidates:[]};
  const bad=`);
fs.writeFileSync(file,s);
