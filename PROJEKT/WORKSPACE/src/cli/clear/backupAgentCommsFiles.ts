import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { AgentCommsBackupResult } from "./clearTypes.ts";
import { formatBackupStamp } from "./formatBackupStamp.ts";
import { pathExists } from "./pathExists.ts";

const COMMUNICATION_FILES = ["agent_comms.md", "agent_comms.state.json"];

export async function backupAgentCommsFiles(projectDir: string, now = new Date()): Promise<AgentCommsBackupResult> {
  const backupDir = join(projectDir, "agent_comms.backups", formatBackupStamp(now));
  await mkdir(backupDir, { recursive: true });

  const copiedFiles: string[] = [];
  for (const fileName of COMMUNICATION_FILES) {
    const sourcePath = join(projectDir, fileName);
    if (await pathExists(sourcePath)) {
      await copyFile(sourcePath, join(backupDir, fileName));
      copiedFiles.push(fileName);
    }
  }

  return {
    backupDir,
    copiedFiles
  };
}
