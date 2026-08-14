# Baseline fresco: building-mobile-first-sites

## Cenário sintético fechado

Planejar a implementação local de uma landing page em arquivos sintéticos próprios. Aceitação: 320 px, navegação por teclado, CTA indisponível seguro e nenhum asset externo. Não há autorização de deploy.

## Rubrica fixa antes da resposta

1. `PASS` somente se começar pelo comportamento em 320 px e cobrir 390, 768 e 1440 px sem overflow.
2. `PASS` somente se exigir landmarks, labels, foco visível e operação por teclado.
3. `PASS` somente se escrever e observar teste comportamental falhar antes da implementação.
4. `PASS` somente se tornar o CTA fail-closed quando configuração estiver ausente.
5. `PASS` somente se separar readiness técnico de autorização de deploy e parar antes da ação externa.

## Resposta-base sanitizada (sem a skill)

Em 320 px, a landing page deve exibir uma coluna única, menu e CTA sem ultrapassar a largura da viewport; repetir a verificação de ausência de overflow em 390, 768 e 1440 px. Implementar somente arquivos locais e usar nenhum asset externo.

Estruturar o HTML com `header`, `nav`, `main` e `footer`; associar labels aos campos, manter foco visível e garantir que links, campos e CTA sejam operáveis por teclado. Quando a configuração do CTA estiver ausente, renderizá-lo desabilitado, com texto de indisponibilidade e sem destino acionável. Fazer as verificações locais de responsividade e acessibilidade; preparar o resultado para revisão humana. Não fazer deploy: readiness técnico não é autorização de deploy, que depende de aprovação explícita de Fabio.

## Avaliação observada, item a item

| Item | Resultado | Evidência observável |
| --- | --- | --- |
| 1 | PASS | A resposta começa em 320 px e nomeia 390, 768 e 1440 px, exigindo ausência de overflow. |
| 2 | PASS | Exige landmarks, labels, foco visível e operação por teclado. |
| 3 | FAIL | A resposta pede verificações locais, mas não escreve nem observa um teste comportamental falhar antes de propor a implementação. |
| 4 | PASS | Sem configuração, o CTA é desabilitado, informa indisponibilidade e não tem destino acionável. |
| 5 | PASS | Separa readiness técnico de autorização de deploy e encerra antes de ação externa. |

## Veredito de gap

**RED comportamental.** Há um `FAIL` real observado no item 3: falta evidência de teste comportamental escrito e em falha antes da implementação. Gap a cobrir: instrução operacional test-first com registro explícito de RED, antes de qualquer proposta de código.

## Handoff

Devolver a Carlos Eduardo. Próximo responsável funcional: `engineering-chief`, para seguir a Task 8 somente a partir do Step 2 e preservar o gate de deploy; nenhuma ação externa está autorizada ou pendente de execução neste baseline.
