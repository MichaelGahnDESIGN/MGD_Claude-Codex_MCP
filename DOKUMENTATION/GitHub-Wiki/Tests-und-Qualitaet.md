# Tests und Qualität

## Aktuelle Testabdeckung

Phase 1 enthält Tests für:

- Safety-Check
- Aufgaben-Lebenszyklus
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

- 7 Tests
- 4 Test-Suites
- Smoke-Test für 12 Tools

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
