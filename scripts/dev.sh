#!/usr/bin/env bash
set -euo pipefail

node --experimental-strip-types server/chat-dev.ts &
chat_pid=$!
cleanup() {
  kill "$chat_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

exec npx next dev --hostname 0.0.0.0 --port 43123
