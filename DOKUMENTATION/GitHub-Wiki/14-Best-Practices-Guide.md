# Best Practices — Produktiver Einsatz

## Projekt-Struktur

```
my-project/
├── .claude/
│   ├── claude.json          # MCP-Config
│   └── TASKS.md             # Active Tasks
├── .codex/
│   ├── codex.json           # MCP-Config
│   └── tasks-backup/        # Tägliches Backup
├── DECISIONS.md             # Alle Decisions
├── BLOCKERS.md              # Aktive Blocker
├── MESSAGES.md              # Agent Chat-Log
├── ARCHIVE/                 # Alte Daten
│   ├── 2026-06-tasks-done.md
│   ├── 2026-06-decisions.md
│   └── 2026-06-messages.md
└── [Projekt-Code]
```

## Task-Beschreibung Best-Practice

**❌ FALSCH:**
```markdown
- [ ] Make UI better
```

**✅ RICHTIG:**
```markdown
- [ ] Implement Dark Mode Toggle Button
  - Status: open
  - Owner: @Codex
  - Description: "Add toggle in navbar (top-right). Use useTheme() hook. Persist in localStorage. Support system preference detection."
  - Success Criteria:
    - [ ] Button visible & clickable
    - [ ] Toggle switches theme
    - [ ] Persists on page reload
    - [ ] Respects system preference on first visit
    - [ ] WCAG AA contrast maintained
```

## Status-Progression Rules

Erlaubte Übergänge:
- `open` → `in-progress` (Agent startet)
- `in-progress` → `blocked` (Problem gefunden)
- `blocked` → `in-progress` (Problem gelöst)
- `in-progress` → `done` (fertig)
- `done` → `open` (fehlerhaft, neu öffnen)

**Ungültig:**
- ❌ `blocked` → `done` (ohne Blocker zu lesen!)
- ❌ `open` → `done` (überspringen)

## Owner-Feld Best-Practice

**Golden Rule: 1 Owner pro Task**

```markdown
- [ ] Implement API Endpoint
  - Owner: @Codex  ← Nur EIN Owner!

  Falls Übergabe:
  Codex findet Fehler → schreibt Message "@Claude, found edge case"
  → Claude setzt Owner: @Claude
```

## Blocker-Management

**Blocker-Vorlage:**
```markdown
- [ ] Build React Components
  - Status: in-progress
  - Blocker: "npm install fails (peer dependency conflict)"
    - Severity: high
    - Root Cause: react-query@4 incompatible with react@17
    - To Unblock: Upgrade React or downgrade react-query
    - Assigned to: @Claude (research) or @Codex (implement)
```

## Message Best-Practices

Messages sind nur für **Alerts & Übergaben**, nicht für Feedback!

**❌ FALSCH:**
```
Message: "The code looks good"
Message: "Working on the task"
```

**✅ RICHTIG:**
```
Message: "@Claude, ready for review. Attaching code."
Message: "@Codex, found bug in line 23. Please fix."
Message: "@Claude, blocked on dependency issue. See blocker report."
```

## Daily/Weekly Rituals

**Morgens (für Manager):**
- [ ] Lese all Messages (neue wichtige Alerts?)
- [ ] Überprüfe Blocker (sind sie noch gültig?)
- [ ] Kontrolliere Owner-Zuordnung (keine verwaisten Tasks)

**Wöchentlich (Freitag):**
- [ ] Archive completed tasks → `ARCHIVE/2026-06-tasks.md`
- [ ] Cleanup unneeded Blocker
- [ ] Review Decisions (sind wir noch on-track?)
- [ ] Prepare next week's prioritized tasks

**Monatlich:**
- [ ] Reflect: Falsche Entscheidungen? Umkehren?
- [ ] Team Meeting: Was haben wir gelernt?
- [ ] Optimize MCP-Usage: Zu viele/wenige Messages?

## Anti-Patterns & Lösungen

| Anti-Pattern | Problem | Lösung |
|---|---|---|
| Große Monolith-Tasks | Schwer zu tracken, lange in-progress | Split in kleinere Tasks: Auth, Users-API, Products-API |
| Vergessene Blocker | Tasks stecken fest | Daily Blocker-Review, SLA setzen |
| Unklare Übergaben | Agent sieht nicht, dass er dran ist | Immer Message + Status-Change + Owner |
| Zu viele Messages | Agent ignoriert alle | Nutze Messages nur für Alerts, batch Messages |
| Status nicht aktualisiert | Falscher Überblick | Automatisierte Daily-Reports |

## Performance & Optimization

Wenn TASKS.md > 500 KB:
```bash
# Archivieren
mv .claude/TASKS.md ARCHIVE/TASKS-2026-06.md
git add ARCHIVE/TASKS-2026-06.md
git commit -m "Archive completed tasks"

# Neue TASKS.md starten
touch .claude/TASKS.md
```

## Sicherheit & Datenschutz

- ⚠️ Keine personenbezogenen Daten in Tasks/Messages
- ⚠️ Keine Passwords in Code-Snippets (nutze `YOUR_PASSWORD_HERE`)
- ⚠️ Sensible Blocker nur für Owner sichtbar
- ✅ Weekly Backups: `cp TASKS.md BACKUPS/TASKS-$(date +%Y-%m-%d).md`
- ✅ Git commits für Audit Trail

## Links & Ressourcen

- [Troubleshooting](15-Troubleshooting-Guide)
- [Getting Started](10-Getting-Started-Guide)
- [Multi-Agent Workflow](13-Multi-Agent-Workflow-Beispiel)
