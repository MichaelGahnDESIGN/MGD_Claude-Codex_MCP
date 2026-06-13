import { rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { listBackupDirectories } from "./listBackupDirectories.ts";

export interface ClearBackupOptions {
  projectDir: string;
}

export async function runCliClearBackup(options: ClearBackupOptions): Promise<string> {
  const projectDir = resolve(options.projectDir);
  const backups = await listBackupDirectories(projectDir);

  if (backups.length === 0) {
    return renderResult(projectDir, "Keine Backups gefunden.", "");
  }
  if (backups.length === 1) {
    return renderResult(projectDir, "Keine alten Backups gelöscht.", `Behalten: ${backups[0]}`);
  }

  const newestBackup = backups.at(-1);
  const oldBackups = backups.slice(0, -1);
  for (const backup of oldBackups) {
    await rm(join(projectDir, "agent_comms.backups", backup), { recursive: true, force: true });
  }

  return renderResult(projectDir, `${oldBackups.length} alte Backups gelöscht.`, `Behalten: ${newestBackup ?? "-"}`);
}

function renderResult(projectDir: string, summary: string, detail: string): string {
  return [
    "# comm clear-backup",
    "",
    `Projektordner: ${projectDir}`,
    summary,
    detail,
    ""
  ].filter((line, index, lines) => line !== "" || index === 1 || index === lines.length - 1).join("\n");
}
