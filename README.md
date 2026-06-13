# Claude-Codex-MCP

**Version:** `0.2.5`

Ein lokales MCP-System, mit dem mehrere KI-Agenten wie ChatGPT Codex, Claude
Code, Claude Cowork und weitere Werkzeuge über ein gemeinsames Aufgaben-,
Chat- und Übergabeprotokoll zusammenarbeiten können.

Kurz gesagt: `Claude-Codex-MCP` ist ein gemeinsames Aufgabenheft für
KI-Agenten. Codex, Claude und andere Agenten können darin Aufgaben lesen,
übernehmen, Rückfragen stellen, Entscheidungen festhalten und Ergebnisse
eintragen.

Das Projekt ist aus einer praktischen Agenten-Arbeitsweise entstanden: Eine
gemeinsame Markdown-Datei hat sich als einfacher Kommunikationskanal zwischen
Claude und Codex bewährt. `Claude-Codex-MCP` macht daraus ein
wiederverwendbares, strukturiertes und trotzdem menschenlesbares Werkzeug.

## Ich Will Es Nur Benutzen

Der einfachste Weg für normale Nutzerinnen und Nutzer ist die macOS-DMG aus
dem aktuellen GitHub-Release:

1. Öffne den aktuellen Release:
   [Claude-Codex-MCP 0.2.5](https://github.com/MichaelGahnDESIGN/Claude-Codex-MCP/releases/tag/v0.2.5)
2. Lade `Claude-Codex-MCP-CLI_v0.2.5.dmg` herunter.
3. Öffne die DMG-Datei.
4. Lies `START_HIER.html` oder `START_HIER.md`.
5. Starte `Claude-Codex-MCP Setup.app`.
6. Folge den drei Schritten im Setup.
7. Lies danach die automatisch geöffnete Anleitung.

Wichtig: Die App ist aktuell nicht signiert und nicht notarisiert. macOS kann
deshalb eine Sicherheitswarnung anzeigen. Der MCP läuft lokal auf deinem
Rechner und überträgt keine Projektdaten automatisch in eine Cloud.

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
- strukturierte Eingabevalidierung für Task-Typen, Prioritäten und Chat-Arten
- einfache `comm`-CLI mit `setup`, `doctor`, `status`, `start` und `help`
- Tests für Safety, Tool-Eingaben, Task-Statuswechsel, Markdown und Storage
- Smoke-Test für Tool-Registrierung
- deutschsprachige Dokumentation
- macOS-DMG mit Setup-App und HTML-Anleitung mit rechter Begriffserklärung

Noch nicht enthalten:

- Veröffentlichung im NPM-Registry
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

## Leichter Start Über Terminal

Wenn du nicht die DMG nutzen möchtest, kannst du das Projekt auch über Terminal
einrichten. Der MCP-Server selbst nutzt keine externen Laufzeitabhängigkeiten.
Für Tests und Playwright-Audits werden die Dev-Abhängigkeiten aus dem
Workspace-Lockfile installiert.

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

Setup-Assistent über den einfachen `comm`-Befehl starten:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup
```

Der Assistent fragt nach dem Projektordner und erzeugt:

- `agent_comms.md`
- `agent_comms.state.json`
- eine einfache `ANLEITUNG.html` mit rechter Sidebar
- eine Markdown-Variante als `ANLEITUNG.md`
- eine universelle `/comm`-Vorlage als `comm-befehl.md`
- einen fertigen Codex-Einrichtungsbefehl
- eine Claude-Code-Anleitung
- eine Claude-Cowork-/Claude-Desktop-Konfiguration

Der wichtigste Chat-Befehl für Menschen ist:

```text
/comm
```

`/comm` steht für den gemeinsamen Kommunikations- und Aufgabenbereich. Der
Begriff ist bewusst neutral, damit niemand überlegen muss, ob gerade Codex,
Claude Code oder ein anderer Agent gemeint ist.

Wichtig: `/comm` ist der Chat- beziehungsweise Skill-Befehl. Im macOS-Terminal
gibt es bereits einen Systembefehl namens `comm`. Wenn dort
`usage: comm [-123i] file1 file2` erscheint, wurde nicht Claude-Codex-MCP
gestartet. Nutze lokal deshalb immer den vollständigen Projektbefehl mit
`npm --silent --prefix PROJEKT/WORKSPACE run comm -- ...`.

Ohne Rückfragen, mit Standardwerten:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup --yes
```

Prüfen, ob ein Projektordner bereit ist:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt
```

Kurzen Status anzeigen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- status --project-dir /pfad/zum/projekt
```

Später, nach einem NPM-Release, soll daraus werden:

```bash
claude-codex-mcp setup
claude-codex-mcp doctor --project-dir /pfad/zum/projekt
claude-codex-mcp status --project-dir /pfad/zum/projekt
```

Der kurze Bin-Name `comm` bleibt technisch vorbereitet, ist wegen des
gleichnamigen macOS-Systembefehls aber nicht der empfohlene Terminal-Befehl.

## macOS-DMG

Der aktuelle GitHub-Release enthält eine macOS-DMG mit
`Claude-Codex-MCP Setup.app`, also ein echtes macOS-Programm für den lokalen
Setup-Start. Zusätzlich enthält die DMG eine HTML-Startanleitung mit rechter
Sidebar, die jeden Schritt und wichtige Begriffe erklärt.

Release:

```text
https://github.com/MichaelGahnDESIGN/Claude-Codex-MCP/releases/tag/v0.2.5
```

Lokal kann die DMG aus dem aktuellen Git-Stand neu gebaut werden:

```bash
npm --prefix PROJEKT/WORKSPACE run build:cli-dmg
```

Das Ergebnis liegt lokal hier:

```text
PROJEKT/WORKSPACE/CLI-DMG/
```

Der lokale Build-Ordner wird von Git ignoriert. Die veröffentlichte DMG kann
auf macOS Sicherheitswarnungen zeigen, weil sie noch nicht signiert oder
notarisiert ist.

Prüfung ausführen:

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Server starten:

```bash
cd PROJEKT/WORKSPACE
npm --silent run comm -- start
```

Der Server nutzt dann den aktuellen Ordner als Speicherort.

## Speicherort Festlegen

Für ein konkretes Projekt kann der Speicherort gesetzt werden:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- start --project-dir /pfad/zum/projekt
```

Dann entstehen im Zielprojekt:

```text
agent_comms.md
agent_comms.state.json
```

Diese Dateien enthalten die gemeinsame Agenten-Kommunikation.

## Beispiel: Wie Agenten Damit Arbeiten

Im Agenten-Chat reicht als Startsignal:

```text
/comm
```

Der Agent soll dann den MCP-Kontext lesen, offene Aufgaben prüfen, Rückfragen
als Blocker dokumentieren und Ergebnisse sauber abschließen.

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

Der aktuelle Stand wurde mit 23 Node-Tests, einem Smoke-Test und 3
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

## Verwandtes Projekt

Als passende Projektstruktur für KI-gestützte Arbeit gibt es zusätzlich den
öffentlichen Basis-Projektordner:

[MichaelGahnDESIGN/AI-Basic-Projektordner](https://github.com/MichaelGahnDESIGN/AI-Basic-Projektordner)

Der Basis-Projektordner stellt eine aufgeräumte Ordner-, Regel- und
Dokumentationsstruktur bereit. `Claude-Codex-MCP` ergänzt diese Struktur um den
lokalen Kommunikationskanal, über den Codex, Claude und weitere Agenten Aufgaben,
Rückfragen, Entscheidungen und Übergaben nachvollziehbar teilen können.

## Roadmap

Geplante nächste Schritte:

- README und GitHub-Projekt weiter für öffentliche Nutzung schärfen.
- offiziellen MCP-SDK-Einsatz prüfen.
- NPM-Paket vorbereiten.
- NPM-Veröffentlichung vorbereiten, sobald Name und Paketumfang final sind.
- Import bestehender `AI_COMMS.md`-Dateien bauen.
- atomare Schreibvorgänge für Storage ergänzen.
- Eingabevalidierung weiter härten.
- optional SQLite-Backend vorbereiten.
- Skills/Prompts für Codex und Claude automatisch erzeugen.
- öffentliche Beispiele und kurze Video-/Screenshot-Anleitung ergänzen.

## Öffentliche Nutzung

Das Projekt ist für eine öffentliche Nutzung vorbereitet und bleibt trotzdem
lokal-first. Nutzer können den Code prüfen, lokal ausführen und das Werkzeug in
eigene Projektordner integrieren.

Der Veröffentlichungsweg:

1. GitHub als öffentlicher Quellcode- und Dokumentationsort.
2. Releases mit klaren Versionen.
3. Optional NPM-Paket für einfache Installation.
4. Weiterhin lokal-first als Standardbetrieb.

## Impressum

Die vollständigen Anbieterangaben stehen zusätzlich in:

```text
Impressum.md
```

Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)

Michael Gahn DESIGN<br>
Michael Gahn<br>
Dr.-Theodor-Brugsch Str. 12<br>
08529 Plauen<br>
Sachsen<br>
Deutschland

Tel.: +49 (0) 176 557 647 48<br>
E-Mail: Anfrage@Michael-Gahn.de

Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>
Steuernummer: 223/222/02451<br>
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
