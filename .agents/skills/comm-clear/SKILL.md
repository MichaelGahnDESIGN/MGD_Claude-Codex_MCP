---
name: comm-clear
description: Use when the user invokes /comm-clear or wants to reset Claude-Codex-MCP communication files safely.
---

# /comm-clear

`/comm-clear` setzt `agent_comms.md` und `agent_comms.state.json` auf den
Anfangszustand zurück. Vorher muss ein Backup angelegt werden.

## Ablauf

1. Projektordner klären.
2. Lokalen Befehl ausführen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear --project-dir /pfad/zum/projekt
```

3. Ergebnis nennen: Backup-Ordner, zurückgesetzte Dateien, nächster Schritt.

## Sicherheitsregel

Keine Inhalte aus alten Kommunikationsdateien in die Antwort kopieren. Nur den
Backup-Pfad und den Status nennen.
