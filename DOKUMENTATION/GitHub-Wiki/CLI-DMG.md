# CLI-DMG

## Zweck

Das CLI-DMG ist ein macOS-Paket für Menschen, die nicht direkt mit dem
Repository oder Terminalbefehlen arbeiten möchten. Es wird im GitHub-Release
bereitgestellt und kann zusätzlich lokal neu gebaut werden.

Es enthält eine echte macOS-App im `.app`-Format. Die App kopiert das Projekt
lokal in einen beschreibbaren Benutzerordner, fragt Projektname und
Projektordner ab und startet danach den Setup-Assistenten.

## Aktueller Stand

- Das DMG wird im GitHub-Release bereitgestellt.
- Es kann zusätzlich lokal gebaut werden.
- Es wird im Repository nicht versioniert.
- Es ist nicht signiert und nicht notarisiert.
- macOS kann deshalb Sicherheitswarnungen anzeigen.

## DMG Lokal Bauen

Vom Repository-Root aus:

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --prefix PROJEKT/WORKSPACE run build:cli-dmg
```

Danach liegt das Ergebnis unter:

```text
PROJEKT/WORKSPACE/CLI-DMG/
```

Erzeugt werden:

- `Claude-Codex-MCP-CLI_v0.2.5.dmg`
- `Claude-Codex-MCP-CLI_v0.2.5.dmg.sha256`

## Inhalt Des DMG

Das DMG enthält:

- `Claude-Codex-MCP Setup.app`
- `START_HIER.md`
- `START_HIER.html`
- einen Snapshot des Repository-Stands ohne `.git` innerhalb der App-Ressourcen

`Claude-Codex-MCP Setup.app` kopiert den Snapshot nach:

```text
~/Claude-Codex-MCP-CLI
```

Falls dieser Ordner bereits existiert, wird automatisch ein Zeitstempel an den
neuen Ordnernamen angehängt.

## Nutzung

Diese Schritte sind für einfache Nutzer gedacht:

1. Lade die DMG-Datei auf deinen Mac.
2. Öffne die DMG mit einem Doppelklick.
3. Lies kurz `START_HIER.html`.
4. Öffne `Claude-Codex-MCP Setup.app` mit einem Doppelklick.
5. Bestätige den Willkommenshinweis.
6. Gib einen einfachen Projektnamen ein, zum Beispiel `Mein Agenten-Projekt`.
7. Wähle den Projektordner aus. In diesem Ordner entsteht später
   `agent_comms.md`.
8. Warte, bis die App fertig ist. Das kann kurz dauern.
9. Danach öffnet sich automatisch `ANLEITUNG.html`.
10. Folge dort den Schritten für ChatGPT Codex, Claude Code oder Claude Cowork.

Die HTML-Dateien enthalten rechts eine Sidebar. Dort werden die Schritte und
wichtige Begriffe wie MCP, Projektordner, `agent_comms.md`, `/comm` und
Safety-Check erklärt.

## Wenn Etwas Schiefgeht

Die App legt bei Fehlern diese Logdatei an und öffnet sie automatisch:

```text
~/Claude-Codex-MCP-Setup.log
```

Diese Datei soll nur zur Fehlersuche genutzt werden. Vor dem Weitergeben bitte
prüfen, dass keine privaten Daten enthalten sind.

## Was Nutzer Nicht Tun Müssen

- keine JSON-Dateien von Hand schreiben
- keine MCP-Pfade selbst ausdenken
- keine Programmierung verstehen
- keine Secrets oder Zugangsdaten eintragen

## Sicherheit

Das DMG darf keine Secrets, Tokens, `.env`-Dateien, lokalen Agenten-Logs oder
personenbezogenen Daten enthalten.

Das Build-Skript verwendet `git archive HEAD`. Dadurch werden ignorierte
Laufzeitdateien wie `.git`, `node_modules`, lokale Comms-Ordner und
Testreports nicht in das DMG übernommen.

## Öffentliche Nutzung

Für eine breitere öffentliche Nutzung braucht es mindestens:

- signierte und notarisierte macOS-Builds
- klare Release-Prüfung
- erneute Sicherheitsprüfung des Paketinhalts
