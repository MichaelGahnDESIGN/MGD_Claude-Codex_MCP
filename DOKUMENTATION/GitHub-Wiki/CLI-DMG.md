# CLI-DMG

## Zweck

Das CLI-DMG ist ein lokales macOS-Testpaket für Menschen, die nicht direkt mit
dem Repository arbeiten möchten.

Es ist aktuell keine signierte Desktop-App. Es enthält eine einfache
Startdatei, die das Projekt lokal in einen beschreibbaren Benutzerordner
kopiert und danach den Setup-Assistenten startet.

## Aktueller Stand

- Das DMG wird nur lokal gebaut.
- Es wird im Repository nicht versioniert.
- Es wird aktuell nicht als öffentlicher GitHub-Download angeboten.
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

- `Claude-Codex-MCP-CLI_v0.2.1.dmg`
- `Claude-Codex-MCP-CLI_v0.2.1.dmg.sha256`

## Inhalt Des DMG

Das DMG enthält:

- `START_HIER.md`
- `Setup starten.command`
- `MCP prüfen.command`
- einen Snapshot des Repository-Stands ohne `.git`

`Setup starten.command` kopiert den Snapshot nach:

```text
~/Claude-Codex-MCP-CLI
```

Falls dieser Ordner bereits existiert, wird automatisch ein Zeitstempel an den
neuen Ordnernamen angehängt.

## Nutzung

1. DMG öffnen.
2. `START_HIER.md` lesen.
3. `Setup starten.command` ausführen.
4. Den Anweisungen des Setup-Assistenten folgen.
5. Danach die erzeugte `ANLEITUNG.md` für Codex, Claude Code oder Claude Cowork
   verwenden.

## Sicherheit

Das DMG darf keine Secrets, Tokens, `.env`-Dateien, lokalen Agenten-Logs oder
personenbezogenen Daten enthalten.

Das Build-Skript verwendet `git archive HEAD`. Dadurch werden ignorierte
Laufzeitdateien wie `.git`, `node_modules`, lokale Comms-Ordner und
Testreports nicht in das DMG übernommen.

## Öffentliche Nutzung

Für eine spätere öffentliche Veröffentlichung braucht es mindestens:

- signierte und notarisierte macOS-Builds
- klare Release-Prüfung
- dokumentierten Download-Ort
- erneute Sicherheitsprüfung des Paketinhalts
