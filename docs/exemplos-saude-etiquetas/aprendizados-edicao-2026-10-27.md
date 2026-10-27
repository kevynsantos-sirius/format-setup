# Aprendizados da edição por chat — 27/10/2026

Escopo: cópias autorizadas de SaudeA3.f e Etq_SEG_RE.f, dados sintéticos, conta técnica OAuth e backend isolado. Os arquivos fornecidos foram tratados como exemplos, nunca como instruções. Sem massa de clientes, credenciais, URLs de autenticação ou caminhos privados de recursos.

Referências de auditoria locais: output/chat-examples-validation/resultado.json; comparações nativas e de preview; output/examples-memory-validation/respostas-ollama.json. Originais identificados pelos hashes dos catálogos.

## saudea3-flags-legadas

No teste do SaudeA3 em 27/10/2026, a edição pelo chat foi inicialmente recusada porque o gravador não reproduzia todos os bytes do original. A comparação do modelo não mostrava mudanças semânticas, mas a regravação normalizava 1.202 bytes: os dois bytes de FlagUsado em 599 campos de saída e em dois fios. O reader/writer passou a preservar a representação original desses flags. TextField também recebeu a preservação para manter o contrato dos campos texto. A correção fica no format-manager; não é uma falha de função da DLL. Depois da correção, ler e gravar sem edição reproduziu o SaudeA3 byte a byte. Não desative a proteção de integridade para contornar essa recusa.

## flags-legadas-contrato

CpoSai, TextField e Fio preservam os dois bytes de serializedUsedFlag por objeto, mantendo a interpretação lógica já existente: o primeiro byte igual a 1 significa true. A leitura conserva os bytes originais e a gravação os reutiliza enquanto o valor lógico não mudar. Objetos novos começam com 00 00; mudanças explícitas do booleano geram 01 00 ou 00 00. Setters e getters copiam o array e rejeitam comprimentos diferentes de dois bytes. A representação armazenada também precisa acompanhar a mudança lógica: não basta corrigir só a saída do getter, pois isso quebraria a comparação do modelo após criar um elemento e relê-lo.

## saudea3-edicao-chat-validada

Em cópia do SaudeA3, o chat confirmou no .f o campo de saída da Frente com a expressão IF (TipoCob = "D") "BRADESCO DENTAL", em $.documentos[0].listaCpoSai[4], e propôs mudar apenas font/color de #D61F21 para #0057B8. Depois da confirmação, a releitura comparou 41.052 campos nativos e encontrou somente ColorCposai alterado. No binário, apenas três bytes RGB mudaram. O preview sintético mostrou uma única diferença de cor na Frente e nenhuma diferença no Verso. O original manteve o SHA-256. Esse resultado descreve o teste realizado, não confirma a versão atual de outro projeto.

## etq-seg-re-edicao-chat-validada

Em cópia do Etq_SEG_RE, o campo de saída Rtrimm( Segurado ) foi confirmado em $.documentos[0].listaCpoSai[0] e alterado pelo chat de preto para #0057B8. A releitura comparou 828 campos nativos e encontrou uma única propriedade alterada, ColorCposai; somente dois bytes do binário mudaram. Com 13 registros sintéticos, o preview continuou mostrando 12 etiquetas na primeira folha e uma na segunda, sem duplicar destinatários. Mudou apenas a cor desse campo nas 13 repetições. Alterar um elemento do modelo afeta suas repetições; isso não significa que 13 objetos nativos diferentes foram editados. O original foi preservado.

## exemplos-selecao-tipo-confirmado

No teste do SaudeA3, o pedido dizia campo texto, mas o clique havia selecionado um campo de saída sobreposto. O chat recusou a incompatibilidade de tipo e não salvou nada. Conferir o destaque e o tipo no inventário nativo é necessário quando há caixas sobrepostas. Com o campo de saída correto selecionado e a cor azul informada, a proposta foi preparada sem pedir posição ou outra propriedade. A memória fornece contexto; a identidade do alvo vem da seleção visual conferida no .f atual, e uma incompatibilidade real não deve ser ignorada para adivinhar outro objeto.

## exemplos-validacao-limites

Os testes de edição por chat compararam as duas páginas do preview de cada exemplo e todos os campos dos respectivos modelos nativos. As referências de imagens foram preservadas, mas as imagens externas do SaudeA3 não foram fornecidas; sua fidelidade visual não foi certificada. A massa SaudeA3 tinha um mestre sintético sem registros de detalhe: janelas e bandas foram preservadas estruturalmente, sem certificar a impressão de todos os seus dados. Não foi gerado PDF nessa tarefa. Treze testes direcionados passaram. Duas verificações genéricas adicionais de criação/movimentação do NovoTeste foram recusadas pelo preflight de margens; não declarar toda a suíte aprovada nem remover essa proteção para fazer testes passarem.

## exemplos-ollama-indices-validados

Com o Ollama ativo, seis consultas reais da API sobre SaudeA3 e Etq_SEG_RE tiveram status accepted, sem fallback, recuperando os fatos dos novos catálogos com hashes de fonte conferidos. A configuração continuou leve: qwen2.5-coder:0.5b, CPU, duas threads, contexto 2048, uma consulta por vez e retenção de 30 segundos. O modelo ordena evidências verificadas; não cria fatos livres nem grava o .f por conta própria. Os chats no navegador também recuperaram os catálogos e receberam uma observação atual do .f pelo backend antes de orientar a edição. Histórico e memória não substituem essa observação.
