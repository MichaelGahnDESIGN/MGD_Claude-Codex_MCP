import { join, resolve } from "node:path";
import { FileStorage } from "../storage/FileStorage.ts";
import { resolveWorkspaceDir } from "./resolveWorkspaceDir.ts";
import type { SetupOptions, SetupResult } from "./setupTypes.ts";
import { writeSetupFiles } from "./writeSetupFiles.ts";

export async function runSetup(options: SetupOptions): Promise<SetupResult> {
  const workspaceDir = await resolveWorkspaceDir(options.mcpProjectRoot);
  const startScriptPath = join(workspaceDir, "bin", "start-agent-comms-mcp.sh");
  const projectDir = resolve(options.projectDir);
  const outputDir = resolve(options.outputDir);

  const storage = new FileStorage({
    baseDir: projectDir,
    markdownFileName: "agent_comms.md",
    stateFileName: "agent_comms.state.json"
  });
  const state = await storage.load();
  state.projectName = options.projectName;
  await storage.save(state);

  const generatedFiles = await writeSetupFiles({
    outputDir,
    projectDir,
    projectName: options.projectName,
    startScriptPath
  });

  return {
    generatedFiles,
    outputDir,
    projectDir
  };
}
