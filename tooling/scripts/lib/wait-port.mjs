import net from "node:net";

/**
 * @param {number} port
 * @param {string} [host]
 * @param {number} [timeoutMs]
 */
export function waitForPort(port, host = "127.0.0.1", timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const started = Date.now();

    const attempt = () => {
      const socket = net.connect({ port, host }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Timeout waiting for ${host}:${port}`));
          return;
        }
        setTimeout(attempt, 1000);
      });
    };

    attempt();
  });
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
export async function waitForHttpOk(url, timeoutMs = 60_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}
