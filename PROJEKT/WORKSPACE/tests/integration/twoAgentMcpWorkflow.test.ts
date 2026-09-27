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

    const reviewResponse = await server.handle({
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: {
        name: "create_review",
        arguments: {
          requester: "Codex",
          reviewer: "Claude",
          question: "Prüfe die Änderung auf verlorene parallele Schreibvorgänge.",
          acceptanceCriteria: ["Konkurrierende Updates bleiben erhalten."],
          files: ["src/storage/FileStorage.ts"],
          taskId: "TASK-0001",
          commit: "abc123"
        }
      }
    });
    assert.ok(reviewResponse && "result" in reviewResponse);
    const reviewToolResult = reviewResponse.result as { content: Array<{ text: string }> };
    const review = JSON.parse(reviewToolResult.content[0]!.text) as { id: string };

    const feedbackResponse = await server.handle({
      jsonrpc: "2.0",
      id: 6,
      method: "tools/call",
      params: {
        name: "submit_review_feedback",
        arguments: {
          reviewId: review.id,
          reviewer: "Claude",
          assessment: "CHANGES_REQUESTED",
          summary: "Die Sperre verhindert parallele Updates.",
          findings: ["Bitte auch verwaiste Sperrdateien behandeln."]
        }
      }
    });
    assert.ok(feedbackResponse && "result" in feedbackResponse);

    const unauthorizedResponse = await server.handle({
      jsonrpc: "2.0",
      id: 7,
      method: "tools/call",
      params: { name: "submit_review_feedback", arguments: { reviewId: review.id, reviewer: "Codex", assessment: "APPROVE", summary: "Unberechtigter Review.", findings: [] } }
    });
    assert.ok(unauthorizedResponse && "error" in unauthorizedResponse);

    const unauthorizedAuthor = await server.handle({
      jsonrpc: "2.0",
      id: 8,
      method: "tools/call",
      params: {
        name: "respond_to_review",
        arguments: { reviewId: review.id, author: "Claude", disposition: "ACCEPTED", rationale: "Falsche Rolle." }
      }
    });
    assert.ok(unauthorizedAuthor && "error" in unauthorizedAuthor);

    const responseToFeedback = await server.handle({
      jsonrpc: "2.0",
      id: 9,
      method: "tools/call",
      params: {
        name: "respond_to_review",
        arguments: {
          reviewId: review.id,
          author: "Codex",
          disposition: "PARTIALLY_ACCEPTED",
          rationale: "Die Sperrdatei wird nach Prozessende anhand der PID geprüft."
        }
      }
    });
    assert.ok(responseToFeedback && "result" in responseToFeedback);

    const finalState = await server.handle({ jsonrpc: "2.0", id: 10, method: "tools/call", params: { name: "list_reviews", arguments: {} } });
    assert.ok(finalState && "result" in finalState);
    const finalReviewResult = finalState.result as { content: Array<{ text: string }> };
    const finalReviews = JSON.parse(finalReviewResult.content[0]!.text) as Array<{ status: string; feedback: unknown[]; responses: unknown[] }>;
    assert.equal(finalReviews[0]?.status, "RESOLVED");
    assert.equal(finalReviews[0]?.feedback.length, 1);
    assert.equal(finalReviews[0]?.responses.length, 1);
    const finalMarkdown = await readFile(join(tempDir, "agent_comms.md"), "utf8");
    assert.match(finalMarkdown, /## Reviews/);
    assert.match(finalMarkdown, /Die Sperrdatei wird nach Prozessende/);
  });
});
