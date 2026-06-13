import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseCliArgs } from "../../src/cli/parseCliArgs.ts";

describe("parseCliArgs", () => {
  it("nutzt help als Standardbefehl", () => {
    const parsed = parseCliArgs([]);

    assert.deepEqual(parsed, {
      command: "help",
      options: {}
    });
  });

  it("liest setup-Optionen für einfache Nutzerbefehle", () => {
    const parsed = parseCliArgs([
      "setup",
      "--yes",
      "--project-name",
      "Website Relaunch",
      "--project-dir",
      "projekt",
      "--output-dir",
      "hilfe"
    ]);

    assert.deepEqual(parsed, {
      command: "setup",
      options: {
        outputDir: "hilfe",
        projectDir: "projekt",
        projectName: "Website Relaunch",
        yes: true
      }
    });
  });

  it("liest doctor und status mit Projektordner", () => {
    assert.deepEqual(parseCliArgs(["doctor", "--project-dir", "projekt"]), {
      command: "doctor",
      options: { projectDir: "projekt" }
    });

    assert.deepEqual(parseCliArgs(["status", "--project-dir", "projekt"]), {
      command: "status",
      options: { projectDir: "projekt" }
    });
  });

  it("liest neue comm-Wartungsbefehle", () => {
    assert.deepEqual(parseCliArgs(["clear", "--project-dir", "projekt"]), {
      command: "clear",
      options: { projectDir: "projekt" }
    });

    assert.deepEqual(parseCliArgs(["clear-backup", "--project-dir", "projekt"]), {
      command: "clear-backup",
      options: { projectDir: "projekt" }
    });

    assert.deepEqual(parseCliArgs(["info"]), {
      command: "info",
      options: {}
    });
  });

  it("meldet unbekannte Befehle verständlich", () => {
    assert.throws(
      () => parseCliArgs(["install"]),
      /Unbekannter comm-Befehl: install/
    );
  });
});
