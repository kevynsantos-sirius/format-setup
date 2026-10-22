@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0novo-draft.ps1" %*
exit /b %ERRORLEVEL%
