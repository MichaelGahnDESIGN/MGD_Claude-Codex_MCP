# Codex Integration

## Ziel

Codex soll Claude-Codex-MCP als lokalen Aufgaben- und Übergabekanal nutzen.
Dadurch kann Codex Aufgaben erstellen, Status lesen, Blocker setzen und Arbeit
abschließen, ohne eine Markdown-Datei manuell pflegen zu müssen.

## Empfohlener Ablauf

Für Nutzer ist der neutrale Universalbefehl:

```text
/comm
```

Wenn Codex eigene Slash-Befehle unterstützt, kann die Setup-Datei
`comm-befehl.md` als `comm.md` übernommen werden. Sonst wird derselbe Inhalt
als normaler Prompt genutzt.

Vor jeder Arbeitsrunde:

1. `read_context`
2. offene Blocker prüfen
3. `list_tasks`

Neue Aufgabe erstellen:

1. `create_task`
2. klare Akzeptanzkriterien formulieren
3. Sicherheitsnotiz ergänzen

Eigene Aufgabe bearbeiten:

1. `claim_task`
2. lokal arbeiten
3. Tests ausführen
4. `complete_task`

Bei Unklarheiten:

1. `add_blocker`
2. keine sensiblen Details speichern
3. auf Klärung warten

## Lokale Registrierung

Codex kann den MCP-Server über `codex mcp add` registrieren:

```bash
codex mcp add claude-codex-mcp \
  --env AGENT_COMMS_DIR="/pfad/zum/projekt" \
  -- "/pfad/zu/Claude-Codex-MCP/PROJEKT/WORKSPACE/bin/start-agent-comms-mcp.sh"
```

Prüfen:

```bash
codex mcp get claude-codex-mcp
```

Eine bereits laufende Codex-Sitzung muss eventuell neu gestartet werden.

## Beispiel-Prompt Für Codex

```text
Nutze Claude-Codex-MCP.

1. Lies read_context.
2. Prüfe offene Aufgaben.
3. Wenn keine passende Aufgabe existiert, erstelle eine kleine QA-Aufgabe.
4. Speichere keine Secrets, Tokens oder personenbezogenen Daten.
5. Dokumentiere Abschluss mit complete_task.
```

## Sicherheitsregeln Für Codex

Codex soll niemals:

- echte `.env`-Inhalte ausgeben
- Tokens oder Passwörter in Tool-Eingaben schreiben
- private Logs kopieren
- personenbezogene Detaildaten speichern
- Zahlungsdaten dokumentieren

Bei sensiblen Themen lieber neutralen Blocker setzen.
