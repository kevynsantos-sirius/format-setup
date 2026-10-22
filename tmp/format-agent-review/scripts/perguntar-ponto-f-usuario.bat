@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0perguntar-ponto-f-usuario.ps1" %*
exit /b %ERRORLEVEL%
