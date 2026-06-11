# Konzept

## Ziel

Claude-Codex-MCP ist ein lokales Kommunikationssystem für mehrere KI-Agenten.
Es soll die bewährte Idee einer gemeinsamen, menschenlesbaren Agenten-Kommunikationsdatei
in ein wiederverwendbares Werkzeug überführen.

Phase 1 konzentriert sich auf:

- lokale Dateien statt Cloud
- menschenlesbares Markdown
- maschinenlesbaren JSON-State
- Aufgaben-Queue mit Statuswechseln
- Chat, Blocker, Entscheidungen und Übergaben
- Safety-Check vor Schreibvorgängen

Phase 2 ergänzt den nutzerfreundlichen Einstieg:

- `comm setup` für das einfache Einrichten.
- `comm doctor` für verständliche Diagnose.
- `comm status` für eine kurze Projektübersicht.
- `comm start` als einfacher MCP-Startbefehl für Clients.

## Speicher

Der Server nutzt zwei Dateien:

- `agent_comms.md`: lesbares Protokoll für Menschen und Agenten.
- `agent_comms.state.json`: strukturierter Zustand für Tools.

Beide Dateien werden aus demselben State geschrieben. Dadurch bleibt Markdown
lesbar, während Tools zuverlässig mit strukturierten Daten arbeiten.

## Architektur

- `src/domain/`: reine Status- und Datenlogik.
- `src/storage/`: Laden und Speichern von JSON und Markdown.
- `src/markdown/`: Rendern des lesbaren Protokolls.
- `src/safety/`: Prüfung riskanter Inhalte.
- `src/tools/`: MCP-Tool-Handler.
- `src/mcp/`: lokaler JSON-RPC-Server über stdio.
- `src/cli/`: einfache Befehle für Setup, Diagnose, Status und Start.

## Grenzen des aktuellen Stands

- Kein Publishing.
- Noch kein NPM-Registry-Release.
- Keine Cloud.
- Kein SQLite-Backend.
- Keine automatische Skill-Generierung.
- Keine echte DLP- oder Rechtsprüfung.

Diese Punkte sind bewusst für spätere Phasen offen.
