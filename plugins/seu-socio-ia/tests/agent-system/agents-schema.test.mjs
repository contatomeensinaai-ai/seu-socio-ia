import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

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
const expectedIds = Object.keys(expectedAgents);
assert.equal(expectedIds.length, 45, "catálogo cumulativo deve terminar com 45 agentes");
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

const files = fs.readdirSync(agentsDir)
  .filter((name) => name.endsWith(".toml"))
  .sort();
assert.deepEqual(files, expectedIds.map((id) => `${id}.toml`).sort(), "arquivos de agentes devem ser exatamente os 44 registrados");

for (const id of expectedIds) {
  const file = `${id}.toml`;
  const text = fs.readFileSync(path.join(agentsDir, file), "utf8");
  const field = (key) => {
    const values = [...text.matchAll(new RegExp(`^${key}\\s*=\\s*"([^"]+)"\\s*$`, "gm"))];
    assert.equal(values.length, 1, `${file} deve declarar exatamente um ${key}`);
    return values[0][1];
  };
  assert.ok(field("description"), `${file} com description vazia`);
  assert.equal(field("name"), id, `${file} deve ter name igual ao seu ID`);
  assert.equal(field("sandbox_mode"), expectedAgents[id].sandbox, `${id} deve usar sandbox ${expectedAgents[id].sandbox}`);

  const instructions = [...text.matchAll(/^developer_instructions\s*=\s*"""([\s\S]*?)"""/gm)];
  assert.equal(instructions.length, 1, `${id} deve declarar exatamente um developer_instructions em bloco`);
  for (const heading of contractHeadings) {
    assert.match(instructions[0][1], new RegExp(`^${heading.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}`, "m"), `${id} sem elemento contratual: ${heading}`);
  }
  const handoff = instructions[0][1].match(/^Handoff para o próximo responsável:\s*(.+)$/m)?.[1];
  assert.ok(handoff, `${id} sem conteúdo de handoff`);
  assert.match(handoff, /toda resposta[^.]*Carlos Eduardo/i, `${id} deve devolver toda resposta a Carlos Eduardo`);
  for (const outcome of [/recusa/i, /bloqueio/i, /pedido de aprovação/i]) {
    assert.match(handoff, outcome, `${id} deve aplicar o handoff também a ${outcome.source}`);
  }
  assert.match(handoff, /quando houver execução subsequente, nomeie/i, `${id} deve nomear o próximo responsável funcional quando houver execução subsequente`);
  assert.match(handoff, /não houver próximo executor[^.]*Fabio aprovar/i, `${id} deve declarar quando não há próximo executor até Fabio aprovar`);
}

const config = fs.readFileSync(".codex/config.toml", "utf8");
assert.match(config, /max_concurrent_threads_per_session\s*=\s*4/);
assert.equal(/max_depth\s*=/.test(config), false, "config ainda depende de max_depth");
const configEntries = [...config.matchAll(/^\[agents\.([^\]]+)\]\n([\s\S]*?)(?=^\[|(?![\s\S]))/gm)];
assert.deepEqual(configEntries.map((entry) => entry[1]).sort(), expectedIds.map((id) => expectedAgents[id].configId).sort(), "config deve registrar exatamente os 45 agentes");
for (const id of expectedIds) {
  const { configId } = expectedAgents[id];
  const entry = configEntries.find((candidate) => candidate[1] === configId);
  assert.ok(entry, `config sem ${configId}`);
  const configFiles = [...entry[2].matchAll(/^config_file\s*=\s*"([^"]+)"\s*$/gm)];
  assert.equal(configFiles.length, 1, `${configId} deve declarar exatamente um config_file`);
  assert.equal(configFiles[0][1], `agents/${id}.toml`, `${configId} deve apontar para agents/${id}.toml`);
}

console.log("agents-schema: ok");
