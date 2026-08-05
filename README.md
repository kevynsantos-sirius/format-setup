# Format Workspace

Workspace do projeto Format com frontend, backends e infraestrutura separados.

## Estrutura

- `frontend/`: frontend React/Vite independente.
- `format-web/`: backend Spring Boot executado pelo Eclipse no desenvolvimento.
- `format-api/`: API de processamento executavel em Docker.
- `format-container/`: Auth, MySQL, LocalStack/S3 e demais recursos de infraestrutura.
- `format-manager/`: biblioteca Java legada usada pelo `format-web`.

## Desenvolvimento local

1. Suba as dependencias Docker sem o `format-web`:

```bash
docker compose -f docker-compose.format-container.yml -f docker-compose.format-api.yml up -d --build
```

2. Execute o backend `format-web` pelo Eclipse na porta `8081`.

3. Execute o front:

```bash
cd frontend
npm install
npm run dev
```

Em desenvolvimento local, o Vite pode rodar em `http://localhost:5173`. No Linux/runtime, rode `npm run build` e acesse pelo Nginx em `http://192.168.69.225` ou `http://web.format.local`; o Nginx serve `frontend/dist` e proxia `/api`, OAuth e Swagger para o `format-web`.

## Compose separados

- Infra/Auth/MySQL/LocalStack: `docker-compose.format-container.yml`
- Format API: `docker-compose.format-api.yml`
- Format Web opcional em Docker: `docker-compose.format-web.yml`
- Frontend React/Vite dev server: `docker-compose.format-frontend.yml`
- Format Manager build sob demanda: `docker-compose.format-manager.yml`

## Frontend em Docker com Vite

Para subir o frontend pelo servidor de desenvolvimento do React/Vite no Docker, inclua `docker-compose.format-frontend.yml`.

O container `format-frontend` executa:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

O `npm install` roda automaticamente quando o volume `node_modules` do container ainda nao tem o Vite instalado.

Comando completo para o modo dev no Linux, usando o front na porta `5173`:

```bash
FORMAT_FRONTEND_BASE_URL=http://192.168.69.225:5173 \
docker compose -f docker-compose.format-container.yml -f docker-compose.format-api.yml -f docker-compose.format-web.yml -f docker-compose.format-frontend.yml up -d --build --force-recreate
```

Nesse modo, acesse:

```text
http://192.168.69.225:5173
```

O proxy do Vite dentro do container aponta para o backend com:

```text
VITE_PROXY_TARGET=http://web:8081
```

Use esse modo quando quiser hot reload do React. Para runtime/servidor sem Vite, use `npm run build` e deixe o Nginx servir `frontend/dist` na porta `80`.

## Execucao sem recriar containers existentes

O `docker compose up -d --build` compara a definicao atual dos compose com os containers existentes. Se detectar mudanca de configuracao, imagem ou binds relevantes, ele pode recriar o container. O healthcheck do LocalStack valida se o S3 esta saudavel, mas nao impede recriacao.

Para criar apenas o que estiver faltando e preservar containers ja existentes, use:

```bash
docker compose -f docker-compose.format-container.yml -f docker-compose.format-api.yml up -d --no-recreate
```

Use `--build` quando quiser reconstruir imagens; use `--no-recreate` quando quiser evitar derrubar um LocalStack/MySQL ja ativo.

## Nginx no desenvolvimento

O `docker-compose.format-container.yml` tambem sobe o `format-nginx`.

Rotas esperadas:

- `auth.format.local` -> container `format-auth`
- `api.format.local` -> container `format-api`, quando o compose da API estiver ativo
- `web.format.local` -> frontend React/Vite; rotas `/api`, OAuth e Swagger -> `format-web` no host/Eclipse em `localhost:8081`

### Nginx no Linux

O Nginx nao deve apontar para `localhost` nem para `5173` no runtime se nao houver Vite rodando. No compose atual, ele serve o build estatico do React a partir de:

```text
frontend/dist -> /usr/share/nginx/html
```

E encaminha somente rotas de backend para o `format-web`:

```text
/api/*
/oauth2/*
/login/oauth2/*
/swagger-ui/*
/v3/api-docs/*
```

Default do upstream do backend no Nginx:

```text
NGINX_WEB_UPSTREAM=http://web:8081
```

Antes de subir no Linux, gere o build do frontend:

```bash
cd frontend
npm install
npm run build
```

Depois suba os containers:

```bash
docker compose -f docker-compose.format-container.yml -f docker-compose.format-api.yml -f docker-compose.format-web.yml up -d --build --force-recreate
```

O `FORMAT_FRONTEND_BASE_URL` do `format-web` deve apontar para o Nginx, por exemplo:

```text
FORMAT_FRONTEND_BASE_URL=http://192.168.69.225
```
## Logs centralizados

Os logs de manutencao ficam concentrados em `logs/`, com uma subpasta por servico:

- `logs/format-auth/`: arquivo `format-auth.log` gerado pelo Spring Boot do Auth.
- `logs/format-api/`: arquivo `format-api.log` gerado pelo Spring Boot da API.
- `logs/format-web/`: arquivo `format-web.log` quando o `format-web` usa `LOG_DIR` ou roda via compose opcional.
- `logs/nginx/`: access/error logs do Nginx.
- `logs/mysql/` e `logs/localstack/`: pastas reservadas para logs auxiliares desses containers quando houver escrita em arquivo; os logs principais deles continuam disponiveis via `docker logs`.

No `format-web`, o default de `LOG_DIR` e Linux/container:

```text
LOG_DIR=/app/logs
```

Para rodar pelo Eclipse no Windows, sobrescreva a variavel de ambiente na Run Configuration:

```text
LOG_DIR=C:\workspace\format\logs\format-web
```

Em Linux local, uma alternativa equivalente seria:

```text
LOG_DIR=/workspace/format/logs/format-web
```

Os arquivos de log sao ignorados pelo Git; apenas a estrutura das pastas fica preparada.








