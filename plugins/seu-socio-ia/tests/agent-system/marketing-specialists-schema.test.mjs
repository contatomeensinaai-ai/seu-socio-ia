import assert from "node:assert/strict";
import fs from "node:fs";

const specialists = {
  "content-strategist": "workspace-write",
  "conversion-copywriter": "workspace-write",
  "creative-director": "workspace-write",
  "brand-strategist": "read-only",
  "paid-media-analyst": "read-only",
  "meta-ads-specialist": "workspace-write",
  "video-producer": "workspace-write",
  "short-form-video-creator": "workspace-write"
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

for (const id of ["creative-director", "video-producer"]) {
  const text = fs.readFileSync(`.codex/agents/${id}.toml`, "utf8");
  assert.match(text, /Não faça upload\./, `${id} deve proibir upload sem ambiguidade`);
  assert.match(text, /Gate de aprovação:[^\n]*upload[^\n]*Fabio|Gate de aprovação:[^\n]*Fabio[^\n]*upload/i, `${id} deve incluir upload no gate de Fabio`);
}

console.log("marketing-specialists-schema: ok");
