import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const agentsDir = ".codex/agents";
const expectedAgents = {
  "product-researcher": "read-only",
  "offer-architect": "workspace-write",
  "course-architect": "workspace-write",
  "solution-designer": "workspace-write",
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
  assert.match(toml, new RegExp(`^name = "${id}"$`, "m"), `${id} deve ter name canônico`);
  assert.match(toml, new RegExp(`^sandbox_mode = "${sandbox}"$`, "m"), `${id} deve usar ${sandbox}`);
  assert.match(toml, /^description = ".+"$/m, `${id} deve ter description não vazia`);
  const instructions = toml.match(/^developer_instructions = """([\s\S]*?)"""$/m)?.[1];
  assert.ok(instructions, `${id} deve ter um bloco developer_instructions`);
  for (const heading of headings) assert.match(instructions, new RegExp(`^${heading}`, "m"), `${id} sem ${heading}`);
  const handoff = instructions.match(/^Handoff para o próximo responsável:\s*(.+)$/m)?.[1] ?? "";
  for (const required of [/Carlos Eduardo/i, /recusa/i, /bloqueio/i, /pedido de aprovação/i, /próximo responsável funcional/i]) {
    assert.match(handoff, required, `${id} com handoff incompleto: ${required}`);
  }
  assert.match(instructions, /não (?:autoriza(?: nem inicia)?|inicia) build sem aprovação|não publica/i, `${id} deve bloquear build ou publicação sem aprovação`);
}

const researcher = fs.readFileSync(path.join(agentsDir, "product-researcher.toml"), "utf8");
assert.match(researcher, /não (?:escreve|altera|cria) arquivos/i, "product-researcher deve proibir escrita");
assert.match(researcher, /não transformar hipótese em fato/i, "product-researcher deve preservar hipóteses");

const solutionDesigner = fs.readFileSync(path.join(agentsDir, "solution-designer.toml"), "utf8");
assert.match(solutionDesigner, /não acessa dados sensíveis sem aprovação explícita de Fabio/i, "solution-designer deve proibir acesso a dados sensíveis sem aprovação");
assert.match(solutionDesigner, /não conecta integração sem aprovação explícita de Fabio/i, "solution-designer deve proibir conexão de integração sem aprovação");

console.log("product-specialists: ok");
