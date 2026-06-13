import assert from "node:assert/strict";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, it } from "node:test";
import { runCliClear } from "../../src/cli/clear/runCliClear.ts";
import { runCliClearBackup } from "../../src/cli/clear/runCliClearBackup.ts";
import { createInitialState } from "../../src/domain/createInitialState.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("comm clear", () => {
  it("legt ein Backup an und setzt Markdown und State auf den Anfang zurück", async () => {
    const projectDir = await mkdtemp(join(tmpdir(), "comm-clear-"));
    tempDirs.push(projectDir);
    const oldState = createInitialState("Kundenprojekt");
    oldState.chat.push({
      id: "CHAT-0001",
      createdAt: "2026-06-14T10:00:00.000Z",
      sender: "Codex",
      kind: "Hinweis",
      message: "Alter Inhalt"
    });
    await writeFile(join(projectDir, "agent_comms.state.json"), `${JSON.stringify(oldState, null, 2)}\n`, "utf8");
    await writeFile(join(projectDir, "agent_comms.md"), "# Alter Stand\nAlter Inhalt\n", "utf8");

    const result = await runCliClear({
      now: new Date(2026, 5, 14, 12, 30, 0),
      projectDir
    });

    assert.match(result, /Backup angelegt/);
    assert.match(result, /Zurückgesetzt/);
    assert.equal(result.endsWith("\n"), true);
    assert.match(await readFile(join(projectDir, "agent_comms.backups", "2026-06-14_12-30-00", "agent_comms.md"), "utf8"), /Alter Inhalt/);
    const nextState = JSON.parse(await readFile(join(projectDir, "agent_comms.state.json"), "utf8"));
    assert.equal(nextState.projectName, "Kundenprojekt");
    assert.equal(nextState.chat.length, 0);
    assert.match(await readFile(join(projectDir, "agent_comms.md"), "utf8"), /Keine Aufgaben vorhanden/);
  });
});

describe("comm clear-backup", () => {
  it("löscht alle Backups außer dem neuesten", async () => {
    const projectDir = await mkdtemp(join(tmpdir(), "comm-clear-backup-"));
    tempDirs.push(projectDir);
    const backupDir = join(projectDir, "agent_comms.backups");
    await mkdir(join(backupDir, "2026-06-14_09-00-00"), { recursive: true });
    await mkdir(join(backupDir, "2026-06-14_10-00-00"), { recursive: true });
    await mkdir(join(backupDir, "2026-06-14_11-00-00"), { recursive: true });

    const result = await runCliClearBackup({ projectDir });

    assert.match(result, /2 alte Backups gelöscht/);
    assert.equal(result.endsWith("\n"), true);
    assert.deepEqual(await readdir(backupDir), ["2026-06-14_11-00-00"]);
  });
});
