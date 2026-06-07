# Tests und Qualität

## Aktuelle Testabdeckung

Phase 1 enthält Tests für:

- Safety-Check
- Aufgaben-Lebenszyklus
- Zwei-Agenten-MCP-Workflow
- Markdown-Rendering
- dateibasierten Storage
- Setup-Assistent für Nicht-Programmierer
- Tool-Registrierung per Smoke-Test
- stdio-Protokollverhalten per Playwright-Audit

## Gesamtprüfung

```bash
npm --prefix PROJEKT/WORKSPACE run check
```

Diese Prüfung führt aus:

```bash
npm run test
npm run smoke
npm run playwright:audit
```

## Erwartetes Ergebnis

Aktueller Stand:

- 12 Tests
- 8 Test-Suites
- Smoke-Test für 12 Tools
- 3 Playwright-Audits für MCP-Prozessverhalten

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

Der MCP-Server nutzt weiterhin keine externen Laufzeitabhängigkeiten.
Playwright ist als Dev-Abhängigkeit für Protokoll- und Prozessprüfungen
ergänzt. Später kann das offizielle MCP-SDK geprüft werden, wenn der
Paketinstallationsprozess stabil bleibt.
