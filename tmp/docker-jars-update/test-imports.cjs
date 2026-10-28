const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto');
const {FormatTools}=require('C:/workspace/format/format-agent/api/format-tools');
const out='output/docker-jars-validation';fs.mkdirSync(out,{recursive:true});
const env=Object.fromEntries(fs.readFileSync('.env','utf8').split(/\r?\n/).filter(l=>/^[A-Za-z_][A-Za-z0-9_]*=/.test(l)).map(l=>{const p=l.indexOf('=');return [l.slice(0,p),l.slice(p+1).trim().replace(/^(['"])(.*)\1$/,'$2')]}));
const report={status:'running',startedAt:new Date().toISOString(),environment:'Containers Docker atualizados; importação real via Nginx em http://localhost/api; conta técnica USER; dados sintéticos.',cases:[]};
const save=()=>fs.writeFileSync(out+'/resultado.json',JSON.stringify(report,null,2)+'\n');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
let access,until=0;
async function token(){if(until>Date.now())return access;const r=await fetch('http://localhost:8090/oauth2/token',{method:'POST',headers:{authorization:'Basic '+Buffer.from('format-api-client:'+(process.env.TEST_CLIENT_SECRET||env.FORMAT_AUTH_API_CLIENT_SECRET||'format-api-secret')).toString('base64'),'content-type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials&scope=format.read%20format.process%20format.admin'});assert(r.ok,'OAuth HTTP '+r.status);const t=await r.json();assert(t.access_token);access=t.access_token;until=Date.now()+30000;return access;}
const tools=new FormatTools({webBaseUrl:'http://localhost',apiBaseUrl:'http://localhost:8082',timeoutMs:180000});const request=tools.request.bind(tools);
tools.request=async(...args)=>{tools.tokens.web=await token();return request(...args);};
(async()=>{
 save();await tools.prepareCsrf();
 for(const [name,documents,fields,detailFields]of [['SaudeA3',2,93,58],['Etq_SEG_RE',1,24,0]]){
  const bytes=fs.readFileSync('C:/Users/Kevyn/Downloads/'+name+'.f'),sourceHash=hash(bytes);
  const form=new FormData();form.append('layoutFile',new Blob([bytes]),name+'-copia.f');form.append('projectName','VALIDACAO DOCKER 2026-10-27 — '+name+' — copia');
  const imported=(await tools.request('web','/api/import-project',{method:'POST',body:form})).data;
  const id=imported.project.uuid,layout=imported.layout;assert(id);assert.equal(layout.listaDocumentos.length,documents);assert.equal(layout.camposEntrada.length,fields);assert.equal(layout.camposDetalhe.length,detailFields);
  const item={name,projectId:id,sourceSha256:sourceHash,imported:true,documents,fields,detailFields,openedDocuments:[],previewPages:[]};report.cases.push(item);save();console.log(name+': importado, UUID '+id);
  await tools.request('web','/api/layout-draft?layoutId='+id+'&documentIndex=0',{method:'POST'});
  for(let index=0;index<documents;index++){const d=(await tools.request('web','/api/layout-draft-document?layoutId='+id+'&documentIndex='+index)).data;assert(d.layout?.length>0);layout.listaDocumentos[index]=d;item.openedDocuments.push({index,name:d.name,components:d.layout.length});}
  const inspection=(await tools.request('web','/api/ai/editor/inspect',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({projectId:id})})).data;
  assert.equal(inspection.source,'native-f');assert.equal(inspection.fileHash,sourceHash);item.nativeInventory=inspection.inventory.length;
  if(name==='SaudeA3'){assert.equal(inspection.inventory.filter(x=>x.type==='detalhe').length,3);assert.deepEqual(layout.listaDocumentos.map(d=>d.name),['Frente','Verso']);}
  else {const d=layout.listaDocumentos[0];assert.equal(d.documentsHorizontal,2);assert.equal(d.documentsVertical,6);assert.equal(d.documentGroupCount,12);assert.equal(d.layout.length,9);assert.equal(layout.camposEntrada.find(f=>f.nome==='Chave').indice,0);}
  const preview=new FormData();preview.append('layout',JSON.stringify({...layout,pageIndex:0}));preview.append('dataFile',new Blob([fs.readFileSync('output/chat-examples-validation/'+name+'-sintetico.txt')]),name+'-sintetico.txt');preview.append('preloadAll','true');
  const result=(await tools.request('web','/api/layout-preview',{method:'POST',body:preview})).data;
  assert.equal(result.previewPages.length,2);item.previewPages=result.previewPages.map(p=>({pageIndex:p.pageIndex,components:p.page.layout.length}));
  if(name==='Etq_SEG_RE'){
   assert.deepEqual(item.previewPages.map(p=>p.components),[108,9]);
   const labels=result.previewPages.flatMap(p=>p.page.layout.filter((c,i)=>i%9===0).map(c=>c.content));
   assert.deepEqual(labels,Array.from({length:13},(_,i)=>'SINTETICO '+String(i+1).padStart(3,'0')));item.labelsPerSheet=[12,1];
  }else assert.deepEqual(item.previewPages.map(p=>p.components),[44,4]);
  assert.equal(hash(fs.readFileSync('C:/Users/Kevyn/Downloads/'+name+'.f')),sourceHash);item.originalUnchanged=true;item.status='passed';save();console.log(name+': documentos, inventário nativo e preview aprovados.');
 }
 report.status='passed';report.finishedAt=new Date().toISOString();save();
})().catch(e=>{report.status='failed';report.error=e.message;save();console.error(e.message);process.exitCode=1;});
