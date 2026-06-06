# Backups

Hier werden angelegte Backups dokumentiert.

Pro Eintrag festhalten:

- Datum
- Backup-Name oder Pfad
- gesicherter Stand
- Anlass
- Wiederherstellungsweg

## Aktueller Stand

Aktuell enthält die Vorlage keine versionierten Backup-Artefakte.

`BACKUPS/` bleibt als lokaler Ablageort erhalten. Reale Sicherungen sollen dort
bewusst abgelegt und hier dokumentiert werden. Die Inhalte von `BACKUPS/`
bleiben standardmäßig durch die Root-`.gitignore` lokal.

## 2026-06-07 - Temporäre Doku-Git-Historie entfernt

- Datum: `2026-06-07`
- Backup-Name oder Pfad: temporäres lokales Doku-Git-Backup
- Gesicherter Stand: frühere innere Git-Historie von `DOKUMENTATION/`
- Anlass: Das Backup war nur während der Umstellung auf ein sauberes
  Root-Git-Repository hilfreich.
- Ergebnis: Das Backup wurde nach der Bereinigung entfernt, damit keine
  temporäre lokale Historie in künftige Projektkopien gelangt.
- Wiederherstellungsweg: Nicht vorgesehen. Die relevante aktuelle Historie liegt
  im Root-Git-Repository.
