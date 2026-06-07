# Codex MCP Hinzufügen

Diese Variante registriert Claude-Codex-MCP als lokalen stdio-MCP-Server in
Codex.

Passe `AGENT_COMMS_DIR` an den Projektordner an, in dem `agent_comms.md` und
`agent_comms.state.json` liegen sollen.

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
