const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const input=JSON.parse(fs.readFileSync(__dirname+'/real-plan-draft.json','utf8'));
 const arquivo={name:'ApoliceVD2_P1.f',base64:fs.readFileSync(__dirname+'/../novo-teste-import/ApoliceVD2_P1.f').toString('base64')};
 async function post(route,body){const res=await fetch('http://127.0.0.1:3218'+route,{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+process.env.FORMAT_WEB_BEARER_TOKEN},body:JSON.stringify(body),signal:AbortSignal.timeout(120000)});const value=await res.json();assert.equal(res.status,200,JSON.stringify(value));return value;}
 const planned=await post('/api/pontof/planejar-edicao',{arquivo,snapshotSha256:input.plan.snapshotSha256,alteracoes:input.plan.changes});
 const applied=await post('/api/pontof/editar',{arquivo,plano:planned.plano});
 assert.equal(applied.changes.length,24);assert.equal(applied.scope.documents.length,12);assert.equal(applied.verification.untouchedItemsUnchanged,true);assert.equal(applied.alteracao.salva,false);assert.equal(applied.alteracao.binarioGerado,false);
 for(const change of applied.changes){const value=change.pointer.split('/').filter(Boolean).reduce((v,k)=>v[k],applied.layout);assert.equal(change.property.split('/').reduce((v,k)=>v[k],value),change.after);assert.ok(change.context.label!==undefined);}
 const result={status:'passed',testedAt:new Date().toISOString(),requestOrigin:'actual-original-f-via-two-http-parses',changes:24,documents:12,planId:planned.plano.planId,resultSnapshot:applied.snapshotSha256,verification:applied.verification,alteracao:applied.alteracao,planExecutions:planned.execucoes,applyExecutions:applied.execucoes};
 fs.writeFileSync(__dirname+'/real-http-plan.json',JSON.stringify(result,null,2));fs.writeFileSync(__dirname+'/real-visible-diff.json',JSON.stringify({planId:planned.plano.planId,changes:applied.changes,scope:applied.scope,verification:applied.verification},null,2));console.log(JSON.stringify(result));
})().catch(e=>{console.error(e);process.exitCode=1;});
