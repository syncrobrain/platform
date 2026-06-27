#!/usr/bin/env node
/**
 * Clone child repositories from .meta/manifest.json
 *
 * Usage:
 *   node tooling/scripts/init-repos.mjs
 *   node tooling/scripts/init-repos.mjs --only=iot-gateway,website
 *   node tooling/scripts/init-repos.mjs --https
 *   node tooling/scripts/init-repos.mjs --required-only
 */
import { existsSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { execSync } from "node:child_process";
import { findMetaRoot } from "./lib/paths.mjs";
import { loadMetaManifest, projectRemote } from "./lib/meta-manifest.mjs";

const metaRoot = findMetaRoot();
if (!metaRoot) {
  console.error("❌ Run from SyncroBrain Meta-Repo root.");
  process.exit(1);
}

const manifest = loadMetaManifest(metaRoot);
const useHttps = process.argv.includes("--https");
const requiredOnly = process.argv.includes("--required-only");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const onlySet = onlyArg
  ? new Set(onlyArg.split("=")[1].split(",").map((s) => s.trim()))
  : null;

let order = manifest.installOrder.filter((k) => manifest.projects[k]);
if (onlySet) {
  order = order.filter((k) => onlySet.has(k));
}

function dirHasEntries(dir) {
  try {
    return readdirSync(dir).length > 0;
  } catch {
    return false;
  }
}

console.log("📦 SyncroBrain init — clone child repos from .meta/manifest.json\n");

let cloned = 0;
let skipped = 0;
let failed = 0;

for (const key of order) {
  const proj = manifest.projects[key];
  if (requiredOnly && !proj.required) {
    console.log(`⏭️  ${key} (optional, --required-only)`);
    skipped++;
    continue;
  }

  const dest = join(metaRoot, proj.path);

  if (existsSync(join(dest, ".git"))) {
    console.log(`✓  ${key} already cloned → ${proj.path}/`);
    skipped++;
    continue;
  }

  if (existsSync(dest) && dirHasEntries(dest)) {
    console.log(
      `⏭️  ${key} → ${proj.path}/ exists without .git (monorepo transition; see plan/repository-split.md)`,
    );
    skipped++;
    continue;
  }

  const remote = projectRemote(manifest, key, { https: useHttps });
  if (!remote) {
    console.warn(`⚠️  ${key}: no remote in manifest`);
    failed++;
    continue;
  }

  const parent = dirname(dest);
  if (!existsSync(parent)) {
    mkdirSync(parent, { recursive: true });
  }

  console.log(`→  cloning ${key} from ${remote}`);
  try {
    execSync(`git clone ${remote} "${proj.path}"`, {
      cwd: metaRoot,
      stdio: "inherit",
    });
    cloned++;
  } catch {
    console.error(`❌ failed to clone ${key}`);
    failed++;
  }
}

console.log(`
════════════════════════════════════════════════════════════
Done: cloned=${cloned} skipped=${skipped} failed=${failed}

Next:
  ./dev.sh  or  .\\dev.ps1     # install deps + docker (one-shot)
  Open syncrobrain.code-workspace in Cursor / VS Code
  See ONBOARDING.md for dev startup
════════════════════════════════════════════════════════════
`);

process.exit(failed > 0 ? 1 : 0);
