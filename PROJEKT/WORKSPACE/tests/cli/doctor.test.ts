import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, it } from "node:test";
import { collectDoctorReport } from "../../src/cli/doctor/collectDoctorReport.ts";
import { renderDoctorReport } from "../../src/cli/doctor/renderDoctorReport.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("comm doctor", () => {
  it("erkennt fehlende Agenten-Dateien verständlich", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "comm-doctor-missing-"));
    tempDirs.push(tempDir);

    const report = await collectDoctorReport({
      projectDir: join(tempDir, "projekt"),
      workspaceDir: tempDir
    });

    assert.equal(report.ok, false);
    assert.equal(report.projectDir, join(tempDir, "projekt"));
    assert.equal(report.checks.some((check) => check.id === "agent_comms_md" && check.status === "fail"), true);
    assert.match(renderDoctorReport(report), /agent_comms\.md fehlt/);
  });

  it("bestätigt einen eingerichteten Projektordner", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "comm-doctor-ready-"));
    tempDirs.push(tempDir);
    const projectDir = join(tempDir, "projekt");
    await mkdir(projectDir, { recursive: true });
    await writeFile(join(projectDir, "agent_comms.md"), "# Agent Comms\n", "utf8");
    await writeFile(join(projectDir, "agent_comms.state.json"), "{\"version\":\"1\"}\n", "utf8");

    const report = await collectDoctorReport({
      projectDir,
      workspaceDir: tempDir
    });

    assert.equal(report.ok, true);
    assert.match(renderDoctorReport(report), /Bereit/);
  });
});
