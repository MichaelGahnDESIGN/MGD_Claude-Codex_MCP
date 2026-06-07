# Konzept und Architektur

## Ziel

Claude-Codex-MCP soll ein kleines, lokales MCP-System bereitstellen, mit dem
mehrere KI-Agenten über ein gemeinsames Aufgaben-, Chat- und Übergabeprotokoll
zusammenarbeiten.

Das System ist bewusst nicht als großes Cloud-Produkt gestartet. Phase 1 soll
ein stabiles lokales Fundament schaffen.

## Ausgangsidee

Im Projekt TINTLING hat sich eine Datei `AI_COMMS.md` als gemeinsamer Chat
zwischen Claude und Codex bewährt. Das war einfach, verständlich und schnell.

Die Schwächen:

- Statuswerte sind nicht zuverlässig maschinenlesbar.
- Aufgaben müssen manuell gepflegt werden.
- Done-Bereich, Blocker und Übergaben können uneinheitlich werden.
- Safety-Prüfungen fehlen.

Claude-Codex-MCP übernimmt die gute Markdown-Idee und ergänzt strukturierte
Tools.

## Kernkomponenten

```text
src/
├── domain/
├── markdown/
├── mcp/
├── safety/
├── storage/
└── tools/
```

## Domain

`src/domain/` enthält die fachliche Logik:

- Aufgaben erstellen
- Aufgaben übernehmen
- Aufgaben abschließen
- Chat ergänzen
- Blocker setzen und lösen
- Entscheidungen dokumentieren
- Übergaben schreiben
- Runde zurücksetzen

Die Domain-Funktionen arbeiten mit einem strukturierten State und sind separat
testbar.

## Storage

`src/storage/` lädt und speichert:

- `agent_comms.state.json`
- `agent_comms.md`

Der JSON-State ist die technische Quelle. Markdown wird daraus gerendert.

## Markdown

`src/markdown/` erzeugt die menschenlesbare Datei.

Das Ziel ist:

- klar lesbare Abschnitte
- stabile Reihenfolge
- Aufgabenstatus schnell erfassbar
- Done-Bereich nachvollziehbar
- Chat, Blocker und Entscheidungen ohne Tool nutzbar

## Safety

`src/safety/` prüft Inhalte vor Schreibvorgängen.

Blockiert werden offensichtliche Muster wie:

- `.env`
- API-Key-Hinweise
- private Schlüssel
- Passwort-Zuweisungen
- Token-Zuweisungen
- Datenbank-URLs
- SSH-Schlüsselmaterial
- Dump-/Backup-Hinweise

## Tools

`src/tools/` verbindet Domain, Storage und Safety.

Schreibende Tools:

1. prüfen Eingabeform
2. führen Safety-Check aus
3. laden State
4. wenden Domain-Änderung an
5. speichern JSON und Markdown
6. geben JSON-Ergebnis zurück

## MCP-Server

`src/mcp/` enthält einen kleinen JSON-RPC/MCP-Server über stdio.

Phase 1 nutzt bewusst eine schlanke Implementierung ohne externe Abhängigkeit.
Das offizielle MCP-SDK kann später geprüft und ergänzt werden.

## Datenfluss

```text
MCP Client
   ↓ tools/call
Tool Handler
   ↓ Safety + Eingabeprüfung
Domain-Funktion
   ↓ neuer State
FileStorage
   ↓
agent_comms.state.json
agent_comms.md
```

## Warum Lokal-first?

Agenten-Kommunikation kann vertrauliche Projektinformationen enthalten.
Darum ist lokal-first die sicherste Ausgangslage.

Ein Remote-Betrieb ist später möglich, muss aber gesondert geplant werden.
