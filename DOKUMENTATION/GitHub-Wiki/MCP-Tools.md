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

## list_reviews

Liefert Review-Anfragen, Status, Feedbackrunden und Antworten. Offene Reviews
stehen zusätzlich im Kontext.

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

Erlaubte Werte:

- `type`: `CODE`, `REVIEW`, `PIXEL_ART`, `IMAGE_GENERATION`, `UI_CONCEPT`,
  `DOCS`, `BRAINSTORM`, `DEPLOY`, `QA`, `SECURITY`
- `priority`: `LOW`, `NORMAL`, `HIGH`, `URGENT`

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

Erlaubte Werte:

- `kind`: `Hinweis`, `Frage`, `Antwort`, `Status`, `Warnung`

## create_review

Pflichtfelder: `requester`, `reviewer`, `question`, `acceptanceCriteria`,
`files`. Optional sind `taskId` und `commit`.

## submit_review_feedback

Pflichtfelder: `reviewId`, `reviewer`, `assessment`, `summary`, `findings`.
`assessment` ist `APPROVE`, `CHANGES_REQUESTED` oder `COMMENT`. Nur der
zugewiesene Reviewer kann Feedback schreiben.

## respond_to_review

Pflichtfelder: `reviewId`, `author`, `disposition`, `rationale`.
`disposition` ist `ACCEPTED`, `PARTIALLY_ACCEPTED` oder `DECLINED`. Nur der
Anfragesteller kann auf vorhandenes Feedback antworten und die Review schließen.

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
