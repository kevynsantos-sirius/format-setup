# Ollama local no computador de teste

Revisao em 21/10/2026: AMD Ryzen 3 3200G, 4 nucleos/4 threads, 13,92 GiB de RAM utilizavel, GPU integrada Radeon Vega 8 (2 GiB reservados) e aproximadamente 206 GiB livres em disco. A memoria livre antes da instalacao era somente 1,83 GiB; portanto, nao ampliar automaticamente modelo, contexto ou concorrencia.

Modelo de consulta ativo: `qwen2.5-coder:0.5b`, quantizacao Q4_K_M, aproximadamente 398 MB para os pesos. O modelo originalmente configurado `qwen2.5-coder:1.5b` foi instalado e testado, mas o runner chegou a aproximadamente 1162 MiB de working set e restaram apenas 0,5 GiB livres no computador. Foi mantido em disco para uso futuro com mais RAM livre. O uso total em execucao inclui cache de contexto e runtime; tamanho do download nao representa consumo total de RAM.

Perfil em `config/ollama.json`: CPU (`num_gpu: 0`), duas threads, contexto 2048, resposta limitada a 220 tokens e retencao de 30 segundos. O script `scripts/ollama-ativo.bat` limita o servidor a uma consulta por vez e um modelo carregado. As mesmas variaveis foram configuradas no ambiente do usuario Windows para partidas pelo aplicativo instalado.

Comparacao real: Coder 0.5B utilizou cerca de 501 MiB no runner; Qwen3 0.6B utilizou cerca de 960 MiB e nao mostrou fidelidade suficiente para justificar a memoria adicional. O perfil ativo voltou ao Coder 0.5B. Os modelos comparados permanecem instalados em disco; somente o solicitado e carregado, e apos 30 segundos o runtime libera a memoria.

**Qualidade ainda reprovada para uso autonomo:** as seis consultas via HTTP responderam, mas varias respostas gerais foram genericas ou repetiram a pergunta. O draft sintetico teve as condicoes geral e de impressao identificadas corretamente. Qwen3 tambem produziu uma afirmacao incorreta sobre texto literal em teste focado. Isso impede considerar os modelos pequenos aprovados para raciocinio tecnico independente ou edicao autonoma. Evidencias estruturais, origem do draft e execucoes permanecem nos campos deterministas da resposta. Os testes nao salvaram projetos e nao validaram PDF final, DLL ou todas as paginas.

Iniciar o servidor pelo BAT e a API pelo `scripts/api-format-llm.bat`. O BAT procura tambem o executavel no diretorio padrao da instalacao por usuario, mesmo quando o terminal ainda nao recebeu o PATH atualizado. Nao iniciar um segundo servidor se a porta 11434 ja estiver ocupada pelo Ollama.

Verificacao local:

```powershell
Invoke-RestMethod http://127.0.0.1:11434/api/version
Invoke-RestMethod http://127.0.0.1:11434/api/tags
Invoke-RestMethod http://127.0.0.1:3217/health
```

Os indices atuais usam recuperacao lexical: o modelo de embeddings configurado (`nomic-embed-text`) nao e carregado nas consultas. Ter ambos os modelos em disco nao exige manter ambos na RAM.

O limite de 220 tokens favorece respostas breves e pode cortar respostas extensas. Esta configuracao e um compromisso para o computador atual, nao uma garantia de qualidade. Testes reais devem avaliar separadamente HTTP 200, fidelidade as evidencias e ausencia de alegacoes de execucao/salvamento inexistentes.

Fontes oficiais: https://docs.ollama.com/windows, https://docs.ollama.com/faq, https://ollama.com/library/qwen2.5-coder:1.5b.
