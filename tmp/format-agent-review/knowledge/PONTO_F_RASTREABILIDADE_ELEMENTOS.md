# Rastreabilidade tecnica de elementos Ponto F

Este documento e destinado apenas ao contexto tecnico do agente. Nao deve ser usado para expor classes, arquivos ou infraestrutura ao usuario final.

## Fonte de verdade e fluxo

1. O projeto armazena um arquivo binario `.f` e seus recursos.
2. O `format-web` le o arquivo com `PontoFLer` e executa `PontoFTojson.convertFromPontoF`.
3. Cada `Documento` legado gera uma `Page`; cada objeto legado gera um item de `Page.layout`.
4. O frontend usa `state.pages[currentPage].layout`. Em `editorController.js`, `renderLayout()` percorre o array e `createComponentElement(item, index)` monta o componente visual.
5. O elemento do canvas recebe `.component` e `data-index=index`; esse indice aponta para o mesmo item no `layout` da pagina atual. O DOM e uma confirmacao visual, mas a fonte editavel e o JSON/layout e, ao salvar, o Ponto F.
6. Ao salvar, o backend reconverte JSON para Ponto F e grava uma nova versao do layout.

## Mapeamento legado para JSON/web

`PontoFTojson.loadComponents` acrescenta os itens nesta ordem por documento: `Logo -> CampoLogo/image`, `TextField -> CampoTexto/text`, `CpoSai -> CampoSaida/campoSaida`, `BarCode -> CampoBarCode/barcode`, `BarCodeBi -> CampoQRCode/qrcode`, `JanelaDetalhe -> CampoJanelaDetalhe/detalhe`, `BlocoEnderecamento -> CampoBlocoEnderecamento/blocoEnderecamento`, `Fio -> CampoFio/fio`.

As coordenadas de Ponto F sao convertidas para milimetros. Para fios, `tipoFio` diferencia `FIO_HORIZONTAL`, `FIO_VERTICAL`, `FIO_MOLDURA` e `FIO_ELIPSE`. No editor, `FIO_HORIZONTAL` e `FIO_VERTICAL` sao desenhados como linhas; moldura e elipse usam borda.

## Como localizar um alvo para edicao

1. Obter o inventario pelo endpoint `POST /api/pontof/mapear`, enviando o `.f` em base64.
2. O inventario retorna IDs estaveis para a versao do arquivo: por exemplo, `doc-0-texto-3` e `doc-0-fio-1`, tipo, rotulo/texto, subtipo e caixa `xMm`, `yMm`, `larguraMm`, `alturaMm`.
3. Resolver o pedido com base em tipo, texto/rotulo e posicao. Exemplo: "linha do topo" deve selecionar o `FIO_HORIZONTAL` com menor `yMm`, nunca uma linha escolhida arbitrariamente.
4. Executar a alteracao somente no ID resolvido e validar os limites do documento antes de gravar.
5. Recarregar o layout no frontend depois da nova versao ser salva.

Para pedidos ambiguos com mais de um candidato, a IA deve pedir esclarecimento e apresentar uma descricao curta dos candidatos. Nao deve editar o primeiro campo de texto como comportamento generico.

## Pontos de codigo atuais

- Backend de conversao: `format-web/src/main/java/com/totaldocs/format/web/util/PontoFTojson.java`.
- Persistencia de layout: `format-web/src/main/java/com/totaldocs/format/web/controller/api/LayoutApiController.java`.
- Orquestracao de chat: `format-web/src/main/java/com/totaldocs/format/web/controller/api/AiChatApiController.java`.
- Renderizacao e vinculo DOM/layout: `frontend/src/editor/editorController.js` em `renderLayout`, `createComponentElement` e `renderEditorLayers`.
- Ferramenta de leitura/escrita controlada: `tools/ponto-f-draft/PontoFDraftTool.java`.
