# Codex Integration — Schritt-für-Schritt Anleitung

**Zielgruppe:** Entwickler, die Codex mit Claude-Codex-MCP verwenden

## Überblick: Was Codex mit MCP machen kann

Codex kann über Claude-Codex-MCP auf folgende Funktionen zugreifen:

| Tool | Funktion | Beispiel |
|------|----------|---------|
| `list_tasks` | Offene Tasks finden | Codex findet "Komponente implementieren" |
| `get_task` | Task-Details lesen | Codex liest Description & Blocker |
| `update_task` | Status ändern, Code attachen | Codex attached TypeScript-Code |
| `write_message` | Chat-Nachrichten senden | Codex schreibt "@Claude, fertig" |
| `report_blocker` | Probleme melden | Codex meldet: "npm install fehlgeschlagen" |

## Setup: MCP in Codex konfigurieren

### Option 1: ChatGPT Codex (Web)

Füge folgende Custom Instruction hinzu:

```
You have access to Claude-Codex-MCP, an MCP server at http://localhost:3001

Use these tools:
- list_tasks: Get open tasks
- get_task(id): Get task details
- update_task(id, {status, code_snippet, message}): Update task
- write_message(text): Send message
- report_blocker(title, description, severity)

Workflow:
1. list_tasks → find "in-progress" with owner "codex"
2. get_task → read requirements
3. write_message "@Claude, starting implementation"
4. update_task with code_snippet → attach code
5. write_message "@Claude, ready for review"
```

### Option 2: Lokal via .codex/codex.json

```json
{
  "mcpServers": {
    "claudeCodexMcp": {
      "command": "node",
      "args": ["path/to/mcp-server.js"],
      "type": "stdio"
    }
  }
}
```

## Praktisches Szenario: Codex implementiert useFetch Hook

### Schritt 1: Task lesen

```
Codex: list_tasks filter={"status": "open", "owner": "codex"}
→ Findet: "Implement useFetch custom hook"
```

### Schritt 2: Details erfassen

```
Codex: get_task id=42
→ Liest:
  - Title: "Implement useFetch custom hook"
  - Description: "TypeScript, abort support, error retry"
  - Success Criteria: "Handles GET/POST, error state, loading state"
```

### Schritt 3: Übergabe bestätigen

```
Codex: write_message text="@Claude, starting useFetch implementation"
Codex: update_task id=42 status="in-progress"
```

### Schritt 4: Code generieren & attachen

```typescript
// useFetch.ts
export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { 
          ...options,
          signal: controller.current.signal 
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof AbortError) return;
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.current.abort();
  }, [url]);

  return { data, loading, error };
};
```

```
Codex: update_task id=42 code_snippet="{language: 'typescript', code: '...'}"
```

### Schritt 5: Tests schreiben

```typescript
// useFetch.test.ts
describe('useFetch', () => {
  it('should fetch data and set loading state', async () => {
    const { result } = renderHook(() => useFetch('/api/data'));
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeDefined();
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useFetch('/api/error'));
    
    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
```

### Schritt 6: Status aktualisieren

```
Codex: write_message text="@Claude, code ready. Tests passing. Attaching PR link."
Codex: update_task id=42 status="done"
```

## Best Practices für Codex

### Code attachen

**Format:**
```
update_task id=42 code_snippet={
  "language": "typescript",
  "code": "export const Component = () => {...}"
}
```

**Multi-Language Support:**
```
Codex sollte immer language field setzen:
- typescript, javascript, python, go, rust, java, sql, bash
```

### Übergaben handhaben

Wenn Codex an Claude übergeben sollte:

```
Codex: write_message text="@Claude, ready for review. Blocking on accessibility check."
Codex: report_blocker title="WCAG A11y Validation" severity="high"
Codex: update_task id=42 status="blocked" owner="claude"
```

### Blocker melden

Wenn Codex steckenbleibt:

```
Codex: report_blocker 
  title="npm dependency conflict"
  description="react-query@4 incompatible with react@17"
  severity="high"
Codex: write_message text="@Claude, blocked on dependency conflict. See blocker report."
```

## Troubleshooting

### "Codex sieht keine Tasks"

Checkliste:
- [ ] MCP läuft? `ps aux | grep mcp`
- [ ] Correct port in config? (Standard: 3001)
- [ ] TASKS.md existiert in `.claude/`?
- [ ] Dateiformat okay? (Markdown Syntax valid)

### "Code wird nicht geattached"

- [ ] Language field korrekt? (z.B. `"typescript"` nicht `"ts"`)
- [ ] Code ist gültiger JSON String? (escaping prüfen)
- [ ] Update-Tool antwortet ohne Fehler?

### "Übergabe an Claude funktioniert nicht"

- [ ] Message hat `@Claude` (großes C)?
- [ ] Task-Owner wurde auf `"claude"` gesetzt?
- [ ] Blocker-Bericht wurde erstellt?

## Links & Ressourcen

- [Hauptseite: Home](Home)
- [Claude Integration](11-Claude-Integration-Beispiel)
- [Multi-Agent Workflow](13-Multi-Agent-Workflow-Beispiel)
- [Best Practices](14-Best-Practices-Guide)
- [Troubleshooting](15-Troubleshooting-Guide)
