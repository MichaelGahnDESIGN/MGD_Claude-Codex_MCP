import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderCommCommand } from "../../src/setup/renderCommCommand.ts";

describe("renderCommCommand", () => {
  it("beschreibt /comm als universellen Agenten-Befehl", () => {
    const command = renderCommCommand();

    assert.match(command, /# \/comm/);
    assert.match(command, /read_context/);
    assert.match(command, /list_tasks/);
    assert.match(command, /write_handoff/);
    assert.doesNotMatch(command, /\/codex\b/);
    assert.doesNotMatch(command, /\/code\b/);
  });
});
