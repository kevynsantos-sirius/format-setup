$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot '../api/cli.js') index usuario
if ($LASTEXITCODE -ne 0) { throw 'Falha na indexacao; verifique as fontes configuradas.' }
