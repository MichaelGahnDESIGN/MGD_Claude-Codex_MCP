# Claude-Codex-MCP

Dieses Projekt ist Phase 1 eines lokalen MCP-Systems für die Zusammenarbeit von
KI-Agenten wie Codex und Claude. Es verwaltet Aufgaben, Chat-Nachrichten,
Übergaben, Blocker, Entscheidungen und eine kleine History in gut lesbaren
Dateien.

Der Arbeitstitel ist noch vorläufig. Das System bleibt lokal-first: keine
Cloud-Pflicht, keine externen Dienste und keine Speicherung sensibler Daten.

## Start

Voraussetzung ist Node.js mit TypeScript-Type-Stripping, empfohlen ab Node
`22.6.0`.

Wenn du im Repository-Root bist:

```bash
npm --prefix PROJEKT/WORKSPACE install
npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup
```

Wenn du bereits direkt in `PROJEKT/WORKSPACE` bist:

```bash
npm install
npm run comm -- setup
```

Der Assistent erstellt den Kommunikationsordner und fertige Hilfe-Dateien für
Codex, Claude Code und Claude Cowork.

Zusätzlich erzeugt er `comm-befehl.md`. Diese Datei beschreibt den
universellen Chat-Befehl:

```text
/comm
```

`/comm` steht für den gemeinsamen Kommunikations- und Aufgabenbereich aller
Agenten.

Gesamtprüfung aus dem Repository-Root:

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Gesamtprüfung direkt im Workspace:

```bash
npm run check
```

Server lokal starten:

```bash
cd PROJEKT/WORKSPACE
npm run comm -- start
```

Optional kann der Speicherort gesetzt werden:

```bash
npm run comm -- start --project-dir /pfad/zum/projekt
```

Dann nutzt der Server dort `agent_comms.md` und
`agent_comms.state.json`.

## MCP-Tools

Phase 1 registriert diese Tools:

- `read_context`
- `list_tasks`
- `create_task`
- `claim_task`
- `complete_task`
- `append_chat`
- `add_blocker`
- `resolve_blocker`
- `add_decision`
- `write_handoff`
- `validate_safety`
- `reset_round`

Details stehen in [docs/mcp_tools.md](docs/mcp_tools.md).

## Sicherheitsgrundsatz

Alle Schreib-Tools prüfen Eingaben mit `validate_safety`, bevor sie in Dateien
geschrieben werden. Offensichtliche Secrets, `.env`-Hinweise, private Schlüssel,
Passwort-/Token-Zuweisungen, Datenbank-URLs, SSH-Material und Dump-Hinweise
werden blockiert.

Die Prüfung ist bewusst konservativ, ersetzt aber keine vollständige
Datenschutz- oder Sicherheitsprüfung. Menschen und Agenten sollen weiterhin
keine sensiblen Inhalte in Aufgaben, Chat, Logs oder Dokumentation schreiben.

## Struktur

```text
src/
├── domain/      # Statuswechsel, Tasks, Chat, Blocker, Entscheidungen
├── cli/         # einfache Befehle für Setup, Diagnose, Status und Start
├── markdown/    # menschenlesbare Markdown-Ausgabe
├── mcp/         # kleiner JSON-RPC/MCP-Server über stdio
├── safety/      # lokale Sicherheitsprüfung
├── scripts/     # Smoke-Test
├── storage/     # dateibasierter Speicher
└── tools/       # MCP-Tool-Handler und Eingabeprüfung
```

## Tests

```bash
cd PROJEKT/WORKSPACE
npm test
npm run smoke
npm run playwright:audit
npm run demo:agents
```

`npm run check` führt Node-Tests, Smoke-Test und Playwright-Audit zusammen aus.

## Zwei-Agenten-Demo

Mit dieser Demo wird der Ablauf lokal simuliert:

```bash
npm run demo:agents
```

Dabei passiert:

1. Codex erstellt eine Aufgabe.
2. Claude übernimmt dieselbe Aufgabe.
3. Claude schließt sie ab.
4. `agent_comms.md` enthält den kompletten Ablauf.

Die Demo schreibt standardmäßig nach:

```text
PROJEKT/WORKSPACE/local-agent-comms/demo/
```

Der Ordner wird von Git ignoriert.

## Integration

- Codex: [docs/codex_integration.md](docs/codex_integration.md)
- Claude: [docs/claude_integration.md](docs/claude_integration.md)
- Konzept: [docs/konzept.md](docs/konzept.md)
- Sicherheit: [docs/sicherheitsregeln.md](docs/sicherheitsregeln.md)
