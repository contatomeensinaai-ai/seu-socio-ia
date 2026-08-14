import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const canonicalRoot = "skills";
const legacyRoot = path.join(".agents", "skills");
const expected = [
  "auditing-imported-agent-systems",
  "building-mobile-first-sites",
  "codex-project-workflow",
  "criando-anuncios-gamificados",
  "onboarding-new-clients",
  "research-first",
  "roteirista-reels",
  "sou-business-context",
];

const actual = fs.readdirSync(canonicalRoot)
  .filter((name) => fs.statSync(path.join(canonicalRoot, name)).isDirectory())
  .sort();
assert.deepEqual(actual, expected, "a biblioteca canônica deve conter exatamente as 8 skills aprovadas");

for (const id of expected) {
  const skill = fs.readFileSync(path.join(canonicalRoot, id, "SKILL.md"), "utf8");
  const metadataPath = path.join(canonicalRoot, id, "agents", "openai.yaml");
  assert.ok(fs.existsSync(metadataPath), `${id} sem agents/openai.yaml`);
  const metadata = fs.readFileSync(metadataPath, "utf8");
  assert.match(skill, new RegExp(`^name:\\s*${id}$`, "m"), `${id} com frontmatter divergente`);
  assert.match(metadata, /default_prompt:/, `${id} sem default_prompt`);
  assert.match(metadata, new RegExp(`\\$${id}\\b`), `${id} sem gatilho explícito no default_prompt`);
}

const legacySkills = fs.existsSync(legacyRoot)
  ? fs.readdirSync(legacyRoot).filter((name) => fs.existsSync(path.join(legacyRoot, name, "SKILL.md")))
  : [];
assert.deepEqual(legacySkills, [], "skills legadas não podem manter espelhos de SKILL.md");

const workflow = fs.readFileSync(path.join(canonicalRoot, "codex-project-workflow", "SKILL.md"), "utf8");
assert.doesNotMatch(workflow, /espelh[ea].*`skills\//i, "workflow não pode instruir espelhamento legado");
assert.doesNotMatch(workflow, /\.agents\/skills\//, "workflow não pode depender da raiz legada");
assert.match(workflow, /skills\//, "workflow deve declarar a raiz canônica do plugin");

console.log("skill-library-wiring: ok");
