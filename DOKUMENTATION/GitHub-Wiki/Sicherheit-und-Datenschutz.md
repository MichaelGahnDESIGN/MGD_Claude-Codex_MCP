# Sicherheit und Datenschutz

## Grundsatz

Claude-Codex-MCP soll keine sensiblen Daten speichern. Das gilt besonders für:

- Passwörter
- Tokens
- API-Schlüssel
- private Schlüssel
- `.env`-Inhalte
- Datenbankzugänge
- personenbezogene Detaildaten
- Zahlungsdaten
- private Logauszüge
- Kundendaten

## Safety-Check

Schreibende Tools prüfen Inhalte vor dem Speichern.

Blockiert werden offensichtliche Muster wie:

- `.env`
- `API_KEY`
- `SECRET_KEY`
- `ACCESS_TOKEN`
- private Schlüssel
- Passwort-Zuweisungen
- Token-Zuweisungen
- Datenbank-URLs
- SSH-Schlüsselhinweise
- Dump- oder Backup-Dateien

## Grenzen Der Prüfung

Der Safety-Check ist kein vollständiger DLP-Ersatz.

Er kann nicht zuverlässig erkennen:

- alle personenbezogenen Daten
- alle vertraulichen Projektdetails
- indirekte Geheimnisse
- sensible Informationen in harmlos wirkender Sprache

Darum bleibt die wichtigste Regel:

> Keine sensiblen Daten in das MCP schreiben.

## Sichere Formulierungen

Schlecht:

```text
Das Passwort ist ...
```

Gut:

```text
Blocker: Für diese Aufgabe werden lokale Zugangsdaten benötigt. Bitte manuell
prüfen und nicht in das MCP schreiben.
```

## Öffentliche Freigabe

Vor einer öffentlichen Freigabe müssen mindestens geprüft werden:

- Git-Historie
- Wiki
- README
- Beispiele
- Tests
- Doku
- `.env`-Dateien
- Logs
- generierte Dateien

Das Repository bleibt privat, bis diese Prüfung abgeschlossen ist.
