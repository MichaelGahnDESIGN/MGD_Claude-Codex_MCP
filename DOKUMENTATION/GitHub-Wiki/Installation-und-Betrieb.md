# Installation und Betrieb

## Aktueller Betriebsmodus

Phase 1 läuft lokal über stdio.

Das bedeutet:

- Der MCP-Prozess läuft auf dem Rechner oder Server des Nutzers.
- GitHub dient nur als Quellcode- und Dokumentationsort.
- Die Kommunikationsdateien liegen lokal im gewählten Projektordner.

## Voraussetzungen

- Git
- Node.js ab `22.6.0`
- Zugriff auf das private Repository
- ein MCP-fähiger Client

## Klonen

```bash
git clone https://github.com/MichaelGahnDESIGN/Claude-Codex-MCP.git
cd Claude-Codex-MCP
```

## Prüfen

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --prefix PROJEKT/WORKSPACE run check
```

## Einfach Einrichten

Für Menschen ohne Programmierhintergrund:

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --prefix PROJEKT/WORKSPACE run setup
```

Der Assistent erzeugt:

- den lokalen Kommunikationsordner
- `agent_comms.md`
- `agent_comms.state.json`
- `ANLEITUNG.md`
- fertige Codex- und Claude-Konfigurationshilfen

## Lokales CLI-DMG Bauen

Für macOS kann lokal ein CLI-DMG-Testpaket gebaut werden:

```bash
npm --prefix PROJEKT/WORKSPACE run build:cli-dmg
```

Das Ergebnis liegt unter:

```text
PROJEKT/WORKSPACE/CLI-DMG/
```

Dieses Paket ist nicht signiert und nicht notarisiert. Es ist nur für lokale
Tests gedacht und wird aktuell nicht auf GitHub veröffentlicht.

## Start Im Workspace

```bash
cd PROJEKT/WORKSPACE
npm start
```

## Start Mit Projektordner

```bash
AGENT_COMMS_DIR=/pfad/zum/projekt npm --prefix PROJEKT/WORKSPACE start
```

## Erwartete Dateien

Nach dem ersten Zugriff entstehen:

```text
agent_comms.md
agent_comms.state.json
```

## Betrieb In Einem Echten Projekt

Empfohlen:

1. MCP-Code separat klonen.
2. `AGENT_COMMS_DIR` auf das Zielprojekt setzen.
3. `agent_comms.md` im Zielprojekt versionieren, wenn das Team das möchte.
4. `agent_comms.state.json` je nach Projektentscheidung versionieren oder lokal
   halten.

## Was Nicht Passiert

Der Server:

- sendet keine Daten an GitHub
- sendet keine Daten an all-inkl
- nutzt keine Cloud
- startet keinen HTTP-Server
- speichert keine Zahlungsdaten

## Spätere Installation Über NPM

Geplant ist später ein einfacherer Start, zum Beispiel:

```bash
npx claude-codex-mcp
```

Das ist noch nicht Teil von Phase 1.
