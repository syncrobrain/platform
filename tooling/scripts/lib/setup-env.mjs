import { existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";

/**
 * @param {string} src
 * @param {string} dest
 * @returns {boolean}
 */
export function copyIfMissing(src, dest) {
  if (existsSync(dest)) return false;
  if (!existsSync(src)) return false;
  copyFileSync(src, dest);
  return true;
}

/** @param {string} metaRoot */
export function setupProjectEnv(metaRoot) {
  const steps = [];

  const gateway = join(metaRoot, "iot-gateway");
  if (copyIfMissing(join(gateway, ".env.example"), join(gateway, ".env"))) {
    steps.push("iot-gateway/.env");
  }
  if (copyIfMissing(join(gateway, ".npmrc.example"), join(gateway, ".npmrc"))) {
    steps.push("iot-gateway/.npmrc");
  }

  const consoleWeb = join(metaRoot, "iot-console-web");
  if (
    copyIfMissing(
      join(consoleWeb, ".env.development.example"),
      join(consoleWeb, ".env.development"),
    )
  ) {
    steps.push("iot-console-web/.env.development");
  }

  return steps;
}
