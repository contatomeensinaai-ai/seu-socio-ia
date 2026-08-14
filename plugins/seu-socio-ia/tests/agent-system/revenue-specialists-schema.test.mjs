import assert from "node:assert/strict";
import fs from "node:fs";

const specialists = {
  "funnel-strategist": "workspace-write",
  "crm-specialist": "read-only",
  "sales-intelligence": "read-only",
  "proposal-writer": "workspace-write",
  "cart-recovery-specialist": "workspace-write"
};
const headings = [
  "Identidade e cargo:",
  "Gatilhos de uso:",
  "Entradas esperadas:",
  "Responsabilidades:",
  "Limites e proibições:",
  "Fontes de contexto:",
  "Formato de entrega:",
  "Gate de aprovação:",
  "Critério de conclusão:",
  "Handoff para o próximo responsável:"
];
const config = fs.readFileSync(".codex/config.toml", "utf8");

for (const [id, sandbox] of Object.entries(specialists)) {
  const path = `.codex/agents/${id}.toml`;
  assert.ok(fs.existsSync(path), `especialista ausente: ${id}`);
  const text = fs.readFileSync(path, "utf8");
  assert.match(text, new RegExp(`^name = "${id}"$`, "m"));
  assert.match(text, new RegExp(`^sandbox_mode = "${sandbox}"$`, "m"));
  for (const heading of headings) assert.ok(text.includes(heading), `${id} sem ${heading}`);
  assert.match(text, /toda resposta[^.]*Carlos Eduardo/i);
  assert.match(text, /recusa/i);
  assert.match(text, /bloqueio/i);
  assert.match(text, /pedido de aprovação/i);
  assert.match(text, /não houver próximo executor[^.]*Fabio aprovar/i);
  const configId = id.replaceAll("-", "_");
  assert.ok(config.includes(`[agents.${configId}]`), `config sem ${configId}`);
  assert.ok(config.includes(`config_file = "agents/${id}.toml"`), `config sem path de ${id}`);
}

console.log("revenue-specialists-schema: ok");
