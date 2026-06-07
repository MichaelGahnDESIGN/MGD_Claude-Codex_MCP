#!/usr/bin/env bash
set -euo pipefail

# Stabiler Startpunkt für MCP-Clients. Der Client kann AGENT_COMMS_DIR setzen,
# damit die Kommunikationsdateien in einem konkreten Projektordner liegen.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

exec node --experimental-strip-types "${WORKSPACE_DIR}/src/index.ts"
