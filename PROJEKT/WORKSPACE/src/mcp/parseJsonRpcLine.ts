import type { JsonRpcError, JsonRpcRequest } from "./jsonRpcTypes.ts";

export type ParsedJsonRpcLine =
  | { kind: "request"; request: JsonRpcRequest }
  | { kind: "error"; error: JsonRpcError };

export function parseJsonRpcLine(line: string): ParsedJsonRpcLine {
  try {
    const value = JSON.parse(line) as unknown;
    if (!isJsonRpcRequest(value)) {
      return { kind: "error", error: createJsonRpcError(extractRequestId(value), -32600, "JSON-RPC-Request ist ungültig.") };
    }
    return { kind: "request", request: value };
  } catch {
    // JSON-RPC verlangt bei unlesbarem JSON einen Parse-Error mit leerer ID.
    return { kind: "error", error: createJsonRpcError(null, -32700, "JSON konnte nicht gelesen werden.") };
  }
}

function isJsonRpcRequest(value: unknown): value is JsonRpcRequest {
  if (!isPlainRecord(value)) {
    return false;
  }
  return value.jsonrpc === "2.0" && typeof value.method === "string";
}

function extractRequestId(value: unknown): string | number | null {
  if (!isPlainRecord(value)) {
    return null;
  }
  const id = value.id;
  if (typeof id === "string" || typeof id === "number" || id === null) {
    return id;
  }
  return null;
}

function createJsonRpcError(id: string | number | null, code: number, message: string): JsonRpcError {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message
    }
  };
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
