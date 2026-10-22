const test=require('node:test'),assert=require('node:assert/strict'),path=require('node:path'),{spawn}=require('node:child_process');
test('HTTP exposes and executes reviewed plans; old implicit mutations and stale plans are rejected',async t=>{
 const child=spawn(process.execPath,['api/server.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,FORMAT_LLM_API_PORT:'0',FORMAT_LLM_API_HOST:'127.0.0.1'},windowsHide:true});
 t.after(()=>child.kill());let logs='';const base=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Server startup timeout: '+logs)),10000);child.stdout.on('data',chunk=>{logs+=chunk;const match=logs.match(/ativa em (http:\/\/127\.0\.0\.1:\d+)/);if(match){clearTimeout(timer);resolve(match[1]);}});child.on('error',reject);child.on('exit',code=>{clearTimeout(timer);reject(Error('Server exited '+code));});});
 const post=async(route,body)=>{const res=await fetch(base+route,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});return {status:res.status,body:await res.json()};};
 const schema=await (await fetch(base+'/openapi.json')).json();assert.ok(schema.paths['/api/pontof/planejar-edicao']);assert.ok(schema.paths['/api/pontof/aplicar-plano']);
 const layout={listaDocumentos:[{name:'Doc',documentSize:{width:200,height:200},layout:[{type:'text',content:'Antes',x:5,y:10,width:30,height:5}]}]};
 const d=await post('/api/pontof/diagnosticar',{layout});assert.equal(d.status,200);const target=d.body.diagnostico.elements[0];
 const mapped=await post('/api/pontof/mapear',{layout});assert.equal(mapped.status,200);assert.equal(mapped.body.elementos[0].id,target.id);assert.equal(mapped.body.snapshotSha256,d.body.diagnostico.snapshotSha256);
 const p=await post('/api/pontof/planejar-edicao',{layout,snapshotSha256:d.body.diagnostico.snapshotSha256,alteracoes:[{targetId:target.id,documentIndex:0,property:'content',before:'Antes',after:'Depois'}]});assert.equal(p.status,200);
 const result=await post('/api/pontof/editar',{layout,plano:p.body.plano});assert.equal(result.status,200);assert.equal(result.body.layout.listaDocumentos[0].layout[0].content,'Depois');assert.equal(result.body.alteracao.binarioGerado,false);
 assert.equal((await post('/api/pontof/editar',{arquivo:{base64:'YWJj'}})).status,409);
 const changed=structuredClone(layout);changed.listaDocumentos[0].layout[0].content='Outra versao';assert.equal((await post('/api/pontof/aplicar-plano',{layout:changed,plano:p.body.plano})).status,409);
 const forged=structuredClone(p.body.plano);forged.changes[0].after='Outro local';assert.equal((await post('/api/pontof/editar',{layout,plano:forged})).status,409);
 assert.equal((await post('/api/pontof/planejar-edicao',{layout,arquivo:{base64:'YWJj'}})).status,400);
});
