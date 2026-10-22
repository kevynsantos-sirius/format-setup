# Numeração de controle do boleto no preview Web

Revisão em 22/10/2026, usando as expressões de controle do Boleto Instituídos. O original foi preservado. A comparação fornecida pelo usuário mostra o primeiro par de páginas com sufixo `00001` também no verso.

## Causa e correção

Na página física 2, `_PageNum=2` e a expressão `((_Pagenum + 1) / 2)` era calculada como `1.5` pelo preview. A chamada real a `MASCARA("1.5", "99999")` devolveu `1 5  `; `MASCARA("1", "99999")` devolveu `00001`. A DLL era chamada; a divergência surgia no argumento produzido antes dela.

O avaliador agora preserva a divisão inteira quando os operandos são inteiros, inclusive contadores e resultados intermediários, truncando em direção a zero. Valores com decimal explícito continuam fracionários: `3 / 2 = 1`, mas `3.0 / 2 = 1.5`. A correção pertence ao avaliador aritmético; não substitui `MASCARA` por implementação local nem muda o `.f`, sua expressão ou a convenção de `_PageNum` começando em 1.

Para o primeiro par, os controles esperados são `489814700001` no texto/Code 128 e `14700001` no código vertical; para o par seguinte, `489814700002` e `14700002`.

## Verificação e limites

Os testes novos cobrem oito páginas, divisão com precedência, números negativos e decimais explícitos; os testes específicos existentes de Code 128 e barcode importado também passaram. A comparação contra o código anterior reproduziu falha nos dois testes novos. A suíte completa tinha seis outras falhas antes desta correção e mantém as mesmas seis; isso foi separado da regressão de numeração.

A validação HTTP usa cópias em memória das expressões originais de OABPrevSP, dados sintéticos de dois registros e duas repetições, backend isolado e chamadas reais ao format-api/Sirius32. Isso verifica os controles de página sem expor os dados de clientes. Não equivale a validar financeiramente o boleto ou todas as páginas preenchidas do projeto. Evidência em `output/boleto-numbering-validation/resultado.json`.

Ao diagnosticar uma divergência semelhante, conferir `_PageNum` efetivo, valor numérico intermediário, argumentos enviados à DLL e retorno. Um catálogo de exports ou um teste com a página 1 sozinho não prova a execução correta no verso. Não remendar o resultado com zeros adicionados ao final: corrigir o cálculo e validar texto e payload dos códigos de barras juntos.
