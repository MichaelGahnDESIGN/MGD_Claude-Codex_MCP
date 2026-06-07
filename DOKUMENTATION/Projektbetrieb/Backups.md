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

## 2026-06-07 - Sauberes Projektbackup nach Playwright-Audit

- Datum: `2026-06-07`
- Backup-Name oder Pfad:
  `BACKUPS/2026-06-07_06-58-56_v0.2.0_461a86b.zip`
- Prüfsumme:
  `ee514688bc3c5ea2f1f4518b96da9165b3cd9329f0cb631620886442573963f3`
- Gesicherter Stand: Git-Commit `461a86b`, Version `0.2.0`.
- Umfang: 242 versionierte Dateien aus `HEAD`.
- Anlass: Sauberes lokales Backup nach erfolgreichem Playwright-MCP-Audit und
  Push auf GitHub.
- Sicherheitsprüfung: Das Archiv wurde aus `git archive HEAD` erzeugt. Dadurch
  sind `.git`, `node_modules`, lokale Agenten-Kommunikation, Testreports,
  Logs, echte `.env`-Dateien und andere ignorierte Laufzeit-Artefakte nicht
  enthalten. Die enthaltene `.env.example` ist eine sichere Beispieldatei.
- Wiederherstellungsweg:
  1. ZIP-Datei an einen sicheren Ort kopieren.
  2. Bei Bedarf entpacken:
     `unzip BACKUPS/2026-06-07_06-58-56_v0.2.0_461a86b.zip -d /zielordner`
  3. Prüfsumme vergleichen:
     `shasum -a 256 BACKUPS/2026-06-07_06-58-56_v0.2.0_461a86b.zip`
  4. Dev-Abhängigkeiten im Workspace neu installieren:
     `npm --prefix PROJEKT/WORKSPACE install`

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
