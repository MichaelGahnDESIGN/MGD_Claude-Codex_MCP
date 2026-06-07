# Claude Integration

## Ziel

Claude soll mit Codex über denselben lokalen Kommunikationskanal arbeiten
können. Das MCP macht Aufgaben und Übergaben strukturiert, während Markdown
weiter lesbar bleibt.

## Empfohlener Ablauf Für Claude

1. `read_context` lesen.
2. `list_tasks` prüfen.
3. passende Aufgabe mit `claim_task` übernehmen.
4. bei Rückfragen `add_blocker` nutzen.
5. bei Entscheidungen `add_decision` nutzen.
6. Aufgabe mit `complete_task` abschließen.
7. Übergabe mit `write_handoff` schreiben.

## Beispiel-Prompt Für Claude

```text
Nutze Claude-Codex-MCP.

1. Lies list_tasks.
2. Übernimm die passendste offene Aufgabe.
3. Arbeite nur mit den nötigen Informationen.
4. Wenn sensible Daten nötig wären, setze einen neutralen Blocker.
5. Schließe die Aufgabe mit Ergebnis, Dateien und Tests ab.
```

## Gute Ergebnisnotiz

Eine gute Ergebnisnotiz enthält:

- was erledigt wurde
- welche Dateien betroffen waren
- welche Tests liefen
- welche Risiken offen bleiben

Sie enthält keine sensiblen Inhalte.

## Übergabe An Codex

Eine gute Übergabe beantwortet:

- Was soll Codex als Nächstes prüfen?
- Welche Aufgabe ist erledigt?
- Welche Aufgabe ist offen?
- Welche Entscheidung gilt?
- Gibt es Blocker?
