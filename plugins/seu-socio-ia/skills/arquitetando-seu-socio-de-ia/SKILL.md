---
name: arquitetando-seu-socio-de-ia
description: Conduz a entrevista conversacional do Seu Sócio de IA e cria, após confirmação, o primeiro sistema local de agentes do negócio do aluno.
---

# Arquitetar o Seu Sócio de IA

Use esta skill quando a pessoa disser que quer montar, criar ou estruturar seu Sócio de IA. Siga integralmente `../../AGENTS.md`.

Comece pela primeira pergunta da entrevista. Não diga que está usando uma skill, lendo instruções, localizando arquivos ou resolvendo caminhos.

## Regras de qualidade

- Não use formulário, checklist despejado ou sequência de perguntas sem contexto.
- Faça perguntas abertas, depois perguntas de aprofundamento orientadas pela resposta.
- Reflita o que entendeu em linguagem simples antes de recomendar agentes.
- Não recomende agentes genéricos sem ligá-los a um gargalo confirmado.
- Não recomende agentes antes dos seis blocos obrigatórios da entrevista estarem concluídos.
- Prefira o menor sistema que gere resultado. A quantidade de agentes é definida pelos gargalos confirmados, nunca por um número pré-fixado.
- Não ofereça opções de aplicativo, integração, automação ou conexão externa. A entrega desta skill termina nos agentes locais criados no Codex.

## Plano que deve ser apresentado antes de criar arquivos

```markdown
## Diagnóstico confirmado
- Negócio e cliente:
- Oferta e receita:
- Processo atual:
- Gargalos priorizados:

## Primeiro sistema recomendado
1. <Agente> — resolve <gargalo>; entrega <resultado>.
2. <Agente> — resolve <gargalo>; entrega <resultado>.

## O que será criado localmente
- Perfil do negócio
- Instruções centrais
- Arquivos dos agentes
```

Depois pergunte: "Quer que eu crie essa estrutura agora?"
