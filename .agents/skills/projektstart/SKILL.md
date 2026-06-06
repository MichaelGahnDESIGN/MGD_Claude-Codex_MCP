---
name: projektstart
description: Nutze diesen Skill, wenn ein neues Projekt aus dieser Vorlage eingerichtet, umbenannt, initial dokumentiert oder für Claude Code, Claude Cowork und ChatGPT Codex vorbereitet werden soll.
---

# Projektstart Aus Vorlage

Dieser Skill richtet eine neue Projektkopie sauber ein.

## Ablauf

1. Lies zuerst `AGENTS.md`, `GRUNDREGELN.md` und
   `AI/PROJEKTREGELN/PROJEKTREGELN.md`.
2. Prüfe, ob `OPENROUTER/` separat bleiben soll. Standard: ja.
3. Fülle den konkreten Arbeitskontext in
   `AI/PROJEKTREGELN/ARBEITSKONTEXT.md`.
4. Dokumentiere Freigaben und harte Grenzen in
   `AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md`.
5. Lege neuen Projektcode ausschließlich in `WORKSPACE/` an.
6. Halte `PROJEKT/DOKUMENTATION/` für Vorlagen- und Entwicklungsdoku aktuell.
7. Wenn in `WORKSPACE/` ein echtes Produkt entsteht, lege zusätzlich
   `WORKSPACE/DOKUMENTATION/` an.
8. Prüfe `.env`, Tokens und personenbezogene Daten bewusst, bevor Dateien
   versioniert oder ausgegeben werden.

## Ergebnis

Am Ende sollen Projektname, Ziel, Status, technischer Rahmen, Risiken,
offene Punkte und Setup-Hinweise nachvollziehbar dokumentiert sein.
