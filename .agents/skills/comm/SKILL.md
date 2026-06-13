---
name: comm
description: Use when the user invokes /comm or asks Codex to coordinate shared work through Claude-Codex-MCP.
---

# /comm - Gemeinsamer Agenten-Kanal

`/comm` ist der neutrale Einstieg in Claude-Codex-MCP. Der Skill gilt für
Codex, Claude und Team-Aufgaben, ohne dass zuerst entschieden werden muss,
welcher Agent gemeint ist.

## Grundregel

Nutze MCP-Tools. Bearbeite `agent_comms.state.json` nicht von Hand. Schreibe
keine Secrets, Tokens, `.env`-Inhalte, privaten Schlüssel, Datenbank-Zugänge,
personenbezogenen Details oder privaten Logs in Aufgaben, Chats oder Blocker.

## Ablauf

1. Rufe `read_context` auf.
2. Rufe `list_tasks` auf.
3. Fasse aktive Aufgaben, offene Blocker und letzte relevante Einträge kurz
   zusammen.
4. Wenn eine passende Aufgabe für `Codex` oder `Team` offen ist, übernimm sie
   mit `claim_task`.
5. Wenn Arbeit an Claude gehen soll, erstelle mit `create_task` eine klare
   Aufgabe an `Claude`.
6. Bei Rückfragen oder fehlenden lokalen Zugängen nutze `add_blocker`.
7. Dokumentiere dauerhafte Entscheidungen mit `add_decision`.
8. Schließe erledigte Aufgaben mit `complete_task` ab.
9. Schreibe Übergaben mit `write_handoff`.

## Wenn Keine MCP-Tools Sichtbar Sind

Nicht auf manuelle State-Bearbeitung ausweichen. Sag knapp, dass der lokale
Claude-Codex-MCP zuerst in Codex verbunden werden muss.

Hilfreiche Prüfung:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt
codex mcp list
codex mcp get claude-codex-mcp
```

## Wichtig Zum Terminal-Befehl

`/comm` ist ein Chat-/Skill-Befehl. Im macOS-Terminal gibt es bereits einen
Systembefehl `comm`. Für lokale Tests deshalb den vollständigen Projektbefehl
nutzen:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- help
```

## Weitere Comm-Befehle

- `/comm-help`: erklärt Claude-Codex-MCP allgemein.
- `/comm-info`: zeigt alle Befehle mit Erklärung.
- `/comm-clear`: setzt die Kommunikationsdateien nach Backup zurück.
- `/comm-clear-backup`: löscht alte Backups und behält nur das neueste.

## Antwort

Antworte kurz:

- gelesener Stand
- offene oder übernommene Aufgabe
- neue Blocker oder Entscheidungen
- nächster sinnvoller Schritt
