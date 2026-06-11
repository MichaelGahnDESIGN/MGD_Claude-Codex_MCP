import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
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
  await writeFile(join(volumeRoot, "START_HIER.html"), renderStartHereHtml(), "utf8");
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
    "6. Danach öffnet sich automatisch eine deutsche Schritt-für-Schritt-Anleitung mit rechter Sidebar.",
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

function renderStartHereHtml(): string {
  return [
    "<!doctype html>",
    '<html lang="de">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    "  <title>Claude-Codex-MCP Setup Start</title>",
    "  <style>",
    "    :root { color-scheme: light dark; --bg: #f6f7f9; --fg: #17191f; --muted: #5f6673; --panel: #ffffff; --border: #d9dde5; --accent: #2463eb; --code: #eef2ff; }",
    "    @media (prefers-color-scheme: dark) { :root { --bg: #111318; --fg: #f2f4f8; --muted: #aab2c0; --panel: #1b1f29; --border: #333a48; --accent: #7aa2ff; --code: #222a3b; } }",
    "    * { box-sizing: border-box; }",
    "    body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.55 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",
    "    .layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 28px; max-width: 1180px; margin: 0 auto; padding: 32px 22px; }",
    "    main, aside { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; }",
    "    main { padding: 28px; } aside { position: sticky; top: 18px; align-self: start; padding: 20px; }",
    "    h1 { margin: 0 0 10px; font-size: 2rem; line-height: 1.15; } h2 { margin-top: 30px; font-size: 1.25rem; }",
    "    .lead, .muted { color: var(--muted); } .step { border-left: 4px solid var(--accent); padding: 12px 0 12px 16px; margin: 14px 0; }",
    "    code { background: var(--code); border-radius: 6px; padding: 2px 5px; }",
    "    .term { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 12px; } .term strong { display: block; }",
    "    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } aside { position: static; } }",
    "  </style>",
    "</head>",
    "<body>",
    '  <div class="layout">',
    "    <main>",
    "      <h1>Claude-Codex-MCP Setup</h1>",
    "      <p class=\"lead\">Diese Anleitung erklärt den Installer Schritt für Schritt.</p>",
    "      <section class=\"step\"><h2>1. App starten</h2><p>Doppelklicke auf <code>Claude-Codex-MCP Setup.app</code>.</p></section>",
    "      <section class=\"step\"><h2>2. Projektnamen eingeben</h2><p>Der Projektname ist nur eine lesbare Bezeichnung, zum Beispiel <code>Website Relaunch</code>.</p></section>",
    "      <section class=\"step\"><h2>3. Projektordner wählen</h2><p>Wähle den Ordner, in dem die gemeinsame Datei <code>agent_comms.md</code> entstehen soll.</p></section>",
    "      <section class=\"step\"><h2>4. Setup abwarten</h2><p>Die App kopiert das lokale MCP-Projekt, installiert Hilfsdateien und erzeugt die Anleitung.</p></section>",
    "      <section class=\"step\"><h2>5. Danach Anleitung lesen</h2><p>Nach dem Setup öffnet sich automatisch <code>ANLEITUNG.html</code> mit einer rechten Sidebar.</p></section>",
    "      <h2>Wichtig</h2>",
    "      <p>Die App ist noch nicht signiert oder notarisiert. macOS kann eine Sicherheitswarnung anzeigen. Der MCP läuft lokal und sendet keine Projektdaten automatisch in eine Cloud.</p>",
    "    </main>",
    "    <aside aria-label=\"Begriffe und Schritte\">",
    "      <h2>Sidebar</h2>",
    "      <p class=\"muted\">Begriffe kurz erklärt.</p>",
    "      <div class=\"term\"><strong>DMG</strong><span>Eine macOS-Installationsdatei, die du öffnest wie ein Laufwerk.</span></div>",
    "      <div class=\"term\"><strong>Setup.app</strong><span>Das Programm, das den lokalen MCP für dein Projekt vorbereitet.</span></div>",
    "      <div class=\"term\"><strong>MCP</strong><span>Eine lokale Schnittstelle, über die Codex und Claude Aufgaben lesen und schreiben können.</span></div>",
    "      <div class=\"term\"><strong>Projektordner</strong><span>Der Ordner, in dem die gemeinsame Agenten-Datei liegt.</span></div>",
    "      <div class=\"term\"><strong>agent_comms.md</strong><span>Die menschenlesbare Aufgaben- und Chat-Datei.</span></div>",
    "      <div class=\"term\"><strong>/comm</strong><span>Das einfache Startsignal im Agenten-Chat.</span></div>",
    "    </aside>",
    "  </div>",
    "</body>",
    "</html>",
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
    "VOLUME_DIR=\"$(cd \"$APP_CONTENTS_DIR/../..\" && pwd)\"",
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
    "open \"$VOLUME_DIR/START_HIER.html\" || true",
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
    "npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup --yes --project-name \"$PROJECT_NAME\" --project-dir \"$PROJECT_DIR\" --output-dir \"$OUTPUT_DIR\"",
    "",
    "open \"$OUTPUT_DIR\"",
    "open \"$OUTPUT_DIR/ANLEITUNG.html\"",
    "osascript -e 'display notification \"Die Anleitung wurde geöffnet.\" with title \"Claude-Codex-MCP Setup\"'",
    "osascript -e 'display dialog \"Fertig!\\n\\nDie deutsche Schritt-für-Schritt-Anleitung mit rechter Sidebar wurde geöffnet. Zusätzlich ist der Hilfe-Ordner im Finder sichtbar.\\n\\nNächster Schritt: Lies ANLEITUNG.html von oben nach unten und folge nur dem Abschnitt für dein Werkzeug: ChatGPT Codex, Claude Code oder Claude Cowork.\" buttons {\"OK\"} default button \"OK\" with title \"Claude-Codex-MCP Setup\"'",
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
  await writeFile(checksumPath, `${hash.digest("hex")}  ${basename(dmgPath)}\n`, "utf8");
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
