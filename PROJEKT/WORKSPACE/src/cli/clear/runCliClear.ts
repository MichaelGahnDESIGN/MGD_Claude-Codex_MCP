import { resolve } from "node:path";
import { backupAgentCommsFiles } from "./backupAgentCommsFiles.ts";
import type { ClearCommandOptions } from "./clearTypes.ts";
import { readExistingProjectName } from "./readExistingProjectName.ts";
import { resetAgentCommsFiles } from "./resetAgentCommsFiles.ts";

export async function runCliClear(options: ClearCommandOptions): Promise<string> {
  const projectDir = resolve(options.projectDir);
  const projectName = await readExistingProjectName(projectDir);
  const backup = await backupAgentCommsFiles(projectDir, options.now ?? new Date());
  await resetAgentCommsFiles(projectDir, projectName);

  return [
    "# comm clear",
    "",
    `Projektordner: ${projectDir}`,
    `Backup angelegt: ${backup.backupDir}`,
    `Gesicherte Dateien: ${backup.copiedFiles.join(", ") || "Keine vorhandenen Dateien."}`,
    "Zurückgesetzt: agent_comms.md und agent_comms.state.json",
    ""
  ].join("\n");
}
