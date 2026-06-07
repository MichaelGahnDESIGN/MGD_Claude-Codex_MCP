import { mkdir, readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "../mcp/createServer.ts";

const demoDir = resolve(process.env.AGENT_COMMS_DIR ?? "local-agent-comms/demo");

await rm(demoDir, { recursive: true, force: true });
await mkdir(demoDir, { recursive: true });

const server = createServer({ baseDir: demoDir });

async function callTool(id: number, name: string, args: Record<string, unknown>) {
  const response = await server.handle({
    jsonrpc: "2.0",
    id,
    method: "tools/call",
    params: {
      name,
      arguments: args
    }
  });

  if (!response || "error" in response) {
    throw new Error(response && "error" in response ? response.error.message : "Keine MCP-Antwort erhalten.");
  }

  return response.result;
}

await callTool(1, "create_task", {
  sender: "Codex",
  recipient: "Claude",
  type: "QA",
  priority: "NORMAL",
  context: "Lokale Zwei-Agenten-Demo",
  task: "Prüfe, ob Codex und Claude denselben lokalen MCP-State nutzen können.",
  acceptanceCriteria: [
    "Codex erstellt eine Aufgabe.",
    "Claude übernimmt dieselbe Aufgabe.",
    "Claude schließt die Aufgabe ab.",
    "agent_comms.md enthält den gesamten Ablauf."
  ],
  safetyNote: "Keine sensiblen Daten speichern."
});

await callTool(2, "claim_task", {
  taskId: "TASK-0001",
  agent: "Claude"
});

await callTool(3, "complete_task", {
  taskId: "TASK-0001",
  resultNote: "Claude hat die von Codex erstellte Aufgabe abgeschlossen.",
  files: ["agent_comms.md", "agent_comms.state.json"],
  tests: ["npm run demo:agents"]
});

const markdown = await readFile(resolve(demoDir, "agent_comms.md"), "utf8");

console.log(`Demo abgeschlossen.`);
console.log(`Kommunikationsordner: ${demoDir}`);
console.log("");
console.log(markdown);
