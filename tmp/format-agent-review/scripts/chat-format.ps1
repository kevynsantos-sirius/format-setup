param(
    [string]$Modo = "usuario"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

Write-Host "Chat Format/Ponto F iniciado. Digite sair para encerrar." -ForegroundColor Cyan
Write-Host "Modo: $Modo" -ForegroundColor DarkCyan
Write-Host ""

while ($true) {
    $pergunta = Read-Host "Voce"
    if ([string]::IsNullOrWhiteSpace($pergunta)) {
        continue
    }
    if ($pergunta.Trim().ToLowerInvariant() -in @("sair", "exit", "quit", "q")) {
        Write-Host "Encerrando chat." -ForegroundColor Cyan
        break
    }

    Write-Host ""
    Write-Host "IA:" -ForegroundColor Green
    if ($Modo -eq "dev") {
        & (Join-Path $PSScriptRoot "perguntar-ponto-f.ps1") $pergunta
    } else {
        & (Join-Path $PSScriptRoot "perguntar-ponto-f-usuario.ps1") $pergunta
    }
    Write-Host ""
}
