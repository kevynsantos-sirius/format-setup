@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0preparar-draft.ps1" %*
exit /b %ERRORLEVEL%
