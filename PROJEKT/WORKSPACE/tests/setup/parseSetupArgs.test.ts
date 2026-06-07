import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseSetupArgs } from "../../src/setup/parseSetupArgs.ts";

describe("parseSetupArgs", () => {
  it("behandelt den Projektnamen als Text und nicht als Pfad", () => {
    const parsed = parseSetupArgs(["--yes", "--project-name", "Nicht-Programmierer Test"]);

    assert.equal(parsed.yes, true);
    assert.equal(parsed.projectName, "Nicht-Programmierer Test");
  });
});
