# ChatGPT Codex

ChatGPT Codex soll diese Vorlage über `AGENTS.md`, `.codex/` und
`.agents/skills/` nutzen.

## Arbeitsweise

- `AGENTS.md` ist der wichtigste Codex-Einstieg im Root.
- `.codex/config.toml` erhöht das Projektanweisungslimit und ergänzt
  Fallback-Dateien.
- `.agents/skills/` enthält repo-sichtbare Skills für Projektstart und
  Dokumentation.
- Codex soll bei Änderungen an JavaScript im OpenRouter-Demobereich
  `npm run check` in `DEMOS/OPENROUTER/` ausführen.

## Quellenlogik

Diese Struktur folgt der offiziellen Codex-Logik:

- `AGENTS.md` dient als dauerhafte Projektanweisung.
- `.agents/skills/` ist ein repo-sichtbarer Skill-Pfad.
- `.codex/config.toml` enthält lokale Codex-Einstellungen.

## Grenzen

`DEMOS/OPENROUTER/` ist kein Workspace-Projekt. Es bleibt ein separater API-Demo- und
Testbereich.
