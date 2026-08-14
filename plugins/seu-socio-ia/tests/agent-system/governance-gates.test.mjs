import assert from "node:assert/strict";
import fs from "node:fs";

const agents = fs.readFileSync("AGENTS.md", "utf8");
const catalog = fs.readFileSync("docs/AGENT_ORG.md", "utf8");
const verification = fs.readFileSync("docs/agent-system/FOUNDATION_VERIFICATION.md", "utf8");

const canonicalGates = [
  "- publicar conteúdo;",
  "- enviar mensagem ou email;",
  "- criar ou alterar campanha;",
  "- movimentar orçamento ou dinheiro;",
  "- fazer deploy;",
  "- configurar domínio ou DNS;",
  "- criar, alterar ou excluir repositório remoto;",
  "- alterar dado financeiro;",
  "- assinar, enviar ou modificar contrato;",
  "- acessar dado sensível de cliente;",
  "- apagar ou sobrescrever material relevante.",
].join("\n");

const canonicalBlock = [
  "### Lista canônica de gates de aprovação",
  "",
  "Exigir aprovação explícita de Fabio antes de:",
  "",
  canonicalGates,
].join("\n");

for (const [name, text] of [
  ["AGENTS.md", agents],
  ["docs/AGENT_ORG.md", catalog],
]) {
  assert.ok(text.includes(canonicalBlock), `${name} sem a lista canônica completa de gates`);
  assert.ok(
    text.includes(
      "Hooks, bots, instaladores e scripts importados nunca podem ser executados antes de auditoria estática e aprovação explícita de Fabio.",
    ),
    `${name} sem o bloqueio de execução de material importado`,
  );
}

assert.match(
  catalog,
  /\| Estratégia e Direção \| Carlos Eduardo \| Agente principal \| Prioridade, decisão, oportunidade ou trade-off \| Decisão estratégica exige aprovação explícita de Fabio \|/,
  "catálogo sem a rota Estratégia e Direção sob Carlos",
);
assert.ok(
  catalog.includes("`business-researcher` pesquisa") && catalog.includes("`reviewer` contesta e revisa"),
  "rota Estratégia e Direção sem Pesquisa e Revisão",
);

for (const required of [
  "A fundação técnica está pronta.",
  "Integrações e qualquer migração que consulte material importado permanecem bloqueadas.",
  "Fase 2 só pode tocar a importação ou integrações após o checklist de rotação concluído ou exceção explícita de Fabio.",
  "serviços pendentes",
  "restrições temporárias",
  "proibição de ativação",
]) {
  assert.ok(verification.includes(required), `verificação sem requisito: ${required}`);
}

console.log("governance-gates: ok");
