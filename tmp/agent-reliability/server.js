const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { consult } = require('./consultation');
const { FormatTools } = require('./format-tools');
const {createPlan,applyPlan}=require('./edit-plans');
const {inspectLayout}=require('./diagnostics');

const ROOT = path.resolve(__dirname, '..');
const DRAFT_API = path.join(ROOT, 'draft', 'api');
const PORT = Number(process.env.FORMAT_LLM_API_PORT || 3217);
const HOST = process.env.FORMAT_LLM_API_HOST || '0.0.0.0';

function sendJson(res, status, body) {
  const json = JSON.stringify(body, null, 2);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type,authorization'
  });
  res.end(json);
}
function sendHtml(res, status, html) {
  res.writeHead(status, {
    'content-type': 'text/html; charset=utf-8',
    'access-control-allow-origin': '*'
  });
  res.end(html);
}

function openApiSpec() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Format LLM API',
      version: '0.1.0',
      description: 'API local para consultar IA e criar/editar Ponto F em fluxo controlado.'
    },
    servers: [{ url: `http://${HOST}:${PORT}` }],
    paths: {
      '/health': {
        get: {
          summary: 'Verifica se a API esta ativa',
          responses: {
            200: {
              description: 'API ativa',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/HealthResponse' } } }
            }
          }
        }
      },
      '/api/perguntar': {
        post: {
          summary: 'Pergunta para a IA com contexto do Format/Ponto F',
          description: 'Resposta ancorada em memoria verificada e observacoes. Modelo leve ordena IDs; falha do modelo usa memoria com fallback explicito. Nao executa edicao.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PerguntarRequest' } } }
          },
          responses: {
            200: { description: 'Resposta da IA', content: { 'application/json': { schema: { $ref: '#/components/schemas/PerguntarResponse' } } } },
            500: { description: 'Erro ao consultar IA' }
          }
        }
      },
      '/api/pontof/criar': {
        post: {
          summary: 'Cria um Ponto F simples',
          description: 'Retorna o arquivo .f criado em base64.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/CriarPontoFRequest' } } }
          },
          responses: {
            200: { description: 'Ponto F criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/PontoFOperationResponse' } } } },
            500: { description: 'Erro ao criar Ponto F' }
          }
        }
      },
      '/api/pontof/planejar-edicao': {post:{summary:'Planeja de 1 a 100 campos em itens identificados',requestBody:{required:true,content:{'application/json':{schema:{type:'object',required:['snapshotSha256','alteracoes'],properties:{layout:{type:'object'},arquivo:{$ref:'#/components/schemas/PontoFFile'},projectId:{type:'string'},snapshotSha256:{type:'string'},alteracoes:{type:'array',minItems:1,maxItems:100,items:{type:'object',required:['targetId','documentIndex','property','before','after'],properties:{targetId:{type:'string'},documentIndex:{type:'integer'},property:{type:'string'},before:{},after:{}}}}}}}}},responses:{200:{description:'Diff completo, documentos, bandas, valores anteriores/posteriores e draft proposto. Nenhuma alteracao aplicada.'},409:{description:'Snapshot/alvo desatualizado'},422:{description:'Campo ou geometria nao suportados'}}}},
      '/api/pontof/aplicar-plano': {post:{summary:'Aplica um plano ao draft JSON; alias de editar',requestBody:{required:true,content:{'application/json':{schema:{$ref:'#/components/schemas/EditarPontoFRequest'}}}},responses:{200:{description:'Draft retornado, sem gravacao binaria ou persistencia'},409:{description:'Plano adulterado ou snapshot alterado'}}}},
      '/api/pontof/editar': {
        post: {
          summary: 'Aplica um plano revisado ao draft JSON retornado',
          description: 'Exige plano e snapshot. Retorna draft JSON com diff e verificacao de escopo. Nao grava projeto nem gera binario .f. Pedidos antigos sem plano retornam 409.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/EditarPontoFRequest' } } }
          },
          responses: {
            200: { description: 'Draft JSON editado, sem persistencia ou binario gerado', content: { 'application/json': { schema: { type:'object',properties:{layout:{type:'object'},changes:{type:'array',items:{type:'object'}},alteracao:{type:'object'},verification:{type:'object'},requiresVisualReview:{type:'boolean'}} } } } },
            409: { description: 'Plano ausente, alterado ou snapshot divergente' },
            422: { description: 'Campo ou alteracao estrutural nao suportados' },
            500: { description: 'Erro ao editar Ponto F' }
          }
        }
      },
      '/api/pontof/diagnosticar': {
        post: {
          summary: 'Inspeciona o snapshot atual, bandas, recursos e funcoes; pode executar previews explicitamente solicitados',
          description: 'Usa as APIs configuradas do Format. Sem salvar o projeto. Requer autenticacao do Format Web via bearer ou ambiente, e credencial separada para testes nativos.',
          requestBody: { required: true, content: { 'application/json': { schema: {
            type: 'object', properties: {
              arquivo: { '$ref': '#/components/schemas/PontoFFile' },
              projectId: { type: 'string', description: 'Projeto acessivel pelo token Web; evita reenviar arquivos grandes em base64.' },
              dataAssetPath: { type: 'string', description: 'Massa de dados ja salva no projeto.' },
              layout: { type: 'object', description: 'Draft JSON atual; nao comprova leitura do binario.' },
              recursos: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' } } } },
              verificarPreview: { type: 'boolean', default: false },
              dados: { '$ref': '#/components/schemas/PontoFFile' },
              paginas: { type: 'array', items: { type: 'integer', minimum: 0 }, maxItems: 10 },
              testesFuncoes: { type: 'array', maxItems: 10, items: { type: 'object' } }
            }
          } } } },
          responses: { 200: { description: 'Inventario, achados, limites da verificacao e registro das APIs efetivamente executadas.' }, 401: { description: 'Autenticacao ausente ou expirada' }, 403: { description: 'Permissao ou CSRF insuficiente' } }
        }
      },
      '/api/pontof/mapear': {
        post: {
          summary: 'Lista elementos reais de um Ponto F',
          description: 'Retorna IDs tecnicos, tipo, rotulo e limites em milimetros para localizar um alvo antes da edicao.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/MapearPontoFRequest' } } }
          },
          responses: {
            200: { description: 'Inventario do Ponto F', content: { 'application/json': { schema: { $ref: '#/components/schemas/MapearPontoFResponse' } } } },
            500: { description: 'Erro ao mapear Ponto F' }
          }
        }
      }
    },
    components: {
      schemas: {
        HealthResponse: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: true },
            service: { type: 'string', example: 'format-llm-api' }
          }
        },
        PerguntarRequest: {
          type: 'object',
          required: ['pergunta'],
          properties: {
            arquivo: { $ref: '#/components/schemas/PontoFFile' },
            projectId: { type: 'string' },
            dataAssetPath: { type: 'string' },
            layout: { type: 'object', description: 'Draft atual para inspecao, sem verificar o binario.' },
            recursos: { type: 'array', items: { type: 'object' } },
            verificarPreview: { type: 'boolean', default: false },
            dados: { $ref: '#/components/schemas/PontoFFile' },
            paginas: { type: 'array', items: { type: 'integer', minimum: 0 }, maxItems: 10 },
            modo: { type: 'string', enum: ['usuario', 'dev'], default: 'usuario' },
            pergunta: { type: 'string', example: 'O que e um Ponto F?' }
          }
        },
        PerguntarResponse: {
          type: 'object',
          properties: {
            modo: { type: 'string', example: 'usuario' },
            pergunta: { type: 'string' },
            resposta: { type: 'string' }
          }
        },
        ResourceFile: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'logo.png' },
            base64: { type: 'string', description: 'Conteudo do recurso em base64.' }
          }
        },
        PontoFFile: {
          type: 'object',
          required: ['base64'],
          properties: {
            name: { type: 'string', example: 'layout.f' },
            bytes: { type: 'integer', readOnly: true, example: 13654 },
            base64: { type: 'string', description: 'Conteudo do arquivo .f em base64.' }
          }
        },
        CriarPontoFRequest: {
          type: 'object',
          properties: {
            nome: { type: 'string', example: 'carta-api' },
            titulo: { type: 'string', example: 'Carta API' },
            corpo: { type: 'string', example: 'Texto inicial da carta.' },
            cor: { type: 'string', example: '#000000' },
            recursos: { type: 'array', items: { $ref: '#/components/schemas/ResourceFile' } }
          }
        },
        EditarPontoFRequest: {type:'object',required:['plano'],properties:{layout:{type:'object'},arquivo:{$ref:'#/components/schemas/PontoFFile'},projectId:{type:'string'},plano:{type:'object',description:'Plano completo retornado por planejar-edicao, incluindo planId, snapshotSha256 e changes.'}}},
        MapearPontoFRequest: {
          type: 'object',
          oneOf: [{required:['arquivo']},{required:['layout']},{required:['projectId']}],
          properties: { arquivo: { $ref: '#/components/schemas/PontoFFile' }, layout:{type:'object'}, projectId:{type:'string'} }
        },
        MapearPontoFResponse: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, snapshotSha256:{type:'string'}, documentos:{type:'array',items:{type:'object'}}, elementos: { type: 'array', items: { type: 'object' } } }
        },
        PontoFOperationResponse: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: true },
            operacao: { type: 'string', example: 'editar' },
            sessionPath: { type: 'string' },
            arquivo: { $ref: '#/components/schemas/PontoFFile' },
            recursos: { type: 'array', items: { type: 'object' } },
            resumo: { type: 'object' },
            stdout: { type: 'string' },
            stderr: { type: 'string' }
          }
        }
      }
    }
  };
}

function swaggerHtml() {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Format LLM API - Swagger</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>body { margin: 0; }</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.ui = SwaggerUIBundle({ url: '/openapi.json', dom_id: '#swagger-ui' });
  </script>
</body>
</html>`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 50 * 1024 * 1024) {
        reject(new Error('Payload maior que 50MB.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseJson(raw) {
  if (!raw || !raw.trim()) return {};
  return JSON.parse(raw);
}

function stamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function slug(value) {
  return String(value || 'ponto-f')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'ponto-f';
}

function safeFileName(name, fallback) {
  const clean = path.basename(String(name || fallback)).replace(/[^a-zA-Z0-9._-]+/g, '-');
  return clean || fallback;
}

function makeSession(name) {
  const dir = path.join(DRAFT_API, `${stamp()}-${slug(name)}`);
  fs.mkdirSync(path.join(dir, 'entrada'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'recursos'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'saida'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'logs'), { recursive: true });
  return dir;
}

function writeResources(sessionDir, resources) {
  const saved = [];
  for (const item of Array.isArray(resources) ? resources : []) {
    if (!item || !item.base64) continue;
    const fileName = safeFileName(item.name, 'recurso.bin');
    const target = path.join(sessionDir, 'recursos', fileName);
    fs.writeFileSync(target, Buffer.from(item.base64, 'base64'));
    saved.push({ name: fileName, path: target, bytes: fs.statSync(target).size });
  }
  return saved;
}

function runProcess(executable,args){
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

function parseResumo(stdout) {
  const lines = stdout.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const result = { raw: lines };
  for (const line of lines) {
    const idx = line.indexOf('=');
    if (idx > 0) result[line.slice(0, idx)] = line.slice(idx + 1);
  }
  return result;
}

async function perguntar(body, authorization) {
  return consult(ROOT, body, { authorization });
}

async function diagnosticar(body, authorization) {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'format-tools.json'), 'utf8'));
  return { ok: true, diagnostico: await new FormatTools(config, { authorization }).diagnose(body) };
}
async function criarPontoF(body) {
  const nome = body.nome || body.name || 'ponto-f-api';
  const titulo = body.titulo || body.title || 'Carta simples';
  const corpo = body.corpo || body.body || 'Texto inicial criado pela API local do Format LLM.';
  const cor = body.cor || body.color || '#000000';
  const modelo = String(body.modelo || body.template || 'simples').toLowerCase();
  const session = makeSession(nome);
  const recursos = writeResources(session, body.recursos || body.resources);
  fs.writeFileSync(path.join(session, 'pedido.json'), JSON.stringify(body, null, 2), 'utf8');

  const script = path.join(ROOT, 'scripts', 'ponto-f-draft.bat');
  const args = modelo === 'carta-completa'
    ? [
        'criar-carta',
        '--nome', nome,
        '--titulo', titulo,
        '--empresa', body.empresa || body.company || 'Empresa Exemplo',
        '--destinatario', body.destinatario || body.recipient || 'Cliente Exemplo',
        '--assunto', body.assunto || body.subject || 'Assunto',
        '--data', body.data || body.date || '13/10/2026',
        '--corpo', corpo,
        '--assinatura', body.assinatura || body.signature || 'Equipe de Atendimento',
        '--cor', cor
      ]
    : ['criar', '--nome', nome, '--titulo', titulo, '--corpo', corpo, '--cor', cor];
  const { stdout, stderr } = await runBat(script, args);
  const resumo = parseResumo(stdout);
  const createdPath = resumo.CRIADO;
  if (!createdPath || !fs.existsSync(createdPath)) throw new Error('Nao foi possivel localizar o .f criado.');

  const outPath = path.join(session, 'saida', 'layout.f');
  fs.copyFileSync(createdPath, outPath);
  return {
    ok: true,
    operacao: 'criar',
    sessionPath: session,
    arquivo: {
      name: 'layout.f',
      bytes: fs.statSync(outPath).size,
      base64: fs.readFileSync(outPath).toString('base64')
    },
    recursos,
    resumo,
    stdout: stdout.trim(),
    stderr: stderr.trim() || undefined
  };
}

async function planSource(body,authorization){
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

async function mapearPontoF(body,authorization) {
  const source=await planSource(body,authorization);
  const report=inspectLayout(source.layout,source.fileHash?{fileHash:source.fileHash}:{});
  return {ok:true,operacao:'mapear',snapshotSha256:report.snapshotSha256,documentos:report.documents,elementos:report.elements,execucoes:source.executions,
    origem:body.layout?'provided-layout-json-not-binary-verified':body.arquivo?'format-web:/api/preview-layout':'format-web:/api/load-layout'};
}

async function route(req, res) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }
  const url = new URL(req.url, `http://${req.headers.host || HOST}`);
  try {
    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, { ok: true, service: 'format-llm-api' });
      return;
    }
    if (req.method === 'GET' && url.pathname === '/openapi.json') {
      sendJson(res, 200, openApiSpec());
      return;
    }
    if (req.method === 'GET' && (url.pathname === '/docs' || url.pathname === '/swagger')) {
      sendHtml(res, 200, swaggerHtml());
      return;
    }
    if (req.method !== 'POST') {
      sendJson(res, 404, { ok: false, error: 'Rota nao encontrada.' });
      return;
    }
    const body = parseJson(await readBody(req));
    if (url.pathname === '/api/perguntar') {
      sendJson(res, 200, await perguntar(body, req.headers.authorization));
      return;
    }
    if (url.pathname === '/api/pontof/diagnosticar') {
      sendJson(res, 200, await diagnosticar(body, req.headers.authorization));
      return;
    }
    if (url.pathname === '/api/pontof/criar') {
      sendJson(res, 200, await criarPontoF(body));
      return;
    }
    if (url.pathname === '/api/pontof/planejar-edicao') {
      sendJson(res, 200, await planejarPontoF(body, req.headers.authorization));
      return;
    }
    if (url.pathname === '/api/pontof/editar' || url.pathname === '/api/pontof/aplicar-plano') {
      sendJson(res, 200, await editarPontoF(body, req.headers.authorization));
      return;
    }
    if (url.pathname === '/api/pontof/mapear') {
      sendJson(res, 200, await mapearPontoF(body,req.headers.authorization));
      return;
    }
    sendJson(res, 404, { ok: false, error: 'Rota nao encontrada.' });
  } catch (err) {
    sendJson(res, err.status && err.status >= 400 && err.status < 600 ? err.status : 500, {
      ok: false,
      error: err.message,
      evidencias: err.evidencias,
      diagnostico: err.diagnostico,
      execucoes: err.execucoes,
      stdout: err.stdout,
      stderr: err.stderr
    });
  }
}

fs.mkdirSync(DRAFT_API, { recursive: true });
const server = http.createServer(route);
server.listen(PORT, HOST, () => {
  console.log(`Format LLM API ativa em http://${HOST}:${server.address().port}`);
  console.log('Docs: GET /docs, GET /openapi.json');
  console.log('Rotas: GET /health, POST /api/perguntar, POST /api/pontof/diagnosticar, POST /api/pontof/mapear, POST /api/pontof/planejar-edicao, POST /api/pontof/aplicar-plano, POST /api/pontof/editar, POST /api/pontof/criar');
});



