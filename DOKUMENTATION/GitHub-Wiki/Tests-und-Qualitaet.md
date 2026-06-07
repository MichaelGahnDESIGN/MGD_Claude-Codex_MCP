# Tests und Qualität

## Aktuelle Testabdeckung

Phase 1 enthält Tests für:

- Safety-Check
- Aufgaben-Lebenszyklus
- Zwei-Agenten-MCP-Workflow
- Markdown-Rendering
- dateibasierten Storage
- Tool-Registrierung per Smoke-Test

## Gesamtprüfung

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Diese Prüfung führt aus:

```bash
npm run test
npm run smoke
```

## Erwartetes Ergebnis

Aktueller Stand:

- 8 Tests
- 5 Test-Suites
- Smoke-Test für 12 Tools

## Zwei-Agenten-Demo

```bash
npm --prefix PROJEKT/WORKSPACE run demo:agents
```

Diese Demo zeigt lokal:

1. Codex erstellt eine Aufgabe.
2. Claude übernimmt dieselbe Aufgabe.
3. Claude schließt sie ab.
4. Markdown und JSON-State enthalten denselben Ablauf.

## Was Noch Getestet Werden Muss

Vor öffentlicher Freigabe:

- echte Codex-Integration
- echte Claude-Integration
- mehrere Aufgaben nacheinander
- Blocker setzen und lösen
- Reset-Runde
- Safety-Blockaden mit verschiedenen Mustern
- Verhalten bei beschädigter JSON-Datei
- parallele Schreibzugriffe
- große Markdown-Dateien

## Qualitätsregeln

Neue Funktionen sollen:

- eigene Dateien haben
- Tests erhalten
- deutsch dokumentiert werden
- keine sensiblen Daten in Beispielen enthalten
- lokal ohne Cloud funktionieren

## Bekannte Technische Entscheidung

Phase 1 nutzt keine externen NPM-Abhängigkeiten. Das reduziert Risiko und
Installationsprobleme. Später kann das offizielle MCP-SDK ergänzt werden, wenn
Paketinstallation und Lockfile stabil geprüft sind.
