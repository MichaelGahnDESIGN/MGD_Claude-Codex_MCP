---
name: dokumentation
description: Nutze diesen Skill, wenn Dokumentation, Changelog, Risiken, Setup, Deployment oder die HTML-Dokumentationsübersicht dieser Projektvorlage aktualisiert werden sollen.
---

# Dokumentation Pflegen

Dieser Skill hält die Dokumentation der Vorlage und eines konkreten
Workspace-Projekts konsistent.

## Ablauf

1. Lies `DOKUMENTATION/SKILL.md`.
2. Sortiere neue Informationen in passende Unterordner ein.
3. Dokumentiere Entscheidungen in
   `DOKUMENTATION/Informationen/Entscheidungen.md`.
4. Dokumentiere Risiken in
   `DOKUMENTATION/Informationen/Risiken.md`.
5. Dokumentiere Versionsstände in
   `DOKUMENTATION/Projektbetrieb/Versionen.md`.
6. Aktualisiere bei Strukturänderungen die generierten Dokumentationsdaten:

```bash
python3 DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py
```

7. Prüfe danach Git-Status, Platzhalter und sensible Dateien.

## Ergebnis

Die Dokumentation soll so geschrieben sein, dass auch Nicht-Programmierer
verstehen, was geändert wurde, warum es wichtig ist und welche offenen Punkte
bleiben.
