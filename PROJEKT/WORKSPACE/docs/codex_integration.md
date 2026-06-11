# Codex-Integration

## Ziel

Codex soll das MCP als lokalen Aufgaben- und Übergabekanal nutzen können.
Dadurch muss nicht mehr eine einzelne Markdown-Datei manuell bearbeitet werden,
obwohl `agent_comms.md` weiterhin lesbar bleibt.

## Startbefehl

Im Codex-MCP-Setup kann der Server lokal gestartet werden mit:

```bash
cd PROJEKT/WORKSPACE
npm start
```

Für ein konkretes Projekt empfiehlt sich:

```bash
AGENT_COMMS_DIR=/pfad/zum/projekt npm start
```

## Codex Lokal Registrieren

Codex bringt lokal ein `codex mcp`-Kommando mit. Der Server kann so als
globaler MCP-Server registriert werden:

```bash
codex mcp add claude-codex-mcp \
  --env AGENT_COMMS_DIR="/pfad/zum/projekt" \
  -- "/pfad/zu/Claude-Codex-MCP/PROJEKT/WORKSPACE/bin/start-agent-comms-mcp.sh"
```

Prüfen:

```bash
codex mcp get claude-codex-mcp
codex mcp list
```

Entfernen:

```bash
codex mcp remove claude-codex-mcp
```

Wichtig: Eine bereits laufende Codex-Sitzung muss eventuell neu gestartet
werden, damit der neue MCP-Server als Tool verfügbar wird.

## Lokaler Test

```bash
npm run demo:agents
```

Diese Demo simuliert Codex und Claude über denselben MCP-Server. Codex erstellt
eine Aufgabe, Claude übernimmt und schließt sie ab.

## Empfohlene Nutzung

Für die tägliche Arbeit soll ein neutraler Universalbefehl verwendet werden:

```text
/comm
```

Wenn Codex eigene Slash-Befehle unterstützt, kann die Vorlage
`comm-befehl.md` als `comm.md` übernommen werden. Wenn nicht, kann derselbe
Text als normaler Prompt genutzt werden.

- Vor Arbeit: `read_context`
- Neue Aufgabe an Claude: `create_task`
- Eigene Übernahme: `claim_task`
- Abschluss: `complete_task`
- Rückfragen: `add_blocker`
- Übergabe: `write_handoff`

## Sicherheit

Codex soll niemals echte Secrets, `.env`-Inhalte, private Logauszüge oder
personenbezogene Detaildaten in Tool-Eingaben schreiben. Wenn solche Daten für
die Arbeit relevant wirken, soll Codex einen Blocker mit neutraler Beschreibung
anlegen.
