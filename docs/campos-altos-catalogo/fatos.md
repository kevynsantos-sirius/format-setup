# Campos Altos — fatos estruturais revisados

Derivados da leitura nativa e das máscaras do pacote, não de execução financeira ou jurídica.

## campos-altos-estrutura

O exemplo Campos Altos — Dívida Ativa está catalogado como referência para intimação de imóvel/cobrança municipal: há 2 documentos condicionais A4 aproximado, Capa (_ContRep=1) e Carne (_ContRep=2). São 38 registros nativos: 2 documentos, 3 imagens, 27 campos de saída, 5 caixas de texto e 1 código de barras. Há 40 campos de entrada, sem janelas detalhe ou variáveis de usuário. O material observado combina capa postal e guia de recolhimento; conhecer a estrutura não comprova validade jurídica nem o estado de um projeto atual.

## campos-altos-mascaras

No exemplo Campos Altos — Dívida Ativa, boa parte dos rótulos, contornos e identidade visual está incorporada em duas máscaras PNG de página, com os dados variáveis sobrepostos no .f. Alterar um campo não altera texto desenhado no PNG. As duas máscaras vieram no ZIP, mas seus nomes têm acento com codificação inconsistente; a resolução pelo motor precisa ser conferida. Carne também referencia BRANCO.jpg, ausente no pacote; não removê-lo nem substituí-lo silenciosamente. Confirmar no .f atual se o alvo pertence ao recurso visual ou a um elemento editável.

## campos-altos-esquema

O exemplo Campos Altos declara registros fixos de 1355 bytes. O CSV é um esquema de 40 campos, e suas posições e comprimentos correspondem ao .f, embora existam aliases diferentes. Os grupos cobrem emissor, contribuinte, imóvel, processo, guia e valores. Não importar os valores reais dos contribuintes para memória ou novos exemplos. A data de postagem depende dos oito primeiros caracteres do nome da massa; renomear o arquivo pode afetá-la. O catálogo guarda nomes, posições, expressões sanitizadas e dependências; não contém registros reais. Preview e PDF preenchidos não foram executados nesta revisão.

## campos-altos-codigo-barras

No Campos Altos, CODIGOBARRA tem 48 posições na entrada, enquanto o objeto barcode declara numChar=44 e usa Rtrimm(CODIGOBARRA). Há ainda representação formatada em campo de saída e expressão I2OF5 com quatro trechos de 11 posições iniciados em 1, 13, 25 e 37. Preservar as representações e investigar sua relação com o motor; não reduzir automaticamente 48 para 44 nem afirmar que alterar uma atualiza todas. I2OF5, dígitos e resultado financeiro não foram executados ou validados nesta catalogação.
