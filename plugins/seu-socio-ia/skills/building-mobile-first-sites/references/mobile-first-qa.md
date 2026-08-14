# QA mobile first local

## Contrato de execução

Executar somente contra o fixture ou runtime local aprovado. Registrar observações reais, não apenas intenção.

## TDD

- [ ] Teste comportamental escrito antes da implementação.
- [ ] RED observado pela ausência do comportamento, com comando e causa.
- [ ] Implementação mínima concluída.
- [ ] GREEN focado e regressão local observados.
- [ ] REFACTOR manteve todos os testes verdes.

## Viewports

Inspecionar nesta ordem:

| Viewport | Evidência mínima |
| --- | --- |
| 320 px | Conteúdo legível, controles alcançáveis e layout base sem overflow horizontal. |
| 390 px | Fluxo preservado sem corte ou scroll lateral. |
| 768 px | Adaptação intermediária sem depender de hover. |
| 1440 px | Largura e hierarquia controladas sem esticar conteúdo indevidamente. |

Em cada viewport, checar cabeçalhos, navegação, formulários, mídia, textos longos e estados de erro.

## Acessibilidade

- [ ] `header`, `nav`, `main` e `footer` ou landmarks equivalentes.
- [ ] Labels programáticos para campos e nomes acessíveis para controles.
- [ ] Foco visível com contraste suficiente.
- [ ] Ordem de foco lógica e operação completa por teclado.
- [ ] Nenhum controle depende apenas de cor, hover ou gesto.

## CTA fail-closed

Quando a configuração do CTA estiver ausente:

- renderizar estado indisponível compreensível;
- não manter `href`, redirecionamento, submit ou handler acionável;
- manter semântica e foco coerentes com o estado inativo;
- cobrir o estado com teste comportamental.

## Fronteira e handoff

- [ ] Validação local concluída sem rede, paths importados, segredos ou assets externos.
- [ ] Readiness técnico registrado separadamente da autorização de deploy.
- [ ] Nenhum push, deploy, DNS ou analytics externo executado.
- [ ] Evidências entregues a `qa-engineer`; revisão seguinte atribuída a `reviewer`.
