export function renderCliHelp(): string {
  return [
    "Claude-Codex-MCP: einfacher comm-Befehl",
    "",
    "Nutzung:",
    "",
    "  comm setup",
    "  comm doctor --project-dir ./mein-projekt",
    "  comm status --project-dir ./mein-projekt",
    "  comm start --project-dir ./mein-projekt",
    "",
    "Befehle:",
    "",
    "  setup   Richtet agent_comms.md, agent_comms.state.json und Hilfe-Dateien ein.",
    "  doctor  Prüft verständlich, ob Node.js und die Agenten-Dateien vorhanden sind.",
    "  status  Zeigt offene Aufgaben, Blocker und letzte Aktivität.",
    "  start   Startet den lokalen MCP-Server über stdio für Codex oder Claude.",
    "  help    Zeigt diese Hilfe.",
    "",
    "Wichtig:",
    "",
    "  Der MCP läuft lokal. Schreibe keine Passwörter, Tokens, .env-Inhalte",
    "  oder personenbezogenen Details in Aufgaben, Chats oder Logs.",
    ""
  ].join("\n");
}
