const fs=require('node:fs');
const file=__dirname+'/server.js';
let code=fs.readFileSync(file,'utf8');
code=code.replace("const { FormatTools } = require('./format-tools');","const { FormatTools } = require('./format-tools');\nconst {createPlan,applyPlan}=require('./edit-plans');");
const from=code.indexOf('async function editarPontoF(body)'),to=code.indexOf('async function mapearPontoF(body)');
if(from<0||to<from)throw Error('Edit anchors not found');
code=code.slice(0,from)+`async function planSource(body,authorization){
  if([body.arquivo,body.layout,body.projectId].filter(Boolean).length!==1) throw Object.assign(new Error('Informe exatamente uma origem: arquivo, layout ou projectId'),{status:400});
  const tools=new FormatTools(JSON.parse(fs.readFileSync(path.join(ROOT,'config/format-tools.json'),'utf8')),{authorization});
  if(body.arquivo) return {...await tools.parse(body.arquivo),executions:tools.executions};
  if(body.projectId) return {layout:await tools.loadProject(body.projectId),executions:tools.executions};
  return {layout:body.layout,executions:[]};
}
async function planejarPontoF(body,authorization){
  const source=await planSource(body,authorization);
  return {ok:true,plano:createPlan(source.layout,body,source.fileHash),execucoes:source.executions,alteracao:{aplicada:false,salva:false}};
}
async function editarPontoF(body,authorization){
  if(!body.plano?.planId) throw Object.assign(new Error('Edicao exige plano revisavel e snapshot; use /api/pontof/planejar-edicao. Nao existe mais selecao automatica do primeiro texto ou fio.'),{status:409});
  const source=await planSource(body,authorization);
  return {...applyPlan(source.layout,body.plano,source.fileHash),execucoes:source.executions};
}

`+code.slice(to);
code=code.replace("if (url.pathname === '/api/pontof/editar') {\n      sendJson(res, 200, await editarPontoF(body));", "if (url.pathname === '/api/pontof/planejar-edicao') {\n      sendJson(res,200,await planejarPontoF(body,req.headers.authorization));\n      return;\n    }\n    if (url.pathname === '/api/pontof/editar' || url.pathname === '/api/pontof/aplicar-plano') {\n      sendJson(res, 200, await editarPontoF(body,req.headers.authorization));");
// New edit contract is deliberately a JSON draft, never a claim of binary save.
code=code.replace("summary: 'Edita um Ponto F recebido pela API'", "summary: 'Aplica um plano revisado ao draft JSON retornado'");
code=code.replace("description: 'Recebe um .f em base64 e devolve o .f modificado em base64. Use elemento, obtido no inventario, para editar um texto especifico.'", "description: 'Exige plano e snapshot. Retorna draft JSON com diff e verificacao de escopo. Nao grava projeto nem gera binario .f. Pedidos antigos sem plano retornam 409.'");
const schemaFrom=code.indexOf('        EditarPontoFRequest: {'),schemaTo=code.indexOf('        MapearPontoFRequest: {');
code=code.slice(0,schemaFrom)+`        EditarPontoFRequest: {type:'object',required:['plano'],properties:{layout:{type:'object'},arquivo:{$ref:'#/components/schemas/PontoFFile'},projectId:{type:'string'},plano:{type:'object',description:'Plano completo retornado por planejar-edicao, incluindo planId, snapshotSha256 e changes.'}}},
`+code.slice(schemaTo);
code=code.replace("      '/api/pontof/editar': {",`      '/api/pontof/planejar-edicao': {post:{summary:'Planeja de 1 a 100 campos em itens identificados',requestBody:{required:true,content:{'application/json':{schema:{type:'object',required:['snapshotSha256','alteracoes'],properties:{layout:{type:'object'},arquivo:{$ref:'#/components/schemas/PontoFFile'},projectId:{type:'string'},snapshotSha256:{type:'string'},alteracoes:{type:'array',minItems:1,maxItems:100,items:{type:'object',required:['targetId','documentIndex','property','before','after'],properties:{targetId:{type:'string'},documentIndex:{type:'integer'},property:{type:'string'},before:{},after:{}}}}}}}}},responses:{200:{description:'Diff completo, documentos, bandas, valores anteriores/posteriores e draft proposto. Nenhuma alteracao aplicada.'},409:{description:'Snapshot/alvo desatualizado'},422:{description:'Campo ou geometria nao suportados'}}}},
      '/api/pontof/aplicar-plano': {post:{summary:'Aplica um plano ao draft JSON; alias de editar',requestBody:{required:true,content:{'application/json':{schema:{$ref:'#/components/schemas/EditarPontoFRequest'}}}},responses:{200:{description:'Draft retornado, sem gravacao binaria ou persistencia'},409:{description:'Plano adulterado ou snapshot alterado'}}}},
      '/api/pontof/editar': {`);
code=code.replace("description: 'Requer Ollama ativo.'", "description: 'Resposta ancorada em memoria verificada e observacoes. Modelo leve ordena IDs; falha do modelo usa memoria com fallback explicito. Nao executa edicao.'");
// Existing BAT tool is launched as Java with argument arrays, never cmd.exe.
const runnerFrom=code.indexOf('function runBat(script, args)'),runnerTo=code.indexOf('function parseResumo(stdout)');
code=code.slice(0,runnerFrom)+`function runProcess(executable,args){
  return new Promise((resolve,reject)=>{
    const child=spawn(executable,args,{cwd:ROOT,windowsHide:true,shell:false});let stdout='',stderr='';
    child.stdout.on('data',v=>{stdout+=v.toString();if(stdout.length>2000000) child.kill();});
    child.stderr.on('data',v=>{stderr+=v.toString();if(stderr.length>2000000) child.kill();});
    child.on('error',reject);child.on('close',code=>code===0?resolve({stdout,stderr}):reject(Object.assign(new Error('Java tool failed: '+code),{stdout,stderr})));
  });
}
async function runBat(script,args){
  if(path.basename(script)!=='ponto-f-draft.bat') throw new Error('Ferramenta desconhecida');
  const javaHome=process.env.JAVA_HOME || 'C:/Program Files/Java/jdk-21';
  const manager='C:/workspace/format-local/format/format-manager/target/jformat-manager-1.0.0.jar';
  const bin=path.join(ROOT,'tools/ponto-f-draft/bin');fs.mkdirSync(bin,{recursive:true});
  await runProcess(path.join(javaHome,'bin/javac.exe'),['-encoding','UTF-8','-cp',manager,'-d',bin,path.join(ROOT,'tools/ponto-f-draft/PontoFDraftTool.java')]);
  return runProcess(path.join(javaHome,'bin/java.exe'),['-cp',bin+path.delimiter+manager,'PontoFDraftTool',...args.map(String)]);
}

`+code.slice(runnerTo);
fs.writeFileSync(file,code);
