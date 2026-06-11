import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultSetupArgs, parseSetupArgs } from "./parseSetupArgs.ts";
import { promptSetupOptions } from "./promptSetupOptions.ts";
import { runSetup } from "./runSetup.ts";

const workspaceDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const parsed = parseSetupArgs(process.argv.slice(2));
const selected = await promptSetupOptions(defaultSetupArgs(workspaceDir), parsed);
const result = await runSetup({
  mcpProjectRoot: workspaceDir,
  outputDir: selected.outputDir,
  projectDir: selected.projectDir,
  projectName: selected.projectName
});

process.stdout.write(`\nSetup fertig.\n\n`);
process.stdout.write(`Kommunikationsordner: ${result.projectDir}\n`);
process.stdout.write(`Hilfe-Dateien: ${result.outputDir}\n\n`);
process.stdout.write(`Öffne als Nächstes: ${result.outputDir}/ANLEITUNG.html\n`);
