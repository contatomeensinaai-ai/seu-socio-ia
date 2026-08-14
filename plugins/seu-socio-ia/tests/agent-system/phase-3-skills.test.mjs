import assert from "node:assert/strict";
import fs from "node:fs";

const productBaselinePath = "tests/agent-system/validating-product-opportunities-baseline.md";
const productSkillPath = "skills/validating-product-opportunities";
const mobileSkillPath = "skills/building-mobile-first-sites/SKILL.md";
const onboardingSkillPath = "skills/onboarding-new-clients/SKILL.md";

assert.ok(fs.existsSync(productBaselinePath), "baseline de Produto ausente");
const productBaseline = fs.readFileSync(productBaselinePath, "utf8");
assert.equal((productBaseline.match(/\|\s*[1-4]\.[^|\n]*\|\s*PASS\s*\|/g) ?? []).length, 4);
assert.match(productBaseline, /sem gap e revisão de escopo necessária/i);
assert.match(productBaseline, /não é RED/i);
assert.match(productBaseline, /não criar teste estrutural, diretório, arquivo da skill ou forward test/i);
assert.match(productBaseline, /não há próximo executor até Fabio aprovar/i);
assert.equal(fs.existsSync(productSkillPath), false, "skill de Produto rejeitada não deve existir");
assert.equal(
  fs.existsSync("tests/agent-system/validating-product-opportunities-forward-test.md"),
  false,
  "forward test de Produto não deve existir",
);
assert.equal(
  fs.existsSync("tests/agent-system/validating-product-opportunities.test.mjs"),
  false,
  "teste estrutural de Produto não deve existir",
);

for (const [name, skillPath] of [
  ["building-mobile-first-sites", mobileSkillPath],
  ["onboarding-new-clients", onboardingSkillPath],
]) {
  assert.ok(fs.existsSync(skillPath), `skill aceita ausente: ${name}`);
  const skill = fs.readFileSync(skillPath, "utf8");
  assert.match(skill, new RegExp(`^name:\\s*${name}$`, "m"));
  assert.match(skill, /^description:\s*Use when/m);
}

console.log("phase-3-skills: Produto rejeitada; Mobile e Onboarding existentes");
