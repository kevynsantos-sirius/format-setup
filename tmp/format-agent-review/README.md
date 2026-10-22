# Atualizacao de memoria e diagnostico - 20/10/2026

A consulta agora usa indices revisados e pode receber o arquivo/draft atual para executar diagnosticos pelas APIs do Format. Ver [DIAGNOSTICO_PONTO_F.md](DIAGNOSTICO_PONTO_F.md) e [REVISAO_2026_10_20.md](REVISAO_2026_10_20.md). O restante deste documento contem o historico do MVP.

# Consulta local sobre Ponto F com Ollama

Este MVP usa o Ollama local somente para tirar duvidas sobre o Ponto F. Ele nao modifica arquivos, nao altera banco e nao gera Ponto F final.

## Modelo local

O modelo leve encontrado nesta maquina foi:

```powershell
qwen2.5-coder:1.5b
```

O Ollama instalado respondeu com:

```powershell
ollama version is 0.34.3
```


## Ollama unico

O `format-llm` esta configurado para usar um unico Ollama local, compartilhado pela maquina:

```text
http://localhost:11434
```

A configuracao fica em:

```text
config/ollama.json
```

Ela define o modelo, URL, modo atual e se a IA pode ou nao modificar arquivos. Nesta fase:

```json
{
  "mode": "consulta",
  "allowMutations": false
}
```

Para verificar a conexao:

```powershell
.\scripts\verificar-ollama.ps1
```

Esse desenho evita instalar ou duplicar Ollama dentro de `format-web`, `frontend` ou `format-local`. Todos devem apontar para o mesmo servico local quando precisarem da IA.

## Perfil leve para nao travar o computador

A configuracao atual usa perfil `eco` em `config/ollama.json`:

```json
{
  "performanceProfile": "eco",
  "options": {
    "num_ctx": 2048,
    "num_predict": 220,
    "num_thread": 2
  }
}
```

Esse perfil reduz contexto, tamanho de resposta e quantidade de threads usadas pelo modelo. A resposta pode ficar menos profunda, mas tende a pesar menos no computador.

Se ainda travar, use perguntas menores e evite rodar varias consultas em paralelo. O proximo plano B e instalar um modelo ainda menor, como uma variante de 0.5B/1B, ou usar uma API externa gratuita/limitada apenas para consulta.


## Deixar o Ollama ativo

Sim, e possivel deixar o Ollama rodando fixo. Abra um terminal em `C:\workspace\format\format-agent` e execute:

```bat
scripts\ollama-ativo.bat
```

Esse terminal fica dedicado ao Ollama. Para encerrar, pressione `Ctrl+C` ou, em outro terminal, execute:`r`n`r`n```bat`r`nscripts\ollama-parar.bat`r`n```

Em outro terminal, voce pode perguntar normalmente:

```bat
scripts\perguntar-format-usuario.bat "O que e um Ponto F?"
```

Para conversar em loop, sem repetir o comando inteiro a cada pergunta, use:

```bat
scripts\chat-format.bat
```

Dentro dele, digite a pergunta e pressione Enter. Para sair, digite `sair`.

Modo tecnico/desenvolvedor no chat:

```bat
scripts\chat-format.bat -Modo dev
```

Observacao: `ollama run <modelo>` tambem abre um chat direto do Ollama no mesmo terminal, mas ele nao usa automaticamente o contexto filtrado do Format/Ponto F. Para usar nosso conhecimento indexado, prefira `chat-format.bat` ou `perguntar-format-usuario.bat`.


### Descarregar modelo sem fechar o app

Se o `ollama-parar.bat` encerrar temporariamente e o Ollama voltar sozinho, provavelmente o app do Ollama esta ativo em segundo plano/tray do Windows.

Para reduzir o peso na maquina sem fechar o app, descarregue apenas o modelo:

```bat
scripts\ollama-descarregar-modelo.bat
```

Para fechar de verdade quando ele insiste em voltar, feche tambem o icone do Ollama perto do relogio do Windows, ou desative a inicializacao automatica do Ollama nos aplicativos de inicializacao.
## Execucao no Windows

Se o PowerShell bloquear arquivos `.ps1` por politica de execucao, use os wrappers `.bat`:

```bat
scripts\verificar-ollama.bat
scripts\indexar-contexto.bat
scripts\perguntar-ponto-f.bat "Como o Ponto F e salvo no format-web?"
```

Os `.bat` chamam o PowerShell com `-ExecutionPolicy Bypass` apenas para aquela execucao, sem alterar a politica global do Windows.
## Como usar

Na pasta `C:\workspace\format\format-agent`:

```powershell
.\scripts\indexar-contexto.ps1
```

Depois pergunte:

```powershell
.\scripts\perguntar-ponto-f.ps1 "Como o Ponto F e salvo no format-web?" -MostrarContexto
```

Outro exemplo:

```powershell
.\scripts\perguntar-ponto-f.ps1 "Quais arquivos convertem entre JSON e Ponto F?"
```

## Fontes indexadas

Configuradas em `config/context-sources.json`:

- `C:\workspace\format-local\format\format-web`
- `C:\workspace\format-local\format\format-web\src\main\frontend`
- `C:\workspace\frontend`
- `C:\workspace\format-local\format`
- `C:\workspace\format\format-agent\knowledge`

A base manual inicial fica em:

```text
knowledge/PONTO_F_BASE.md
```

Ela ajuda o modelo pequeno a responder com menos alucinacao e deve ser refinada conforme entendermos melhor o codigo real.


## Conhecimento visual

A base agora tambem inclui uma camada visual/operacional da interface em:

```text
knowledge/PONTO_F_UI.md
```

Ela resume rotas, telas, areas do editor, componentes da paleta, fluxo de salvar layout, overlay, formulario, assets, preview e endpoints associados. Isso ajuda a IA a entender o que o usuario faria pela interface antes de traduzirmos essas acoes para JSON e, futuramente, para Ponto F.

Exemplo:

```powershell
.\scripts\perguntar-ponto-f.ps1 "No editor visual, quais areas da tela o usuario usa para montar um Ponto F?"
```

### Frontend real do format-local

Tambem foi adicionada uma base especifica para o frontend real encontrado em:

```text
C:\workspace\format-local\format\frontend
```

Resumo criado em:

```text
knowledge/PONTO_F_FRONTEND_REAL.md
```

Esse frontend e Vite/React e contem `EditorPage.jsx`, `DashboardPage.jsx`, `ProcessingPage.jsx`, `IdeMockPage.jsx` e o controlador grande `src/editor/editorController.js`. O controlador nao e indexado inteiro por tamanho; a base resume seus pontos principais.

## Modos de consulta

Existem dois modos separados.

### Modo desenvolvedor

Use quando quiser entender codigo, backend, frontend, conversores e detalhes internos:

```bat
scripts\indexar-contexto.bat
scripts\perguntar-ponto-f.bat "Onde fica a conversao do Ponto F?"
```

Esse modo pode mencionar arquivos, classes, endpoints e implementacao.

### Modo usuario final

Use quando a resposta deve ser filtrada para quem usa o Format, sem detalhes internos de codigo:

```bat
scripts\indexar-contexto-usuario.bat
scripts\perguntar-format-usuario.bat "Como adiciono um campo de saida?"
```

Esse modo fala em termos de tela, projeto, documento, pagina, canvas, componente, campo, expressao, validacao e preview. Ele nao deve mencionar classes, endpoints, arquivos fonte, JSON interno ou banco de dados.

No dia a dia do usuario final, normalmente basta:

```bat
scripts\perguntar-format-usuario.bat "Sua pergunta aqui"
```

Reindexe o modo usuario final apenas quando alterar os arquivos em `knowledge/usuario`.
Alias recomendado para integracao futura no Format Web:

```bat
scripts\perguntar-format-usuario.bat "Quero mudar a cor do titulo para azul"
```

O nome antigo `perguntar-ponto-f-usuario.bat` continua funcionando, mas o comando `perguntar-format-usuario.bat` representa melhor a experiencia esperada do usuario final.

## Conhecimento legado tecnico

O modo desenvolvedor tambem inclui conhecimento legado de `C:\workspace\format-local\format`.

Incluido no indice tecnico:

- arquivos C/H como `Form_tf1.c`, `FORMSYM.C`, `Defines.h`, `ObjFPS_Old.h` e `Typedefs.h`;
- manual atual em `docs/manual-usuario-format-web.md`;
- ajuda desktop `Formpor.chm`, extraida para `legacy-help/Formpor` e indexada como HTML;
- nota tecnica `knowledge/PONTO_F_LEGADO_TECNICO.md`.

Esse conteudo e para o modo desenvolvedor. Ele ajuda a reconhecer conceitos, nomes, tipos e comportamentos legados do Format/Ponto F. Para usuario final, esse material deve ser destilado antes, sem expor codigo, arquivos ou detalhes internos.

## Drafts de Ponto F

A pasta `draft/` e a area local temporaria para arquivos `.f`, pedidos, planos e saidas de teste. Ela e ignorada pelo Git.

Preparar a pasta:

```bat
scripts\preparar-draft.bat
```

Criar uma sessao vazia:

```bat
scripts\novo-draft.bat -Nome "carta-simples" -Pedido "Criar uma carta simples com logo, destinatario, data, corpo e assinatura"
```

Criar uma sessao a partir de um `.f` existente:

```bat
scripts\novo-draft.bat -Nome "ajuste-cor-titulo" -ArquivoF "C:\caminho\arquivo.f" -Pedido "Mudar a cor do titulo para azul"
```

A documentacao completa fica em `DRAFT_PONTO_F.md`.

Nesta fase, o draft ainda nao edita `.f` automaticamente. Ele organiza entrada, pedido, planos e saidas temporarias para o futuro fluxo com schema, validacao e dry-run.
## Limite atual

Esta versao e propositalmente somente leitura. A IA responde com base nos arquivos indexados, mas nao pode modificar JSON, `.f`, banco ou codigo.

A proxima etapa sera criar o JSON canonico e o plano de alteracao, ainda em modo `dry-run`.

## Resultado do primeiro teste valido

Pergunta:

```text
Como o Ponto F e salvo no format-web?
```

Resposta obtida:

```text
O Ponto F e salvo no formato legado `.f` no `format-web` do sistema Format. Ele e gerado a partir da representacao JSON/DTO do layout no frontend/editor e persistido no arquivo `.f` usando o gravador legado `PontoFGravar`.
```

Evidencias usadas pelo modelo:

- `PontoFTojson.java`
- `LayoutApiController.java`
- `ANALISE_FLUXO_SALVAMENTO.md`
- `RESUMO_IMPLEMENTACAO_COMPATIBILIDADE.md`















## API local do Format LLM

A primeira API local fica documentada em `API_FORMAT_LLM.md`.

Subir:

```bat
scripts\api-format-llm.bat
```

Parar:

```bat
scripts\api-format-llm-parar.bat
```

Swagger local:

`	ext
http://127.0.0.1:3217/docs
` 

Rotas principais:

- `GET /health`
- `POST /api/perguntar`
- `POST /api/pontof/criar`
- `POST /api/pontof/editar`

