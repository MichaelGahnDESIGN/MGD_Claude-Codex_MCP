import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderSetupGuide } from "../../src/setup/renderSetupGuide.ts";

describe("renderSetupGuide", () => {
  it("quoted den Codex-Skriptpfad shell-sicher", () => {
    const guide = renderSetupGuide({
      generatedFiles: ["/tmp/setup $(printf risk)/codex-einrichten.sh"],
      outputDir: "/tmp/setup $(printf risk)",
      projectDir: "/tmp/project",
      projectName: "Test"
    });

    assert.match(guide, /bash '\/tmp\/setup \$\(printf risk\)\/codex-einrichten\.sh'/);
    assert.doesNotMatch(guide, /bash "\/tmp\/setup \$\(printf risk\)\/codex-einrichten\.sh"/);
  });
});
