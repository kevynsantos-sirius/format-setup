const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root='C:/workspace/format/format-agent';
const {buildIndex,search}=require(root+'/api/knowledge');
const dev=fs.readFileSync('docs/boleto-instituidos-memoria.md','utf8');
fs.writeFileSync(root+'/knowledge/PONTO_F_BOLETO_INSTITUIDOS.md',dev);
const user=`# Exemplo de boleto Instituídos

O modelo Boleto Instituídos foi conferido pela leitura do arquivo original. Ele combina extrato e sete variantes condicionais de documento, campos variáveis, imagens e códigos de barras. A variante depende dos dados do plano; não são oito páginas sempre impressas.

Neste exemplo há 186 campos de entrada, 336 campos de saída independentes, 3 caixas de texto, 11 ocorrências de imagem, 8 códigos de barras e 39 fios. A massa tem 20 registros físicos de 3584 bytes, o que não comprova quantidade de boletos ou páginas.

O código de cobrança usa CodBarras com 44 caracteres configurados; os outros sete códigos são identificadores de controle de página de 8 caracteres. LinhaDig é um campo separado. Mudar um deles não atualiza automaticamente os demais.

Os dados alimentam pagador, endereço, vencimento, valor, beneficiário, instruções e identificação da cobrança. Alguns rótulos também são campos de saída; não decidir o alvo apenas pelo tipo do elemento. Ao editar, identificar o documento e o item no arquivo atual, preservar os dados e recursos, preparar a proposta e validar o resultado numa cópia.

Faltam quatro imagens referenciadas pela massa fornecida. Um logo de banco é citado sem extensão e possui candidato BMP no pacote, cuja resolução pelo motor precisa ser conferida. Esta revisão foi estrutural: não confirmou preview, PDF, cálculos ou validade bancária. Conhecer o modelo não comprova o estado do projeto atual. Não reutilizar dados pessoais ou bancários da massa real em novos exemplos.
`;
fs.writeFileSync(root+'/knowledge/usuario/BOLETO_INSTITUIDOS.md',user);
const factFile=root+'/knowledge/regras-verificadas.json',facts=JSON.parse(fs.readFileSync(factFile));
const additions=[
 {id:'boleto-instituidos-estrutura',match:[['boleto','boletos','instituidos'],['estrutura','modelo','exemplo','conhece','documentos','campos']],answer:'O exemplo Boleto Instituídos está documentado: possui 8 documentos condicionais (extrato e sete variantes por plano), 186 campos de entrada, 336 campos de saída independentes, 3 caixas de texto, 11 ocorrências de imagem, 8 códigos de barras e 39 fios, sem janelas detalhe. A massa usa registros fixos de 3584 bytes; os 20 registros físicos não comprovam quantidade de boletos ou páginas. Esses dados pertencem a esse modelo, não a todo boleto. Releia o .f atual antes de propor uma alteração.',quote:'O Boleto Instituídos contém 8 documentos condicionais, 186 campos de entrada, 336 campos de saída independentes, 3 caixas de texto, 11 ocorrências de imagem, 8 códigos de barras e 39 fios; não há janelas detalhe.'},
 {id:'boleto-instituidos-barras',match:[['boleto','instituidos'],['barras','digitavel','codbarras','linhadig']],answer:'No exemplo Boleto Instituídos, o código do ExtratoBol usa CodBarras e tem 44 caracteres configurados. Os outros sete códigos usam prefixo 147 e MASCARA sobre a numeração de página, com 8 caracteres e rotação de 90 graus: são controles de página. LinhaDig é outra entrada. Não confundir esses alvos nem presumir que alterar linha digitável atualiza o código de cobrança. Isso é estrutura observada, sem validação bancária; conferir o arquivo atual e perguntar qual alvo apenas se seleção e pedido não bastarem.',quote:'É um identificador de controle de página, não o mesmo conteúdo de cobrança de 44 caracteres.'},
 {id:'boleto-instituidos-recursos',match:[['boleto','instituidos'],['imagem','imagens','logo','recursos','preview','pdf']],answer:'O ZIP Boleto Instituídos traz recursos visuais, mas a massa referencia quatro imagens ausentes: 0058.gif, OAB-SP_instituidor_lgo.jpg, pOABPrev-SP_lgo.jpg e CAASP_instituidor_lgo.jpg. LogoBancoFP_033 é citado sem extensão e existe candidato BMP; a resolução depende do motor e precisa ser conferida. A revisão confirmou estrutura e referências, sem executar preview/PDF ou validar cálculos financeiros. Não substituir recursos por aproximação nem afirmar validação visual completa.',quote:'Esta revisão confirmou a leitura estrutural do .f e as referências dos registros fornecidos; não executou preview/PDF nem validou dígitos verificadores, valores financeiros ou todas as variantes condicionais.'}
];
for(const fact of additions){fact.source='PONTO_F_BOLETO_INSTITUIDOS.md';assert(dev.includes(fact.quote));const i=facts.findIndex(x=>x.id===fact.id);if(i<0)facts.push(fact);else facts[i]=fact;}
fs.writeFileSync(factFile,JSON.stringify(facts,null,2)+'\n');
const report={indices:[],retrieval:[],facts:additions.map(f=>f.id)};
for(const mode of ['dev','usuario']){
 const r=buildIndex(root,mode);report.indices.push({mode,files:r.totalFiles,chunks:r.totalChunks});
 for(const [question,id]of [['A IA conhece a estrutura do exemplo Boleto Instituídos?','boleto-instituidos-estrutura'],['No boleto Instituídos qual código de barras e linha digitável devo editar?','boleto-instituidos-barras'],['As imagens do boleto Instituídos estão completas para preview e PDF?','boleto-instituidos-recursos']]){
  const results=search(root,mode,question);assert(results.some(x=>x.factId===id),mode+': '+id);report.retrieval.push({mode,question,expected:id,passed:true});
 }
}
fs.writeFileSync('output/boleto-memory-validation/memoria.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
