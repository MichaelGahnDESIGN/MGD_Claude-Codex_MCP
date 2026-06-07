import { shellQuote } from "./shellQuote.ts";

export interface RenderStartCommandOptions {
  projectDir: string;
  startScriptPath: string;
}

export function renderStartCommand(options: RenderStartCommandOptions): string {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# Startet den lokalen MCP-Server mit dem ausgewählten Kommunikationsordner.",
    `export AGENT_COMMS_DIR=${shellQuote(options.projectDir)}`,
    `exec ${shellQuote(options.startScriptPath)}`,
    ""
  ].join("\n");
}
