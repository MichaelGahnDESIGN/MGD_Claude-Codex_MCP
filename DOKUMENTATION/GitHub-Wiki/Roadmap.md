# Roadmap

## Phase 1

Status: umgesetzt.

Enthalten:

- lokaler MCP-Server
- 16 Tools einschließlich Review-Anfrage, Feedback, Antwort und Review-Liste
- dateibasierter Speicher
- Markdown-Ausgabe
- JSON-State
- Safety-Check
- Tests
- deutsche Dokumentation

## Phase 1.1

Teilweise umgesetzt:

- einfacher Setup-Assistent für Nicht-Programmierer
- lokales CLI-DMG-Testpaket für macOS
- einfache `comm`-CLI mit Setup, Diagnose, Status und Start

Weiter geplant:

- echte Codex-/Claude-Integration testen
- strengere Eingabevalidierung
- bessere Fehlerausgaben
- beschädigte State-Dateien sicher behandeln
- Reset-Round weiter testen
- interne Wiki-Dokumentation und README gegenlesen

Abgeschlossen:

- strukturierter Review- und Feedbackablauf mit Berechtigungsprüfung
- prozessübergreifende Serialisierung schreibender Dateioperationen
- atomarer Austausch der State- und Markdown-Dateien
- Rückwärtskompatibilität für State-Dateien ohne Review-Felder

## Phase 1.2

Geplant:

- Import bestehender `AI_COMMS.md`-Dateien
- Beispielkonfigurationen für MCP-Clients
- ausführlichere Beispiele
- erste private Testnutzer vorbereiten

## Phase 2

Mögliche Erweiterungen:

- offizielles MCP-SDK
- NPM-Paket
- signierte macOS-DMG oder Desktop-App
- Windows-EXE/Installer
- transaktionsfähiges SQLite-Backend für größere oder remote genutzte Setups
- Skill-/Prompt-Generator für Codex und Claude
- Multi-Projekt-Unterstützung
- bessere History und Archivierung

## Öffentliche Freigabe

Das Repository soll erst öffentlich werden, wenn:

- lokale Tests grün sind
- echte Integrationen funktionieren
- keine sensiblen Inhalte vorhanden sind
- interne Wiki-Dokumentation und README verständlich sind
- Sicherheitsregeln geprüft wurden
- ein klarer Release-Stand existiert
