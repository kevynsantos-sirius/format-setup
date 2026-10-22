# NovoTeste — fatos estruturais derivados da releitura

Contagens e relações conferidas contra o inventário de SHA-256 30a937c8c284c7614f4a4b858dfa3aa1c9ce00b8f432e1f1b01a312c1e48d2f7. Fonte detalhada: README.md, documentos 00..25, esquema 27 e janelas 28. Estes fatos descrevem somente o original fornecido e não o estado atual de um projeto.

## novoteste-catalogo-estrutura

O catálogo original do NovoTeste (ApoliceVD2_P1.f) registra 26 documentos, 146 janelas detalhe e 328 bandas definidas: 7 cabeçalhos, 314 detalhes e 7 rodapés, sem sumário definido. São 3522 registros nativos incluindo documentos e bandas. Há 238 caixas de texto, 2302 campos de saída independentes, 316 imagens, 15 códigos bidimensionais, 45 blocos de endereçamento e 106 fios, contando filhos das bandas. Segmentos internos de texto e campos internos dos blocos são descritos dentro de seus proprietários. São contagens do original catalogado, não uma leitura do projeto aberto; releia o .f atual antes de propor edições.

## novoteste-catalogo-entradas

No esquema original do NovoTeste há 157 campos de entrada mestre, 36 definições de entrada detalhe, 19 variáveis e 19 funções declaradas. As 36 definições camposDetalhe não são as 146 janelas detalhe visuais. O arquivo declara registro fixo de 2484 bytes, delimitador de campo | e delimitador de registro literal \n: preserve essas configurações e valide o contrato real antes de interpretar a massa; não conclua o número de registros só pelo tamanho do arquivo. O catálogo não contém valores de clientes nem registros da massa.

## novoteste-catalogo-dependencias

O catálogo NovoTeste registra referências de campos, variáveis, funções, fontes, overlays e imagens por caminho nativo. Foram encontrados 55 literais de nomes/sufixos de imagem: 45 nomes candidatos distintos ignorando maiúsculas, o sufixo dinâmico _2.jpg e variantes de capitalização. Há 93 ocorrências de imagem com expressão potencialmente dinâmica; essas contagens não comprovam arquivos resolvidos ou imagens executadas. O ZIP traz apenas ApoliceVD2_P1.f e APPREM_A1P1_0001, sem imagens externas ou DLL. Funções declaradas não comprovam execução de Sirius32; expressões GRAVAJRN e GRAVAJRNGEN exigem investigação de possíveis efeitos de escrita. Recursos dinâmicos dependem do registro e do motor. Preview e PDF não foram executados nesta catalogação.

## novoteste-catalogo-privacidade

O catálogo NovoTeste inclui nomes técnicos, posições, tamanhos, geometria, fontes, condições e caminhos nativos. Textos literais completos, registros da massa, caminhos absolutos e literais potencialmente sensíveis foram omitidos; códigos curtos de seleção, máscaras técnicas e nomes simples de imagens foram preservados. As expressões sanitizadas explicam estrutura e dependências, não podem ser executadas ou usadas como patch. Para localizar conteúdo omitido, inspecione o .f atual autorizado.

## novoteste-catalogo-condicoes

No NovoTeste, DocFrente, DocVerso e _ContRep participam das condições de seleção dos documentos. Documento do editor não equivale a página física do preview. Cada janela preserva separadamente condição geral, impressão condDet, quebra condQuebra, índice ocorrenciaIndDet e seleção expressaoCondicao da banda. Nomes de janelas repetem entre documentos: confirmar documento, banda, caminho nativo e estado atual do .f antes de editar; perguntar apenas se o contexto não resolver a ambiguidade.

## novoteste-doc-0

No catálogo original NovoTeste, documento 0 Frente01: condição de seleção IF ( DocFrente = "01" AND _ContRep =  1 ); principal=true. Contagens incluindo filhos de bandas: document=1, image=12, text=11, campoSaida=113, qrcode=1, detalhe=11, band=23, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[0]. O arquivo de catálogo 00-Frente01.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-1

No catálogo original NovoTeste, documento 1 Verso04: condição de seleção IF ( DocVerso = "04" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=17, text=9, campoSaida=84, detalhe=4, band=11, fio=4. Caminho nativo $.documentos[1]. O arquivo de catálogo 01-Verso04.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-2

No catálogo original NovoTeste, documento 2 Frente05: condição de seleção IF ( DocFrente = "05" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=12, text=15, campoSaida=82, qrcode=1, detalhe=1, band=3, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[2]. O arquivo de catálogo 02-Frente05.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-3

No catálogo original NovoTeste, documento 3 Frente06: condição de seleção IF ( DocFrente = "06" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=14, campoSaida=91, qrcode=1, detalhe=1, band=3, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[3]. O arquivo de catálogo 03-Frente06.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-4

No catálogo original NovoTeste, documento 4 Frente07: condição de seleção IF ( DocFrente = "07" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=13, campoSaida=125, qrcode=1, detalhe=11, band=23, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[4]. O arquivo de catálogo 04-Frente07.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-5

No catálogo original NovoTeste, documento 5 Frente08: condição de seleção IF ( DocFrente = "08" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=17, text=2, campoSaida=134, qrcode=1, detalhe=12, band=24, fio=4. Caminho nativo $.documentos[5]. O arquivo de catálogo 05-Frente08.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-6

No catálogo original NovoTeste, documento 6 Verso09: condição de seleção IF ( DocVerso = "09" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=19, text=16, campoSaida=118, detalhe=13, band=30, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[6]. O arquivo de catálogo 06-Verso09.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-7

No catálogo original NovoTeste, documento 7 Frente10: condição de seleção IF ( DocFrente = "10" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=9, campoSaida=116, qrcode=1, detalhe=11, band=23, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[7]. O arquivo de catálogo 07-Frente10.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-8

No catálogo original NovoTeste, documento 8 Verso11: condição de seleção IF ( DocVerso = "11" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=7, campoSaida=81, detalhe=11, band=25, fio=6. Caminho nativo $.documentos[8]. O arquivo de catálogo 08-Verso11.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-9

No catálogo original NovoTeste, documento 9 Frente12: condição de seleção IF ( DocFrente = "12" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=12, text=10, campoSaida=116, qrcode=1, detalhe=10, band=20, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[9]. O arquivo de catálogo 09-Frente12.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-10

No catálogo original NovoTeste, documento 10 FrHSBC01: condição de seleção IF ( DocFrente = "34" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=12, text=8, campoSaida=74, qrcode=1, detalhe=1, band=3, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[10]. O arquivo de catálogo 10-FrHSBC01.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-11

No catálogo original NovoTeste, documento 11 FrHSBC02: condição de seleção IF ( DocFrente = "35" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=7, campoSaida=77, qrcode=1, detalhe=1, band=3, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[11]. O arquivo de catálogo 11-FrHSBC02.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-12

No catálogo original NovoTeste, documento 12 FrHSBC03: condição de seleção IF ( DocFrente = "36" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=7, campoSaida=86, qrcode=1, detalhe=1, band=3, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[12]. O arquivo de catálogo 12-FrHSBC03.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-13

No catálogo original NovoTeste, documento 13 Frente39: condição de seleção IF ( DocFrente = "39" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=7, text=2, campoSaida=57, qrcode=1, detalhe=2, band=6, fio=4. Caminho nativo $.documentos[13]. O arquivo de catálogo 13-Frente39.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-14

No catálogo original NovoTeste, documento 14 Verso40: condição de seleção IF ( DocVerso = "40" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=11, text=13, campoSaida=109, detalhe=8, band=17, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[14]. O arquivo de catálogo 14-Verso40.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-15

No catálogo original NovoTeste, documento 15 Frente43: condição de seleção IF ( DocFrente = "43" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=8, text=3, campoSaida=40, qrcode=1, fio=4. Caminho nativo $.documentos[15]. O arquivo de catálogo 15-Frente43.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-16

No catálogo original NovoTeste, documento 16 Verso44: condição de seleção IF ( DocVerso = "44" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=11, text=7, campoSaida=94, detalhe=1, band=2, fio=4. Caminho nativo $.documentos[16]. O arquivo de catálogo 16-Verso44.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-17

No catálogo original NovoTeste, documento 17 Frente45: condição de seleção IF ( DocFrente = "45" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=10, text=4, campoSaida=44, qrcode=1, detalhe=1, band=2, fio=4. Caminho nativo $.documentos[17]. O arquivo de catálogo 17-Frente45.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-18

No catálogo original NovoTeste, documento 18 Verso46: condição de seleção IF ( DocVerso = "46" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=9, text=5, campoSaida=105, detalhe=1, band=2, fio=4. Caminho nativo $.documentos[18]. O arquivo de catálogo 18-Verso46.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-19

No catálogo original NovoTeste, documento 19 Frente47: condição de seleção IF ( DocFrente = "47" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=10, text=5, campoSaida=88, qrcode=1, detalhe=2, band=4, fio=4. Caminho nativo $.documentos[19]. O arquivo de catálogo 19-Frente47.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-20

No catálogo original NovoTeste, documento 20 Verso48: condição de seleção IF ( DocVerso = "48" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=9, text=6, campoSaida=105, detalhe=1, band=2, fio=4. Caminho nativo $.documentos[20]. O arquivo de catálogo 20-Verso48.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-21

No catálogo original NovoTeste, documento 21 Frente49: condição de seleção IF ( DocFrente = "49" AND _ContRep =  1 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=8, text=3, campoSaida=40, qrcode=1, fio=4. Caminho nativo $.documentos[21]. O arquivo de catálogo 21-Frente49.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-22

No catálogo original NovoTeste, documento 22 Verso50: condição de seleção IF ( DocVerso = "50" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=14, text=15, campoSaida=87, detalhe=9, band=22, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[22]. O arquivo de catálogo 22-Verso50.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-23

No catálogo original NovoTeste, documento 23 Verso51: condição de seleção IF ( DocVerso = "51" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=18, campoSaida=75, detalhe=9, band=22, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[23]. O arquivo de catálogo 23-Verso51.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-24

No catálogo original NovoTeste, documento 24 Verso52: condição de seleção IF ( DocVerso = "52" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=14, text=14, campoSaida=83, detalhe=16, band=36, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[24]. O arquivo de catálogo 24-Verso52.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-doc-25

No catálogo original NovoTeste, documento 25 Verso53: condição de seleção IF ( DocVerso = "53" AND _ContRep =  2 ); principal=false. Contagens incluindo filhos de bandas: document=1, image=13, text=15, campoSaida=78, detalhe=8, band=19, blocoEnderecamento=3, fio=4. Caminho nativo $.documentos[25]. O arquivo de catálogo 25-Verso53.md detalha cada objeto. Releia o .f atual para confirmar o alvo; este registro histórico não é autorização para editar.

## novoteste-janela-frente01-det70

No catálogo original NovoTeste, janela DET70 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[0].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin01

No catálogo original NovoTeste, janela LIN01 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin02

No catálogo original NovoTeste, janela LIN02 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin03

No catálogo original NovoTeste, janela LIN03 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin04

No catálogo original NovoTeste, janela LIN04 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin05

No catálogo original NovoTeste, janela LIN05 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin06

No catálogo original NovoTeste, janela LIN06 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin07

No catálogo original NovoTeste, janela LIN07 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin08

No catálogo original NovoTeste, janela LIN08 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin09

No catálogo original NovoTeste, janela LIN09 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente01-lin10

No catálogo original NovoTeste, janela LIN10 do documento Frente01, caminho $.documentos[0].listaJanelaDetalhe[10]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[0].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[0].listaJanelaDetalhe[10].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso04-det10

No catálogo original NovoTeste, janela DET10 do documento Verso04, caminho $.documentos[1].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[1].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[1].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso04-det12

No catálogo original NovoTeste, janela DET12 do documento Verso04, caminho $.documentos[1].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[1].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ), filhos {"campoSaida":5}); DetQuebra (detalhe, $.documentos[1].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso04-det20

No catálogo original NovoTeste, janela DET20 do documento Verso04, caminho $.documentos[1].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[1].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[1].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso04-det60

No catálogo original NovoTeste, janela DET60 do documento Verso04, caminho $.documentos[1].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[1].listaJanelaDetalhe[3].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[1].listaJanelaDetalhe[3].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[1].listaJanelaDetalhe[3].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[1].listaJanelaDetalhe[3].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":2}); DetQuebra (detalhe, $.documentos[1].listaJanelaDetalhe[3].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente05-det70

No catálogo original NovoTeste, janela DET70 do documento Frente05, caminho $.documentos[2].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[2].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[2].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[2].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente06-det70

No catálogo original NovoTeste, janela DET70 do documento Frente06, caminho $.documentos[3].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[3].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[3].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[3].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-det70

No catálogo original NovoTeste, janela DET70 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[4].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin01

No catálogo original NovoTeste, janela LIN01 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin02

No catálogo original NovoTeste, janela LIN02 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin03

No catálogo original NovoTeste, janela LIN03 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin04

No catálogo original NovoTeste, janela LIN04 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin05

No catálogo original NovoTeste, janela LIN05 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin06

No catálogo original NovoTeste, janela LIN06 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin07

No catálogo original NovoTeste, janela LIN07 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin08

No catálogo original NovoTeste, janela LIN08 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin09

No catálogo original NovoTeste, janela LIN09 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente07-lin10

No catálogo original NovoTeste, janela LIN10 do documento Frente07, caminho $.documentos[4].listaJanelaDetalhe[10]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[4].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[4].listaJanelaDetalhe[10].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin01

No catálogo original NovoTeste, janela LIN01 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin02

No catálogo original NovoTeste, janela LIN02 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin03

No catálogo original NovoTeste, janela LIN03 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin04

No catálogo original NovoTeste, janela LIN04 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin05

No catálogo original NovoTeste, janela LIN05 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin06

No catálogo original NovoTeste, janela LIN06 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin07

No catálogo original NovoTeste, janela LIN07 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin08

No catálogo original NovoTeste, janela LIN08 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin09

No catálogo original NovoTeste, janela LIN09 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-lin10

No catálogo original NovoTeste, janela LIN10 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-det10

No catálogo original NovoTeste, janela DET10 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[10]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[10].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente08-det12

No catálogo original NovoTeste, janela DET12 do documento Frente08, caminho $.documentos[5].listaJanelaDetalhe[11]. Condição geral: IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[5].listaJanelaDetalhe[11].ListaDet[20], condição IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ), filhos {"campoSaida":5}); DetQuebra (detalhe, $.documentos[5].listaJanelaDetalhe[11].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin07

No catálogo original NovoTeste, janela LIN07 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin08

No catálogo original NovoTeste, janela LIN08 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin09

No catálogo original NovoTeste, janela LIN09 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-lin10

No catálogo original NovoTeste, janela LIN10 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-det70

No catálogo original NovoTeste, janela DET70 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[10]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[6].listaJanelaDetalhe[10].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[10].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-det20

No catálogo original NovoTeste, janela DET20 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[11]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[11].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[11].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso09-det60

No catálogo original NovoTeste, janela DET60 do documento Verso09, caminho $.documentos[6].listaJanelaDetalhe[12]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[6].listaJanelaDetalhe[12].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[6].listaJanelaDetalhe[12].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[6].listaJanelaDetalhe[12].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[6].listaJanelaDetalhe[12].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":2}); DetQuebra (detalhe, $.documentos[6].listaJanelaDetalhe[12].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-det70

No catálogo original NovoTeste, janela DET70 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[7].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin01

No catálogo original NovoTeste, janela LIN01 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin02

No catálogo original NovoTeste, janela LIN02 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin03

No catálogo original NovoTeste, janela LIN03 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin04

No catálogo original NovoTeste, janela LIN04 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin05

No catálogo original NovoTeste, janela LIN05 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin06

No catálogo original NovoTeste, janela LIN06 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin07

No catálogo original NovoTeste, janela LIN07 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin08

No catálogo original NovoTeste, janela LIN08 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin09

No catálogo original NovoTeste, janela LIN09 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente10-lin10

No catálogo original NovoTeste, janela LIN10 do documento Frente10, caminho $.documentos[7].listaJanelaDetalhe[10]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[7].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[7].listaJanelaDetalhe[10].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-det10

No catálogo original NovoTeste, janela DET10 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-det12

No catálogo original NovoTeste, janela DET12 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ), filhos {"campoSaida":5}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin1

No catálogo original NovoTeste, janela LIN1 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin2

No catálogo original NovoTeste, janela LIN2 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin3

No catálogo original NovoTeste, janela LIN3 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin4

No catálogo original NovoTeste, janela LIN4 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin5

No catálogo original NovoTeste, janela LIN5 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin6

No catálogo original NovoTeste, janela LIN6 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin7

No catálogo original NovoTeste, janela LIN7 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-lin8

No catálogo original NovoTeste, janela LIN8 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso11-det60

No catálogo original NovoTeste, janela DET60 do documento Verso11, caminho $.documentos[8].listaJanelaDetalhe[10]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[8].listaJanelaDetalhe[10].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[8].listaJanelaDetalhe[10].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[8].listaJanelaDetalhe[10].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[8].listaJanelaDetalhe[10].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":1}); DetQuebra (detalhe, $.documentos[8].listaJanelaDetalhe[10].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin01

No catálogo original NovoTeste, janela LIN01 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin02

No catálogo original NovoTeste, janela LIN02 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin03

No catálogo original NovoTeste, janela LIN03 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin04

No catálogo original NovoTeste, janela LIN04 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin05

No catálogo original NovoTeste, janela LIN05 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin06

No catálogo original NovoTeste, janela LIN06 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin07

No catálogo original NovoTeste, janela LIN07 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin08

No catálogo original NovoTeste, janela LIN08 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin09

No catálogo original NovoTeste, janela LIN09 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente12-lin10

No catálogo original NovoTeste, janela LIN10 do documento Frente12, caminho $.documentos[9].listaJanelaDetalhe[9]. Condição geral: IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[9].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[9].listaJanelaDetalhe[9].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frhsbc01-det70

No catálogo original NovoTeste, janela DET70 do documento FrHSBC01, caminho $.documentos[10].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[10].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[10].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[10].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frhsbc02-det70

No catálogo original NovoTeste, janela DET70 do documento FrHSBC02, caminho $.documentos[11].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[11].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[11].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[11].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frhsbc03-det70

No catálogo original NovoTeste, janela DET70 do documento FrHSBC03, caminho $.documentos[12].listaJanelaDetalhe[0]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[12].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[12].listaJanelaDetalhe[0].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[12].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente39-det10

No catálogo original NovoTeste, janela DET10 do documento Frente39, caminho $.documentos[13].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[13].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (( TipoDet = "10" ) Or ( TipoDet = "11" )) AND (QtdCobertura < 23) ), filhos {"campoSaida":4}); DET2 (detalhe, $.documentos[13].listaJanelaDetalhe[0].ListaDet[21], condição IF ( (( TipoDet = "10" ) Or ( TipoDet = "11" )) AND (QtdCobertura > 22) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[13].listaJanelaDetalhe[0].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente39-det12

No catálogo original NovoTeste, janela DET12 do documento Frente39, caminho $.documentos[13].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[13].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (( TipoDet = "12" ) Or ( TipoDet = "13" )) AND (QtdCobertura < 23) ), filhos {"campoSaida":5}); DET2 (detalhe, $.documentos[13].listaJanelaDetalhe[1].ListaDet[21], condição IF ( (( TipoDet = "12" ) Or ( TipoDet = "13" )) AND (QtdCobertura > 22) ), filhos {"campoSaida":5}); DetQuebra (detalhe, $.documentos[13].listaJanelaDetalhe[1].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-det20

No catálogo original NovoTeste, janela DET20 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-det70

No catálogo original NovoTeste, janela DET70 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[1]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[14].listaJanelaDetalhe[1].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[1].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[2]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[3]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[4]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[5]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[6]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso40-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso40, caminho $.documentos[14].listaJanelaDetalhe[7]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[14].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[14].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso44-det10

No catálogo original NovoTeste, janela DET10 do documento Verso44, caminho $.documentos[16].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[16].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":6}); DetQuebra (detalhe, $.documentos[16].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente45-det20

No catálogo original NovoTeste, janela DET20 do documento Frente45, caminho $.documentos[17].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[17].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[17].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso46-det10

No catálogo original NovoTeste, janela DET10 do documento Verso46, caminho $.documentos[18].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[18].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":6}); DetQuebra (detalhe, $.documentos[18].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente47-det10

No catálogo original NovoTeste, janela DET10 do documento Frente47, caminho $.documentos[19].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[19].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[19].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-frente47-det12

No catálogo original NovoTeste, janela DET12 do documento Frente47, caminho $.documentos[19].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[19].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "12" ) Or ( TipoDet = "13" ) ), filhos {"campoSaida":5}); DetQuebra (detalhe, $.documentos[19].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso48-det10

No catálogo original NovoTeste, janela DET10 do documento Verso48, caminho $.documentos[20].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[20].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "10" ) Or ( TipoDet = "11" ) ), filhos {"campoSaida":6}); DetQuebra (detalhe, $.documentos[20].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-det20

No catálogo original NovoTeste, janela DET20 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-det60

No catálogo original NovoTeste, janela DET60 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[22].listaJanelaDetalhe[1].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[1].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[22].listaJanelaDetalhe[1].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[22].listaJanelaDetalhe[1].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[1].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-det70

No catálogo original NovoTeste, janela DET70 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[2]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[22].listaJanelaDetalhe[2].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[2].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[3]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[4]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[5]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[6]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[7]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso50-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso50, caminho $.documentos[22].listaJanelaDetalhe[8]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[22].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[22].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-det20

No catálogo original NovoTeste, janela DET20 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-det60

No catálogo original NovoTeste, janela DET60 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[23].listaJanelaDetalhe[1].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[1].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[23].listaJanelaDetalhe[1].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[23].listaJanelaDetalhe[1].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[1].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-det70

No catálogo original NovoTeste, janela DET70 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[2]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[23].listaJanelaDetalhe[2].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[2].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[3]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[4]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[5]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[6]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[7]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso51-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso51, caminho $.documentos[23].listaJanelaDetalhe[8]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[23].listaJanelaDetalhe[8].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[23].listaJanelaDetalhe[8].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin1

No catálogo original NovoTeste, janela LIN1 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin2

No catálogo original NovoTeste, janela LIN2 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[1].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[1].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin3

No catálogo original NovoTeste, janela LIN3 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[2]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin4

No catálogo original NovoTeste, janela LIN4 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[3]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin5

No catálogo original NovoTeste, janela LIN5 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[4]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin6

No catálogo original NovoTeste, janela LIN6 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[5]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin7

No catálogo original NovoTeste, janela LIN7 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[6]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin8

No catálogo original NovoTeste, janela LIN8 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[7]. Condição geral: IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "40" ) Or ( TipoDet = "41" ) ), filhos {"campoSaida":2}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-det60

No catálogo original NovoTeste, janela DET60 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[8]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[24].listaJanelaDetalhe[8].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[8].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[24].listaJanelaDetalhe[8].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[24].listaJanelaDetalhe[8].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[8].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-det70

No catálogo original NovoTeste, janela DET70 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[9]. Condição geral: IF ( TipoDet = "70" OR  TipoDet = "71" ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[9].ListaDet[20], condição IF ( (( TipoDet = "70" ) Or ( TipoDet = "71" )) AND ( _AvDetSpace >  300 ) ), filhos {"campoSaida":3}); DET2 (detalhe, $.documentos[24].listaJanelaDetalhe[9].ListaDet[21], condição IF ( ( TipoDet = "70" ) Or ( TipoDet = "71" ) ), filhos {"campoSaida":3}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[9].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[10]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[10].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[10].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[11]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[11].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[11].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[12]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[12].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[12].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[13]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[13].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[13].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[14]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[14].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[14].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso52-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso52, caminho $.documentos[24].listaJanelaDetalhe[15]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[24].listaJanelaDetalhe[15].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[24].listaJanelaDetalhe[15].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-det20

No catálogo original NovoTeste, janela DET20 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[0]. Condição geral: IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[0].ListaDet[20], condição IF ( (  TipoDet = "20" ) Or ( TipoDet = "21" ) ), filhos {"campoSaida":4}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[0].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-det60

No catálogo original NovoTeste, janela DET60 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[1]. Condição geral: IF ( (  TipoDet = "60" ) Or ( TipoDet = "61" ) ); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: CAB1 (cabecalho, $.documentos[25].listaJanelaDetalhe[1].ListaDet[0], condição vazia, filhos {"image":1,"text":1}); DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[1].ListaDet[20], condição IF ( TipoDet = "60" ), filhos {"campoSaida":1,"image":1}); ROD1 (rodape, $.documentos[25].listaJanelaDetalhe[1].ListaDet[119], condição vazia, filhos {"image":1,"text":1}); DET2 (detalhe, $.documentos[25].listaJanelaDetalhe[1].ListaDet[21], condição IF (TipoDet = "61" ), filhos {"campoSaida":1,"image":2,"text":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[1].ListaDet[22], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin01

No catálogo original NovoTeste, janela LIN01 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[2]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[2].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[2].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin02

No catálogo original NovoTeste, janela LIN02 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[3]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[3].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[3].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin03

No catálogo original NovoTeste, janela LIN03 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[4]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[4].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[4].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin04

No catálogo original NovoTeste, janela LIN04 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[5]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[5].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[5].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin05

No catálogo original NovoTeste, janela LIN05 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[6]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[6].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[6].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.

## novoteste-janela-verso53-lin06

No catálogo original NovoTeste, janela LIN06 do documento Verso53, caminho $.documentos[25].listaJanelaDetalhe[7]. Condição geral: IF ((TipoDet = "30") Or (TipoDet = "31")); impressão: vazia; quebra: vazia; detalhe indexado=false; expressão de índice: vazia. Bandas definidas: DET1 (detalhe, $.documentos[25].listaJanelaDetalhe[7].ListaDet[20], condição IF ( (  TipoDet = "30" ) Or ( TipoDet = "31" ) ), filhos {"campoSaida":1}); DetQuebra (detalhe, $.documentos[25].listaJanelaDetalhe[7].ListaDet[21], condição vazia, filhos {}). Condições vazias são distintas de bandas ausentes. Para editar, confirme o mesmo caminho no .f atual; expressões sanitizadas não são executáveis.
