# Entscheidungen

Hier werden wichtige fachliche, technische, organisatorische oder gestalterische Entscheidungen dokumentiert.

Jeder Eintrag soll mindestens enthalten:

- Datum
- Entscheidung
- Begründung
- betroffene Bereiche
- mögliche Folgen oder Trade-offs

## 2026-06-07 - OpenRouter bleibt separat

- Datum: `2026-06-07`
- Entscheidung: `OPENROUTER/` bleibt als separater Demo- und Testbereich im
  Projektroot.
- Begründung: Die OpenRouter-Demo ist kein eigentliches Projektartefakt im
  Sinne von `WORKSPACE/`, sondern ein isolierter API-Testbereich.
- Betroffene Bereiche: `OPENROUTER/`, `WORKSPACE/`,
  `AI/PROJEKTREGELN/PROJEKTREGELN.md`, Projektdokumentation.
- Folgen oder Trade-offs: Die Trennung erleichtert Orientierung und verhindert
  Vermischung mit späteren Projektumsetzungen. Dafür muss in der Dokumentation
  klar sichtbar bleiben, warum `OPENROUTER/` außerhalb von `WORKSPACE/` liegt.

## 2026-06-07 - Git am Projektroot initialisiert

- Datum: `2026-06-07`
- Entscheidung: Das Projektroot wird lokal mit Git versioniert.
- Begründung: Die Projektregeln verlangen nachvollziehbare Versionierung. Vorher
  existierte Git nur innerhalb von `PROJEKT/DOKUMENTATION/`.
- Betroffene Bereiche: Projektroot, `.gitignore`, Dokumentationsabläufe.
- Folgen oder Trade-offs: Änderungen können künftig am Root nachvollzogen
  werden.

## 2026-06-07 - Verschachteltes Doku-Git gesichert

- Datum: `2026-06-07`
- Entscheidung: Die innere Git-Historie von `PROJEKT/DOKUMENTATION/` wurde nach
  `PROJEKT/BACKUPS/dokumentation-git-backup-2026-06-07.git/` verschoben.
- Begründung: Die Vorlage soll als ein sauberer Git-Root funktionieren und beim
  Kopieren neuer Projekte keine Embedded-Repository-Warnung erzeugen.
- Betroffene Bereiche: `PROJEKT/DOKUMENTATION/`, `PROJEKT/BACKUPS/`, Root-Git.
- Folgen oder Trade-offs: Die frühere Doku-Historie bleibt lokal gesichert,
  wird aber nicht mehr als aktives verschachteltes Repository genutzt.

## 2026-06-07 - Tool-Adapter für Agenten ergänzt

- Datum: `2026-06-07`
- Entscheidung: Die Vorlage erhält eigene Adapter für Claude Code, Claude
  Cowork und ChatGPT Codex.
- Begründung: Unterschiedliche KI-Werkzeuge sollen dieselbe Projektstruktur als
  Startpunkt nutzen können, ohne eigene widersprüchliche Regeln zu erzeugen.
- Betroffene Bereiche: `.claude/`, `.codex/`, `.agents/skills/`,
  `AI/TOOLING/`, Root-Dateien.
- Folgen oder Trade-offs: Die Root-Dateien bleiben kurz, während
  tool-spezifische Details geordnet in eigenen Adapterordnern liegen.
