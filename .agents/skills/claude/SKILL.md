---
name: claude
description: Use when the user invokes /claude in ChatGPT Codex or asks Codex to hand work to Claude, inspect Claude tasks, or coordinate with Claude through Claude-Codex-MCP.
---

# /claude - Claude-Übergabemodus mit Claude-Codex-MCP

Dieser Skill nutzt Claude-Codex-MCP als gemeinsamen lokalen Kanal zwischen
Codex und Claude. Alte `AI_COMMS.md`-Abläufe werden nicht mehr manuell
bearbeitet.

## Grundregel

Nutze MCP-Tools. `agent_comms.md` bleibt die lesbare Ansicht, aber Änderungen
laufen über Tools. Keine Secrets, Tokens, `.env`-Inhalte, privaten Schlüssel,
Datenbank-Zugänge, personenbezogenen Details oder privaten Logs speichern.

## Claude Aufgaben Geben

Wenn Codex Arbeit an Claude übergeben soll:

1. `read_context` aufrufen.
2. Relevanten Projektstand knapp zusammenfassen.
3. Mit `create_task` eine Aufgabe an Claude erstellen.
4. Akzeptanzkriterien klar und prüfbar formulieren.
5. Eine Sicherheitsnotiz ergänzen.
6. Optional mit `write_handoff` eine kurze Übergabe an Claude schreiben.

## Claude Ergebnisse Prüfen

Wenn Claude bereits gearbeitet hat:

1. `read_context` aufrufen.
2. `list_tasks` prüfen.
3. Erledigte Aufgaben und offene Blocker zusammenfassen.
4. Bei offenen Rückfragen `add_blocker` oder `resolve_blocker` nutzen.
5. Bei dauerhaften Entscheidungen `add_decision` nutzen.

## Wenn Codex Aufgaben Von Claude Erledigen Soll

Falls Aufgaben an `Codex` oder `Team` offen sind:

1. Aufgabe mit `claim_task` übernehmen.
2. Arbeit lokal ausführen.
3. Mit `complete_task` abschließen.
4. Ergebnis, Dateien, Tests und offene Risiken dokumentieren.

## Wenn Keine MCP-Tools Sichtbar Sind

Nicht auf `AI_COMMS.md` ausweichen. Sag knapp, dass der MCP zuerst verbunden
werden muss.

Hilfreiche lokale Prüfung:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt
codex mcp list
codex mcp get claude-codex-mcp
```

## Antwort

Antworte kurz:

- was an Claude übergeben oder von Claude gelesen wurde
- welche Aufgabe betroffen ist
- welche Blocker oder Entscheidungen offen sind
- was Codex oder Claude als Nächstes tun soll
