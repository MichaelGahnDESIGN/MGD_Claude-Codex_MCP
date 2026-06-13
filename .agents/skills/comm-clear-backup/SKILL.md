---
name: comm-clear-backup
description: Use when the user invokes /comm-clear-backup or wants to delete old Claude-Codex-MCP backups.
---

# /comm-clear-backup

`/comm-clear-backup` räumt `agent_comms.backups/` auf. Es bleiben nur das
neueste Backup und die aktuellen Kommunikationsdateien erhalten.

## Ablauf

1. Projektordner klären.
2. Lokalen Befehl ausführen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear-backup --project-dir /pfad/zum/projekt
```

3. Kurz melden, wie viele alte Backups gelöscht wurden und welches Backup
   behalten wurde.

## Sicherheitsregel

Keine Backup-Inhalte ausgeben. Nur Anzahl, Pfad und Status nennen.
