import assert from "node:assert/strict";
import fs from "node:fs";

const catalogPath = "docs/AGENT_ORG.md";
const text = fs.existsSync(catalogPath) ? fs.readFileSync(catalogPath, "utf8") : "";
const canonicalGates = `### Lista canônica de gates de aprovação

Exigir aprovação explícita de Fabio antes de:

- publicar conteúdo;
- enviar mensagem ou email;
- criar ou alterar campanha;
- movimentar orçamento ou dinheiro;
- fazer deploy;
- configurar domínio ou DNS;
- criar, alterar ou excluir repositório remoto;
- alterar dado financeiro;
- assinar, enviar ou modificar contrato;
- acessar dado sensível de cliente;
- apagar ou sobrescrever material relevante.

Hooks, bots, instaladores e scripts importados nunca podem ser executados antes de auditoria estática e aprovação explícita de Fabio.`;

const departments = {
  "Especialistas de Produto": [
    "product-researcher",
    "offer-architect",
    "course-architect",
    "solution-designer",
  ],
  "Especialistas de Engenharia": [
    "frontend-engineer",
    "backend-engineer",
    "database-engineer",
    "devops-engineer",
    "qa-engineer",
    "finance-invariants-reviewer",
  ],
  "Especialistas de Operações": [
    "onboarding-specialist",
    "implementation-manager",
    "customer-success-specialist",
    "communications-coordinator",
  ],
};

for (const [heading, specialists] of Object.entries(departments)) {
  const start = text.indexOf(`## ${heading}`);
  assert.ok(start >= 0, `catálogo sem seção ${heading}`);
  const end = text.indexOf("\n## ", start + 1);
  const section = text.slice(start, end < 0 ? undefined : end);
  for (const specialist of specialists) {
    assert.ok(section.includes(`\`${specialist}\``), `${specialist} fora de ${heading}`);
  }
}

for (const forbiddenRoute of [
  "`product-chief` → `solution-designer` → `engineering-chief`",
  "`engineering-chief` → `qa-engineer` → `reviewer`",
  "`revenue-chief` → `operations-chief` → `onboarding-specialist`",
]) {
  assert.equal(text.includes(forbiddenRoute), false, `rota direta proibida ainda presente: ${forbiddenRoute}`);
}
for (const routePattern of [
  /Carlos delega ao `product-chief`[\s\S]{0,250}`solution-designer`[\s\S]{0,250}volta a Carlos[\s\S]{0,250}handoff ao `engineering-chief`/i,
  /Carlos delega ao `engineering-chief`[\s\S]{0,250}`qa-engineer`[\s\S]{0,250}voltam ao Chief e a Carlos[\s\S]{0,250}handoff ao `reviewer`/i,
  /`revenue-chief` devolve o contexto a Carlos[\s\S]{0,250}handoff ao `operations-chief`[\s\S]{0,250}`onboarding-specialist`/i,
]) {
  assert.match(text, routePattern, `rota via Carlos ausente: ${routePattern}`);
}

assert.match(
  text,
  /`communications-coordinator`[\s\S]{0,500}somente rascunho/i,
  "communications-coordinator deve ser somente draft",
);
assert.match(
  text,
  /`devops-engineer`[\s\S]{0,500}somente preparação local/i,
  "devops-engineer deve ser somente preparação/local",
);
assert.ok(text.includes(canonicalGates), "bloco canônico de gates foi alterado");

for (const example of [
  "Produto validado segue para solution design",
  "Landing page mobile segue para QA e reviewer",
  "Venda confirmada segue para onboarding",
  "Pedido de deploy para na aprovação de Fabio",
]) {
  assert.ok(text.includes(example), `exemplo de entrega ausente: ${example}`);
}

console.log("delivery-routing: ok");
