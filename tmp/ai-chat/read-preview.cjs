const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('C:/Users/Kevyn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const JSZip=require('../../frontend/node_modules/jszip');
const {FormatTools}=require('C:/workspace/format/format-agent/api/format-tools');
const out=path.resolve(__dirname,'../../output/ai-chat-validation');fs.mkdirSync(out,{recursive:true});
const report={startedAt:new Date().toISOString(),environment:'Isolated H2 database + filesystem; real backend 8091, frontend 5174, service JWT; original projects untouched',checks:[]};
let cached;
async function token(){if(!cached||cached.until<Date.now()){const r=await fetch('http://localhost:8090/oauth2/token',{method:'POST',headers:{authorization:'Basic '+Buffer.from('format-api-client:'+process.env.TEST_CLIENT_SECRET).toString('base64'),'content-type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials&scope=format.read%20format.process%20format.admin'});const t=await r.json();assert(t.access_token);cached={token:t.access_token,until:Date.now()+30000};}return cached.token;}
const tools=new FormatTools({webBaseUrl:'http://localhost:8091',apiBaseUrl:'http://localhost:8082',timeoutMs:180000});const request=tools.request.bind(tools);tools.request=async(...args)=>{tools.tokens.web=await token();return request(...args)};
function saveReport(){fs.writeFileSync(out+'/validation.json',JSON.stringify(report,null,2));}

(async()=>{tools.fetch=async(...args)=>{const r=await fetch(...args);if(!r.headers.get('content-type')?.includes('json'))console.log('NonJSON',r.status,r.url,r.headers.get('content-type'),(await r.clone().text()).slice(0,200));return r;}; const parsed=await tools.parse({name:'NovoTeste-chat-editado.f',base64:fs.readFileSync(out+'/NovoTeste-chat-editado.f').toString('base64')});fs.writeFileSync(__dirname+'/reread-layout.json',JSON.stringify(parsed.layout));console.log('Parsed',parsed.layout.listaDocumentos.length);})().catch(e=>{console.error(e);process.exitCode=1});