import { mkdir, open, readFile, rename, stat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { createInitialState } from "../domain/createInitialState.ts";
import type { AgentCommsState } from "../domain/types.ts";
import { renderMarkdown } from "../markdown/renderMarkdown.ts";

export interface FileStorageOptions {
  baseDir: string;
  markdownFileName: string;
  stateFileName: string;
}

type StateUpdate<T> = (state: AgentCommsState) => { state: AgentCommsState; result: T };

const lockWaitLimitMs = 30_000;
const staleLockAgeMs = 30_000;

export class FileStorage {
  private readonly options: FileStorageOptions;
  private readonly markdownPath: string;
  private readonly statePath: string;
  private readonly lockPath: string;

  constructor(options: FileStorageOptions) {
    this.options = options;
    this.markdownPath = join(options.baseDir, options.markdownFileName);
    this.statePath = join(options.baseDir, options.stateFileName);
    this.lockPath = `${this.statePath}.lock`;
  }

  async load(): Promise<AgentCommsState> {
    return this.withLock(async () => this.loadUnlocked());
  }

  /** Liest, ändert und speichert den aktuellen Stand unter einem prozessübergreifenden Lock. */
  async update<T>(mutate: StateUpdate<T>): Promise<T> {
    return this.withLock(async () => {
      const current = await this.loadUnlocked();
      const updated = mutate(current);
      await this.saveUnlocked(updated.state);
      return updated.result;
    });
  }

  async save(state: AgentCommsState): Promise<void> {
    await this.withLock(() => this.saveUnlocked(state));
  }

  async readMarkdown(): Promise<string> {
    return this.withLock(() => readFile(this.markdownPath, "utf8"));
  }

  private async loadUnlocked(): Promise<AgentCommsState> {
    await mkdir(this.options.baseDir, { recursive: true });
    try {
      const parsed = JSON.parse(await readFile(this.statePath, "utf8")) as Partial<AgentCommsState>;
      return normalizeState(parsed);
    } catch (error) {
      if (!isMissingFile(error)) throw error;
      const state = createInitialState();
      await this.saveUnlocked(state);
      return state;
    }
  }

  private async saveUnlocked(state: AgentCommsState): Promise<void> {
    await mkdir(dirname(this.statePath), { recursive: true });
    await this.writeAtomically(this.statePath, `${JSON.stringify(state, null, 2)}\n`);
    await this.writeAtomically(this.markdownPath, `${renderMarkdown(state)}\n`);
  }

  private async writeAtomically(path: string, contents: string): Promise<void> {
    const temporaryPath = `${path}.${process.pid}.${randomUUID()}.tmp`;
    try {
      const file = await open(temporaryPath, "wx", 0o600);
      try {
        await file.writeFile(contents, "utf8");
        await file.sync();
      } finally {
        await file.close();
      }
      await rename(temporaryPath, path);
    } finally {
      await unlink(temporaryPath).catch(() => undefined);
    }
  }

  private async withLock<T>(operation: () => Promise<T>): Promise<T> {
    await mkdir(this.options.baseDir, { recursive: true });
    const startedAt = Date.now();
    let waitMs = 10;

    while (true) {
      let lockHandle;
      try {
        lockHandle = await open(this.lockPath, "wx", 0o600);
        try {
          await lockHandle.writeFile(JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }), "utf8");
          await lockHandle.sync();
        } finally {
          await lockHandle.close();
        }
        break;
      } catch (error) {
        if (lockHandle) await lockHandle.close().catch(() => undefined);
        if (!isAlreadyExists(error)) throw error;
        await this.removeStaleLock();
        if (Date.now() - startedAt >= lockWaitLimitMs) {
          throw new Error(`Zeitüberschreitung beim Warten auf den Schreib-Lock ${this.lockPath}.`);
        }
        await delay(waitMs);
        waitMs = Math.min(Math.ceil(waitMs * 1.5), 150);
      }
    }

    try {
      return await operation();
    } finally {
      await unlink(this.lockPath).catch(() => undefined);
    }
  }

  private async removeStaleLock(): Promise<void> {
    try {
      const lockText = await readFile(this.lockPath, "utf8");
      const lock = JSON.parse(lockText) as { pid?: unknown };
      if (typeof lock.pid === "number" && Number.isInteger(lock.pid) && lock.pid > 0) {
        try {
          process.kill(lock.pid, 0);
          return;
        } catch (error) {
          if (!isMissingProcess(error)) return;
        }
      }

      const lockStats = await stat(this.lockPath);
      if (Date.now() - lockStats.mtimeMs >= staleLockAgeMs) {
        await unlink(this.lockPath).catch(() => undefined);
      }
    } catch (error) {
      if (!isMissingFile(error) && !(error instanceof SyntaxError)) throw error;
    }
  }
}

function normalizeState(state: Partial<AgentCommsState>): AgentCommsState {
  const initial = createInitialState(state.projectName ?? "Claude-Codex-MCP");
  return {
    ...initial,
    ...state,
    counters: { ...initial.counters, ...(state.counters ?? {}) },
    tasks: state.tasks ?? [],
    done: state.done ?? [],
    chat: state.chat ?? [],
    blockers: state.blockers ?? [],
    decisions: state.decisions ?? [],
    handoffs: state.handoffs ?? [],
    reviews: state.reviews ?? [],
    logs: state.logs ?? [],
    history: state.history ?? []
  };
}

function isMissingFile(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function isAlreadyExists(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "EEXIST";
}

function isMissingProcess(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ESRCH";
}
