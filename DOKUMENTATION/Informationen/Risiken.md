# Risiken

Hier werden bekannte Risiken und Unsicherheiten dokumentiert.

Pro Eintrag festhalten:

- Risiko
- Eintrittswahrscheinlichkeit
- Auswirkung
- betroffene Bereiche
- Absicherung oder nächste Maßnahme

## OpenRouter-API und Modellverfügbarkeit

- Risiko: Modell-IDs, Preise, Provider, Limits oder Verfügbarkeit bei
  OpenRouter können sich ändern.
- Eintrittswahrscheinlichkeit: Mittel.
- Auswirkung: Lokale Demo kann fehlschlagen oder unerwartete Kosten auslösen.
- Betroffene Bereiche: `DEMOS/OPENROUTER/`, Kosten- und Datenschutzbewertung.
- Absicherung oder nächste Maßnahme: Vor produktiver Nutzung aktuelle
  OpenRouter-Dokumentation prüfen, Kostenlimit definieren und keine sensiblen
  Daten in Testprompts verwenden.

## Frühere verschachtelte Git-Struktur

- Risiko: Die frühere innere Git-Historie von `DOKUMENTATION/` könnte
  mit dem neuen Root-Git verwechselt werden.
- Eintrittswahrscheinlichkeit: Niedrig.
- Auswirkung: Alte Einzelhistorie der Dokumentation ist nicht mehr separat
  verfügbar.
- Betroffene Bereiche: Projektroot, Projektdokumentation.
- Absicherung oder nächste Maßnahme: Das Root-Git ist die aktive und
  maßgebliche Versionierung. Relevante Strukturänderungen werden zusätzlich in
  Entscheidungen, Versionen und Backups dokumentiert.

## Lokaler Paketmanager auf Workspace-Volume

- Risiko: NPM-Installationen auf dem aktuellen Workspace-Volume können hängen
  oder unvollständige `node_modules`-Zustände erzeugen.
- Eintrittswahrscheinlichkeit: Mittel.
- Auswirkung: Abhängigkeiten könnten beschädigt werden oder ungetrackte
  Entwicklungsdateien während eines abgebrochenen Installationslaufs entfernen.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/`, lokale Tests,
  spätere SDK-Integration.
- Absicherung oder nächste Maßnahme: Der MCP-Server nutzt keine externen
  Laufzeitabhängigkeiten. Playwright ist als Dev-Abhängigkeit mit Lockfile
  dokumentiert. Vor späterer SDK-Nutzung zuerst Paketinstallation und Lockfile
  in einem isolierten Testlauf prüfen.

## Safety-Check ist kein vollständiger DLP-Ersatz

- Risiko: Der lokale Safety-Check erkennt offensichtliche Secrets, kann aber
  nicht alle personenbezogenen Daten oder vertraulichen Inhalte sicher finden.
- Eintrittswahrscheinlichkeit: Mittel.
- Auswirkung: Agenten könnten trotz Prüfung sensible Inhalte in Markdown oder
  JSON-State eintragen.
- Betroffene Bereiche: `agent_comms.md`, `agent_comms.state.json`, Aufgaben,
  Chat, Logs und Übergaben.
- Absicherung oder nächste Maßnahme: Agentenregeln und Dokumentation betonen
  Datenminimierung. Sensible Details sollen als neutraler Blocker beschrieben
  statt gespeichert werden.

## Lokale State-Dateien und parallele MCP-Prozesse

- Risiko: Mehrere MCP-Prozesse könnten denselben State gleichzeitig ändern;
  Prozessabbruch oder Dateisystemfehler können außerdem die Aktualisierung der
  beiden abgeleiteten Dateien unterbrechen.
- Eintrittswahrscheinlichkeit: Niedrig nach Einführung des prozessübergreifenden
  Locks; bei atypischen Dateisystemen weiterhin zu prüfen.
- Auswirkung: Review-, Aufgaben- oder Chat-Änderungen könnten fehlen oder die
  Markdown-Datei könnte bis zum nächsten Speichern hinter dem JSON-State liegen.
- Betroffene Bereiche: `agent_comms.state.json`, `agent_comms.md`,
  `PROJEKT/WORKSPACE/src/storage/FileStorage.ts`.
- Absicherung oder nächste Maßnahme: Read-Modify-Write wird mit einem exklusiven
  Lock serialisiert. Verwaiste Locks werden über die Prozess-ID behandelt;
  Dateien werden per temporärer Datei und Rename ersetzt. Tests prüfen
  konkurrierende Updates über mehrere Storage-Instanzen. Für Remote- und
  Mehrbenutzerbetrieb bleibt ein transaktionsfähiges Backend erforderlich.

## GitHub-Wiki ist im privaten Repository nicht verfügbar

- Risiko: GitHub stellt Wikis für dieses private Repository im aktuellen Setup
  nur nach Upgrade oder nach öffentlicher Freigabe bereit.
- Eintrittswahrscheinlichkeit: Aktuell eingetreten.
- Auswirkung: Die ausführlichen Wiki-Seiten können zunächst nicht im echten
  GitHub-Wiki erscheinen.
- Betroffene Bereiche: GitHub-Wiki, öffentliche/private Dokumentation,
  Freigabeprozess.
- Absicherung oder nächste Maßnahme: Wiki-Inhalte im Hauptrepository unter
  `DOKUMENTATION/GitHub-Wiki/` versionieren. Nach öffentlicher Freigabe oder
  Upgrade können die Seiten in das echte GitHub-Wiki gespiegelt werden.
