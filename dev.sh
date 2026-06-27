#!/usr/bin/env bash
# SyncroBrain one-shot local bootstrap: clone · install · docker
# Usage: ./dev.sh
#        ./dev.sh --skip-docker
#        ./dev.sh --required-only

set -euo pipefail
cd "$(dirname "$0")"
node tooling/scripts/dev-up.mjs "$@"
