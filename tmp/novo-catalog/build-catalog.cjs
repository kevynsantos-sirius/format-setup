const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const JSZip=require('../../frontend/node_modules/jszip');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const out='output/novoteste-catalog-validation',dest='docs/novoteste-catalogo';
const source='tmp/novo-catalog/private-inspection.json',fixture='tmp/novo-teste-import/ApoliceVD2_P1.f';
const snapshot=JSON.parse(fs.readFileSync(source)),layout=snapshot.layout;
const fieldNames=new Set([...layout.camposEntrada,...layout.camposDetalhe,...layout.userVariables].map(x=>x.nome.toLowerCase()));
const declared=new Set(layout.userFunctionConfig.functions.map(x=>x.toUpperCase()));
const usedFunctions=new Map(),usedFields=new Map(),resources=new Map();
const count=xs=>xs.reduce((a,x)=>(a[x.type]=(a[x.type]||0)+1,a),{});
const technicalName=s=>/^[A-Za-z_][A-Za-z0-9_]{0,79}$/.test(s)?s:'<nome omitido>';
const asset=s=>/^[A-Za-z_][A-Za-z0-9_.-]{0,55}\.(gif|bmp|jpe?g|png|tiff?|ps)$/i.test(s)&&!/[0-9]{5}/.test(s)?s:null;
function expr(s,location){
 if(!s)return s; s=String(s);
 if(/[^\x09\x0a\x0d\x20-\x7e\u00c0-\u017f]/.test(s))return '<bytes legados não interpretados; conferir .f>';
 const withoutLiterals=s.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,' ');
 const calls=[...withoutLiterals.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)].map(m=>m[1].toUpperCase()).filter(x=>!['IF','AND','OR','NOT'].includes(x));
 const refs=[...new Set((withoutLiterals.match(/[A-Za-z_]\w*/g)||[]).filter(x=>fieldNames.has(x.toLowerCase())))];
 for(const f of calls){if(!usedFunctions.has(f))usedFunctions.set(f,new Set());usedFunctions.get(f).add(location);}
 for(const f of refs){const key=f.toLowerCase();if(!usedFields.has(key))usedFields.set(key,new Set());usedFields.get(key).add(location);}
 const clean=s.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g,literal=>{
  const raw=literal.slice(1,-1);const file=asset(raw);
  if(file){if(!resources.has(file))resources.set(file,new Set());resources.get(file).add(location);return JSON.stringify(file);}
  if(/^[0-9]{1,2}$/.test(raw)||/^[\s.,;:|_+\-/]*$/.test(raw)||/^[Zz9#.,/ -]+$/.test(raw))return literal;
  return '"<literal omitido: '+raw.length+' caracteres>"';
 }).replace(/\b\d{5,}\b/g,'<número literal omitido>');
 return clean;
}
const expressionKey=k=>/(?:expressao|expression|conditional|condition|condDet|condQuebra|ocorrenciaIndDet|occurrence)$/i.test(k);
const enumKeys=new Set(['orientation','printMode','documentSequence','scope','imageType','sizingType','tipoFio','style','textAlign','alinhamentoDescricao','alinhamentoVerticalDescricao','nomeBanda','kind','recordFormat','fieldDelimiter','recordDelimiter']);
function strings(k,v,loc){
 if(expressionKey(k))return expr(v,loc);
 if(!v)return v;
 if(/(?:^|\/)(?:name|nome|family|dllName|exportName)$/.test(k))return /^[A-Za-z0-9_. -]{1,80}$/.test(v)?v:'<nome omitido>';
 if(/(?:color)$/.test(k)&&/^#[A-Fa-f0-9]{6}$/.test(v))return v;
 if(enumKeys.has(k.split('/').at(-1)))return /^[A-Za-z_\s-]{1,60}$/.test(v)||v==='|'||v==='\\n'?v:'<enum legado omitido>';
 if(/(?:mask|mascara)$/.test(k))return expr(JSON.stringify(v),loc);
 if(/(?:fileName|imageFileReference|processingImageFileReference)$/.test(k)){
  const name=asset(v);if(name){if(!resources.has(name))resources.set(name,new Set());resources.get(name).add(loc);return name;}return '<caminho de recurso omitido>';
 }
 return '<literal omitido: '+v.length+' caracteres>';
}
function safeObject(obj,loc){
 if(Array.isArray(obj))return obj.map((v,i)=>safeObject(v,loc+'/'+i));
 if(!obj||typeof obj!=='object')return obj;
 const result={};for(const [k,v]of Object.entries(obj)){
  if(['pathFile','assetPath','dllAssetPath','preview','excerpt','fingerprint','content','texto','text','htmlContent','fontDescriptor'].includes(k))continue;
  result[k]=typeof v==='string'?strings(k,v,loc+'/'+k):typeof v==='object'?safeObject(v,loc+'/'+k):v;
 }return result;
}
function contentStructure(content,loc){
 if(typeof content==='string')return {type:'literal',characters:content.length,omitted:true};
 if(!Array.isArray(content))return null;
 return content.map((token,i)=>{
  const t={index:i,type:technicalName(token.type||'unknown')};
  if(token.type==='campoSaida'||token.type==='outputField'){
   t.expression=expr(token.expressao||token.expression||token.content||'',loc+'/'+i+'/expression');
   t.settings=safeObject(token,loc+'/'+i);
  }else if(token.type==='FontDescriptor')t.font=safeObject(token.fontDescriptor||{},loc+'/'+i+'/font');
  else if(typeof token.content==='string')t.literalCharacters=token.content.length;
  return t;
 });
}
function at(pointer){return pointer.split('/').slice(1).reduce((v,k)=>v?.[k],layout);}
function row(r){
 const dto=at(r.pointer);assert(dto,'Missing DTO '+r.pointer);
 const fields={};for(const [k,v]of Object.entries(r.fields)){
  if(k==='content'||k.startsWith('content/')||k==='preview')continue;
  fields[k]=typeof v==='string'?strings(k,v,r.nativePath+'/'+k):v;
 }
 const result={nativePath:r.nativePath,pointer:r.pointer,type:r.type,parentNativePath:r.parentId?r.parentId.slice(r.parentId.indexOf(':')+1):null,name:technicalName(r.name||''),...(r.bandKind?{bandKind:r.bandKind}:{}),condition:expr(r.condition,r.nativePath+'/condition'),fields};
 if(!r.name)delete result.name;
 if(r.type==='text')result.contentStructure=contentStructure(dto.content,r.nativePath+'/content');
 if(['image','barcode','qrcode'].includes(r.type))result.contentExpression=expr(dto.occurrence||dto.content||'',r.nativePath+'/content');
 if(r.type==='campoSaida')result.outputExpression=expr(dto.expressao||dto.content||'',r.nativePath+'/expressao');
 if(r.type==='document')result.principal=dto.docPrinc;
 if(r.type==='detalhe')result.bandDefinitions=(dto.bandas||[]).filter(b=>b.defined).map(b=>({id:b.id,name:technicalName(b.nome),kind:b.kind,defined:b.defined,height:b.height,condition:expr(b.expressaoCondicao,r.nativePath+'/bandas/'+b.id+'/condition')}));
 return result;
}
async function build(){
 fs.mkdirSync(out,{recursive:true});fs.mkdirSync(dest,{recursive:true});
 const zipBytes=fs.readFileSync('C:/Users/Kevyn/Downloads/NovoTeste.zip');const zip=await JSZip.loadAsync(zipBytes);const entries=Object.values(zip.files).filter(e=>!e.dir);const native=entries.find(e=>/\.f$/i.test(e.name));assert(native);
 assert.equal(hash(await native.async('nodebuffer')),snapshot.hash);assert.equal(hash(fs.readFileSync(fixture)),snapshot.hash);
 const documents=[];
 for(let i=0;i<layout.listaDocumentos.length;i++){
  const doc=layout.listaDocumentos[i],rows=snapshot.inventory.filter(r=>r.documentIndex===i),records=rows.map(row);
  const record={schemaVersion:1,fixtureHash:snapshot.hash,index:i,name:technicalName(doc.name),counts:count(rows),settings:safeObject({...doc,layout:undefined,overlayConfig:undefined},'$.documentos['+i+']'),overlays:safeObject(doc.overlayConfig,'$.documentos['+i+']/overlayConfig'),records};
  const file=String(i).padStart(2,'0')+'-'+record.name+'.md';
  fs.writeFileSync(dest+'/'+file,'# NovoTeste — documento '+i+' '+record.name+'\n\nCatálogo técnico sanitizado do snapshot original; reler o .f atual antes de editar. Campos de texto literais foram omitidos. Caminhos de filhos de banda usam coordenadas locais. Condição geral da janela não substitui condDet, condQuebra ou condição da banda. Contagens incluem filhos de bandas, com bandas separadas dos elementos. Não usar este catálogo como plano executável.\n\n```json\n'+JSON.stringify(record,null,2)+'\n```\n');
  documents.push({index:i,name:record.name,file,condition:record.settings.documentExpression,principal:doc.docPrinc,counts:record.counts,documentSize:doc.documentSize});
 }
 const windowSummaries=snapshot.inventory.filter(r=>r.type==='detalhe').map(r=>{
  const safe=row(r),children=snapshot.inventory.filter(x=>x.parentId===r.id),dto=at(r.pointer);
  return {document:technicalName(r.documentName),window:technicalName(r.name),nativePath:r.nativePath,pointer:r.pointer,condition:safe.condition,printCondition:expr(dto.condDet,r.nativePath+'/condDet'),breakCondition:expr(dto.condQuebra,r.nativePath+'/condQuebra'),indexed:dto.usaDetIndexado,indexExpression:expr(dto.ocorrenciaIndDet,r.nativePath+'/ocorrenciaIndDet'),bands:children.map(b=>({name:technicalName(b.name),kind:b.bandKind,nativePath:b.nativePath,condition:expr(b.condition,b.nativePath+'/condition'),children:count(snapshot.inventory.filter(x=>x.parentId===b.id))}))};
 });
 fs.writeFileSync(dest+'/28-janelas-detalhe.md','# NovoTeste — mapa das 146 janelas detalhe\n\nCada janela pertence a um documento; nomes repetidos não são alvos equivalentes. Somente definições ativas de bandas; cabeçalho vazio não é banda apagada. Condições sanitizadas não são executáveis.\n\n'+windowSummaries.map(w=>'## NovoTeste '+w.document+' janela '+w.window+'\n\n```json\n'+JSON.stringify(w,null,2)+'\n```\n').join('\n'));
 const schema={inputFields:safeObject(layout.camposEntrada,'camposEntrada'),detailInputFields:safeObject(layout.camposDetalhe,'camposDetalhe'),variables:safeObject(layout.userVariables,'userVariables'),dataConfig:safeObject(layout.dataFileConfig,'dataFileConfig'),functions:safeObject(layout.userFunctionConfig,'userFunctionConfig'),conditionalFonts:safeObject(layout.conditionalFonts,'conditionalFonts'),globalOverlays:safeObject(layout.overlayConfig,'overlayConfig')};
 const graph={fields:[...usedFields].map(([name,locations])=>({name,locations:[...locations]})),functions:[...usedFunctions].map(([name,locations])=>({name,declared:declared.has(name),locations:[...locations]})),staticResources:[...resources].map(([name,locations])=>({name,locations:[...locations],includedInZip:entries.some(e=>path.basename(e.name).toLowerCase()===name.toLowerCase())})),dynamicImages:snapshot.inventory.filter(r=>r.type==='image').filter(r=>/\b[A-Za-z_]\w*\s*\(|\|/.test(String(r.fields.occurrence||r.fields.content||''))).map(r=>({nativePath:r.nativePath,expression:expr(r.fields.occurrence||r.fields.content,r.nativePath+'/dynamicImage')}))};
 graph.resourceLiterals=graph.staticResources.map(r=>({...r,referenceKind:r.name.startsWith('_')?'dynamic-suffix':'file-name-candidate',caseFoldedName:r.name.toLowerCase()}));delete graph.staticResources;
 const uniqueResourceNames=new Set(graph.resourceLiterals.filter(r=>r.referenceKind==='file-name-candidate').map(r=>r.caseFoldedName)).size;
 fs.writeFileSync(dest+'/27-esquema-e-dependencias.md','# NovoTeste — esquema e dependências\n\nNomes técnicos, posições e tamanhos não são valores de clientes. As 36 definições camposDetalhe são campos de entrada de registros detalhe, não as 146 janelas visuais. Não há massa de dados neste catálogo. Declaração de função não comprova execução; GRAVAJRN e GRAVAJRNGEN devem ser investigadas antes de avaliar expressões com possíveis efeitos de escrita. Chamadas identificadas lexicalmente não comprovam resolução de todos os símbolos. Não copiar caminhos absolutos legados.\n\nForam registrados 55 literais de nomes/sufixos de imagem: 45 nomes candidatos distintos quando ignoradas diferenças de maiúsculas, mais o sufixo dinâmico _2.jpg e variantes de capitalização. Não são 55 arquivos completos nem recursos comprovados. O motor em ambiente sensível a caixa pode tratar variantes como diferentes; preservar a grafia original e conferir a resolução.\n\n```json\n'+JSON.stringify(schema,null,2)+'\n```\n\n## Relações de uso\n\n```json\n'+JSON.stringify(graph,null,2)+'\n```\n');
 const totals=count(snapshot.inventory),bands=count(snapshot.inventory.filter(r=>r.type==='band').map(r=>({type:r.bandKind}))),top=count(snapshot.inventory.filter(r=>r.type!=='document'&&r.type!=='band'&&!r.pointer.includes('/bandas/')));
 const report={schemaVersion:1,sourceHash:snapshot.hash,zipHash:hash(zipBytes),zipEntries:entries.map(e=>({name:path.basename(e.name)})),nativeRecords:snapshot.inventory.length,totals,topLevelElements:top,bands,inputFields:layout.camposEntrada.length,detailInputFields:layout.camposDetalhe.length,variables:layout.userVariables.length,declaredFunctions:declared.size,staticResourceCandidates:resources.size,dynamicImages:graph.dynamicImages.length,documents,sanitization:{dataFileRead:false,literalTextIndexed:false,literalsRedacted:true,absoluteSourcePathsIndexed:false},limitations:['Catálogo de objetos ativos reconhecidos pelo leitor e pelo editor; bytes opacos e slots inativos não são conhecimento semântico.','Sem execução de expressões, preview, PDF ou dados de clientes.','Referências estáticas são candidatos de recursos; dependências dinâmicas exigem massa e motor.','Texto literal omitido e expressões sanitizadas não servem para reprodução nem patch binário.']};
 report.resourceLiterals=resources.size;report.uniqueCaseFoldedResourceNames=uniqueResourceNames;report.nativeGraphObjects=snapshot.nativeGraphObjects;
 fs.writeFileSync(out+'/estrutura.json',JSON.stringify(report,null,2));
 const intro='# Catálogo estrutural do NovoTeste\n\nReleitura em 22/10/2026 de ApoliceVD2_P1.f, confirmado por SHA-256 contra NovoTeste.zip. O original não foi gravado.\n\nO NovoTeste possui 26 documentos, 146 janelas detalhe e 328 bandas definidas: 7 cabeçalhos, 314 detalhes e 7 rodapés; nenhum sumário definido. O inventário nativo contém 3522 registros, incluindo documentos e bandas.\n\nHá 238 caixas de texto, 2302 campos de saída independentes, 316 imagens, 15 códigos bidimensionais, 45 blocos de endereçamento e 106 fios, contando elementos de primeiro nível e filhos de bandas; não há código de barras unidimensional nesse inventário. Segmentos dinâmicos internos de texto e campos internos de blocos estão descritos dentro do objeto proprietário e não somados novamente.\n\nO esquema tem 157 campos de entrada mestre, 36 definições de entrada detalhe, 19 variáveis e 19 funções declaradas. camposDetalhe não é a lista de janelas visuais. DocFrente, DocVerso e _ContRep selecionam variantes; o documento do editor não equivale à página física do preview.\n\n## Privacidade e validade\n\nEste catálogo contém estrutura, nomes técnicos, geometria, fontes, condições sanitizadas e caminhos nativos. Não contém registros da massa, valores de clientes ou textos literais completos. Strings de expressão foram omitidas, exceto códigos curtos de seleção, máscaras técnicas e nomes simples de recursos visuais. Números literais longos foram omitidos. Caminhos absolutos foram excluídos. Uma expressão sanitizada explica dependências, não é código a executar.\n\nA identidade abaixo vale somente para o original. Reler o .f atual, confirmar alvo e propriedades e gerar plano novo antes de editar. Para achar texto por conteúdo, ler o projeto atual autorizado: os textos omitidos não são recuperados desta memória.\n\nSHA-256: `'+snapshot.hash+'`.\n\n## Documentos\n\n| Índice | Nome | Condição | Janelas | Bandas |\n| ---: | --- | --- | ---: | ---: |\n'+documents.map(d=>'| '+d.index+' | ['+d.name+']('+d.file+') | '+(d.condition||'vazia').replace(/\|/g,'&#124;')+' | '+(d.counts.detalhe||0)+' | '+(d.counts.band||0)+' |').join('\n')+'\n\n## Dependências e cautelas\n\n[Esquema completo e relações de uso](27-esquema-e-dependencias.md) lista campos, variáveis, funções, overlays e cada referência de recurso/caminho. Cada documento lista todos os objetos ativos reconhecidos, incluindo filhos de banda, e a geometria em mm. Fontes dependem da instalação/disponibilidade real; nomes declarados não provam renderização. Imagens com dimensão zero no DTO dependem do recurso/motor; não removê-las por isso.\n\nO ZIP contém apenas o .f e a massa APPREM_A1P1_0001; imagens externas e DLL não vieram no pacote. Recursos dinâmicos continuam sem resolução nesta revisão. Não afirmar perda na importação nem validação visual completa. Não executar funções de gravação de journal só para inspecionar o layout.\n\nEm Frente01, LIN01 tem duas definições de detalhe, DET1 e DetQuebra. Cabeçalho visível/desabilitado, definição vazia e slot não definido são estados distintos. Condição geral da janela, condição de impressão condDet, quebra condQuebra e seleção de banda permanecem campos separados. Geometria rotacionada exige os quatro cantos e a âncora correta; filhos de banda têm coordenadas locais.\n\nCatálogo estrutural não comprova preview ou PDF. Os testes anteriores do NovoTeste identificaram limitação do motor PDF/fonte; não converter isso em validação bem-sucedida de todas as páginas. Bytes legados não interpretados de campos inativos são indicados, não convertidos em condições válidas.\n';
 assert.equal(snapshot.inventory.length,3522);assert.equal(layout.listaDocumentos.length,26);assert.equal(totals.detalhe,146);assert.equal(totals.band,328);assert.equal(layout.camposEntrada.length,157);assert.equal(layout.camposDetalhe.length,36);assert.equal(layout.userVariables.length,19);assert.equal(snapshot.nativeGraphObjects,0,'Native graphics need dedicated catalog support');
 fs.writeFileSync(dest+'/README.md',intro+'\n[Mapa das 146 janelas detalhe](28-janelas-detalhe.md) reúne nomes, documentos, condições, caminhos e filhos das bandas para consulta por alvo.\n');
 console.log(JSON.stringify({records:report.nativeRecords,totals,bands,input:report.inputFields,detailInput:report.detailInputFields,variables:report.variables,staticResources:resources.size,dynamicImages:graph.dynamicImages.length,files:fs.readdirSync(dest).length}));
}
module.exports={expr,safeObject,contentStructure,row};
if(require.main===module)build().catch(e=>{console.error(e);process.exitCode=1});
