import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderCommInfo } from "../../src/cli/info/renderCommInfo.ts";

describe("comm info", () => {
  it("erklärt alle wichtigen Slash- und Terminalbefehle", () => {
    const info = renderCommInfo();

    assert.match(info, /\/comm\b/);
    assert.match(info, /\/comm-clear\b/);
    assert.match(info, /\/comm-clear-backup\b/);
    assert.match(info, /\/comm-info\b/);
    assert.match(info, /\/comm-help\b/);
    assert.match(info, /comm -- clear/);
    assert.match(info, /comm -- clear-backup/);
  });
});
