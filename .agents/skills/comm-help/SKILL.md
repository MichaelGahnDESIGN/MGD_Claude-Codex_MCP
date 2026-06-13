---
name: comm-help
description: Use when the user invokes /comm-help or wants a simple explanation of Claude-Codex-MCP.
---

# /comm-help

`/comm-help` erklärt Claude-Codex-MCP allgemein und leicht verständlich.

## Kernerklärung

Claude-Codex-MCP ist ein lokaler Aufgaben- und Übergabekanal für KI-Agenten.
Menschen lesen `agent_comms.md`; Agenten nutzen MCP-Tools und strukturierte
Befehle. Alles bleibt lokal-first und soll keine sensiblen Daten speichern.

## Erkläre Immer Kurz

- Was MCP hier bedeutet.
- Was `agent_comms.md` ist.
- Warum `agent_comms.state.json` nicht von Hand bearbeitet wird.
- Welche Befehle wichtig sind: `/comm`, `/comm-info`, `/comm-clear`,
  `/comm-clear-backup`.
- Dass Secrets, Tokens, `.env`-Inhalte und personenbezogene Details nicht in
  den Kommunikationskanal gehören.
