# Base visual e operacional do Format Web para Ponto F

Esta base descreve a interface do Format Web do ponto de vista do usuario. Ela complementa a base tecnica do Ponto F para que a IA entenda nao apenas o codigo, mas tambem as acoes que o usuario faria pela tela.

Status atual: conhecimento somente para consulta. A IA nao pode modificar layout, JSON, arquivo `.f`, banco ou codigo.

## Rotas visuais principais

As rotas principais aparecem no manual do usuario e no `HomeController`.

- `/dashboard`: gestao de projetos. Permite criar, importar, abrir, baixar, renomear, excluir e gerar PDF direto pelo card do projeto.
- `/project/editor`: editor visual de layouts. E a tela principal para montar e manter layouts/Ponto F.
- `/processing`: tela de processamento para gerar PDFs, enviar dados e acompanhar execucoes.
- `/login` e `/register`: acesso local, SSO e cadastro.
- `/project/editor-ide`: prototipo visual em estilo IDE; deve ser tratado como referencia ate o desenvolvimento confirmar uso como fluxo principal.

Evidencias:

- `C:\workspace\format-local\format\format-web\src\main\resources\manual\manual-usuario-format-web.html`
- `C:\workspace\format-local\format\format-web\src\main\java\com\totaldocs\format\web\controller\HomeController.java`

## Dashboard / Meus Projetos

Na tela `/dashboard`, o usuario administra projetos.

Acoes descritas:

- Criar projeto.
- Importar layout legado `.f` ou ZIP contendo `.f`.
- Visualizar importacao para conferir paginas e componentes.
- Importar e abrir projeto.
- Abrir projeto no editor.
- Baixar ZIP do projeto.
- Gerar PDF direto pelo card.
- Renomear projeto.
- Excluir projeto apos confirmacao.

Ao criar projeto, o usuario informa:

- nome do projeto;
- quantidade de documentos;
- nomes dos documentos;
- expressao do documento para cada documento.

A expressao do documento e obrigatoria. A tela oferece botao `Editor` para abrir o editor auxiliar de expressao quando necessario.

Para gerar PDF direto pelo card, o sistema usa o layout salvo e tenta localizar o arquivo de dados informado no Ponto F. O card mostra progresso e baixa automaticamente quando houver um unico PDF gerado.

## Editor visual de layouts

A rota principal e `/project/editor`.

Areas principais da tela:

- Barra superior: salvar, zoom e atalhos.
- Canvas: area visual onde componentes sao posicionados.
- Painel esquerdo: acoes, documento, entrada e dados.
- Painel direito: propriedades, componentes, camadas e paginas.
- Envios: upload, busca e exclusao de arquivos/assets do projeto.

Fluxo recomendado na interface:

1. Configurar documento, paginas, expressao do documento e arquivo de dados.
2. Enviar assets necessarios no painel `Envios`.
3. Arrastar componentes para o canvas.
4. Selecionar cada componente e ajustar propriedades.
5. Configurar textos, campos de saida, imagens, barcode e QR Code nos modais especificos.
6. Clicar em `Salvar layout`.
7. Testar o layout na tela de processamento com dados reais ou representativos.

## Componentes da paleta

Componentes visiveis ou descritos na paleta principal:

- Texto.
- Imagem.
- Saida.
- Entrada cadastrada.
- Barcode.
- QR Code.
- Fio.
- Linha horizontal.
- Linha vertical.
- Retangulo.

Regra importante: estruturas legadas reconhecidas apenas pelo parser ou pelo estado interno nao devem ser tratadas como componentes criaveis pelo usuario enquanto nao aparecerem na paleta do editor.

Elipse pode existir em estruturas internas/importadas, mas nao aparece como item separado na paleta atual segundo o manual.

## Edicao de texto

O usuario abre o modal `Editar Texto`.

Abas e ajustes conhecidos:

- Campo: posicao, tamanho, unidade, orientacao e borda.
- Opcoes: alinhamento, espaco entre linhas, expressao de ocorrencia e fonte condicional.
- Conteudo: texto, fonte, tamanho, estilo e cor em trechos selecionados.

Acoes especiais:

- Inserir logo dentro do texto.
- Inserir campo de saida dentro do texto.
- Inserir fio dentro do texto.
- Campos de saida dentro de texto aparecem como tokens visuais.
- Clique seleciona token; duplo clique edita token.
- `Backspace` e `Delete` removem o token inteiro.

Unidades aceitas no editor de texto:

- pixels;
- milimetros;
- centimetros;
- polegadas.

Orientacao aceita:

- 0 graus;
- 90 graus;
- 180 graus;
- 270 graus;
- angulo personalizado.

## Campo de saida

O componente `Saida` e usado para conteudo calculado ou baseado em dados de entrada.

O modal `Editar Campo de Saida` e dividido em abas:

- Campo: posicao, tamanho, unidade, orientacao e expressao de ocorrencia.
- Fonte: fonte, estilo, tamanho, alinhamento, CPI, cor, mascara, fonte condicional e LF automatico.
- Opcoes: indice, justificacao, uso de fonte, MICR, troca de fonte, chave de recuperacao e campo protegido.
- Conteudo: expressao do campo com acesso ao editor de expressao.

O editor de expressao oferece campos de entrada, funcoes, constantes, condicionais e texto vazio.

## Overlay global

O editor possui `Configurar overlay`, normalmente no painel esquerdo ou painel de acoes.

Serve para definir imagem global de fundo ou marca d'agua.

Configuracoes descritas:

- Escopo: Pagina, Documento ou Nao.
- Ocorrencia: expressao condicional, por exemplo `IF ( _ContRep =  2 )`.
- Dimensoes: DPI, largura, altura, deslocamento horizontal e vertical.
- Imagem: arquivo selecionado em `Procurar >>`.

O overlay e renderizado antes dos demais componentes, ficando atras do conteudo do documento. O salvamento preserva dados do `.f` e metadados do Format Web para manter DPI, tamanho, posicao, arquivo e ocorrencia ao recarregar.

## Configurar formulario / papel

O editor abre `Configurar formulario` pela barra superior ou pelo painel `Acoes`.

Opcoes descritas:

- Papel: Carta, Oficio, A4, A3 ou personalizado.
- Unidade: pixels ou milimetros.
- Rotacao: retrato, paisagem e opcoes invertidas.
- Impressao: simples, duplex eixo horizontal ou duplex eixo vertical.

## Arquivo de dados e registro

A tela possui configuracoes para:

- tamanho do registro;
- uso e tamanho de cabecalho;
- nome do arquivo;
- procurar arquivo;
- pedir o nome do arquivo na impressao.

Configuracao de registro:

- tamanho fixo;
- tamanho variavel com delimitador;
- delimitadores;
- limite por quantidade de campos;
- contagem de campos mestre/detalhe.

## Campos de entrada

A tela de campos de entrada mostra:

- grupo;
- nome;
- posicao;
- tamanho;
- indice.

Acoes visiveis:

- navegar entre registros;
- novo;
- alterar;
- copiar;
- colar;
- excluir;
- fechar.

Campos de entrada cadastrados tambem podem ser arrastados quando aparecem na area correspondente do editor.

## Assets, imagens e logos

O painel `Envios` lista, busca, envia e exclui assets do projeto.

Uploads comuns ficam em:

```text
uploads/{nome-do-arquivo}
```

O envio especifico de logo usa:

```text
/api/upload-logo
```

E salva em:

```text
logos/{logoId}/{nome-do-arquivo}
```

O download ZIP do projeto inclui a ultima versao do `.f` e assets dentro da pasta `assets/`.

## Preview do layout

Fluxo descrito:

1. Salvar o layout.
2. Configurar o arquivo de dados no Ponto F ou selecionar um arquivo no preview.
3. Abrir `Pre-visualizar`.
4. Conferir campos, expressoes, textos variaveis, imagens e quebras antes da geracao final.

O sistema diferencia preview de layout e preview de PDF gerado.

## Processamento

A rota `/processing` gera PDFs e acompanha execucoes.

Tambem existe geracao direta pelo dashboard, em que o card do projeto chama o backend sem abrir a tela de processamento.

## Endpoints associados a interface

Segundo o manual, os principais endpoints consumidos pela interface sao:

- App/Auth: `/api/app/config`, `/api/app/me`, `/api/auth/register`.
- Projetos: `/api/list-projects`, `/api/create-project`, `/api/import-project`, `/api/download-project`.
- Layout: `/api/save-layout`, `/api/load-layout`, `/api/layout-versions`, `/api/rollback-layout`.
- Assets: `/api/project-assets`, `/api/upload-project-asset`, `/api/project-asset`.
- Processamento: `/api/process-format`, `/api/process-project/{projectId}`, `/api/format/processes`, `/api/format/download/{id}`, `/api/format/preview/{id}`.

## Relacao entre interface e Ponto F

A interface manipula visualmente documentos, paginas, componentes, propriedades, assets, arquivo de dados, campos de entrada, expressoes e overlay.

Quando o usuario clica em `Salvar layout`, a intencao visual e persistir esse estado no formato legado `.f` por meio do fluxo backend de layout/Ponto F.

Para a futura operadora inteligente, o mapeamento deve ser:

- acao visual do usuario;
- propriedade/estrutura JSON equivalente;
- validacao deterministica;
- geracao ou atualizacao do `.f`;
- preview/diff antes de aplicar.

Exemplo conceitual:

- Usuario na interface: arrasta componente `Texto` para o canvas e ajusta posicao/tamanho/conteudo.
- Futuro agente: cria ou altera um item de componente no JSON canonico com tipo `texto`, posicao, tamanho, conteudo e propriedades tipograficas.
- Backend/validador: confirma se o componente e permitido e se os campos batem com o schema.
- Gerador: converte JSON para Ponto F usando o fluxo existente.

## Limites atuais do conhecimento visual

Esta base foi criada a partir do manual HTML e de rotas/backend encontrados no projeto. Ela ainda nao substitui uma inspecao visual real da tela rodando.

Ainda falta para uma fase mais forte:

- rodar o frontend e capturar screenshots reais;
- mapear DOM real dos botoes e paineis;
- mapear payloads reais enviados por `/api/save-layout` e `/api/load-layout`;
- registrar exemplos de antes/depois para cada acao visual;
- criar testes ou fixtures de Ponto F para comparar resultado.
