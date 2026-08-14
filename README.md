# Seu Sócio de IA

Marketplace privado do Codex com os agentes, skills e memória essencial da SOU.

## Instalação

1. Clone este repositório privado em uma pasta local permanente.
2. No Terminal, entre na pasta clonada e execute os comandos abaixo, substituindo o caminho pelo da sua cópia local.

```bash
codex plugin marketplace add /caminho/para/seu-socio-ia
codex plugin add seu-socio-ia@seu-socio-ia
```

3. Abra uma nova tarefa no Codex e use os agentes conforme o contexto da SOU.

Esses comandos foram validados em uma instalação local real com a versão 1.0.0 do plugin.

## Atualização

Na pasta clonada, atualize a branch padrão e reinstale o plugin para carregar a versão nova:

```bash
git pull --ff-only
codex plugin remove seu-socio-ia@seu-socio-ia
codex plugin add seu-socio-ia@seu-socio-ia
```

## Validação

Execute `npm test`, `npm run validate` e o validador da skill `plugin-creator` antes de publicar alterações.

## Remoção

Remova o plugin pelo Codex e, se não precisar mais do marketplace, remova a entrada de marketplace local:

```bash
codex plugin remove seu-socio-ia@seu-socio-ia
codex plugin marketplace remove seu-socio-ia
```

Depois, apague a cópia local do repositório se ela não for mais necessária.

## Segurança

Este pacote é privado. Não inclua credenciais, dados de clientes, mídias, builds, caches, imports em quarentena ou projetos paralelos.
