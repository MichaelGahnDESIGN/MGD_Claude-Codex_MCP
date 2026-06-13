export function renderCommInfo(): string {
  return [
    "# comm info",
    "",
    "Claude-Codex-MCP stellt einen lokalen, menschenlesbaren Arbeitskanal für KI-Agenten bereit.",
    "",
    "## Slash-Befehle im Agenten-Chat",
    "",
    "- `/comm`: gemeinsamen Kommunikations- und Aufgabenbereich öffnen.",
    "- `/comm-help`: den Skill und die Grundidee allgemein erklären.",
    "- `/comm-info`: alle wichtigen Befehle mit kurzer Erklärung anzeigen.",
    "- `/comm-clear`: Kommunikationsdateien nach Backup auf den Anfang zurücksetzen.",
    "- `/comm-clear-backup`: alte Backups löschen und nur das neueste Backup behalten.",
    "",
    "## Terminal-Befehle lokal aus dem Repository",
    "",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- setup`: Projektordner vorbereiten.",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- doctor --project-dir /pfad/zum/projekt`: Einrichtung prüfen.",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- status --project-dir /pfad/zum/projekt`: aktuellen Stand anzeigen.",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear --project-dir /pfad/zum/projekt`: Dateien mit Backup zurücksetzen.",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear-backup --project-dir /pfad/zum/projekt`: alte Backups aufräumen.",
    "- `npm --silent --prefix PROJEKT/WORKSPACE run comm -- start --project-dir /pfad/zum/projekt`: MCP-Server starten.",
    "",
    "Hinweis: `/comm` ist ein Chat-Befehl. Im macOS-Terminal gibt es bereits einen Systembefehl `comm`.",
    ""
  ].join("\n");
}
