# Catálogo estrutural do NovoTeste

Releitura em 22/10/2026 de ApoliceVD2_P1.f, confirmado por SHA-256 contra NovoTeste.zip. O original não foi gravado.

O NovoTeste possui 26 documentos, 146 janelas detalhe e 328 bandas definidas: 7 cabeçalhos, 314 detalhes e 7 rodapés; nenhum sumário definido. O inventário nativo contém 3522 registros, incluindo documentos e bandas.

Há 238 caixas de texto, 2302 campos de saída independentes, 316 imagens, 15 códigos bidimensionais, 45 blocos de endereçamento e 106 fios, contando elementos de primeiro nível e filhos de bandas; não há código de barras unidimensional nesse inventário. Segmentos dinâmicos internos de texto e campos internos de blocos estão descritos dentro do objeto proprietário e não somados novamente.

O esquema tem 157 campos de entrada mestre, 36 definições de entrada detalhe, 19 variáveis e 19 funções declaradas. camposDetalhe não é a lista de janelas visuais. DocFrente, DocVerso e _ContRep selecionam variantes; o documento do editor não equivale à página física do preview.

## Privacidade e validade

Este catálogo contém estrutura, nomes técnicos, geometria, fontes, condições sanitizadas e caminhos nativos. Não contém registros da massa, valores de clientes ou textos literais completos. Strings de expressão foram omitidas, exceto códigos curtos de seleção, máscaras técnicas e nomes simples de recursos visuais. Números literais longos foram omitidos. Caminhos absolutos foram excluídos. Uma expressão sanitizada explica dependências, não é código a executar.

A identidade abaixo vale somente para o original. Reler o .f atual, confirmar alvo e propriedades e gerar plano novo antes de editar. Para achar texto por conteúdo, ler o projeto atual autorizado: os textos omitidos não são recuperados desta memória.

SHA-256: `30a937c8c284c7614f4a4b858dfa3aa1c9ce00b8f432e1f1b01a312c1e48d2f7`.

## Documentos

| Índice | Nome | Condição | Janelas | Bandas |
| ---: | --- | --- | ---: | ---: |
| 0 | [Frente01](00-Frente01.md) | IF ( DocFrente = "01" AND _ContRep =  1 ) | 11 | 23 |
| 1 | [Verso04](01-Verso04.md) | IF ( DocVerso = "04" AND _ContRep =  2 ) | 4 | 11 |
| 2 | [Frente05](02-Frente05.md) | IF ( DocFrente = "05" AND _ContRep =  1 ) | 1 | 3 |
| 3 | [Frente06](03-Frente06.md) | IF ( DocFrente = "06" AND _ContRep =  1 ) | 1 | 3 |
| 4 | [Frente07](04-Frente07.md) | IF ( DocFrente = "07" AND _ContRep =  1 ) | 11 | 23 |
| 5 | [Frente08](05-Frente08.md) | IF ( DocFrente = "08" AND _ContRep =  1 ) | 12 | 24 |
| 6 | [Verso09](06-Verso09.md) | IF ( DocVerso = "09" AND _ContRep =  2 ) | 13 | 30 |
| 7 | [Frente10](07-Frente10.md) | IF ( DocFrente = "10" AND _ContRep =  1 ) | 11 | 23 |
| 8 | [Verso11](08-Verso11.md) | IF ( DocVerso = "11" AND _ContRep =  2 ) | 11 | 25 |
| 9 | [Frente12](09-Frente12.md) | IF ( DocFrente = "12" AND _ContRep =  1 ) | 10 | 20 |
| 10 | [FrHSBC01](10-FrHSBC01.md) | IF ( DocFrente = "34" AND _ContRep =  1 ) | 1 | 3 |
| 11 | [FrHSBC02](11-FrHSBC02.md) | IF ( DocFrente = "35" AND _ContRep =  1 ) | 1 | 3 |
| 12 | [FrHSBC03](12-FrHSBC03.md) | IF ( DocFrente = "36" AND _ContRep =  1 ) | 1 | 3 |
| 13 | [Frente39](13-Frente39.md) | IF ( DocFrente = "39" AND _ContRep =  1 ) | 2 | 6 |
| 14 | [Verso40](14-Verso40.md) | IF ( DocVerso = "40" AND _ContRep =  2 ) | 8 | 17 |
| 15 | [Frente43](15-Frente43.md) | IF ( DocFrente = "43" AND _ContRep =  1 ) | 0 | 0 |
| 16 | [Verso44](16-Verso44.md) | IF ( DocVerso = "44" AND _ContRep =  2 ) | 1 | 2 |
| 17 | [Frente45](17-Frente45.md) | IF ( DocFrente = "45" AND _ContRep =  1 ) | 1 | 2 |
| 18 | [Verso46](18-Verso46.md) | IF ( DocVerso = "46" AND _ContRep =  2 ) | 1 | 2 |
| 19 | [Frente47](19-Frente47.md) | IF ( DocFrente = "47" AND _ContRep =  1 ) | 2 | 4 |
| 20 | [Verso48](20-Verso48.md) | IF ( DocVerso = "48" AND _ContRep =  2 ) | 1 | 2 |
| 21 | [Frente49](21-Frente49.md) | IF ( DocFrente = "49" AND _ContRep =  1 ) | 0 | 0 |
| 22 | [Verso50](22-Verso50.md) | IF ( DocVerso = "50" AND _ContRep =  2 ) | 9 | 22 |
| 23 | [Verso51](23-Verso51.md) | IF ( DocVerso = "51" AND _ContRep =  2 ) | 9 | 22 |
| 24 | [Verso52](24-Verso52.md) | IF ( DocVerso = "52" AND _ContRep =  2 ) | 16 | 36 |
| 25 | [Verso53](25-Verso53.md) | IF ( DocVerso = "53" AND _ContRep =  2 ) | 8 | 19 |

## Dependências e cautelas

[Esquema completo e relações de uso](27-esquema-e-dependencias.md) lista campos, variáveis, funções, overlays e cada referência de recurso/caminho. Cada documento lista todos os objetos ativos reconhecidos, incluindo filhos de banda, e a geometria em mm. Fontes dependem da instalação/disponibilidade real; nomes declarados não provam renderização. Imagens com dimensão zero no DTO dependem do recurso/motor; não removê-las por isso.

O ZIP contém apenas o .f e a massa APPREM_A1P1_0001; imagens externas e DLL não vieram no pacote. Recursos dinâmicos continuam sem resolução nesta revisão. Não afirmar perda na importação nem validação visual completa. Não executar funções de gravação de journal só para inspecionar o layout.

Em Frente01, LIN01 tem duas definições de detalhe, DET1 e DetQuebra. Cabeçalho visível/desabilitado, definição vazia e slot não definido são estados distintos. Condição geral da janela, condição de impressão condDet, quebra condQuebra e seleção de banda permanecem campos separados. Geometria rotacionada exige os quatro cantos e a âncora correta; filhos de banda têm coordenadas locais.

Catálogo estrutural não comprova preview ou PDF. Os testes anteriores do NovoTeste identificaram limitação do motor PDF/fonte; não converter isso em validação bem-sucedida de todas as páginas. Bytes legados não interpretados de campos inativos são indicados, não convertidos em condições válidas.

[Mapa das 146 janelas detalhe](28-janelas-detalhe.md) reúne nomes, documentos, condições, caminhos e filhos das bandas para consulta por alvo.
