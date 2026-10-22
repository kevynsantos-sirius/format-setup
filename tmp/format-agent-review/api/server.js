const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { consult } = require('./consultation');
const { FormatTools } = require('./format-tools');

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
          description: 'Requer Ollama ativo.',
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
      '/api/pontof/editar': {
        post: {
          summary: 'Edita um Ponto F recebido pela API',
          description: 'Recebe um .f em base64 e devolve o .f modificado em base64. Use elemento, obtido no inventario, para editar um texto especifico.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/EditarPontoFRequest' } } }
          },
          responses: {
            200: { description: 'Ponto F editado', content: { 'application/json': { schema: { $ref: '#/components/schemas/PontoFOperationResponse' } } } },
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
        EditarPontoFRequest: {
          type: 'object',
          required: ['arquivo'],
          properties: {
            nome: { type: 'string', example: 'edicao-carta-api' },
            arquivo: { $ref: '#/components/schemas/PontoFFile' },
            alteracoes: {
              type: 'object',
              properties: {
                texto: { type: 'string', example: 'Carta API Editada' },
                cor: { type: 'string', example: '#0057B8' },
                elemento: { type: 'string', example: 'doc-0-texto-1', description: 'ID retornado por /api/pontof/mapear.' }
              }
            },
            recursos: { type: 'array', items: { $ref: '#/components/schemas/ResourceFile' } }
          }
        },
        MapearPontoFRequest: {
          type: 'object',
          required: ['arquivo'],
          properties: { arquivo: { $ref: '#/components/schemas/PontoFFile' } }
        },
        MapearPontoFResponse: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, elementos: { type: 'array', items: { type: 'object' } } }
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

function runBat(script, args) {
  return new Promise((resolve, reject) => {
    const child = spawn('cmd.exe', ['/c', script, ...args], {
      cwd: ROOT,
      windowsHide: true
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', data => { stdout += data.toString(); });
    child.stderr.on('data', data => { stderr += data.toString(); });
    child.on('error', reject);
    child.on('close', code => {
      if (code !== 0) {
        const err = new Error(`Comando falhou com codigo ${code}`);
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
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

async function editarPontoF(body) {
  const arquivo = body.arquivo || body.file;
  if (!arquivo || !arquivo.base64) throw new Error('Campo obrigatorio: arquivo.base64');
  const nome = body.nome || body.name || 'edicao-ponto-f';
  const session = makeSession(nome);
  const inputName = safeFileName(arquivo.name, 'layout.f');
  const inputPath = path.join(session, 'entrada', inputName.toLowerCase().endsWith('.f') ? inputName : `${inputName}.f`);
  fs.writeFileSync(inputPath, Buffer.from(arquivo.base64, 'base64'));
  const recursos = writeResources(session, body.recursos || body.resources);
  fs.writeFileSync(path.join(session, 'pedido.json'), JSON.stringify(body, null, 2), 'utf8');

  const alteracoes = body.alteracoes || body.changes || {};
  const cor = alteracoes.cor || body.cor || body.color || '#0057B8';
  const texto = alteracoes.texto || body.texto || body.text;
  const elemento = alteracoes.elemento || alteracoes.element || body.elemento || body.element;
  const ajusteFio = String(alteracoes.ajusteFio || alteracoes.wireAdjustment || '').toLowerCase();
  let args;
  if (ajusteFio === 'mover-linha-topo') {
    args = ['mover-linha-topo', '--arquivo', inputPath, '--deslocamento-y-mm', String(alteracoes.deslocamentoYmm || 8)];
  } else if (ajusteFio === 'corrigir-limites') {
    args = ['ajustar-fios', '--arquivo', inputPath];
  } else {
    args = ['editar-cor', '--arquivo', inputPath, '--cor', cor];
    if (elemento) args.push('--elemento', String(elemento));
    if (texto) args.push('--texto', String(texto));
  }

  const script = path.join(ROOT, 'scripts', 'ponto-f-draft.bat');
  const { stdout, stderr } = await runBat(script, args);
  const resumo = parseResumo(stdout);
  const outPath = path.join(session, 'saida', 'layout-editado.f');
  fs.copyFileSync(inputPath, outPath);

  return {
    ok: true,
    operacao: 'editar',
    sessionPath: session,
    arquivo: {
      name: 'layout-editado.f',
      bytes: fs.statSync(outPath).size,
      base64: fs.readFileSync(outPath).toString('base64')
    },
    recursos,
    resumo,
    stdout: stdout.trim(),
    stderr: stderr.trim() || undefined
  };
}

async function mapearPontoF(body) {
  const arquivo = body.arquivo || body.file;
  if (!arquivo || !arquivo.base64) throw new Error('Campo obrigatorio: arquivo.base64');
  const session = makeSession(body.nome || body.name || 'mapa-ponto-f');
  const inputName = safeFileName(arquivo.name, 'layout.f');
  const inputPath = path.join(session, 'entrada', inputName.toLowerCase().endsWith('.f') ? inputName : `${inputName}.f`);
  fs.writeFileSync(inputPath, Buffer.from(arquivo.base64, 'base64'));
  const { stdout, stderr } = await runBat(path.join(ROOT, 'scripts', 'ponto-f-draft.bat'), ['mapear-elementos', '--arquivo', inputPath]);
  const elementos = stdout.split(/\r?\n/).filter(line => line.startsWith('ELEMENTO=')).map(line => {
    const fields = line.slice('ELEMENTO='.length).split('|');
    const element = { id: fields.shift() };
    for (const field of fields) {
      const separator = field.indexOf('=');
      if (separator > 0) element[field.slice(0, separator)] = field.slice(separator + 1);
    }
    return element;
  });
  return { ok: true, operacao: 'mapear', sessionPath: session, elementos, stdout: stdout.trim(), stderr: stderr.trim() || undefined };
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
    if (url.pathname === '/api/pontof/editar') {
      sendJson(res, 200, await editarPontoF(body));
      return;
    }
    if (url.pathname === '/api/pontof/mapear') {
      sendJson(res, 200, await mapearPontoF(body));
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
  console.log(`Format LLM API ativa em http://${HOST}:${PORT}`);
  console.log('Docs: GET /docs, GET /openapi.json');
  console.log('Rotas: GET /health, POST /api/perguntar, POST /api/pontof/diagnosticar, POST /api/pontof/criar, POST /api/pontof/editar, POST /api/pontof/mapear');
});



