@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0indexar-contexto-usuario.ps1" %*
exit /b %ERRORLEVEL%
