export type CliCommandName = "help" | "setup" | "start" | "doctor" | "status";

export interface CliCommand {
  command: CliCommandName;
  options: CliOptions;
}

export interface CliOptions {
  outputDir?: string;
  projectDir?: string;
  projectName?: string;
  yes?: boolean;
}

export interface CliIo {
  cwd: string;
  env: NodeJS.ProcessEnv;
  stderr: NodeJS.WritableStream;
  stdout: NodeJS.WritableStream;
}
