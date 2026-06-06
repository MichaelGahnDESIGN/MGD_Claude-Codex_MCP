# TOOLING

Dieser Ordner dokumentiert, wie verschiedene KI-Werkzeuge diese Vorlage
nutzen sollen.

## Ziel

Claude Code, Claude Cowork, ChatGPT Codex und weitere Werkzeuge sollen mit der
gleichen Projektstruktur arbeiten können, ohne widersprüchliche Regeln zu
erzeugen.

## Grundregel

- Root-Dateien bleiben kurz.
- Verbindliche Regeln liegen in `VORLAGE/REGELN/GRUNDREGELN.md` und `VORLAGE/AI/`.
- Tool-spezifische Adapter liegen in `.claude/`, `.codex/` und
  `.agents/skills/`.
- Konkreter Projektcode entsteht in `PROJEKT/WORKSPACE/`.
- `DEMOS/OPENROUTER/` bleibt ein separater Demo- und Testbereich.
