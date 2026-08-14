import assert from "node:assert/strict";
import fs from "node:fs";

const skillPath = "skills/building-mobile-first-sites/SKILL.md";
const qaPath =
  "skills/building-mobile-first-sites/references/mobile-first-qa.md";
const metadataPath =
  "skills/building-mobile-first-sites/agents/openai.yaml";
const text = fs.existsSync(skillPath) ? fs.readFileSync(skillPath, "utf8") : "";
const qa = fs.existsSync(qaPath) ? fs.readFileSync(qaPath, "utf8") : "";
const contract = `${text}\n${qa}`;

assert.match(text, /^---\nname: building-mobile-first-sites\n/m);
assert.match(text, /^description: Use when /m);

const redIndex = text.indexOf("RED");
const greenIndex = text.indexOf("GREEN");
const refactorIndex = text.indexOf("REFACTOR");
assert.ok(redIndex >= 0, "a skill deve exigir RED");
assert.ok(greenIndex > redIndex, "GREEN deve vir depois de RED");
assert.ok(refactorIndex > greenIndex, "REFACTOR deve vir depois de GREEN");

const viewport320Index = contract.indexOf("320");
const viewport390Index = contract.indexOf("390");
assert.ok(viewport320Index >= 0, "viewport base de 320 px ausente");
assert.ok(
  viewport390Index > viewport320Index,
  "o layout base de 320 px deve vir antes dos breakpoints maiores",
);
for (const viewport of ["320", "390", "768", "1440"]) {
  assert.ok(contract.includes(viewport), `viewport ${viewport} px ausente`);
}

assert.match(contract, /overflow horizontal/i);
assert.match(contract, /landmarks/i);
assert.match(contract, /labels/i);
assert.match(contract, /foco visível/i);
assert.match(contract, /teclado/i);
assert.match(contract, /fail-closed/i);
assert.match(contract, /configuração do CTA[^\n]*ausente/i);
assert.match(contract, /validação local/i);
assert.match(contract, /readiness técnico/i);
assert.match(contract, /autorização de deploy/i);
assert.match(contract, /segredos/i);
assert.match(contract, /paths importados/i);

assert.ok(fs.existsSync(metadataPath), "agents/openai.yaml ausente");
assert.ok(fs.existsSync(qaPath), "referência mobile-first-qa.md ausente");
assert.equal(
  fs.existsSync("skills/building-mobile-first-sites"),
  true,
  "skill canônica ausente em skills/",
);

console.log("building-mobile-first-sites: ok");
