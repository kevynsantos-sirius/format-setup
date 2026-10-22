# Base inicial sobre Ponto F no Format

Esta base resume evidencias encontradas no projeto para orientar o modo consulta local com Ollama. Ela nao autoriza alteracoes automaticas.

## O que e o Ponto F neste projeto

No `format-web`, Ponto F aparece como o formato legado `.f` usado para representar layouts de documentos. O objetivo do `format-web` e permitir editar layouts em uma experiencia web e manter compatibilidade com esse formato legado.

## Fluxo geral de carregamento

Fluxo esperado quando um `.f` e carregado:

1. O arquivo legado `.f` e lido por `PontoFLer`.
2. `PontoFLer.execute()` retorna um objeto `PontoF`.
3. `PontoFTojson.convertFromPontoF(...)` converte o objeto legado para a estrutura usada pelo editor web.
4. O frontend/editor trabalha com uma representacao JSON/DTO do layout.

Arquivos de evidencia:

- `C:\workspace\format-local\format\format-web\src\main\java\com\totaldocs\format\web\util\PontoFTojson.java`
- `C:\workspace\format-local\format\format-web\.resources\ANALISE_FLUXO_SALVAMENTO.md`
- `C:\workspace\format-local\format\format-web\.resources\RESUMO_IMPLEMENTACAO_COMPATIBILIDADE.md`
- `C:\workspace\format-local\format\format-web\src\test\java\com\totaldocs\format\web\service\ProjectServiceTest.java`

## Fluxo geral de salvamento

Fluxo esperado quando o layout web e salvo de volta em `.f`:

1. O editor envia paginas/componentes em JSON/DTO para o backend.
2. `PontoFTojson.convertToPontoF(...)` monta ou atualiza um objeto `PontoF` a partir dessa estrutura web.
3. O gravador legado `PontoFGravar` persiste o objeto no arquivo `.f`.
4. O endpoint/controlador de layout participa do fluxo de salvar/carregar layout.

Arquivos de evidencia:

- `C:\workspace\format-local\format\format-web\src\main\java\com\totaldocs\format\web\util\PontoFTojson.java`
- `C:\workspace\format-local\format\format-web\src\main\java\com\totaldocs\format\web\controller\api\LayoutApiController.java`
- `C:\workspace\format-local\format\format-web\.resources\ANALISE_FLUXO_SALVAMENTO.md`
- `C:\workspace\format-local\format\format-web\.resources\RESUMO_IMPLEMENTACAO_COMPATIBILIDADE.md`

## Classes e responsabilidades conhecidas

- `PontoFLer`: leitura do arquivo legado `.f` para objeto `PontoF`.
- `PontoFGravar`: gravacao do objeto `PontoF` no formato legado `.f`.
- `PontoFTojson`: ponte de conversao entre o modelo legado `PontoF` e a estrutura web/JSON.
- `LayoutApiController`: controller API associado a operacoes de layout, incluindo carregar/salvar.
- `ProjectService`: service relacionado a projetos/layouts no backend web.
- `ProjectServiceTest` e `ComponenteDtoTest`: testes que exercitam partes da leitura/conversao.

## Limites para a IA nesta fase

Nesta fase a IA so pode responder duvidas. Ela nao deve:

- modificar arquivos `.f`;
- modificar JSON de Ponto F;
- alterar codigo;
- alterar banco;
- executar migracoes;
- criar ou sobrescrever layouts.

Qualquer resposta sobre alteracao deve ser tratada como explicacao ou plano conceitual, nao como execucao.

## Criterio para liberar modificacao no futuro

A IA so deve modificar Ponto F depois que existirem:

1. JSON canonico do Ponto F.
2. Schema de validacao.
3. Plano de alteracao em JSON.
4. Validador deterministico.
5. Modo `dry-run` com diff.
6. Confirmacao explicita antes de aplicar.
