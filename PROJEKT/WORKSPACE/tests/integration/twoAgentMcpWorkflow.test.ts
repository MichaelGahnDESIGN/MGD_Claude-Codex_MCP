import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { createServer } from "../../src/mcp/createServer.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("Zwei-Agenten-MCP-Workflow", () => {
  it("lässt Codex eine Aufgabe erstellen und Claude dieselbe Aufgabe abschließen", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-two-agents-"));
    tempDirs.push(tempDir);

    const server = createServer({ baseDir: tempDir });

    await server.handle({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "create_task",
        arguments: {
          sender: "Codex",
          recipient: "Claude",
          type: "QA",
          priority: "NORMAL",
          context: "Integrationstest",
          task: "Prüfe, ob beide Agenten denselben lokalen MCP-State nutzen.",
          acceptanceCriteria: ["Claude kann die von Codex erstellte Aufgabe abschließen."],
          safetyNote: "Keine sensiblen Daten speichern."
        }
      }
    });

    await server.handle({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "claim_task",
        arguments: {
          taskId: "TASK-0001",
          agent: "Claude"
        }
      }
    });

    await server.handle({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "complete_task",
        arguments: {
          taskId: "TASK-0001",
          resultNote: "Claude hat die gemeinsame Aufgabe abgeschlossen.",
          files: ["agent_comms.md"],
          tests: ["twoAgentMcpWorkflow"]
        }
      }
    });

    const contextResponse = await server.handle({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "read_context",
        arguments: {}
      }
    });

    assert.ok(contextResponse && "result" in contextResponse);
    const markdown = await readFile(join(tempDir, "agent_comms.md"), "utf8");

    assert.match(JSON.stringify(contextResponse.result), /latestLogs/);
    assert.match(markdown, /TASK-0001 - DONE/);
    assert.match(markdown, /Von: Codex/);
    assert.match(markdown, /An: Claude/);
    assert.match(markdown, /Übernommen von: Claude/);
    assert.match(markdown, /Claude hat die gemeinsame Aufgabe abgeschlossen/);
  });
});
