import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "../mcp/createServer.ts";
import { defaultSetupArgs } from "../setup/parseSetupArgs.ts";
import { promptSetupOptions } from "../setup/promptSetupOptions.ts";
import { runSetup } from "../setup/runSetup.ts";
import { shellQuote } from "../setup/shellQuote.ts";
import type { ParsedSetupArgs } from "../setup/parseSetupArgs.ts";
import { collectDoctorReport } from "./doctor/collectDoctorReport.ts";
import { renderDoctorReport } from "./doctor/renderDoctorReport.ts";
import type { CliIo } from "./cliTypes.ts";
import { parseCliArgs } from "./parseCliArgs.ts";
import { renderCliHelp } from "./renderCliHelp.ts";
import { runCliStatus } from "./status/runCliStatus.ts";

export async function runCli(args: string[], io: CliIo): Promise<number> {
  const workspaceDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

  try {
    const parsed = parseCliArgs(args);

    if (parsed.command === "help") {
      io.stdout.write(renderCliHelp());
      return 0;
    }

    if (parsed.command === "setup") {
      const selected = await promptSetupOptions(defaultSetupArgs(workspaceDir), parsed.options as ParsedSetupArgs);
      const result = await runSetup({
        mcpProjectRoot: workspaceDir,
        outputDir: selected.outputDir,
        projectDir: selected.projectDir,
        projectName: selected.projectName
      });
      io.stdout.write(renderSetupSuccess(workspaceDir, result.projectDir, result.outputDir));
      return 0;
    }

    const projectDir = resolve(parsed.options.projectDir ?? io.env.AGENT_COMMS_DIR ?? io.cwd);

    if (parsed.command === "doctor") {
      const report = await collectDoctorReport({ projectDir, workspaceDir });
      io.stdout.write(renderDoctorReport(report));
      return report.ok ? 0 : 1;
    }

    if (parsed.command === "status") {
      io.stdout.write(await runCliStatus(projectDir));
      return 0;
    }

    await createServer({ baseDir: projectDir }).listen();
    return 0;
  } catch (error) {
    io.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    io.stderr.write("\nNutze `comm help` für eine kurze Übersicht.\n");
    return 1;
  }
}

function renderSetupSuccess(workspaceDir: string, projectDir: string, outputDir: string): string {
  const localPrefix = `npm --silent --prefix ${shellQuote(workspaceDir)} run comm --`;
  return [
    "Setup fertig.",
    "",
    `Kommunikationsordner: ${projectDir}`,
    `Hilfe-Dateien: ${outputDir}`,
    "",
    "Nächste lokale Befehle:",
    `  ${localPrefix} doctor --project-dir ${shellQuote(projectDir)}`,
    `  ${localPrefix} status --project-dir ${shellQuote(projectDir)}`,
    "",
    `Öffne als Nächstes: ${outputDir}/ANLEITUNG.md`,
    ""
  ].join("\n");
}
