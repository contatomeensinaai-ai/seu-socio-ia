import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const matrixPath = "tests/agent-system/agent-behavior-matrix.json";
const agentsDir = ".codex/agents";
const expectedAgents = {
  explorer: { configId: "explorer", sandbox: "read-only" },
  reviewer: { configId: "reviewer", sandbox: "read-only" },
  "business-researcher": { configId: "business_researcher", sandbox: "read-only" },
  "marketing-chief": { configId: "marketing_chief", sandbox: "workspace-write" },
  "revenue-chief": { configId: "revenue_chief", sandbox: "workspace-write" },
  "product-chief": { configId: "product_chief", sandbox: "workspace-write" },
  "engineering-chief": { configId: "engineering_chief", sandbox: "workspace-write" },
  "operations-chief": { configId: "operations_chief", sandbox: "workspace-write" },
  "data-chief": { configId: "data_chief", sandbox: "read-only" },
  "finance-chief": { configId: "finance_chief", sandbox: "read-only" },
  "security-auditor": { configId: "security_auditor", sandbox: "read-only" },
  "content-strategist": { configId: "content_strategist", sandbox: "workspace-write" },
  "conversion-copywriter": { configId: "conversion_copywriter", sandbox: "workspace-write" },
  "creative-director": { configId: "creative_director", sandbox: "workspace-write" },
  "brand-strategist": { configId: "brand_strategist", sandbox: "read-only" },
  "paid-media-analyst": { configId: "paid_media_analyst", sandbox: "read-only" },
  "meta-ads-specialist": { configId: "meta_ads_specialist", sandbox: "workspace-write" },
  "video-producer": { configId: "video_producer", sandbox: "workspace-write" },
  "short-form-video-creator": { configId: "short_form_video_creator", sandbox: "workspace-write" },
  "funnel-strategist": { configId: "funnel_strategist", sandbox: "workspace-write" },
  "crm-specialist": { configId: "crm_specialist", sandbox: "read-only" },
  "sales-intelligence": { configId: "sales_intelligence", sandbox: "read-only" },
  "proposal-writer": { configId: "proposal_writer", sandbox: "workspace-write" },
  "cart-recovery-specialist": { configId: "cart_recovery_specialist", sandbox: "workspace-write" },
  "product-researcher": { configId: "product_researcher", sandbox: "read-only" },
  "offer-architect": { configId: "offer_architect", sandbox: "workspace-write" },
  "course-architect": { configId: "course_architect", sandbox: "workspace-write" },
  "solution-designer": { configId: "solution_designer", sandbox: "workspace-write" },
  "frontend-engineer": { configId: "frontend_engineer", sandbox: "workspace-write" },
  "backend-engineer": { configId: "backend_engineer", sandbox: "workspace-write" },
  "database-engineer": { configId: "database_engineer", sandbox: "workspace-write" },
  "devops-engineer": { configId: "devops_engineer", sandbox: "workspace-write" },
  "qa-engineer": { configId: "qa_engineer", sandbox: "workspace-write" },
  "finance-invariants-reviewer": { configId: "finance_invariants_reviewer", sandbox: "read-only" },
  "onboarding-specialist": { configId: "onboarding_specialist", sandbox: "workspace-write" },
  "implementation-manager": { configId: "implementation_manager", sandbox: "workspace-write" },
  "customer-success-specialist": { configId: "customer_success_specialist", sandbox: "workspace-write" },
  "communications-coordinator": { configId: "communications_coordinator", sandbox: "workspace-write" },
  "growth-analyst": { configId: "growth_analyst", sandbox: "read-only" },
  "customer-value-analyst": { configId: "customer_value_analyst", sandbox: "read-only" },
  "retention-analyst": { configId: "retention_analyst", sandbox: "read-only" },
  "marketing-performance-analyst": { configId: "marketing_performance_analyst", sandbox: "read-only" },
  "cashflow-analyst": { configId: "cashflow_analyst", sandbox: "read-only" },
  "pricing-reviewer": { configId: "pricing_reviewer", sandbox: "read-only" },
  "financial-scenario-analyst": { configId: "financial_scenario_analyst", sandbox: "read-only" },
};
const expectedIds = Object.keys(expectedAgents).sort();
const contractHeadings = [
  "Identidade e cargo:",
  "Gatilhos de uso:",
  "Entradas esperadas:",
  "Responsabilidades:",
  "Limites e proibições:",
  "Fontes de contexto:",
  "Formato de entrega:",
  "Gate de aprovação:",
  "Critério de conclusão:",
  "Handoff para o próximo responsável:",
];

assert.ok(fs.existsSync(matrixPath), "matriz comportamental ausente");
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
assert.equal(matrix.schemaVersion, 1, "schemaVersion da matriz deve ser 1");
assert.ok(Array.isArray(matrix.agents), "matriz deve conter agents como lista");
assert.equal(matrix.agents.length, expectedIds.length, "matriz deve conter exatamente 45 agentes");

const ids = matrix.agents.map((agent) => agent.id);
assert.deepEqual([...ids].sort(), expectedIds, "matriz deve conter exatamente os IDs canônicos, sem duplicatas");
assert.equal(new Set(ids).size, ids.length, "IDs da matriz devem ser únicos");

for (const agent of matrix.agents) {
  const expected = expectedAgents[agent.id];
  assert.equal(agent.configId, expected.configId, `${agent.id} com configId incorreto`);
  assert.equal(agent.toml, `agents/${agent.id}.toml`, `${agent.id} com TOML incorreto`);
  assert.equal(agent.sandbox, expected.sandbox, `${agent.id} com sandbox incorreto`);
  assert.ok(agent.scenarios && typeof agent.scenarios === "object", `${agent.id} sem cenários`);

  for (const scenarioName of ["positive", "boundary"]) {
    const scenario = agent.scenarios[scenarioName];
    assert.ok(scenario && typeof scenario === "object", `${agent.id} sem cenário ${scenarioName}`);
    for (const field of ["prompt", "expectedGate", "expectedHandoff"]) {
      assert.equal(typeof scenario[field], "string", `${agent.id}/${scenarioName} sem ${field}`);
      assert.ok(scenario[field].trim(), `${agent.id}/${scenarioName} com ${field} vazio`);
    }
    assert.ok(Array.isArray(scenario.requiredSignals), `${agent.id}/${scenarioName} sem requiredSignals`);
    assert.ok(scenario.requiredSignals.length >= 2, `${agent.id}/${scenarioName} requer ao menos dois sinais`);
    for (const signal of scenario.requiredSignals) {
      assert.equal(typeof signal, "string", `${agent.id}/${scenarioName} possui sinal inválido`);
      assert.ok(signal.trim(), `${agent.id}/${scenarioName} possui sinal vazio`);
    }

    if (scenarioName === "positive") {
      assert.equal(scenario.selfContained, true, `${agent.id}/positive deve declarar contexto autossuficiente`);
      assert.equal(typeof scenario.inputContext, "string", `${agent.id}/positive sem inputContext`);
      assert.ok(scenario.inputContext.trim(), `${agent.id}/positive com inputContext vazio`);
    }
  }

  const tomlPath = path.join(agentsDir, `${agent.id}.toml`);
  const toml = fs.readFileSync(tomlPath, "utf8");
  assert.match(toml, new RegExp(`^name\\s*=\\s*"${agent.id}"\\s*$`, "m"), `${agent.id} sem name correspondente`);
  assert.match(toml, new RegExp(`^sandbox_mode\\s*=\\s*"${agent.sandbox}"\\s*$`, "m"), `${agent.id} sem sandbox correspondente`);
  for (const heading of contractHeadings) {
    assert.ok(toml.includes(heading), `${agent.id} sem elemento contratual: ${heading}`);
  }
}

const phase2Path = "tests/agent-system/phase-2-specialist-behavior-matrix.json";
const phase2 = JSON.parse(fs.readFileSync(phase2Path, "utf8"));
for (const phase2Agent of phase2.agents) {
  const consolidated = matrix.agents.find((agent) => agent.id === phase2Agent.id);
  assert.deepEqual(
    consolidated.scenarios.positive.prompt,
    phase2Agent.scenarios.positive.prompt,
    `${phase2Agent.id}/positive deve preservar o cenário da Fase 2`,
  );
  assert.deepEqual(
    consolidated.scenarios.boundary,
    phase2Agent.scenarios.boundary,
    `${phase2Agent.id}/boundary deve preservar o cenário da Fase 2`,
  );
}

const phase3Boundaries = {
  "product-researcher": /autorize.*build/i,
  "offer-architect": /publique.*oferta/i,
  "course-architect": /publique.*curso/i,
  "solution-designer": /dados.*sensíveis.*integração/i,
  "frontend-engineer": /publique.*landing/i,
  "backend-engineer": /produção/i,
  "database-engineer": /migração.*produção/i,
  "devops-engineer": /deploy.*DNS/i,
  "qa-engineer": /conta.*ao vivo/i,
  "finance-invariants-reviewer": /movimente.*dinheiro/i,
  "onboarding-specialist": /contate.*cliente/i,
  "implementation-manager": /sistema externo/i,
  "customer-success-specialist": /reembolso/i,
  "communications-coordinator": /envie.*publique.*contate/i,
};
for (const [id, pattern] of Object.entries(phase3Boundaries)) {
  const boundary = matrix.agents.find((agent) => agent.id === id).scenarios.boundary;
  assert.match(boundary.prompt, pattern, `${id}/boundary deve cobrir o limite concreto do papel`);
  assert.match(boundary.expectedGate, /Fabio/i, `${id}/boundary deve exigir gate de Fabio`);
  assert.match(boundary.expectedHandoff, /Carlos Eduardo/i, `${id}/boundary deve retornar a Carlos Eduardo`);
}

const reviewerPositive = matrix.agents.find((agent) => agent.id === "reviewer").scenarios.positive;
assert.match(reviewerPositive.prompt, /dono da entrega: engineering-chief/i, "reviewer/positive deve nomear o dono da entrega");
assert.match(reviewerPositive.expectedHandoff, /Carlos Eduardo e engineering-chief/i, "reviewer/positive deve encaminhar a Carlos Eduardo e engineering-chief");

const financePositive = matrix.agents.find((agent) => agent.id === "finance-chief").scenarios.positive;
assert.match(financePositive.prompt, /não há recebíveis confirmados após 15\/07/i, "finance-chief/positive deve negar recebíveis futuros confirmados");
assert.match(financePositive.prompt, /não inclua entradas futuras em nenhum cenário/i, "finance-chief/positive deve proibir entradas futuras nos cenários");
assert.ok(financePositive.requiredSignals.includes("não inclui entradas futuras sem confirmação"), "finance-chief/positive deve exigir que não sejam inventadas entradas futuras");

const dataBoundary = matrix.agents.find((agent) => agent.id === "data-chief").scenarios.boundary;
assert.ok(dataBoundary.requiredSignals.some((signal) => signal.includes("marketing-chief")), "data-chief/boundary deve exigir handoff ao marketing-chief");
assert.match(dataBoundary.expectedHandoff, /Carlos Eduardo e marketing-chief/i, "data-chief/boundary deve encaminhar campanha e orçamento ao marketing-chief");
assert.match(dataBoundary.expectedHandoff, /finance-chief.*somente.*validação orçamentária/i, "data-chief/boundary deve limitar finance-chief à validação orçamentária");

const config = fs.readFileSync(".codex/config.toml", "utf8");
for (const agent of matrix.agents) {
  const entry = new RegExp(
    `^\\[agents\\.${agent.configId}\\]\\n(?:[^\\n]*\\n)*?config_file\\s*=\\s*"${agent.toml.replace(".", "\\.")}"\\s*$`,
    "m",
  );
  assert.match(config, entry, `${agent.id} não está mapeado corretamente em .codex/config.toml`);
}

console.log("agent-behavior-matrix: ok");
