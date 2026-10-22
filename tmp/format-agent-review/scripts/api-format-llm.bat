@echo off
setlocal
cd /d "%~dp0.."
if "%FORMAT_LLM_API_HOST%"=="" set "FORMAT_LLM_API_HOST=0.0.0.0"
node api\server.js
