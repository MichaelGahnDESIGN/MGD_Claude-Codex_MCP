# Risiken

Hier werden bekannte Risiken und Unsicherheiten dokumentiert.

Pro Eintrag festhalten:

- Risiko
- Eintrittswahrscheinlichkeit
- Auswirkung
- betroffene Bereiche
- Absicherung oder nächste Maßnahme

## OpenRouter-API und Modellverfügbarkeit

- Risiko: Modell-IDs, Preise, Provider, Limits oder Verfügbarkeit bei
  OpenRouter können sich ändern.
- Eintrittswahrscheinlichkeit: Mittel.
- Auswirkung: Lokale Demo kann fehlschlagen oder unerwartete Kosten auslösen.
- Betroffene Bereiche: `OPENROUTER/`, Kosten- und Datenschutzbewertung.
- Absicherung oder nächste Maßnahme: Vor produktiver Nutzung aktuelle
  OpenRouter-Dokumentation prüfen, Kostenlimit definieren und keine sensiblen
  Daten in Testprompts verwenden.

## Frühere verschachtelte Git-Struktur

- Risiko: Die frühere innere Git-Historie von `PROJEKT/DOKUMENTATION/` könnte
  mit dem neuen Root-Git verwechselt werden.
- Eintrittswahrscheinlichkeit: Niedrig.
- Auswirkung: Alte Doku-Historie wird nicht automatisch mit dem Root-Git
  fortgeführt.
- Betroffene Bereiche: Projektroot, Projektdokumentation.
- Absicherung oder nächste Maßnahme: Die alte Doku-Historie liegt gesichert
  unter `PROJEKT/BACKUPS/dokumentation-git-backup-2026-06-07.git/`; künftig ist
  das Root-Git die aktive Versionierung.
