# Importação e preview de folhas de etiquetas

Correção validada em 27/10/2026 com uma cópia de `Etq_SEG_RE.f`, massas sintéticas e banco de testes isolado.

## Leitura e gravação

O arquivo fornecido tem assinatura `831` e campos de caminho de 128 bytes. O leitor esperava 256 bytes e retornava contagens/dimensões incorretas. A largura agora é identificada por arquivo, usando a versão e a coerência da geometria. O perfil de serialização acompanha o modelo e os leitores/gravadores de funções, mensagens e overlays; nenhuma constante global é alterada. Também são aceitos arquivos que conservam a assinatura antiga, mas foram gravados com campos de 256 bytes, mediante verificação da geometria.

O documento de origem possui nome vazio e condição vazia, estados válidos neste exemplo. A conversão existente atribui um nome ao documento do editor e seleção padrão, preservando a leitura direta da tabela de documentos, sem depender da busca heurística por nomes e expressões IF.

A folha mede aproximadamente 210 × 297 mm. O modelo da etiqueta mede 104,9867 × 49,4453 mm, com 2 colunas, 6 linhas e grupo de 12 documentos. Há 24 definições de entrada, 8 campos de saída e 1 código de barras. A massa é variável, separada por tabulação; os índices são preservados, incluindo `Chave=0` e `Segurado=1`.

## Montagem das folhas

Contagem, preview completo, intervalos e cursor usam o mesmo gerador de folhas. Cada posição contém o contexto do seu próprio registro e repetição. A geometria aplica margens, espaçamento e sequência horizontal, vertical ou da direita para a esquerda. As variáveis de posição usam a coluna e a posição física correspondentes. A última folha não recebe registros fictícios ou cópias para completar espaços.

O agrupamento depende da capacidade da grade e do número de grupos configurados. Aplicações com grupo unitário mantêm o comportamento de uma seleção por página; documentos de modelos diferentes não são combinados silenciosamente na mesma folha. Checkpoints são emitidos apenas onde é possível retomar a leitura por registro sem perder repetições.

## Verificação

- Testes de agrupamento com 1, 12, 13, 24 e 25 registros.
- Repetições, sequência vertical/invertida, variáveis de posição, navegação anterior/próxima, intervalos, contagem e retomada por offset.
- Cópia do arquivo original: leitura, gravação e releitura com perfil de 128 bytes; leitura concorrente com cópia de 256 bytes.
- Compatibilidade de leitura dos exemplos NovoTeste, Boleto Instituídos e Campos Altos, mantendo suas contagens conhecidas de documentos e campos.
- Importação e abertura de rascunho por HTTP, seguidas de previews com expressões originais e chamadas reais à Sirius32: 13 registros = 12+1; 24 = 12+12; 25 = 12+12+1.

Os testes específicos novos passaram. A suíte anterior de preview mantém seis falhas já registradas antes desta correção, relacionadas às suas simulações de funções e seleção de documentos; nenhuma falha nova foi acrescentada a esses cenários.

O relatório visual é uma conferência dos valores, posições e códigos de barras retornados pelo backend. Usa Arial como substituição explícita; não comprova disponibilidade de Frutiger Sirius ou paridade de fontes com a impressão desktop. A massa real não foi fornecida, e o motor PDF nativo não foi executado nesta verificação. Nenhum dado real de cliente foi utilizado.

Evidências: `output/label-sheet-validation/resultado.json`, `validacao.html`, `folha-1.png`, `folha-3.png`. O arquivo original e a cópia de referência mantêm o SHA-256 `ea2f542f3789f4ab93ce1bebdc642bcf4cbc9ee961fde9373d7e3b7fd17c8a5d`. Os testes de integração utilizam a porta 8091 e armazenamento exclusivo de testes; não substituem o backend em uso.
