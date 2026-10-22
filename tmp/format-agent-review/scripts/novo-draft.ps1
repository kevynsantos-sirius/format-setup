param(
    [string]$Nome = "",
    [string]$ArquivoF = "",
    [string]$Pedido = ""
)

$ErrorActionPreference = "Stop"

function Convert-ToSlug {
    param([string]$Value)
    $text = if ([string]::IsNullOrWhiteSpace($Value)) { "rascunho" } else { $Value.Trim().ToLowerInvariant() }
    $text = $text -replace "[^a-z0-9_-]+", "-"
    $text = $text.Trim("-".ToCharArray())
    if ([string]::IsNullOrWhiteSpace($text)) { return "rascunho" }
    return $text
}

$root = Resolve-Path -LiteralPath "."
$draftRoot = Join-Path $root "draft"
New-Item -ItemType Directory -Force -Path $draftRoot | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$slug = Convert-ToSlug $Nome
$sessionPath = Join-Path $draftRoot "$stamp-$slug"
$entrada = Join-Path $sessionPath "entrada"
$planos = Join-Path $sessionPath "planos"
$saida = Join-Path $sessionPath "saida"
$logs = Join-Path $sessionPath "logs"
New-Item -ItemType Directory -Force -Path $entrada,$planos,$saida,$logs | Out-Null

if (-not [string]::IsNullOrWhiteSpace($ArquivoF)) {
    if (-not (Test-Path -LiteralPath $ArquivoF)) { throw "Arquivo .f nao encontrado: $ArquivoF" }
    $source = Get-Item -LiteralPath $ArquivoF
    Copy-Item -LiteralPath $source.FullName -Destination (Join-Path $entrada $source.Name) -Force
}

if ([string]::IsNullOrWhiteSpace($Pedido)) {
    $Pedido = "Descreva aqui o que o usuario quer fazer no Format. Exemplo: mudar a cor do titulo para azul, trocar logo, criar carta simples."
}
Set-Content -LiteralPath (Join-Path $sessionPath "pedido-usuario.txt") -Value $Pedido -Encoding UTF8

$manifest = [ordered]@{
    criadoEm = (Get-Date).ToString("s")
    nome = $Nome
    perfil = "usuario-final"
    status = "rascunho"
    permiteAplicar = $false
    observacao = "Esta sessao ainda nao aplica alteracoes automaticamente. Use para guardar entrada, pedido, planos e saidas temporarias."
    arquivoFEntrada = if ([string]::IsNullOrWhiteSpace($ArquivoF)) { $null } else { (Get-Item -LiteralPath $ArquivoF).Name }
    pastas = [ordered]@{
        entrada = "entrada"
        planos = "planos"
        saida = "saida"
        logs = "logs"
    }
}
$manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $sessionPath "manifest.json") -Encoding UTF8

$plano = [ordered]@{
    tipo = "intencao_operacional_format"
    status = "rascunho"
    perfil = "usuario-final"
    pedido = $Pedido
    entendimento = ""
    perguntas = @()
    alteracoesPretendidas = @()
    revisaoObrigatoria = $true
    aplicarAutomaticamente = $false
}
$plano | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $planos "intencao-operacional.json") -Encoding UTF8

Write-Host "Sessao draft criada: $sessionPath"
Write-Host "Pedido: $Pedido"
if (-not [string]::IsNullOrWhiteSpace($ArquivoF)) { Write-Host "Arquivo .f copiado para: $entrada" }
