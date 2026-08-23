# Manual do Usuario - Format Web

Versao inicial: 12/08/2026  
Ultima atualizacao: 22/08/2026
Aplicacao: Format Web  
Publico-alvo: usuarios que criam, importam, editam e processam layouts Format.

Este manual descreve as telas existentes no projeto `format` na estrutura atual:

- `frontend`: interface React/Vite.
- `format-web`: backend Spring Boot usado pelo frontend para autenticacao, projetos, layouts, assets e ponte com a API de processamento.
- `format-api`: API que executa o processamento Format e gera PDFs.

## 1. Visao Geral

O Format Web centraliza quatro atividades principais:

1. Acessar o sistema com conta local ou SSO.
2. Criar, importar, abrir, baixar, renomear e excluir projetos.
3. Editar layouts em uma area visual, com paginas, componentes, propriedades, camadas e arquivos do projeto.
4. Pre-visualizar layouts com arquivo de dados e processar layouts para gerar PDFs.

As principais rotas de tela sao:

| Tela | Rota | Uso principal |
| --- | --- | --- |
| Inicio | `/` | Entrada da aplicacao e acesso rapido ao editor ou login. |
| Login | `/login` | Autenticacao local ou SSO. |
| Cadastro | `/register` | Criacao de conta local. |
| Meus Projetos | `/dashboard` | Gestao de projetos. |
| Editor | `/project/editor` | Edicao visual do layout. |
| Processamento | `/processing` | Envio de layouts/dados, preview e acompanhamento de PDFs. |
| Editor IDE | `/project/editor-ide` | Prototipo visual de editor em formato IDE. |

## 2. Acesso ao Sistema

### 2.1 Tela Inicio

A tela inicial apresenta o Format Web e permite:

- Abrir o editor.
- Entrar ou criar conta.

Use essa tela quando estiver acessando o sistema pela primeira vez ou quando quiser voltar ao ponto inicial.

### 2.2 Login

Na tela de login:

1. Informe o email.
2. Informe a senha.
3. Clique em **Entrar com conta local**.

Se o ambiente estiver configurado com provedor corporativo, tambem aparece a opcao **Entrar com SSO**.

Mensagens comuns:

- **Email ou senha invalidos**: revise as credenciais.
- **Voce foi desconectado com sucesso**: logout concluido.
- **Seu login expirou**: entre novamente para continuar.

### 2.3 Cadastro

Na tela de cadastro:

1. Informe nome.
2. Informe email.
3. Informe senha.
4. Clique em **Criar conta**.

Apos o cadastro com sucesso, o sistema redireciona para o login.

### 2.4 Sessao expirada

Quando a sessao expira durante o uso, o sistema mostra a tela **Login expirado**. Clique em **Fazer login** para voltar ao acesso.

## 3. Navegacao Principal

Depois do login, a barra lateral compacta permite navegar entre:

- **Projetos**: abre `/dashboard`.
- **Processamento**: abre `/processing`.
- **Usuario**: mostra o nome do usuario logado quando disponivel.
- **Sair**: encerra a sessao.

## 4. Tela Meus Projetos

Rota: `/dashboard`

Essa tela lista os projetos do usuario e concentra as acoes de criacao e importacao.

### 4.1 Criar projeto novo

1. Clique em **Criar Projeto**.
2. Informe o nome do projeto.
3. Defina a quantidade de documentos que serao criados.
4. Ajuste os nomes dos documentos, se necessario.
5. Informe a **expressao do documento** para cada documento.
6. Se preferir, clique em **Editor** ao lado da expressao para abrir o **Editor de Expressao**.
7. Clique em **Criar**.

Observacoes:

- O primeiro documento normalmente fica como **Principal**.
- Os nomes nao devem ficar vazios.
- O sistema evita nomes repetidos para documentos.
- Cada documento precisa ter uma expressao. O sistema nao cria o projeto se alguma expressao ficar vazia.
- O editor de expressao do projeto oferece atalhos para funcoes como `LTRIM`, `RTRIM`, `TRIM`, `UPPER` e `LOWER`, operadores, condicionais, texto vazio e zero.

### 4.1.1 Visao de administrador

Usuarios com perfil **ADMIN** visualizam a tela como **Projetos**, em vez de **Meus Projetos**.

Nesse perfil:

- A lista pode exibir projetos de todos os usuarios.
- Cada card mostra o campo **Dono** quando a informacao estiver disponivel.
- O administrador pode abrir, baixar, renomear, excluir e manipular assets dos projetos acessiveis.
- Usuarios comuns continuam visualizando somente os proprios projetos.

### 4.2 Importar projeto legado

1. Clique em **Importar** ou **Importar Legado**.
2. Arraste ou selecione o layout `.f`.
3. Opcionalmente envie um ZIP que contenha um arquivo `.f`.
4. Arraste ou selecione recursos e dados relacionados ao projeto.
5. Use **Visualizar** para conferir o layout antes de importar.
6. Clique em **Importar e Abrir**.

Arquivos aceitos na area de recursos:

- ZIP.
- JPG, PNG, BMP, GIF.
- TXT, CSV, DAT, RET, REM.
- XLS.
- Arquivos sem extensao, quando usados pelo legado.

Se o ZIP enviado nao tiver um `.f`, o sistema mostra aviso informando que nao encontrou o layout.

### 4.3 Abrir projeto

Na lista de projetos, clique em **Abrir**. O sistema abre o editor com o `projectId` do projeto selecionado.

### 4.4 Baixar projeto

Clique no icone de download do card do projeto. O sistema baixa um ZIP com o conteudo do projeto.

### 4.5 Gerar PDF direto do projeto

No card do projeto, clique no icone de PDF para solicitar o processamento sem sair da tela **Meus Projetos**.

O sistema:

1. Usa o layout `.f` salvo no projeto.
2. Localiza automaticamente o arquivo de dados configurado no Ponto F, quando ele estiver salvo entre os assets do projeto.
3. Envia layout, assets e arquivo de dados para a `format-api`.
4. Mostra um painel de progresso no proprio card.
5. Ao concluir, baixa o PDF gerado automaticamente quando houver apenas um PDF disponivel.

Se o processamento falhar, a mensagem retornada pela `format-api` aparece no topo da tela. Quando a falha vem do Format legado, a mensagem pode indicar a funcao/DLL ausente ou outro erro registrado no processo atual.

Observacoes:

- Se o layout informar um arquivo de dados que nao esta salvo no projeto, o sistema avisa antes de iniciar o processamento.
- Se o layout nao informar arquivo de dados e houver mais de um arquivo de dados salvo, o sistema solicita ajuste do projeto.
- O ZIP do projeto baixado pelo botao de download continua sendo apenas uma exportacao; a geracao de PDF usa o fluxo de processamento.

### 4.6 Renomear projeto

1. Clique no icone **Renomear**.
2. Informe o novo nome.
3. Clique em **Renomear**.

### 4.7 Excluir projeto

1. Clique no icone **Excluir**.
2. Confirme a exclusao.

Atencao: a exclusao remove o projeto selecionado.

## 5. Editor de Layout

Rota: `/project/editor`

O editor e a tela principal de criacao e manutencao dos layouts. Ele combina uma area visual com paineis laterais.

### 5.1 Areas da tela

| Area | Funcao |
| --- | --- |
| Barra superior | Salvar, zoom e atalhos do editor. |
| Canvas | Area visual onde os componentes sao posicionados. |
| Painel esquerdo | Acoes do layout, configuracoes de documento, entrada e dados. |
| Painel direito | Propriedades, componentes, camadas e paginas. |
| Offcanvas de envios | Upload, busca, listagem e exclusao de arquivos do projeto. |

### 5.2 Salvar layout

Clique em **Salvar layout** ou no icone de disquete.

Use essa acao sempre que concluir uma etapa de edicao importante. O backend cria historico de versoes do layout, permitindo consulta e rollback pelas APIs do projeto.

### 5.3 Carregar layout salvo

Clique em **Carregar layout salvo** para recuperar a versao persistida do projeto.

Essa acao e util quando:

- Voce abriu o editor e quer garantir que esta vendo o layout salvo.
- Quer descartar mudancas locais ainda nao salvas.
- Importou um layout e precisa recarregar o estado do projeto.

### 5.4 Zoom

Use os botoes:

- **Zoom menos**.
- **Zoom mais**.

O zoom altera apenas a visualizacao do canvas, nao o tamanho real do documento.

### 5.5 Configuracao do documento

O painel de documento permite ajustar propriedades gerais, como:

- Rotacao da pagina.
- Dimensoes de documentos.
- Espacos entre documentos.
- Nome, ordem e configuracoes das paginas/documentos.
- Expressao do documento.

Recomendacao: configure as dimensoes e a rotacao antes de posicionar muitos componentes, para evitar ajustes manuais depois.

Atencao: a **expressao do documento** e obrigatoria. Ao aplicar a configuracao do documento ou salvar o layout, o sistema avisa se algum documento estiver sem expressao.

### 5.6 Paginas

No painel **Paginas**, use:

- **Adicionar pagina**: cria novo documento/pagina.
- **Duplicar pagina**: copia a pagina atual.
- **Remover pagina**: remove a pagina selecionada, quando permitido.

O documento principal nao deve ser removido.

Ao adicionar, duplicar ou renomear documento, informe tambem a **expressao do documento**. O botao **Editor de expressao** abre o editor auxiliar sem perder o modal de nome do documento; ao fechar o editor de expressao, o sistema retorna para o modal anterior.

### 5.7 Componentes

No painel **Componentes**, arraste itens da paleta principal para o canvas. Campos de entrada cadastrados tambem podem ser arrastados quando aparecem na area correspondente. Os tipos disponiveis ao usuario hoje incluem:

- **Texto**: texto fixo no layout.
- **Imagem**: imagem ou logo.
- **Saida**: campo calculado ou preenchido a partir de dados/funcoes.
- **Entrada**: campo cadastrado em **Campos de entrada** e arrastado a partir da lista de campos.
- **Barcode**: codigo de barras.
- **QRCode**: codigo 2D.
- **Fio/Linha/Retangulo**: elementos graficos disponiveis na paleta do editor.

Observacao: o parser e o estado interno ainda reconhecem estruturas legadas adicionais importadas de arquivos `.f`, mas elas nao devem ser apresentadas como componentes criaveis pelo usuario enquanto nao estiverem expostas na interface.

### 5.8 Selecionar e editar componente

1. Clique em um componente no canvas.
2. Ajuste posicao e tamanho pelo painel **Propriedades** ou diretamente no canvas.
3. Quando necessario, abra o modal especifico do componente.
4. Clique em **Salvar** ou **OK** dentro do modal.
5. Salve o layout.

### 5.9 Propriedades

O painel **Propriedades** exibe atributos do item selecionado, como:

- Posicao X/Y.
- Largura e altura.
- Rotacao.
- Aparencia, quando aplicavel.
- Parametros especificos do componente.

Para componentes de fio, tambem sao editaveis tipo, espessura e cor.

### 5.10 Camadas

O painel **Camadas** mostra os componentes da pagina. Use-o para localizar e selecionar elementos quando o canvas estiver cheio ou quando componentes estiverem sobrepostos.

### 5.11 Editar texto

Ao editar um campo de texto:

1. Abra o modal **Editar Texto**.
2. Digite ou ajuste o conteudo.
3. Use as opcoes de fonte, tamanho, cor, negrito, italico e alinhamento.
4. Para inserir um campo de saida dentro do texto, use o botao **Campo de saida** e monte a expressao no **Editor de expressao**.
5. Clique em **Salvar**.

Campos de saida podem ser inseridos como tokens no conteudo, preservando a referencia para dados do layout.

Comportamentos atuais do editor de texto:

- O campo de saida inserido no texto aparece como um token visual dentro do conteudo.
- As teclas de navegacao tratam o token como um elemento unico.
- `Backspace` e `Delete` removem o token inteiro.
- Um clique seleciona o token para edicao.
- Duplo clique no token abre o **Editor de expressao** com a expressao atual.
- O botao **Campo de saida** tambem abre o **Editor de expressao** para o token selecionado; se nao houver token selecionado, cria um novo no ponto do cursor.

### 5.12 Campo de saida

Use campo de saida para montar conteudo calculado ou baseado nos dados de entrada.

O editor possui um **Editor de expressao**, com apoio para:

- Campos de entrada.
- Funcoes do usuario.
- Funcoes matematicas.
- Constantes.
- Condicionais.
- Texto vazio.

Comportamentos atuais do componente **Saida**:

- A altura do componente acompanha o tamanho da fonte quando o tamanho da fonte for alterado no modal.
- Abrir e salvar o modal sem alterar o tamanho da fonte preserva a altura atual do componente.
- O conteudo do campo de saida e exibido em uma unica linha no documento.
- Quando o texto ultrapassa a largura do componente, o excedente e truncado visualmente no layout.
- No campo de saida inserido dentro de texto, o controle manual de largura maxima foi removido. A pre-visualizacao agora usa limite interno e reticencias quando o conteudo fica longo.

### 5.13 Arquivo de dados e campos de entrada

Nas configuracoes de dados, o usuario define como o arquivo de dados sera interpretado.

Fluxo recomendado:

1. Abra **Definicao do Arquivo de Dados**.
2. Configure delimitadores, tamanho fixo ou outras regras disponiveis na tela.
3. Abra **Configuracao do Registro de Entrada** quando precisar detalhar estrutura de registros.
4. Abra **Campos de Entrada** para criar, alterar ou excluir campos.
5. Relacione campos de entrada aos campos de saida ou expressoes.

### 5.14 Preview do layout

No editor, use **Pre-visualizar** para validar o layout com um arquivo de dados antes de gerar o PDF final.

Fluxo recomendado:

1. Salve o layout.
2. Configure o arquivo de dados no Ponto F ou selecione/envie um arquivo de dados no preview.
3. Abra **Pre-visualizar**.
4. Escolha um arquivo de dados salvo no projeto ou envie um arquivo temporario.
5. Gere a pre-visualizacao e confira o resultado.

O preview ajuda a conferir campos de entrada, expressoes, textos variaveis, imagens e quebras antes de usar a geracao final de PDF.

### 5.15 Imagens e assets do projeto

Clique no icone **Envios** na barra lateral ou use **Escolher dos envios** em componentes de imagem.

No painel de envios:

1. Clique em **Enviar arquivos**.
2. Selecione imagens, PDFs, dados, JSON, DLLs ou outros arquivos aceitos.
3. Use **Atualizar lista** para recarregar.
4. Use a busca para localizar arquivos.
5. Exclua arquivos que nao fazem mais parte do projeto.

Tipos aceitos no upload do editor:

- PNG, JPEG, GIF, BMP, WEBP.
- TXT, CSV, DAT, RET, REM, JSON.
- PDF.
- DLL.

### 5.16 Barcode e QR Code

Ao editar barcode ou QR Code:

1. Informe o conteudo ou expressao.
2. Configure orientacao: 0, 90, 180 ou 270 graus.
3. Ajuste posicao, largura e altura.
4. Para QR Code/codigos 2D, escolha o tipo: PDF417, Data Matrix ou QR Code.
5. Confirme em **OK**.

### 5.17 Funcoes do usuario e DLL

O editor possui areas para configurar funcoes do usuario, variaveis e DLL.

Use esse recurso quando o layout depende de funcoes legadas ou regras externas. A DLL pode ser enviada pelo proprio editor, ficando vinculada ao projeto.

### 5.18 Boas praticas no editor

- Salve o layout apos cada bloco de alteracoes.
- Organize componentes por paginas antes de criar muitas camadas.
- Use nomes claros para documentos e campos de entrada.
- Mantenha imagens e dados auxiliares no painel de envios do projeto.
- Valide o layout pelo processamento com um arquivo de dados real ou representativo.

## 6. Tela Processamento

Rota: `/processing`

Essa tela envia layouts e arquivos de dados para gerar PDFs, alem de acompanhar processos anteriores.

### 6.1 Criar novo processo

1. Clique em **Novo processo**.
2. Escolha a origem:
   - **Projeto salvo**: usa um projeto existente.
   - **Novo upload**: envia layout e recursos manualmente.
3. Informe o projeto ou envie o layout.
4. Informe o arquivo de dados.
5. Adicione recursos soltos ou ZIP de recursos, se necessario.
6. Revise a lista de arquivos.
7. Inicie o processamento.

### 6.2 Usar projeto salvo

Escolha **Projeto salvo** quando o layout ja esta salvo no Format Web.

1. Selecione o projeto.
2. Envie o arquivo de dados.
3. Envie recursos adicionais apenas se o processamento precisar deles.
4. Inicie o processo.

### 6.3 Usar novo upload

Escolha **Novo upload** quando voce quer processar arquivos sem criar ou abrir um projeto antes.

Opcoes:

- Enviar **Layout ZIP**.
- Enviar **Layout .f**.
- Enviar **Dados (TXT/CSV/DAT)**.
- Enviar **Recursos soltos ou ZIP de recursos**.

Se enviar ZIP, garanta que ele nao esteja corrompido e que contenha os arquivos esperados.

### 6.4 Acompanhar processos

A lista mostra:

- Arquivo de dados.
- Status.
- Data de criacao.
- Acoes disponiveis.

Status comuns:

| Status | Significado |
| --- | --- |
| `PROCESSING` | O processamento esta em andamento. |
| `COMPLETED` | O processamento terminou e pode ter PDFs disponiveis. |
| `FAILED` ou `ERROR` | O processamento falhou. Veja a mensagem exibida na linha. |

A tela atualiza processos em andamento automaticamente.

### 6.5 Filtros e paginacao

Use os filtros para localizar processos por:

- Status.
- Data inicial.
- Data final.

Use **Limpar filtros** para voltar a lista completa. Quando houver muitas entradas, use **Anterior** e **Proxima**.

### 6.6 Ver PDFs gerados e preview

Quando o processo estiver concluido:

1. Clique em **Ver PDFs**.
2. Selecione um PDF na lista.
3. Visualize no painel de preview.
4. Use a acao de download quando precisar salvar o arquivo gerado.

O preview do PDF usa o endpoint de visualizacao para abrir o arquivo em modo `inline`, sem forcar download imediato. O download continua disponivel pela acao correspondente.

### 6.7 Reprocessar

Quando um processo falhar:

1. Clique em **Reprocessar**.
2. Confirme a acao.
3. Acompanhe o novo status na lista.

Tambem e possivel atualizar arquivos de um processo antes de reprocessar, quando a tela exibir essa opcao.

### 6.8 Excluir processo

1. Clique em **Excluir**.
2. Confirme a exclusao.

Atencao: essa acao remove o processo e os PDFs associados.

## 7. Editor IDE

Rota: `/project/editor-ide`

Essa tela e um prototipo visual de uma experiencia de editor em estilo IDE. Ela mostra:

- Painel de acoes.
- Lista de componentes.
- Lista de camadas.
- Abas de documentos.
- Painel de propriedades.
- Painel de uploads.
- Canvas central.

Como a tela e um mock/prototipo, use-a como referencia de interface, nao como fluxo principal de producao, a menos que o desenvolvimento confirme sua ativacao.

## 8. Relacao com Back-end

As telas consomem principalmente o `format-web`, que por sua vez pode chamar a `format-api`.

Principais APIs usadas pelas telas:

| Area | Endpoint | Finalidade |
| --- | --- | --- |
| App | `/api/app/config` | Carrega CSRF e configuracao de SSO. |
| App | `/api/app/me` | Busca usuario logado. |
| Auth | `/api/auth/register` | Cadastra conta local. |
| Projetos | `/api/list-projects` | Lista projetos. |
| Projetos | `/api/create-project` | Cria projeto. |
| Projetos | `/api/import-project` | Importa projeto legado. |
| Projetos | `/api/preview-layout` | Visualiza layout antes da importacao. |
| Projetos | `/api/download-project` | Baixa ZIP do projeto. |
| Projetos | `/api/rename-project` | Renomeia projeto. |
| Projetos | `/api/delete-project` | Exclui projeto. |
| Layout | `/api/save-layout` | Salva layout. |
| Layout | `/api/load-layout` | Carrega layout salvo. |
| Layout | `/api/layout-versions` | Lista versoes do layout. |
| Layout | `/api/rollback-layout` | Restaura versao anterior. |
| Assets | `/api/project-assets` | Lista arquivos do projeto. |
| Assets | `/api/upload-project-asset` | Envia arquivo do projeto. |
| Assets | `/api/project-asset` | Busca ou exclui arquivo do projeto. |
| Processamento | `/api/process-format` | Inicia processamento via Format API com upload manual. |
| Processamento | `/api/process-project/{projectId}` | Gera PDF diretamente a partir de projeto salvo. |
| Processamento | `/api/format/processes` | Lista processos. |
| Processamento | `/api/format/process/{id}/pdfs` | Lista PDFs de um processo. |
| Processamento | `/api/format/download/{id}` | Baixa PDF gerado. |
| Processamento | `/api/format/preview/{id}` | Visualiza PDF gerado. |
| Processamento | `/api/format/process/{id}/retry` | Reprocessa. |
| Processamento | `/api/format/process/{id}` | Exclui processo. |

## 9. Erros e Solucoes Rapidas

| Situacao | O que fazer |
| --- | --- |
| Login expirou | Clique em **Fazer login** e entre novamente. |
| ZIP nao foi lido | Verifique se o ZIP nao esta corrompido e se contem um `.f`. |
| Projeto nao aparece | Atualize a tela ou confirme se esta logado com o usuario correto. |
| Imagem nao aparece no layout | Confirme se o asset foi enviado para o projeto e se o componente aponta para o arquivo correto. |
| Processo falhou | Leia a mensagem na linha do processo, ajuste layout/dados/recursos e use **Reprocessar**. |
| PDF nao apareceu | Confirme se o status esta `COMPLETED`; se estiver `FAILED`, reprocessar apos corrigir arquivos. |
| Erro de funcao/DLL ausente | Confira a mensagem retornada pela Format API, ajuste funcoes do usuario/DLL ou remova chamadas inexistentes no layout. |
| Geracao direta nao inicia | Verifique se o projeto possui layout salvo e arquivo de dados compatavel com o nome configurado no Ponto F. |


## 10. Recursos Desenvolvidos no Estado Atual

Esta secao complementa o manual apenas com funcionalidades conferidas no codigo atual do `frontend` e do `format-web`. Recursos existentes apenas como estrutura legada ou parse interno nao sao tratados aqui como fluxo de usuario.

### 10.1 Configuracao do formulario/papel

No editor, o usuario pode abrir **Configurar formulario** pela barra superior ou pelo painel **Acoes**.

A tela permite ajustar:

- Tipo de papel: Carta, Oficio, A4, A3 ou personalizado.
- Largura e altura.
- Unidade: pixels ou milimetros.
- Rotacao da pagina: retrato, paisagem, retrato invertido ou paisagem invertida.
- Modo de impressao: simples, duplex eixo horizontal ou duplex eixo vertical.
- Dimensoes do documento: largura, altura, margens superior/esquerda, espaco horizontal/vertical entre documentos e opcao para nao usar margens do driver da impressora.

### 10.2 Arquivo de dados e configuracao de registro

No painel **Acoes**, o usuario pode abrir **Arquivo de dados**.

A tela atual possui:

- Tamanho do Registro.
- Opcao **Usa cabecalho**.
- Tamanho do cabecalho.
- Nome do arquivo.
- Botao **Procurar** para selecionar arquivo.
- Opcao **Pedir Nome Arq. na Impressao**.
- Botao **Configurar Reg >>**, que abre a configuracao do registro de entrada.

Na configuracao do registro de entrada, existem opcoes para tamanho fixo, tamanho variavel com delimitador, delimitador de campo, delimitador de registro, limite por quantidade de campos, numero de campos no registro mestre e numero de campos no registro detalhe.

### 10.3 Campos de entrada

No painel **Acoes**, o usuario pode abrir **Campos de entrada**.

A tela exibe uma tabela com grupo, nome, posicao, tamanho e indice. As acoes visiveis sao:

- Navegar entre registros: primeiro, anterior, proximo e ultimo.
- **Novo**.
- **Alterar**.
- **Copiar**.
- **Colar**.
- **Excluir**.
- **Fechar**.

### 10.4 Funcoes, variaveis e DLL

No painel **Acoes**, existem telas para **Funcoes do usuario** e **Variaveis do usuario**.

O desenvolvimento atual tambem possui endpoints para:

- Carregar a DLL padrao de funcoes do usuario: `/api/default-user-function-dll`.
- Enviar uma DLL do projeto: `/api/upload-user-function-dll`.

No editor de expressao, as funcoes configuradas podem aparecer junto de funcoes comuns como `LTRIM`, `RTRIM`, `TRIM`, `UPPER` e `LOWER`, operadores, constantes e modelos condicionais.

### 10.5 Imagens, logos e assets

O editor possui painel **Envios** para listar, buscar, enviar e excluir assets do projeto usando:

- `/api/project-assets`.
- `/api/upload-project-asset`.
- `/api/project-asset`.

Para imagem/logo, o desenvolvimento atual tambem possui envio especifico em `/api/upload-logo`. Esse envio salva a imagem em `logos/{logoId}/{nome-do-arquivo}` e retorna a ocorrencia com o nome do arquivo entre aspas.

Uploads comuns do painel de envios sao salvos em `uploads/{nome-do-arquivo}`.

Atualizacao de 17/08/2026: logotipos legados dentro de textos passaram por ajustes de compatibilidade. Ao importar ou editar arquivos antigos, o sistema tenta reconhecer melhor referencias antigas de logo, preservando a ocorrencia correta e evitando gravar a letra `L` como se fosse o nome da imagem.

### 10.6 Linhas e retangulos

A paleta atual do editor permite criar:

- Linha horizontal.
- Linha vertical.
- Retangulo.

Ao selecionar esse tipo de componente, o painel **Propriedades** permite ajustar tipo, espessura, cor, posicao e tamanho.

O controlador tambem reconhece elipse em estruturas internas/importadas, mas a paleta visivel do editor nao apresenta elipse como item separado no estado atual.

### 10.7 Download ZIP do projeto

Na tela **Meus Projetos**, o botao de download chama `/api/download-project`.

O backend monta um ZIP com:

- A ultima versao do layout `.f`.
- Assets do projeto dentro da pasta `assets/` do ZIP.

### 10.8 Geracao direta de PDF pelo dashboard

A tela **Meus Projetos** possui acao de geracao de PDF no card do projeto. Esse fluxo evita abrir a tela **Processamento** quando o projeto ja possui layout e arquivo de dados salvos.

A integracao passa pelo `format-web`, que prepara o ZIP do layout com assets, identifica o arquivo de dados informado no Ponto F e encaminha tudo para a `format-api`. Durante a execucao, o card exibe progresso e bloqueia nova solicitacao para o mesmo projeto.

Ao finalizar com sucesso, o frontend consulta os PDFs do processo e baixa automaticamente o arquivo quando a resposta contem um unico PDF. Em caso de erro, o frontend mostra a mensagem atual do processo retornada pela `format-api`.

### 10.9 Preview e visualizacao de PDF

O sistema possui dois tipos de preview relacionados ao processamento:

- Preview de layout no editor/importacao, usado para validar o layout antes de salvar ou processar.
- Preview de PDF gerado, usado para visualizar o PDF concluido sem baixar imediatamente.

Para PDFs gerados, o endpoint `/api/format/preview/{id}` retorna o arquivo em modo de visualizacao. O endpoint `/api/format/download/{id}` continua sendo usado para baixar o arquivo.

### 10.10 Compatibilidade com arquivos `.f` legados

O sistema importa arquivos `.f` usando o parser legado e converte o resultado para JSON para exibicao no editor. Como o formato `.f` e binario e pode carregar estruturas que ainda nao possuem tela completa no Format Web, valide sempre o ciclo:

1. Importar ou abrir o projeto.
2. Conferir visualmente o layout.
3. Salvar.
4. Baixar o ZIP.
5. Reabrir no ambiente que sera usado para validar compatibilidade.

## 11. Alteracoes de 17/08/2026

As ultimas alteracoes conferidas no Git em 17/08/2026 adicionaram ou ajustaram estes comportamentos de usuario:

### 11.1 Expressao obrigatoria por documento

Todo documento agora precisa ter uma expressao.

Isso afeta:

- Criacao de projeto no dashboard.
- Adicao, duplicacao e renomeacao de documentos no editor.
- Configuracao do documento.
- Salvamento do layout.
- Importacao/conversao de `.f` para JSON e gravacao de volta para `.f`.

Mensagens esperadas:

- **Todos os documentos precisam ter expressao.**
- **Informe a expressao do documento.**
- **O documento [nome] precisa ter uma expressao.**

### 11.2 Editor de expressao na criacao e edicao de documentos

O dashboard agora possui botao **Editor** ao lado da expressao de cada documento criado.

No editor de layout, os modais de configuracao/nome de documento tambem possuem botao **Editor de expressao**.

O editor auxiliar oferece atalhos para:

- Funcoes: `LTRIM`, `RTRIM`, `TRIM`, `UPPER`, `LOWER`.
- Operadores: soma, subtracao, multiplicacao, divisao e concatenacao.
- Condicionais: `IF` e `IF + ELSE`.
- Constantes simples: texto vazio `""` e zero `0`.

### 11.3 Administrador ve projetos de todos os usuarios

Usuarios com role **ADMIN** conseguem listar e acessar projetos de todos os usuarios. A tela muda o titulo para **Projetos** e exibe o dono do projeto no card.

Usuarios sem role ADMIN continuam restritos aos proprios projetos.

### 11.4 Campo de saida dentro do texto

O controle **Largura maxima** foi removido do modal de campo de saida dentro do texto.

Na pratica:

- O usuario continua configurando expressao, fonte, tamanho, cor e alinhamento.
- A pre-visualizacao do token usa limite interno.
- Conteudos longos aparecem truncados visualmente com reticencias.

### 11.5 Logotipos legados em textos

Foram aplicadas correcoes para logotipos legados usados dentro de campos de texto.

Ao trabalhar com layouts importados:

- Referencias antigas de logo sao normalizadas com mais cuidado.
- O sistema tenta preservar o nome/ocorrencia real da imagem.
- O salvamento evita gravar comando de logo com ocorrencia incorreta.

## 12. Alteracoes de 22/08/2026

As alteracoes de 22/08/2026 documentam os novos fluxos de preview e geracao de PDF integrados ao projeto salvo.

### 12.1 Geracao de PDF sem sair do dashboard

O usuario pode clicar no icone de PDF no card do projeto para iniciar o processamento diretamente. O card mostra progresso, bloqueia cliques repetidos enquanto processa e baixa o PDF ao concluir quando houver um unico arquivo gerado.

### 12.2 Uso automatico do arquivo de dados configurado

Ao processar projeto salvo, o backend tenta localizar o arquivo de dados informado no Ponto F entre os assets do projeto. Isso reduz a chance de enviar dados incorretos para a `format-api`.

### 12.3 Mensagem de erro do processo atual

Quando a Format API falha, a mensagem exibida ao usuario vem do processo atual. O diagnostico completo continua preservado para analise tecnica.

### 12.4 Preview de PDF gerado

A documentacao agora diferencia download de PDF e preview inline do PDF gerado.

## 13. Como Atualizar Este Manual

Sempre que uma tela mudar:

1. Atualize a secao correspondente neste arquivo.
2. Registre novas rotas, botoes, campos e mensagens.
3. Inclua o passo a passo do fluxo novo ou alterado.
4. Se necessario, atualize tambem `docs/manual-usuario-format-web.html`.
5. Use a data da atualizacao no topo ou em um historico abaixo.

### Historico

| Data | Alteracao |
| --- | --- |
| 12/08/2026 | Versao inicial criada a partir da estrutura atual do `frontend`, `format-web` e `format-api`. |
| 12/08/2026 | Corrigida a secao de recursos recentes para refletir somente telas, componentes e endpoints conferidos no desenvolvimento atual. |
| 17/08/2026 | Incluidas mudancas do Git de hoje: expressao obrigatoria por documento, editor de expressao em criacao/edicao de documentos, visao ADMIN, ajuste de campo de saida em texto e compatibilidade de logotipos legados. |
| 22/08/2026 | Documentados preview do layout/PDF, geracao direta de PDF pelo dashboard, uso automatico do arquivo de dados do Ponto F e mensagens de erro do processo atual. |
