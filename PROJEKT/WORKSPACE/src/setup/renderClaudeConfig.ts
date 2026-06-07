export interface RenderClaudeConfigOptions {
  projectDir: string;
  startScriptPath: string;
}

export function renderClaudeConfig(options: RenderClaudeConfigOptions): string {
  return `${JSON.stringify(
    {
      mcpServers: {
        "claude-codex-mcp": {
          command: options.startScriptPath,
          env: {
            AGENT_COMMS_DIR: options.projectDir
          }
        }
      }
    },
    null,
    2
  )}\n`;
}
