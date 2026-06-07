# Claude-Codex-MCP

**Version:** `0.2.1`

Ein lokales MCP-System, mit dem mehrere KI-Agenten wie ChatGPT Codex, Claude
Code, Claude Cowork und weitere Werkzeuge über ein gemeinsames Aufgaben-,
Chat- und Übergabeprotokoll zusammenarbeiten können.

Das Projekt ist aus einer praktischen Agenten-Arbeitsweise entstanden: Eine
gemeinsame Markdown-Datei hat sich als einfacher Kommunikationskanal zwischen
Claude und Codex bewährt. `Claude-Codex-MCP` macht daraus ein
wiederverwendbares, strukturiertes und trotzdem menschenlesbares Werkzeug.

## Kurzfassung

`Claude-Codex-MCP` ist ein lokaler MCP-Server für Agenten-Zusammenarbeit.

Er verwaltet:

- Chat-Nachrichten
- Aufgaben-Queue
- Aufgabenstatus
- Übergaben
- Done-Bereich
- Blocker und Rückfragen
- Entscheidungen
- Log und History
- Sicherheitsprüfung gegen offensichtliche Secrets

Der wichtigste Grundsatz:

> Lokal-first. Menschenlesbar. Keine Cloud-Pflicht. Keine sensiblen Daten.

## Für Wen Ist Das Projekt Gedacht?

Dieses Projekt ist sinnvoll für:

- Entwicklerinnen und Entwickler, die mit mehreren KI-Agenten arbeiten.
- Teams, die Codex und Claude parallel oder nacheinander nutzen.
- Projekte, in denen KI-Agenten Aufgaben sauber übergeben sollen.
- lokale Entwicklungsumgebungen ohne Cloud-Zwang.
- Experimente mit MCP, Agenten-Kommunikation und KI-Projektsteuerung.
- Menschen, die weiterhin Markdown lesen möchten, aber strukturierte Tools
  brauchen.

## Problem

Wenn mehrere KI-Agenten am selben Projekt arbeiten, gehen Informationen leicht
verloren:

- Wer arbeitet gerade woran?
- Welche Aufgabe ist offen?
- Was wurde erledigt?
- Welche Rückfrage blockiert die Arbeit?
- Welche Entscheidung gilt dauerhaft?
- Welche Dateien wurden geändert?
- Welche Tests wurden ausgeführt?
- Was darf aus Sicherheitsgründen nicht gespeichert werden?

Eine einfache Markdown-Datei ist gut lesbar, aber nicht ideal für strukturierte
Tool-Aufrufe. Ein reines JSON-System ist strukturiert, aber für Menschen
unangenehm. Dieses Projekt verbindet beides.

## Lösung

Der MCP-Server schreibt zwei lokale Dateien:

- `agent_comms.md`
- `agent_comms.state.json`

`agent_comms.md` bleibt für Menschen und Agenten lesbar.  
`agent_comms.state.json` enthält den strukturierten Zustand für MCP-Tools.

Die Tools verändern den State kontrolliert. Danach wird Markdown neu gerendert.
Dadurch kann ein Agent strukturiert arbeiten, während Menschen weiterhin eine
normale Markdown-Datei lesen können.

## Aktueller Stand

Phase 1 ist umgesetzt.

Enthalten sind:

- lokaler MCP-Server über stdio
- dateibasierter Speicher
- menschenlesbare Markdown-Ausgabe
- strukturierter JSON-State
- 12 MCP-Tools
- Safety-Check vor Schreibvorgängen
- Tests für Safety, Task-Statuswechsel, Markdown und Storage
- Smoke-Test für Tool-Registrierung
- deutschsprachige Dokumentation

Noch nicht enthalten:

- NPM-Release
- offizielles MCP-SDK
- SQLite-Backend
- Cloud- oder Remote-Betrieb
- automatische Skill-Generierung
- vollständiger Import alter `AI_COMMS.md`-Dateien

## MCP-Tools

Phase 1 registriert diese Tools:

| Tool | Zweck |
| --- | --- |
| `read_context` | Liest Projektkontext, aktive Tasks, letzte Logs und offene Blocker. |
| `list_tasks` | Gibt Aufgaben aus der Queue mit Status, Ziel-Agent und Priorität zurück. |
| `create_task` | Erstellt eine neue Aufgabe mit Kontext und Akzeptanzkriterien. |
| `claim_task` | Setzt eine Aufgabe auf `IN_PROGRESS`. |
| `complete_task` | Verschiebt eine Aufgabe nach `DONE`. |
| `append_chat` | Fügt eine Chat-, Hinweis- oder Frage-Nachricht hinzu. |
| `add_blocker` | Dokumentiert eine Blockade oder Rückfrage. |
| `resolve_blocker` | Markiert eine Blockade als gelöst. |
| `add_decision` | Dokumentiert eine dauerhafte Entscheidung. |
| `write_handoff` | Schreibt eine klare Übergabe. |
| `validate_safety` | Prüft Inhalte auf riskante Muster. |
| `reset_round` | Setzt Queue und Done-Bereich nach einer Runde zurück. |

Ausführliche Tool-Dokumentation:

```text
PROJEKT/WORKSPACE/docs/mcp_tools.md
```

## Statuswerte

Aufgaben können diese Statuswerte haben:

- `PENDING`
- `IN_PROGRESS`
- `DONE`
- `BLOCKED`
- `CANCELED`

## Task-Typen

Unterstützte Typen:

- `CODE`
- `REVIEW`
- `PIXEL_ART`
- `IMAGE_GENERATION`
- `UI_CONCEPT`
- `DOCS`
- `BRAINSTORM`
- `DEPLOY`
- `QA`
- `SECURITY`

## Sicherheit

Datenschutz und Sicherheit sind zentrale Projektziele.

Das System soll keine sensiblen Daten speichern, loggen oder weitergeben.
Schreibende Tools prüfen Eingaben vor dem Speichern.

Blockiert werden unter anderem offensichtliche Hinweise auf:

- `.env`-Dateien
- API-Keys
- Tokens
- Passwörter
- private Schlüssel
- Datenbank-URLs
- SSH-Schlüssel
- Datenbank-Dumps oder Backup-Dateien

Wichtig:

Der Safety-Check ist ein Schutz gegen offensichtliche Fehler. Er ersetzt keine
vollständige Datenschutzprüfung, kein Secret-Scanning und keine Rechtsberatung.
Agenten und Menschen sollen sensible Daten weiterhin konsequent vermeiden.

Mehr dazu:

```text
PROJEKT/WORKSPACE/docs/sicherheitsregeln.md
```

## Leichter Start Für Nicht-Programmierer

Der MCP-Server selbst nutzt keine externen Laufzeitabhängigkeiten. Für Tests
und Playwright-Audits werden die Dev-Abhängigkeiten aus dem Workspace-Lockfile
installiert.

Voraussetzung:

- Node.js ab `22.6.0`

Repository klonen:

```bash
git clone https://github.com/MichaelGahnDESIGN/Claude-Codex-MCP.git
cd Claude-Codex-MCP
```

Dev-Abhängigkeiten installieren:

```bash
npm --prefix PROJEKT/WORKSPACE install
```

Setup-Assistent starten:

```bash
npm --prefix PROJEKT/WORKSPACE run setup
```

Der Assistent fragt nach dem Projektordner und erzeugt:

- `agent_comms.md`
- `agent_comms.state.json`
- eine einfache `ANLEITUNG.md`
- einen fertigen Codex-Einrichtungsbefehl
- eine Claude-Code-Anleitung
- eine Claude-Cowork-/Claude-Desktop-Konfiguration

Ohne Rückfragen, mit Standardwerten:

```bash
npm --prefix PROJEKT/WORKSPACE run setup -- --yes
```

## Lokale macOS-DMG Für Tests

Für lokale Tests kann aus dem aktuellen Git-Stand ein macOS-DMG gebaut werden.
Dieses DMG ist ein CLI-Testpaket, keine signierte Desktop-App.

```bash
npm --prefix PROJEKT/WORKSPACE run build:cli-dmg
```

Das Ergebnis liegt lokal hier:

```text
PROJEKT/WORKSPACE/CLI-DMG/
```

Der Ordner wird von Git ignoriert. Die DMG wird aktuell nicht auf GitHub
veröffentlicht. Sie ist für interne Tests gedacht und kann auf macOS
Sicherheitswarnungen zeigen, weil sie nicht signiert oder notarisiert ist.

Prüfung ausführen:

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Server starten:

```bash
cd PROJEKT/WORKSPACE
npm start
```

Der Server nutzt dann den aktuellen Ordner als Speicherort.

## Speicherort Festlegen

Für ein konkretes Projekt kann der Speicherort gesetzt werden:

```bash
AGENT_COMMS_DIR=/pfad/zum/projekt npm --prefix PROJEKT/WORKSPACE start
```

Dann entstehen im Zielprojekt:

```text
agent_comms.md
agent_comms.state.json
```

Diese Dateien enthalten die gemeinsame Agenten-Kommunikation.

## Beispiel: Wie Agenten Damit Arbeiten

Typischer Ablauf:

1. Codex ruft `read_context` auf.
2. Codex erstellt mit `create_task` eine Aufgabe für Claude.
3. Claude prüft mit `list_tasks` die Queue.
4. Claude übernimmt mit `claim_task`.
5. Claude dokumentiert Rückfragen mit `add_blocker`.
6. Claude schließt die Aufgabe mit `complete_task`.
7. Codex liest den neuen Stand mit `read_context`.
8. Beide Agenten können Entscheidungen mit `add_decision` festhalten.
9. Eine klare Übergabe entsteht mit `write_handoff`.

## Beispiel-Datei

Ein Beispiel für die menschenlesbare Markdown-Ausgabe liegt hier:

```text
PROJEKT/WORKSPACE/examples/agent_comms.md
```

## Projektstruktur

Der eigentliche MCP-Code liegt im Workspace:

```text
PROJEKT/WORKSPACE/
├── README.md
├── package.json
├── tsconfig.json
├── docs/
├── examples/
├── src/
│   ├── domain/
│   ├── markdown/
│   ├── mcp/
│   ├── safety/
│   ├── scripts/
│   ├── storage/
│   └── tools/
└── tests/
```

Wichtige Bereiche:

| Bereich | Zweck |
| --- | --- |
| `src/domain/` | Aufgaben, Statuswechsel, Chat, Blocker, Entscheidungen. |
| `src/storage/` | Dateibasiertes Laden und Speichern. |
| `src/markdown/` | Ausgabe in menschenlesbares Markdown. |
| `src/safety/` | Sicherheitsprüfung. |
| `src/tools/` | Tool-Handler und Eingabeprüfung. |
| `src/mcp/` | Lokaler JSON-RPC/MCP-Server über stdio. |
| `tests/` | Tests für Phase 1. |
| `docs/` | Deutsche Projektdokumentation. |
| `examples/` | Beispiel-Protokolle. |

## Lokaler MCP-Betrieb

Das System läuft in Phase 1 lokal.

Es läuft nicht automatisch über:

- GitHub
- all-inkl
- einen Cloud-Server
- einen zentralen Dienst

GitHub verteilt den Code. Der MCP-Prozess läuft bei der Person oder auf dem
System, das ihn startet.

Zielmodell:

```text
Codex / Claude / anderer MCP-Client
        ↓
lokaler MCP-Prozess
        ↓
agent_comms.md
agent_comms.state.json
        ↓
lokales Projekt
```

## Warum Nicht Direkt Cloud?

Weil Agenten-Kommunikation schnell sensible Informationen enthalten kann:

- Dateipfade
- interne Aufgaben
- Bugreports
- technische Entscheidungen
- Testnotizen
- potenziell vertrauliche Projektinformationen

Darum ist lokal-first der sichere Standard. Ein optionaler Remote-Betrieb kann
später entstehen, muss aber gesondert abgesichert und dokumentiert werden.

## Tests

Alle Phase-1-Tests:

```bash
npm --prefix PROJEKT/WORKSPACE test
```

Smoke-Test:

```bash
npm --prefix PROJEKT/WORKSPACE run smoke
```

Zwei-Agenten-Demo:

```bash
npm --prefix PROJEKT/WORKSPACE run demo:agents
```

Gesamtprüfung:

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Der aktuelle Stand wurde mit 12 Node-Tests, einem Smoke-Test und 3
Playwright-Audits geprüft. Zusätzlich gibt es einen Integrationstest und eine
Demo, die den Ablauf `Codex erstellt Aufgabe -> Claude übernimmt -> Claude
schließt ab` lokal nachvollziehen.

## Dokumentation

Wichtige Dokumente:

```text
PROJEKT/WORKSPACE/docs/konzept.md
PROJEKT/WORKSPACE/docs/mcp_tools.md
PROJEKT/WORKSPACE/docs/sicherheitsregeln.md
PROJEKT/WORKSPACE/docs/codex_integration.md
PROJEKT/WORKSPACE/docs/claude_integration.md
```

Zusätzlich enthält das Repository Vorlagen- und Projektdokumentation unter:

```text
DOKUMENTATION/
VORLAGE/
```

Diese Bereiche sind bewusst noch vorhanden, weil das Projekt aus einer
KI-Projektvorlage heraus entstanden ist und die Agenten-Regeln weiter nutzbar
bleiben.

## Roadmap

Geplante nächste Schritte:

- README und GitHub-Projekt weiter für öffentliche Nutzung schärfen.
- offiziellen MCP-SDK-Einsatz prüfen.
- NPM-Paket vorbereiten.
- einfache CLI für lokale Tool-Tests ergänzen.
- Import bestehender `AI_COMMS.md`-Dateien bauen.
- atomare Schreibvorgänge für Storage ergänzen.
- Eingabevalidierung weiter härten.
- optional SQLite-Backend vorbereiten.
- Skills/Prompts für Codex und Claude automatisch erzeugen.
- öffentliche Beispiele und kurze Video-/Screenshot-Anleitung ergänzen.

## Öffentliche Nutzung

Das Projekt soll später nicht nur lokal für eine Person nutzbar sein, sondern
als allgemein verfügbares Werkzeug.

Der geplante Veröffentlichungsweg:

1. GitHub als öffentlicher Quellcode- und Dokumentationsort.
2. Releases mit klaren Versionen.
3. Optional NPM-Paket für einfache Installation.
4. Weiterhin lokal-first als Standardbetrieb.

## Impressum

Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)

Michael Gahn DESIGN  
Michael Gahn  
Dr.-Theodor-Brugsch Str. 12  
08529 Plauen  
Sachsen  
Deutschland

Tel.: +49 (0) 176 557 647 48  
E-Mail: Anfrage@Michael-Gahn.de

Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:  
Steuernummer: 223/222/02451  
Ust-ID: DE288143343

## Lizenz

MIT-Lizenz. Siehe:

```text
LICENSE
```

## Mitmachen

Feedback, Issues und Verbesserungsvorschläge sind willkommen.

Besonders hilfreich sind:

- reale Integrationsberichte mit Codex und Claude
- Verbesserungsvorschläge für Tool-Namen
- Safety-Regeln für weitere riskante Muster
- Beispiele für Agenten-Übergaben
- Ideen für gute öffentliche Dokumentation

Bitte keine Secrets, Tokens, personenbezogenen Daten oder privaten Logs in
Issues, Pull Requests oder Beispielen veröffentlichen.
