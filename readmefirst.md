# Start Hier

Diese Vorlage ist ein Startpunkt für neue KI-gestützte Projekte mit Claude
Code, Claude Cowork, ChatGPT Codex und weiteren Agenten.

Die Struktur trennt bewusst:

- dauerhafte Regeln
- Agenten- und Skill-Logik
- konkrete Projektarbeit
- Dokumentation
- Backups
- separate Demo- und Testbereiche

## Schnellstart Für Ein Neues Projekt

1. Kopiere diesen Ordner als neue Projektbasis.
2. Benenne den Ordner passend zum neuen Projekt.
3. Öffne die Kopie im gewünschten Tool.
4. Lies zuerst `AGENTS.md` oder `CLAUDE.md`.
5. Fülle den konkreten Arbeitskontext in
   `AI/PROJEKTREGELN/ARBEITSKONTEXT.md`.
6. Dokumentiere Freigaben und Grenzen in
   `AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md`.
7. Lege echten Projektcode nur in `WORKSPACE/` an.
8. Pflege wichtige Entscheidungen, Risiken und Versionen in
   `PROJEKT/DOKUMENTATION/`.

## Wichtige Ordner

- `AI/AGENTEN/`: Rollen, Zuständigkeiten und operative Agentenlogik.
- `AI/PROJEKTREGELN/`: projektspezifische Regeln, Kontext und Freigaben.
- `AI/SKILLS/`: wiederverwendbare Arbeitsmuster.
- `.agents/skills/`: repo-sichtbare Codex-Skills.
- `.claude/`: Claude-spezifische Einstiegshilfen.
- `.codex/`: Codex-spezifische Konfiguration.
- `PROJEKT/DOKUMENTATION/`: Vorlagen- und Entwicklungsdokumentation.
- `WORKSPACE/`: konkreter Projektinhalt.
- `WORKSPACE/DOKUMENTATION/`: Dokumentation des konkreten Workspace-Projekts.
- `PROJEKT/BACKUPS/`: Sicherungen und Wiederherstellungsgrundlagen.
- `OPENROUTER/`: separater OpenRouter-Demo- und Testbereich.

## Tool-Einstieg

Claude Code:

- Einstieg: `CLAUDE.md`
- Details: `AI/TOOLING/Claude-Code.md`
- Lokaler Doku-Befehl: `.claude/commands/doku.md`

Claude Cowork:

- Einstieg: `CLAUDE.md`
- Details: `AI/TOOLING/Claude-Cowork.md`

ChatGPT Codex:

- Einstieg: `AGENTS.md`
- Details: `AI/TOOLING/ChatGPT-Codex.md`
- Repo-Skills: `.agents/skills/`

## Dokumentation Aktualisieren

Bei Strukturänderungen oder neuen Dokumentationsinhalten:

```bash
python3 PROJEKT/DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py
```

Danach prüfen:

- Sind Entscheidungen dokumentiert?
- Sind Risiken dokumentiert?
- Sind offene Punkte sichtbar?
- Sind sensible Daten geschützt?
- Ist `WORKSPACE/` weiterhin vom separaten `OPENROUTER/` getrennt?

## Sicherheitsgrundsatz

Keine Secrets, Tokens, Passwörter, Zahlungsdaten, personenbezogenen Daten,
Sessiondaten oder Kundendaten in Code, Dokumentation, Logs, Prompts oder Git
ablegen.

## Git-Grundsatz

Diese Vorlage soll versioniert werden. Vor einem Commit immer prüfen:

```bash
git status --short --branch
git -C PROJEKT/DOKUMENTATION status --short --branch
```

Das zweite Kommando ist wichtig, weil `PROJEKT/DOKUMENTATION/` aktuell ein
eigenes Git-Repository enthält.
