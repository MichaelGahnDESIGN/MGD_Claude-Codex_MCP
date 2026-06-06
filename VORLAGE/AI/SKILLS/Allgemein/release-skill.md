---
name: release-skill
description: Use when a project needs a full release workflow with version update, detailed documentation update, backup creation, backup rotation, Git review, optional push, and deployment by the documented project method.
---

# Release Skill

## Einsatz

Nutze diesen Skill, wenn ein neuer Stand sauber vorbereitet, dokumentiert, versioniert, gesichert und veröffentlicht werden soll.

Nutze ihn nicht für kleine Einzelkorrekturen ohne Release-Charakter.

## Vorbedingungen

Vor dem Start prüfen:

- aktuelle Versionslogik
- Dateien mit Versionsangaben
- relevante Doku-Dateien
- Backup-Struktur in `BACKUPS/`
- Git-Status, falls Git genutzt wird
- dokumentierte Deployment-Methode
- Ausschlüsse für Backup oder Deployment

Wenn diese Grundlagen unklar sind, zuerst `VORLAGE/AI/AGENTEN/AGENTS.md`, `VORLAGE/AI/PROJEKTREGELN/PROJEKTREGELN.md` und `DOKUMENTATION/` prüfen.

## Grundregeln

- nie deployen ohne vorheriges Backup
- nie Versionsnummern ändern ohne passende Doku
- nie alte Backups löschen, bevor das neue Backup sicher erstellt wurde
- nie Commit oder Push ohne Prüfung der geänderten Dateien
- nie eine Deployment-Methode erfinden, wenn schon eine dokumentiert ist

## Standardablauf

1. Projektzustand analysieren.
2. Versionsnummer konsistent aktualisieren.
3. `DOKUMENTATION/Projektbetrieb/Versionen.md` und weitere relevante Doku aktualisieren.
4. neues Backup in `BACKUPS/` erstellen.
5. nur die vier neuesten Backups behalten.
6. Git-Änderungen prüfen und sauber committen, falls Git Teil des Projekts ist.
7. nur auf den vorgesehenen Remote oder Branch pushen.
8. ausschliesslich mit der dokumentierten Methode deployen.

## Backup-Regel

Bevorzugtes Format, sofern das Projekt nichts anderes vorgibt:

- `BACKUPS/YYYY-MM-DD_HH-mm-ss_vVERSION`
- oder `BACKUPS/YYYY-MM-DD_HH-mm-ss_vVERSION.zip`

## Ergebnisbericht

Nach Abschluss knapp dokumentieren:

- alte und neue Version
- geänderte Dateien
- aktualisierte Doku-Dateien
- neues Backup
- gelöschte Alt-Backups
- Commit-Message und Push-Status
- Deployment-Weg
- Warnungen oder offene Punkte

## Sperre bei Unsicherheit

Wenn Versionsquellen, Backup-Weg, Branch-Strategie oder Deployment unklar sind, darf kein riskanter Release-Schritt auf blosser Vermutung erfolgen.
