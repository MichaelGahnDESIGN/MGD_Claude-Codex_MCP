import { FileStorage } from "../../storage/FileStorage.ts";
import { createInitialState } from "../../domain/createInitialState.ts";

export async function resetAgentCommsFiles(projectDir: string, projectName: string): Promise<void> {
  const storage = new FileStorage({
    baseDir: projectDir,
    markdownFileName: "agent_comms.md",
    stateFileName: "agent_comms.state.json"
  });

  await storage.save(createInitialState(projectName));
}
