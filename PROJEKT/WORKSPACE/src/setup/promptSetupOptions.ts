import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { ParsedSetupArgs } from "./parseSetupArgs.ts";

export async function promptSetupOptions(defaults: Required<Omit<ParsedSetupArgs, "yes">>, parsed: ParsedSetupArgs): Promise<Required<Omit<ParsedSetupArgs, "yes">>> {
  if (parsed.yes) {
    return {
      outputDir: parsed.outputDir ?? defaults.outputDir,
      projectDir: parsed.projectDir ?? defaults.projectDir,
      projectName: parsed.projectName ?? defaults.projectName
    };
  }

  const rl = readline.createInterface({ input, output });
  try {
    return {
      projectName: await questionWithDefault(rl, "Wie heißt dein Projekt?", parsed.projectName ?? defaults.projectName),
      projectDir: await questionWithDefault(rl, "Wo sollen agent_comms.md und agent_comms.state.json liegen?", parsed.projectDir ?? defaults.projectDir),
      outputDir: await questionWithDefault(rl, "Wo sollen die einfachen Hilfe-Dateien liegen?", parsed.outputDir ?? defaults.outputDir)
    };
  } finally {
    rl.close();
  }
}

async function questionWithDefault(rl: readline.Interface, question: string, fallback: string): Promise<string> {
  const answer = await rl.question(`${question}\nEnter = ${fallback}\n> `);
  return answer.trim() || fallback;
}
