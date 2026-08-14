import assert from "node:assert/strict";
import fs from "node:fs";

const candidates = [
  "planning-marketing-campaigns",
  "creating-meta-ads-campaigns",
  "writing-conversion-copy",
  "designing-sales-funnels",
  "writing-commercial-proposals"
];
const evalRoot = "tests/agent-system/phase-2/skill-evals";
const decisionPath = "tests/agent-system/phase-2/SKILL_CANDIDATE_EVALUATION.md";

for (const candidate of candidates) {
  const baselinePath = `${evalRoot}/${candidate}-baseline.md`;
  assert.ok(fs.existsSync(baselinePath), `baseline ausente: ${candidate}`);
  const baseline = fs.readFileSync(baselinePath, "utf8");
  for (const marker of [
    "Proveniência",
    "Agente executor",
    "Execution mode: actual fresh subagent",
    "Timestamp EDT",
    "Papel experimental",
    "Manifesto SHA-256",
    "Prompt-base",
    "Instrução experimental",
    "Resultado observado",
    "Output completo sanitizado observado",
    "Critérios atendidos",
    "Critérios ausentes"
  ]) {
    assert.ok(baseline.includes(marker), `${candidate} sem marcador ${marker}`);
  }
  assert.match(baseline, /Agente executor: `\/root\/execute_phase2_revenue\/baseline_[^`]+`/i, `${candidate} sem task canônica`);
  assert.match(baseline, /Timestamp EDT: `2026-07-23T\d{2}:\d{2}:\d{2}-0400`/i, `${candidate} sem timestamp auditável`);
  assert.match(
    baseline,
    /Você é um especialista independente avaliando um caso fechado da CAIXA-PRETA\. Use somente os paths do manifesto/i,
    `${candidate} diverge do papel controlado`
  );
  assert.match(baseline, /## (?:Confirmação de )?Nenhuma ação externa/i, `${candidate} sem confirmação operacional`);
  assert.match(baseline, /Nenhuma falha RED/i, `${candidate} não comprova ausência de gap`);
  assert.equal(fs.existsSync(`skills/${candidate}`), false, `skill redundante criada: ${candidate}`);
  assert.equal(fs.existsSync(`skills/${candidate}`), false, `espelho proibido criado: ${candidate}`);
  assert.equal(fs.existsSync(`${evalRoot}/${candidate}-forward-test.md`), false, `forward indevido criado: ${candidate}`);
}

assert.ok(fs.existsSync(decisionPath), "revisão de escopo das candidatas ausente");
const decision = fs.readFileSync(decisionPath, "utf8");
for (const candidate of candidates) assert.ok(decision.includes(`\`${candidate}\``), `decisão sem ${candidate}`);
assert.match(decision, /5 candidatas avaliadas/i);
assert.match(decision, /5 sem gap/i);
assert.match(decision, /0 skills criadas/i);
assert.match(decision, /Tasks 7 a 12[^.]*N\/A/i);
assert.match(decision, /Carlos Eduardo/i);

console.log("phase-2-skills: 5 avaliadas, 0 criadas");
