import { shellQuote } from "./shellQuote.ts";

export interface RenderClaudeCodeGuideOptions {
  projectDir: string;
  startScriptPath: string;
}

export function renderClaudeCodeGuide(options: RenderClaudeCodeGuideOptions): string {
  return [
    "# Claude Code Einrichten",
    "",
    "Wenn Claude Code lokal installiert ist, kannst du diesen Befehl verwenden:",
    "",
    "```bash",
    "claude mcp add claude-codex-mcp \\",
    `  --env AGENT_COMMS_DIR=${shellQuote(options.projectDir)} \\`,
    `  -- ${shellQuote(options.startScriptPath)}`,
    "```",
    "",
    "Falls deine Claude-Version eine andere MCP-Einstellung nutzt, verwende denselben Startbefehl als lokalen stdio-MCP-Server:",
    "",
    "```text",
    options.startScriptPath,
    "```",
    "",
    "Die Umgebungsvariable muss auf denselben Ordner zeigen wie bei Codex:",
    "",
    "```text",
    `AGENT_COMMS_DIR=${options.projectDir}`,
    "```",
    ""
  ].join("\n");
}
