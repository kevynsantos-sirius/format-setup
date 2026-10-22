# Diagnosticar o Ponto F atual

## Respostas ancoradas e planos de edicao - 21/10/2026

A consulta separa memoria verificada e estado observado. As regras atomicas de `knowledge/regras-verificadas.json` entram nos mesmos indices, com prova textual, hash da fonte e hash da regra. Fonte alterada invalida a evidencia ate reindexar. A IA leve ordena somente IDs permitidos, com saida JSON limitada a 80 tokens; nao escreve fatos livres, nao escolhe alvos e nao executa edicoes. Saida invalida, truncamento ou Ollama indisponivel usam os fatos recuperados com fallback declarado. Fora dessas regras, a resposta mostra extratos como material relacionado, sem inventar conclusao. Ver campos `modelo`, `confiabilidade`, `alteracao`, `diagnostico` e `execucoes`.

Edicao em lote usa duas chamadas. Depois de diagnosticar, enviar ao `POST /api/pontof/planejar-edicao` a origem atual (`layout`, `arquivo` ou `projectId`), `snapshotSha256` e `alteracoes`:

```json
{"targetId":"<id exato do inventario>","documentIndex":0,"property":"conditional","before":"Tipo = 30","after":"Tipo = 31"}
```

Cada alteracao identifica um campo, nao uma busca por nome. Ate 100 campos podem abranger varios documentos e filhos de banda. Campos escalares suportados incluem geometria, orientacao, condicao geral, condDet, selecao de banda, expressao de campo de saida, referencia de imagem e folhas de texto/fonte; a propriedade deve existir no snapshot e manter o tipo. Tokens estruturados nao podem ser substituidos por texto simples. Nao ha criacao/remocao automatica de componentes, ajuste global de fios ou escolha do primeiro texto.

O plano retorna `planId`, escopo, valores anteriores/posteriores, documento, banda, rotulo, coordenadas e `proposedLayout`. Conferir esse diff. Para aplicar ao draft, `POST /api/pontof/editar` ou `/api/pontof/aplicar-plano` recebe a mesma origem e `plano` completo. Snapshot, alvo, documento e valor anterior devem continuar iguais. O resultado verifica que nenhum campo fora dos declarados mudou.

**Mudanca de contrato:** `/api/pontof/editar` agora retorna draft JSON editado, sem arquivo binario nem gravacao no projeto. A rota antiga sem plano retorna 409. Isso permite preparar mudancas grandes de maneira revisavel; ainda e preciso revisar no editor, persistir pelo Format Web e verificar releitura, recursos e preview nas paginas afetadas. `requiresVisualReview` permanece verdadeiro e `salva` permanece falso. Um plano valido nao e prova de resultado visual ou de preservacao binaria.

Revisão e resultados: [REVISAO_2026_10_20.md](REVISAO_2026_10_20.md).

Requer Node.js com fetch/FormData (Node 20+), Format Web/API configurados em `config/format-tools.json` e credenciais provisionadas pelo operador. Use `FORMAT_WEB_BEARER_TOKEN` para Web e `FORMAT_API_BEARER_TOKEN` para teste nativo. Authorization bearer da requisição pode fornecer o token Web; nunca mande credenciais na pergunta ou nos índices. Cookies e CSRF são obtidos pelo adaptador sem desabilitar a proteção.

`POST /api/pontof/diagnosticar` aceita:

```json
{
  "arquivo": {"name": "layout.f", "base64": "CONTEUDO_REAL_BASE64"},
  "recursos": [{"name": "logo.gif"}],
  "dados": {"name": "massa.txt", "base64": "DADOS_REAIS_BASE64"},
  "verificarPreview": true,
  "paginas": [0, 1],
  "testesFuncoes": [{"functionName": "MASCARA", "arguments": ["12345678901", "999.999.999-99"], "expected": "123.456.789-01"}]
}
```

Omitir `verificarPreview` evita execução de dados. Omitir `recursos` marca recursos como não verificados; enviar `[]` declara que nenhum recurso foi fornecido. Recursos informam disponibilidade no pacote, não comprovam que uma imagem foi renderizada. `testesFuncoes` é opcional, limitado às capacidades diagnósticas configuradas e ao catálogo atual da DLL.

Para analisar o editor ainda não salvo, enviar `layout` com `listaDocumentos` no lugar de `arquivo`. A origem será `provided-layout-json-not-binary-verified`. Nomes repetidos precisam de documento/pointer específico. IDs e `snapshotSha256` devem ser renovados após editar ou trocar a versão.

Para projeto existente, enviar `projectId` em vez de `arquivo`. O agente verifica acesso em `/api/project-assets` antes de ler `/api/load-layout?layoutId=...&version=1`. Recursos reais são aproveitados quando `recursos` não foi informado. Para dados grandes já salvos, usar `dataAssetPath` com `projectId` no lugar de `dados`. Isso evita transportar `.f` e massas grandes em base64; não altera os limites de upload do agente. O hash nesse modo representa o JSON observado, não uma alegação de hash byte a byte do arquivo armazenado.

`POST /api/perguntar` aceita os mesmos campos junto de `pergunta` e `modo` (`dev` ou `usuario`). O servidor diagnostica antes de pedir uma resposta ao modelo. Retorna evidências recuperadas, resumo diagnóstico e chamadas efetivamente executadas. A consulta não aplica alterações, não gera PDF e não salva o projeto.

Reindexar de qualquer pasta:

```powershell
node C:/workspace/format/format-agent/api/cli.js index dev
node C:/workspace/format/format-agent/api/cli.js index usuario
node C:/workspace/format/format-agent/api/cli.js search dev "LIN01 cabecalho condicao"
node C:/workspace/format/format-agent/api/cli.js ask dev "Por que Caro (a) nao e uma funcao?"
```

Os wrappers `scripts/indexar-contexto*.ps1` e `perguntar-ponto-f*.ps1` usam o mesmo runtime; não existe mais uma busca com regras diferentes em cada script. `ask dev --request pedido.json` permite consultar com arquivo/contexto atual. Evitar manter pedidos com base64/credenciais em diretórios de conhecimento; usar rascunho ignorado pelo Git.

Testes: `node --test tests/*.test.cjs`. Os índices gerados ficam em `context/chunks` e `context/usuario/chunks`, com manifestos em suas pastas `index`. Não editar os JSONL manualmente. Fontes ausentes interrompem a reconstrução preservando o índice anterior.

Limites: corpo HTTP 50 MiB, cada arquivo de diagnóstico até 32 MiB decodificados, até dez índices de preview e dez testes de função. Arquivos maiores devem usar o fluxo de projeto/storage do Format, não base64 nessa API.
