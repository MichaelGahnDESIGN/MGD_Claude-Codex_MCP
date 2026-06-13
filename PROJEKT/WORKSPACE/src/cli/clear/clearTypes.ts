export interface ClearCommandOptions {
  now?: Date;
  projectDir: string;
}

export interface AgentCommsBackupResult {
  backupDir: string;
  copiedFiles: string[];
}
