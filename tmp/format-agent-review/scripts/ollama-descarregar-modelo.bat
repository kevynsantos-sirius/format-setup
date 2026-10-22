@echo off
setlocal
for /f "usebackq delims=" %%M in (`powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "(Get-Content -Raw -LiteralPath '%~dp0..\config\ollama.json' | ConvertFrom-Json).model"`) do set "MODEL=%%M"
if "%MODEL%"=="" (
  echo Nao foi possivel ler o modelo em config\ollama.json.
  exit /b 1
)
echo Descarregando modelo do Ollama: %MODEL%
ollama stop %MODEL%
if errorlevel 1 (
  echo Nao foi possivel descarregar o modelo. Talvez ele ja esteja parado.
) else (
  echo Modelo descarregado. O servidor Ollama pode continuar ativo, mas sem o modelo carregado.
)
