# Registro de Decisões

Use este arquivo para guardar decisões importantes sobre SOU, Me Ensina AI, produtos, operação, marca e estratégia.

## Formato

```md
## AAAA-MM-DD - Título da decisão

- Decisão:
- Contexto:
- Opções consideradas:
- Motivo:
- Riscos:
- Como revisar no futuro:
```

## Decisões

## 2026-08-03 - Fábrica de carrosséis usa aprovação humana e publicação em quatro grupos

- Decisão: operar uma fábrica de carrosséis recebendo ideias, áudios, imagens e links pelo Telegram, transformando o material em roteiro, oito cards e legendas adaptadas, com aprovação explícita de Fabio antes de qualquer agendamento.
- Distribuição: Instagram e Facebook compartilham um grupo de publicação com oito imagens; TikTok recebe oito imagens e legenda sem acentos; LinkedIn recebe somente a capa e uma legenda longa; X recebe somente a capa e texto de até 260 caracteres. YouTube permanece fora do carrossel enquanto o Post for Me não suportar esse formato.
- Cadência: reservar dois horários por dia, 12 PM e 8 PM no fuso de Nova York, seguindo a ordem das peças aprovadas.
- Contexto: Fabio quer enviar referências durante o dia e receber as peças prontas para aprovar, sem depender de estar diante do computador.
- Motivo: transformar curadoria espontânea em produção recorrente, mantendo controle humano sobre marca, fatos e publicação.
- Segurança: resultado incerto da API nunca autoriza repetição cega; fica em verificação manual. Instalação começa obrigatoriamente em `dry-run`; ativação real, credencial, conta e primeiro teste agendado exigem gates separados de Fabio.
- Estado registrado: implementação local revisada com 532 testes passando. Nenhuma publicação real foi feita. A instalação em `dry-run` foi autorizada, mas ficou pendente porque o túnel SSH do Mac Mini caiu e a conexão direta não respondeu.
- Como revisar no futuro: depois do primeiro teste isolado aprovado e confirmado no Post for Me, revisar confiabilidade, qualidade das peças, taxa de aprovação, cadência e desempenho por rede.

## 2026-07-07 - SOU significa Fabio + Me Ensina AI

- Decisão: tratar SOU como o sistema completo Fabio Borges + Me Ensina AI + ofertas + método + operação.
- Contexto: o dossiê recebido definiu que SOU não é uma empresa separada nem um produto.
- Motivo: evitar confusão entre pessoa, empresa e operação.
- Riscos: o Codex tratar SOU como entidade jurídica separada ou inventar estrutura inexistente.
- Como revisar no futuro: revisar se Fabio formalizar SOU como empresa, holding ou produto independente.

## 2026-07-07 - Meta principal é US$ 100 mil por mês

- Decisão: usar US$ 100 mil/mês como bússola estratégica.
- Contexto: meta declarada e recorrente no dossiê.
- Motivo: orientar priorização, foco e avaliação de oportunidades.
- Riscos: abrir projetos que parecem interessantes mas não aproximam a empresa da meta.
- Como revisar no futuro: quando Fabio definir metas intermediárias ou mudar a meta financeira.

## 2026-07-07 - [Substituída em 2026-07-26] Business Accelerator com preço de referência US$ 3.500 ou 5x US$ 890

- Decisão: decisão histórica substituída pela confirmação de US$ 2.600 em 26 de julho de 2026.
- Contexto: preço anterior citado como US$ 2.600; houve transição.
- Motivo: manter contexto comercial para propostas e análises.
- Riscos: usar preço errado para cliente em lote antigo ou condição especial.
- Como revisar no futuro: confirmar tabela oficial atual antes de qualquer uso externo.

## 2026-07-26 - Escada permanente das três ofertas

- Decisão: organizar as três ofertas permanentes pelo nível de participação do cliente.
- Seu Sócio de IA: o cliente recebe a fundação, aprende e constrói. Preço público de US$ 143.
- Business Accelerator: a Me Ensina AI conhece o negócio, cria de 40 a 80 agentes, instala e entrega um plano de ação; o empresário comanda os agentes. Preço confirmado de US$ 2.600, sem exibição na página.
- Consultoria com Implementação: a Me Ensina AI entra na operação, cria agentes, implementa automações e integrações, treina o time e acompanha a adoção.
- Contexto: Business Accelerator e Consultoria estavam com promessas quase idênticas no site.
- Motivo: deixar claro que a diferença principal é quem conduz a implementação e a operação, não o tamanho da empresa.
- Riscos: voltar a apresentar BA e Consultoria como a mesma oferta; usar a marca A Nova Era da IA no lugar de Seu Sócio de IA; ou publicar depoimentos e resultados não documentados.
- Provas: enquanto não houver depoimentos reais aprovados, usar exemplos demonstrativos com empresas e dados fictícios, identificados como simulação.
- Como revisar no futuro: revisar depois dos primeiros dados de conversão e dos primeiros depoimentos documentados.

## 2026-07-26 - Home sem preço e marca unificada como Seu Sócio de IA

- Decisão: não mostrar preço na página inicial. O valor de US$ 143 permanece na página própria de vendas do Seu Sócio de IA.
- Contexto: a home funciona como página de escolha entre três níveis de participação, não como checkout da oferta de entrada.
- Decisão de marca: usar “Seu Sócio de IA” em toda a comunicação escrita. A URL legada `/nova-era` pode ser mantida para evitar mudança estrutural e risco ao rastreamento.
- Responsabilidade exibida: no Business Accelerator, Fabio Borges constrói e o cliente opera; na Consultoria, Fabio Borges constrói e Fabio Borges, a equipe da Me Ensina AI e o time do cliente implementam e operam em conjunto.
- Vídeos: manter espaço provisionado nas páginas do Business Accelerator e da Consultoria.
- Motivo: reduzir confusão entre as ofertas, preservar a estrutura técnica existente e conduzir o visitante para a página ou conversa adequada.
- Riscos: o caminho `/nova-era` divergir do nome público; o preço voltar a aparecer na home; ou a copy atribuir a construção genericamente à empresa e apagar a autoridade pessoal de Fabio.
- Como revisar no futuro: medir cliques da home para cada oferta e revisar depois que houver dados de conversão suficientes.

## 2026-07-07 - Regra de pricing: soma dos dígitos deve dar 8

- Decisão: todo preço novo proposto deve respeitar a soma dos dígitos igual a 8.
- Contexto: padrão de pricing da casa.
- Motivo: preferência estética/estratégica de Fabio.
- Riscos: sugerir preços desalinhados com a regra.
- Como revisar no futuro: somente se Fabio mudar explicitamente a regra.

## 2026-07-07 - Discurso nunca deve ser anti-emprego

- Decisão: nunca usar linguagem de "demitir", "trocar funcionário por IA" ou "parar de pagar gente".
- Contexto: o público de Fabio contrata e paga pessoas nos EUA.
- Motivo: respeitar o cliente, o trabalhador e o posicionamento da Me Ensina AI.
- Riscos: ofender o público, parecer ameaça ao time do cliente ou enfraquecer confiança.
- Como revisar no futuro: regra permanente.

## 2026-07-07 - CTA padrão é COMENTA NOVA ERA

- Decisão histórica substituída em 2026-07-31: usar "COMENTA NOVA ERA que eu te envio [entregável específico]" como CTA padrão.
- Contexto: funil orgânico e campanha Nova Era da IA.
- Motivo: capturar lead via comentário com entregável específico.
- Riscos: perder consistência de campanha.
- Como revisar no futuro: se Fabio mudar o funil ou a palavra-chave.

## 2026-07-31 - Três CTAs levam ao mesmo portal gratuito pelo ManyChat

- Decisão: autorizar exatamente `Comente Claude`, `Comente Comunidade` e `Comente A Nova Era da IA` nos conteúdos orgânicos.
- Contexto: Fabio confirmou que as três palavras chave acionam automações do ManyChat que levam ao mesmo portal gratuito.
- Regra de seleção: Claude para conteúdo específico sobre Claude; Comunidade para conteúdo sobre apoio, troca ou rede; A Nova Era da IA para temas amplos de IA, tendências e impacto nos negócios. Em caso de ambiguidade, usar A Nova Era da IA.
- Motivo: adaptar a chamada ao assunto do conteúdo sem fragmentar o destino do funil.
- Relação com a decisão anterior: substitui e expande a decisão de 2026-07-07 que mantinha apenas NOVA ERA como CTA padrão.
- Limite de autorização: esta decisão autoriza a escolha da CTA no roteiro, mas não autoriza publicação, envio externo nem alteração da automação.
- Como revisar no futuro: quando Fabio mudar uma palavra chave, o destino do portal ou a automação do ManyChat.

## 2026-07-07 - Arquitetura operacional alvo em três camadas

- Decisão: usar CRM = Solutions, Finanças = QuickBooks, Operação = Slack + wiki como arquitetura-alvo.
- Contexto: reorganização de ferramentas da empresa.
- Motivo: parar de misturar dados e criar fonte de verdade por função.
- Riscos: duplicação entre ClickUp, Zoho, Solutions, QuickBooks e wiki.
- Como revisar no futuro: ao fim da avaliação do Zoho.

## 2026-07-07 - Onboarding de novo cliente segue protocolo automático

- Decisão: novo cliente/aluno deve disparar protocolo de onboarding com transcrição, pasta, repositório do aluno, agentes do nicho, plano de implementação e kickoff.
- Contexto: Business Accelerator depende de entrega customizada por nicho.
- Motivo: reduzir erro, padronizar entrega e escalar onboarding.
- Riscos: custo de customização subir se não houver reaproveitamento.
- Como revisar no futuro: quando houver processo canônico documentado.

## 2026-07-07 - Entregáveis de cliente não expõem nomes internos

- Decisão: entregáveis de cliente não devem usar nomes internos da Me Ensina AI.
- Contexto: cada aluno recebe repositório próprio com agentes do nicho.
- Motivo: profissionalismo, white-label e proteção da cozinha interna.
- Riscos: expor estrutura interna ou confundir cliente.
- Como revisar no futuro: regra permanente, salvo mudança explícita de política.

## 2026-07-07 - Não citar nome de cliente em conteúdo aberto

- Decisão: nunca citar nome de cliente em peça pública sem aprovação explícita.
- Contexto: privacidade e confiança.
- Motivo: proteger clientes e evitar exposição indevida.
- Riscos: quebra de confiança e risco comercial.
- Como revisar no futuro: regra permanente.

## 2026-07-07 - Anti-procrastinação institucionalizada

- Decisão: não abrir frente nova sem a atual gerar receita.
- Contexto: tendência de multiplicar projetos e oportunidades.
- Motivo: proteger foco, caixa e execução.
- Riscos: dispersão e atraso em vendas do que já existe.
- Como revisar no futuro: regra permanente; registrar boas ideias fora de hora em backlog.

## 2026-07-17 - [Substituída em 2026-07-22] Evento online se chama CAIXA-PRETA

- Decisão: decisão histórica substituída. Usar **CAIXA-PRETA: A Imersão de Meta Ads com IA** como nome e posicionamento do evento online de três dias.
- Contexto: Fabio pediu uma linha mais misteriosa e imersiva, focada exclusivamente em anúncios no Facebook e Instagram.
- Motivo: transformar a falta de visibilidade sobre cidade, público, oferta, criativo, página e campanha em um conceito proprietário e fácil de reconhecer.
- Modelo comercial: ingresso de US$ 44 pela Stripe; mentoria de 90 dias como continuidade pela Hotmart.
- Riscos: diluir a proposta com marketing genérico, misturar os dois checkouts ou prometer que a IA opera campanhas sem supervisão.
- Como revisar no futuro: depois da primeira edição, usando dados de aquisição, presença, satisfação e conversão para a mentoria.

## 2026-07-22 - CAIXA-PRETA consolidada em dois encontros

- Decisão: consolidar CAIXA-PRETA de três para dois encontros, nos dias 18 e 19 de agosto, e apresentar a mentoria ao final do segundo encontro.
- Contexto histórico da decisão anterior substituída: a estrutura anterior previa um terceiro encontro em 20 de agosto.
- Opções consideradas: manter a estrutura anterior ou redistribuir o conteúdo em dois encontros.
- Motivo: redistribuir o conteúdo entre os dois encontros e retirar toda comunicação pública da data de 20 de agosto, pertencente à estrutura anterior substituída.
- Riscos: a redistribuição exige consistência entre a programação e os materiais de comunicação.
- Como revisar no futuro: confirmar, após a edição, se a estrutura de dois encontros atende à experiência e à conversão para a mentoria.

## 2026-08-03 - CAIXA-PRETA transferida para 25 e 26 de agosto e continuidade aprovada

- Decisão: realizar a CAIXA-PRETA nos dias 25 e 26 de agosto de 2026, em dois encontros de quatro horas, substituindo as datas anteriores de 18 e 19 de agosto.
- Continuidade aprovada: SALA DE COMANDO 90, implementação acompanhada em grupo por 12 semanas, com encontros semanais de 90 minutos, limite inicial de 20 participantes, três devolutivas estruturadas por participante e suporte coletivo pelo WhatsApp com resposta em até dois dias úteis.
- Condição comercial aprovada: US$ 800 à vista ou 3 pagamentos de US$ 350. A verba de anúncios é responsabilidade do participante.
- Acesso: gravações da CAIXA-PRETA por 30 dias e gravações da continuidade até 30 dias depois do encerramento.
- Limites: não é agência, não inclui operação da conta pela Me Ensina AI e não promete aprovação da Meta, contatos, vendas, faturamento ou retorno.
- Pendências operacionais: horário dos encontros, data da Aula Zero, plataforma de transmissão, início e calendário da continuidade, plataforma de cobrança e política de cancelamento.
- Gate: a aprovação da oferta autoriza produção dos materiais. Publicação, envio, ativação de checkout e cobrança continuam exigindo aprovação explícita da ação externa correspondente.
- Como revisar no futuro: após a primeira edição, com dados de presença, conclusão dos entregáveis, interesse na continuidade, capacidade de suporte e conversão.

## 2026-07-23 - Exceção temporária para credenciais da importação

- Decisão: manter a rotação das credenciais antigas como pendência temporária e permitir que as Fases 2, 3 e 4, a Fase 5A offline e a Fase 6 greenfield continuem somente com a fundação limpa, a memória validada da SOU, fixtures sintéticas e novos artefatos criados no Codex.
- Contexto: a fundação técnica de agentes foi aprovada, mas as credenciais encontradas na importação histórica ainda não foram revogadas.
- Opções consideradas: concluir toda a rotação antes das demais fases ou avançar com uma exceção restrita a trabalho local, limpo e reversível.
- Motivo: continuar o trabalho sem armazenar, testar, utilizar ou ativar credenciais e integrações antigas.
- Riscos: alguma credencial antiga pode continuar válida fora do Codex até a rotação ser concluída.
- Restrições: a importação permanece em quarentena; hooks, bots, scripts, instaladores, MCPs e integrações importadas permanecem desativados; nenhum segredo pode ser copiado para a pasta do projeto; a Fase 5A pode chegar no máximo a `READY_FOR_FABIO_REVIEW`; a Fase 5B e qualquer ação externa permanecem bloqueadas até novo gate explícito de Fabio.
- Como revisar no futuro: encerrar a exceção após Fabio confirmar a revogação das credenciais antigas e o armazenamento seguro das novas credenciais necessárias.

## 2026-07-23 - Seu Sócio de IA evolui para uma arquitetura V3 híbrida

- Decisão: reposicionar Seu Sócio de IA como uma fundação plug and play que entrega um agente central, agentes iniciais de vendas, operação, marketing e financeiro, seis skills, criador de agentes e criador de skills, com caminhos adaptados para ChatGPT e Claude Code.
- Contexto: a versão anterior do produto e da página vendia apenas um kit de skills no Claude Code e apresentava agentes como próximo nível. Fabio confirmou que a promessa correta é ensinar o cliente a construir e expandir um sistema de agentes e skills para ajudar a gerenciar o negócio.
- Opções consideradas: manter o produto limitado a skills; vender um sistema fechado pronto; ou entregar uma fundação pronta com método para expansão.
- Motivo: permitir um início simples sem deixar o cliente dependente de uma solução fechada, aumentando a transformação percebida do produto.
- Relação com o Business Accelerator: Seu Sócio de IA é a modalidade em que o cliente configura e expande usando a fundação e o método. O Business Accelerator permanece como personalização, integrações, testes e implementação acompanhada pela Me Ensina AI.
- Riscos: prometer equivalência entre ChatGPT e Claude Code sem validação; publicar a nova copy antes de o produto V3 existir; sugerir autonomia total; ou canibalizar o Business Accelerator por falta de diferenciação.
- Como revisar no futuro: após testes reais nas duas plataformas e os primeiros dados de ativação, reembolso, conversão e ascensão para o Business Accelerator.

## 2026-07-25 - Memória permanente usa a skill global `$salva`

- Decisão: usar a skill global `$salva` como comando de registro da memória
  permanente de Fabio e da SOU.
- Contexto: Fabio quer preservar decisões e aprendizados entre conversas sem
  depender apenas do histórico de um chat.
- Opções consideradas: confiar somente na memória nativa das conversas, criar
  um slash command personalizado ou usar uma skill global com memória em
  arquivos.
- Motivo: skills são o formato reutilizável suportado pelo Codex e os arquivos
  em `knowledge/` permitem leitura, revisão e rastreabilidade.
- Riscos: salvar informação temporária como permanente, duplicar contexto ou
  registrar conteúdo sensível.
- Como revisar no futuro: manter a skill em
  `skills/salva/` e ajustar seu roteamento quando a
  estrutura da memória da SOU mudar.

## 2026-07-25 - Copy de Reels segue a metodologia do Lucas com teleprompter

- Decisão: toda copy de Reels criada pelo Lucas deve usar os quatro blocos da metodologia, declarar o gancho, incluir o texto corrido para teleprompter e permanecer dentro de 1 minuto.
- Contexto: Fabio testou a metodologia em uma sequência de conteúdos sobre ChatGPT, Claude, finanças e agentes autônomos e definiu que o texto corrido precisa acompanhar todas as entregas.
- Opções consideradas: entregar apenas a estrutura técnica; entregar somente o teleprompter; ou entregar estrutura, teleprompter e material prometido no CTA.
- Motivo: permitir que Fabio avalie a construção estratégica da copy e, ao mesmo tempo, receba uma fala pronta para gravar.
- Regras associadas: usar até 150 palavras faladas; fortalecer ganchos genéricos com dor, ganho ou consequência concreta; preservar literalmente prompts fornecidos por Fabio; incluir o entregável prometido no CTA; usar a palavra chave vigente em `knowledge/FUNIL_ATIVO.md`.
- Riscos: ultrapassar 1 minuto; alterar o significado de um prompt fornecido; criar promessa sem entregável; ou exagerar a autonomia de agentes em ações financeiras.
- Artefato atual: as nove primeiras copys produzidas nesse padrão estão reunidas em `docs/conteudo/COPYS_REELS_LUCAS_SEQUENCIA.md`.
- Como revisar no futuro: ajustar o limite de palavras e a estrutura com base na velocidade real de fala, retenção dos vídeos e desempenho dos ganchos.

## 2026-07-27 - B-roll realista exige movimento real

- Decisão: em todas as edições de vídeo da SOU, quando o pedido envolver vídeo
  ou realismo, o B-roll deve ter movimento real de pessoas, objetos, telas ou
  ambiente.
- Contexto: a primeira revisão da VSL de Consultoria usou zoom e pan sobre
  imagens estáticas. Fabio rejeitou esse resultado por parecer artificial e
  definiu a regra para todas as edições.
- Opções consideradas: efeito Ken Burns sobre fotos, movimento apenas no
  ambiente ou clipes com movimento humano e operacional real.
- Motivo: preservar realismo, qualidade premium e coerência com a promessa das
  ofertas.
- Restrições: zoom in, zoom out, pan, paralaxe ou câmera virtual sobre uma foto
  não contam como movimento. Efeito Ken Burns só pode ser usado quando Fabio
  pedir explicitamente.
- Como revisar no futuro: somente se Fabio aprovar explicitamente uma nova
  direção visual.

## 2026-07-25 - Arquitetura canônica do escritório de agentes no Codex

- Decisão: Carlos Eduardo é a única porta de entrada e o integrador final da estrutura de agentes da SOU no Codex.
- Roteamento aprovado: Carlos → Chief → especialista, com profundidade máxima de duas camadas após Carlos. Especialistas não delegam e devolvem o trabalho ao Chief e a Carlos.
- Estrutura validada nesta implementação: 44 agentes registrados, distribuídos entre Carlos Eduardo, Chiefs funcionais e especialistas, apoiados por 6 skills canônicas.
- Limite operacional: até oito execuções de subagentes por pedido. Acima disso, é necessária aprovação explícita de Fabio. Revisões e correções são execuções temporárias do papel adequado e não criam automaticamente novos agentes permanentes.
- Fontes canônicas: `.codex/agents/`, `.codex/config.toml`, `docs/agent-system/AGENT_CAPABILITY_MAP.json` e `skills/`. Não manter uma segunda árvore concorrente em `skills/`.
- Contexto: os 96 subagentes exibidos no histórico eram execuções de tarefas, não 96 cargos permanentes. Eles não devem ser promovidos em massa.
- Critério de promoção: uma execução temporária só deve virar agente permanente quando representar uma função recorrente e distinta, com Chief responsável, escopo, gates, handoff e testes definidos.
- Motivo: evitar proliferação de agentes, ambiguidade de responsabilidade e delegação recursiva, preservando uma operação coordenada e auditável.
- Risco conhecido: parte dos limites de profundidade e quantidade depende das instruções operacionais; o runtime controla principalmente a concorrência. Alterações de configuração precisam ser confirmadas em uma nova tarefa do Codex.
- Como revisar no futuro: se o volume real de trabalho exceder repetidamente o limite aprovado ou surgir uma função recorrente que não esteja coberta pelos 44 agentes.
