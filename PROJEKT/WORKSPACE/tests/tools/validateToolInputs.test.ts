import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { FileStorage } from "../../src/storage/FileStorage.ts";
import { AgentCommsService } from "../../src/tools/AgentCommsService.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("Tool-Eingaben", () => {
  it("lehnt unbekannte Task-Typen verständlich ab", async () => {
    const service = await createService();

    await assert.rejects(
      service.createTask({
        sender: "Codex",
        recipient: "Claude",
        type: "DESIGN_MAGIC",
        priority: "NORMAL",
        context: "Validierung",
        task: "Prüfe ungültige Typen.",
        acceptanceCriteria: ["Ungültige Typen werden abgelehnt."],
        safetyNote: "Keine Secrets speichern."
      }),
      /type muss einer dieser Werte sein: CODE, REVIEW, PIXEL_ART, IMAGE_GENERATION, UI_CONCEPT, DOCS, BRAINSTORM, DEPLOY, QA, SECURITY/
    );
  });

  it("lehnt unbekannte Prioritäten verständlich ab", async () => {
    const service = await createService();

    await assert.rejects(
      service.createTask({
        sender: "Codex",
        recipient: "Claude",
        type: "QA",
        priority: "SOFORT",
        context: "Validierung",
        task: "Prüfe ungültige Prioritäten.",
        acceptanceCriteria: ["Ungültige Prioritäten werden abgelehnt."],
        safetyNote: "Keine Secrets speichern."
      }),
      /priority muss einer dieser Werte sein: LOW, NORMAL, HIGH, URGENT/
    );
  });

  it("lehnt unbekannte Chat-Arten verständlich ab", async () => {
    const service = await createService();

    await assert.rejects(
      service.appendChat({
        sender: "Codex",
        kind: "Plausch",
        message: "Bitte eine bekannte Chat-Art verwenden."
      }),
      /kind muss einer dieser Werte sein: Hinweis, Frage, Antwort, Status, Warnung/
    );
  });
});

async function createService(): Promise<AgentCommsService> {
  const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-tool-inputs-"));
  tempDirs.push(tempDir);
  return new AgentCommsService(
    new FileStorage({
      baseDir: tempDir,
      markdownFileName: "agent_comms.md",
      stateFileName: "agent_comms.state.json"
    })
  );
}
