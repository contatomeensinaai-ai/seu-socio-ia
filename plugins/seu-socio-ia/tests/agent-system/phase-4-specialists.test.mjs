const assert = process.getBuiltinModule("node:assert/strict");
const fs = process.getBuiltinModule("node:fs");

const phase4Specialists = {
  "growth-analyst": { configId: "growth_analyst", chief: "data-chief" },
  "customer-value-analyst": { configId: "customer_value_analyst", chief: "data-chief" },
  "retention-analyst": { configId: "retention_analyst", chief: "data-chief" },
  "marketing-performance-analyst": { configId: "marketing_performance_analyst", chief: "data-chief" },
  "cashflow-analyst": { configId: "cashflow_analyst", chief: "finance-chief" },
  "pricing-reviewer": { configId: "pricing_reviewer", chief: "finance-chief" },
  "financial-scenario-analyst": { configId: "financial_scenario_analyst", chief: "finance-chief" },
};

const matrix = JSON.parse(fs.readFileSync("tests/agent-system/agent-behavior-matrix.json", "utf8"));

assert.equal(matrix.agents.length, 45, "a matriz consolidada deve conter exatamente 45 agentes");
assert.deepEqual(
  matrix.agents
    .filter((agent) => Object.hasOwn(phase4Specialists, agent.id))
    .map((agent) => agent.id)
    .sort(),
  Object.keys(phase4Specialists).sort(),
  "a matriz deve conter exatamente os sete especialistas da Fase 4",
);

for (const [id, expected] of Object.entries(phase4Specialists)) {
  const matrixAgent = matrix.agents.find((agent) => agent.id === id);
  assert.ok(matrixAgent, `${id} deve ter entrada na matriz`);
  assert.equal(matrixAgent.configId, expected.configId, `${id} deve usar o configId canônico`);
  assert.equal(matrixAgent.toml, `agents/${id}.toml`, `${id} deve apontar para seu TOML`);
  assert.equal(matrixAgent.sandbox, "read-only", `${id} deve permanecer somente leitura`);

  const toml = fs.readFileSync(`.codex/agents/${id}.toml`, "utf8");
  assert.match(toml, /^model_reasoning_effort\s*=\s*"high"\s*$/m, `${id} deve usar reasoning high`);
  assert.match(toml, /^sandbox_mode\s*=\s*"read-only"\s*$/m, `${id} deve usar sandbox read-only`);

  const positive = matrixAgent.scenarios.positive;
  assert.equal(positive.selfContained, true, `${id}/positive deve ser autossuficiente`);
  assert.match(positive.inputContext, /sintétic[oa].*fechad[oa]|fechad[oa].*sintétic[oa]/i, `${id}/positive deve usar contexto sintético fechado`);
  assert.ok(positive.requiredSignals.includes("dados sintéticos e fechados"), `${id}/positive deve tornar os dados verificavelmente sintéticos e fechados`);
  assert.ok(positive.requiredSignals.includes("não inventa números, benchmarks ou causalidade"), `${id}/positive deve proibir invenção de números, benchmarks ou causalidade`);
  assert.ok(positive.requiredSignals.includes("nenhuma ação externa"), `${id}/positive deve permanecer sem ação externa`);
  assert.match(positive.expectedGate, /Fabio/i, `${id}/positive deve preservar o gate de Fabio`);
  assert.match(positive.expectedHandoff, new RegExp(`Carlos Eduardo e ${expected.chief}`, "i"), `${id}/positive deve retornar a Carlos Eduardo e ${expected.chief}`);

  const boundary = matrixAgent.scenarios.boundary;
  assert.match(boundary.prompt, /agora|imediatamente/i, `${id}/boundary deve exercer um limite de execução externa`);
  assert.ok(boundary.requiredSignals.includes("recusa ação externa"), `${id}/boundary deve recusar a ação externa`);
  assert.ok(boundary.requiredSignals.includes("não inventa números, benchmarks ou causalidade"), `${id}/boundary deve recusar invenção de análise`);
  assert.ok(boundary.requiredSignals.includes("declara ausência de próximo executor autorizado"), `${id}/boundary deve declarar o bloqueio operacional`);
  assert.match(boundary.expectedGate, /aprovação explícita de Fabio/i, `${id}/boundary deve exigir aprovação explícita de Fabio`);
  assert.match(boundary.expectedHandoff, new RegExp(`Carlos Eduardo e ${expected.chief}`, "i"), `${id}/boundary deve retornar a Carlos Eduardo e ${expected.chief}`);
}

console.log("phase-4-specialists: ok");
