import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { FileStorage } from "../../src/storage/FileStorage.ts";
import { createInitialState } from "../../src/domain/createInitialState.ts";
import { appendChat } from "../../src/domain/appendChat.ts";

const tempDirs: string[] = [];

afterEach(async () => {
  for (const dir of tempDirs.splice(0)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe("FileStorage", () => {
  it("legt State und Markdown beim Speichern an und kann sie wieder laden", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-"));
    tempDirs.push(tempDir);
    const storage = new FileStorage({ baseDir: tempDir, markdownFileName: "agent_comms.md", stateFileName: "agent_comms.state.json" });
    const state = await storage.load();
    state.chat.push({ id: "CHAT-0001", createdAt: "2026-06-07T10:00:00.000Z", sender: "Codex", kind: "Hinweis", message: "Lokaler Test." });
    await storage.save(state);
    assert.equal((await storage.load()).chat[0]?.message, "Lokaler Test.");
    assert.match(await storage.readMarkdown(), /Lokaler Test\./);
  });

  it("übernimmt ältere State-Dateien ohne Review-Felder verlustfrei", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-migration-"));
    tempDirs.push(tempDir);
    const oldState = createInitialState();
    const oldCounters = { ...oldState.counters } as Record<string, number>;
    delete oldCounters.review;
    await writeFile(join(tempDir, "agent_comms.state.json"), JSON.stringify({ ...oldState, counters: oldCounters, reviews: undefined }), "utf8");

    const loaded = await new FileStorage({ baseDir: tempDir, markdownFileName: "agent_comms.md", stateFileName: "agent_comms.state.json" }).load();
    assert.deepEqual(loaded.reviews, []);
    assert.equal(loaded.counters.review, 0);
    assert.equal(loaded.version, 1);
  });

  it("serialisiert parallele Änderungen auch über mehrere Storage-Instanzen hinweg", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "agent-comms-lock-"));
    tempDirs.push(tempDir);
    const options = { baseDir: tempDir, markdownFileName: "agent_comms.md", stateFileName: "agent_comms.state.json" };
    const stores = [new FileStorage(options), new FileStorage(options)];
    await Promise.all(Array.from({ length: 40 }, (_, index) => stores[index % 2]!.update((state) => {
      const next = appendChat(state, { sender: `Agent-${index % 2}`, kind: "Status", message: `Parallele Nachricht ${index}` });
      return { state: next, result: undefined };
    })));

    const loaded = await stores[0]!.load();
    assert.equal(loaded.chat.length, 40);
    assert.equal(new Set(loaded.chat.map((item) => item.id)).size, 40);
    assert.equal(loaded.counters.chat, 40);
    assert.match(await readFile(join(tempDir, "agent_comms.md"), "utf8"), /Parallele Nachricht 39/);
  });
});
