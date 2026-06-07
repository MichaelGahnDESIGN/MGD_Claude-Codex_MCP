import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, it } from "node:test";
import { runSetup } from "../../src/setup/runSetup.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("runSetup", () => {
  it("erstellt einen einfachen lokalen Setup-Ordner für Nicht-Programmierer", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-setup-"));
    tempDirs.push(tempDir);

    const projectDir = join(tempDir, "mein-projekt");
    const outputDir = join(tempDir, "setup-hilfe");
    const result = await runSetup({
      mcpProjectRoot: process.cwd(),
      outputDir,
      projectDir,
      projectName: "Mein Projekt"
    });

    assert.equal(result.projectDir, projectDir);
    assert.equal(result.outputDir, outputDir);
    assert.equal(result.generatedFiles.length, 5);

    const markdown = await readFile(join(projectDir, "agent_comms.md"), "utf8");
    const codexCommand = await readFile(join(outputDir, "codex-einrichten.sh"), "utf8");
    const claudeConfig = await readFile(join(outputDir, "claude-cowork-config.json"), "utf8");
    const guide = await readFile(join(outputDir, "ANLEITUNG.md"), "utf8");

    assert.match(markdown, /Mein Projekt/);
    assert.match(codexCommand, /codex mcp add claude-codex-mcp/);
    assert.match(codexCommand, new RegExp(escapeRegExp(projectDir)));
    assert.match(claudeConfig, /claude-codex-mcp/);
    assert.match(guide, /ohne Programmierkenntnisse/);
    assert.match(guide, /AGENT_COMMS_DIR/);
  });

  it("normalisiert relative Setup-Pfade zu absoluten Pfaden", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-relative-"));
    tempDirs.push(tempDir);
    const previousCwd = process.cwd();

    try {
      process.chdir(tempDir);
      const result = await runSetup({
        mcpProjectRoot: previousCwd,
        outputDir: "setup-hilfe",
        projectDir: "mein-projekt",
        projectName: "Relativer Test"
      });

      assert.equal(result.projectDir, resolve(process.cwd(), "mein-projekt"));
      assert.equal(result.outputDir, resolve(process.cwd(), "setup-hilfe"));
    } finally {
      process.chdir(previousCwd);
    }
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
