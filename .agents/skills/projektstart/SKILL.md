---
name: projektstart
description: Nutze diesen Skill, wenn ein neues Projekt aus dieser Vorlage eingerichtet, umbenannt, initial dokumentiert oder für Claude Code, Claude Cowork und ChatGPT Codex vorbereitet werden soll.
---

# Projektstart Aus Vorlage

Dieser Skill richtet eine neue Projektkopie sauber ein.

## Ablauf

1. Lies zuerst `codex.md`, `VORLAGE/REGELN/GRUNDREGELN.md` und
   `VORLAGE/AI/PROJEKTREGELN/PROJEKTREGELN.md`.
2. Prüfe, ob `OPENROUTER/` separat bleiben soll. Standard: ja.
3. Fülle den konkreten Arbeitskontext in
   `VORLAGE/AI/PROJEKTREGELN/ARBEITSKONTEXT.md`.
4. Dokumentiere Freigaben und harte Grenzen in
   `VORLAGE/AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md`.
5. Lege neuen Projektcode ausschließlich in `PROJEKT/WORKSPACE/` an.
6. Halte `DOKUMENTATION/` für Vorlagen- und Entwicklungsdoku aktuell.
7. Wenn in `PROJEKT/WORKSPACE/` ein echtes Produkt entsteht, lege zusätzlich
   `PROJEKT/WORKSPACE/DOKUMENTATION/` an.
8. Prüfe `.env`, Tokens und personenbezogene Daten bewusst, bevor Dateien
   versioniert oder ausgegeben werden.

## Ergebnis

Am Ende sollen Projektname, Ziel, Status, technischer Rahmen, Risiken,
offene Punkte und Setup-Hinweise nachvollziehbar dokumentiert sein.
