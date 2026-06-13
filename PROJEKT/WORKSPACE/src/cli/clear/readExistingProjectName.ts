import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readExistingProjectName(projectDir: string): Promise<string> {
  try {
    const state = JSON.parse(await readFile(join(projectDir, "agent_comms.state.json"), "utf8")) as { projectName?: unknown };
    if (typeof state.projectName === "string" && state.projectName.trim().length > 0) {
      return state.projectName;
    }
  } catch {
    // Wenn der alte State kaputt ist, wird sicher auf den Standardnamen zurückgesetzt.
  }
  return "Claude-Codex-MCP";
}
