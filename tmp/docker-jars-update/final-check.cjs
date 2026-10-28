const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto'),{execFileSync}=require('child_process');
const JSZip=require('../../frontend/node_modules/jszip');
const output='output/docker-jars-validation/resultado.json';
const docker=args=>execFileSync('docker',args,{encoding:'utf8'}).trim();
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 const report=JSON.parse(fs.readFileSync(output));assert.equal(report.status,'passed');
 report.deployment={containers:[],jars:[],nginxUpstream:'http://web:8081',mirrorBind:'./format-web/projects -> /app/projects-mirror',localEclipseBackendStoppedToRelease8081:true};
 for(const name of ['format-web','format-api','format-nginx']){
  const state=JSON.parse(docker(['inspect',name,'--format','{{json .State}}']));assert(state.Running,name);
  if(name==='format-web')assert.equal(state.Health.status||state.Health.Status,'healthy');
  report.deployment.containers.push({name,status:state.Status,health:state.Health?.Status||null,restarts:Number(docker(['inspect',name,'--format','{{.RestartCount}}'])),image:docker(['inspect',name,'--format','{{.Image}}'])});
 }
 const manager=fs.readFileSync('format-manager/target/jformat-manager-1.0.0.jar');
 for(const [name,hostFile,containerFile]of [['format-web','format-web/target/format-web-0.0.1-SNAPSHOT.jar','/app/format-web.jar'],['format-api','format-api/target/format-api-1.0.0.1.jar','/app/format-api/target/format-api.jar']]){
  const bytes=fs.readFileSync(hostFile),expected=digest(bytes),actual=docker(['exec',name,'sha256sum',containerFile]).split(/\s/)[0];assert.equal(actual,expected);
  const zip=await JSZip.loadAsync(bytes);assert(manager.equals(await zip.file('BOOT-INF/lib/jformat-manager-1.0.0.jar').async('nodebuffer')));
  report.deployment.jars.push({container:name,sha256:actual,hostFile,managerEmbeddedMatches:true,managerSha256:digest(manager)});
 }
 const response=await fetch('http://localhost/api/app/config');assert.equal(response.status,200);report.deployment.nginxHttpStatus=response.status;
 report.corrections=['Importação passou a resolver a conta pelo AuthenticatedUserService, como os demais endpoints. JWT e OIDC foram testados com usuário comum.','O espelho do web foi vinculado às pastas locais existentes, preservando o acesso sem mover ou apagar arquivos.','O format-api recebeu a mesma versão do manager; seu runtime Wine/DLLs/fontes foi preservado.'];
 report.scopeLimits=['Importação, abertura de documentos, inventário nativo e preview foram executados nos containers. Não foi gerado PDF e não foi certificada a disponibilidade das imagens externas não fornecidas.'];
 fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,containers:report.deployment.containers.map(c=>({name:c.name,status:c.status,health:c.health})),imports:report.cases.map(c=>({name:c.name,status:c.status,documents:c.documents,labelsPerSheet:c.labelsPerSheet}))}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
