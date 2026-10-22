# Chat do Format: identificação e operações no .f

Atualizado em 22/10/2026.

Selecione um elemento ou descreva seu tipo, nome, trecho e documento. A seleção limita os candidatos; um pedido incompatível com a seleção não pode editar outro item. O trecho entre aspas identifica o alvo e não substitui o conteúdo.

Exemplos:

- “Edite o campo texto que contém o início do conteúdo 'Prezado(a)' para Arial, tamanho 12”.
- “Altere a janela detalhe LIN01 condição de impressão para 'TipoDet = 30'”.
- “Crie um texto em X 10 Y 20 largura 80 altura 15 conteúdo 'Aviso'”.
- “Renomeie documento Frente43 para 'CartaRevisada'”.

Se houver repetição, escolha um candidato. Se faltarem dados, o chat pergunta ou apresenta um formulário com as propriedades disponíveis do alvo. A interface localiza o registro visual e o backend confirma tipo, geometria e conteúdo no arquivo nativo. O ID técnico combina o hash do .f com o caminho nativo e fica sob responsabilidade da aplicação; o usuário não precisa digitá-lo.

O alvo ou destino recebe contorno verde. Na criação de componentes, uma prévia com contorno tracejado mostra o novo item antes da gravação. Confira os valores anteriores e propostos. **Aplicar e salvar nova versão** grava uma nova versão do .f depois de confirmar novamente o hash e a releitura. **Cancelar** não grava. O arquivo anterior permanece disponível nas versões do projeto. Este fluxo substitui o comportamento inicial de aplicar apenas ao rascunho e depois clicar em Salvar.

Salve ou desfaça edições manuais pendentes antes de iniciar. Se o estado visual ou o .f mudar após a proposta, refaça o pedido. A proposta expira em 15 minutos e está vinculada ao usuário e ao projeto.

O contrato cobre documentos, bandas de cabeçalho/detalhe/rodapé/sumário e os componentes do editor: texto, saída calculada, imagem, fio/retângulo/elipse, código de barras, QR code, janela detalhe e bloco de endereço. Há criação, duplicação, remoção e edição das propriedades escalares reconhecidas. Uma propriedade sem efeito no formato nativo é recusada. Bandas não admitem os tipos que o formato legado não comporta. A remoção do último documento, documento principal ou última banda de detalhe é recusada.

Tamanho de formulário, orientação e outras configurações compartilhadas afetam todos os documentos. A proposta informa esse efeito. O chat não adapta silenciosamente a caixa quando a fonte aumenta: confira cortes e quebras de linha no preview.

## Confirmação técnica

O backend lê o .f e constrói o inventário de documentos, componentes e bandas, com caminhos como documento → janela → grupo/slot → lista nativa. O JavaScript relaciona a seleção e o elemento renderizado ao inventário; o índice no DOM sozinho não autoriza uma edição.

Antes de planejar, o gravador deve reproduzir exatamente o hash binário original. Se houver bytes opacos não preservados, a operação é recusada. A edição ocorre sobre o modelo nativo original. Conversores de DTO são usados como controle para descobrir diferenças explícitas do alvo, sem substituir os outros registros. Fontes e trechos literais de texto têm tratamento específico para conservar fórmulas e tokens. A cópia resultante é relida e comparada integralmente ao modelo esperado antes de ser oferecida para aplicação.

APIs do Format Web: POST /api/ai/editor/inspect, /resolve, /plan e /apply. Todas verificam o acesso ao projeto; aplicar exige o plano guardado pelo servidor, não um .f criado pelo modelo. No format-agent, /api/editor/resolve interpreta e desambigua o inventário. A interpretação por si só não prova o binário. As ferramentas /api/pontof/identificar, /planejar-operacao e /aplicar-operacao chamam as APIs nativas autenticadas do Format Web.

A interpretação usa regras locais e os campos efetivamente fornecidos pelo contrato, sem aumentar o modelo Ollama. Pedidos fora dessa interpretação precisam de esclarecimento ou do formulário. O agente não inventa nomes de funções, estruturas binárias ou arquivos de imagem.

## Histórico das verificações anteriores

### Aprendizados verificados em 21/10/2026

- A fonte interna prevalece sobre a fonte do campo. Alterar somente font/color pode produzir uma diferença no JSON sem efeito visível. Conferir os FontDescriptor e reler o .f.
- A renderização e o desfazer/refazer devem usar cópias para normalização visual; uma simples atualização da tela não pode reescrever expressões de imagens nem dimensões do documento. O teste pela interface detectou essa diferença e a gravação a recusou antes da correção.
- A gravação de formatação usa alteração dos tokens de fonte existentes. Não reconstruir fórmulas, tokens de imagens ou conteúdo literal apenas para mudar a fonte.
- Documentos e textos condicionais precisam de massas separadas para cobrir cada ramo. Não alterar as condições do .f para tornar o teste visível.
- O ZIP NovoTeste fornecido contém o .f e um arquivo de dados. Não contém as imagens externas referenciadas. Preservar essas referências não comprova a presença dos arquivos de imagem.
- Na validação anterior, 24 textos em 12 documentos foram cobertos por 21 cenários de preview. Houve releitura do binário e comparação de 663268 campos do modelo, sem mudança inesperada. Essa evidência pertence à cópia e à edição testadas; não valida automaticamente outros pedidos.
- O motor nativo falhou no original e na cópia com “Erro na carga da fonte windows” e falha de acesso no Wine. Isso não identifica, por si só, a fonte específica nem comprova que imagens ou DLL sejam a causa.
- PDF de capturas do preview Web não é PDF do motor FormatBSP. Informar essa diferença e não declarar impressão final validada sem o artefato nativo.
- O JAR instalado no Maven pode estar desatualizado mesmo mantendo a versão 1.0.0. Nesta revisão havia um manager de setembro no cache do usuário. Instalar o manager dos fontes atuais antes de empacotar o backend e usar o mesmo repositório Maven nos dois comandos.
- Uma conversão genérica do documento pode normalizar atributos além do campo solicitado. Para a edição pelo chat, a gravação restrita compara o modelo inteiro e conserva os bytes originais fora dos registros de texto; não confiar apenas em uma mensagem de sucesso ao salvar.

- No teste do chat, Frente43 tinha quatro candidatos com início Prezado(a). Após escolher o campo e aplicar Arial 12, a releitura confirmou somente quatro propriedades nativas alteradas no alvo, entre 663268 campos comparados. A massa original permaneceu idêntica.
- No preview de Frente43, Arial 12 produziu 1181 px de conteúdo em uma caixa de 1018 px. A fonte e o tamanho podem mudar a quebra de linhas e cortar conteúdo, mesmo sem alterar outros itens. Avisar o usuário e revisar o preview; não aumentar a caixa automaticamente sem um pedido explícito.

## Integração e verificação

`frontend/src/editor/aiEditPlan.js` resolve candidatos e monta alterações explícitas de folhas com snapshot SHA-256. `aiEditorBridge.js` obtém o estado atual, destaca o alvo e aplica somente o campo revisado ao histórico do editor. O caminho antigo de edição genérica em `/api/ai/chat` orienta o usuário a usar esse fluxo e não grava binários implicitamente.

As instruções de formatação são resolvidas por regras locais, sem inferência adicional nem aumento do modelo Ollama. Consultas gerais continuam usando o format-agent. A memória do agente deve distinguir seus endpoints de rascunho JSON do fluxo de edição visual do Format Web.

Antes de compilar o backend, execute `mvn -f format-manager/pom.xml install` e depois `mvn -f format-web/pom.xml package`, com as mesmas opções de settings/repositório local. O teste opcional do NovoTeste pode ser executado com `-Dtest=LegacyTextFormattingTest,AiTextFormattingPersistenceTest -Dformat.legacyFixture=C:/caminho/para/ApoliceVD2_P1.f test`; ele usa cópias temporárias e verifica que o arquivo fornecido permanece intacto.

## Execução local e Docker

O backend local usa o agente em http://127.0.0.1:3217 por padrão. Configure FORMAT_LLM_API_URL para outro host. No Docker Desktop, o compose usa http://host.docker.internal:3217 para alcançar o agente do Windows. Reinicie o backend após instalar o manager e empacotar o Format Web; mudanças de DTO e novos controllers não devem depender de hot reload parcial.

## Aprendizado adicional: conteúdo dos códigos

Conteúdo de código de barras e QR code deve ser texto, mesmo quando contém apenas dígitos. O leitor não deve transformá-lo em número JSON, pois isso impede a edição textual e pode perder zeros. O contrato normaliza esse transporte e mantém os bytes da expressão nativa quando a propriedade não foi editada.

As medidas são ajustadas à resolução nativa de 300 dpi; a revisão mostra o valor efetivo e, quando diferente, o valor solicitado.

## Limites e cartas (22/10/2026)
O Y de texto é a base da caixa no formato legado; o gerador de cartas recebe o topo e soma a altura antes de gravar. Molduras também exigem conversão para a âncora nativa. Linhas e imagens têm convenções distintas. A criação de cartas e o planejamento nativo validam as caixas após reler o .f, incluindo rotação e limites das bandas. Novas violações são recusadas. Violações antigas sem mudança de geometria são reportadas sem reposicionar outros itens.
Verificar limites físicos não comprova margens de composição, ausência de sobreposição ou ajuste do texto dentro da caixa. Não afirmar que o layout inteiro está correto apenas porque as caixas cabem na página.


## Validação antes de gravar: composição e ajuste de texto
A criação pelo chat, os planos nativos e o salvamento comum verificam margens, sobreposições e texto estático após reler o .f candidato. O arquivo candidato fica temporário; erros novos impedem uma nova versão e não sobrescrevem o .f anterior.
As margens de composição começam em 10 mm nos quatro lados. No chat do editor, Margens e verificação do layout permite definir o padrão do projeto e substituí-lo por documento. A configuração fica no recurso validation/composition-policy.json, separada dos deslocamentos de impressora do legado. Mudar margens invalida propostas nativas já abertas.
Sobreposição considera polígonos rotacionados e espaços de coordenadas de cada banda. Texto completamente contido em moldura é composição intencional; linhas de grade podem se cruzar. Condições diferentes não provam exclusão: a sobreposição condicional aparece como aviso e exige conferência com dados.
Textos estáticos usam métricas de fonte, estilos e trechos internos, quebra de palavras, entrelinha e área útil descontada da borda. Campos calculados, códigos, endereços, repetição de janelas, objetos incorporados e fontes ausentes ou condicionais não recebem certificação de ajuste: aparecem como avisos que devem ser revisados. Problemas antigos sem mudança relevante permanecem visíveis como avisos; não são reposicionados silenciosamente. O salvamento comum exige confirmação dos avisos; erros novos não são liberados por essa confirmação.
A API POST /api/ai/editor/preflight avalia o rascunho contra o .f atual; /policy lê ou salva margens com autorização do projeto. A avaliação definitiva é feita no binário candidato relido antes de gravar. A checagem prévia de JSON não substitui essa releitura.


## Histórico do chat em Meus Projetos
Na tela Meus Projetos, criar ou desfazer uma ação da IA atualiza os cartões por callback, sem navegar ou recarregar o documento do navegador. As mensagens e o estado aberto do chat permanecem na mesma instância React. Fechar e reabrir o painel conserva as mensagens dessa tela. Uma falha na atualização da lista exibe aviso e mantém a resposta da IA. Respostas antigas de listagem são ignoradas quando uma consulta mais recente já foi iniciada.

## Pedidos de cor e identificação por conteúdo
“Mude a cor do campo texto com a escrita \"Projeto IA\" para azul” filtra o conteúdo literal antes de contar candidatos. Se título e assunto contêm esse trecho, a pergunta deve mostrar somente esses dois alvos. Selecionar um deles e pedir “coloque a cor azul nesse componente que selecionei” identifica a seleção atual no .f e prepara somente a alteração de cor, sem pedir posição, dimensões ou conteúdo.
Nomes de cores e códigos #RRGGBB são interpretados fora dos trechos entre aspas; um texto chamado “azul em Arial X 15” não autoriza mudar cor, fonte ou posição. Azul usa #0057B8, o padrão já usado pelo editor. A proposta mostra o valor exato antes de aplicar. Uma cor ausente ou ambígua exige somente esclarecer a cor; uma resposta curta mantém o alvo já escolhido e a verificação de versão. Se o contrato nativo do alvo não oferece cor de texto, informar essa limitação, sem abrir um formulário de posição nem editar outro item.

## Propriedades informadas e esclarecimentos mínimos
Com alvo e alteração completos, preparar a proposta diretamente. Isso vale para fonte, tamanho, X/Y, largura, altura, rotação, estilos, bordas, condições e propriedades específicas dos tipos expostos. As propriedades são conferidas contra os campos do registro atual no .f, inclusive documentos, janelas detalhe e bandas. Uma propriedade não suportada impede a proposta inteira: não aplicar silenciosamente a parte entendida.
Em “fonte Arial, tamanho, X 20”, perguntar somente o tamanho. A resposta “12” mantém Arial, X 20 e o alvo já identificado. Em várias respostas, conservar também os valores esclarecidos nas etapas anteriores. O formulário mostra apenas as propriedades ausentes, sem seletor genérico de posição. Escolher entre candidatos mantém o pedido e os valores acumulados; selecionar explicitamente outro item em um novo pedido exige nova identificação visual e nativa.
Coordenadas sem unidade seguem os milímetros do editor; cm e polegadas explícitos são convertidos. Números, estilos ou cores no conteúdo literal entre aspas não viram instruções. Nomes personalizados de fonte podem ser informados entre aspas; fontes ausentes continuam sujeitas aos avisos da validação nativa. Para uma propriedade escalar específica sem apelido conhecido, é possível solicitar, por exemplo, `mude a propriedade "ratio" para 2`; o campo deve existir no contrato do alvo e seu valor deve ter o tipo correto.
A proposta passa pela mesma confirmação do alvo, limites, margens, sobreposições, ajuste de texto e releitura do binário antes de salvar. Um pedido completo dispensa perguntas de preenchimento, mas continua exigindo revisão antes da gravação. Isso não dá ao modelo autorização para inventar campos, contornar validações ou modificar outros itens.

## Histórico após aplicar no editor
Aplicar uma proposta atualiza o documento dentro do editor, sem recarregar a página nem remontar o chat. O editor usa o layout canônico relido e conferido na proposta que o backend confirmou ao salvar. O estado de rascunho, as configurações, o documento ativo e a seleção são atualizados; o histórico de desfazer manual recebe uma nova base para não restaurar silenciosamente a versão anterior à gravação nativa. O histórico de mensagens permanece no painel, inclusive após aplicações consecutivas e ao fechar/reabrir o chat.
Se a gravação foi confirmada e a atualização visual falhar, a resposta informa que o arquivo foi salvo. O botão Atualizar documento salvo relê a versão atual sem repetir a gravação. Novos pedidos pelo chat aguardam essa atualização; uma falha temporária mantém mensagens e permite tentar novamente.

## Conversas persistentes por conta e projeto
O histórico do editor é salvo na conta do usuário, separado por projeto. Meus Projetos usa uma única conversa geral da conta, independente do projeto criado ou aberto. As mensagens ficam no banco, na tabela ai_chat_messages; recarregar a página, fechar a aba, reabrir o projeto ou usar um navegador sem armazenamento local recupera a conversa. Usuários diferentes têm históricos separados, mesmo em projetos compartilhados; a autorização atual do projeto é conferida ao ler e acrescentar mensagens.
GET /api/ai/history recebe scope=editor e projectId, ou scope=dashboard. POST no mesmo endpoint acrescenta mensagens com id de cliente, papel user/assistant, texto e data. A repetição do mesmo id é idempotente; não é permitido substituir seu conteúdo. Escritas são serializadas por conta e somente acrescentam mensagens, preservando envios de outras abas. Não há corte silencioso de mensagens antigas.
Antes de sincronizar, o navegador grava uma cópia local e os ids pendentes, separados por conta/conversa. Após uma falha de conexão, reabrir ou tentar sincronizar reenvia os pendentes sem duplicá-los. A interface indica carregamento, gravação ou erro de sincronização. Essa cópia é recuperação de transporte; o banco é o armazenamento persistente principal.
As mensagens são restauradas sem reativar propostas antigas ou autorização para aplicar. A continuidade usa o resumo de tarefa descrito abaixo e sempre confirma novamente o alvo no .f atual. Histórico pessoal do chat e índice de memória técnica são armazenamentos separados.

## Contexto para continuar depois de reabrir
O backend recupera o histórico recente da conta/conversa e mantém, por projeto, um resumo da última tarefa: pedido, intenção, alvo/candidatos nativos, hash, impressão do registro e situação de esclarecimento, proposta ou gravação confirmada. O resumo é produzido pela resolução nativa e correlacionado à proposta; um plano antigo de outra aba não pode marcar uma tarefa nova como aplicada. Conversas de outros usuários ou projetos não são usadas.
Depois de reabrir, “12” pode completar o tamanho que faltava em “Tahoma, tamanho”; “continue” pode reconstruir uma proposta pendente. Toda retomada relê o .f, identifica o registro atual, mostra o alvo e gera um novo planId sujeito às validações usuais. Uma tarefa já salva é informada como concluída, sem repetir a alteração. “Agora tamanho 14” usa apenas essa nova mudança no alvo atual, sem reaplicar a fonte, cor ou posição do pedido anterior.
A impressão nativa e o contexto do alvo são comparados ao inventário atual. Mudança não relacionada no arquivo pode manter um alvo único e intacto. Alvo alterado, desaparecido ou duplicado exige nova identificação/confirmação; posição na lista ou ponteiro antigo sozinhos não bastam. Uma seleção atual explícita tem prioridade em um novo pedido, mas não recebe silenciosamente os valores pendentes de outro alvo. Conversas antigas sem resumo podem recuperar um seletor literal de uma solicitação do usuário, sempre resolvido contra o arquivo atual; texto de respostas do assistente não autoriza comandos.
Consultas recebem até 24 mensagens recentes do banco; o modelo de consulta recebe somente um extrato de três mensagens curtas e um resumo curto, como dados delimitados. O perfil permanece qwen2.5-coder:0.5b, CPU com duas threads e contexto 2048. O modelo continua ordenando evidências verificadas; não passa a executar comandos ou gravar binários livremente. Mensagens pessoais e resumos de tarefas não são copiados para o índice global de conhecimentos.

