import { resolve } from "node:path";
import { FileStorage } from "../../storage/FileStorage.ts";
import { renderCliStatus } from "./renderCliStatus.ts";

export async function runCliStatus(projectDir: string): Promise<string> {
  const resolvedProjectDir = resolve(projectDir);
  const storage = new FileStorage({
    baseDir: resolvedProjectDir,
    markdownFileName: "agent_comms.md",
    stateFileName: "agent_comms.state.json"
  });
  const state = await storage.load();
  return renderCliStatus({
    projectDir: resolvedProjectDir,
    state
  });
}
