param(
  [Parameter(Mandatory=$true, Position=0)][string]$Pergunta,
  [switch]$MostrarContexto
)
$ErrorActionPreference = 'Stop'
$cli = Join-Path $PSScriptRoot '../api/cli.js'
if ($MostrarContexto) { & node $cli search dev $Pergunta }
& node $cli ask dev $Pergunta
if ($LASTEXITCODE -ne 0) { throw 'Consulta nao concluida.' }