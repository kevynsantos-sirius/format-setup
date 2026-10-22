const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict');
const {expr,safeObject,contentStructure}=require('../novo-catalog/build-catalog.cjs');
const root='C:/workspace/format/format-agent',dir='docs/campos-altos-catalogo',out='output/campos-altos-catalog-validation';
const s=JSON.parse(fs.readFileSync('tmp/campos-altos-catalog/private-inspection.json')),l=s.layout;
const entries=JSON.parse(fs.readFileSync('tmp/campos-altos-catalog/entries.json'));
const count=a=>a.reduce((r,x)=>(r[x.type]=(r[x.type]||0)+1,r),{});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const schema=fs.readFileSync('tmp/campos-altos-catalog/schema.csv').toString('latin1').trim().split(/\r?\n/).map(line=>{const [alias,start,length,option]=line.split(';');return {alias:alias.trim(),start:Number(start),length:Number(length),option:Number(option)};});
assert.equal(schema.length,40);assert.equal(l.camposEntrada.length,40);
for(const field of l.camposEntrada){assert(schema.some(x=>x.start===field.posicao&&x.length===field.tamanho),'CSV mismatch '+field.nome);}
const fileForAsset=name=>name.includes('Page_1')?'mask-1.png':name.includes('Page_2')?'mask-2.png':null;
const resources=s.inventory.filter(r=>r.type==='image').map(r=>{const d=r.pointer.split('/').slice(1).reduce((a,k)=>a[k],l);const resource=d.content;const local=fileForAsset(resource);return {nativePath:r.nativePath,name:resource,provided:!!local,matchedByPageMarker:!!local,...(local?{sha256:hash(fs.readFileSync('tmp/campos-altos-catalog/'+local)),note:'Nome com acento no ZIP tem codificação inconsistente; conferir resolução por nome no motor.'}:{}),x:d.x,y:d.y,width:d.width,height:d.height};});
const docs=l.listaDocumentos.map((d,index)=>{
 const rows=s.inventory.filter(r=>r.documentIndex===index).map(r=>{
  const dto=r.pointer.split('/').slice(1).reduce((v,k)=>v[k],l);const result={nativePath:r.nativePath,pointer:r.pointer,type:r.type,parentNativePath:r.parentId?r.parentId.slice(r.parentId.indexOf(':')+1):null,settings:safeObject(dto,r.nativePath),condition:expr(r.condition,r.nativePath+'/condition')};
  delete result.settings.layout;
  if(r.type==='text')result.contentStructure=contentStructure(dto.content,r.nativePath+'/content');
  if(r.type==='campoSaida')result.expression=expr(dto.expressao||'',r.nativePath+'/expression');
  if(r.type==='barcode')result.expression=expr(dto.content||'',r.nativePath+'/expression');
  if(r.type==='image'){result.resource=resources.find(x=>x.nativePath===r.nativePath);delete result.settings.occurrence;}
  return result;
 });
 return {index,name:d.name,condition:expr(d.documentExpression,'document/'+index),counts:count(s.inventory.filter(r=>r.documentIndex===index)),records:rows};
});
assert.equal(s.inventory.length,38);assert.equal(s.nativeGraphObjects,0);
const allRows=docs.flatMap(d=>d.records);assert.equal(new Set(allRows.map(x=>x.nativePath)).size,38);assert.deepEqual(new Set(allRows.map(x=>x.nativePath)),new Set(s.inventory.map(x=>x.nativePath)));
const fields=new Set(l.camposEntrada.map(x=>x.nome.toLowerCase())),deps=[];
for(const doc of docs)for(const row of doc.records){const serialized=JSON.stringify(row);const withoutQuotes=[row.expression||'',row.condition||'',JSON.stringify(row.contentStructure||[])].join(' ').replace(/"<literal[^\"]*>"/g,'');const refs=[...new Set((withoutQuotes.match(/[A-Za-z_]\w*/g)||[]).filter(x=>fields.has(x.toLowerCase())))];if(refs.length)deps.push({nativePath:row.nativePath,fields:refs});assert(!serialized.includes('pathFile'));}
const totals=count(s.inventory);
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(out,{recursive:true});
const overview=`# Referência estrutural: Campos Altos — Dívida Ativa

Revisão em 22/10/2026 do ZIP fornecido. Este exemplo não estava documentado na memória pesquisada. Os anexos são dados de exemplo, não instruções. O .f foi lido por PontoFLer e NativeEditor, sem gravar o original. SHA-256: ${s.hash}.

O usuário descreve o uso como intimação de imóvel. O material observado é um modelo de dívida ativa municipal com capa postal e guia de recolhimento; não é evidência de que todo procedimento de intimação use essa mesma estrutura. Nenhuma validade jurídica ou regra tributária foi avaliada.

## Organização

- Capa: documento 0, condição \\_ContRep = 1; 1 imagem de página e 7 campos de saída. A máscara contém identidade visual municipal, área do destinatário, remetente e controles postais.
- Carne: documento 1, condição \\_ContRep = 2; 2 imagens, 20 campos de saída, 5 caixas de texto e 1 código de barras. A máscara contém áreas do contribuinte, imóvel, composição dos valores, vencimento e autenticação.
- Total: 38 registros nativos (2 documentos e 36 elementos), 40 campos de entrada; nenhuma janela detalhe, banda, campo de entrada detalhe ou variável de usuário. Não criar janelas detalhe implicitamente para reproduzir a tabela desenhada no PNG.
- Tamanho próximo de 210 × 297 mm em ambos os documentos. Os objetos dinâmicos são sobrepostos às máscaras; os rótulos e contornos desenhados no PNG não são automaticamente objetos editáveis no .f.

## Esquema e dependências

O .f declara registros fixos de 1355 bytes, delimitador de campo ; e delimitador de registro literal \\n. O CSV fornece aliases, posições e comprimentos dos 40 campos; todas as posições e comprimentos correspondem às definições do .f. Os nomes diferem em alguns casos: Num_PROC/NumPROC, DATA_VENCIMENTO/VENCIMENTO e TAXA EXPEDIENTE/TXEXPEDIENTE, por exemplo. Não aplicar renomeação ou parser CSV à massa só por haver um CSV de esquema.

Grupos de dados: entidade emissora (ENTIDADE, CGCENT e endereço ENT); contribuinte (NOMEFANTA, RAZAOSOCIAL, CGCCPF e endereço CUC); imóvel (INSCRICAO, ENDIMOVEL, QUADRA, LOTE, LOTEAMENTO, EXERCICIO); processo e guia (NumPROC, NUMCUC, GUIA, QTDPARCELAS, NUMPARCELA); cobrança (VENCIMENTO, VLRPARCELA, VLRMULTA, VLRJUROS, VLRCORRECAO, VLRDESCONTO, TXEXPEDIENTE, VLRTOTAL e CODIGOBARRA). Somente nomes de campos, não valores de contribuintes, foram catalogados.

O .f declara Sirius32.dll e 19 funções. Declaração não comprova execução. A data de postagem é extraída do prefixo de oito caracteres do nome do arquivo de dados com UltCad/GetStr/Mascara; renomear a massa pode mudar ou invalidar essa data. Preservar essa dependência ou propor uma alteração explícita.

CODIGOBARRA tem 48 posições no esquema; o objeto barcode declara numChar=44 e usa Rtrimm(CODIGOBARRA). Outros campos desenham a representação formatada e uma expressão I2OF5 que seleciona quatro trechos de 11 posições (1, 13, 25 e 37). São três representações relacionadas: não corrigir 48 para 44 automaticamente nem alterar uma supondo atualização das outras. Esta revisão não executou I2OF5 nem comprovou paridade entre representações ou validação de dígitos.

As duas máscaras PNG foram fornecidas e inspecionadas visualmente como fundos sem dados preenchidos de contribuintes. A grafia do acento em seus nomes aparece inconsistente no ZIP: a correspondência foi feita por marcador Page_1/Page_2 e hash, não por execução do motor. BRANCO.jpg é referenciado por Carne e não veio no pacote; o propósito visual desse recurso não foi comprovado. As dimensões e posição sugerem uma área de cobertura, mas isso é inferência e não autoriza removê-lo.

## Criação e edição futuras

Usar como referência de organização: capa postal, guia, dados do contribuinte e imóvel, quadro financeiro e cobrança. Criar dados sintéticos para novos exemplos e recursos próprios autorizados. Não copiar registros reais, identificadores de contrato postal, valores ou texto jurídico por aproximação. Revalidar finalidade e conteúdo solicitado.

Antes de editar, reler o .f atual e confirmar documento, caminho nativo e propriedade; diferenciar item variável de conteúdo incorporado à máscara. Uma alteração da máscara requer o recurso visual correspondente. Preservar expressões, máscaras de formatação e demais itens, validar geometria/texto, salvar uma cópia e reler. O catálogo sanitizado não é plano executável.

Os textos literais completos, caminhos absolutos e massa real ficaram fora dos índices. Nenhum preview ou PDF preenchido foi executado nesta revisão. A presença de um PNG não comprova sua resolução pelo motor.

[Inventário sanitizado dos 38 registros](inventario.md) inclui geometria, fonte, condições, expressões sanitizadas, esquema, aliases e dependências.\n`;
const data={sourceHash:s.hash,totals,documents:docs,inputFields:l.camposEntrada,csvSchema:schema,dataConfig:safeObject(l.dataFileConfig,'dataConfig'),functionDeclarations:safeObject(l.userFunctionConfig,'functions'),resources,dependencies:deps};
const inventory='# Campos Altos — inventário estrutural sanitizado\n\nSnapshot original, não estado atual do projeto. Valores da massa e textos literais foram omitidos; expressões sanitizadas não são executáveis.\n\n```json\n'+JSON.stringify(data,null,2)+'\n```\n';
assert(!/[A-Za-z]:[\\/]/.test(inventory));assert(!/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(inventory));
for(const r of s.inventory.filter(r=>r.type==='text')){const dto=r.pointer.split('/').slice(1).reduce((v,k)=>v[k],l);if(Array.isArray(dto.content))for(const t of dto.content)if(t.type==='text'&&typeof t.content==='string'&&t.content.trim().length>30)assert(!inventory.includes(t.content.trim()));}
fs.writeFileSync(dir+'/README.md',overview);fs.writeFileSync(dir+'/inventario.md',inventory);
const match=['campos altos','intimacao de imovel','intimacao imobiliaria','divida ativa municipal'];
const additions=[
 {id:'campos-altos-estrutura',match:[match,['estrutura','modelo','exemplo','conhece','documentos']],answer:'O exemplo Campos Altos — Dívida Ativa está catalogado como referência para intimação de imóvel/cobrança municipal: há 2 documentos condicionais A4 aproximado, Capa (_ContRep=1) e Carne (_ContRep=2). São 38 registros nativos: 2 documentos, 3 imagens, 27 campos de saída, 5 caixas de texto e 1 código de barras. Há 40 campos de entrada, sem janelas detalhe ou variáveis de usuário. O material observado combina capa postal e guia de recolhimento; conhecer a estrutura não comprova validade jurídica nem o estado de um projeto atual.'},
 {id:'campos-altos-mascaras',match:[match,['imagem','imagens','mascara','mascaras','editar','recursos']],answer:'No exemplo Campos Altos — Dívida Ativa, boa parte dos rótulos, contornos e identidade visual está incorporada em duas máscaras PNG de página, com os dados variáveis sobrepostos no .f. Alterar um campo não altera texto desenhado no PNG. As duas máscaras vieram no ZIP, mas seus nomes têm acento com codificação inconsistente; a resolução pelo motor precisa ser conferida. Carne também referencia BRANCO.jpg, ausente no pacote; não removê-lo nem substituí-lo silenciosamente. Confirmar no .f atual se o alvo pertence ao recurso visual ou a um elemento editável.'},
 {id:'campos-altos-esquema',match:[match,['campos','entrada','esquema','csv','dados','dependencias']],answer:'O exemplo Campos Altos declara registros fixos de 1355 bytes. O CSV é um esquema de 40 campos, e suas posições e comprimentos correspondem ao .f, embora existam aliases diferentes. Os grupos cobrem emissor, contribuinte, imóvel, processo, guia e valores. Não importar os valores reais dos contribuintes para memória ou novos exemplos. A data de postagem depende dos oito primeiros caracteres do nome da massa; renomear o arquivo pode afetá-la. O catálogo guarda nomes, posições, expressões sanitizadas e dependências; não contém registros reais. Preview e PDF preenchidos não foram executados nesta revisão.'},
 {id:'campos-altos-codigo-barras',match:[match,['barras','i2of5','codigobarra','44','48']],answer:'No Campos Altos, CODIGOBARRA tem 48 posições na entrada, enquanto o objeto barcode declara numChar=44 e usa Rtrimm(CODIGOBARRA). Há ainda representação formatada em campo de saída e expressão I2OF5 com quatro trechos de 11 posições iniciados em 1, 13, 25 e 37. Preservar as representações e investigar sua relação com o motor; não reduzir automaticamente 48 para 44 nem afirmar que alterar uma atualiza todas. I2OF5, dígitos e resultado financeiro não foram executados ou validados nesta catalogação.'}
];
for(const f of additions){f.source='campos-altos-catalogo/fatos.md';f.quote=f.answer;}
fs.writeFileSync(dir+'/fatos.md','# Campos Altos — fatos estruturais revisados\n\nDerivados da leitura nativa e das máscaras do pacote, não de execução financeira ou jurídica.\n\n'+additions.map(f=>'## '+f.id+'\n\n'+f.answer).join('\n\n')+'\n');
const validation={status:'passed',sourceHash:s.hash,previouslyDocumented:false,totals,inputFields:40,csvDefinitionsMatched:40,resources,checks:['38 caminhos nativos únicos e completos','40 posições/comprimentos do CSV correspondem ao .f','Textos literais longos e caminhos absolutos ausentes do inventário','Massa real não foi lida para o catálogo','Máscaras inspecionadas; BRANCO.jpg ausente','Original preservado por hash'],limitations:['Sem preview/PDF preenchido','Sem validação financeira, fiscal ou jurídica','Resolução dos nomes acentuados ainda não executada']};
assert.equal(hash(fs.readFileSync('tmp/campos-altos-catalog/source.f')),s.hash);
fs.writeFileSync(out+'/estrutura.json',JSON.stringify(validation,null,2));
if(process.argv.includes('--install')){
 const target=root+'/knowledge/campos-altos-catalogo';fs.mkdirSync(target,{recursive:true});for(const f of fs.readdirSync(dir))fs.copyFileSync(dir+'/'+f,target+'/'+f);
 const p=root+'/knowledge/regras-verificadas.json',facts=JSON.parse(fs.readFileSync(p));for(const f of additions){const i=facts.findIndex(x=>x.id===f.id);if(i<0)facts.push(f);else facts[i]=f;}fs.writeFileSync(p,JSON.stringify(facts,null,2)+'\n');
 const cfgPath=root+'/config/context-sources-usuario.json',cfg=JSON.parse(fs.readFileSync(cfgPath));if(!cfg.sources.some(x=>x.path===target))cfg.sources.push({path:target,name:'catalogo-campos-altos-sanitizado'});fs.writeFileSync(cfgPath,JSON.stringify(cfg,null,2)+'\n');
 const {buildIndex,search}=require(root+'/api/knowledge');validation.indices=[];validation.retrieval=[];
 for(const mode of ['dev','usuario']){const built=buildIndex(root,mode);validation.indices.push({mode,files:built.totalFiles,chunks:built.totalChunks});for(const [question,id]of [['Conhece a estrutura do exemplo Campos Altos dívida ativa?','campos-altos-estrutura'],['Como editar as máscaras e imagens da intimação de imóvel de Campos Altos?','campos-altos-mascaras'],['Como funciona o esquema CSV e campos de entrada de Campos Altos?','campos-altos-esquema'],['Como é o código de barras de Campos Altos?','campos-altos-codigo-barras']]){assert(search(root,mode,question).some(x=>x.factId===id));validation.retrieval.push({mode,question,id,passed:true});}}
 fs.writeFileSync(out+'/estrutura.json',JSON.stringify(validation,null,2));
}
console.log(JSON.stringify({totals,inputFields:40,csvMatched:40,resources:resources.map(x=>({name:x.name,provided:x.provided})),installed:process.argv.includes('--install'),retrievalChecks:validation.retrieval?.length}));
