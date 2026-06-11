import type { CliCommand, CliCommandName, CliOptions } from "./cliTypes.ts";

const COMMANDS = new Set<CliCommandName>(["help", "setup", "start", "doctor", "status"]);

export function parseCliArgs(args: string[]): CliCommand {
  const first = args[0];
  if (!first || first === "--help" || first === "-h") {
    return { command: "help", options: {} };
  }

  if (!COMMANDS.has(first as CliCommandName)) {
    throw new Error(`Unbekannter comm-Befehl: ${first}`);
  }

  return {
    command: first as CliCommandName,
    options: parseOptions(args.slice(1))
  };
}

function parseOptions(args: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }
    if (arg === "--project-dir") {
      options.projectDir = readOptionValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--output-dir") {
      options.outputDir = readOptionValue(args, index, arg);
      index += 1;
      continue;
    }
    if (arg === "--project-name") {
      options.projectName = readOptionValue(args, index, arg);
      index += 1;
      continue;
    }
    throw new Error(`Unbekannte comm-Option: ${arg}`);
  }
  return options;
}

function readOptionValue(args: string[], index: number, label: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`Option ${label} braucht einen Wert.`);
  }
  return value;
}
