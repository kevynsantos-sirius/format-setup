# API local do Format LLM

Atualizacao 20/10/2026: o novo contrato de diagnostico em tempo real e consulta com arquivo/draft/projeto esta documentado em [DIAGNOSTICO_PONTO_F.md](DIAGNOSTICO_PONTO_F.md). `POST /api/pontof/diagnosticar` executa inspecao/validacoes sem salvar o projeto, e `/api/perguntar` aceita esse contexto atual. Os exemplos antigos de criar/editar abaixo descrevem capacidades limitadas separadas da consulta.

API HTTP local para consultar a IA e criar/editar Ponto F em fluxo controlado.

## Subir API

```bat
cd C:\workspace\format\format-agent
scripts\api-format-llm.bat
```

Endereco padrao:

```text
http://127.0.0.1:3217
```

Para parar:

```bat
scripts\api-format-llm-parar.bat
```

## Swagger / OpenAPI

Com a API ligada, abra no navegador:

`	ext
http://127.0.0.1:3217/docs
` 

O JSON OpenAPI fica em:

`	ext
http://127.0.0.1:3217/openapi.json
` 

A tela /docs usa Swagger UI via CDN. Se estiver sem internet, use o /openapi.json em outra ferramenta, como Swagger Editor, Postman ou Insomnia.

## Rotas

### GET /health

Verifica se a API esta ativa.

### POST /api/perguntar

Consulta a IA usando o contexto indexado.

```json
{
  "modo": "usuario",
  "pergunta": "O que e um Ponto F?"
}
```

Use `"modo": "dev"` para perguntas tecnicas. O Ollama precisa estar ativo para esta rota.

### POST /api/pontof/criar

Cria um Ponto F simples e retorna o arquivo `.f` em base64.

```json
{
  "nome": "carta-api",
  "titulo": "Carta API",
  "corpo": "Texto inicial da carta.",
  "cor": "#000000",
  "recursos": [
    {
      "name": "logo.png",
      "base64": "..."
    }
  ]
}
```

`recursos` ainda sao apenas recebidos e guardados na sessao de draft. A ligacao automatica desses recursos ao layout sera um passo posterior.

### POST /api/pontof/editar

Recebe um `.f` em base64, aplica uma edicao simples no primeiro texto e retorna o `.f` editado em base64.

```json
{
  "nome": "edicao-carta-api",
  "arquivo": {
    "name": "layout.f",
    "base64": "..."
  },
  "alteracoes": {
    "texto": "Carta API Editada",
    "cor": "#0057B8"
  },
  "recursos": []
}
```

Nesta primeira versao, a edicao suportada e propositalmente pequena: texto/cor do primeiro campo de texto. O objetivo e validar o contrato da API antes de liberar operacoes mais amplas.

## Saidas locais

Cada operacao cria uma sessao em:

```text
draft/api/<data>-<nome>/
```

Estrutura:

```text
entrada/   arquivos recebidos
recursos/  anexos enviados
saida/     .f gerado ou editado
logs/      reservado para logs
pedido.json
```

A pasta `draft/` nao e versionada pelo Git.


## Validacao de posicionamento

O inspetor local agora informa BOUNDS_OK=true quando textos e fios ficam dentro da pagina A4. Para criacoes novas, preferir margens conservadoras e largura maxima de conteudo menor que a largura total do documento.

