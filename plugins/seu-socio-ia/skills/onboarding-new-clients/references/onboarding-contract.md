# Contrato de onboarding

Produzir a resposta nesta ordem.

## 1. Gate de entrada

Registrar:

- `venda`: `confirmada` ou `a confirmar`;
- `escopo`: `confirmado` ou `a confirmar`;
- `decisão`: `continuar` somente com ambos confirmados; caso contrário, `parar imediatamente`;
- `evidência`: apontar apenas a fonte fornecida, sem copiar dado pessoal.

Se a venda não estiver confirmada ou o escopo não estiver confirmado, encerrar com o handoff a Carlos Eduardo.

## 2. Proteção de dados

Listar somente campos necessários para executar o escopo. Marcar qualquer fato ausente como `a confirmar`.

Perguntar:

1. Qual é a finalidade operacional de cada dado?
2. Existe consentimento ou autorização para esse uso?
3. Quem pode acessar o dado e por quanto tempo?
4. O resultado pode ser produzido com menos dados ou com dados sintéticos?

Não solicitar, usar, registrar ou expor dados sensíveis do cliente. Não enviar mensagem nem fazer contato externo. Não criar repositório remoto.

## 3. Matriz operacional obrigatória

Preencher uma linha por item. Usar `a confirmar` em campos sem evidência, sem omitir a coluna.

| Item | Owner | Dependência | Status | Confirmação |
| --- | --- | --- | --- | --- |
| Intake da fonte ou transcrição | `operations-chief` | venda e escopo confirmados; fonte mínima disponível | `a confirmar` até receber a fonte | referência local ou confirmação de Carlos Eduardo |
| Proposta de pasta local e repositório remoto | `engineering-chief` | intake mínimo e convenção de nomes aprovada | `proposta`, sem criação | aprovação explícita do path local; gate separado de Fabio para repositório remoto |
| Requisitos dos agentes do nicho | `operations-chief` | nicho, objetivos e limites do trabalho | `a confirmar` enquanto faltar contexto | requisitos validados por Carlos Eduardo |
| Marcos de implementação | `engineering-chief` | requisitos aprovados e dependências técnicas | `a confirmar` até aprovação | critérios de aceitação por marco |
| Pauta de kickoff | `operations-chief` | marcos e pendências consolidados | `rascunho local`, sem envio | pauta aprovada por Carlos Eduardo |
| Minimização de dados e consentimento | `security-auditor` | finalidade, permissões e retenção informadas | `a confirmar` até evidência | revisão dos dados mínimos e consentimentos |
| Gates de ação externa | `Carlos Eduardo` | alvo, escopo e aprovação aplicável | `bloqueado` | aprovação explícita de Fabio quando exigida |
| Handoff final | `Carlos Eduardo` | matriz completa e lacunas declaradas | `pronto para revisão` | decisão de continuar, corrigir ou bloquear |

## 4. Marcos mínimos

1. Intake sanitizado concluído.
2. Arquitetura local e proposta remota revisadas.
3. Requisitos dos agentes do nicho aprovados.
4. Implementação dividida em unidades testáveis.
5. Verificações locais concluídas.
6. Kickoff pronto para aprovação.

Cada marco deve declarar owner, dependência, status, critério de confirmação e pendências `a confirmar`.

## 5. Pauta de kickoff

Incluir:

- objetivo e escopo confirmados;
- entregáveis e exclusões;
- owners e dependências;
- marcos e critérios de aceitação;
- dados mínimos, consentimento e acessos;
- riscos, pendências e próximos gates.

Preparar somente a pauta local. Não enviar convite, mensagem ou material.

## 6. Handoff

Encerrar sempre com:

`Handoff: Carlos Eduardo recebe a matriz, as lacunas a confirmar e os gates bloqueados para definir o próximo responsável funcional.`
