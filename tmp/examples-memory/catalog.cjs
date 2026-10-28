const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const out='docs/exemplos-saude-etiquetas',validation='output/examples-memory-validation';
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(validation,{recursive:true});
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const mapping={campoSaida:'listaCpoSai',text:'listaTextField',image:'listaLogo',barcode:'listaBarCode',qrcode:'listaBarCodeBi',detalhe:'listaJanelaDetalhe',fio:'listaFio',bloco:'listaBlocoEnderecamento'};
const expressions=new Set(['expressao','expression','conditional','documentExpression','overflowExpression','numberingExpression','ocorrenciaIndDet','condDet','condQuebra','fontExpression','expressaoFonteCondicional','occurrence','expressaoCondicao']);
const technical=new Set(['name','nome','family','type','kind','orientation','printMode','documentSequence','recordFormat','fieldDelimiter','recordDelimiter','dllName','exportName','alignment','imageType','sizingType','color','scope','nomeBanda']);
function expression(v){
 if(!v)return '';
 if(/[^\x09\x0a\x0d\x20-\x7e\u00c0-\u017f]/.test(v))return '<bytes legados: requer inspeção do .f>';
 return v.replace(/"[^"\r\n]*"|'[^'\r\n]*'/g,s=>/^[0-9]{1,2}$|^[Zz9#., /-]*$/.test(s.slice(1,-1))?s:'"<literal omitido>"').replace(/\b\d{5,}\b/g,'<número omitido>');
}
function safe(v,key=''){
 if(v==null||typeof v==='number'||typeof v==='boolean')return v;
 if(typeof v==='string'){
  if(expressions.has(key))return expression(v);
  if(technical.has(key)&&/^[A-Za-z0-9_#.\s,:\\/-]{0,80}$/.test(v)&&!/[A-Za-z]:[\\/]|\\\\|\d{5,}/.test(v))return v;
  return v?'<' +key+' omitido; '+v.length+' caracteres>':'';
 }
 if(Array.isArray(v))return v.map(x=>safe(x,key));
 return Object.fromEntries(Object.entries(v).filter(([k])=>!['pathFile','assetPath','dllAssetPath','preview','layout','bandas'].includes(k)).map(([k,x])=>[k,safe(x,k)]));
}
const reports=[];
for(const name of ['SaudeA3','Etq_SEG_RE']){
 const s=JSON.parse(fs.readFileSync('tmp/examples-memory/'+name+'-private.json')),l=s.layout;
 assert.equal(sha(fs.readFileSync('C:/Users/Kevyn/Downloads/'+name+'.f')),s.hash);
 const totals={},fonts=new Set(),dependencies=[],documents=[];
 function inspect(item,nativePath,pointer){
  totals[item.type]=(totals[item.type]||0)+1;
  const settings=safe(item);if(item.font?.family)fonts.add(item.font.family);
  if(item.type==='image') dependencies.push({nativePath,type:'image',expression:expression(item.occurrence||''),reference:'<recurso externo; nome e caminho omitidos>'});
  const exprs=[];
  function collect(x,path){if(!x||typeof x!=='object')return;for(const [k,v]of Object.entries(x)){if(typeof v==='string'&&expressions.has(k)&&v)exprs.push({property:path+'/'+k,expression:expression(v),fields:[...new Set((v.replace(/"[^"]*"|'[^']*'/g,'').match(/[A-Za-z_]\w*/g)||[]).filter(t=>l.camposEntrada.concat(l.camposDetalhe,l.userVariables).some(f=>f.nome.toLowerCase()===t.toLowerCase())))]});else if(v&&typeof v==='object'&&!['bandas','layout'].includes(k))collect(v,path+'/'+k);}}
  collect(item,'');
  return {nativePath,pointer,type:item.type,settings,expressions:exprs};
 }
 for(const [di,d]of l.listaDocumentos.entries()){
  const counters={},records=[];
  for(const [i,x]of d.layout.entries()){
   assert(mapping[x.type],'Unknown type '+x.type);
   const ix=counters[x.type]||0;counters[x.type]=ix+1;
   const nativePath=`$.documentos[${di}].${mapping[x.type]}[${ix}]`,pointer=`/listaDocumentos/${di}/layout/${i}`;
   const row=inspect(x,nativePath,pointer);
   if(x.type==='detalhe'){
    row.bands=[]; const bandCounters={};
    for(const [bi,b]of x.bandas.entries())if(b.defined){
     const bandIndex=bandCounters[b.kind]||0;bandCounters[b.kind]=bandIndex+1;
     const nativeBandIndex={cabecalho:0,detalhe:20,rodape:119,sumario:139}[b.kind]+bandIndex;
     assert(Number.isInteger(nativeBandIndex));
     const bp=nativePath+`.listaDet[${nativeBandIndex}]`,children=[];
     for(const [key,native]of Object.entries({camposSaida:'listaCpoSai',camposTexto:'listaTextField',barCodes:'listaBarCode',logos:'listaLogo',fios:'listaFio',barCodesBi:'listaBarCodeBi'}))for(const [ci,c]of (b[key]||[]).entries())children.push(inspect(c,bp+`.${native}[${ci}]`,pointer+`/bandas/${bi}/${key}/${ci}`));
     row.bands.push({nativePath:bp,settings:safe(Object.fromEntries(Object.entries(b).filter(([k])=>!['camposSaida','camposTexto','barCodes','logos','fios','barCodesBi'].includes(k)))),children});
    }
   }
   records.push(row);
  }
  documents.push({index:di,settings:safe(d),records});
 }
 const report={name,sha256:s.hash,serializedFileNameLength:s.fileNameWidth,privacy:'Sem massa de dados, textos literais, caminhos absolutos ou valores de clientes. Expressões sanitizadas não são patches executáveis.',currentState:'Referência histórica; releia sempre o .f atual antes de editar.',totals,inputFields:l.camposEntrada.map(x=>safe(x)),detailInputFields:l.camposDetalhe.map(x=>safe(x)),variables:l.userVariables.map(x=>safe(x)),dataFileConfig:safe(l.dataFileConfig),functions:safe(l.userFunctionConfig),fonts:[...fonts],dependencies,documents};
 fs.writeFileSync(out+'/'+name+'.json',JSON.stringify(report,null,2)+'\n');
 fs.writeFileSync(out+'/'+name+'.md',`# Catálogo estrutural: ${name}.f\n\nSHA-256: ${s.hash}. Lido com PontoFLer e convertido pelo mesmo PontoFTojson do Format Web em 27/10/2026. O usuário informa que os exemplos foram testados na aplicação; esta catalogação fez leitura estrutural, sem nova execução do preview ou PDF.\n\n${report.privacy}\n\nDocumentos: ${documents.length}; campos mestre: ${report.inputFields.length}; definições de entrada detalhe: ${report.detailInputFields.length}; variáveis: ${report.variables.length}; funções declaradas: ${l.userFunctionConfig.functions.length}. Contagens de elementos incluindo filhos de bandas: ${JSON.stringify(totals)}.\n\nO JSON sanitizado correspondente registra geometria, estilos, condições, caminhos nativos, referências de campos e bandas definidas. Banda ausente é diferente de condição vazia. Declaração de função não comprova execução da DLL. Recursos externos não acompanharam estes arquivos .f.\n\n`+documents.map(d=>`## Documento ${d.index}: ${d.settings.name}\n\n${JSON.stringify(d.settings,null,2)}\n\n`+d.records.map(r=>`### ${r.nativePath}\n\n${JSON.stringify(r,null,2)}\n`).join('\n')).join('\n'));
 reports.push({name,sha256:s.hash,documents:documents.length,inputFields:report.inputFields.length,detailInputFields:report.detailInputFields.length,variables:report.variables.length,functions:l.userFunctionConfig.functions.length,totals,windows:documents.flatMap(d=>d.records.filter(r=>r.type==='detalhe').map(r=>({document:d.settings.name,path:r.nativePath,name:r.settings.nome,bands:r.bands.length}))),fonts:report.fonts});
}
fs.writeFileSync(validation+'/catalogos.json',JSON.stringify(reports,null,2)+'\n');console.log(JSON.stringify(reports));
