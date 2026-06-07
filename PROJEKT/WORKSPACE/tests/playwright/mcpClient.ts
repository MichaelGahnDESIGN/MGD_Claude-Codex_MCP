import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { createInterface } from "node:readline";

interface PendingResponse {
  resolve: (value: Record<string, unknown>) => void;
  reject: (error: Error) => void;
}

export interface McpProcessClient {
  close: () => Promise<void>;
  nextResponse: () => Promise<Record<string, unknown>>;
  request: (method: string, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
  writeRaw: (line: string) => void;
}

// Kleiner Test-Client für den stdio-MCP-Server. Er simuliert einen echten Client,
// ohne die Produktivlogik direkt zu importieren.
export function startMcpProcess(baseDir: string): McpProcessClient {
  let nextId = 1;
  const pendingResponses: PendingResponse[] = [];
  const processHandle = spawn(process.execPath, ["--experimental-strip-types", "src/index.ts"], {
    cwd: process.cwd(),
    env: { ...process.env, AGENT_COMMS_DIR: baseDir },
    stdio: ["pipe", "pipe", "pipe"]
  });

  const stdoutLines = createInterface({ input: processHandle.stdout, crlfDelay: Infinity });
  stdoutLines.on("line", (line) => {
    const pending = pendingResponses.shift();
    if (!pending) {
      return;
    }
    try {
      pending.resolve(JSON.parse(line) as Record<string, unknown>);
    } catch (error) {
      pending.reject(error instanceof Error ? error : new Error("Antwort konnte nicht gelesen werden."));
    }
  });

  processHandle.on("exit", (code, signal) => {
    const error = new Error(`MCP-Prozess wurde beendet. Code: ${String(code)}, Signal: ${String(signal)}`);
    for (const pending of pendingResponses.splice(0)) {
      pending.reject(error);
    }
  });

  return {
    close: () => closeProcess(processHandle),
    nextResponse: () => waitForNextResponse(pendingResponses),
    request: async (method, params = {}) => {
      const id = nextId;
      nextId += 1;
      const responsePromise = waitForNextResponse(pendingResponses);
      processHandle.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
      return responsePromise;
    },
    writeRaw: (line) => {
      processHandle.stdin.write(line.endsWith("\n") ? line : `${line}\n`);
    }
  };
}

function waitForNextResponse(pendingResponses: PendingResponse[]): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Keine MCP-Antwort innerhalb des Test-Zeitlimits erhalten."));
    }, 2_500);
    pendingResponses.push({
      reject: (error) => {
        clearTimeout(timeout);
        reject(error);
      },
      resolve: (value) => {
        clearTimeout(timeout);
        resolve(value);
      }
    });
  });
}

async function closeProcess(processHandle: ChildProcessWithoutNullStreams): Promise<void> {
  if (processHandle.exitCode !== null) {
    return;
  }
  processHandle.stdin.end();
  await new Promise<void>((resolve) => {
    processHandle.once("exit", () => resolve());
    processHandle.kill();
  });
}
