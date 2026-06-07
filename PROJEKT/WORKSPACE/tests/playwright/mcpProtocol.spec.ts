import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { startMcpProcess } from "./mcpClient.ts";

const tempDirs: string[] = [];

test.afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

test("MCP-Prozess bleibt nach fehlerhaftem JSON empfangsbereit", async () => {
  const baseDir = await createTempDir();
  const client = startMcpProcess(baseDir);

  const parseErrorPromise = client.nextResponse();
  client.writeRaw("{fehlerhaftes-json");

  const parseError = await parseErrorPromise;
  expect(parseError).toMatchObject({
    jsonrpc: "2.0",
    id: null,
    error: {
      code: -32700
    }
  });

  const initializeResponse = await client.request("initialize", {});
  expect(initializeResponse).toMatchObject({
    jsonrpc: "2.0",
    result: {
      serverInfo: {
        name: "claude-codex-local-comms",
        version: "0.2.0"
      }
    }
  });

  await client.close();
});

test("MCP-Prozess bleibt nach ungültigem JSON-RPC-Request empfangsbereit", async () => {
  const baseDir = await createTempDir();
  const client = startMcpProcess(baseDir);

  const invalidRequestPromise = client.nextResponse();
  client.writeRaw("null");

  const invalidRequest = await invalidRequestPromise;
  expect(invalidRequest).toMatchObject({
    jsonrpc: "2.0",
    id: null,
    error: {
      code: -32600
    }
  });

  const toolsResponse = await client.request("tools/list", {});
  expect(toolsResponse).toMatchObject({
    jsonrpc: "2.0",
    result: {
      tools: expect.arrayContaining([
        expect.objectContaining({
          name: "read_context"
        })
      ])
    }
  });

  await client.close();
});

test("MCP-Prozess lehnt Secret-Inhalte ab und nimmt danach weitere Requests an", async () => {
  const baseDir = await createTempDir();
  const client = startMcpProcess(baseDir);

  const rejectedResponse = await client.request("tools/call", {
    name: "append_chat",
    arguments: {
      sender: "Codex",
      kind: "Hinweis",
      message: "Bitte .env mit Zugangsdaten pruefen."
    }
  });

  expect(rejectedResponse).toMatchObject({
    jsonrpc: "2.0",
    error: {
      code: -32603
    }
  });

  const contextResponse = await client.request("tools/call", {
    name: "read_context",
    arguments: {}
  });

  expect(contextResponse).toMatchObject({
    jsonrpc: "2.0",
    result: {
      content: [
        {
          type: "text"
        }
      ]
    }
  });

  await client.close();
});

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "agent-comms-playwright-"));
  tempDirs.push(dir);
  return dir;
}
