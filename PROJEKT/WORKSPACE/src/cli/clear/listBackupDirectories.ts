import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function listBackupDirectories(projectDir: string): Promise<string[]> {
  try {
    const backupRoot = join(projectDir, "agent_comms.backups");
    const entries = await readdir(backupRoot, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
