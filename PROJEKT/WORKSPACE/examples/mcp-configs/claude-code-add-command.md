# Claude Code MCP Hinzufügen

Wenn Claude Code lokal installiert ist, kann der Server sinngemäß so
registriert werden.

Passe beide Pfade an:

- `AGENT_COMMS_DIR`: Zielprojekt für `agent_comms.md`.
- letzter Pfad: Startskript dieses MCP-Projekts.

```bash
claude mcp add claude-codex-mcp \
  --env AGENT_COMMS_DIR="/pfad/zum/projekt" \
  -- "/pfad/zu/Claude-Codex-MCP/PROJEKT/WORKSPACE/bin/start-agent-comms-mcp.sh"
```

Falls deine Claude-Version eine andere Syntax nutzt, verwende denselben
Startbefehl als stdio-MCP-Server:

```bash
/pfad/zu/Claude-Codex-MCP/PROJEKT/WORKSPACE/bin/start-agent-comms-mcp.sh
```
