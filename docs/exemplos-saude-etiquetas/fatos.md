# Exemplos revisados em 27/10/2026

Originais identificados por SHA-256:
- SaudeA3: 3cc3fd25f1d025b0133bc5a50e2c9ed92097645988d99c1a6689cdc760dab571
- Etq_SEG_RE: ea2f542f3789f4ab93ce1bebdc642bcf4cbc9ee961fde9373d7e3b7fd17c8a5d

## saudea3-estrutura

O exemplo SaudeA3.f foi catalogado por leitura nativa em 27/10/2026. Possui 2 documentos: Frente e Verso; 3 janelas detalhe: PAG1 na Frente, PAG2 e PAG3 no Verso. Incluindo os filhos das bandas, há 599 campos de saída independentes, 96 imagens, 388 fios, 2 caixas de texto e 1 código bidimensional. São 93 campos de entrada mestre, 58 definições de entrada detalhe, 4 variáveis e 18 funções declaradas. O usuário informou que o exemplo já foi testado na aplicação. A catalogação inicial foi estrutural; uma etapa posterior validou uma edição de cor pelo chat e as duas páginas de preview com dados sintéticos, sem PDF. Os catálogos não contêm massa de clientes. Releia o .f atual antes de usar esta referência para editar.

## saudea3-janelas

No SaudeA3, PAG1 pertence a Frente em $.documentos[0].listaJanelaDetalhe[0]; PAG2 e PAG3 pertencem a Verso em $.documentos[1].listaJanelaDetalhe[0] e [1]. Cada janela tem 60 bandas detalhe e 1 sumário definidos; não há cabeçalho nem rodapé definidos. As 58 definições de entrada detalhe são o esquema de dados, não a quantidade de janelas visuais. O índice de banda no DTO não é necessariamente o índice nativo: detalhes começam em listaDet[20], rodapés em [119] e sumário em [139]. Confirme caminho, condição geral, impressão, quebra e índice no .f atual antes de alterar.

## saudea3-condicoes

No SaudeA3 original, Frente é selecionada por IF (_ContRep = 1) e Verso por IF (_ContRep = 2). A expressão de repetição é 2. As condições específicas dos elementos, janelas e bandas constam nos catálogos sanitizados. Documento lógico, repetição e página física são conceitos distintos; não substitua _ContRep por _PageNum sem verificar a semântica do motor. Conteúdo legado não interpretável foi sinalizado e não deve ser inventado ou executado a partir do catálogo.

## saudea3-dados

O SaudeA3 original declara entrada de registro fixo com 2286 bytes, 93 campos mestre e 58 definições de entrada detalhe. O catálogo preserva nomes técnicos, posições, tamanhos, grupos, índices, variáveis e expressões sanitizadas, sem valores de clientes nem caminho da massa. Usar dados sintéticos compatíveis com esse esquema para novos testes; o arquivo .f sozinho não comprova a disponibilidade dos dados e recursos externos.

## saudea3-dependencias

O SaudeA3 referencia 96 ocorrências de imagem e declara 18 funções da Sirius32.dll, incluindo MASCARA, GETSTR, RTRIMM, GRAVAJRN e GRAVAJRNGEN. Declaração não comprova execução; funções de gravação exigem verificar possíveis efeitos antes de testar. Usa fontes como NewJuneSemibold, NewJuneLight, NewJuneMedium, Arial Narrow, Frutiger Sirius e fontes postais. As imagens e fontes não estão comprovadamente incorporadas no .f. Confirme os arquivos e a resolução real no motor; não substitua silenciosamente dependências ausentes.

## etq-seg-re-estrutura

O exemplo Etq_SEG_RE.f tem 1 documento com nome nativo vazio, exibido como Documento1 pelo Format Web, 24 campos de entrada, 8 campos de saída independentes e 1 código de barras, sem janelas detalhe ou variáveis. Declara 11 funções. O perfil legado usa campos de caminho de 128 bytes; preservar esse perfil ao gravar e reler, sem alterar globalmente o leitor de arquivos com 256 bytes. O nome vazio não torna o documento corrompido.

## etq-seg-re-grade

No Etq_SEG_RE, o formulário mede aproximadamente 209,973 × 296,926 mm e cada etiqueta 104,987 × 49,445 mm. A grade é 2 colunas × 6 linhas, 12 documentos por grupo, sequência next-right e espaçamentos zero. Cada posição deve usar seu próprio registro; não repetir os dados de um cliente em todas as etiquetas. Nos testes locais anteriores de importação e preview, 13 registros sintéticos produziram 12+1 etiquetas, 24 produziram 12+12 e 25 produziram 12+12+1, incluindo navegação pelo cursor. O PDF e a paridade visual da fonte nativa não foram confirmados nesses testes.

## etq-seg-re-dados

A entrada do Etq_SEG_RE é variable-delimited com TAB como delimitador de campo e nova linha como delimitador de registro; recordSize 900 é nominal nesse modo. São 24 campos, com índices começando em zero: Chave=0, Segurado=1, Corretor=2, SeqKit=22 e NroCompKit=23. Preservar campos vazios, ordem e delimitadores. As saídas usam RTRIMM para dados postais e SeqKit/NroCompKit para controle; Chave alimenta o código de barras. O catálogo não inclui dados de destinatários.

## etq-seg-re-dependencias

O Etq_SEG_RE usa Frutiger Sirius e declara 11 funções de Sirius32.DLL, incluindo RTRIMM, LTRIMM, GETSTR e DECODEWN. As declarações não comprovam que cada função foi executada. Nos testes locais anteriores, o preview usou a API real e RTRIMM; a inspeção ilustrada usou Arial como alternativa explícita, sem confirmar equivalência visual com Frutiger Sirius. Verifique a fonte e os resultados do motor antes de afirmar fidelidade de impressão.

## exemplos-saude-etq-privacidade

Os catálogos SaudeA3 e Etq_SEG_RE incluem somente estrutura técnica, geometria, estilos, campos, condições e relações entre documentos, janelas e bandas. Textos literais, valores longos potencialmente identificadores, caminhos absolutos e registros de clientes foram omitidos. Expressões sanitizadas descrevem a estrutura e não são patches executáveis. Os exemplos são referências históricas e não substituem a leitura autorizada do .f atual.
