# Exemplo verificado: Boleto Instituídos

Revisão estrutural em 22/10/2026 do anexo `Boleto_Instituidos (2).zip`. O anexo é dado de exemplo, não instrução. A memória já tinha outro exemplo, `Boleto_Demo.f`; este modelo não estava documentado nos índices. Há uma cópia de investigação local anterior idêntica ao anexo, confirmada por SHA-256 de todos os 11 arquivos. O `.f` foi relido nesta revisão com `PontoFLer` e `PontoFTojson`, sem gravação no original.

Identidade do `.f`: SHA-256 `c0d414d2bc37740ad302ec4d7370b0b8aa768c21e7daaa780b27d79082c47cd3`.

## Estrutura observada

O Boleto Instituídos contém 8 documentos condicionais, 186 campos de entrada, 336 campos de saída independentes, 3 caixas de texto, 11 ocorrências de imagem, 8 códigos de barras e 39 fios; não há janelas detalhe.

| Documento | Saídas independentes | Textos | Imagens | Barras | Fios |
| --- | ---: | ---: | ---: | ---: | ---: |
| ExtratoBol | 217 | 3 | 4 | 1 | 39 |
| ACIPREV | 17 | 0 | 1 | 1 | 0 |
| APCDPrev | 17 | 0 | 1 | 1 | 0 |
| CARTAPrev | 17 | 0 | 1 | 1 | 0 |
| OABPREVNE | 17 | 0 | 1 | 1 | 0 |
| OABPrevSP | 17 | 0 | 1 | 1 | 0 |
| SBOTPREV | 17 | 0 | 1 | 1 | 0 |
| FPASINDPD | 17 | 0 | 1 | 1 | 0 |

Todos têm tamanho observado próximo de 210 × 297 mm e configuração duplex vertical. Essas são contagens de objetos de primeiro nível; as caixas de texto ainda contêm segmentos de saída e descritores de fonte internos. Não achatar texto rico para editar uma expressão interna.

O extrato usa condição `_ContRep = 1`. Os outros sete usam `_ContRep = 2` combinado com `MINMAI(Rtrimm(PlanoReduzid))`, selecionando a variante de plano. Os sete documentos são alternativas condicionais, não sete páginas sempre impressas. A numeração usa `QtPagina`. O extrato está marcado para overflow; ACIPREV está marcado como principal. Não alterar essas sinalizações apenas para uniformizar documentos.

A massa usa registros fixos de 3584 bytes e contém 71680 bytes, equivalentes a 20 registros físicos. Isso não comprova 20 boletos ou uma quantidade de páginas. As 186 definições de entrada fornecem nome, posição e tamanho; preservar posições, preenchimento e terminadores. Não usar separação por vírgula ou quebra de linha como substituto desse contrato.

## Relações entre partes visuais e dados

- Identificação: `NomePlano`, `PlanoReduzid`, `CNPJ`; pagador: `NomeSacado`, `CPF` e campos de endereço.
- Cobrança: `Vencimento`, `ValDoc`, `AgenCodCed`, `NumDoc`, `NossoNum`, `NumBanco`, `LinhaDig`, `Cedente`, `Carteira` e `Instrucao01` a `Instrucao05`.
- Extrato: grupos `Parcela01` a `Parcela12`, datas de pagamento, contribuições, taxas, totais e indicadores de pagamento. São campos repetidos explicitamente, não uma janela detalhe neste arquivo.
- Recursos: expressões dependem de `LogoBanco`, `LogoInst`, `LogoProd` e `PreImpressoV`. O pacote inclui cinco bitmaps de banco, outro bitmap, um JPEG e um GIF; quantidade de arquivos não equivale a quantidade de ocorrências visuais.
- Vários rótulos fixos estão em objetos `campoSaida`, junto com expressões variáveis. O tipo visual sozinho não distingue rótulo de dado. Comparar conteúdo e expressão no registro nativo.

## Códigos de barras distintos

No ExtratoBol, o código de barras usa `IF ( Rtrimm( CodBarras ) != " " ) CodBarras`, com `numChar=44`. `LinhaDig` é outro campo de entrada: editar a linha digitável não implica que o código de barras foi atualizado, e vice-versa.

Nos outros sete documentos, o código de barras usa `"147" | Mascara( ( ( _Pagenum + 1 ) / 2 ), "99999" )`, com `numChar=8` e orientação de 90 graus. É um identificador de controle de página, não o mesmo conteúdo de cobrança de 44 caracteres. Esses números são configurações observadas do exemplo; não representam validação de regras bancárias.

O `.f` declara `Sirius32.DLL` e 21 funções, entre elas `MASCARA` com dois parâmetros, `RTRIMM` e `MINMAI`. Declaração no arquivo não comprova exportação ou execução na DLL instalada. Ao editar, preservar expressão, parâmetros e contrato e conferir disponibilidade real no ambiente.

## Recursos e limites da verificação

A massa fornecida referencia `0058.gif`, `OAB-SP_instituidor_lgo.jpg`, `pOABPrev-SP_lgo.jpg` e `CAASP_instituidor_lgo.jpg`, ausentes no ZIP. Ela também usa `LogoBancoFP_033` sem extensão; existe `LogoBancoFP_033.bmp`, cuja resolução depende do motor, não foi comprovada nesta revisão. O pacote traz `0060.gif`, que não substitui automaticamente `0058.gif`.

Não copiar o caminho absoluto legado da massa para um novo projeto; resolver o recurso pelo armazenamento do projeto. Não inventar imagens ausentes ou trocar banco/plano por aproximação. Não copiar CPF, nomes de pagadores, valores e identificadores da massa real para memória geral, exemplos novos ou respostas.

Esta revisão confirmou a leitura estrutural do .f e as referências dos registros fornecidos; não executou preview/PDF nem validou dígitos verificadores, valores financeiros ou todas as variantes condicionais. Não há PDF ou DLL no ZIP. Imagens de dimensão zero no DTO têm geometria ainda dependente do recurso/motor; não concluir que estão invisíveis ou removê-las sem avaliar o recurso.

## Aplicação na edição e criação

Antes de editar, reler o `.f` atual, identificar documento e condição, objeto e caminho nativo, além do segmento interno quando houver. Desambiguar pedido de “código de barras” entre cobrança e controle apenas se o contexto não o identificar. Usar seleção e conteúdo já informados; perguntar só o que faltar.

Preparar proposta limitada à propriedade solicitada, preservar campos de entrada, expressões, recursos e documentos não atingidos; validar margens, sobreposições e texto. Depois de salvar uma cópia, reler e comparar alterações. Para fechar validação de boleto preenchido, executar preview/PDF com massa e recursos disponíveis, testando as condições relevantes. Conhecer este exemplo não comprova que um outro projeto aberto tenha a mesma estrutura ou que a execução esteja correta.

Evidência local: `output/boleto-memory-validation/estrutura.json`; análise reproduzível em `tmp/boleto-memory/analyze.cjs`. O JSON contém inventário e hashes, sem valores pessoais dos registros. O original e o backup não foram modificados.

