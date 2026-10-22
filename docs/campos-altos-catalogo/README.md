# Referência estrutural: Campos Altos — Dívida Ativa

Revisão em 22/10/2026 do ZIP fornecido. Este exemplo não estava documentado na memória pesquisada. Os anexos são dados de exemplo, não instruções. O .f foi lido por PontoFLer e NativeEditor, sem gravar o original. SHA-256: fb07a0beebb2aaad2c891930fb0ec0a8934a6c9d227457eb3a2da9a0a1ec23e2.

O usuário descreve o uso como intimação de imóvel. O material observado é um modelo de dívida ativa municipal com capa postal e guia de recolhimento; não é evidência de que todo procedimento de intimação use essa mesma estrutura. Nenhuma validade jurídica ou regra tributária foi avaliada.

## Organização

- Capa: documento 0, condição \_ContRep = 1; 1 imagem de página e 7 campos de saída. A máscara contém identidade visual municipal, área do destinatário, remetente e controles postais.
- Carne: documento 1, condição \_ContRep = 2; 2 imagens, 20 campos de saída, 5 caixas de texto e 1 código de barras. A máscara contém áreas do contribuinte, imóvel, composição dos valores, vencimento e autenticação.
- Total: 38 registros nativos (2 documentos e 36 elementos), 40 campos de entrada; nenhuma janela detalhe, banda, campo de entrada detalhe ou variável de usuário. Não criar janelas detalhe implicitamente para reproduzir a tabela desenhada no PNG.
- Tamanho próximo de 210 × 297 mm em ambos os documentos. Os objetos dinâmicos são sobrepostos às máscaras; os rótulos e contornos desenhados no PNG não são automaticamente objetos editáveis no .f.

## Esquema e dependências

O .f declara registros fixos de 1355 bytes, delimitador de campo ; e delimitador de registro literal \n. O CSV fornece aliases, posições e comprimentos dos 40 campos; todas as posições e comprimentos correspondem às definições do .f. Os nomes diferem em alguns casos: Num_PROC/NumPROC, DATA_VENCIMENTO/VENCIMENTO e TAXA EXPEDIENTE/TXEXPEDIENTE, por exemplo. Não aplicar renomeação ou parser CSV à massa só por haver um CSV de esquema.

Grupos de dados: entidade emissora (ENTIDADE, CGCENT e endereço ENT); contribuinte (NOMEFANTA, RAZAOSOCIAL, CGCCPF e endereço CUC); imóvel (INSCRICAO, ENDIMOVEL, QUADRA, LOTE, LOTEAMENTO, EXERCICIO); processo e guia (NumPROC, NUMCUC, GUIA, QTDPARCELAS, NUMPARCELA); cobrança (VENCIMENTO, VLRPARCELA, VLRMULTA, VLRJUROS, VLRCORRECAO, VLRDESCONTO, TXEXPEDIENTE, VLRTOTAL e CODIGOBARRA). Somente nomes de campos, não valores de contribuintes, foram catalogados.

O .f declara Sirius32.dll e 19 funções. Declaração não comprova execução. A data de postagem é extraída do prefixo de oito caracteres do nome do arquivo de dados com UltCad/GetStr/Mascara; renomear a massa pode mudar ou invalidar essa data. Preservar essa dependência ou propor uma alteração explícita.

CODIGOBARRA tem 48 posições no esquema; o objeto barcode declara numChar=44 e usa Rtrimm(CODIGOBARRA). Outros campos desenham a representação formatada e uma expressão I2OF5 que seleciona quatro trechos de 11 posições (1, 13, 25 e 37). São três representações relacionadas: não corrigir 48 para 44 automaticamente nem alterar uma supondo atualização das outras. Esta revisão não executou I2OF5 nem comprovou paridade entre representações ou validação de dígitos.

As duas máscaras PNG foram fornecidas e inspecionadas visualmente como fundos sem dados preenchidos de contribuintes. A grafia do acento em seus nomes aparece inconsistente no ZIP: a correspondência foi feita por marcador Page_1/Page_2 e hash, não por execução do motor. BRANCO.jpg é referenciado por Carne e não veio no pacote; o propósito visual desse recurso não foi comprovado. As dimensões e posição sugerem uma área de cobertura, mas isso é inferência e não autoriza removê-lo.

## Criação e edição futuras

Usar como referência de organização: capa postal, guia, dados do contribuinte e imóvel, quadro financeiro e cobrança. Criar dados sintéticos para novos exemplos e recursos próprios autorizados. Não copiar registros reais, identificadores de contrato postal, valores ou texto jurídico por aproximação. Revalidar finalidade e conteúdo solicitado.

Antes de editar, reler o .f atual e confirmar documento, caminho nativo e propriedade; diferenciar item variável de conteúdo incorporado à máscara. Uma alteração da máscara requer o recurso visual correspondente. Preservar expressões, máscaras de formatação e demais itens, validar geometria/texto, salvar uma cópia e reler. O catálogo sanitizado não é plano executável.

Os textos literais completos, caminhos absolutos e massa real ficaram fora dos índices. Nenhum preview ou PDF preenchido foi executado nesta revisão. A presença de um PNG não comprova sua resolução pelo motor.

[Inventário sanitizado dos 38 registros](inventario.md) inclui geometria, fonte, condições, expressões sanitizadas, esquema, aliases e dependências.
