const assert=require('assert/strict'),{fs,out,tools,inspect,download,preview}=require('./support.cjs');
const manifest=JSON.parse(fs.readFileSync(out+'/manifest.json')),projectId=manifest.projects.lab.id;
const save=(n,v)=>fs.writeFileSync(out+'/'+n+'.json',JSON.stringify(v,null,2));
const post=async(route,body)=>(await tools.request('web','/api/ai/editor/'+route,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)})).data;
async function apply(message,snapshot,target,doc){
 const body={projectId,fileHash:snapshot.fileHash,message,currentDocumentId:doc.id,currentBandId:null,selectedIds:target?[target.id]:[]};
 const resolved=await post('resolve',body);assert.equal(resolved.status,'resolved',resolved.message);
 const plan=await post('plan',{...body,taskToken:resolved.taskToken,operations:[resolved.operation]});assert.ok(plan.planId);
 const applied=await post('apply',{projectId,planId:plan.planId});assert.equal(applied.saved,true);assert.equal(applied.binaryRoundTrip,'passed');
 return {message,resolved,plan,applied};
}
(async()=>{
 await tools.prepareCsrf();let before=await inspect(projectId);save('before-inspect',before);fs.writeFileSync(out+'/before.f',await download(projectId));
 save('before-preview',await preview(projectId,'SaudeA3'));
 let doc=before.inventory.find(x=>x.type==='document'&&x.documentName==='LAB_AI');assert.ok(doc);
 const window=await apply('Crie uma janela detalhe chamada "JAI01" em X 20 mm, Y 60 mm, largura 80 mm e altura 20 mm.',before,null,doc);save('window-operation',window);
 const afterWindow=await inspect(projectId);save('window-inspect',afterWindow);fs.writeFileSync(out+'/window.f',await download(projectId));
 const created=afterWindow.inventory.find(x=>x.type==='detalhe'&&x.name==='JAI01');assert.ok(created);assert.equal(afterWindow.inventory.length,before.inventory.length+2);
 const target=afterWindow.inventory.find(x=>x.type==='text'&&x.documentName==='LAB_AI'&&x.excerpt.includes('VALIDACAO IA'));doc=afterWindow.inventory.find(x=>x.type==='document'&&x.documentName==='LAB_AI');assert.ok(target);
 const color=await apply('Aplique a cor vermelha ao texto selecionado.',afterWindow,target,doc);assert.deepEqual(color.resolved.operation.changes,{'font/color':'#DC3545'});save('color-operation',color);
 const afterColor=await inspect(projectId);save('color-inspect',afterColor);fs.writeFileSync(out+'/color.f',await download(projectId));
 const unchanged=await inspect(projectId);const updated=unchanged.inventory.find(x=>x.nativePath===target.nativePath);assert.equal(updated.fields['font/color'],'#DC3545');
 const ambiguous=await post('resolve',{projectId,fileHash:unchanged.fileHash,message:'Mude a cor do texto selecionado para vermelha ou azul.',selectedIds:[updated.id],currentDocumentId:unchanged.inventory.find(x=>x.type==='document'&&x.documentName==='LAB_AI').id});assert.equal(ambiguous.status,'clarify');save('ambiguous-color',ambiguous);
 save('preview',await preview(projectId,'SaudeA3'));const end=await inspect(projectId);assert.equal(end.fileHash,afterColor.fileHash);
 save('result',{projectId,windowCreated:true,colorRecognizedWithoutQuestion:true,ambiguousColorStillAsks:true,roundTrip:'passed',finalHash:end.fileHash,preview:'preview.json',note:'LAB_AI tem condição 0: o preview deve manter Frente e Verso iguais. Documento de laboratório e sua janela conferidos por releitura.'});
 console.log(JSON.stringify({windowCreated:true,colorRecognizedWithoutQuestion:true,ambiguousColorStillAsks:true,finalHash:end.fileHash}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
