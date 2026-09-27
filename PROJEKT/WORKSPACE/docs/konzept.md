# Konzept

## Ziel

Claude-Codex-MCP ist ein lokales Kommunikationssystem für mehrere KI-Agenten.
Es soll die bewährte Idee einer gemeinsamen, menschenlesbaren Agenten-Kommunikationsdatei
in ein wiederverwendbares Werkzeug überführen.

Phase 1 konzentriert sich auf:

- lokale Dateien statt Cloud
- menschenlesbares Markdown
- maschinenlesbaren JSON-State
- Aufgaben-Queue mit Statuswechseln
- Chat, Blocker, Entscheidungen und Übergaben
- strukturierte Review-Anfragen, Feedback und nachvollziehbare Antworten
- Safety-Check vor Schreibvorgängen
- serialisierte Schreibzugriffe über mehrere lokale MCP-Prozesse

Phase 2 ergänzt den nutzerfreundlichen Einstieg:

- `comm setup` für das einfache Einrichten.
- `comm doctor` für verständliche Diagnose.
- `comm status` für eine kurze Projektübersicht.
- `comm start` als einfacher MCP-Startbefehl für Clients.

## Speicher

Der Server nutzt zwei Dateien:

- `agent_comms.md`: lesbares Protokoll für Menschen und Agenten.
- `agent_comms.state.json`: strukturierter Zustand für Tools.

Beide Dateien werden aus demselben State geschrieben. Dadurch bleibt Markdown
lesbar, während Tools zuverlässig mit strukturierten Daten arbeiten.

Schreibende Änderungen laufen über `FileStorage.update()`. Ein exklusiver
prozessübergreifender Lock schützt den Read-Modify-Write-Ablauf; temporäre
Dateien werden atomar an ihre Zielpfade verschoben. Ältere State-Dateien ohne
Review-Daten werden beim Laden mit leeren Review-Listen und Zählern ergänzt.
Der JSON-State bleibt die maßgebliche Quelle, Markdown wird daraus erzeugt.

## Review-Ablauf

Ein Agent erstellt mit `create_review` eine Anfrage mit Empfänger, Frage,
Prüfkriterien und Datei-, Task- oder Commit-Bezug. Der zugewiesene Reviewer
liest sie über `list_reviews` oder `read_context` und reicht mit
`submit_review_feedback` eine Bewertung sowie konkrete Befunde ein. Nur der
Anfragesteller kann dieses Feedback mit `respond_to_review` annehmen, teilweise
annehmen oder begründet ablehnen. Die gesamte Review-Historie bleibt im State
und im Markdown erhalten.

Dieser Ablauf vermittelt Arbeit zwischen bereits laufenden Agenten. Er startet
keine Modellaufrufe und weckt keinen anderen Client automatisch.

Die Reviewer- und Autor-Prüfung vergleicht die vom Client mitgesendeten Namen
mit der Anfrage. Das ist eine Zuordnungs- und Bedienungssicherung, keine
Authentifizierung: Ein MCP-Client kann im aktuellen stdio-Protokoll einen
anderen Namen angeben. Die Prüfung ersetzt daher keine verifizierte Identität
oder Zugriffskontrolle.

## Architektur

- `src/domain/`: reine Status- und Datenlogik.
- `src/storage/`: Laden und Speichern von JSON und Markdown.
- `src/markdown/`: Rendern des lesbaren Protokolls.
- `src/safety/`: Prüfung riskanter Inhalte.
- `src/tools/`: MCP-Tool-Handler.
- `src/mcp/`: lokaler JSON-RPC-Server über stdio.
- `src/cli/`: einfache Befehle für Setup, Diagnose, Status und Start.

## Grenzen des aktuellen Stands

- Kein Publishing.
- Noch kein NPM-Registry-Release.
- Keine Cloud.
- Kein SQLite-Backend.
- Keine automatische Skill-Generierung.
- Keine echte DLP- oder Rechtsprüfung.

Diese Punkte sind bewusst für spätere Phasen offen.
