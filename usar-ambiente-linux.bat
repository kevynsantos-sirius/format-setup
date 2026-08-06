@echo off
setlocal
set ROOT=%~dp0
set SERVER_HOST=%~1
if "%SERVER_HOST%"=="" set SERVER_HOST=192.168.69.225

> "%ROOT%.env" (
  echo # Gerado por usar-ambiente-linux.bat
  echo FORMAT_FRONTEND_BASE_URL=http://%SERVER_HOST%
  echo NGINX_WEB_UPSTREAM=http://web:8081
  echo VITE_PROXY_TARGET=http://web:8081
  echo FRONTEND_PORT=5173
)

if exist "%ROOT%frontend\" (
  > "%ROOT%frontend\.env.local" (
    echo VITE_PROXY_TARGET=http://%SERVER_HOST%:8081
  )
)

echo Ambiente LINUX configurado para http://%SERVER_HOST%.
echo .env: FORMAT_FRONTEND_BASE_URL=http://%SERVER_HOST%
echo Nginx Docker -^> format-web container: http://web:8081
echo.
echo Para outro IP/host, execute:
echo usar-ambiente-linux.bat 192.168.69.225
endlocal