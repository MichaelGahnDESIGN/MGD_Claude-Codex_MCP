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
const appName = "Claude-Codex-MCP Setup.app";
const appRoot = join(volumeRoot, appName);
const appContentsDir = join(appRoot, "Contents");
const appMacOsDir = join(appContentsDir, "MacOS");
const appResourcesDir = join(appContentsDir, "Resources");
const appExecutablePath = join(appMacOsDir, "Claude-Codex-MCP Setup");
const bundledRepoDir = join(appResourcesDir, "Claude-Codex-MCP");
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
  await writeFile(join(volumeRoot, "START_HIER.md"), renderStartHere(), "utf8");
  await mkdir(appMacOsDir, { recursive: true });
  await mkdir(appResourcesDir, { recursive: true });
  await writeFile(join(appContentsDir, "Info.plist"), renderInfoPlist(), "utf8");
  await writeFile(appExecutablePath, renderAppExecutable(), "utf8");
  await chmod(appExecutablePath, 0o755);
}

function renderStartHere(): string {
  return [
    "# Claude-Codex-MCP CLI-DMG",
    "",
    "Dieses lokale DMG startet ein echtes macOS-Programm:",
    "",
    "```text",
    "Claude-Codex-MCP Setup.app",
    "```",
    "",
    "## So Startest Du",
    "",
    "1. Doppelklicke auf `Claude-Codex-MCP Setup.app`.",
    "2. Bestätige den ersten Hinweis.",
    "3. Gib einen einfachen Projektnamen ein.",
    "4. Wähle den Ordner, in dem die gemeinsame Agenten-Datei liegen soll.",
    "5. Warte, bis die App fertig ist.",
    "6. Danach öffnet sich automatisch eine deutsche Schritt-für-Schritt-Anleitung.",
    "",
    "## Was Die App Macht",
    "",
    "- Sie kopiert das lokale MCP-Projekt in deinen Benutzerordner.",
    "- Sie installiert lokale Hilfsdateien.",
    "- Sie erstellt `agent_comms.md` und `agent_comms.state.json`.",
    "- Sie erstellt fertige Hilfe-Dateien für Codex, Claude Code und Claude Cowork.",
    "",
    "Du musst keine Programmierkenntnisse haben.",
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

function renderInfoPlist(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    "<dict>",
    "  <key>CFBundleDevelopmentRegion</key>",
    "  <string>de</string>",
    "  <key>CFBundleDisplayName</key>",
    "  <string>Claude-Codex-MCP Setup</string>",
    "  <key>CFBundleExecutable</key>",
    "  <string>Claude-Codex-MCP Setup</string>",
    "  <key>CFBundleIdentifier</key>",
    "  <string>de.michaelgahn.claude-codex-mcp.setup</string>",
    "  <key>CFBundleInfoDictionaryVersion</key>",
    "  <string>6.0</string>",
    "  <key>CFBundleName</key>",
    "  <string>Claude-Codex-MCP Setup</string>",
    "  <key>CFBundlePackageType</key>",
    "  <string>APPL</string>",
    "  <key>CFBundleShortVersionString</key>",
    `  <string>${version}</string>`,
    "  <key>CFBundleVersion</key>",
    `  <string>${version}</string>`,
    "  <key>LSMinimumSystemVersion</key>",
    "  <string>12.0</string>",
    "</dict>",
    "</plist>",
    ""
  ].join("\n");
}

function renderAppExecutable(): string {
  return [
    "#!/usr/bin/env bash",
    "set -euo pipefail",
    "",
    "export PATH=\"/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin\"",
    "APP_MACOS_DIR=\"$(cd \"$(dirname \"$0\")\" && pwd)\"",
    "APP_CONTENTS_DIR=\"$(cd \"$APP_MACOS_DIR/..\" && pwd)\"",
    "SOURCE_DIR=\"$APP_CONTENTS_DIR/Resources/Claude-Codex-MCP\"",
    "TARGET_BASE=\"$HOME/Claude-Codex-MCP-CLI\"",
    "TARGET_DIR=\"$TARGET_BASE\"",
    "LOG_FILE=\"$HOME/Claude-Codex-MCP-Setup.log\"",
    "",
    "show_error() {",
    "  osascript -e 'display dialog \"Beim Einrichten ist leider etwas schiefgelaufen. Die Logdatei wird jetzt geöffnet. Du kannst sie prüfen oder an eine Support-Person weitergeben. Bitte achte darauf, keine privaten Daten zu teilen.\" buttons {\"OK\"} default button \"OK\" with icon caution with title \"Claude-Codex-MCP Setup\"' || true",
    "  open \"$LOG_FILE\" || true",
    "}",
    "trap show_error ERR",
    "exec > >(tee \"$LOG_FILE\") 2>&1",
    "",
    "if [[ -e \"$TARGET_DIR\" ]]; then",
    "  TARGET_DIR=\"${TARGET_BASE}-$(date +%Y%m%d-%H%M%S)\"",
    "fi",
    "",
    "osascript -e 'display dialog \"Willkommen! Diese App richtet Claude-Codex-MCP lokal auf deinem Mac ein.\\n\\nSie hilft Codex und Claude, über eine gemeinsame Aufgaben-Datei zusammenzuarbeiten.\\n\\nEs werden keine Daten automatisch in eine Cloud übertragen.\" buttons {\"Abbrechen\", \"Weiter\"} default button \"Weiter\" with title \"Claude-Codex-MCP Setup\"'",
    "PROJECT_NAME=$(osascript -e 'text returned of (display dialog \"Schritt 1 von 3\\n\\nWie soll dein Agenten-Projekt heißen?\\n\\nBeispiel: Website Relaunch, Kundenprojekt, App-Test\" default answer \"Mein Agenten-Projekt\" buttons {\"Abbrechen\", \"Weiter\"} default button \"Weiter\" with title \"Claude-Codex-MCP Setup\")')",
    "PROJECT_DIR=$(osascript -e 'POSIX path of (choose folder with prompt \"Schritt 2 von 3: Wähle den Projektordner. Dort wird die gemeinsame Datei agent_comms.md erstellt.\")')",
    "OUTPUT_DIR=\"$PROJECT_DIR/setup-hilfe-claude-codex\"",
    "",
    "if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then",
    "  osascript -e 'display dialog \"Node.js oder npm wurde nicht gefunden.\\n\\nBitte installiere Node.js ab Version 22.6.0 und starte diese App danach erneut.\\n\\nOhne Node.js kann der lokale MCP-Server nicht gestartet werden.\" buttons {\"OK\"} default button \"OK\" with icon caution with title \"Claude-Codex-MCP Setup\"'",
    "  exit 1",
    "fi",
    "",
    "osascript -e 'display dialog \"Schritt 3 von 3\\n\\nJetzt wird das lokale MCP-Projekt vorbereitet. Das kann kurz dauern.\\n\\nBitte warte, bis die Abschlussmeldung erscheint.\" buttons {\"Starten\"} default button \"Starten\" with title \"Claude-Codex-MCP Setup\"'",
    "osascript -e 'display notification \"Bitte warten: Das lokale Setup läuft.\" with title \"Claude-Codex-MCP Setup\"'",
    "echo \"Claude-Codex-MCP Setup\"",
    "echo \"Zielordner: $TARGET_DIR\"",
    "echo \"Projektname: $PROJECT_NAME\"",
    "echo \"Kommunikationsordner: $PROJECT_DIR\"",
    "ditto \"$SOURCE_DIR\" \"$TARGET_DIR\"",
    "cd \"$TARGET_DIR\"",
    "echo \"Installiere lokale Hilfsdateien...\"",
    "npm --prefix PROJEKT/WORKSPACE install",
    "echo \"Erzeuge Anleitung und Konfiguration...\"",
    "npm --prefix PROJEKT/WORKSPACE run setup -- --yes --project-name \"$PROJECT_NAME\" --project-dir \"$PROJECT_DIR\" --output-dir \"$OUTPUT_DIR\"",
    "",
    "open \"$OUTPUT_DIR\"",
    "open \"$OUTPUT_DIR/ANLEITUNG.md\"",
    "osascript -e 'display notification \"Die Anleitung wurde geöffnet.\" with title \"Claude-Codex-MCP Setup\"'",
    "osascript -e 'display dialog \"Fertig!\\n\\nDie deutsche Schritt-für-Schritt-Anleitung wurde geöffnet. Zusätzlich ist der Hilfe-Ordner im Finder sichtbar.\\n\\nNächster Schritt: Lies ANLEITUNG.md von oben nach unten und folge nur dem Abschnitt für dein Werkzeug: ChatGPT Codex, Claude Code oder Claude Cowork.\" buttons {\"OK\"} default button \"OK\" with title \"Claude-Codex-MCP Setup\"'",
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
