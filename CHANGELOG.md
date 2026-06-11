# Changelog

Alle wichtigen Änderungen dieser öffentlichen Vorlage werden hier dokumentiert.

## 0.2.2 - Eingabevalidierung und Protokollhärtung

Datum: 2026-06-11

- Ergänzung: `/comm` als neutraler universeller Agenten-Befehl vorbereitet.
  Der Setup-Assistent erzeugt `comm-befehl.md`; Claude Code erhält zusätzlich
  `.claude/commands/comm.md`.
- Versionsnummer des GitHub-Projekts auf `0.2.2` erhöht.
- Zentrale Listen für erlaubte Task-Statuswerte, Task-Typen, Prioritäten und
  Chat-Arten ergänzt.
- Tool-Eingaben werden jetzt gegen diese Listen validiert, statt beliebige
  Texte in den State zu übernehmen.
- MCP-Tool-Schemas nennen erlaubte Werte nun als `enum`, damit Clients bessere
  Hinweise anzeigen können.
- Tests für ungültige Task-Typen, Prioritäten und Chat-Arten ergänzt.

## 0.2.1 - Einfacher Setup-Assistent

Datum: 2026-06-07

- Versionsnummer des GitHub-Projekts auf `0.2.1` erhöht.
- `npm run setup` als lokaler Setup-Assistent für Nicht-Programmierer ergänzt.
- `npm run build:cli-dmg` als lokaler macOS-CLI-DMG-Build ergänzt.
- Assistent erzeugt Kommunikationsordner, `agent_comms.md`,
  `agent_comms.state.json`, einfache Anleitung, Codex-Skript und Claude-
  Konfigurationshilfen.
- Tests für den Setup-Assistenten ergänzt.
- Dokumentation und Wiki-Quellen auf den leichteren Start und das lokale
  CLI-DMG-Testpaket aktualisiert.
- Ergänzung: Das lokale macOS-Setup öffnet am Ende die deutsche Anleitung und
  den Hilfe-Ordner. Zusätzlich wurde ein eigenes `Impressum.md` im Root
  ergänzt und in der README verlinkt.

## 0.2.0 - GitHub-Projekt README und öffentlicher Projektstand

Datum: 2026-06-07

- Root-README auf das konkrete Projekt `Claude-Codex-MCP` umgestellt.
- Lokales MCP-Ziel, Tool-Liste, Sicherheitsmodell, Installation,
  Speicherlogik, Tests, Dokumentation und Roadmap ausführlich erklärt.
- Versionsnummer des GitHub-Projekts auf `0.2.0` gesetzt.
- Workspace-Paketversion und MCP-Server-Info auf `0.2.0` gesetzt.
- Öffentlichen Nutzungsweg über GitHub, spätere Releases und optional NPM
  beschrieben.
- Ausführliche interne Wiki-Dokumentation im Repository vorbereitet mit
  Schnellstart, Architektur, Installation, MCP-Tools, Agenten-Workflows,
  Sicherheit, Tests, Roadmap und Veröffentlichungsfreigabe.
- Zwei-Agenten-Integrationstest und lokale Demo ergänzt:
  Codex erstellt eine Aufgabe, Claude übernimmt und schließt sie ab.
- Codex-MCP-Registrierungsbeispiel und Claude-Konfigurationsbeispiele ergänzt.
- Vertrauliche Herkunftsreferenzen aus README und Dokumentation entfernt.
- Impressum in der Root-README ergänzt.
- Playwright-Audit für den stdio-MCP-Prozess ergänzt.
- Fehler behoben: fehlerhaftes JSON oder ungültige JSON-RPC-Requests beenden
  den MCP-Prozess nicht mehr, sondern erzeugen Protokollfehler.

## 1.0.1 - Öffentliche GitHub-Vorlage

Datum: 2026-06-07

- Öffentliche `README.md` für Menschen ergänzt.
- GitHub-Wiki-Inhalte mit Schnellstart, Ordnerstruktur, KI-Agenten,
  Prompt-Cheatsheet, Dokumentation, Backups, Releases, Sicherheit, OpenRouter
  und FAQ versioniert vorbereitet.
- `CLAUDE.md` als automatisch erkannter Claude-Code-Einstieg ergänzt.
- `SECURITY.md` als öffentliche Sicherheitsrichtlinie ergänzt.
- MIT-Lizenz ergänzt.
- GitHub-Workflow für Struktur-, Sicherheits- und Syntaxprüfungen ergänzt.
- GitHub-Release-Konfiguration und Issue-Vorlagen ergänzt.
- Dokumentationsgenerator so angepasst, dass keine lokalen absoluten Pfade in
  generierte Dokumentationsdaten geschrieben werden.
- Persönliche lokale Beispielpfade aus Vorlagentexten entfernt.
- Versionierung der Vorlage auf `1.0.1` gesetzt.

## 1.0.0 - Bereinigte Grundvorlage

Datum: 2026-06-07

- Saubere Grundstruktur für Claude Code, Claude Cowork und ChatGPT Codex
  erstellt.
- `AGENTS.md`, `claude.md` und `index.md` als zentrale Einstiege eingerichtet.
- `VORLAGE/`, `PROJEKT/WORKSPACE/`, `DOKUMENTATION/`, `DEMOS/` und `BACKUPS/`
  klar getrennt.
- OpenRouter-Demo separat gehalten.
- Lokale Artefakte wie echte `.env`-Dateien, `node_modules/`, Logs und
  temporäre Backups entfernt.
