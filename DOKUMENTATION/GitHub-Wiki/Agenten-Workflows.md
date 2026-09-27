# Agenten Workflows

Diese Seite beschreibt typische Arbeitsabläufe für mehrere KI-Agenten.

## Grundprinzip

Ein Agent soll nicht nur Text in eine Datei schreiben, sondern strukturierte
MCP-Tools nutzen:

- Kontext lesen
- Aufgabe erstellen
- Aufgabe übernehmen
- Blocker dokumentieren
- Aufgabe abschließen
- Entscheidung festhalten
- Übergabe schreiben

Dadurch kann ein anderer Agent den Stand übernehmen, ohne den gesamten Chat
rekonstruieren zu müssen.

## Workflow: Codex Erstellt Aufgabe Für Claude

1. Codex ruft `read_context` auf.
2. Codex prüft offene Blocker.
3. Codex erstellt mit `create_task` eine konkrete Aufgabe.
4. Codex formuliert Akzeptanzkriterien.
5. Codex ergänzt eine Sicherheitsnotiz.
6. Claude ruft `list_tasks` auf.
7. Claude übernimmt mit `claim_task`.
8. Claude arbeitet lokal.
9. Claude schließt mit `complete_task` ab.

## Workflow: Claude Stellt Rückfrage

Wenn eine Aufgabe nicht sicher oder eindeutig lösbar ist:

1. Claude ruft `add_blocker` auf.
2. Der Blocker beschreibt die Frage neutral.
3. Keine sensiblen Details werden gespeichert.
4. Codex oder ein Mensch löst den Blocker mit `resolve_blocker`.
5. Danach kann die Aufgabe weitergehen.

## Workflow: Entscheidung Dokumentieren

Für dauerhafte Architektur- oder Prozessentscheidungen:

1. Agent ruft `add_decision` auf.
2. Titel knapp formulieren.
3. Begründung nachvollziehbar schreiben.
4. Optional Aufgabe verknüpfen.

Beispiel:

```text
Titel: Lokal-first bleibt Standard
Begründung: Agenten-Kommunikation kann sensible Projektinformationen enthalten.
```

## Workflow: Übergabe Schreiben

Am Ende einer Arbeitseinheit:

1. `write_handoff` aufrufen.
2. Zusammenfassung schreiben.
3. nächste Schritte als Liste ergänzen.
4. relevante Task-IDs verknüpfen.

Eine gute Übergabe beantwortet:

- Was wurde gemacht?
- Was ist noch offen?
- Welche Risiken gibt es?
- Was soll der nächste Agent zuerst lesen?

## Workflow: Review mit Feedback und Antwort

1. Der anfragende Agent erstellt mit `create_review` eine konkrete Prüffrage.
2. Er verknüpft die Anfrage nach Möglichkeit mit Task-ID, Commit und betroffenen
   Dateien und nennt prüfbare Kriterien.
3. Der zugewiesene Reviewer liest `list_reviews` oder `read_context` und prüft
   genau diesen Stand.
4. Der Reviewer sendet `submit_review_feedback` mit einer Bewertung und
   konkreten Befunden. Zulässige Bewertungen sind `APPROVE`,
   `CHANGES_REQUESTED` und `COMMENT`.
5. Der Anfragesteller dokumentiert mit `respond_to_review`, welche Punkte er
   angenommen, teilweise angenommen oder begründet abgelehnt hat.
6. Die Review-Historie bleibt im gemeinsamen State und in `agent_comms.md`.

Nur der zugewiesene Reviewer kann Feedback einreichen. Nur der Anfragesteller
kann auf das Feedback antworten und die Review abschließen. Der Ablauf startet
keinen Agenten automatisch; beide Clients müssen aktiv sein und den MCP
aufrufen. Die Namensprüfung verhindert versehentliche Fehlzuordnungen, ist
aber keine Authentifizierung: Der aktuelle MCP-Client kann den gemeldeten Namen
selbst setzen.

## Rollen

Typische Rollen:

- Codex: Implementierung, Tests, lokale Tool-Arbeit.
- Claude: Review, Konzept, Ergänzungen, zweite Perspektive.
- Mensch: Priorisierung, Freigabe, Sicherheitsentscheidung.

Die Rollen sind nicht fest. Wichtig ist, dass alle denselben lokalen Kontext
nutzen.

## Parallele lokale Nutzung

Schreibende MCP-Operationen serialisieren ihre State-Änderungen mit einem
prozessübergreifenden Lock. Dadurch werden konkurrierende Read-Modify-Write-
Zyklen lokaler MCP-Prozesse nacheinander ausgeführt. Der Lock ersetzt weder
Remote-Synchronisierung noch ein transaktionsfähiges Mehrbenutzer-Backend.
