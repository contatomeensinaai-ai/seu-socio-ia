import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const agentsDir = ".codex/agents";
const expectedAgents = {
  "onboarding-specialist": "workspace-write", "implementation-manager": "workspace-write",
  "customer-success-specialist": "workspace-write", "communications-coordinator": "workspace-write",
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
  assert.match(instructions, /cenários sintéticos/i, `${id} deve limitar cenários de cliente a dados sintéticos`);
  assert.match(instructions, /aprovação humana|aprovação explícita de Fabio/i, `${id} deve exigir gate humano`);
  assert.match(instructions, /Carlos Eduardo/i, `${id} deve devolver a Carlos Eduardo`);
  assert.match(instructions, /responsável.*dependência.*status.*confirmação/i, `${id} deve estruturar controle operacional`);
}
const text = (id) => fs.readFileSync(path.join(agentsDir, `${id}.toml`), "utf8");
assert.match(text("onboarding-specialist"), /não (?:faz|realiza) contato.*cliente/i);
assert.match(text("onboarding-specialist"), /não cria repositório remoto/i);
assert.match(text("onboarding-specialist"), /não acessa dados sensíveis/i);
assert.match(text("implementation-manager"), /não altera sistemas externos/i);
assert.match(text("implementation-manager"), /não inventa prazo/i);
assert.match(text("customer-success-specialist"), /não (?:faz|autoriza) reembolso/i);
assert.match(text("customer-success-specialist"), /não promete resultado/i);
assert.match(text("communications-coordinator"), /nunca envia, publica ou contata uma pessoa/i);

console.log("operations-specialists: ok");
