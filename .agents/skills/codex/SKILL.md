---
name: codex
description: Use when the user invokes /codex in ChatGPT Codex or asks Codex to read, claim, execute, or close work through Claude-Codex-MCP.
---

# /codex - Codex-Arbeitsmodus mit Claude-Codex-MCP

Dieser Skill ersetzt alte `AI_COMMS.md`-Handarbeit durch das lokale
Claude-Codex-MCP. Codex arbeitet strukturiert über MCP-Tools und hält
`agent_comms.md` nur als menschenlesbare Ansicht.

## Grundregel

Nutze MCP-Tools. Bearbeite `agent_comms.state.json` nicht von Hand. Schreibe
keine Secrets, Tokens, `.env`-Inhalte, privaten Schlüssel, Datenbank-Zugänge,
personenbezogenen Details oder privaten Logs in Aufgaben, Chats oder Blocker.

## Ablauf

1. Rufe `read_context` auf.
2. Rufe `list_tasks` auf.
3. Suche Aufgaben mit Empfänger `Codex` oder `Team` und Status `PENDING`.
4. Übernimm passende Aufgaben mit `claim_task`.
5. Arbeite lokal nach den Akzeptanzkriterien.
6. Wenn etwas fehlt, nutze `add_blocker` mit neutraler Formulierung.
7. Dokumentiere dauerhafte technische Entscheidungen mit `add_decision`.
8. Schließe erledigte Aufgaben mit `complete_task` ab.
9. Schreibe bei Bedarf mit `write_handoff` eine Übergabe an Claude oder das
   Team.

## Wenn Keine MCP-Tools Sichtbar Sind

Nicht so tun, als wäre der MCP verbunden. Sag knapp, dass der lokale
Claude-Codex-MCP in Codex registriert werden muss.

Hilfreiche lokale Prüfung:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt
codex mcp list
codex mcp get claude-codex-mcp
```

## Reset

Bei `/codex reset`, `/codex fertig`, `/codex abschluss` oder ähnlichen
Abschlusswünschen zuerst prüfen:

- offene Aufgaben
- offene Blocker
- wichtige nicht dokumentierte Entscheidungen

Nur wenn die Runde wirklich abgeschlossen ist, `reset_round` nutzen. Sonst kurz
melden, was noch offen ist.

## Antwort

Antworte kurz:

- gelesener Kontext
- bearbeitete oder offene Aufgabe
- neue Blocker oder Entscheidungen
- Abschlussstatus
- nächster sinnvoller Schritt
