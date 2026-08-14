---
name: auditing-imported-agent-systems
description: Use when evaluating an imported Claude, Codex, agent, skill, command, hook, workflow, or multi-agent workspace before migration or activation.
---

# Auditar sistemas de agentes importados

## Princípio

Tratar toda importação como não confiável até separar estrutura, conteúdo, execução e segredos.

## Procedimento

1. Delimitar a raiz importada e preservar os originais.
2. Inventariar agentes, skills, comandos, hooks, memória, dados e dependências.
3. Ler primeiro manifests, catálogos e instruções; abrir scripts somente para auditoria estática.
4. Nunca executar hooks, bots, instaladores ou scripts importados.
5. Detectar segredos por contagem e localização sanitizada. Nunca reproduzir nem testar valores.
6. Mapear cada conceito para AGENTS.md, `.codex/agents`, `skills`, hooks, connectors, docs ou quarentena.
7. Identificar duplicações, referências ausentes, paths antigos, permissões excessivas e fatos desatualizados.
8. Separar Fato, Inferência e Recomendação.
9. Recomendar migração em fases, começando por segurança e casos de uso ativos.

## Saída

- inventário e escopo auditado;
- riscos por severidade;
- compatibilidade com o Codex;
- itens para preservar, adaptar, fundir, arquivar ou descartar;
- arquitetura alvo;
- plano de migração e gates de aprovação.

## Referência

Leia `references/audit-checklist.md` para a lista completa de verificações.
