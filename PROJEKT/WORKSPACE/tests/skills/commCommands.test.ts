import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, it } from "node:test";

const repoRoot = resolve(process.cwd(), "..", "..");

describe("comm Slash-Befehle", () => {
  it("stellt alle neuen Codex-Skills im Repository bereit", async () => {
    for (const command of ["comm-clear", "comm-clear-backup", "comm-info", "comm-help"]) {
      const skill = await readFile(resolve(repoRoot, ".agents", "skills", command, "SKILL.md"), "utf8");

      assert.match(skill, new RegExp(`name: ${command}`));
      assert.match(skill, new RegExp(`/${command}`));
      assert.match(skill, /Claude-Codex-MCP/);
    }
  });

  it("stellt alle neuen Claude-Code-Commands im Repository bereit", async () => {
    for (const command of ["comm-clear", "comm-clear-backup", "comm-info", "comm-help"]) {
      const commandFile = await readFile(resolve(repoRoot, ".claude", "commands", `${command}.md`), "utf8");

      assert.match(commandFile, new RegExp(`# /${command}`));
      assert.match(commandFile, /Claude-Codex-MCP/);
    }
  });
});
