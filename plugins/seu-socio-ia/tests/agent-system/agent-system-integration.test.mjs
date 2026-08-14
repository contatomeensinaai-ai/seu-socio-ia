import assert from "node:assert/strict";
import fs from "node:fs";

const map = JSON.parse(fs.readFileSync("docs/agent-system/AGENT_CAPABILITY_MAP.json", "utf8"));
const matrix = JSON.parse(fs.readFileSync("tests/agent-system/agent-behavior-matrix.json", "utf8"));
const config = fs.readFileSync(".codex/config.toml", "utf8");
const org = fs.readFileSync("docs/AGENT_ORG.md", "utf8");

const runtimeIds = fs.readdirSync(".codex/agents")
  .filter((file) => file.endsWith(".toml"))
  .map((file) => file.slice(0, -5))
  .sort();
const configIds = [...config.matchAll(/^\[agents\.([^\]]+)\]$/gm)]
  .map((match) => match[1].replaceAll("_", "-"))
  .sort();
const mapIds = map.agents.map((agent) => agent.id).sort();
const matrixIds = matrix.agents.map((agent) => agent.id).sort();

assert.equal(runtimeIds.length, 45);
assert.deepEqual(mapIds, runtimeIds, "mapa e runtime devem conter os mesmos 45 agentes");
assert.deepEqual(configIds, runtimeIds, "config e runtime devem conter os mesmos 45 agentes");
assert.deepEqual(matrixIds, runtimeIds, "matriz e runtime devem conter os mesmos 45 agentes");
assert.match(org, /conjunto canônico possui 45 agentes/i);

const chiefIds = new Set(map.departments.map((department) => department.chief));
for (const agent of map.agents) {
  if (chiefIds.has(agent.id)) continue;
  const toml = fs.readFileSync(`.codex/agents/${agent.id}.toml`, "utf8");
  assert.match(toml, /Carlos Eduardo/i, `${agent.id} não devolve a Carlos Eduardo`);
  const expectedOwner = agent.owner === "carlos-eduardo" ? "Carlos Eduardo" : agent.owner;
  assert.ok(
    toml.includes(`Chief proprietário: ${expectedOwner}.`),
    `${agent.id} não declara o Chief proprietário ${expectedOwner}`,
  );
  assert.match(
    toml,
    /Especialista não delega nem aciona subagente\./,
    `${agent.id} não bloqueia subdelegação`,
  );
}

const skillIds = fs.readdirSync("skills")
  .filter((entry) => fs.statSync(`skills/${entry}`).isDirectory())
  .sort();
assert.deepEqual(map.skills.map((skill) => skill.id).sort(), skillIds);
for (const department of map.departments) {
  for (const skillId of department.skills) {
    assert.ok(skillIds.includes(skillId), `${department.id} referencia skill ausente ${skillId}`);
  }
}

console.log("agent-system-integration: ok");
