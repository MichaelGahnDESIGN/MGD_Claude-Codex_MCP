# Claude Start

Diese Datei ist der Root-Einstieg für Claude Code und Claude Cowork.

## Lies Zuerst

1. `index.md`
2. `VORLAGE/REGELN/GRUNDREGELN.md`
3. `VORLAGE/AI/PROJEKTREGELN/PROJEKTREGELN.md`
4. `VORLAGE/AI/AGENTEN/AGENTS.md`
5. `VORLAGE/AI/SKILLS/SKILL.md`
6. `DOKUMENTATION/SKILL.md`

## Arbeitsorte

- `PROJEKT/WORKSPACE/`: konkreter Projektinhalt.
- `PROJEKT/WORKSPACE/DOKUMENTATION/`: Dokumentation des konkreten Produkts.
- `DOKUMENTATION/`: Vorlagen- und Entwicklungsdokumentation.
- `VORLAGE/`: Regeln, Agenten, Skills und Tooling.
- `DEMOS/OPENROUTER/`: separater Demo- und Testbereich.

## Claude-Hinweise

- Nutze `.claude/` nur als lokalen Tool-Adapter.
- Erzeuge keine neuen Root-Dateien, außer der Mensch fordert es ausdrücklich.
- Dokumentiere wichtige Entscheidungen auf Deutsch in `DOKUMENTATION/`.
- Überschreibe keine fremden Änderungen.
- Gib keine Secrets, Tokens oder personenbezogenen Daten aus.

## Standardauftrag Bei Neuer Projektkopie

Richte die Projektkopie anhand dieser Vorlage ein, fülle den Arbeitskontext in
`VORLAGE/AI/PROJEKTREGELN/` aus und lege Projektcode nur in
`PROJEKT/WORKSPACE/` an.
