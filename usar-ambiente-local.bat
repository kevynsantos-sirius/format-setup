@echo off
setlocal
set ROOT=%~dp0

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-local.bat
  echo FORMAT_FRONTEND_BASE_URL=http://localhost:5173
  echo NGINX_WEB_UPSTREAM=http://host.docker.internal:8081
  echo VITE_PROXY_TARGET=http://host.docker.internal:8081
  echo FRONTEND_PORT=5173
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://localhost:8081
  )
)

echo Ambiente LOCAL configurado.
echo .env: FORMAT_FRONTEND_BASE_URL=http://localhost:5173
echo Nginx Docker -^> format-web no Eclipse: http://host.docker.internal:8081
echo Vite local -^> backend Eclipse: http://localhost:8081
echo.
echo No Eclipse, use tambem estas variaveis na Run Configuration do format-web:
echo FORMAT_FRONTEND_BASE_URL=http://localhost:5173
echo LOG_DIR=%ROOT%logs\format-web
endlocal