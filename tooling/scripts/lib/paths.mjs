import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

/** Meta-Repo 根目录（含 .meta/manifest.json） */
export function findMetaRoot(startDir = process.cwd()) {
  let dir = resolve(startDir);
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, ".meta", "manifest.json"))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}
