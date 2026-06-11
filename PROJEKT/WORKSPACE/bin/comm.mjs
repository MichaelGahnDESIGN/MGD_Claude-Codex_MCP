#!/usr/bin/env node
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const binDir = dirname(fileURLToPath(import.meta.url));
const workspaceDir = resolve(binDir, "..");
const cliEntry = resolve(workspaceDir, "src", "cli", "index.ts");

const child = spawn(process.execPath, ["--experimental-strip-types", cliEntry, ...process.argv.slice(2)], {
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});

child.on("error", (error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
