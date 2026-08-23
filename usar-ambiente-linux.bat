@echo off
setlocal
set ROOT=%~dp0
set SERVER_HOST=%~1
if "%SERVER_HOST%"=="" set SERVER_HOST=192.168.69.225
set PUBLIC_BASE_URL=http://%SERVER_HOST%
set VITE_PUBLIC_BASE_URL=http://%SERVER_HOST%:5173
set AUTH_PUBLIC_BASE_URL=http://%SERVER_HOST%:8090
set AUTH_DOCKER_BASE_URL=http://auth:8090
set API_DOCKER_BASE_URL=http://api:8082

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-linux.bat
  echo # Valores para todos os servicos executando na rede Docker format-network.
  echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
  echo NGINX_WEB_UPSTREAM=http://web:8081
  echo VITE_PROXY_TARGET=http://web:8081
  echo FRONTEND_PORT=5173
  echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%VITE_PUBLIC_BASE_URL%,%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
  echo FORMAT_AUTH_TOKEN_URI=%AUTH_DOCKER_BASE_URL%/oauth2/token
  echo FORMAT_AUTH_USER_INFO_URI=%AUTH_DOCKER_BASE_URL%/userinfo
  echo FORMAT_AUTH_JWK_SET_URI=%AUTH_DOCKER_BASE_URL%/oauth2/jwks
  echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_REDIRECT_URIS=%PUBLIC_BASE_URL%/login/oauth2/code/oidc,%VITE_PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_POST_LOGOUT_REDIRECT_URIS=%PUBLIC_BASE_URL%/login?logout,%VITE_PUBLIC_BASE_URL%/login?logout
  echo FORMAT_API_BASE_URL=%API_DOCKER_BASE_URL%
  echo FORMAT_API_TOKEN_URI=%AUTH_DOCKER_BASE_URL%/oauth2/token
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://%SERVER_HOST%:8081
  )
)

echo Ambiente LINUX configurado para %PUBLIC_BASE_URL%.
echo .env sobrescrito com redirects OAuth/CORS para %SERVER_HOST%.
echo Format Auth publico: %AUTH_PUBLIC_BASE_URL%
echo Format API interno Docker: %API_DOCKER_BASE_URL%
echo Nginx Docker -^> format-web container: http://web:8081
echo format-web Docker -^> format-api container: %API_DOCKER_BASE_URL%
echo.
echo Para outro IP/host, execute:
echo usar-ambiente-linux.bat meu-host-ou-ip
endlocal