# AI-Tools-Konfiguration

Diese Datei erklärt, wie Claude Code, Claude Cowork, ChatGPT Codex und weitere
KI-Werkzeuge diese Projektvorlage nutzen sollen.

## Grundprinzip

Alle Werkzeuge arbeiten mit denselben fachlichen Regeln:

- `VORLAGE/REGELN/GRUNDREGELN.md`
- `AGENTS.md`
- `claude.md`
- `VORLAGE/AI/AGENTEN/AGENTS.md`
- `VORLAGE/AI/PROJEKTREGELN/PROJEKTREGELN.md`
- `VORLAGE/AI/SKILLS/SKILL.md`
- `DOKUMENTATION/SKILL.md`

Tool-spezifische Dateien dienen nur als Adapter. Sie dürfen keine
widersprüchlichen Regeln erzeugen.

## Gemeinsame Projektstruktur

- `PROJEKT/WORKSPACE/`: konkreter Projektinhalt.
- `PROJEKT/WORKSPACE/DOKUMENTATION/`: Dokumentation des konkreten Workspace-Projekts.
- `DOKUMENTATION/`: Vorlagen- und Entwicklungsdokumentation.
- `BACKUPS/`: lokale Sicherungen.
- `VORLAGE/AI/`: Agenten, Skills, Projektregeln und Tooling-Doku.
- `DEMOS/OPENROUTER/`: separater Demo- und Testbereich.

## Claude Code

Startdateien:

- `claude.md`
- `.claude/README.md`
- `.claude/commands/doku.md`
- `VORLAGE/AI/TOOLING/Claude-Code.md`

Empfohlener Startprompt:

```text
Lies claude.md und index.md. Richte dieses Verzeichnis als neue
Projektkopie ein und dokumentiere alle Entscheidungen auf Deutsch.
```

## Claude Cowork

Startdateien:

- `claude.md`
- `VORLAGE/AI/TOOLING/Claude-Cowork.md`
- `index.md`

Empfohlener Startprompt:

```text
Lies claude.md, AGENTS.md und index.md. Arbeite in der bestehenden
Projektstruktur und überschreibe keine fremden Änderungen.
```

## ChatGPT Codex

Startdateien:

- `AGENTS.md`
- `.codex/config.toml`
- `.codex/README.md`
- `.agents/skills/`
- `VORLAGE/AI/TOOLING/ChatGPT-Codex.md`

Empfohlener Startprompt:

```text
Lies AGENTS.md und index.md. Nutze die repo-sichtbaren Skills unter
.agents/skills/ und halte DEMOS/OPENROUTER separat.
```

## Neue Projektkopie Einrichten

1. Ordner kopieren und sinnvoll benennen.
2. `VORLAGE/AI/PROJEKTREGELN/ARBEITSKONTEXT.md` ausfüllen.
3. `VORLAGE/AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md` ausfüllen.
4. `DOKUMENTATION/Informationen/Projektueberblick.md` aktualisieren.
5. Projektcode in `PROJEKT/WORKSPACE/` anlegen.
6. Falls im Workspace ein Produkt entsteht, `PROJEKT/WORKSPACE/DOKUMENTATION/` anlegen.
7. Dokumentationsdaten neu erzeugen:

```bash
python3 DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py
```

## Sicherheitsregeln Für Alle Tools

- Keine Secrets, Tokens, Passwörter oder API-Schlüssel ausgeben.
- Keine personenbezogenen Daten in Prompts, Logs, Commits oder Doku kopieren.
- Zahlungs-, Authentifizierungs- und Datenschutzthemen vor Änderungen gesondert
  prüfen.
- Kostenpflichtige Dienste nur nach dokumentierter Prüfung einführen.
- `.env`-Dateien bleiben lokal und werden nicht versioniert.

## OpenRouter

`DEMOS/OPENROUTER/` bleibt separat.

Der Ordner ist ein Demo- und Testbereich für OpenRouter-Aufrufe und gehört
nicht in `PROJEKT/WORKSPACE/`. Vor produktiver Nutzung müssen Kosten, Datenschutz,
Modellverfügbarkeit und Prompt-Grenzen erneut geprüft werden.
