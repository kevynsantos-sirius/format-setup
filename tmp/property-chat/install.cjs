const fs=require('fs'),root='C:/workspace/format/format-agent';
fs.copyFileSync('tmp/property-chat/editor-properties.js',root+'/api/editor-properties.js');
const file=root+'/api/editor-intents.js';let s=fs.readFileSync(file,'utf8');function replace(a,b){if(!s.includes(a))throw Error('Missing '+a);s=s.replace(a,b);}
replace("const normalize=", "const {scan,mergeRequests,resolveRequests,fillAnswer}=require('./editor-properties');\nconst normalize=");
replace('bandKind,changes,data,colorRequested:', 'bandKind,changes,data,propertyRequests:scan(message),colorRequested:');
const start=s.indexOf(' if(body.followup&&!body.intent)'),end=s.indexOf('\n let candidates=inventory;',start);
if(start<0||end<0)throw Error('followup anchor');
s=s.slice(0,start)+` if(body.followup){const next=parse(String(body.followup));Object.assign(intent.changes,next.changes);Object.assign(intent.data,next.data);intent.propertyRequests=mergeRequests(intent.propertyRequests,next.propertyRequests);for(const k of ['type','selector','document','name','destination','bandKind'])if(next[k]&&!intent[k])intent[k]=next[k];}
`+s.slice(end);
replace(" if(intent.action==='edit'){\n  if(intent.colorRequested", ` if(intent.action==='edit'){
  if(body.followup)intent.propertyRequests=fillAnswer(intent.propertyRequests,body.followup,target);
  const properties=resolveRequests(intent.propertyRequests,target);
  // A requested property with missing/unsupported value must never disappear into a partial plan.
  for(const request of intent.propertyRequests||[])for(const key of request.keys)delete intent.changes[key];
  Object.assign(intent.changes,properties.changes);
  if(properties.unsupported.length)return {status:'clarify',message:'Este alvo não oferece estas propriedades no contrato nativo: '+properties.unsupported.join(', ')+'. Especifique uma propriedade compatível ou outro alvo. Nenhuma alteração foi aplicada.',intent,target,candidates:[]};
  if(Object.keys(properties.missing).length)return {status:'clarify',message:'Informe somente os valores que faltam: '+Object.keys(properties.missing).join(', ')+'. O alvo e as demais alterações já foram identificados.',intent,target,candidates:[],fieldEditor:properties.missing,missingFields:Object.keys(properties.missing)};
  if(intent.colorRequested`);
// Property requests supersede the old text-only color handling (including native line colors).
s=s.replace("  if(intent.colorRequested&&!Object.hasOwn(intent.changes,'font/color'))return", "  if(!intent.propertyRequests?.length&&intent.colorRequested&&!Object.hasOwn(intent.changes,'font/color'))return");
s=s.replace("  if(Object.hasOwn(intent.changes,'font/color')&&!Object.hasOwn(target.fields,'font/color'))return", "  if(!intent.propertyRequests?.length&&Object.hasOwn(intent.changes,'font/color')&&!Object.hasOwn(target.fields,'font/color'))return");
fs.writeFileSync(file,s);
