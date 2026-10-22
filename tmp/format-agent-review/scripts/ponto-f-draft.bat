@echo off
setlocal

set "ROOT=%~dp0.."
set "MANAGER_JAR=C:\workspace\format-local\format\format-manager\target\jformat-manager-1.0.0.jar"
set "SRC=%ROOT%\tools\ponto-f-draft\PontoFDraftTool.java"
set "BIN=%ROOT%\tools\ponto-f-draft\bin"

if not exist "%MANAGER_JAR%" (
  echo ERRO: jar nao encontrado: %MANAGER_JAR%
  exit /b 1
)

if not exist "%BIN%" mkdir "%BIN%"

javac -encoding UTF-8 -cp "%MANAGER_JAR%" -d "%BIN%" "%SRC%"
if errorlevel 1 exit /b %errorlevel%

java -cp "%BIN%;%MANAGER_JAR%" PontoFDraftTool %*
