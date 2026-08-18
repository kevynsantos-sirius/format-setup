@echo off
setlocal
set ROOT=%~dp0
set PUBLIC_BASE_URL=http://localhost:5173
set WEB_LOCAL_BASE_URL=http://localhost:8081
set AUTH_PUBLIC_BASE_URL=http://localhost:8090

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-local.bat
  echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
  echo NGINX_WEB_UPSTREAM=http://host.docker.internal:8081
  echo VITE_PROXY_TARGET=http://host.docker.internal:8081
  echo FRONTEND_PORT=5173
  echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%WEB_LOCAL_BASE_URL%,%AUTH_PUBLIC_BASE_URL%,http://127.0.0.1:5173,http://127.0.0.1:8081
  echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
  echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
  echo FORMAT_AUTH_TOKEN_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/token
  echo FORMAT_AUTH_USER_INFO_URI=%AUTH_PUBLIC_BASE_URL%/userinfo
  echo FORMAT_AUTH_JWK_SET_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/jwks
  echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_REDIRECT_URIS=%PUBLIC_BASE_URL%/login/oauth2/code/oidc,%WEB_LOCAL_BASE_URL%/login/oauth2/code/oidc
  echo FORMAT_AUTH_WEB_POST_LOGOUT_REDIRECT_URIS=%PUBLIC_BASE_URL%/login?logout,%WEB_LOCAL_BASE_URL%/login?logout
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://localhost:8081
  )
)

echo Ambiente LOCAL configurado.
echo .env sobrescrito com redirects OAuth/CORS para localhost.
echo Frontend local: %PUBLIC_BASE_URL%
echo Format Auth local: %AUTH_PUBLIC_BASE_URL%
echo Nginx Docker -^> format-web no Eclipse: http://host.docker.internal:8081
echo Vite local -^> backend Eclipse: http://localhost:8081
echo.
echo No Eclipse, use tambem estas variaveis na Run Configuration do format-web:
echo FORMAT_FRONTEND_BASE_URL=%PUBLIC_BASE_URL%
echo FORMAT_AUTH_ISSUER=%AUTH_PUBLIC_BASE_URL%
echo FORMAT_AUTH_AUTHORIZATION_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/authorize
echo FORMAT_AUTH_TOKEN_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/token
echo FORMAT_AUTH_USER_INFO_URI=%AUTH_PUBLIC_BASE_URL%/userinfo
echo FORMAT_AUTH_JWK_SET_URI=%AUTH_PUBLIC_BASE_URL%/oauth2/jwks
echo FORMAT_AUTH_WEB_REDIRECT_URI=%PUBLIC_BASE_URL%/login/oauth2/code/oidc
echo SPRING_WEB_CORS_ALLOWED_ORIGINS=%PUBLIC_BASE_URL%,%WEB_LOCAL_BASE_URL%,%AUTH_PUBLIC_BASE_URL%,http://127.0.0.1:5173,http://127.0.0.1:8081
echo LOG_DIR=%ROOT%logs\format-web
endlocal
