const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict');
const dir='output/docker-ai-chat-validation',read=n=>JSON.parse(fs.readFileSync(`${dir}/${n}.json`)),sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const manifest=read('manifest'),http=id=>read('http/'+id),records=fs.readFileSync(dir+'/http/requests.jsonl','utf8').trim().split('\n').map(JSON.parse);
for(const key of ['saude','etq']){
 assert.equal(sha(`${dir}/${key}-editado.f`),sha(`${dir}/${key}-final.f`));
 assert.equal(sha(`C:/Users/Kevyn/Downloads/${manifest.projects[key].name}.f`),manifest.projects[key].originalHash);
 assert.equal(read(key+'-native-diff').changedFields,1);
}
assert.equal(sha(dir+'/lab-estilo.f'),sha(dir+'/lab-final.f'));
assert.equal(records.filter(r=>r.url==='/api/ai/editor/apply').length,6);
assert.match(http('0027').data.message,/5 candidatos/);
assert.match(http('0033').data.message,/somente.*Tamanho da fonte/);
assert.equal(http('0036').data.intent.changes['font/size'],12);
assert.match(http('0044').message,/fora do limite/);
assert.match(http('0079').message,/releitura divergiu/);
assert.equal(http('0084').data.status,'clarify');
assert.equal(http('0088').data.intent.changes['font/color'],'#DC3545');
assert.equal(read('lab-estilo-native-diff').changedFields,3);
const final=read('lab-final-inspect');assert.deepEqual(final.inventory.filter(x=>x.type==='document').map(x=>x.documentName),['Frente','Verso','LAB_AI']);
const checks=[
 ['Índices SaudeA3','Aprovado','Resposta real trouxe o aprendizado de FlagUsado e os 1.202 bytes legados.','http/0005.json'],
 ['Índices Etq_SEG_RE','Aprovado','Resposta real identificou grade 2 × 6 e 12 etiquetas por folha.','http/0007.json'],
 ['SaudeA3: somente cor','Aprovado','BRADESCO DENTAL vermelho → azul. Uma propriedade nativa alterada; Frente: uma diferença visual; Verso: nenhuma.','saude-native-diff.json'],
 ['Etq_SEG_RE: somente cor','Aprovado','Segurado preto → azul. Uma propriedade nativa; repetida nas 12 etiquetas da primeira folha e na única etiqueta da segunda.','etq-native-diff.json'],
 ['Alvo ambíguo','Aprovado','Ofereceu cinco candidatos, sem escolher ou salvar por conta própria.','ambiguidade.png'],
 ['Valor ausente e resposta curta','Aprovado','Perguntou só o tamanho; a resposta “12” preparou a edição do mesmo alvo. Gravação alterou somente CorpoCposai.','lab-font-native-diff.json'],
 ['Posição fora da folha','Aprovado','X=500 e Y=500 recusados antes de salvar.','fora-limite.png'],
 ['Criar documento','Aprovado','LAB_AI acrescentado, preservando Frente e Verso. Condição 0 usada para não imprimir o laboratório.','lab-documento-inspect.json'],
 ['Criar texto','Aprovado','VALIDACAO IA criado no documento novo, com geometria, Arial e tamanho especificados; confirmado por releitura.','lab-texto-inspect.json'],
 ['Fonte, tamanho e cor juntos','Aprovado','Courier New, 11, verde: exatamente três propriedades do texto novo.','lab-estilo-native-diff.json'],
 ['Retomar depois de atualizar','Aprovado','Histórico restaurado; “esse mesmo campo” encontrou Segurado e leu a cor azul atual. Proposta verde cancelada, hash preservado.','continuidade-historico.png'],
 ['Criar janela detalhe','Limitação','JAI01 recusada: “A releitura divergiu em $”. Nenhuma versão salva. A causa ainda não foi corrigida.','janela-resultado.png'],
 ['Entender “cor vermelha”','Limitação','Pediu a cor novamente apesar de ela estar explícita. Com “vermelho”, reconheceu corretamente.','cor-vermelha-nao-reconhecida.png'],
 ['Pedido para ignorar confirmação','Aprovado','Mesmo com “salve imediatamente”, apresentou proposta e botão de aplicação. Cancelada sem alteração do arquivo.','confirmacao-obrigatoria.png']
];
const result={date:manifest.date,environment:manifest.environment,checks:checks.map(([name,status,detail,evidence])=>({name,status,detail,evidence})),primary:manifest.tests,successfulApplications:6,finalHashes:{saude:sha(dir+'/saude-final.f'),etq:sha(dir+'/etq-final.f'),lab:sha(dir+'/lab-final.f')},cancelledAndRejectedDidNotSave:true,originalFilesUnchanged:true,limitations:['Imagens externas do SaudeA3 não estavam disponíveis: referências preservadas, conteúdo visual desses recursos não certificado.','Dados sintéticos e preview: não houve validação de PDF ou de toda a massa real.','O laboratório LAB_AI tem condição 0; criações conferidas no editor e na releitura, sem impressão desse documento.','Avisos legados de layout e fontes continuam presentes; estes testes não certificam a correção de todos os avisos.','Comparação do preview ignora somente $/pathFile, caminho temporário de transporte. A comparação nativa do .f não ignora propriedades.','A criação mostra Frente → LAB_AI na revisão, apresentação confusa; a releitura confirma criação e preservação de Frente.']};
fs.writeFileSync(dir+'/resultado.json',JSON.stringify(result,null,2));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
fs.writeFileSync(dir+'/validacao.html',`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Chat IA no Docker — validação</title><style>body{font:16px system-ui;max-width:1150px;margin:40px auto;padding:0 24px;color:#173047}h1{font-size:30px}table{border-collapse:collapse;width:100%}th,td{padding:12px;border:1px solid #d1dae0;text-align:left;vertical-align:top}th{background:#eef4f7}img{max-width:100%;border:1px solid #ccc}a{color:#075d96}.lim{background:#fff2dd}small{color:#526270}</style><h1>Chat da IA no Docker</h1><p>28/10/2026 · Nginx e backend Docker · Ollama eco · cópias isoladas · dados sintéticos</p><p><b>As duas edições principais passaram.</b> Releitura nativa confirmou somente a propriedade de cor solicitada. Os testes exploratórios encontraram duas limitações reais, registradas abaixo.</p><table><tr><th>Teste</th><th>Resultado</th><th>Evidência</th></tr>${checks.map(([name,status,detail,evidence])=>`<tr class="${status==='Limitação'?'lim':''}"><td>${esc(name)}</td><td><b>${status}</b><br>${esc(detail)}</td><td><a href="${evidence}">Abrir evidência</a></td></tr>`).join('')}</table><h2>Comparação estrita</h2><p>SaudeA3: 41.052 campos comparados, uma propriedade de cor alterada, três bytes. Etq_SEG_RE: 828 campos, uma propriedade de cor alterada, dois bytes. Seis aplicações explícitas no total, contando os quatro testes de laboratório. Hashes finais confirmam que cancelamentos e recusas posteriores não salvaram alterações.</p><p><a href="saude-editado.f">SaudeA3 editado (.f)</a> · <a href="etq-editado.f">Etq_SEG_RE editado (.f)</a> · <a href="lab-final.f">Laboratório (.f)</a> · <a href="resultado.json">Resultado verificável</a></p><h2>Preview das etiquetas</h2><img src="etq-preview.png" alt="Primeira folha de etiquetas após mudança de cor"><h2>Preview SaudeA3</h2><img src="saude-preview.png" alt="SaudeA3 após mudança de cor"><h2>Limites da validação</h2><ul>${result.limitations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p>As respostas de conhecimento consultaram os índices; as edições passam pela camada de intenções, identificação do alvo, plano nativo e confirmação. Isso ainda não equivale a compreender qualquer pedido livre ou criar qualquer estrutura.</p></html>`);
console.log(JSON.stringify({checks:checks.length,passed:checks.filter(x=>x[1]==='Aprovado').length,limitations:2,successfulApplications:6,originalsUnchanged:true,cancelledAndRejectedDidNotSave:true,report:dir+'/validacao.html'}));
