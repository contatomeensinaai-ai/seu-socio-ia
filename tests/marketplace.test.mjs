import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const marketplace = JSON.parse(fs.readFileSync(path.join(root, ".agents/plugins/marketplace.json"), "utf8"));
const [entry] = marketplace.plugins;
const pluginRoot = path.join(root, "plugins/seu-socio-ia");
const manifest = JSON.parse(fs.readFileSync(path.join(pluginRoot, ".codex-plugin/plugin.json"), "utf8"));

assert.equal(marketplace.name, "seu-socio-ia");
assert.equal(entry.name, "seu-socio-ia");
assert.equal(entry.source.source, "local");
assert.equal(entry.source.path, "./plugins/seu-socio-ia");
assert.equal(entry.policy.installation, "AVAILABLE");
assert.equal(entry.policy.authentication, "ON_INSTALL");
assert.equal(manifest.name, "seu-socio-ia");
assert.equal(manifest.skills, "./skills/");
assert.ok(fs.statSync(path.join(pluginRoot, "skills")).isDirectory());
console.log("marketplace: ok");
