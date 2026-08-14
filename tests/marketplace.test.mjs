import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("marketplace exposes only the neutral architect plugin", () => {
  const marketplace = JSON.parse(read(".agents/plugins/marketplace.json"));
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, "seu-socio-ia");
  assert.equal(marketplace.plugins[0].source.path, "./plugins/seu-socio-ia");
});

test("package contains no customer, creator, or internal business memory", () => {
  const forbiddenPaths = ["plugins/seu-socio-ia/knowledge", "plugins/seu-socio-ia/.codex/agents"];
  for (const item of forbiddenPaths) assert.equal(fs.existsSync(path.join(root, item)), false, `${item} must not ship`);
  const shippedRoots = [
    path.join(root, ".agents", "plugins", "marketplace.json"),
    path.join(root, "README.md"),
    path.join(root, "plugins", "seu-socio-ia"),
  ];
  const files = shippedRoots.flatMap((item) => {
    if (fs.statSync(item).isFile()) return [item];
    return fs.readdirSync(item, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.parentPath, entry.name));
  });
  const shipped = files.map((file) => fs.readFileSync(file, "utf8")).join("\n").toLowerCase();
  for (const forbidden of ["fabio borges", "me ensina ai", "carlos eduardo", "s.o.u."]) assert.equal(shipped.includes(forbidden), false, `${forbidden} must not ship`);
});

test("architect requires confirmation and creates only local student-owned context", () => {
  const instructions = read("plugins/seu-socio-ia/AGENTS.md");
  assert.match(instructions, /confirmação clara/i);
  assert.match(instructions, /base exclusivamente no que o aluno informar/i);
  assert.match(instructions, /não crie integrações/i);
  assert.match(instructions, /\.codex\/agents\/<agente>\.toml/);
});
