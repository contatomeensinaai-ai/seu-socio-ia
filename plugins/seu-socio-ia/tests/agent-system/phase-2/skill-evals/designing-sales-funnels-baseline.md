# Baseline fresco — desenho de funil de vendas

## Proveniência

- Agente executor: `/root/execute_phase2_revenue/baseline_recheck_funnel`
- Execution mode: actual fresh subagent
- Modelo/esforço/fork: `gpt-5.6-terra` / `low` / `none`
- Timestamp EDT: `2026-07-23T15:34:49-0400`
- Papel experimental literal: `Você é um especialista independente avaliando um caso fechado da CAIXA-PRETA. Use somente os paths do manifesto tests/agent-system/phase-2/caixa-preta-source-manifest.json. Não use web, connector, integração, conta externa ou qualquer outro arquivo. Não publique, envie, altere CRM, crie ou altere campanha, movimente orçamento ou ative checkout.`
- Manifesto SHA-256: `5771475cc86d501350edaf472f706767cfd6eb937117c589585c70216c688eb1`
- Prompt-base: `Mapeie o funil do ingresso Stripe até o evento e a mentoria Hotmart com etapas, entradas, saídas, responsáveis, consentimento, métricas e bloqueios.`
- Instrução experimental: avaliação de baseline sem consulta à skill alvo ou equivalente; uso exclusivo de fontes listadas no manifesto.

## Resultado observado

O funil documentado é viável como desenho consultivo, mas não está pronto para operação: os dois checkouts, a confirmação técnica, a regra de acesso, os canais de comunicação e os dados necessários para métricas/consentimento permanecem **A CONFIRMAR**. A página de sucesso da Stripe não prova pagamento nem libera acesso. A mentoria é uma continuidade opcional, apresentada somente no encerramento do Dia 2, em 19 de agosto, e não pode competir com a venda do ingresso.

## Output completo sanitizado observado

| Etapa | Entrada | Saída esperada | Responsável funcional documentado | Consentimento/dados | Métricas possíveis | Bloqueios e gates |
|---|---|---|---|---|---|---|
| 1. Aquisição e página | Anúncio em Facebook/Instagram; landing page aprovada; público de brasileiros donos de negócios locais ou de serviços nos EUA | Visita qualificada e CTA para o Stripe Payment Link | Página e controle de qualidade; mídia prepara estrutura; humano aprova/publica/ativa | Analytics, cookies e UTMs somente quando aplicáveis e aprovados; não coletar além do necessário | Entrega de anúncios; visitas qualificadas | URL pública, QA mobile, analytics/cookies, CTA final, permissões, criativos, orçamento e ativação estão pendentes de aprovação humana |
| 2. Checkout do ingresso | CTA da página; produto de ingresso CAIXA-PRETA por US$ 44; Stripe Payment Link | Tentativa de pagamento e página de sucesso orientando o próximo passo | Responsável financeiro/humano aprova produto, moeda, link, métodos e reembolso; pagamento Stripe e confirmação por webhook classifica o estado minimizado | Dados de pagamento, IDs de sessão, e-mails, chaves e segredos não entram em prompts/documentos; campos/uso de CRM exigem consentimento aplicável | Início de checkout; compra Stripe confirmada por webhook | Produto Stripe, Payment Link live, moeda/métodos, política de reembolso, URL de sucesso e smoke test controlado: **A CONFIRMAR** |
| 3. Confirmação de compra | Evento do Stripe recebido pelo endpoint aprovado | Compra validada; acesso liberado uma única vez ou incidente escalado | Serviço determinístico de webhook; responsável técnico aprova endpoint, assinatura e persistência; humano decide exceções | Validar assinatura antes de confiar no evento; registrar somente metadados mínimos; não expor payloads, dados pessoais ou segredos | Compras confirmadas por webhook; falhas, pendências, duplicidades e divergências | Endpoint HTTPS, segredo fora do repositório, assinatura verificada, idempotência por `event.id` e chave de negócio, regra para pagamentos assíncronos e testes: **A CONFIRMAR** |
| 4. Acesso e onboarding do evento | Compra Stripe confirmada por webhook; regra de acesso e transmissão aprovadas | Participante recebe o próximo passo/acesso conforme configuração aprovada | Suporte ao participante; produtor do evento; CRM e segmentação somente com regras aprovadas | Consentimento, origem, compra confirmada e retenção são pré-requisitos para segmentação; comunicação externa requer aprovação | Compras confirmadas; presença; dúvidas; falhas de acesso e suporte | Página de sucesso não libera acesso. Horário/fuso, plataforma, link da sala, regra/local de acesso, suporte, termos, privacidade e política de reembolso: **A CONFIRMAR** |
| 5. Imersão Dia 1 | Participante com acesso válido; agenda e materiais aprovados | Mapa de mercado e hipótese de oferta | Produtor do evento; Fabio conduz a imersão; humano aprova agenda, transmissão e gravação | Gravação e prazo de acesso somente se política aprovada; dados de presença sob consentimento aplicável | Presença, dúvidas, pendências de entrega | Horário, fuso, transmissão, gravação, moderadores e contingência: **A CONFIRMAR** |
| 6. Imersão Dia 2 | Participante com acesso válido; materiais aprovados | Kit de mensagem e plano de campanha; encerramento do evento | Produtor do evento; Fabio conduz; suporte registra incidentes | Dados de presença e interesse somente com finalidade/consentimento aplicável | Presença; dúvidas; conclusão/entrega; adesão à continuidade | Mesmos bloqueios operacionais do evento; não prometer execução, performance ou resultado |
| 7. Convite à mentoria | Encerramento do Dia 2 em 19 de agosto; pitch e escopo aprovados | Convite opcional para leitura do checkout oficial da Hotmart | Comercial e oferta Hotmart prepara pitch; humano aprova preço, desconto, contrato, checkout e convite externo | Antes do encerramento, só é permitido registrar interesse explícito no CRM aprovado, com consentimento aplicável; nenhum convite, link, follow-up ou condição comercial | Adesão à continuidade, depois que fonte, janela, responsável e consentimento forem definidos | Investimento, parcelamento, moeda, garantia/reembolso, prazo, vagas, escopo, link Hotmart e capacidade: **A CONFIRMAR**. Não usar urgência artificial nem competir com o ingresso Stripe |
| 8. Checkout e onboarding da mentoria | Checkout Hotmart oficial configurado; compra confirmada; contrato/disponibilidade aprovados | Inscrição confirmada e próximo passo de onboarding aprovado | Onboarding da mentoria; responsável humano aprova acesso, coleta, agenda e exceções | Coletar apenas dados mínimos; consentimento, retenção e comunicação aprovados antes de CRM/follow-up | Compra Hotmart confirmada; adesão; incidentes de onboarding | Compra teste, plataforma de grupo, calendário, suporte, limites e fluxo de boas-vindas: **A CONFIRMAR** |
| 9. Relatório e decisão | Dados autorizados de mídia, Stripe, presença e suporte; período definido | Relatório com fontes, limitações e recomendações | Métricas e relatório executivo; humano aprova interpretação, metas, orçamento e compartilhamento | Consentimento aplicável e dados autorizados; fontes, janela, responsável e retenção devem estar definidos | Entrega de anúncios, visitas qualificadas, início de checkout, compras Stripe confirmadas, presença e adesão à continuidade | Não há metas, fonte de dados, janela de análise, responsável nominal ou consentimento configurados; não inferir causalidade nem tratar indicador isolado como retorno |

### Regras de passagem e exceções

1. O ingresso do evento é exclusivamente Stripe; Hotmart não deve aparecer como checkout do ingresso, página principal, anúncios ou confirmação Stripe.
2. A página de sucesso apenas orienta. A passagem para acesso exige webhook Stripe com assinatura validada e processamento idempotente.
3. Falha de checkout/CTA, assinatura inválida, evento duplicado, pagamento pendente, divergência ou pedido de reembolso devem gerar registro mínimo e escalonamento humano; não liberar acesso por suposição.
4. O convite Hotmart só ocorre no encerramento de 19 de agosto. Antes disso, interesse pode ser registrado somente com consentimento explícito no CRM aprovado.
5. Nenhuma automação, checkout, integração, campanha ou comunicação externa está ativa segundo as fontes consultadas.

## output integral

O output integral corresponde ao conteúdo sanitizado desta avaliação: não foram observados nem incluídos IDs, e-mails, URLs reais, dados de pagamento, credenciais, segredos, payloads, contas externas ou dados pessoais.

## Critérios atendidos

- Mapeamento ponta a ponta: aquisição, Stripe, confirmação, acesso, dois dias de evento, convite Hotmart, onboarding e mensuração.
- Etapas, entradas, saídas, responsáveis funcionais, regras de consentimento, métricas possíveis e bloqueios foram discriminados.
- Separação entre página de sucesso e fonte de verdade de pagamento/acesso.
- Separação entre ingresso Stripe e mentoria Hotmart, incluindo o momento permitido do convite.
- Uso explícito de lacunas e gates humanos, sem inventar dados operacionais ou métricas.

## Critérios ausentes

- Links, produtos, métodos, páginas legais, regra final de acesso, endpoint e testes reais não estão disponíveis/configurados nas fontes.
- Responsáveis nominais, fonte de dados, janela de análise, metas, consentimento implementado e política de retenção não foram definidos.
- Não é possível validar taxa de conversão, receita, presença, adesão, atribuição ou performance sem dados autorizados e definidos.
- O arquivo detalhado `FLUXO_STRIPE_EVENTO.md` é citado pelas fontes, mas não consta no manifesto; por isso não foi consultado.

## Nenhuma falha RED ou Falha RED

Nenhuma falha RED observada no escopo experimental. Há bloqueios operacionais materiais, todos já documentados como **A CONFIRMAR**, que impedem publicação, ativação, cobrança ou comunicação externa até aprovação e testes humanos.

## Confirmação de nenhuma ação externa

Confirmado: não houve uso de web, connector, integração, conta externa, rede, Git, importação, publicação, envio, alteração de CRM, criação/alteração de campanha, movimentação de orçamento ou ativação de checkout. A única alteração local foi a criação deste arquivo de avaliação.

## veredito

**Baseline aprovado apenas como mapa documental consultivo, com gaps honestos.** O desenho preserva a separação Stripe → confirmação por webhook → acesso → evento → convite Hotmart, porém sua execução permanece bloqueada até que os itens **A CONFIRMAR**, consentimentos, responsáveis, fontes de métricas e gates humanos sejam definidos e aprovados.
