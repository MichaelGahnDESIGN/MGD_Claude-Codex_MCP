# Multi-Agent Workflow — Realistisches Szenario

**Szenario:** React Component Library aufbauen mit Claude + Codex

## Die Charaktere

- **Claude** = Planer, Reviewer, Entscheidungs-Maker
- **Codex** = Implementer, Code-Generator
- **Du** = Manager, setzt Priority

## Tag 1: Design System Phase

### 09:00 — Claude startet

```
Claude: list_tasks status=open
→ Sieht 5 Tasks: Design System, Specs, Components, Tests, Docs

Claude: get_task id=1 (Design System)
→ Success Criteria: Tailwind config, Design Tokens, Color System

Claude: update_task id=1 status=in-progress owner=claude
Claude: write_message "@All, starting Design System phase"
Claude: add_decision 
  what="Use Tailwind CSS + Design Tokens"
  why="Performance, DX, plugin ecosystem"
  how="npm install -D tailwindcss, create tokens.json"
```

### 10:00 — Codex übernimmt

```
Codex: list_tasks status=open owner=codex
→ Sieht Task ist jetzt owner=codex (Claude übergab via Message)

Codex: write_message "@Claude, starting implementation"

Codex Code (tailwind.config.js):
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981'
      },
      spacing: {
        '4.5': '1.125rem',
      }
    }
  }
}

Codex: update_task id=1 code_snippet="{language: 'javascript', code: '...'}"
Codex: write_message "@Claude, Design System ready. Attaching config."
```

### 14:00 — Claude reviewt

```
Claude: get_task id=1
→ Liest Code, sieht: "Colors need WCAG contrast check"

Claude: report_blocker 
  title="WCAG A11y Compliance Check"
  severity="high"

Claude: write_message "@Codex, need to add contrast validator"
Claude: update_task id=1 status=blocked owner=codex
```

### 15:30 — Codex fixe

```
Codex: get_task id=1
→ Sieht Blocker

Codex Code (tokens-validator.ts):
export const checkContrast = (bg: string, fg: string): boolean => {
  const bgLum = getLuminance(bg);
  const fgLum = getLuminance(fg);
  const ratio = (Math.max(bgLum, fgLum) + 0.05) / (Math.min(bgLum, fgLum) + 0.05);
  return ratio >= 4.5; // WCAG AA Standard
};

Codex: update_task id=1 code_snippet="{...updated code...}"
Codex: write_message "@Claude, WCAG validator added. Tests passing."
```

### 16:00 — Claude gibt frei

```
Claude: get_task id=1
→ Code approved

Claude: add_decision
  status="approved"
  date="2026-06-20"

Claude: update_task id=1 status=done owner=claude
Claude: write_message "@All, Design System approved. Moving to Task 2"
```

## Visualisierung: 2-Wochen Projekt

```
Week 1:
  Mon: Design System (Claude plan → Codex impl → Claude review → approve)
  Tue-Wed: Component Specs (Claude write → review)
  Thu: Component Impl Start (Codex start, blocked on spec details)
  Fri: Specs finalized → Codex can implement

Week 2:
  Mon-Tue: Component Impl (Codex code → Claude review)
  Wed: Tests (Claude write test specs → Codex implement)
  Thu: Docs (Claude write docs structure → Codex fill in API docs)
  Fri: Release prep (Claude → GitHub Release)
```

## Kommunikations-Best-Practices

### Messages (nur für Alerts!)

**❌ FALSCH:**
```
Message: "I'm working on the component now"
```

**✅ RICHTIG:**
```
Message: "@Claude, starting component implementation"
Message: "@Codex, ready for review. Found accessibility issue."
```

### Task-Description Format

```markdown
- [ ] Implement Button Component

**Status:** in-progress  
**Owner:** @Codex  
**Description:** 
Create Button component with variants (primary, secondary, ghost).
Supports: disabled, loading, icon, sizes (sm, md, lg).
Must pass WCAG AA standards.

**Success Criteria:**
- [ ] Renders all variants correctly
- [ ] Passes accessibility tests (Axe)
- [ ] Unit tests: 100% coverage
- [ ] Storybook stories for all variants
```

### Blocker-Format

```markdown
**Blocker:** Missing TypeScript types for theme  
**Severity:** high  
**Root Cause:** @emotion/styled doesn't export theme type  
**To Unblock:** Add theme type definition file  
**Assigned:** @Claude (research)
```

## Konflikt-Szenarien & Lösungen

### Szenario 1: Architecture Disagreement

```
Claude: "Use CSS Modules for component styling"
Codex: "But I can generate Tailwind faster"

Lösung: Blocker setzen, Manager entscheidet
Claude: report_blocker title="Styling approach" severity="medium"
Claude: update_task status=blocked
Manager: write_message "@All, Entscheidung: Use Tailwind (velocity > purity)"
Codex: update_task status=in-progress (continue mit Tailwind)
```

### Szenario 2: Codex kennt Pattern nicht

```
Codex: report_blocker title="React Context Pattern" severity="high"
Claude: write_message "@Codex, use React Context like this:"
Claude: update_task attach_code={pattern_example}
Codex: update_task status=in-progress (continue)
```

### Szenario 3: Task dauert länger

```
Claude: get_task id=3 (Component Implementation, started Mon, today Fri)
→ Status still in-progress, should be done

Claude: write_message "@Codex, status update? Timeline concern."
Codex: report_blocker title="Complex animations" severity="medium"
Claude: Split task: id=3 (Codex continues), id=3b (animations pushed to Week 3)
```

## Monitoring: Daily Status Report (Bash)

```bash
#!/bin/bash
echo "=== Daily Status Report ===" > DAILY_REPORT.md
echo "Date: $(date +%Y-%m-%d)" >> DAILY_REPORT.md

OPEN=$(grep -c "Status: open" .claude/TASKS.md)
IN_PROGRESS=$(grep -c "Status: in-progress" .claude/TASKS.md)
BLOCKED=$(grep -c "Status: blocked" .claude/TASKS.md)
DONE=$(grep -c "Status: done" .claude/TASKS.md)

echo "Tasks: $OPEN open, $IN_PROGRESS in-progress, $BLOCKED blocked, $DONE done" >> DAILY_REPORT.md
echo "Blockers: $(grep -c "Blocker:" .claude/TASKS.md)" >> DAILY_REPORT.md
echo "Messages (24h): $(tail -20 .claude/MESSAGES.md | wc -l)" >> DAILY_REPORT.md
```

## Tips für Real-World Use

1. **Weekly Archive** — Jeden Freitag completed tasks in ARCHIVE/ verschieben
2. **Owner SLA** — Tasks sollten nicht > 5 Tage ohne Owner sein
3. **Blocker SLA** — High-Severity Blocker: < 4h, Medium: < 1d
4. **Decision Review** — Monatlich: Sind alte Decisions noch valid?

## Links & Ressourcen

- [Hauptseite: Home](Home)
- [Getting Started](10-Getting-Started-Guide)
- [Claude Integration](11-Claude-Integration-Beispiel)
- [Codex Integration](12-Codex-Integration-Beispiel)
- [Best Practices](14-Best-Practices-Guide)
