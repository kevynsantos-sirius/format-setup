const {isDeepStrictEqual:equal}=require('node:util');
const {digest}=require('./knowledge');
const {inspectLayout}=require('./diagnostics');
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
function read(object,pointer){return pointer.split('/').filter(Boolean).reduce((v,k)=>v?.[k],object);}
function valueSlot(item,property){
  if(!['text','campoSaida','detalhe','image','fio','barcode','qrcode','blocoEnderecamento'].includes(item?.type)) fail('Tipo de item sem contrato de edicao verificado',422);
  const general=['x','y','width','height','orientation','conditional','alignment'];
  const specific={text:['content','font/color','font/family','font/size','font/weight','font/italico','font/sublinhado','font/tachado'],campoSaida:['expressao','expression','mask','mascara'],detalhe:['condDet','condQuebra','ocorrenciaIndDet'],image:['assetPath','logoFileName','occurrence'],fio:['color','espessura']};
  let permitted=general.includes(property)||(specific[item.type] || []).includes(property);
  if(item.type==='text' && /^content\/\d+\/content$/.test(property)) permitted=read(item,property.replace(/\/content$/,''))?.type==='text';
  if(item.type==='detalhe' && /^bandas\/\d+\/expressaoCondicao$/.test(property)) permitted=['cabecalho','detalhe','rodape','sumario'].includes(read(item,property.replace(/\/expressaoCondicao$/,''))?.kind);
  if(!permitted) fail(`Campo nao suportado no plano: ${item.type}.${property}`,422);
  const keys=property.split('/'),key=keys.pop(),owner=keys.reduce((v,k)=>v?.[k],item);
  if(!owner || !Object.hasOwn(owner,key)) fail(`Campo ausente; nao criar estrutura implicitamente: ${property}`,422);
  return {owner,key};
}
function checkValue(property,before,after){
  if(equal(before,after)) fail('Alteracao sem efeito',422);
  if(typeof before!==typeof after || after===null || !['string','number','boolean'].includes(typeof after)) fail('Somente campos escalares do mesmo tipo podem ser alterados',422);
  if(typeof after==='number' && (!Number.isFinite(after) || Math.abs(after)>10000)) fail('Numero fora do intervalo permitido',422);
  if(['x','y','width','height','orientation','alignment','font/size','font/weight','espessura'].includes(property) && typeof after!=='number') fail('Campo numerico com tipo invalido',422);
  if(/^(width|height)$/.test(property) && after<=0) fail('Dimensao deve ser positiva',422);
  if(property==='orientation' && ![0,90,180,270].includes(after)) fail('Orientacao deve ser 0, 90, 180 ou 270',422);
  if(property==='alignment' && ![0,1,2,3].includes(after)) fail('Alinhamento invalido',422);
  if(property==='font/size' && after<=0) fail('Tamanho de fonte deve ser positivo',422);
  if(/color$/.test(property) && (typeof after!=='string'||!/^#[0-9a-f]{6}$/i.test(after))) fail('Cor deve ser hexadecimal #RRGGBB',422);
  if(typeof after==='string' && (after.length>32000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(after))) fail('Texto invalido; tokens legados nao podem ser recriados implicitamente',422);
}
function createPlan(layout,request,sourceHash){
  const baseline=JSON.parse(JSON.stringify(layout));
  const report=inspectLayout(baseline,sourceHash?{fileHash:sourceHash}:{});
  if(!request.snapshotSha256 || request.snapshotSha256!==report.snapshotSha256) fail('Snapshot ausente ou desatualizado; reinspecione antes de editar',409);
  if(!Array.isArray(request.alteracoes) || !request.alteracoes.length || request.alteracoes.length>100) fail('alteracoes deve conter de 1 a 100 campos explicitos');
  const proposed=JSON.parse(JSON.stringify(baseline)),changed=new Set(),changes=[];
  for(const change of request.alteracoes){
    const target=report.elements.find(e=>e.id===change.targetId);
    if(!target || change.documentIndex!==target.documentIndex) fail('Alvo nao pertence ao snapshot/documento observado',409);
    if(typeof change.property!=='string') fail('property obrigatoria');
    const location=target.pointer+'/'+change.property;
    if(changed.has(location)) fail('Campo repetido no mesmo plano');
    const oldSlot=valueSlot(read(baseline,target.pointer),change.property);
    if(!Object.hasOwn(change,'before')||!equal(oldSlot.owner[oldSlot.key],change.before)) fail('Valor anterior diverge do snapshot; plano recusado',409);
    checkValue(change.property,change.before,change.after);
    const slot=valueSlot(read(proposed,target.pointer),change.property);
    slot.owner[slot.key]=change.after; changed.add(location);
    changes.push({targetId:target.id,documentIndex:target.documentIndex,documentName:report.documents[target.documentIndex].name,type:target.type,name:target.name,bandKind:target.bandKind,coordinateSpace:target.coordinateSpace,
      context:{label:target.label,xMm:target.xMm,yMm:target.yMm,widthMm:target.widthMm,heightMm:target.heightMm,orientation:target.orientation,boundsMm:target.boundsMm},
      pointer:target.pointer,property:change.property,before:change.before,after:change.after});
  }
  const post=inspectLayout(proposed),beforeCodes=new Set(report.findings.map(f=>f.code+'|'+f.elementId.split(':').slice(1).join(':')));
  const introduced=post.findings.filter(f=>!beforeCodes.has(f.code+'|'+f.elementId.split(':').slice(1).join(':')));
  if(introduced.some(f=>['DETAIL_OUTSIDE_DOCUMENT','GEOMETRY_NOT_NUMERIC','BAND_COUNT_MISMATCH'].includes(f.code))) fail('Plano introduz problema estrutural: '+introduced.map(f=>f.code).join(', '),422);
  // Revert every declared leaf; anything else must remain byte-identical JSON.
  const remainder=JSON.parse(JSON.stringify(proposed));
  for(const change of changes){const slot=valueSlot(read(remainder,change.pointer),change.property);slot.owner[slot.key]=change.before;}
  if(!equal(remainder,baseline)) fail('Mudanca fora do escopo declarado',409);
  const core={schemaVersion:1,snapshotSha256:report.snapshotSha256,resultSnapshotSha256:post.snapshotSha256,changes};
  // File parses may emit new temporary resource URLs. Bind the reviewed intent
  // to the binary hash and complete target context, not those preview paths.
  const intent={schemaVersion:1,snapshotSha256:report.snapshotSha256,changes};
  return {...core,planId:digest(JSON.stringify(intent)),status:'planned-not-applied',scope:{documents:[...new Set(changes.map(c=>c.documentIndex))],targets:[...new Set(changes.map(c=>c.targetId))],fields:changes.length},
    verification:{untouchedItemsUnchanged:true,structure:'executed',visual:'pending',nativePreview:'not-executed',binaryRoundTrip:'not-executed',finalPdf:'not-executed'},requiresVisualReview:true,proposedLayout:proposed};
}
function applyPlan(layout,plan,sourceHash){
  if(!plan?.planId || !Array.isArray(plan.changes)) fail('plano com planId obrigatorio; solicite planejar-edicao antes',409);
  const checked=createPlan(layout,{snapshotSha256:plan.snapshotSha256,alteracoes:plan.changes},sourceHash);
  if(checked.planId!==plan.planId) fail('Plano alterado ou snapshot divergente',409);
  return {ok:true,operacao:'editar-draft',planId:checked.planId,snapshotSha256:checked.resultSnapshotSha256,layout:checked.proposedLayout,changes:checked.changes,scope:checked.scope,verification:checked.verification,
    alteracao:{aplicada:true,destino:'returned-json-draft',salva:false,binarioGerado:false},requiresVisualReview:true};
}
module.exports={createPlan,applyPlan};
