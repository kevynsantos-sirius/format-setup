const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createPlan,applyPlan}=require('../api/edit-plans');
const {inspectLayout}=require('../api/diagnostics');
const {consult}=require('../api/consultation');
const {search,buildIndex}=require('../api/knowledge');
const root=path.resolve(__dirname,'..');
function draft(){return {metadata:{untouched:'keep'},listaDocumentos:[0,1,2].map(i=>({name:'Doc'+i,documentSize:{width:300,height:300},layout:[{type:'text',name:'Titulo',content:'Titulo '+i,x:10,y:20,width:80,height:10,font:{color:'#000000',size:12}},{type:'detalhe',nome:'LIN01',x:20,y:60,width:60,height:20,conditional:'Tipo = '+i,condDet:'Print = 1',nCab:0,nDet:1,nRod:0,nSum:0,bandas:[{kind:'detalhe',defined:true,expressaoCondicao:'Selecao = '+i,camposTexto:[{type:'text',content:[{type:'text',content:'Linha '+i},{type:'campoSaida',expression:'MASCARA(Valor,"999")'}],x:1,y:5,width:20,height:5}]}]}]}))};}
function request(layout){const report=inspectLayout(layout);return {snapshotSha256:report.snapshotSha256,alteracoes:report.elements.filter(e=>e.type==='text'&&!e.parentId).map(e=>({targetId:e.id,documentIndex:e.documentIndex,property:'content',before:layout.listaDocumentos[e.documentIndex].layout[0].content,after:'Titulo revisado '+e.documentIndex}))};}
test('multi-document plan changes several visible fields and preserves every undeclared field',()=>{
 const original=draft(),req=request(original),report=inspectLayout(original),child=report.elements.find(e=>e.parentId);
 req.alteracoes.push({targetId:child.id,documentIndex:child.documentIndex,property:'content/0/content',before:'Linha 0',after:'Linha revisada'});
 const plan=createPlan(original,req),result=applyPlan(original,plan);
 assert.equal(plan.scope.documents.length,3);assert.equal(plan.scope.targets.length,4);assert.equal(plan.verification.untouchedItemsUnchanged,true);
 assert.equal(result.layout.listaDocumentos[0].layout[1].bandas[0].camposTexto[0].content[1].expression,'MASCARA(Valor,"999")');
 assert.deepEqual(original,draft());assert.equal(result.alteracao.salva,false);assert.equal(result.alteracao.binarioGerado,false);assert.equal(result.requiresVisualReview,true);
 assert.equal(result.layout.listaDocumentos[2].layout[0].content,'Titulo revisado 2');
});
test('stale snapshots, wrong documents, omitted preconditions and tampered plans cannot edit',()=>{
 const layout=draft(),req=request(layout),plan=createPlan(layout,req);
 const changed=draft();changed.metadata.untouched='different';
 assert.throws(()=>applyPlan(changed,plan),e=>e.status===409);
 assert.throws(()=>createPlan(layout,{...req,snapshotSha256:'wrong'}),e=>e.status===409);
 const wrong=structuredClone(req);wrong.alteracoes[0].documentIndex=1;assert.throws(()=>createPlan(layout,wrong),e=>e.status===409);
 const missing=structuredClone(req);delete missing.alteracoes[0].before;assert.throws(()=>createPlan(layout,missing),e=>e.status===409);
 const forged=structuredClone(plan);forged.changes[0].after='unreviewed';assert.throws(()=>applyPlan(layout,forged),e=>e.status===409);
});
test('unknown fields, token replacement, duplicate leaves and invalid geometry are rejected',()=>{
 const layout=draft(),req=request(layout),report=inspectLayout(layout),child=report.elements.find(e=>e.parentId),detail=report.elements.find(e=>e.type==='detalhe');
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[...req.alteracoes,req.alteracoes[0]]}),/repetido/);
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[{targetId:child.id,documentIndex:0,property:'content',before:layout.listaDocumentos[0].layout[1].bandas[0].camposTexto[0].content,after:'lost token'}]}),/escalares/);
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[{...req.alteracoes[0],property:'__proto__/polluted'}]}),/nao suportado/);
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[{targetId:detail.id,documentIndex:0,property:'x',before:20,after:400}]}),/estrutural/);
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[{targetId:detail.id,documentIndex:0,property:'width',before:60,after:-1}]}),/positiva/);
 assert.throws(()=>createPlan(layout,{...req,alteracoes:[]}),/1 a 100/);
});
test('condition edits preserve the other condition and band groups',()=>{
 const layout=draft(),report=inspectLayout(layout),target=report.elements.find(e=>e.type==='detalhe');
 const plan=createPlan(layout,{snapshotSha256:report.snapshotSha256,alteracoes:[{targetId:target.id,documentIndex:0,property:'conditional',before:'Tipo = 0',after:'Tipo = 30'},{targetId:target.id,documentIndex:0,property:'bandas/0/expressaoCondicao',before:'Selecao = 0',after:'Selecao = 31'}]});
 const result=applyPlan(layout,plan);assert.equal(result.layout.listaDocumentos[0].layout[1].condDet,'Print = 1');assert.equal(result.layout.listaDocumentos[0].layout[1].bandas[0].kind,'detalhe');
});
test('file-bound plans survive transient parser paths but still bind every declared value and target context',()=>{
 const layout=draft(),hash='a'.repeat(64),req=request(layout);req.snapshotSha256=hash;
 for(const change of req.alteracoes)change.targetId=hash.slice(0,16)+change.targetId.slice(16);
 const plan=createPlan(layout,req,hash),reloaded=draft();reloaded.metadata.temporaryAssetPath='/parse/new-session';
 const applied=applyPlan(reloaded,plan,hash);assert.equal(applied.layout.metadata.temporaryAssetPath,'/parse/new-session');
 reloaded.listaDocumentos[0].layout[0].x=99;assert.throws(()=>applyPlan(reloaded,plan,hash),/Plano alterado/);
});
test('reviewed rules answer paraphrases rather than only the original six questions',async()=>{
 const cases=[['Uma saudacao Caro (a) pode chamar a DLL?','texto-literal'],['Se escrever uma formula no texto fixo ela executa uma funcao?','texto-literal'],['Posso substituir a regra da janela pela condicao de impressao?','condicoes-distintas'],['O primeiro detalhe deve preencher o cabecalho vazio?','cabecalho-vazio'],['GetStr gera zeros usando os numeros dos argumentos?','mascara-dados'],['Job PROCESSING significa sucesso do PDF final?','preview-nao-final'],['Posso afirmar que todas as paginas estao corretas pelo preview inicial?','preview-nao-final'],['Icone fallback comprova a imagem original importada?','recursos-externos'],['Faltam imagens no ZIP, houve perda na importacao?','recursos-externos'],['A janela detalhe rotacionada fica fora do papel?','geometria-rotacao'],['Posso editar pelo mesmo nome em dois documentos?','identidade-alvo'],['A funcao existe no catalogo da Sirius32; isso prova execucao?','catalogo-execucao'],['NDet e quantidade de repeticoes?','bandas-definicoes'],['Como preservar NCab no binario durante gravacao?','gravacao-releitura']];
 for(const [question,fact] of cases){const result=await consult(root,{modo:'dev',pergunta:question},{fetchImpl:async()=>new Response(JSON.stringify({message:{content:'{"ids":["fake-id"],"resposta":"Salvei tudo; texto literal executa DLL"}'}}))});assert.ok(result.evidencias.some(e=>e.factId===fact),question);assert.equal(result.modelo.status,'fallback-verified-index');assert.equal(result.confiabilidade.freeModelTextPublished,false);assert.equal(result.resposta.includes('Salvei tudo'),false);}
});
test('valid selection is accepted; unavailable model and fabricated IDs use explicit fallback',async()=>{
 const question='Texto literal Caro executa MASCARA?',ids=search(root,'dev',question).map(s=>s.factId);
 const good=await consult(root,{modo:'dev',pergunta:question},{fetchImpl:async()=>new Response(JSON.stringify({message:{content:JSON.stringify({ids})}}))});
 assert.equal(good.modelo.status,'accepted');assert.match(good.resposta,/não executa funções/);
 const offline=await consult(root,{modo:'dev',pergunta:question},{fetchImpl:async()=>{throw new Error('offline');}});assert.equal(offline.modelo.status,'fallback-verified-index');assert.match(offline.resposta,/não executa funções/);
});
test('current draft values and repeated names come from observation even with hostile model output',async()=>{
 const result=await consult(root,{modo:'dev',pergunta:'Quero alterar a condicao da LIN01',layout:draft()},{fetchImpl:async()=>{throw Error('offline');}});
 assert.equal(result.diagnostico.targetCandidates,3);assert.match(result.resposta,/3 candidatos/);assert.match(result.resposta,/Tipo = 0/);assert.match(result.resposta,/Tipo = 2/);assert.match(result.resposta,/Print = 1/);assert.equal(result.alteracao.aplicada,false);assert.equal(result.execucoes[0].status,'failed');
});
test('knowledge freshness invalidates changed reviewed source and preserves old index on bad proof',t=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'format-fresh-'));t.after(()=>fs.rmSync(temp,{recursive:true,force:true}));
 fs.mkdirSync(path.join(temp,'knowledge'));fs.mkdirSync(path.join(temp,'config'));const cfg={sources:[{name:'test',path:path.join(temp,'knowledge')}],excludeDirectories:[],includeExtensions:['.md'],maxFileBytes:1000,chunkSize:500,chunkOverlap:0};
 fs.writeFileSync(path.join(temp,'config/context-sources.json'),JSON.stringify(cfg));fs.writeFileSync(path.join(temp,'knowledge/proof.md'),'Texto literal nao executa DLL.');fs.writeFileSync(path.join(temp,'knowledge/regras-verificadas.json'),JSON.stringify([{id:'x',match:[['DLL']],answer:'Texto literal nao executa DLL.',source:'proof.md',quote:'Texto literal nao executa DLL.'}]));
 const first=buildIndex(temp,'dev');const before=fs.readFileSync(first.output,'utf8');assert.equal(search(temp,'dev','DLL')[0].factId,'x');fs.writeFileSync(path.join(temp,'knowledge/proof.md'),'Fonte alterada');assert.deepEqual(search(temp,'dev','DLL'),[]);assert.throws(()=>buildIndex(temp,'dev'),/Evidencia ausente/);assert.equal(fs.readFileSync(first.output,'utf8'),before);
});
