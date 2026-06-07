import { resolve } from "node:path";

export interface ParsedSetupArgs {
  outputDir?: string;
  projectDir?: string;
  projectName?: string;
  yes: boolean;
}

export function parseSetupArgs(args: string[]): ParsedSetupArgs {
  const parsed: ParsedSetupArgs = { yes: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--yes" || arg === "-y") {
      parsed.yes = true;
      continue;
    }
    if (arg === "--project-dir") {
      parsed.projectDir = readValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--output-dir") {
      parsed.outputDir = readValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--project-name") {
      parsed.projectName = readTextValue(args, index, arg);
      index += 1;
      continue;
    }
    throw new Error(`Unbekannte Setup-Option: ${arg}`);
  }
  return parsed;
}

export function defaultSetupArgs(workspaceDir: string): Required<Omit<ParsedSetupArgs, "yes">> {
  return {
    outputDir: resolve(workspaceDir, "setup-hilfe"),
    projectDir: resolve(workspaceDir, "local-agent-comms", "live"),
    projectName: "Mein Agenten-Projekt"
  };
}

function readValue(args: string[], index: number, label: string): string {
  return resolve(readTextValue(args, index, label));
}

function readTextValue(args: string[], index: number, label: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Option ${label} braucht einen Wert.`);
  }
  return value;
}
