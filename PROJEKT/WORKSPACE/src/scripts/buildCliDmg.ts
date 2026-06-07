import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const workspaceDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const repoRoot = resolve(workspaceDir, "..", "..");
const version = (await readFile(join(repoRoot, "VERSION"), "utf8")).trim();
const outputDir = join(workspaceDir, "CLI-DMG");
const stagingDir = join(outputDir, "staging");
const volumeRoot = join(stagingDir, "Claude-Codex-MCP CLI");
const bundledRepoDir = join(volumeRoot, "Claude-Codex-MCP");
const dmgPath = join(outputDir, `Claude-Codex-MCP-CLI_v${version}.dmg`);
const checksumPath = `${dmgPath}.sha256`;

await rm(stagingDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await mkdir(volumeRoot, { recursive: true });

await copyRepositorySnapshot();
await writeVolumeFiles();
await rm(dmgPath, { force: true });
await run("hdiutil", ["create", "-volname", "Claude-Codex-MCP CLI", "-srcfolder", volumeRoot, "-ov", "-format", "UDZO", dmgPath]);
await run("hdiutil", ["verify", dmgPath]);
await writeChecksum();
await rm(stagingDir, { recursive: true, force: true });

process.stdout.write(`DMG erstellt: ${dmgPath}\n`);
process.stdout.write(`Prüfsumme: ${checksumPath}\n`);

async function copyRepositorySnapshot(): Promise<void> {
  const archivePath = join(outputDir, "repo-snapshot.zip");
  await rm(archivePath, { force: true });
  await run("git", ["archive", "--format=zip", "--output", archivePath, "HEAD"], { cwd: repoRoot });
  await mkdir(bundledRepoDir, { recursive: true });
  await run("ditto", ["-x", "-k", archivePath, bundledRepoDir]);
  await rm(archivePath, { force: true });
}

async function writeVolumeFiles(): Promise<void> {
  const setupCommandPath = join(volumeRoot, "Setup starten.command");
  const checkCommandPath = join(volumeRoot, "MCP prüfen.command");
  await writeFile(join(volumeRoot, "START_HIER.md"), renderStartHere(), "utf8");
  await writeFile(setupCommandPath, renderSetupCommand(), "utf8");
  await writeFile(checkCommandPath, renderCheckCommand(), "utf8");
  await chmod(setupCommandPath, 0o755);
  await chmod(checkCommandPath, 0o755);
}

function renderStartHere(): string {
  return [
    "# Claude-Codex-MCP CLI-DMG",
    "",
    "Dieses lokale DMG ist ein Testpaket für macOS.",
    "",
    "## So Startest Du",
    "",
    "1. Öffne `Setup starten.command`.",
    "2. Das Projekt wird in deinen Benutzerordner kopiert.",
    "3. Danach startet der einfache Setup-Assistent.",
    "4. Der Assistent erzeugt die Hilfe-Dateien für Codex, Claude Code und Claude Cowork.",
    "",
    "## Wichtig",
    "",
    "- Das DMG ist nicht signiert und nur für lokale Tests gedacht.",
    "- Der MCP läuft lokal.",
    "- GitHub ist nur der Ort für Code und Releases.",
    "- Keine Passwörter, Tokens, `.env`-Inhalte oder personenbezogenen Details in Aufgaben schreiben.",
    ""
  ].join("\n");
}

function renderSetupCommand(): string {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "DMG_DIR=\"$(cd \"$(dirname \"$0\")\" && pwd)\"",
    "SOURCE_DIR=\"$DMG_DIR/Claude-Codex-MCP\"",
    "TARGET_BASE=\"$HOME/Claude-Codex-MCP-CLI\"",
    "TARGET_DIR=\"$TARGET_BASE\"",
    "if [[ -e \"$TARGET_DIR\" ]]; then",
    "  TARGET_DIR=\"${TARGET_BASE}-$(date +%Y%m%d-%H%M%S)\"",
    "fi",
    "",
    "echo \"Kopiere Claude-Codex-MCP nach: $TARGET_DIR\"",
    "ditto \"$SOURCE_DIR\" \"$TARGET_DIR\"",
    "cd \"$TARGET_DIR\"",
    "",
    "echo \"Installiere lokale Dev-Abhängigkeiten...\"",
    "npm --prefix PROJEKT/WORKSPACE install",
    "",
    "echo \"Starte Setup-Assistent...\"",
    "npm --prefix PROJEKT/WORKSPACE run setup",
    "",
    "echo \"Fertig. Installierter Ordner: $TARGET_DIR\"",
    "read -r -p \"Drücke Enter zum Schließen.\"",
    ""
  ].join("\n");
}

function renderCheckCommand(): string {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "TARGET_DIR=\"$HOME/Claude-Codex-MCP-CLI\"",
    "if [[ ! -d \"$TARGET_DIR\" ]]; then",
    "  echo \"Claude-Codex-MCP-CLI wurde noch nicht unter $TARGET_DIR gefunden.\"",
    "  echo \"Bitte zuerst 'Setup starten.command' ausführen.\"",
    "  read -r -p \"Drücke Enter zum Schließen.\"",
    "  exit 1",
    "fi",
    "",
    "cd \"$TARGET_DIR\"",
    "npm --prefix PROJEKT/WORKSPACE run check",
    "read -r -p \"Drücke Enter zum Schließen.\"",
    ""
  ].join("\n");
}

async function writeChecksum(): Promise<void> {
  const hash = createHash("sha256");
  await new Promise<void>((resolvePromise, reject) => {
    const stream = createReadStream(dmgPath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolvePromise());
    stream.on("error", reject);
  });
  await writeFile(checksumPath, `${hash.digest("hex")}  ${dmgPath}\n`, "utf8");
}

async function run(command: string, args: string[], options: { cwd?: string } = {}): Promise<void> {
  await new Promise<void>((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd: options.cwd, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} wurde mit Code ${String(code)} beendet.`));
    });
    child.on("error", reject);
  });
}
