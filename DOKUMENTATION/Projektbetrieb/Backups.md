# Backups

Hier werden angelegte Backups dokumentiert.

Pro Eintrag festhalten:

- Datum
- Backup-Name oder Pfad
- gesicherter Stand
- Anlass
- Wiederherstellungsweg

## 2026-06-07 - Doku-Git-Historie gesichert

- Datum: `2026-06-07`
- Backup-Name oder Pfad: `BACKUPS/dokumentation-git-backup-2026-06-07.git/`
- Gesicherter Stand: frühere innere Git-Historie von `DOKUMENTATION/`
- Anlass: Die Vorlage soll als sauberes Root-Git-Repository funktionieren,
  ohne verschachteltes aktives Git-Repository in der Dokumentation.
- Wiederherstellungsweg: Backup-Ordner bei Bedarf wieder nach
  `DOKUMENTATION/.git` verschieben, bevor Git-Operationen auf der alten
  Doku-Historie ausgeführt werden.
