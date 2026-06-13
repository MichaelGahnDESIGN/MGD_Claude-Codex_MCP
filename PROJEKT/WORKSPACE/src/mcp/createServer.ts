import { FileStorage } from "../storage/FileStorage.ts";
import { AgentCommsService } from "../tools/AgentCommsService.ts";
import { registerTools } from "../tools/registerTools.ts";
import { McpServer } from "./McpServer.ts";
import packageJson from "../../package.json" with { type: "json" };

export interface CreateServerOptions {
  baseDir: string;
}

export function createServer(options: CreateServerOptions): McpServer {
  const storage = new FileStorage({ baseDir: options.baseDir, markdownFileName: "agent_comms.md", stateFileName: "agent_comms.state.json" });
  const service = new AgentCommsService(storage);
  return new McpServer({ name: "claude-codex-local-comms", version: packageJson.version, tools: registerTools(service) });
}
