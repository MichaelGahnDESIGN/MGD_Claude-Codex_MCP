# Freigabe zur Veröffentlichung

Das Repository bleibt zunächst privat.

Öffentlich wird es erst, wenn alles getestet ist und funktioniert.

## Hinweis Zum GitHub-Wiki

Im aktuellen privaten Repository ist das echte GitHub-Wiki nicht verfügbar.
GitHub zeigt in den Repository-Einstellungen:

```text
Upgrade or make this repository public to enable Wikis
```

Darum werden die Wiki-Inhalte bis zur Freigabe als normale Markdown-Dateien im
Repository gepflegt:

```text
DOKUMENTATION/GitHub-Wiki/
```

Diese Lösung ist für die private Testphase sogar besser nachvollziehbar, weil
alle Dokumentationsänderungen zusammen mit dem Code versioniert werden.

## Warum Privat Bleiben?

Das Projekt ist noch jung. Vor einer öffentlichen Freigabe müssen Technik,
Dokumentation und Sicherheit belastbar geprüft werden.

Besonders wichtig:

- keine sensiblen Daten im Repository
- keine privaten Pfade mit vertraulichem Kontext
- keine halbfertige Installationsanleitung
- keine falschen Sicherheitsversprechen
- klare Erklärung des Lokal-first-Betriebs

## Freigabe-Checkliste

Vor `public` müssen diese Punkte erledigt sein:

- [ ] `npm --prefix PROJEKT/WORKSPACE run check` läuft grün.
- [ ] Codex kann das MCP lokal starten und Tools nutzen.
- [ ] Claude kann das MCP lokal starten und Tools nutzen.
- [ ] `create_task`, `claim_task`, `complete_task` funktionieren im echten Client.
- [ ] `add_blocker` und `resolve_blocker` funktionieren im echten Client.
- [ ] `write_handoff` funktioniert im echten Client.
- [ ] Safety-Check blockiert offensichtliche Secrets.
- [ ] README ist für externe Nutzer verständlich.
- [ ] Interne Wiki-Dokumentation ist vollständig und verständlich.
- [ ] Beispiele enthalten keine sensiblen Daten.
- [ ] Git-Historie wurde auf sensible Inhalte geprüft.
- [ ] Repository-Settings sind geprüft.
- [ ] Lizenz ist passend.
- [ ] Version und Tag sind aktuell.

## Empfohlene Freigabestufen

### Stufe 1: Privat

Nur interne Tests und Dokumentation.

### Stufe 2: Private Tester

Einzelne Nutzer bekommen Zugriff auf das private Repository.

### Stufe 3: Öffentliche Beta

Repository wird öffentlich, aber klar als frühe Beta gekennzeichnet.
Ab diesem Zeitpunkt kann das echte GitHub-Wiki aktiviert und mit den
vorbereiteten Seiten befüllt werden.

### Stufe 4: Stabiler Release

NPM-Paket, Release Notes und stabile Integrationsanleitung.

## Sichtbarkeit Ändern

Die Sichtbarkeit darf erst geändert werden, wenn die Checkliste abgeschlossen
ist.

GitHub-CLI-Befehl für später:

```bash
gh repo edit MichaelGahnDESIGN/Claude-Codex-MCP \
  --visibility public \
  --accept-visibility-change-consequences
```

Dieser Befehl soll nicht ausgeführt werden, bevor die Freigabe erteilt wurde.
