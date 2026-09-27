# MCP-Tools

Alle Tools geben JSON als Textinhalt zurück. Schreibende Tools führen vorher
einen Safety-Check aus.

## read_context

Liest Projektkontext, aktive Aufgaben, offene Blocker, letzte Logs,
Entscheidungen und Übergaben.

Eingabe: `{}`.

## list_tasks

Gibt die aktive Aufgaben-Queue zurück.

Eingabe: `{}`.

## list_reviews

Gibt sämtliche Review-Anfragen mit Status, Feedback und Antworten zurück.
Offene Reviews erscheinen zusätzlich in `read_context`.

Eingabe: `{}`.

## create_task

Erstellt eine Aufgabe.

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

Erstellt eine Review-Anfrage. Die Review erhält eine eindeutige ID und startet
im Status `OPEN`.

Pflichtfelder:

- `requester`
- `reviewer`
- `question`
- `acceptanceCriteria`
- `files`

Optionale Felder: `taskId`, `commit`.

## submit_review_feedback

Der zugewiesene Reviewer ergänzt Feedback. Mehrere Feedbackrunden sind möglich,
solange die Anfrage nicht abgeschlossen wurde.

Pflichtfelder:

- `reviewId`
- `reviewer`
- `assessment`: `APPROVE`, `CHANGES_REQUESTED` oder `COMMENT`
- `summary`
- `findings`

Nur der im Review eingetragene Reviewer darf Feedback einreichen. Die
Namensprüfung dient der Zuordnung, nicht der Authentifizierung; der aktuelle
stdio-MCP erhält keine verifizierte Agentenidentität.

## respond_to_review

Der Anfragesteller dokumentiert den Umgang mit dem Feedback und schließt damit
die Review-Anfrage.

Pflichtfelder:

- `reviewId`
- `author`
- `disposition`: `ACCEPTED`, `PARTIALLY_ACCEPTED` oder `DECLINED`
- `rationale`

Eine Antwort ist erst möglich, nachdem Feedback eingereicht wurde. Nur der
Anfragesteller darf die Anfrage beantworten. Auch diese Namensprüfung ist keine
Authentifizierung des MCP-Clients.

## add_blocker

Dokumentiert eine Blockade oder Rückfrage.

Pflichtfelder:

- `reporter`
- `message`

Optional:

- `relatedTaskId`

## resolve_blocker

Markiert einen Blocker als gelöst.

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

Setzt Queue, DONE, Chat und Übergaben zurück und schreibt eine History.
Offene Blocker bleiben erhalten.

Pflichtfelder:

- `actor`
- `summary`
