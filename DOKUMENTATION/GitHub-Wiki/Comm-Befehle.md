# Comm-Befehle

Diese Seite erklärt die wichtigsten Befehle rund um Claude-Codex-MCP.

## Chat- Und Skill-Befehle

| Befehl | Erklärung |
| --- | --- |
| `/comm` | Öffnet den gemeinsamen Kommunikations- und Aufgabenbereich. |
| `/comm-help` | Erklärt allgemein, was Claude-Codex-MCP macht und worauf man achten muss. |
| `/comm-info` | Zeigt eine Liste aller wichtigen Befehle mit kurzer Erklärung. |
| `/comm-clear` | Setzt `agent_comms.md` und `agent_comms.state.json` nach einem Backup auf den Anfang zurück. |
| `/comm-clear-backup` | Löscht alte Backup-Ordner und behält nur das neueste Backup. |

## Lokale Terminal-Befehle

Solange das Paket nicht im NPM-Registry veröffentlicht ist, werden die Befehle
lokal aus dem Repository gestartet:

```bash
npm --silent --prefix PROJEKT/WORKSPACE run comm -- info
npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear --project-dir /pfad/zum/projekt
npm --silent --prefix PROJEKT/WORKSPACE run comm -- clear-backup --project-dir /pfad/zum/projekt
```

Wichtig: Im macOS-Terminal gibt es bereits einen Systembefehl `comm`. Deshalb
nicht nur `comm` eingeben, sondern den vollständigen lokalen Befehl nutzen.

## Was Passiert Bei `/comm-clear`?

1. Das System legt unter `agent_comms.backups/` einen neuen Backup-Ordner mit
   Zeitstempel an.
2. Falls vorhanden, werden `agent_comms.md` und `agent_comms.state.json` in
   diesen Backup-Ordner kopiert.
3. Danach werden beide Dateien neu aus einem frischen Anfangszustand erzeugt.
4. Der Projektname bleibt erhalten, wenn er im alten State lesbar war.

Das ist kein Import und keine Zusammenfassung. Alte Inhalte werden nicht in
Antworten ausgegeben.

## Was Passiert Bei `/comm-clear-backup`?

Der Befehl betrachtet `agent_comms.backups/` und löscht alle älteren Backup-
Ordner. Nur das neueste Backup bleibt erhalten.

Das ist nützlich, wenn viele Test-Backups entstanden sind und der Projektordner
aufgeräumt werden soll.
