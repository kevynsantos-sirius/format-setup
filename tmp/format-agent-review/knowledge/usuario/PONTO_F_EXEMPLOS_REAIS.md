# Exemplo real de cobrança/boleto

Existe um exemplo real de Ponto F de cobranca/boleto usado para orientar a IA sobre casos praticos.

Resumo em linguagem de usuario:

- O exemplo representa uma cobranca/boleto completa.
- Ele usa um arquivo de Ponto F, uma massa de dados, um recurso visual e um PDF gerado como resultado.
- Diferente de uma carta simples, um boleto nao e apenas texto fixo. Ele tem muitos campos variaveis, como dados do cliente, valores, datas, identificadores e linha/codigo de cobranca.
- O exemplo tambem possui codigo de barras.
- Ao pedir alteracoes em boleto/cobranca, o usuario deve tentar dizer qual parte visual deseja alterar: titulo, instrucoes, valor, data, cliente, codigo de barras, rodape, recurso visual ou campo variavel.
- Para modificacoes automaticas, a IA deve ser cuidadosa: campos variaveis dependem da massa de dados e precisam ser validados no preview/PDF antes de finalizar.

Esse exemplo ajuda a IA a entender que existem Ponto F simples, como cartas, e Ponto F mais completos, como cobrancas com campos variaveis e codigo de barras.
