import assert from "node:assert/strict";
import fs from "node:fs";

const skillPath = "skills/onboarding-new-clients/SKILL.md";
const referencePath =
  "skills/onboarding-new-clients/references/onboarding-contract.md";
const metadataPath =
  "skills/onboarding-new-clients/agents/openai.yaml";

const skill = fs.existsSync(skillPath)
  ? fs.readFileSync(skillPath, "utf8")
  : "";
const reference = fs.existsSync(referencePath)
  ? fs.readFileSync(referencePath, "utf8")
  : "";
const contract = `${skill}\n${reference}`;

assert.match(skill, /^---\nname: onboarding-new-clients\n/m);
assert.match(skill, /^description: Use when /m);
assert.ok(fs.existsSync(metadataPath), "agents/openai.yaml ausente");
assert.ok(fs.existsSync(referencePath), "contrato de onboarding ausente");

assert.match(contract, /venda[^.\n]*(?:não|sem)[^.\n]*confirmad/i);
assert.match(contract, /escopo[^.\n]*(?:não|sem)[^.\n]*confirmad/i);
assert.match(contract, /parar imediatamente/i);
assert.match(contract, /a confirmar/i);

for (const requirement of [
  /(?:intake|levantamento)[^.\n]*(?:fonte|transcri)/i,
  /pasta local/i,
  /repositório remoto/i,
  /agentes?[^.\n]*nicho|nicho[^.\n]*agentes?/i,
  /marcos?[^.\n]*implementação|implementação[^.\n]*marcos?/i,
  /(?:agenda|pauta)[^.\n]*kickoff|kickoff[^.\n]*(?:agenda|pauta)/i,
  /minimização[^.\n]*dados|dados[^.\n]*mínimos/i,
  /consentimento/i,
]) {
  assert.match(contract, requirement);
}

for (const column of ["item", "owner", "dependência", "status", "confirmação"]) {
  assert.match(reference, new RegExp(`\\|[^\\n]*${column}[^\\n]*\\|`, "i"));
}

assert.match(contract, /não enviar[^.\n]*(?:mensagem|contato externo)/i);
assert.match(contract, /não criar[^.\n]*repositório remoto/i);
assert.match(
  contract,
  /não (?:solicitar|usar|registrar|expor)[^.\n]*dados? sensíveis?/i,
);
assert.match(contract, /handoff[^.\n]*Carlos Eduardo/i);

assert.equal(
  fs.existsSync("skills/onboarding-new-clients"),
  true,
  "skill canônica ausente em skills/",
);

console.log("onboarding-new-clients: ok");
