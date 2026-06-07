import { shellQuote } from "./shellQuote.ts";

export interface RenderCodexSetupScriptOptions {
  projectDir: string;
  startScriptPath: string;
}

export function renderCodexSetupScript(options: RenderCodexSetupScriptOptions): string {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "# Richtet Claude-Codex-MCP lokal in ChatGPT Codex ein.",
    "# Dieser Befehl speichert keine Secrets und nutzt nur den lokalen Projektordner.",
    "codex mcp add claude-codex-mcp \\",
    `  --env AGENT_COMMS_DIR=${shellQuote(options.projectDir)} \\`,
    `  -- ${shellQuote(options.startScriptPath)}`,
    "",
    "codex mcp get claude-codex-mcp",
    "codex mcp list",
    ""
  ].join("\n");
}
