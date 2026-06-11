#!/usr/bin/env node
import { runCli } from "./runCli.ts";

const exitCode = await runCli(process.argv.slice(2), {
  cwd: process.cwd(),
  env: process.env,
  stderr: process.stderr,
  stdout: process.stdout
});

process.exitCode = exitCode;
