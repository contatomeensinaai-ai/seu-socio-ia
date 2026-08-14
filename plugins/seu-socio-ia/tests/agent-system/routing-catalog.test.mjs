import assert from "node:assert/strict";
import fs from "node:fs";

const text = fs.existsSync("docs/AGENT_ORG.md")
  ? fs.readFileSync("docs/AGENT_ORG.md", "utf8")
  : "";

for (const section of [
  "Carlos Eduardo",
  "Marketing",
  "Vendas e Receita",
  "Produto",
  "Engenharia",
  "Operações",
  "Dados e Crescimento",
  "Financeiro",
  "Segurança",
  "Gates de aprovação",
]) {
  assert.ok(text.includes(section), `catálogo sem ${section}`);
}

for (const agent of [
  "marketing-chief",
  "revenue-chief",
  "product-chief",
  "engineering-chief",
  "operations-chief",
  "data-chief",
  "finance-chief",
  "security-auditor",
]) {
  assert.ok(text.includes(`\`${agent}\``), `catálogo sem ${agent}`);
}

for (const specialist of [
  "content-strategist",
  "conversion-copywriter",
  "creative-director",
  "brand-strategist",
  "paid-media-analyst",
  "meta-ads-specialist",
  "short-form-video-creator",
  "video-producer",
  "funnel-strategist",
  "crm-specialist",
  "sales-intelligence",
  "proposal-writer",
  "cart-recovery-specialist"
]) {
  assert.ok(text.includes(`\`${specialist}\``), `catálogo sem ${specialist}`);
}
for (const specialist of [
  "growth-analyst",
  "customer-value-analyst",
  "retention-analyst",
  "marketing-performance-analyst",
  "cashflow-analyst",
  "pricing-reviewer",
  "financial-scenario-analyst",
]) {
  assert.ok(text.includes(`\`${specialist}\``), `catálogo sem ${specialist}`);
}
assert.ok(text.includes("Especialistas de Marketing"));
assert.ok(text.includes("Especialistas de Vendas e Receita"));
assert.ok(
  text.includes("`marketing-chief` → Especialistas de Marketing"),
  "catálogo sem roteamento explícito de marketing-chief"
);
assert.ok(
  text.includes("`revenue-chief` → Especialistas de Vendas e Receita"),
  "catálogo sem roteamento explícito de revenue-chief"
);
assert.ok(
  text.includes("45 agentes"),
  "catálogo com estado da fase desatualizado"
);
assert.ok(text.includes("Especialistas de Dados e Crescimento"));
assert.ok(text.includes("Especialistas Financeiros"));
assert.ok(
  text.includes("`data-chief` → Especialistas de Dados e Crescimento"),
  "catálogo sem roteamento explícito de data-chief"
);
assert.ok(
  text.includes("`finance-chief` → Especialistas Financeiros"),
  "catálogo sem roteamento explícito de finance-chief"
);
assert.ok(
  text.includes("`paid-media-analyst` analisa mídia paga por canal e campanha; `marketing-performance-analyst` integra mídia, criativos, páginas e conversão"),
  "catálogo sem fronteira entre mídia paga e performance de marketing"
);
for (const identity of ["Isabela", "Bruno", "Lucas", "Leandro", "Larissa", "Beatriz", "Mateus"]) {
  assert.ok(text.includes(identity), `catálogo sem identidade ativa ${identity}`);
}

console.log("routing-catalog: ok");
