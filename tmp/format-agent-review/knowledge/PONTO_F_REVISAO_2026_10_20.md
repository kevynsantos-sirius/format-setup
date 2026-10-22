# Revisao tecnica do Ponto F em 20/10/2026

Base revisada: C:/workspace/format-local/format. Format-agent: C:/workspace/format/format-agent.
Esta memoria descreve evidencias do codigo e regressões; nao e o inventario do arquivo de um usuario.

## Identificar um item antes de editar

Documento selecionado no editor nao e a pagina fisica do preview. Um registro mestre, repeticoes e expressoes de selecao escolhem documentos diferentes. Identificar nome e indice do documento, tipo, banda, condicao, expressao/texto e coordenadas. Nomes como LIN01 podem se repetir entre documentos. Nunca escolher o primeiro resultado ambiguo.

PontoFLer -> PontoFTojson.convertFromPontoF -> AplicacaoPontoF.listaDocumentos -> Page.layout.
No DOM, data-index e apenas a posicao atual em Page.layout. Reordenar, excluir ou trocar de documento invalida esse indice.
O diagnostico do agente retorna snapshotSha256 e IDs snapshot:JSON-pointer. Reinspecionar a versao apos qualquer alteracao. Filhos de bandas usam coordenadas locais, nao coordenadas absolutas do papel.

Tipos reais: text, campoSaida, image, barcode, qrcode, detalhe, blocoEnderecamento e fio (com tipoFio horizontal/vertical/moldura/elipse). Inventario limitado a textos e fios e incompleto. Campos de entrada, variaveis e configuracoes pertencem a outros escopos do layout.

Fontes: format-web/src/main/java/com/totaldocs/format/web/util/PontoFTojson.java; dto/Component.java; dto/AplicacaoPontoF.java; frontend/src/editor/editorController.js.

## Texto literal, campo de saida e Sirius32

Texto literal nao executa MASCARA, CARO, IF ou concatenacoes. `Caro (a)` e uma saudacao, nao a funcao CARO. Dentro de texto, somente tokens explicitos de campo de saida (nos campoSaida/outputField ou escape C legado) avaliam expressoes. Nao transformar qualquer palavra seguida de parenteses em funcao.

CampoSaida.expressao e calculado; mask/mascara formata um valor, nao os numeros que aparecem nos argumentos de GetStr(LinSorteio, 1, 36). Sem registro executado, mostrar expressao; zeros sinteticos nao sao prova de dados reais.

Catalogo completo: GET /api/default-user-function-dll le exports da DLL local do Web. Lista inicial de dez funcoes para novos projetos NAO e o catalogo. Quantidade de parametros de export nao decorado pode ser desconhecida; nao inventar assinatura. MASCARA e delegada ao format-api, que usa SiriusFunctionRunner.exe e Wine para a DLL configurada. Confirmar execucao por POST /api/user-functions/execute; catalogo por si so nao prova execucao. Algumas funcoes simples sao locais ao preview (RTRIM, LTRIM, TRIM, TRIMM, VALNUM, I2OF5). Nao extrapolar paridade total com o motor nativo.

Fontes: service/LayoutPreviewService.java (resolveContentNode, resolveLegacyPreviewText, evaluateFunction), service/SiriusUserFunctionClient.java, util/DefaultUserFunctions.java; format-api/.../service/SiriusFunctionService.java; frontend/src/editor/detailBands.js.

## Condicoes distintas na janela detalhe

Objeto.ExprCond -> Component.conditional: condicao geral da janela.
JanelaDetalhe.CondDet -> condDet: condicao de impressao.
CondQuebra -> condQuebra: quebra; OcorrenciaIndDet -> ocorrenciaIndDet: indice quando usaDetIndexado.
Detalhe.ExprCond -> bandas[].expressaoCondicao: selecao da definicao de banda.
Uma dessas expressoes nao substitui a outra. Copiar condDet para o campo de condicao geral apaga o significado correto.

## Bandas: quatro grupos, varias definicoes

O array legado tem 140 slots: cabecalhos 0..19, detalhes 20..118, rodapes 119..138, sumario 139. Percorrer as contagens NCab/NDet/NRod/NSum nos respectivos offsets. NDet e quantidade de definicoes, nao numero de repeticoes nem motivo para duplicar a mesma banda no canvas.
JSON usa bandas[].kind (cabecalho/detalhe/rodape/sumario), defined, nome e id do editor. A primeira definicao de cada grupo ocupa slots de editor 0..3; extras nao sao automaticamente detalhes pelo seu numero. Preservar definicoes vazias efetivamente definidas, sem importar lixo de slots inativos. CabecVisivel false nao significa que uma definicao existente possa ser descartada.

Caso NovoTeste: LIN01 de Frente01 tem cabecalho vazio e duas definicoes de detalhe, DET1 e DetQuebra. DET1 tem quatro campos de saida GetStr. Nao mover DET1 para cabecalho por ser o primeiro item de uma lista compactada.

Fonte: dto/CampoJanelaDetalhe.java; dto/DetalheDTO.java; format-manager/.../controller/ler/JanelaDetalheLer.java; util/Constantes.java; frontend/src/editor/detailBands.js.

## Gravacao e compatibilidade

Serializar o array completo de slots nos grupos corretos e reler o binario. Comparar contagens, nomes, condicoes e filhos, alem de confirmar que o parser nao falhou. O gravador tinha NCab com palavras invertidas: 1 cabecalho relido como 0. A revisao corrigiu a escrita little-endian (contagem na palavra baixa, zero na alta). Regressao cobre cabecalhos NAO vazios; caso com NCab=0 sozinho nao revelava o defeito.

Fontes: format-manager/.../controller/gravar/JanelaDetalheGravar.java; format-web/src/test/java/com/totaldocs/format/web/dto/CampoJanelaDetalheTest.java.
