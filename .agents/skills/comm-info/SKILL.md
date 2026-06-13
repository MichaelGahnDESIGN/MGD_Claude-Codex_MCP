---
name: comm-info
description: Use when the user invokes /comm-info or asks for the available Claude-Codex-MCP commands.
---

# /comm-info

`/comm-info` zeigt die verfügbaren Claude-Codex-MCP-Befehle mit kurzen
Erklärungen.

## Ablauf

Wenn möglich, lokalen Info-Befehl ausführen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- info
```

Sonst knapp erklären:

- `/comm`: gemeinsamen Agenten-Kanal öffnen.
- `/comm-help`: Skill und Grundidee erklären.
- `/comm-info`: Befehlsliste anzeigen.
- `/comm-clear`: Kommunikationsdateien mit Backup zurücksetzen.
- `/comm-clear-backup`: alte Backups löschen, neuestes behalten.

Keine Secrets oder Inhalte aus `agent_comms.md` ausgeben.
