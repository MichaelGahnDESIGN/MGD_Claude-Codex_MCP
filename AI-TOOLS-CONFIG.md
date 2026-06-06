# AI-Tools-Konfiguration

Diese Datei erklärt, wie Claude Code, Claude Cowork, ChatGPT Codex und weitere
KI-Werkzeuge diese Projektvorlage nutzen sollen.

## Grundprinzip

Alle Werkzeuge arbeiten mit denselben fachlichen Regeln:

- `GRUNDREGELN.md`
- `AGENTS.md`
- `CLAUDE.md`
- `AI/AGENTEN/AGENTS.md`
- `AI/PROJEKTREGELN/PROJEKTREGELN.md`
- `AI/SKILLS/SKILL.md`
- `PROJEKT/DOKUMENTATION/SKILL.md`

Tool-spezifische Dateien dienen nur als Adapter. Sie dürfen keine
widersprüchlichen Regeln erzeugen.

## Gemeinsame Projektstruktur

- `WORKSPACE/`: konkreter Projektinhalt.
- `WORKSPACE/DOKUMENTATION/`: Dokumentation des konkreten Workspace-Projekts.
- `PROJEKT/DOKUMENTATION/`: Vorlagen- und Entwicklungsdokumentation.
- `PROJEKT/BACKUPS/`: lokale Sicherungen.
- `AI/`: Agenten, Skills, Projektregeln und Tooling-Doku.
- `OPENROUTER/`: separater Demo- und Testbereich.

## Claude Code

Startdateien:

- `CLAUDE.md`
- `.claude/README.md`
- `.claude/commands/doku.md`
- `AI/TOOLING/Claude-Code.md`

Empfohlener Startprompt:

```text
Lies CLAUDE.md und readmefirst.md. Richte dieses Verzeichnis als neue
Projektkopie ein und dokumentiere alle Entscheidungen auf Deutsch.
```

## Claude Cowork

Startdateien:

- `CLAUDE.md`
- `AI/TOOLING/Claude-Cowork.md`
- `readmefirst.md`

Empfohlener Startprompt:

```text
Lies CLAUDE.md, AGENTS.md und readmefirst.md. Arbeite in der bestehenden
Projektstruktur und überschreibe keine fremden Änderungen.
```

## ChatGPT Codex

Startdateien:

- `AGENTS.md`
- `.codex/config.toml`
- `.codex/README.md`
- `.agents/skills/`
- `AI/TOOLING/ChatGPT-Codex.md`

Empfohlener Startprompt:

```text
Lies AGENTS.md und readmefirst.md. Nutze die repo-sichtbaren Skills unter
.agents/skills/ und halte OPENROUTER separat.
```

## Neue Projektkopie Einrichten

1. Ordner kopieren und sinnvoll benennen.
2. `AI/PROJEKTREGELN/ARBEITSKONTEXT.md` ausfüllen.
3. `AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md` ausfüllen.
4. `PROJEKT/DOKUMENTATION/Informationen/Projektueberblick.md` aktualisieren.
5. Projektcode in `WORKSPACE/` anlegen.
6. Falls im Workspace ein Produkt entsteht, `WORKSPACE/DOKUMENTATION/` anlegen.
7. Dokumentationsdaten neu erzeugen:

```bash
python3 PROJEKT/DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py
```

## Sicherheitsregeln Für Alle Tools

- Keine Secrets, Tokens, Passwörter oder API-Schlüssel ausgeben.
- Keine personenbezogenen Daten in Prompts, Logs, Commits oder Doku kopieren.
- Zahlungs-, Authentifizierungs- und Datenschutzthemen vor Änderungen gesondert
  prüfen.
- Kostenpflichtige Dienste nur nach dokumentierter Prüfung einführen.
- `.env`-Dateien bleiben lokal und werden nicht versioniert.

## OpenRouter

`OPENROUTER/` bleibt separat.

Der Ordner ist ein Demo- und Testbereich für OpenRouter-Aufrufe und gehört
nicht in `WORKSPACE/`. Vor produktiver Nutzung müssen Kosten, Datenschutz,
Modellverfügbarkeit und Prompt-Grenzen erneut geprüft werden.
