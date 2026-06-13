import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderCliHelp } from "../../src/cli/renderCliHelp.ts";

describe("renderCliHelp", () => {
  it("warnt vor dem gleichnamigen macOS-Systembefehl", () => {
    const help = renderCliHelp();

    assert.match(help, /macOS-Systembefehl/);
    assert.match(help, /npm --silent --prefix PROJEKT\/WORKSPACE run comm -- help/);
    assert.match(help, /claude-codex-mcp setup/);
  });
});
