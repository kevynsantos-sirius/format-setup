# Contratos de API verificados no codigo em 20/10/2026

## Agente: resposta ancorada e edicao revisavel - 21/10/2026

POST /api/perguntar usa fatos atomicos indexados com hash e proveniencia; o modelo leve ordena IDs permitidos, sem publicar prosa livre ou comandos. Falha, truncamento, ID desconhecido ou selecao incompleta usa fallback explicito da memoria. Fora da cobertura, extratos relacionados nao viram resposta tecnica confirmada. Diagnostico atual e resultados de APIs sao renderizados separadamente pelo codigo.

POST /api/pontof/planejar-edicao recebe exatamente uma origem (layout atual, arquivo ou projectId), snapshotSha256 e alteracoes com targetId, documentIndex, property, before e after. Aceita de 1 a 100 campos escalares em varios itens/documentos e filhos de banda. Cada diff informa documento, tipo, banda, rotulo, coordenadas, propriedade e valores. Campos nao suportados, valor anterior divergente, alvo de outra versao e novos problemas estruturais conhecidos sao recusados.

POST /api/pontof/editar (alias /api/pontof/aplicar-plano) exige plano com planId e a mesma origem atual. Recalcula o plano e aplica somente ao draft JSON retornado; nao grava projeto nem gera binario .f. O contrato anterior de editar automaticamente o primeiro texto/fio foi removido; pedidos sem plano retornam 409. Visual, expressoes nativas, recursos, paginas e gravacao/releitura binaria continuam pendentes quando nao executados. O JSON editado precisa ser revisado no editor antes da persistencia pelos endpoints do Format Web.

## Inspecao sem criar projeto

Format Web POST /api/preview-layout: multipart layoutFile (.f). Retorna envelope success, data.layout com listaDocumentos e configuracoes. Faz parse; NAO gera PDF nem avalia todos os campos com dados. Para estado editado ainda nao salvo, enviar o draft atual ao agente como layout e marcar que nao houve leitura binaria.
GET /api/default-user-function-dll: data.functions e functionDetails da DLL configurada. Nao confundir com sementes de novo projeto. A contagem de exports e propria da versao da DLL, nao constante universal.
GET /api/app/config: data.csrf.token e headerName; manter cookies e enviar CSRF em POST. Autenticacao bearer do usuario ou credencial de servico provisionada pelo operador; nunca inserir tokens no indice.

## Preview com dados

POST /api/layout-preview: multipart layout (JSON LayoutPreviewRequest), dataFile OU dataAssetPath com projectId. pageIndex e base zero. Retorna data.page, pageIndex e contagem. preloadAll solicita lote; nao usar para arquivos grandes sem limite.
POST /api/layout-preview/session: tambem tem variante JSON de draft/projeto; navegar GET /api/layout-preview/session/{sessionId}/page/{pageIndex}; status em GET /api/layout-preview/session/{sessionId}/status. A sessao pode expirar. Documento logico, registro e pagina fisica nao sao equivalentes.
O agente executa somente paginas solicitadas (padrao 0 e 1), limitado a dez por diagnostico. Nao afirmar que validou o documento completo.

## Funcao nativa

Format API POST /api/user-functions/execute com JSON {functionName, arguments:[strings]}. Retorno {functionName,result}. Catalogo vem do Web, execucao vem do API. Confirmar ambas as configuracoes se houver divergencia. O helper aceita ate oito parametros e possui timeout. Nao usar API nativa para interpretar prosa.
O agente possui conjunto separado de testes de diagnostico MASCARA/RTRIMM/LTRIMM/GETSTR/NUMPARAM; isso limita apenas quais testes ele executa, NAO o catalogo de funcoes reconhecidas no layout.

## Motor final e persistencia

Format API POST /formatar: layoutZip + dataFile multipart. Devolve processId e PROCESSING; acompanhar GET /processes e /process/{processId}/pdfs ate terminar. O motor pode rejeitar massa com extensao nao aceita; preservar a massa original e verificar a politica, sem assumir que arquivo sem extensao funciona em todas as APIs.
Web POST /api/save-layout?layoutId=... grava versao com JSON; POST /api/save-layout-draft?layoutId=... persiste draft. GET /api/layout-versions e /api/diff-layout apoiam comparacao. Sao mutacoes; diagnosticar nao deve chama-las.
Web GET /api/load-project?projectId=... carrega layout completo mas pode migrar funcoes e gravar versao. Para diagnostico sem essa migracao, o agente verifica acesso em /api/project-assets e usa GET /api/load-layout?layoutId=...&version=1; /layout-draft-document e leitura incremental. Um layout vazio/descarregado no draft nao prova documento sem componentes.

## Limites honestos

No checkout revisado, validatePontoFButton aciona regras do frontend. Nao inventar endpoint /api/validate-pontof: ele nao foi encontrado. O diagnostico do agente aplica verificacoes deterministicas documentadas e usa APIs existentes para parse/catalogo/preview/testes nativos.
O upload de 2 GiB e configuracao do fluxo web/nginx, nao do agente inteiro. A API Node do agente continua com limite de corpo 50 MiB; diagnostico individual limita arquivo decodificado a 32 MiB. Nao enviar ZIP de 2 GiB em base64 para essa API.

Fontes: ProjectApiController.java; LayoutApiController.java; AppApiController.java; FormatProcessingApiController.java; format-api/controller/FormatController.java e UserFunctionController.java; format-agent/api/format-tools.js e server.js.
