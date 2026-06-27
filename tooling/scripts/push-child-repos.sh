#!/usr/bin/env bash
# Push each child directory to its own GitHub repo (run from MetaRepo root).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

push_child() {
  local name="$1"
  local visibility="$2"
  local dir="$ROOT/$name"

  if [ ! -d "$dir" ]; then
    echo "skip $name (missing)"
    return 0
  fi

  echo "==> $name ($visibility)"
  cd "$dir"
  rm -rf .git
  git init -b master
  git add -A
  git commit -m "chore: initial import from SyncroBrain MetaRepo"

  if gh repo view "syncrobrain/$name" >/dev/null 2>&1; then
    git remote add origin "git@github.com:syncrobrain/${name}.git"
    git push -u origin master
  else
    if [ "$visibility" = "public" ]; then
      gh repo create "syncrobrain/$name" --public --source=. --remote=origin --push
    else
      gh repo create "syncrobrain/$name" --private --source=. --remote=origin --push
    fi
  fi
  cd "$ROOT"
}

push_child iot-gateway private
push_child iot-console-web private
push_child website private
push_child docs public
push_child deploy private

echo "==> All child repos pushed."
