# Frontend real em format-local

Esta base registra o frontend real encontrado em:

```text
C:\workspace\format-local\format\frontend
```

O caminho informado inicialmente como `C:\workspace\format-local\frontend` nao existe. Dentro de `format-local`, a raiz correta do projeto e `C:\workspace\format-local\format`, e o frontend fica em `format\frontend`.

## Stack

O `package.json` mostra um frontend Vite/React:

- Vite.
- React 19.
- React DOM.
- Bootstrap 5.
- Bootstrap Icons.
- JSZip.

Scripts:

- `npm run dev`: `vite --host 0.0.0.0`.
- `npm run build`: `vite build`.
- `npm run preview`: `vite preview --host 0.0.0.0`.

Arquivos principais:

- `src/main.jsx`: roteamento e shell principal.
- `src/pages/DashboardPage.jsx`: dashboard/projetos/importacao/processamento direto.
- `src/pages/EditorPage.jsx`: estrutura visual do editor.
- `src/pages/ProcessingPage.jsx`: processamento.
- `src/pages/IdeMockPage.jsx`: prototipo visual estilo IDE.
- `src/editor/editorController.js`: controlador grande do editor visual.
- `src/styles/editor.css`: estilos do editor.

## Rotas reais do frontend

`src/main.jsx` mapeia:

- `/login` -> login.
- `/dashboard` -> dashboard.
- `/processing` -> processamento.
- `/project/editor-ide` -> IDE mock.
- `/project/editor` e `/project/open` -> editor real.
- qualquer outra rota -> home.

O shell lateral tem atalhos para dashboard e processamento, mostra usuario logado quando disponivel e faz logout via `/api/auth/logout`.

## Editor real

`src/pages/EditorPage.jsx` define a interface visual principal.

Areas e elementos reais:

- Top bar com titulo do documento, seletor de papel e toolbar.
- Botoes principais: salvar, voltar ao painel, validar PontoF, pre-visualizar, configurar formulario, desfazer/refazer, zoom.
- Navegacao superior para offcanvas: Acoes, Layouts, Envios.
- Paleta lateral esquerda de componentes.
- Canvas central com reguas superior/lateral, linhas-guia de cursor e area `#canvas`.
- Barra inferior com propriedades resumidas e coordenada do cursor.
- Dock direito com paineis: Propriedades, Elementos/objetos criados e Documentos.

IDs importantes:

- `saveButton`: salvar.
- `validatePontoFButton`: validar PontoF.
- `previewButton`: pre-visualizar.
- `openPageConfigButton`: configurar formulario.
- `zoomSlider`, `zoomOutButton`, `zoomInButton`, `zoomLevel`: zoom.
- `canvasContainer`, `canvas`, `top-ruler`, `left-ruler`: canvas e reguas.
- `componentProperties`, `mousePoint`: status/propriedades.
- `rightSidebar`: dock direito.
- `editorLayerList`: lista de objetos/camadas.
- `editorPageSideList`: lista de documentos.

## Paleta real de componentes

A paleta real em `EditorPage.jsx` mostra:

Ferramentas:

- Mouse / selecionar, mover e redimensionar.

Componentes:

- Texto: `data-type="text"`.
- Imagem: `data-type="image"`.
- Codigo de barras: `data-type="barcode"`.
- QR Code: `data-type="qrcode"`.
- Campo de saida: `data-type="campoSaida"`.
- Bloco de enderecamento: `data-type="blocoEnderecamento"`.
- Janela detalhe: `data-type="detalhe"`.

Formas:

- Retangulo: `data-type="FIO_MOLDURA"`.
- Elipse: `data-type="FIO_ELIPSE"`.
- Linha: `data-type="FIO_HORIZONTAL"`.

Isto corrige a base anterior: elipse aparece sim na paleta real deste frontend, e tambem aparecem enderecamento e janela detalhe.

## Painel de acoes

O offcanvas `Acoes` possui:

- Salvar layout.
- Mostrar grade.
- Mostrar linha do cursor.
- Configurar formulario.
- Configurar overlay.
- Arquivo de dados.
- Pre-visualizar.

## Painel direito

Paineis reais:

- Propriedades: mostra selecao atual e transformacao em mm: X, Y, largura, altura.
- Elementos: lista de objetos criados/camadas.
- Documentos: adicionar, duplicar, renomear e remover pagina/documento.

Para linha/retangulo/elipse, ha propriedades de tipo, espessura e cor, alem de botao `Editar definicao`.

## Modais e recursos visuais relevantes

`EditorPage.jsx` contem modais para:

- Configurar formulario.
- Configurar overlay.
- Arquivo de dados.
- Campos de entrada.
- Editar Texto.
- Campo de Saida.
- Imagem/logo.
- Codigo de barras.
- QR Code.
- Fio/linha.
- Campo de saida do bloco de enderecamento.
- Nome/expressao de documento.
- Validacao do PontoF.
- Entrada do preview.
- Preview do layout.

## Dashboard real

`DashboardPage.jsx` usa endpoints como:

- `/api/list-projects`.
- `/api/preview-layout`.
- `/api/create-project`.
- `/api/upload-project-asset`.
- `/api/import-project`.
- `/api/delete-project`.
- `/api/rename-project`.
- `/api/process-project/{projectId}`.
- `/api/format/processes`.
- `/api/format/process/{processId}/pdfs`.
- `/api/format/download/{pdfId}`.

A importacao permite preview de layout, recursos e dados antes de importar.

## Controlador do editor

`src/editor/editorController.js` e muito grande e nao deve ser indexado inteiro como contexto bruto. Ele contem logica de:

- grid, DPI, conversao px/mm e medidas.
- renderizacao de componentes no canvas.
- conversao de texto legado para HTML e tokens internos.
- preview de barcode/QR Code/imagem/logo.
- assets do projeto.
- funcoes de usuario e DLL.
- draft de layout/documento.
- validacao de PontoF.
- preview de layout.
- chamadas a `/api/save-layout`, `/api/save-layout-draft`, `/api/project-assets`, `/api/upload-project-asset`, `/api/default-user-function-dll`, `/api/upload-user-function-dll`.

Trechos pesquisados indicam que o salvar usa:

- `/api/save-layout?layoutId=...`
- `/api/save-layout-draft?layoutId=...`

A validacao visual do PontoF usa `validatePontoFButton` e renderiza modal de `Validacao do PontoF`.

## Como a IA deve usar isso

Quando o usuario falar de uma acao da interface, a IA deve primeiro traduzir para um conceito visual:

- componente arrastado da paleta;
- componente selecionado no canvas;
- propriedade alterada no painel direito;
- configuracao aberta no painel Acoes;
- documento manipulado no painel Documentos;
- asset enviado em Envios;
- preview ou validacao executados pela toolbar.

Somente depois disso, em uma fase futura, essa acao deve virar alteracao no JSON canonico e passar por validacao/dry-run.

Nesta fase, a IA continua somente consulta.
