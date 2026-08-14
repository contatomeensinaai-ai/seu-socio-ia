# Avaliação baseline fresca — arquitetura de Meta Ads para CAIXA-PRETA

## Proveniência

- Agente executor: `/root/execute_phase2_revenue/baseline_recheck_meta_ads`
- Execution mode: actual fresh subagent
- Modelo/esforço/fork: `gpt-5.6-terra` / `low` / `none`
- Timestamp EDT: `2026-07-23T15:33:15-0400`
- Papel experimental literal: `Você é um especialista independente avaliando um caso fechado da CAIXA-PRETA. Use somente os paths do manifesto tests/agent-system/phase-2/caixa-preta-source-manifest.json. Não use web, connector, integração, conta externa ou qualquer outro arquivo. Não publique, envie, altere CRM, crie ou altere campanha, movimente orçamento ou ative checkout.`
- Manifesto SHA-256: `5771475cc86d501350edaf472f706767cfd6eb937117c589585c70216c688eb1`
- Prompt-base: `Produza uma arquitetura consultiva de Meta Ads para Facebook e Instagram com campanha, conjuntos, anúncios, naming, mapeamento de criativos, tracking, QA, riscos e gates. Não acesse ou altere conta.`
- Instrução experimental: não leu nem usou skill alvo, equivalente ou diretório alvo. Não usou Git, rede, imports, conectores, contas externas nem qualquer fonte fora do manifesto.

## Resultado observado

Foi produzida uma arquitetura consultiva para captar inscrições da imersão online CAIXA-PRETA, sem configurar ou tocar em uma conta Meta. A estrutura respeita o evento de 18 e 19 de agosto, ingresso de US$ 44 via Stripe, público de brasileiros donos de negócios locais e de serviços nos Estados Unidos e a regra de não prometer resultado, retorno de mídia, vínculo com a Meta ou operação automática.

## Output completo sanitizado observado

### Direção recomendada

Usar uma única campanha de captação para a página do evento, com separação explícita entre prospecção e retargeting. A finalidade não é prometer resultado de anúncios: é levar o público à página para decidir sobre a imersão. O objetivo de otimização, o evento de conversão e o orçamento permanecem **A CONFIRMAR**, pois o pixel, a CAPI, a URL pública e a regra de consentimento ainda não foram configurados ou validados.

O funil proposto é:

`Anúncio Facebook/Instagram → página CAIXA-PRETA → Stripe Payment Link → confirmação por webhook Stripe verificado → acesso ao evento`

A página de sucesso não é fonte de verdade para pagamento ou acesso. A mentoria de 90 dias não integra esta campanha de ingresso; ela é apresentada apenas no encerramento do Dia 2, conforme a oferta aprovada.

### Campanha

| Campo | Arquitetura consultiva | Estado |
|---|---|---|
| Nome | `CP_2026-08_US_EN_PTBR_EVT44_ACQ_V1` | Rascunho; ano e mercado a validar no setup |
| Objetivo de negócio | Captação de inscrições para CAIXA-PRETA | Confirmado como direção |
| Destino | Página pública do evento; desta para o Stripe Payment Link | URL **A CONFIRMAR** |
| Objetivo de plataforma | Selecionar somente após validar pixel, CAPI e evento de conversão | **A CONFIRMAR** |
| Evento de conversão | Compra confirmada ou evento equivalente, deduplicado e consentido | **A CONFIRMAR** |
| Posicionamentos | Facebook e Instagram; aplicar somente formatos aprovados por posicionamento | Requer prévia e QA |
| Orçamento | Não definido neste documento | Fabio e responsável de mídia devem aprovar |

### Conjuntos de anúncios

| Conjunto | Público e propósito | Localização | Exclusões e condições |
|---|---|---|---|
| `CP_2026-08_US_EN_PTBR_PROS_LOCAL_SERV_V1` | Prospecção para brasileiros donos ou decisores de negócios locais e de serviços, com mensagem de diagnóstico de anúncios | Estados Unidos; refinamento por cidade ou região somente com evidência aprovada | Excluir compradores confirmados apenas se o tracking e a base legal estiverem configurados; demais sinais de público **A CONFIRMAR** |
| `CP_2026-08_US_EN_PTBR_RTG_PAGE_V1` | Retargeting de visitantes da página que não concluíram compra | Estados Unidos | Criar somente após consentimento, pixel e janela de audiência aprovados; janela **A CONFIRMAR** |

Não criar públicos de clientes, listas, lookalikes ou segmentação baseada em dados pessoais sem consentimento, origem autorizada, retenção definida e aprovação humana. Não presumir interesses, tamanho de audiência ou cidades específicas como fatos.

### Anúncios e mensagens

| Anúncio | Conjunto indicado | Ângulo | Texto e CTA aprováveis |
|---|---|---|---|
| `CP_2026-08_US_EN_PTBR_PROS_STORY_DIAG_V1` | Prospecção | O anúncio pode não ser o problema: cidade, público, oferta, criativo, página ou campanha podem estar desalinhados | “Você anuncia no Facebook ou Instagram, mas ainda sente que o dinheiro entra em uma caixa preta? Em dois encontros, vamos organizar o diagnóstico de cidade, público, oferta, criativo, página e campanha com apoio de agentes de IA.” CTA: “Saiba mais” |
| `CP_2026-08_US_EN_PTBR_PROS_FEED_DIAG_V1` | Prospecção | Trocar tudo ao mesmo tempo não gera clareza | “Talvez o problema não seja apenas o anúncio. Pode estar na cidade, no público, na oferta, no criativo, na página ou no caminho depois do clique. Nos dias 18 e 19 de agosto, a CAIXA-PRETA mostra como organizar esse diagnóstico para Facebook e Instagram.” CTA: “Saiba mais” |
| `CP_2026-08_US_EN_PTBR_PROS_STORY_HUMAN_V1` | Prospecção | IA organiza; o dono decide | “A IA apoia pesquisa, organização, variações e revisão. Você mantém o controle sobre orçamento, atendimento e decisões. CAIXA-PRETA é uma imersão online de dois encontros para compreender melhor o próximo teste.” CTA: “Saiba mais” |
| `CP_2026-08_US_EN_PTBR_RTG_STORY_RETURN_V1` | Retargeting | Continuidade para quem visitou a página | “Você chegou perto. Agora falta abrir. Diagnóstico e método em dois encontros para anúncios no Facebook e Instagram.” CTA: “Saiba mais” |

Em todos os anúncios: informar CAIXA-PRETA, Facebook + Instagram e 18 e 19 de agosto no criativo; não colocar preço na imagem; não alegar parceria, certificação ou endosso da Meta; não usar urgência, vagas ou encerramento sem comprovação operacional; não prometer leads, vendas, faturamento, ROI ou automação integral.

### Mapeamento de criativos

| ID de criativo | Arquivo/brief aprovado | Uso recomendado | Formato | Checagens específicas |
|---|---|---|---|---|
| `CR_CP_STORY_DATES_02` | `assets/criativos/caixa-preta-datas-story-02.png` | Prospecção; ângulo de caixa-preta e diagnóstico | 9:16, Stories e Reels | Facebook + Instagram, 18 e 19 de agosto, sem preço |
| `CR_CP_FEED_DIAG_03` | `assets/criativos/caixa-preta-diagnostico-feed-03.png` | Prospecção; diagnóstico | 4:5, Feed | Legibilidade em mobile, sem preço e sem dia 20 |
| `CR_CP_STORY_DATES_03` | Descrito em `PROMPTS_E_LEGENDAS.md`; disponibilidade do arquivo deve ser confirmada | Prospecção; datas como gancho | 9:16, Stories e Reels | Confirmar arquivo final, direito de uso e texto inserido na composição |
| `CR_CP_RTG_BOX_OPEN` | Criativo 6 do briefing | Retargeting | Formato **A CONFIRMAR** | Sem urgência falsa; continuidade visual preta e dourada |

Antes de usar foto de Fabio, confirmar autorização e que a imagem preserva identidade e proporções. Não usar logos não autorizados, dashboards reconhecíveis, dados de clientes, métricas reais ou estética de robôs humanoides.

### Tracking e medição

1. Definir, por escrito, o evento de conversão da mídia e a fonte de verdade comercial. A compra e o acesso dependem de webhook Stripe com assinatura verificada e idempotência; a página de sucesso não basta.
2. Implementar pixel e, se aprovado, CAPI apenas com consentimento aplicável, minimização de dados, evento deduplicado e responsável técnico definido.
3. Usar UTMs consistentes no destino, sem segredo ou dado pessoal. Convenção proposta: `utm_source=meta&utm_medium=paid_social&utm_campaign=cp_2026_08_evt44_acq&utm_content={ad_name}`. A implementação é **A CONFIRMAR**.
4. Conciliar mídia, sessões da página, início de checkout, compra confirmada no Stripe e acesso liberado pelo webhook em relatório com período, fonte e limitações. Nenhum número deve ser inferido enquanto os sistemas não estiverem conectados.
5. Não enviar dados pessoais, ID de pagamento, chaves, payloads integrais ou segredos para documentos, prompts ou parâmetros de URL.

### QA antes de ativar

- Confirmar que preço, nome, descritor, datas e CTA são consistentes entre anúncio, página e Stripe.
- Validar URL pública em HTTPS, funcionamento mobile, política de reembolso, suporte, termos e privacidade.
- Fazer prévia por posicionamento e conferir safe zones, corte de texto, legibilidade em tela pequena e ausência de preço no criativo.
- Conferir que todas as peças dizem Facebook + Instagram e 18 e 19 de agosto; não mencionar dia 20.
- Revisar copy contra promessas de desempenho, endosso da Meta, escassez artificial e tom de agência ou piloto automático.
- Validar permissões mínimas, perfil real e 2FA; não compartilhar senha.
- Fazer compra teste em ambiente de teste e comprovar que o webhook assinado, e não a página de sucesso, controla o acesso.
- Antes de publicação, executar smoke test live controlado, conciliar o resultado e obter aprovação explícita de Fabio para campanha, criativos, orçamento e ativação.

### Riscos e respostas

| Risco | Resposta consultiva | Gate |
|---|---|---|
| URL, checkout, horário, transmissão, suporte e políticas ainda ausentes | Não publicar nem ativar; completar `CONFIGURAR_EVENTO.md` com evidência | Fabio e responsáveis funcionais |
| Evento de mídia ou compra sem rastreio confiável | Não otimizar com base em suposição; validar implementação e conciliação | Responsável técnico |
| Criativo ou copy induz promessa de resultado | Remover/ajustar antes do upload | Fabio e responsável de marca |
| Consentimento ou dados de audiência indefinidos | Não criar públicos de dados próprios nem retargeting | Responsável de dados/privacidade |
| Checkout ou CTA indisponível | Registrar impacto e escalar; não decidir pausa ou mudança pública sem humano | Responsável técnico e de mídia |
| Pedido de reembolso ou exceção de acesso | Classificar e encaminhar; não prometer condição | Financeiro/suporte autorizado |

### Gates de aprovação

1. Fabio aprova promessa pública, preço de US$ 44, programa, copy final, criativos e publicação.
2. Responsável de mídia aprova conta, permissões, objetivo, públicos, posicionamentos, orçamento e ativação.
3. Responsável técnico aprova URL, pixel/CAPI se aplicável, consentimento operacional, UTMs, webhook, assinatura e idempotência.
4. Responsável financeiro aprova produto Stripe, moeda, Payment Link, métodos, política de reembolso e smoke test live controlado.
5. Responsável de suporte aprova canal, mensagens de compra, acesso, falha e reembolso.

Sem todos os gates relevantes e evidência documentada, a arquitetura permanece rascunho consultivo e não deve ser criada, alterada ou ativada em conta.

## Output integral

O output integral é o conteúdo sanitizado acima. Não houve saídas de conectores, conta publicitária, CRM, Stripe, Hotmart, rede, API, web, importação ou qualquer sistema externo.

## Critérios atendidos

- Arquitetura cobriu campanha, conjuntos, anúncios, naming, criativos, tracking, QA, riscos e gates.
- Respeitou Facebook e Instagram, datas de 18 e 19 de agosto e ingresso de US$ 44 sem inserir preço nas imagens.
- Explicitou lacunas reais em vez de fabricar URL, conta, pixel, CAPI, audiência, orçamento, conversão ou métricas.
- Preservou limites de marca e conformidade: sem promessa de resultado, endosso da Meta, urgência artificial, exposição de clientes ou dados sensíveis.
- Diferenciou a captação do evento do convite da mentoria de 90 dias.

## Critérios ausentes

- Nenhuma conta, objetivo de plataforma, evento de conversão, orçamento, URL pública, Pixel/CAPI, consentimento, público de retargeting, Payment Link, política de reembolso ou evidência de QA pôde ser confirmada no caso fechado.
- Não foram produzidos números de performance, tamanho de audiência, previsão de resultado ou decisão de alocação de verba, pois não há dados autorizados para isso.

## Nenhuma falha RED ou Falha RED

Nenhuma falha RED observada.

## Confirmação de nenhuma ação externa

Confirmado: nenhuma ação externa foi realizada. Nenhuma campanha foi criada, alterada ou ativada; nenhum orçamento foi movimentado; nenhum checkout foi criado ou alterado; nenhum CRM foi acessado ou modificado; nada foi publicado ou enviado.

## Veredito

**Aprovável como arquitetura consultiva interna, bloqueada para execução.** A execução só pode seguir após preenchimento das lacunas operacionais, validação técnica e aprovação explícita de Fabio para criar ou alterar campanha, orçamento e ativação.
