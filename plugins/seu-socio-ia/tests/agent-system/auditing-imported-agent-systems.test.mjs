import assert from "node:assert/strict";
import fs from "node:fs";

const path = "skills/auditing-imported-agent-systems/SKILL.md";
const text = fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";

assert.match(text, /^---\nname: auditing-imported-agent-systems\n/m);
assert.match(text, /^description: Use when /m);
assert.ok(text.includes("Nunca executar"));
assert.ok(text.includes("Nunca reproduzir"));
assert.ok(text.includes("agentes, skills, comandos, hooks, memória, dados e dependências"));
assert.ok(text.includes("Fato"));
assert.ok(text.includes("Inferência"));
assert.ok(text.includes("Recomendação"));
assert.ok(fs.existsSync("skills/auditing-imported-agent-systems/agents/openai.yaml"));
assert.ok(fs.existsSync("skills/auditing-imported-agent-systems/references/audit-checklist.md"));

console.log("auditing-imported-agent-systems: ok");
