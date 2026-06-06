# Versionen

Startversion dieser Vorlage pro neuem Projekt:

- Datum: `YYYY-MM-DD`
- Version: `0.0.1`
- Beschreibung: `Projektstart / Vorlage übernommen`
- Begründung: `Initialer Projektstand`
- Betroffene Bereiche: `Grundstruktur`
- Rücknahme oder Wiederherstellung: `Aus Vorlage erneut erzeugbar`

## 0.0.2 - Struktur- und Sicherheitsbereinigung

- Datum: `2026-06-07`
- Version: `0.0.2`
- Beschreibung: Projektidentität ergänzt, Git am Root initialisiert,
  OpenRouter-Demo als separater Bereich dokumentiert und Sicherheitsregeln für
  lokale Secrets geschärft. Die frühere innere Git-Historie der
  Projektdokumentation wurde gesichert, damit die Vorlage als ein sauberes
  Root-Repository funktioniert. Zusätzlich wurden Tool-Adapter für Claude Code,
  Claude Cowork und ChatGPT Codex ergänzt.
- Begründung: Die Vorlage enthielt noch Platzhalter und die Trennung zwischen
  `PROJEKT/WORKSPACE/` und `DEMOS/OPENROUTER/` war nicht eindeutig dokumentiert.
- Betroffene Bereiche: Projektroot, `VORLAGE/AI/PROJEKTREGELN/`,
  `DOKUMENTATION/`, `BACKUPS/`, `.claude/`, `.codex/`,
  `.agents/skills/`, `VORLAGE/AI/TOOLING/`, `DEMOS/OPENROUTER/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Bei Bedarf
  können die geänderten Dokumentationsdateien auf den vorherigen Stand
  zurückgeführt werden.
