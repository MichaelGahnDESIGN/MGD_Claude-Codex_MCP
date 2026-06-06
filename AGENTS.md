# AGENTS.md

Diese Datei ist der kurze Root-Einstieg für Codex, ChatGPT Codex und andere
Agenten, die zuerst nach `AGENTS.md` suchen.

Diese Vorlage dient als Startpunkt für neue Projekte. Beim Kopieren der
Vorlage werden projektspezifische Daten in `AI/PROJEKTREGELN/` und
`PROJEKT/DOKUMENTATION/` eingetragen. Die Root-Datei bleibt bewusst kurz,
damit Codex die Anweisungen zuverlässig laden kann.

Die kanonische operative Agentenlogik liegt in:

- [`AI/AGENTEN/AGENTS.md`](AI/AGENTEN/AGENTS.md)

Vor jeder relevanten Arbeit zusätzlich beachten:

- [`GRUNDREGELN.md`](GRUNDREGELN.md)
- [`AI/PROJEKTREGELN/PROJEKTREGELN.md`](AI/PROJEKTREGELN/PROJEKTREGELN.md)
- [`AI/SKILLS/SKILL.md`](AI/SKILLS/SKILL.md)
- [`PROJEKT/DOKUMENTATION/SKILL.md`](PROJEKT/DOKUMENTATION/SKILL.md)

Feste Arbeitsorte:

- `WORKSPACE/` ist der Ort für den konkret entstehenden Projektinhalt.
- `WORKSPACE/DOKUMENTATION/` dokumentiert das konkrete Workspace-Projekt.
- `PROJEKT/DOKUMENTATION/` dokumentiert Vorlage, Entscheidungen, Risiken,
  Setup, Deployment und Versionsstände.
- `OPENROUTER/` bleibt ein separater Demo- und Testbereich und wird nicht nach
  `WORKSPACE/` verschoben.

Codex-spezifische Adapter:

- `.codex/` enthält lokale Codex-Konfiguration.
- `.agents/skills/` enthält repo-sichtbare Skills für Projektstart und
  Dokumentation.

Wichtig:

- Diese Root-Datei dupliziert keine Regeln.
- Sie dient nur als schneller Einstieg für Systeme oder Personen, die zuerst im Root nach `AGENTS.md` suchen.
- Wenn Inhalte widersprüchlich wirken, gilt immer [`AI/AGENTEN/AGENTS.md`](AI/AGENTEN/AGENTS.md).
- Keine Secrets, Tokens, Zahlungsdaten oder personenbezogenen Daten ausgeben,
  speichern oder versionieren.
