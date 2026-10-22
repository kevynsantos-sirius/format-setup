@echo off
echo Tentando encerrar o Ollama...
echo.
call "%~dp0ollama-descarregar-modelo.bat"
echo.
echo Encerrando processos ollama.exe existentes...
taskkill /IM ollama.exe /T /F
if errorlevel 1 (
  echo Nenhum processo ollama.exe foi encerrado, ou o Ollama ja estava parado.
) else (
  echo Processo Ollama encerrado.
)
echo.
echo Se o Ollama voltar sozinho, ele provavelmente esta aberto no tray/inicializacao do Windows.
echo Nesse caso, feche pelo icone do Ollama perto do relogio, ou desative a inicializacao automatica no Windows.
