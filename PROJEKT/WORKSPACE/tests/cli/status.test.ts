import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, it } from "node:test";
import { createTask } from "../../src/domain/createTask.ts";
import { createInitialState } from "../../src/domain/createInitialState.ts";
import { renderCliStatus } from "../../src/cli/status/renderCliStatus.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("comm status", () => {
  it("rendert eine kurze menschenlesbare Projektübersicht", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "comm-status-"));
    tempDirs.push(tempDir);
    let state = createInitialState();
    state.projectName = "Status Test";
    state.blockers.push({
      id: "B-1",
      createdAt: "2026-06-11T10:00:00.000Z",
      updatedAt: "2026-06-11T10:00:00.000Z",
      reporter: "Codex",
      message: "Rückfrage offen",
      status: "OPEN"
    });
    state = createTask(state, {
      sender: "Codex",
      recipient: "Claude",
      type: "QA",
      priority: "HIGH",
      context: "Status",
      task: "Bitte prüfen",
      acceptanceCriteria: ["Status sichtbar"],
      safetyNote: "Keine Secrets"
    });

    const output = renderCliStatus({
      projectDir: tempDir,
      state
    });

    assert.match(output, /Status Test/);
    assert.match(output, /Offene Aufgaben: 1/);
    assert.match(output, /Offene Blocker: 1/);
  });
});
