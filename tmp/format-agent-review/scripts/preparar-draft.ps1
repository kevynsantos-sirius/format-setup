param(
    [string]$DraftPath = ".\draft"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath "."
$draftFullPath = Join-Path $root $DraftPath
New-Item -ItemType Directory -Force -Path $draftFullPath | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $draftFullPath "_modelos") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $draftFullPath "_logs") | Out-Null

$gitignorePath = Join-Path $root ".gitignore"
$gitignore = if (Test-Path -LiteralPath $gitignorePath) { Get-Content -Raw -LiteralPath $gitignorePath } else { "" }
if ($gitignore -notmatch "(?m)^/draft/$") {
    if (-not $gitignore.EndsWith("`n") -and $gitignore.Length -gt 0) { $gitignore += "`n" }
    $gitignore += "# Rascunhos locais de Ponto F`n/draft/`n"
    Set-Content -LiteralPath $gitignorePath -Value $gitignore -Encoding UTF8
}

Write-Host "Draft pronto em: $draftFullPath"
Write-Host "A pasta draft esta ignorada pelo Git via .gitignore."
