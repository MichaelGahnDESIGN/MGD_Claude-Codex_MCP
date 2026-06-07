# MCP Tools

Diese Seite beschreibt die Tools von Phase 1.

Alle Tools geben JSON als Textinhalt zurück. Schreibende Tools führen vor dem
Speichern einen Safety-Check aus.

## read_context

Liest Projektkontext, aktive Aufgaben, offene Blocker, letzte Logs,
Entscheidungen und Übergaben.

Eingabe:

```json
{}
```

## list_tasks

Gibt die aktive Aufgaben-Queue zurück.

Eingabe:

```json
{}
```

## create_task

Erstellt eine neue Aufgabe.

Pflichtfelder:

- `sender`
- `recipient`
- `type`
- `priority`
- `context`
- `task`
- `acceptanceCriteria`
- `safetyNote`

Beispiel:

```json
{
  "sender": "Codex",
  "recipient": "Claude",
  "type": "DOCS",
  "priority": "NORMAL",
  "context": "README-Review",
  "task": "Prüfe die README auf Verständlichkeit.",
  "acceptanceCriteria": ["README erklärt lokalen Start."],
  "safetyNote": "Keine sensiblen Daten verwenden."
}
```

## claim_task

Setzt eine Aufgabe auf `IN_PROGRESS`.

Pflichtfelder:

- `taskId`
- `agent`

## complete_task

Verschiebt eine Aufgabe nach `DONE`.

Pflichtfelder:

- `taskId`
- `resultNote`
- `files`
- `tests`

Optionale Felder:

- `commit`
- `pullRequest`

## append_chat

Fügt eine Chat- oder Hinweisnachricht hinzu.

Pflichtfelder:

- `sender`
- `kind`
- `message`

## add_blocker

Dokumentiert eine Blockade.

Pflichtfelder:

- `reporter`
- `message`

Optional:

- `relatedTaskId`

## resolve_blocker

Löst eine Blockade.

Pflichtfelder:

- `blockerId`
- `resolvedBy`
- `resolutionNote`

## add_decision

Dokumentiert eine dauerhafte Entscheidung.

Pflichtfelder:

- `author`
- `title`
- `rationale`

Optional:

- `relatedTaskId`

## write_handoff

Schreibt eine Übergabe.

Pflichtfelder:

- `from`
- `to`
- `summary`
- `nextSteps`

Optional:

- `relatedTaskIds`

## validate_safety

Prüft Text auf riskante Muster.

Pflichtfeld:

- `content`

## reset_round

Setzt eine Runde zurück.

Queue, Done, Chat und Übergaben werden geleert. Offene Blocker bleiben
erhalten. Eine History wird geschrieben.

Pflichtfelder:

- `actor`
- `summary`
