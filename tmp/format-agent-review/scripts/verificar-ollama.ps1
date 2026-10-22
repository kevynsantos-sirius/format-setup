param(
    [string]$OllamaConfigPath = ".\config\ollama.json"
)

$ErrorActionPreference = "Stop"

$config = Get-Content -Raw -LiteralPath $OllamaConfigPath | ConvertFrom-Json
$baseUrl = $config.baseUrl.TrimEnd("/")
$model = $config.model

Write-Host "Ollama unico configurado: $baseUrl"
Write-Host "Modelo de consulta: $model"
Write-Host "Modo: $($config.mode)"
Write-Host "Permite modificacoes: $($config.allowMutations)"

try {
    $tags = Invoke-RestMethod -Method Get -Uri "$baseUrl/api/tags"
} catch {
    throw "Nao foi possivel conectar ao Ollama em $baseUrl. Verifique se o Ollama esta rodando. Detalhe: $($_.Exception.Message)"
}

$installed = @($tags.models | ForEach-Object { $_.name })
if ($installed -contains $model) {
    Write-Host "Modelo encontrado localmente."
} else {
    Write-Warning "Modelo '$model' nao encontrado localmente. Rode: ollama pull $model"
}
