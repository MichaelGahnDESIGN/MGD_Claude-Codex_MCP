import { access } from "node:fs/promises";
import { join, resolve } from "node:path";

export async function resolveWorkspaceDir(mcpProjectRoot: string): Promise<string> {
  const root = resolve(mcpProjectRoot);
  const directWorkspace = join(root, "PROJEKT", "WORKSPACE");
  if (await pathExists(join(directWorkspace, "bin", "start-agent-comms-mcp.sh"))) {
    return directWorkspace;
  }
  return root;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
