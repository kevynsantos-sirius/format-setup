@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0verificar-ollama.ps1" %*
exit /b %ERRORLEVEL%
