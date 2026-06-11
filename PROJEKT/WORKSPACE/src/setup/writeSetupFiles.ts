import { chmod, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderClaudeCodeGuide } from "./renderClaudeCodeGuide.ts";
import { renderClaudeConfig } from "./renderClaudeConfig.ts";
import { renderCommCommand } from "./renderCommCommand.ts";
import { renderCodexSetupScript } from "./renderCodexSetupScript.ts";
import { renderSetupGuide } from "./renderSetupGuide.ts";
import { renderSetupGuideHtml } from "./renderSetupGuideHtml.ts";
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
    join(options.outputDir, "comm-befehl.md"),
    join(options.outputDir, "ANLEITUNG.md"),
    join(options.outputDir, "ANLEITUNG.html")
  ];

  await writeFile(generatedFiles[0], renderCodexSetupScript(options), "utf8");
  await chmod(generatedFiles[0], 0o755);
  await writeFile(generatedFiles[1], renderClaudeCodeGuide(options), "utf8");
  await writeFile(generatedFiles[2], renderClaudeConfig(options), "utf8");
  await writeFile(generatedFiles[3], renderStartCommand(options), "utf8");
  await chmod(generatedFiles[3], 0o755);
  await writeFile(generatedFiles[4], renderCommCommand(), "utf8");
  await writeFile(generatedFiles[5], renderSetupGuide({ ...options, generatedFiles }), "utf8");
  await writeFile(generatedFiles[6], renderSetupGuideHtml({ ...options, generatedFiles }), "utf8");

  return generatedFiles;
}
