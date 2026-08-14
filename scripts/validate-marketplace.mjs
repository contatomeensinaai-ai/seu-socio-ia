import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pluginRoot = path.join(root, "plugins", "seu-socio-ia");
const errors = [];
const fail = (message) => errors.push(message);
const readJson = (file) => {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { fail(`JSON inválido ou ausente: ${path.relative(root, file)}`); return null; }
};

const marketplace = readJson(path.join(root, ".agents", "plugins", "marketplace.json"));
const manifest = readJson(path.join(pluginRoot, ".codex-plugin", "plugin.json"));
if (marketplace) {
  const entry = marketplace.plugins?.find((item) => item.name === "seu-socio-ia");
  if (marketplace.name !== "seu-socio-ia") fail("nome do marketplace inválido");
  if (!entry) fail("entrada seu-socio-ia ausente");
  else {
    if (entry.source?.source !== "local") fail("fonte do marketplace deve ser local");
    if (entry.source?.path !== "./plugins/seu-socio-ia") fail("caminho do marketplace inválido");
    if (entry.policy?.installation !== "AVAILABLE") fail("política de instalação inválida");
    if (entry.policy?.authentication !== "ON_INSTALL") fail("política de autenticação inválida");
  }
}
if (manifest) {
  if (manifest.name !== "seu-socio-ia") fail("nome do manifesto inválido");
  if (manifest.skills !== "./skills/") fail("diretório de skills inválido");
}
for (const required of ["AGENTS.md", ".codex/config.toml", "skills", "knowledge", "docs", "tests"]) {
  if (!fs.existsSync(path.join(pluginRoot, required))) fail(`item obrigatório ausente: ${required}`);
}

const allowedTopLevel = new Set([".agents", ".gitignore", "LICENSE", "README.md", "package.json", "plugins", "scripts", "tests", ".git"]);
for (const entry of fs.readdirSync(root)) if (!allowedTopLevel.has(entry)) fail(`item de raiz não permitido: ${entry}`);
const forbiddenName = /(^|[._-])(env|credential|secret|token|password|key)([._-]|$)/i;
const forbiddenPath = /(?:^|\/)(imports|quarantine|quarentena|projects|worktrees|node_modules|\.cache)(?:\/|$)/i;
const absoluteLocal = /\/Users\//;
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git") continue;
    const file = path.join(dir, name);
    const relative = path.relative(root, file);
    const stat = fs.lstatSync(file);
    if (forbiddenName.test(name)) fail(`nome sensível ou indevido: ${relative}`);
    if (forbiddenPath.test(relative)) fail(`diretório indevido: ${relative}`);
    if (stat.isDirectory()) walk(file);
    else if (/\.(md|mjs|json|toml|yaml)$/i.test(name)) {
      const text = fs.readFileSync(file, "utf8");
      if (absoluteLocal.test(text)) fail(`caminho local absoluto: ${relative}`);
    }
  }
};
walk(root);
if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else console.log("marketplace validation: ok");
