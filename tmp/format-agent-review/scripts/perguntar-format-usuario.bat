@echo off
setlocal
chcp 65001 >nul
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0perguntar-ponto-f-usuario.ps1" %*
exit /b %ERRORLEVEL%
