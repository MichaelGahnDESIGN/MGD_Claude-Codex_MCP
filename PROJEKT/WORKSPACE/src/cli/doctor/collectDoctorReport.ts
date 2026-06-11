import { access } from "node:fs/promises";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import type { DoctorCheck, DoctorReport } from "./doctorTypes.ts";

export interface CollectDoctorReportOptions {
  projectDir: string;
  workspaceDir: string;
}

export async function collectDoctorReport(options: CollectDoctorReportOptions): Promise<DoctorReport> {
  const projectDir = resolve(options.projectDir);
  const workspaceDir = resolve(options.workspaceDir);
  const checks: DoctorCheck[] = [
    checkNodeVersion(),
    checkCommand("npm", "npm", "npm ist verfügbar.", "npm wurde nicht gefunden."),
    await checkPath("workspace", "MCP-Projekt", workspaceDir, "MCP-Projektordner gefunden.", "MCP-Projektordner fehlt."),
    await checkPath("project_dir", "Projektordner", projectDir, "Projektordner gefunden.", "Projektordner fehlt."),
    await checkPath("agent_comms_md", "agent_comms.md", join(projectDir, "agent_comms.md"), "agent_comms.md gefunden.", "agent_comms.md fehlt."),
    await checkPath("agent_comms_state", "agent_comms.state.json", join(projectDir, "agent_comms.state.json"), "agent_comms.state.json gefunden.", "agent_comms.state.json fehlt.")
  ];

  return {
    checks,
    ok: checks.every((check) => check.status !== "fail"),
    projectDir,
    workspaceDir
  };
}

function checkNodeVersion(): DoctorCheck {
  const version = process.versions.node;
  const [major = 0, minor = 0] = version.split(".").map((part) => Number.parseInt(part, 10));
  const supported = major > 22 || (major === 22 && minor >= 6);

  return {
    id: "node",
    label: "Node.js",
    message: supported
      ? `Node.js ${version} ist geeignet.`
      : `Node.js ${version} ist zu alt. Benötigt wird mindestens 22.6.0.`,
    status: supported ? "ok" : "fail"
  };
}

function checkCommand(id: string, command: string, okMessage: string, failMessage: string): DoctorCheck {
  const result = spawnSync(command, ["--version"], { encoding: "utf8" });
  return {
    id,
    label: command,
    message: result.status === 0 ? okMessage : failMessage,
    status: result.status === 0 ? "ok" : "fail"
  };
}

async function checkPath(id: string, label: string, path: string, okMessage: string, failMessage: string): Promise<DoctorCheck> {
  try {
    await access(path);
    return {
      id,
      label,
      message: okMessage,
      status: "ok"
    };
  } catch {
    return {
      id,
      label,
      message: failMessage,
      status: "fail"
    };
  }
}
