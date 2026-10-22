@echo off
setlocal enabledelayedexpansion
set "PORT=3217"
if not "%~1"=="" set "PORT=%~1"
echo Encerrando Format LLM API na porta %PORT%...
set "FOUND="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  set "FOUND=1"
  echo Encerrando processo %%P...
  taskkill /PID %%P /F
)
if not defined FOUND echo Nenhum processo escutando nessa porta.
