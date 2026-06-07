# Claude-Codex-MCP Wiki

Willkommen im Wiki zu **Claude-Codex-MCP**.

Dieses Projekt baut ein lokales MCP-System, mit dem mehrere KI-Agenten wie
ChatGPT Codex, Claude Code, Claude Cowork und weitere MCP-Clients sauber über
ein gemeinsames Aufgaben-, Chat- und Übergabeprotokoll zusammenarbeiten können.

Der aktuelle Projektstand ist **Version `0.2.0`**.

## Wichtigster Grundsatz

Claude-Codex-MCP ist lokal-first:

- keine Cloud-Pflicht
- keine zentrale Datensammlung
- keine sensiblen Daten in Aufgaben, Chats, Logs oder Übergaben
- menschenlesbares Markdown bleibt erhalten
- strukturierte MCP-Tools ergänzen die Markdown-Kommunikation

## Was Das System Löst

Wenn mehrere KI-Agenten am selben Projekt arbeiten, gehen Informationen leicht
verloren. Das betrifft besonders Aufgabenstatus, Rückfragen, Blocker,
Entscheidungen, Testergebnisse und Übergaben.

Claude-Codex-MCP verwaltet dafür lokal:

- Chat-Nachrichten
- Aufgaben-Queue
- Statuswerte
- Done-Bereich
- Blocker und Rückfragen
- Entscheidungen
- Übergaben
- Log und History
- Safety-Check gegen offensichtliche Secrets

## Schnellnavigation

- [Schnellstart](Schnellstart)
- [Konzept und Architektur](Konzept-und-Architektur)
- [Installation und Betrieb](Installation-und-Betrieb)
- [MCP Tools](MCP-Tools)
- [Agenten Workflows](Agenten-Workflows)
- [Codex Integration](Codex-Integration)
- [Claude Integration](Claude-Integration)
- [Sicherheit und Datenschutz](Sicherheit-und-Datenschutz)
- [Tests und Qualität](Tests-und-Qualitaet)
- [Roadmap](Roadmap)
- [Freigabe zur Veröffentlichung](Freigabe-zur-Veroeffentlichung)
- [FAQ](FAQ)

## Aktueller Status

Phase 1 ist umgesetzt und lokal getestet.

Verfügbar sind:

- lokaler MCP-Server über stdio
- dateibasierter Speicher
- `agent_comms.md` als menschenlesbares Protokoll
- `agent_comms.state.json` als strukturierter Zustand
- 12 MCP-Tools
- Safety-Check vor Schreibvorgängen
- Tests für Safety, Statuswechsel, Markdown und Storage
- Smoke-Test für Tool-Registrierung

Noch offen sind:

- längere Praxistests mit echten Codex-/Claude-Clients
- offizielles MCP-SDK prüfen
- NPM-Paket vorbereiten
- Import bestehender `AI_COMMS.md`-Dateien
- öffentliche Freigabe erst nach Abschluss der Test- und Sicherheitsprüfung
