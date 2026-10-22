const fs=require('node:fs'),assert=require('node:assert/strict');
const root='C:/workspace/format/format-agent', {FormatTools}=require(root+'/api/format-tools'),{createPlan,applyPlan}=require(root+'/api/edit-plans'),{inspectLayout}=require(root+'/api/diagnostics'),{digest}=require(root+'/api/knowledge');
(async()=>{
 const bytes=fs.readFileSync(__dirname+'/../novo-teste-import/ApoliceVD2_P1.f');
 const tools=new FormatTools(JSON.parse(fs.readFileSync(root+'/config/format-tools.json','utf8')));
 const parsed=await tools.parse({name:'ApoliceVD2_P1.f',base64:bytes.toString('base64')});
 const report=inspectLayout(parsed.layout,{fileHash:parsed.fileHash}),alteracoes=[];
 // A nontrivial reviewed batch over actual imported structures, only in a copy.
 for(let doc=0;doc<12;doc++){
  const candidates=report.elements.filter(e=>e.documentIndex===doc&&e.type==='text'&&!e.parentId);
  for(const target of candidates.slice(0,2)){
   const item=target.pointer.split('/').filter(Boolean).reduce((v,k)=>v[k],parsed.layout);
   if(item.font && typeof item.font.color==='string') alteracoes.push({targetId:target.id,documentIndex:doc,property:'font/color',before:item.font.color,after:item.font.color.toUpperCase()==='#0057B8'?'#222222':'#0057B8'});
  }
 }
 assert.ok(alteracoes.length>=12);
 const plan=createPlan(parsed.layout,{snapshotSha256:parsed.fileHash,alteracoes},parsed.fileHash),result=applyPlan(parsed.layout,plan,parsed.fileHash);
 assert.equal(report.documents.length,26);assert.equal(report.elements.length,3168);assert.equal(report.elements.filter(e=>e.type==='detalhe').length,146);assert.equal(result.verification.untouchedItemsUnchanged,true);assert.equal(result.alteracao.salva,false);
 const after=inspectLayout(result.layout);assert.equal(after.elements.length,report.elements.length);assert.equal(after.documents.length,report.documents.length);
 assert.equal(digest(fs.readFileSync(__dirname+'/../novo-teste-import/ApoliceVD2_P1.f')),parsed.fileHash);
 const summary={testedAt:new Date().toISOString(),status:'passed',documents:26,elements:3168,detailWindows:146,changes:plan.changes.length,scope:plan.scope,sourceSnapshot:parsed.fileHash,resultSnapshot:result.snapshotSha256,verification:result.verification,originalFileUnchanged:true,appliedToReturnedDraftOnly:true,originalProjectSaved:false,executions:tools.executions};
 fs.writeFileSync(__dirname+'/real-plan.json',JSON.stringify(summary,null,2));fs.writeFileSync(__dirname+'/real-plan-draft.json',JSON.stringify({layout:result.layout,plan}));
 console.log(JSON.stringify(summary));
})().catch(e=>{console.error(e);process.exitCode=1;});
