# Schnellstart

Diese Seite erklärt den schnellsten lokalen Start von Claude-Codex-MCP.

## Einfachster Weg Auf macOS

Für normale Nutzer ist die DMG aus dem aktuellen GitHub-Release der einfachste
Start:

1. Öffne den Release `v0.2.5`.
2. Lade `Claude-Codex-MCP-CLI_v0.2.5.dmg` herunter.
3. Öffne die DMG.
4. Lies `START_HIER.html`.
5. Starte `Claude-Codex-MCP Setup.app`.
6. Folge den drei Setup-Schritten.
7. Lies danach die automatisch geöffnete `ANLEITUNG.html`.

Die HTML-Anleitungen enthalten rechts eine Sidebar. Dort werden jeder Schritt
und wichtige Begriffe wie MCP, Projektordner, `agent_comms.md` und `/comm`
einfach erklärt.

## Voraussetzungen

- Git
- Node.js ab `22.6.0`
- ein MCP-fähiger Client, zum Beispiel Codex oder Claude

Der MCP-Server selbst bleibt schlank und hat keine Laufzeitabhängigkeiten.
Für die Entwicklungs- und Playwright-Tests werden die im Workspace
versionierten NPM-Dev-Abhängigkeiten installiert.

## Repository Klonen

```bash
git clone https://github.com/MichaelGahnDESIGN/Claude-Codex-MCP.git
cd Claude-Codex-MCP
```

Solange das Repository privat ist, muss dein GitHub-Konto Zugriff auf das Repo
haben.

## Lokale Prüfung

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --prefix PROJEKT/WORKSPACE run check
```

Erwartung:

- 23 Node-Tests bestehen
- Smoke-Test besteht
- 3 Playwright-Audits bestehen

## Einfacher Setup-Assistent

Wenn du ohne DMG arbeitest, ist der Setup-Assistent der einfachste Terminal-
Start:

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup
```

Er fragt nach dem Projektordner und erzeugt dort `agent_comms.md` und
`agent_comms.state.json`. Zusätzlich schreibt er einfache Hilfe-Dateien für
Codex, Claude Code und Claude Cowork.

Wichtig für normale Nutzer:

```text
/comm
```

`/comm` ist der universelle Startbegriff für den gemeinsamen Kommunikations-
und Aufgabenbereich. Die passende Vorlage steht nach dem Setup in
`comm-befehl.md`.

Wichtig: `/comm` ist der Chat- oder Skill-Befehl. Im macOS-Terminal gibt es
bereits einen Systembefehl namens `comm`. Wenn dort
`usage: comm [-123i] file1 file2` erscheint, wurde der falsche Befehl
gestartet. Nutze im Terminal den vollständigen Projektbefehl:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- help
```

Ohne Rückfragen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup --yes
```

## Einfache Prüfung

Wenn du prüfen möchtest, ob der Projektordner vorbereitet ist:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt
```

Wenn du nur den aktuellen Stand sehen möchtest:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- status --project-dir /pfad/zum/projekt
```

## Server Manuell Starten

```bash
cd PROJEKT/WORKSPACE
npm --silent run comm -- start
```

Der Server wartet dann über stdio auf MCP-/JSON-RPC-Anfragen.

## Speicherort Festlegen

Wenn die Kommunikationsdateien in einem konkreten Projektordner liegen sollen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- start --project-dir /pfad/zum/projekt
```

Dann entstehen dort:

```text
agent_comms.md
agent_comms.state.json
```

## Minimaler Arbeitsablauf

Starte im Agenten-Chat mit:

```text
/comm
```

Danach gilt:

1. `read_context` aufrufen.
2. Mit `create_task` eine Aufgabe anlegen.
3. Mit `claim_task` übernehmen.
4. Mit `complete_task` abschließen.
5. `agent_comms.md` lesen und prüfen.

## Beispiel Für Einen Ersten Codex-Prompt

```text
Nutze das lokale Claude-Codex-MCP.

1. Lies mit read_context den aktuellen Projektkontext.
2. Erstelle mit create_task eine kleine Testaufgabe an Claude.
3. Achte darauf, keine sensiblen Daten zu speichern.
4. Prüfe danach agent_comms.md.
```

## Beispiel Für Einen Ersten Claude-Prompt

```text
Nutze das lokale Claude-Codex-MCP.

1. Rufe list_tasks auf.
2. Übernimm eine passende Aufgabe mit claim_task.
3. Schließe sie mit complete_task ab.
4. Wenn etwas unklar ist, lege einen neutral formulierten Blocker an.
```

## Wichtige Sicherheitsregel

Keine echten Secrets, Tokens, privaten Schlüssel, `.env`-Inhalte,
personenbezogenen Detaildaten oder privaten Logs in Tool-Eingaben schreiben.

Wenn sensible Daten relevant wirken, neutral formulieren:

```text
Blocker: Für diese Aufgabe werden Zugangsdaten benötigt. Bitte lokal prüfen und
nicht in das MCP schreiben.
```
