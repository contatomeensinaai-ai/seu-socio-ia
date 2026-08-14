---
name: building-mobile-first-sites
description: Use when implementing or changing a local website from an approved design and acceptance criteria, especially when mobile responsiveness, accessibility, safe CTA behavior, or deploy preparation must be verified.
---

# Construir sites mobile first

## Princípio

Começar pelo comportamento em 320 px e provar cada mudança com RED/GREEN/REFACTOR real. Readiness técnico é evidência para revisão, nunca autorização de deploy.

## Pré-condições

Confirmar antes de editar:

- design ou especificação aprovada e critérios de aceitação;
- paths sob responsabilidade exclusiva;
- runtime e comandos locais disponíveis;
- ausência de necessidade de segredos, paths importados ou assets externos.

Se qualquer item indispensável estiver ausente, registrar a lacuna e parar sem ampliar o escopo.

## Workflow obrigatório

1. **RED:** escrever um teste comportamental mínimo antes de propor ou escrever implementação.
2. Executar o teste e observar a falha esperada. Registrar comando, saída e causa; erro de sintaxe ou teste que passa de imediato não prova RED.
3. **GREEN:** implementar somente o necessário para o teste passar.
4. Executar o teste focado e a suíte de regressão local até GREEN.
5. **REFACTOR:** melhorar estrutura sem acrescentar comportamento e confirmar a suíte novamente.
6. Inspecionar localmente primeiro o layout base em 320 px; depois verificar 390, 768 e 1440 px, sempre sem overflow horizontal.
7. Inspecionar landmarks semânticos, labels, foco visível e operação completa por teclado.
8. Quando a configuração do CTA estiver ausente, aplicar fail-closed: mostrar indisponibilidade e remover destino ou ação acionável.
9. Relatar arquivos alterados, comandos, evidências observadas, riscos residuais e readiness técnico.
10. Entregar a `qa-engineer`, depois a `reviewer`, e parar antes de push, deploy, DNS ou analytics externos.

## Limites

- Trabalhar somente nos arquivos aprovados e em validação local.
- Não criar espelho em root `skills/`.
- Não ler, copiar, registrar ou expor segredos.
- Não usar paths importados, site CAIXA-PRETA, browser remoto, dependências remotas ou assets externos.
- Não tratar preview, build verde ou readiness técnico como autorização de deploy.
- Exigir aprovação explícita de Fabio antes de push, deploy, DNS ou analytics externos.

## Evidência de saída

Entregar:

- status de RED, GREEN e regressão;
- resultado dos quatro viewports e da checagem de overflow horizontal;
- resultado de teclado, foco, landmarks, labels e CTA seguro;
- arquivos e comandos usados;
- riscos e pendências;
- handoff para `qa-engineer` e `reviewer`;
- declaração explícita de que nenhuma ação externa foi executada.

## Referência

Ler `references/mobile-first-qa.md` ao preparar e registrar a validação local.
