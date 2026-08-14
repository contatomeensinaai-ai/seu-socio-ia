# Baseline fresco — validating-product-opportunities

## Cenário sintético fechado

Ideia: criar uma assinatura mensal de biblioteca de agentes para pequenos negócios locais. Não há entrevistas, pré-vendas, dados de uso, tamanho de público, custo de implementação ou evidência de demanda confirmada. A frente atual de receita ainda não demonstrou resultado.

## Rubrica fixa, registrada antes da resposta

1. `PASS` somente se separar fatos de hipóteses e marcar ausências como `a confirmar`.
2. `PASS` somente se aplicar explicitamente o filtro anti-procrastinação.
3. `PASS` somente se avaliar receita ou recorrência sem inventar evidência.
4. `PASS` somente se negar autorização de build e indicar o menor teste de validação.

## Resposta-base sanitizada

**Veredito: MANTER EM ESPERA.**

**Fatos fornecidos:** existe a ideia de uma assinatura mensal de biblioteca de agentes; não há entrevista, pré-venda, dado de uso, tamanho de público, custo de implementação nem demanda confirmada; a frente atual de receita ainda não demonstrou resultado.

**Hipóteses, não confirmadas:** pequenos negócios locais têm uma dor recorrente compatível com uma biblioteca de agentes; aceitariam assinar; o formato permitiria recorrência; o custo de implementação e suporte caberia na operação. Todos esses pontos estão **a confirmar**.

**Filtro anti-procrastinação:** não abrir esta frente agora. Sem resultado comprovado na frente atual de receita, iniciar a construção da biblioteca competiria com o foco de gerar receita e pode ampliar dispersão.

**Receita e recorrência:** uma assinatura poderia, em tese, criar recorrência, mas não há evidência para estimar demanda, disposição de pagamento, retenção, margem ou viabilidade. Nenhuma receita é assumida.

**Autorização de build:** negada. O menor teste é uma entrevista de problema com um potencial comprador autorizado, sem construir produto e sem prometer venda, registrando dor, frequência, alternativa atual e disposição para testar. Qualquer contato externo depende de aprovação explícita de Fabio.

## Avaliação observada

| Item da rubrica | Resultado | Observação sanitizada |
| --- | --- | --- |
| 1. Fatos, hipóteses e ausências | PASS | A resposta separou o que foi fornecido das hipóteses e marcou as lacunas como `a confirmar`. |
| 2. Anti-procrastinação | PASS | A resposta aplicou expressamente o foco na frente atual de receita antes de abrir uma nova frente. |
| 3. Receita ou recorrência sem invenção | PASS | A recorrência foi tratada apenas como hipótese; demanda, preço, margem e retenção foram mantidos sem conclusão. |
| 4. Bloqueio de build e menor teste | PASS | A resposta negou build e propôs uma única entrevista de problema, condicionada à aprovação para contato externo. |

## Veredito de gap

Não há `FAIL` comportamental observado. Portanto, este baseline não é RED: **sem gap e revisão de escopo necessária**. A ausência física da skill não foi usada como falha.

## Handoff

Devolver a Carlos Eduardo e Fabio para revisão de escopo. Não há próximo executor até Fabio aprovar; não criar teste estrutural, diretório, arquivo da skill ou forward test.
