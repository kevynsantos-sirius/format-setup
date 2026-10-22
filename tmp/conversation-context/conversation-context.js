const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const {fillAnswer}=require('./editor-properties');
const references=s=>/\b(continue|continuar|retome|retomar|onde paramos|mesmo|mesma|nele|nela|nesse|nessa|naquele|naquela|anterior|tambem)\b/.test(norm(s));
const progress=s=>/\b(onde paramos|ultima (?:tarefa|alteracao)|o que (?:ficou|falta|estavamos)|resuma (?:a |nossa )?conversa)\b/.test(norm(s));
const bareResume=s=>/^(?:(?:agora|vamos|podemos|por favor)\s+)*(?:continue|continuar|retome|retomar)(?:\s+(?:a tarefa|de onde paramos|o trabalho))?[.!?]*$/.test(norm(s));
const explicitAction=s=>/\b(mude|altere|edite|coloque|deixe|aplique|mova|crie|adicione|duplique|remova|exclua|renomeie)\b/.test(norm(s));
function targetMatch(task,inventory,fileHash){
 const anchors=task.anchors||[];
 if(anchors.length!==1)return {rows:[],ambiguous:anchors.length>1};
 const old=anchors[0];
 const exact=inventory.filter(r=>r.type===old.type&&r.fingerprint===old.fingerprint&&r.documentName===old.documentName);
 if(fileHash===task.fileHash){const row=exact.find(r=>r.nativePath===old.nativePath);if(row)return {row,rows:[row]};}
 if(exact.length===1)return {row:exact[0],rows:exact};
 if(exact.length>1)return {rows:exact,ambiguous:true};
 const rows=inventory.filter(r=>r.type===old.type&&r.documentName===old.documentName&&((old.name&&r.name===old.name)||(old.excerpt&&r.excerpt===old.excerpt)));
 return {rows,changed:true};
}
function prepareConversation(body,parse){
 if(body.intent||body.followup)return {body};
 const current=parse(body.message),selected=Array.isArray(body.selectedIds)?body.selectedIds:[];
 const explicitTarget=Boolean(current.selector||current.name||current.document||current.destination);
 let task=body.conversationTask;
 // Legacy conversations can supply a literal selector, but never an assistant-authored command or an ID.
 if(!task?.intent){
  const previous=[...(body.conversation||[])].reverse().find(m=>m.role==='user'&&m.text!==body.message&&(()=>{const i=parse(m.text);return i.action==='edit'&&Boolean(i.selector||i.name);})());
  if(previous){const intent=parse(previous.text);task={intent,request:previous.text,status:'unconfirmed-history',anchors:[]};}
 }
 const wantsResume=bareResume(body.message),isProgress=progress(body.message);
 const hasChanges=Object.keys(current.changes||{}).length||current.propertyRequests?.length;
 const contextual=!explicitTarget&&(wantsResume||isProgress||references(body.message)||hasChanges||/^\s*(?:agora\s+)?-?\d+(?:[.,]\d+)?\s*$/.test(norm(body.message))||/^(Arial|Tahoma|Calibri|Verdana|Helvetica|Times New Roman|Courier New)$/i.test(body.message.trim()));
 if(!contextual||(!task?.intent&&!wantsResume&&!isProgress))return {body};
 const early=(message,extras={})=>({early:{status:'clarify',contextOnly:true,conversationUsed:true,message,candidates:[],...extras}});
 if(!task?.intent)return early('Não encontrei uma tarefa anterior identificada nesta conversa. Selecione o item ou descreva o que deseja continuar.');
 const match=targetMatch(task,body.inventory,body.fileHash);
 if(isProgress||wantsResume&&task.status==='applied'){
  const status=task.status==='applied'?'A última tarefa foi salva':task.status==='clarify'?'A tarefa ficou aguardando informações':'A tarefa ficou em proposta, sem confirmação de gravação';
  const check=match.row?'Localizei novamente o alvo no .f atual.':task.anchors?.length?'O alvo anterior mudou, ficou ambíguo ou não está mais no .f atual.':'O destino precisa ser identificado no .f atual.';
  return early(`${status}: ${task.request}. ${check} ${task.status==='applied'?'Qual alteração deseja fazer agora?':'Você pode continuar informando os dados que faltaram ou pedir para retomar a proposta.'}`,match.row?{target:match.row}:{});
 }
 if(current.action!=='edit'&&!wantsResume)return {body};
 if(wantsResume&&!['edit','create'].includes(task.intent.action))return early('A tarefa anterior envolve remoção ou cópia. Informe explicitamente a operação desejada para eu conferir o alvo atual e preparar uma nova revisão.');
 let intent=current,followup;
 const resumePending=wantsResume||task.status==='clarify'&&!explicitAction(body.message)&&!explicitTarget;
 if(resumePending){intent=structuredClone(task.intent);if(!wantsResume)followup=body.message;}
 else if(!hasChanges&&task.status==='applied'){
  const requests=task.intent.propertyRequests||[];
  if(requests.length===1){const pending={...structuredClone(requests[0])};delete pending.value;intent={action:'edit',changes:{},data:{},propertyRequests:[pending]};intent.propertyRequests=fillAnswer(intent.propertyRequests,body.message,match.row||{});}
 }
 if(selected.length){
  if(resumePending&&task.anchors?.length===1&&(!match.row||!selected.includes(match.row.id)))return early('A seleção atual é diferente ou o alvo da tarefa anterior mudou. Desmarque-a para retomar ou informe uma nova alteração para o item selecionado.');
  // A fresh explicit selection takes priority for a new command; old edits are not carried over.
  return {body:{...body,intent,followup,conversationUsed:resumePending,contextRequest:resumePending?task.request:body.message}};
 }
 if(current.type&&task.anchors?.[0]?.type&&current.type!==task.anchors[0].type&&!wantsResume)return {body};
 if(task.anchors?.length>1){
  intent={...intent,type:current.type||task.intent.type,selector:task.intent.selector,name:task.intent.name,document:task.intent.document};
  return {body:{...body,intent,followup,conversationUsed:true,contextRequest:resumePending?task.request:body.message}};
 }
 if(!task.anchors?.length){
  if(task.status==='unconfirmed-history'){
   intent={...intent,type:current.type||task.intent.type,selector:task.intent.selector,name:task.intent.name,document:task.intent.document};
   return {body:{...body,intent,followup,conversationUsed:true,contextRequest:resumePending?task.request:body.message}};
  }
  // Missing candidate choice/destination is resolved anew from the saved intent, never an old ID.
  if(resumePending)return {body:{...body,intent,followup,conversationUsed:true,contextRequest:task.request}};
  return early('A tarefa anterior não tem um alvo único confirmado. Selecione o item atual ou descreva o alvo.');
 }
 if(!match.row)return {early:{status:'clarify',conversationUsed:true,message:match.changed?'O alvo discutido mudou ou desapareceu no .f atual. Confira os candidatos atuais antes de continuar.':'Há mais de uma correspondência atual para o alvo anterior. Qual delas deseja editar?',intent,candidates:match.rows,contextRequest:resumePending?task.request:body.message}};
 return {body:{...body,intent,followup,chosenId:match.row.id,conversationUsed:true,contextRequest:resumePending?task.request:body.message}};
}
function contextForQuestion(body){
 const history=(body.conversation||[]).filter(m=>['user','assistant'].includes(m.role)&&typeof m.text==='string').slice(-3).map(m=>({role:m.role,text:m.text.slice(0,180)}));
 const task=body.conversationTask?.intent?{status:body.conversationTask.status,request:String(body.conversationTask.request||'').slice(0,240)}:null;
 return {history,task};
}
module.exports={prepareConversation,targetMatch,contextForQuestion};
