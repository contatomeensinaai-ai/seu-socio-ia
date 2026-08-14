import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const agentsDir = ".codex/agents";
const expectedAgents = {
  "frontend-engineer": "workspace-write", "backend-engineer": "workspace-write",
  "database-engineer": "workspace-write", "devops-engineer": "workspace-write",
  "qa-engineer": "workspace-write", "finance-invariants-reviewer": "read-only",
};
const headings = [
  "Identidade e cargo:", "Gatilhos de uso:", "Entradas esperadas:",
  "Responsabilidades:", "Limites e proibições:", "Fontes de contexto:",
  "Formato de entrega:", "Gate de aprovação:", "Critério de conclusão:",
  "Handoff para o próximo responsável:",
];

for (const [id, sandbox] of Object.entries(expectedAgents)) {
  const file = path.join(agentsDir, `${id}.toml`);
  assert.ok(fs.existsSync(file), `${file} deve existir`);
  const toml = fs.readFileSync(file, "utf8");
  assert.match(toml, new RegExp(`^name = "${id}"$`, "m"));
  assert.match(toml, new RegExp(`^sandbox_mode = "${sandbox}"$`, "m"));
  assert.match(toml, /^description = ".+"$/m);
  const instructions = toml.match(/^developer_instructions = """([\s\S]*?)"""$/m)?.[1];
  assert.ok(instructions, `${id} deve ter um bloco developer_instructions`);
  for (const heading of headings) assert.match(instructions, new RegExp(`^${heading}`, "m"), `${id} sem ${heading}`);
  assert.match(instructions, /Carlos Eduardo/i, `${id} deve devolver a Carlos Eduardo`);
  assert.match(instructions, /recusa|bloqueio|pedido de aprovação/i, `${id} deve cobrir resultados bloqueados`);
}
const text = (id) => fs.readFileSync(path.join(agentsDir, `${id}.toml`), "utf8");
assert.match(text("frontend-engineer"), /mobile first/i);
assert.match(text("frontend-engineer"), /acessibilidade por teclado/i);
assert.match(text("frontend-engineer"), /CTA seguro/i);
assert.match(text("backend-engineer"), /contrato de interface/i);
assert.match(text("backend-engineer"), /validação de entrada/i);
assert.match(text("backend-engineer"), /isolamento.*cliente|isolamento.*tenant/i);
assert.match(text("database-engineer"), /rollback/i);
assert.match(text("database-engineer"), /backup/i);
assert.match(text("database-engineer"), /migraç/i);
assert.match(text("database-engineer"), /isolamento.*cliente/i);
assert.match(text("devops-engineer"), /rollback/i);
assert.match(text("devops-engineer"), /build local/i);
assert.match(text("devops-engineer"), /não (?:faça|realize) push.*deploy.*DNS/i);
assert.match(text("qa-engineer"), /RED.*GREEN.*REFACTOR/i);
assert.match(text("qa-engineer"), /evidência/i);
assert.match(text("finance-invariants-reviewer"), /read-only/i);
assert.match(text("finance-invariants-reviewer"), /idempotência/i);
assert.match(text("finance-invariants-reviewer"), /não (?:faz|realiza) mutação financeira/i);

console.log("engineering-specialists: ok");
