# FAQ

## Ist Claude-Codex-MCP ein Cloud-Dienst?

Nein. Phase 1 ist lokal-first. Der MCP läuft auf dem Rechner oder Server, auf
dem er gestartet wird.

## Läuft das über GitHub?

GitHub verteilt den Code, die Dokumentation und später Releases. Der laufende
MCP-Prozess läuft nicht auf GitHub.

## Läuft das über all-inkl?

Nein, nicht in Phase 1. all-inkl wäre nur für eine Website, Dokumentation oder
einen späteren optionalen Remote-Dienst relevant.

## Warum gibt es Markdown und JSON?

Markdown bleibt für Menschen lesbar. JSON ist für strukturierte Tool-Aufrufe
zuverlässiger. Der Server hält beide Dateien synchron.

## Kann ich bestehende `AI_COMMS.md`-Dateien importieren?

Noch nicht automatisch. Ein Import alter Kommunikationsdateien ist für eine
spätere Version geplant.

## Warum ist das Repository aktuell privat?

Weil das Projekt erst getestet und gehärtet werden soll. Öffentlich wird es
erst, wenn Tests, Sicherheit, Dokumentation und echte Integrationen geprüft
sind.

## Kann das Projekt später öffentlich werden?

Ja. Geplant ist ein öffentlicher GitHub-Stand und später optional ein NPM-Paket.
Der Standardbetrieb soll trotzdem lokal bleiben.

## Speichert das System sensible Daten?

Es soll keine sensiblen Daten speichern. Schreibende Tools nutzen einen
Safety-Check gegen offensichtliche Muster. Trotzdem müssen Menschen und Agenten
sensible Daten aktiv vermeiden.

## Was passiert, wenn der Safety-Check anschlägt?

Der Schreibvorgang wird blockiert und es wird ein Fehler zurückgegeben. Der
Inhalt wird nicht in `agent_comms.md` oder `agent_comms.state.json`
geschrieben.

## Braucht Phase 1 NPM-Abhängigkeiten?

Nein. Phase 1 ist dependency-frei umgesetzt und nutzt Node.js-Funktionen.

## Was ist für die öffentliche Freigabe noch nötig?

Mindestens:

- echte Codex-/Claude-Integration testen
- Safety-Regeln prüfen
- Dokumentation gegenlesen
- Repository auf sensible Daten prüfen
- Release-Prozess definieren
- optional NPM-Veröffentlichung vorbereiten
