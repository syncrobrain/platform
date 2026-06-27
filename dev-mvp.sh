#!/usr/bin/env bash
# Start iot-gateway + iot-console-web (foreground, Unix)
set -euo pipefail
cd "$(dirname "$0")"
node tooling/scripts/dev-mvp.mjs
