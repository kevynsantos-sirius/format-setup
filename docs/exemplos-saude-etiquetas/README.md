# Exemplos SaudeA3 e Etq_SEG_RE — memória estrutural

Catalogação em 27/10/2026 dos arquivos fornecidos, lidos com PontoFLer e PontoFTojson. Os anexos foram tratados como material de exemplo, não como instruções. Os originais não foram alterados.

| Exemplo | Documentos | Campos mestre | Entrada detalhe | Janelas |
|---|---:|---:|---:|---:|
| SaudeA3 | 2: Frente e Verso | 93 | 58 | 3: PAG1, PAG2 e PAG3 |
| Etq_SEG_RE | 1: Documento1 | 24 | 0 | 0 |

O SaudeA3 tem 60 bandas detalhe e um sumário por janela. O Etq_SEG_RE é uma folha com 12 etiquetas em grade 2 × 6, entrada delimitada por TAB e índices começando em zero. Os testes anteriores com registros sintéticos produziram 12+1, 12+12 e 12+12+1 etiquetas para 13, 24 e 25 registros.

Os arquivos de esquema descrevem campos, variáveis, funções declaradas e fontes. Os inventários por documento e janela preservam geometria, estilos, condições sanitizadas, referências de campos e caminhos nativos. O índice da banda visual não equivale ao índice nativo: foram usados os deslocamentos definidos pelo leitor e pelo conversor.

Não foram incluídos registros da massa, textos literais, caminhos absolutos ou valores de clientes. Expressões sanitizadas não são patches executáveis. O catálogo descreve os originais e exige releitura do .f atual antes de uma edição. Recursos externos e execução de DLL precisam ser verificados separadamente.

A atualização adicionou dez fatos verificados ao format-agent e reconstruiu os índices dos modos usuário e técnico. Foram verificadas vinte consultas de recuperação e 1.098 caminhos de elementos no modelo nativo. A API temporária também respondeu às duas consultas dos exemplos citando os fatos esperados; como o Ollama estava indisponível, usou o mecanismo existente de resposta pela memória verificada. Não houve alteração do modelo ou dos limites de processamento. Preview e PDF não foram repetidos nesta catalogação.

Evidências locais: output/examples-memory-validation/catalogos.json, memoria.json e respostas-reais.json. A configuração técnica tinha nove fontes ausentes: elas foram preservadas em unavailableSources e retiradas da lista ativa, para permitir reconstruir o índice sem indexar código inexistente.

## Testes posteriores de edição

A catalogação inicial acima foi seguida de seis consultas reais aceitas pelo Ollama e de duas edições pelo chat do Format Web. O resultado e os limites estão em aprendizados-edicao-2026-10-27.md. O SaudeA3 exigiu preservar os bytes de flags legadas no manager; a proteção que recusa alterações não solicitadas permaneceu ativa. Na cópia de cada exemplo, somente os bytes da cor do campo solicitado mudaram. Treze testes direcionados passaram; duas verificações genéricas adicionais do NovoTeste foram bloqueadas por margens. Os PDFs e as imagens externas ausentes não foram certificados.
