// Собирает dist/<id>-<version>.kodaplugin и печатает SHA-256 для каталога.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("koda-plugin.json", "utf8"));
const out = `dist/${manifest.id}-${manifest.version}.kodaplugin`;
mkdirSync("dist", { recursive: true });
execFileSync("npx", ["koda-plugin", "pack", ".", "--out", out], { stdio: "inherit" });
const sha256 = createHash("sha256").update(readFileSync(out)).digest("hex");
console.log(`\n${out}\nsha256: ${sha256}`);
