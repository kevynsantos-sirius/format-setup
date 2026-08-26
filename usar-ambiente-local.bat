@echo off
setlocal
set ROOT=%~dp0
set PUBLIC_BASE_URL=http://localhost:5173
set WEB_LOCAL_BASE_URL=http://localhost:8081
set AUTH_PUBLIC_BASE_URL=http://localhost:8090
set AUTH_DOCKER_BASE_URL=http://auth:8090
set API_LOCAL_BASE_URL=http://localhost:8082
set API_DOCKER_BASE_URL=http://api:8082

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-local.bat
  echo # Valores deste arquivo sao consumidos principalmente pelos containers Docker.
  echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
  echo NGINX_WEB_UPSTREAM=http://host.docker.internal:8081
  echo VITE_PROXY_TARGET=http://host.docker.internal:8081
  echo FRONTEND_PORT=5173
  echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%WEB_LOCAL_BASE_URL%,%AUTH_PUBLIC_BASE_URL%,http://127.0.0.1:5173,http://127.0.0.1:8081
  echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
  echo FORMAT_AUTH_LOGOUT_URI=%AUTH_PUBLIC_BASE_URL%/connect/logout
  echo FORMAT_AUTH_TOKEN_URI=%AUTH_DOCKER_BASE_URL%/oauth2/token
  echo FORMAT_AUTH_USER_INFO_URI=%AUTH_DOCKER_BASE_URL%/userinfo
  echo FORMAT_AUTH_JWK_SET_URI=%AUTH_DOCKER_BASE_URL%/oauth2/jwks
  echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_REDIRECT_URIS=%PUBLIC_BASE_URL%/login/oauth2/code/oidc,%WEB_LOCAL_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_POST_LOGOUT_REDIRECT_URIS=%PUBLIC_BASE_URL%/login?logout,%WEB_LOCAL_BASE_URL%/login?logout
  echo FORMAT_API_BASE_URL=%API_DOCKER_BASE_URL%
  echo FORMAT_API_TOKEN_URI=%AUTH_DOCKER_BASE_URL%/oauth2/token
  echo FORMAT_STORAGE_TYPE=s3
  echo AWS_REGION=us-east-1
echo FORMAT_AWS_REGION=us-east-1
  echo AWS_ACCESS_KEY_ID=test
  echo AWS_SECRET_ACCESS_KEY=test
  echo AWS_S3_ENDPOINT=http://localstack:4566
  echo AWS_S3_BUCKET=format-web-bucket
  echo FORMAT_WEB_S3_BUCKET=format-web-bucket
  echo AWS_S3_AUTO_CREATE_BUCKET=true
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://localhost:8081
  )
)

echo Ambiente LOCAL configurado.
echo .env sobrescrito para containers Docker usando hostnames internos quando necessario.
echo Frontend local: %PUBLIC_BASE_URL%
echo Format Web local/Eclipse: %WEB_LOCAL_BASE_URL%
echo Format API local/publico: %API_LOCAL_BASE_URL%
echo Format Auth local/publico: %AUTH_PUBLIC_BASE_URL%
echo Nginx Docker -^> format-web no Eclipse: http://host.docker.internal:8081
echo Vite local -^> backend Eclipse: http://localhost:8081
echo.
echo No Eclipse, use tambem estas variaveis na Run Configuration do format-web:
echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
echo FORMAT_AUTH_LOGOUT_URI=%AUTH_PUBLIC_BASE_URL%/connect/logout
echo FORMAT_AUTH_TOKEN_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/token
echo FORMAT_AUTH_USER_INFO_URI=%AUTH_PUBLIC_BASE_URL%/userinfo
echo FORMAT_AUTH_JWK_SET_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/jwks
echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
echo FORMAT_API_BASE_URL=%API_LOCAL_BASE_URL%
echo FORMAT_API_TOKEN_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/token
echo FORMAT_STORAGE_TYPE=s3
echo AWS_REGION=us-east-1
echo FORMAT_AWS_REGION=us-east-1
echo AWS_ACCESS_KEY_ID=test
echo AWS_SECRET_ACCESS_KEY=test
echo AWS_S3_ENDPOINT=http://localhost:4566
echo AWS_S3_BUCKET=format-web-bucket
echo FORMAT_WEB_S3_BUCKET=format-web-bucket
echo AWS_S3_AUTO_CREATE_BUCKET=true
echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%WEB_LOCAL_BASE_URL%,%AUTH_PUBLIC_BASE_URL%,http://127.0.0.1:5173,http://127.0.0.1:8081
echo LOG_DIR=%ROOT%logs\format-web
endlocal

