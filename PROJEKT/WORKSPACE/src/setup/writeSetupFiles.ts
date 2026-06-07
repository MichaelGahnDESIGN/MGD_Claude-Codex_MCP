import { chmod, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderClaudeCodeGuide } from "./renderClaudeCodeGuide.ts";
import { renderClaudeConfig } from "./renderClaudeConfig.ts";
import { renderCodexSetupScript } from "./renderCodexSetupScript.ts";
import { renderSetupGuide } from "./renderSetupGuide.ts";
import { renderStartCommand } from "./renderStartCommand.ts";

export interface WriteSetupFilesOptions {
  outputDir: string;
  projectDir: string;
  projectName: string;
  startScriptPath: string;
}

export async function writeSetupFiles(options: WriteSetupFilesOptions): Promise<string[]> {
  await mkdir(options.outputDir, { recursive: true });

  const generatedFiles = [
    join(options.outputDir, "codex-einrichten.sh"),
    join(options.outputDir, "claude-code-einrichten.md"),
    join(options.outputDir, "claude-cowork-config.json"),
    join(options.outputDir, "mcp-starten.command"),
    join(options.outputDir, "ANLEITUNG.md")
  ];

  await writeFile(generatedFiles[0], renderCodexSetupScript(options), "utf8");
  await chmod(generatedFiles[0], 0o755);
  await writeFile(generatedFiles[1], renderClaudeCodeGuide(options), "utf8");
  await writeFile(generatedFiles[2], renderClaudeConfig(options), "utf8");
  await writeFile(generatedFiles[3], renderStartCommand(options), "utf8");
  await chmod(generatedFiles[3], 0o755);
  await writeFile(generatedFiles[4], renderSetupGuide({ ...options, generatedFiles }), "utf8");

  return generatedFiles;
}
