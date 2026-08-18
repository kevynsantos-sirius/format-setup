@echo off
setlocal
set ROOT=%~dp0
set SERVER_HOST=%~1
if "%SERVER_HOST%"=="" set SERVER_HOST=192.168.69.225
set PUBLIC_BASE_URL=http://%SERVER_HOST%
set AUTH_PUBLIC_BASE_URL=http://%SERVER_HOST%:8090

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-linux.bat
  echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
  echo NGINX_WEB_UPSTREAM=http://web:8081
  echo VITE_PROXY_TARGET=http://web:8081
  echo FRONTEND_PORT=5173
  echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
  echo FORMAT_AUTH_TOKEN_URI=http://auth:8090/oauth2/token
  echo FORMAT_AUTH_USER_INFO_URI=http://auth:8090/userinfo
  echo FORMAT_AUTH_JWK_SET_URI=http://auth:8090/oauth2/jwks
  echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_REDIRECT_URIS=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_POST_LOGOUT_REDIRECT_URIS=%PUBLIC_BASE_URL%/login?logout
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://%SERVER_HOST%:8081
  )
)

echo Ambiente LINUX configurado para %PUBLIC_BASE_URL%.
echo .env sobrescrito com redirects OAuth/CORS para %SERVER_HOST%.
echo Format Auth publico: %AUTH_PUBLIC_BASE_URL%
echo Nginx Docker -^> format-web container: http://web:8081
echo.
echo Para outro IP/host, execute:
echo usar-ambiente-linux.bat meu-host-ou-ip
endlocal
