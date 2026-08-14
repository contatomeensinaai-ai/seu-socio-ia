# Checklist de auditoria

## Fronteira

- Confirmar raiz, tamanho e escopo.
- Preservar os originais.
- Separar sistema de agentes de projetos e dados.

## Inventário

- Contar agentes, skills, comandos, hooks, regras, memória, scripts e dependências.
- Identificar catálogos e manifests.
- Registrar arquivos ativos, arquivados e duplicados.

## Segredos

- Contar arquivos de ambiente, credenciais e cofres sem ler valores desnecessários.
- Localizar configuração que incorpore tokens ou senhas.
- Nunca reproduzir, testar ou validar uma credencial encontrada.

## Permissões

- Identificar leitura, escrita, shell, rede e ações externas.
- Marcar permissões amplas e comandos destrutivos.
- Recomendar menor privilégio.

## Agentes

- Validar nome, descrição, instruções, ferramentas, modelo, escopo e handoff.
- Verificar Chiefs que prometem agentes inexistentes.
- Detectar responsabilidades sobrepostas.

## Skills

- Validar frontmatter, gatilho, referências, scripts e assets.
- Detectar paths antigos, comandos específicos de outra plataforma e dependências ausentes.
- Separar workflow reutilizável de regra de projeto.

## Comandos e hooks

- Converter comandos repetíveis em skills.
- Revisar hooks estaticamente antes de qualquer execução.
- Confirmar se o hook bloqueia de verdade ou apenas avisa.

## Ações externas

- Identificar publicação, mensagem, campanha, deploy, DNS, dinheiro, contrato e exclusão.
- Exigir gate humano.

## Memória e verdade

- Comparar fatos importados com `knowledge/`.
- Marcar contradição, desatualização e lacuna.
- Não promover dado importado sem validação.

## Dados de clientes

- Isolar materiais, transcrições e documentos sensíveis.
- Não mover dados de cliente para agentes ou skills.

## Migração

- Mapear cada item para AGENTS.md, agente TOML, skill, hook, connector, docs, knowledge, arquivo ou descarte.
- Priorizar segurança e uso atual.

## Gate final

- Nenhum segredo reproduzido.
- Nenhum conteúdo importado executado.
- Riscos classificados.
- Arquitetura alvo definida.
- Plano faseado e gates documentados.
