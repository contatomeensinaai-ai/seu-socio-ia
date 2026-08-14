import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const mapPath = "docs/agent-system/AGENT_CAPABILITY_MAP.json";
const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const agentDirectory = ".codex/agents";
const expectedSkills = [
  "auditing-imported-agent-systems",
  "building-mobile-first-sites",
  "codex-project-workflow",
  "criando-anuncios-gamificados",
  "onboarding-new-clients",
  "research-first",
  "roteirista-reels",
  "sou-business-context",
];
const expectedChiefs = [
  "carlos-eduardo",
  "marketing-chief",
  "revenue-chief",
  "product-chief",
  "engineering-chief",
  "operations-chief",
  "data-chief",
  "finance-chief",
  "security-auditor",
];

assert.equal(map.schemaVersion, 1, "o mapa deve declarar schemaVersion 1");
assert.equal(map.orchestrator.id, "carlos-eduardo", "Carlos deve ser o orquestrador canônico");
assert.deepEqual(
  map.policy,
  {
    entrypoint: "carlos-eduardo",
    delegationPath: ["carlos-eduardo", "chief", "specialist"],
    maxDelegationDepthAfterCarlos: 2,
    maxSubagentExecutionsPerRequest: 8,
    approvalRequiredAboveLimit: true,
    specialistMayDelegate: false,
    requiredHandoff: ["owner-chief", "carlos-eduardo"],
  },
  "a política de delegação deve limitar a rota a Carlos → Chief → especialista",
);

assert.equal(map.departments.length, 9, "o mapa deve registrar exatamente 9 departamentos");
assert.deepEqual(
  map.departments.map((department) => department.chief),
  expectedChiefs,
  "cada departamento deve ter exatamente o Chief canônico",
);

assert.equal(map.skills.length, 8, "o mapa deve registrar exatamente 8 skills");
assert.deepEqual(
  map.skills.map((skill) => skill.id),
  expectedSkills,
  "as skills canônicas devem ser as oito skills ativas",
);
for (const skill of map.skills) {
  assert.equal(skill.path, `skills/${skill.id}/SKILL.md`, `${skill.id} com path canônico incorreto`);
  assert.ok(fs.existsSync(skill.path), `skill canônica ausente: ${skill.path}`);
}

assert.equal(map.agents.length, 45, "o mapa deve registrar exatamente 45 agentes");
const agentIds = map.agents.map((agent) => agent.id);
assert.equal(new Set(agentIds).size, 45, "os 45 IDs de agente devem ser únicos");
const configuredAgentIds = fs.readdirSync(agentDirectory)
  .filter((entry) => entry.endsWith(".toml"))
  .map((entry) => path.basename(entry, ".toml"))
  .sort();
assert.deepEqual([...agentIds].sort(), configuredAgentIds, "o mapa deve cobrir exatamente os TOMLs ativos");

const departmentByChief = new Map(map.departments.map((department) => [department.chief, department]));
const registeredChiefs = new Set(expectedChiefs.filter((chief) => chief !== "carlos-eduardo"));
for (const agent of map.agents) {
  assert.equal(typeof agent.id, "string", "todo agente deve ter ID textual");
  assert.ok(expectedChiefs.includes(agent.owner), `${agent.id} deve ter um Chief owner válido`);
  if (registeredChiefs.has(agent.id)) {
    assert.equal(agent.owner, "carlos-eduardo", `${agent.id} deve responder diretamente a Carlos Eduardo`);
    continue;
  }
  const ownerDepartment = departmentByChief.get(agent.owner);
  assert.ok(ownerDepartment.specialists.includes(agent.id), `${agent.id} deve estar listado sob seu Chief owner`);
}

for (const department of map.departments) {
  assert.ok(Array.isArray(department.specialists), `${department.id} sem especialistas`);
  assert.ok(Array.isArray(department.skills), `${department.id} sem skills relevantes`);
  for (const skillId of department.skills) {
    assert.ok(expectedSkills.includes(skillId), `${department.id} referencia skill desconhecida: ${skillId}`);
  }
}

for (const department of map.departments.filter((department) => department.chief !== "carlos-eduardo")) {
  const chiefToml = fs.readFileSync(path.join(agentDirectory, `${department.chief}.toml`), "utf8");
  const specialistList = department.specialists.length ? department.specialists.join(", ") : "nenhum";
  assert.ok(
    chiefToml.includes(`Especialistas registrados: ${specialistList}.`),
    `${department.chief} deve enumerar seus especialistas registrados`,
  );
  assert.ok(
    chiefToml.includes(`Skills relevantes: ${department.skills.join(", ")}.`),
    `${department.chief} deve enumerar suas skills relevantes`,
  );
  assert.match(chiefToml, /Carlos Eduardo/i, `${department.chief} deve devolver o handoff a Carlos Eduardo`);
  if (department.specialists.length) {
    assert.match(chiefToml, /Especialista n[aã]o delega nem aciona subagente/i, `${department.chief} deve proibir delegação adicional pelo especialista`);
  }
}

const agentsInstructions = fs.readFileSync("AGENTS.md", "utf8");
for (const requiredText of [
  "Carlos → Chief → especialista",
  "Profundidade máxima: duas camadas após Carlos",
  "Limite padrão: oito execuções de subagentes por pedido",
  "Acima desse limite, Carlos deve obter aprovação explícita de Fabio",
  "Especialista não delega",
  "Chief e Carlos Eduardo",
]) {
  assert.ok(agentsInstructions.includes(requiredText), `AGENTS.md sem política: ${requiredText}`);
}

console.log("agent-capability-map: ok");
