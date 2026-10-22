const fs=require('node:fs'),assert=require('node:assert/strict');
const root='C:/workspace/format/format-agent',{FormatTools}=require(root+'/api/format-tools'),{inspectLayout}=require(root+'/api/diagnostics');
(async()=>{
 const tools=new FormatTools(JSON.parse(fs.readFileSync(root+'/config/format-tools.json')));
 const before=await tools.parse({name:'ApoliceVD2_P1.f',base64:fs.readFileSync(__dirname+'/../novo-teste-import/ApoliceVD2_P1.f').toString('base64')});
 const after=await tools.parse({name:'ApoliceVD2_P1.f',base64:fs.readFileSync(__dirname+'/../../output/legacy-validation/NovoTeste-editado.f').toString('base64')});
 fs.writeFileSync(__dirname+'/before-layout.json',JSON.stringify(before.layout));fs.writeFileSync(__dirname+'/after-layout.json',JSON.stringify(after.layout));
 const oldReport=inspectLayout(before.layout),newReport=inspectLayout(after.layout);
 const withoutSnapshot=value=>JSON.parse(JSON.stringify(value).replace(/[a-f0-9]{16}:(\/listaDocumentos\/)/g,'$1'));
 assert.equal(newReport.elements.length,3168);assert.deepEqual(withoutSnapshot(newReport.resources),withoutSnapshot(oldReport.resources));assert.deepEqual(withoutSnapshot(newReport.functions),withoutSnapshot(oldReport.functions));
 const plan=JSON.parse(fs.readFileSync(__dirname+'/../agent-reliability/real-visible-diff.json'));
 const checks=plan.changes.map(c=>{const item=c.pointer.split('/').filter(Boolean).reduce((v,k)=>v[k],after.layout);assert.equal(item.font.color.toUpperCase(),c.after.toUpperCase());return {document:c.documentName,pointer:c.pointer,color:item.font.color,contentTypes:Array.isArray(item.content)?item.content.map(n=>n.type):typeof item.content,inlineColors:Array.isArray(item.content)?item.content.filter(n=>n.font||n.fontDescriptor).map(n=>({type:n.type,font:n.font,descriptor:n.fontDescriptor})):[]};});
 const cases=[[0,'01','04',0],[1,'01','04',1],[2,'05','09',0],[3,'06','11',0],[4,'07','50',0],[5,'08','50',0],[6,'05','09',1],[7,'10','50',0],[8,'06','11',1],[9,'12','50',0],[10,'34','50',0],[11,'35','50',0]];
 const result={rereadChecks:checks,resourcesUnchanged:true,functionsUnchanged:true,pages:[]};
 for(const [index,front,back,pageIndex] of cases){
  const data=Buffer.from(fs.readFileSync(__dirname+'/../novo-teste-import/APPREM_A1P1_0001').subarray(0,2484));
  data.write(front,1223,2,'ascii');data.write(back,1225,2,'ascii');fs.writeFileSync(__dirname+`/fixture-${index}.dat`,data);
  const pair={requested:index};
  for(const [key,layout] of [['before',before.layout],['after',after.layout]]){const form=new FormData();form.append('layout',JSON.stringify({...layout,pageIndex}));form.append('dataFile',new Blob([data]),'coverage.dat');const response=await tools.request('web','/api/layout-preview',{method:'POST',body:form});pair[key]={pageIndex:response.data.pageIndex,documentIndex:response.data.documentIndex,document:response.data.page?.name};fs.writeFileSync(__dirname+`/${key}-preview-${index}.json`,JSON.stringify(response.data));}
  assert.equal(pair.after.pageIndex,pageIndex);assert.equal(pair.after.documentIndex,index);assert.deepEqual(pair.before,pair.after);result.pages.push(pair);fs.writeFileSync(__dirname+'/preview-validation.json',JSON.stringify(result,null,2));console.log(JSON.stringify(pair));
 }
 result.executions=tools.executions;result.status='passed-structure-awaiting-visual-review';fs.writeFileSync(__dirname+'/preview-validation.json',JSON.stringify(result,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
