@echo off
setlocal
if "%OLLAMA_HOST%"=="" set "OLLAMA_HOST=127.0.0.1:11434"
if "%OLLAMA_NUM_PARALLEL%"=="" set "OLLAMA_NUM_PARALLEL=1"
if "%OLLAMA_MAX_LOADED_MODELS%"=="" set "OLLAMA_MAX_LOADED_MODELS=1"
if "%OLLAMA_CONTEXT_LENGTH%"=="" set "OLLAMA_CONTEXT_LENGTH=2048"
if "%OLLAMA_KEEP_ALIVE%"=="" set "OLLAMA_KEEP_ALIVE=30s"
set "OLLAMA_EXE=ollama"
where ollama >nul 2>nul
if errorlevel 1 (
  if exist "%LOCALAPPDATA%\Programs\Ollama\ollama.exe" (
    set "OLLAMA_EXE=%LOCALAPPDATA%\Programs\Ollama\ollama.exe"
  ) else (
    echo Ollama nao encontrado. Instale pelo site oficial https://ollama.com/download/windows
    exit /b 1
  )
)
echo Ollama local: uma consulta por vez, contexto 2048, descarregamento apos 30s.
echo Para encerrar, pressione Ctrl+C.
"%OLLAMA_EXE%" serve
