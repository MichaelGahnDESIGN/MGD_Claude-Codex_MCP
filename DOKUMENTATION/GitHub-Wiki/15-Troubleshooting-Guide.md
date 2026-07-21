# Troubleshooting — Häufige Probleme & Lösungen

## Connection & Setup Issues

### "MCP Connection Error: ECONNREFUSED"

**Problem:** Claude/Codex können MCP nicht erreichen

**Checkliste:**
```bash
[ ] MCP Server läuft?
  $ ps aux | grep mcp-server
  → Sollte Node.js Prozess zeigen

[ ] Correct port in config?
  $ cat .claude/claude.json | grep localhost
  → Standard: http://localhost:3001

[ ] Firewall blockt port?
  $ lsof -i :3001
  → Sollte Node.js Prozess auf Port 3001 zeigen

[ ] MCP-URL korrekt geschrieben?
  → http://localhost:3001 (nicht https!)
```

**Wenn immer noch kaputt:**
```bash
# Debug-Logs
MCP_DEBUG=true npm run start:mcp

# Connection testen
curl -s http://localhost:3001/health | jq

# MCP restarten
npm run start:mcp
# Dann: Claude/Codex neu starten (Tool-Cache clear)
```

### "Tool Not Found" Error

**Problem:** Agent sieht MCP-Tools nicht

**Lösungen:**
1. MCP restarten: `npm run start:mcp`
2. Claude/Codex neu starten (Cache-Clear)
3. Config prüfen: `.claude/claude.json` aktuell?

## Task Management Issues

### "Task wird nicht angezeigt"

**Problem:** Agent sieht Task nicht

**Checkliste:**
```bash
# Datei existiert?
$ ls -la .claude/TASKS.md

# Format valid? (Markdown Syntax)
$ npm run validate:tasks

# Dateigrößen prüfen (über 1 MB?)
$ du -h .claude/TASKS.md
→ Wenn > 500 KB: Archivieren!

# Task-Status erkannt?
$ grep "Status:" .claude/TASKS.md
→ Sollte sein: "Status: open" (nicht "Open" oder "OPEN")
```

### "Blocker wird nicht beachtet"

**Problem:** Agent arbeitet weiter, obwohl Blocker gesetzt

**Lösung:** Blocker muss in Task-Description stehen:

```markdown
- [ ] Implement API
  - Status: in-progress
  - Blocker: Database credentials missing
    - Severity: high
    - To Unblock: @Claude adds .env
```

## Communication Issues

### "Messages werden nicht gelesen"

**Problem:** Agent sieht Message nicht

**Checkliste:**
```bash
# Datei existiert?
$ ls .claude/MESSAGES.md

# Richtige @mention Syntax?
$ grep "@Claude\|@Codex" .claude/MESSAGES.md
→ Sollte sein: @Claude (großes C), nicht @claude

# Message nicht zu alt?
$ tail -1 .claude/MESSAGES.md
→ Über 7 Tage? → Archivieren!
```

### "Zu viele Messages"

**Problem:** Agent ignoriert Messages

**Lösung:**
```bash
# Alte Messages archivieren
$ mv .claude/MESSAGES.md ARCHIVE/MESSAGES-2026-06.md
$ touch .claude/MESSAGES.md  # Neu starten

# Oder: Messages bündeln (mehrere Punkte in 1 Message)
```

## Decision & History Issues

### "Entscheidung wurde ignoriert"

**Problem:** Agent macht das Gegenteil

**Lösung:**
```markdown
## [Decision] Use Tailwind CSS ← Großer Titel!

Date: 2026-06-20  
Decided by: Claude + Codex  
Status: Approved  

**What:** Use Tailwind CSS  
**Why:** Performance, DX, plugin ecosystem  
**How:** npm install -D tailwindcss  
```

Plus: Message schreiben: `@Claude, see new decision in DECISIONS.md`

## Performance Issues

### "MCP ist langsam geworden"

**Diagnose:**
```bash
# Dateigrößen prüfen
$ du -h .claude/TASKS.md .claude/MESSAGES.md DECISIONS.md

# Wenn > 500 KB: Archivieren!
$ mv .claude/TASKS.md ARCHIVE/TASKS-2026-06.md
$ touch .claude/TASKS.md
```

### "Datei gelöscht — Recovery"

**Mit Git:**
```bash
# Letzte Version abrufen
$ git log --oneline .claude/TASKS.md
$ git checkout <commit> -- .claude/TASKS.md

# Oder aus Backup
$ cp BACKUPS/TASKS-2026-06-20.md .claude/TASKS.md
```

**Vorbeugung:**
```bash
# Tägliches Backup (Cron)
0 23 * * * cp .claude/TASKS.md BACKUPS/TASKS-$(date +\%Y-\%m-\%d).md
```

### "MCP-Server crasht"

**Debug:**
```bash
# Verbose logging
$ DEBUG=* npm run start:mcp
→ Sollte detaillierte Logs zeigen

# Node-Version prüfen
$ node --version
→ Sollte 16+ sein

# Dependencies neu installieren
$ rm -rf node_modules package-lock.json
$ npm install
$ npm run start:mcp
```

## Common Mistakes Quick-Fix

| Problem | Symptom | Fix |
|---------|---------|-----|
| Markdown kaputt | Task nicht lesbar | `npm run validate:tasks` |
| Owner fehlt | Agent nimmt Task nicht | Add: `Owner: @Claude` |
| Status falsch | Agent ignoriert | Use: `open/in-progress/done` |
| @mention falsch | Message nicht gesehen | Use: `@Claude` (großes C) |
| Blocker zu vage | Agent kann nicht fixen | "npm install fehlgeschlagen" |
| Datei zu groß | Performance sinkt | Archivieren! |
| MCP nicht erreichbar | Connection error | `curl http://localhost:3001/health` |

## Daily Troubleshooting Ritual

```bash
#!/bin/bash
echo "=== Daily Check ==="

# 1. MCP Health
echo "MCP Health Check..."
if curl -s http://localhost:3001/health > /dev/null; then
  echo "✅ MCP online"
else
  echo "❌ MCP offline - restart with: npm run start:mcp"
fi

# 2. Task Validity
echo "Task Validation..."
npm run validate:tasks || echo "⚠️ TASKS.md has issues"

# 3. Active Blockers
echo "Active Blockers:"
grep -c "Blocker:" .claude/TASKS.md || echo "✅ No blockers"

# 4. Unassigned Tasks
echo "Unassigned Tasks:"
grep "Status: open$" .claude/TASKS.md -B 5 | grep -v "Owner:" || echo "✅ All assigned"
```

## When All Else Fails

1. **Restart Everything:**
   ```bash
   npm run start:mcp
   # Restart Claude, Codex, browser
   ```

2. **Clear Caches:**
   ```bash
   rm -rf node_modules/.cache
   npm cache clean --force
   ```

3. **Reset to Last Known Good:**
   ```bash
   git checkout .claude/TASKS.md
   git checkout DECISIONS.md
   # Only MESSAGES.md can be recreated if needed
   ```

4. **Ask for Help:**
   ```bash
   # Create debug info
   echo "=== Debug Info ===" > debug.txt
   echo "Node: $(node --version)" >> debug.txt
   echo "MCP: $(curl http://localhost:3001/version)" >> debug.txt
   echo "Tasks: $(wc -l .claude/TASKS.md)" >> debug.txt
   ```

## Links & Ressourcen

- [Best Practices](14-Best-Practices-Guide)
- [Getting Started](10-Getting-Started-Guide)
- [FAQ](FAQ)
