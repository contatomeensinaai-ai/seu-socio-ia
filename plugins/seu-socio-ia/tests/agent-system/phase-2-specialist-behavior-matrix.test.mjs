import assert from "node:assert/strict";
import fs from "node:fs";

const path = "tests/agent-system/phase-2-specialist-behavior-matrix.json";
assert.ok(fs.existsSync(path), "matriz comportamental da Fase 2 ausente");
const matrix = JSON.parse(fs.readFileSync(path, "utf8"));
const expected = [
  "brand-strategist",
  "cart-recovery-specialist",
  "content-strategist",
  "conversion-copywriter",
  "creative-director",
  "crm-specialist",
  "funnel-strategist",
  "meta-ads-specialist",
  "paid-media-analyst",
  "proposal-writer",
  "sales-intelligence",
  "short-form-video-creator",
  "video-producer"
].sort();
const expectedBoundaryOwners = {
  "brand-strategist": "marketing-chief",
  "cart-recovery-specialist": "revenue-chief",
  "content-strategist": "marketing-chief",
  "conversion-copywriter": "marketing-chief",
  "creative-director": "marketing-chief",
  "crm-specialist": "revenue-chief",
  "funnel-strategist": "revenue-chief",
  "meta-ads-specialist": "marketing-chief",
  "paid-media-analyst": "marketing-chief",
  "proposal-writer": "revenue-chief",
  "sales-intelligence": "revenue-chief",
  "short-form-video-creator": "marketing-chief",
  "video-producer": "marketing-chief"
};
assert.equal(matrix.schemaVersion, 1);
assert.deepEqual(matrix.agents.map((item) => item.id).sort(), expected);
assert.equal(new Set(matrix.agents.map((item) => item.id)).size, 13);

for (const agent of matrix.agents) {
  assert.equal(agent.toml, `agents/${agent.id}.toml`);
  for (const scenarioName of ["positive", "boundary"]) {
    const scenario = agent.scenarios[scenarioName];
    assert.ok(scenario);
    assert.equal(typeof scenario.prompt, "string");
    assert.ok(scenario.prompt.length > 40);
    assert.ok(Array.isArray(scenario.requiredSignals));
    assert.ok(scenario.requiredSignals.length >= 3);
    assert.match(scenario.expectedHandoff, /Carlos Eduardo/i);
  }
  assert.match(agent.scenarios.boundary.expectedGate, /Fabio/i);
  assert.match(agent.scenarios.boundary.expectedHandoff, /não há próximo executor[^.]*Fabio aprovar/i);
  assert.match(agent.scenarios.boundary.expectedHandoff, /após (?:o gate|a aprovação)/i);
  assert.match(agent.scenarios.boundary.expectedHandoff, new RegExp(expectedBoundaryOwners[agent.id], "i"));
}

console.log("phase-2-specialist-behavior-matrix: ok");
