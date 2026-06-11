# Versionen

Startversion dieser Vorlage pro neuem Projekt:

- Datum: `YYYY-MM-DD`
- Version: `0.0.1`
- Beschreibung: `Projektstart / Vorlage übernommen`
- Begründung: `Initialer Projektstand`
- Betroffene Bereiche: `Grundstruktur`
- Rücknahme oder Wiederherstellung: `Aus Vorlage erneut erzeugbar`

## 0.2.2 - Eingabevalidierung und Protokollhärtung

- Datum: `2026-06-11`
- Version: `0.2.2`
- Beschreibung: Erlaubte Task-Statuswerte, Task-Typen, Prioritäten und
  Chat-Arten werden zentral geführt. Die MCP-Tools validieren diese Werte vor
  dem Schreiben und melden verständliche Fehler, wenn ein Client unbekannte
  Werte sendet. Zusätzlich wurde `/comm` als neutraler universeller
  Agenten-Befehl vorbereitet.
- Begründung: Das Protokoll soll nicht nur dokumentiert sein, sondern im
  laufenden MCP-Server zuverlässig durchgesetzt werden.
- Betroffene Bereiche: `VERSION`, `README.md`, `CHANGELOG.md`,
  `PROJEKT/WORKSPACE/package.json`, `PROJEKT/WORKSPACE/package-lock.json`,
  `PROJEKT/WORKSPACE/src/domain/`, `PROJEKT/WORKSPACE/src/tools/`,
  `PROJEKT/WORKSPACE/src/setup/`, `PROJEKT/WORKSPACE/tests/setup/`,
  `PROJEKT/WORKSPACE/tests/tools/`, `.claude/commands/`, Wiki-Dokumentation.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Bei Bedarf
  können die Validatoren entfernt werden, dann würden Clients wieder beliebige
  Texte für feste Protokollfelder schreiben.

## 0.2.1 - Einfacher Setup-Assistent

- Datum: `2026-06-07`
- Version: `0.2.1`
- Beschreibung: Ein lokaler Setup-Assistent wurde ergänzt. Er kann mit
  `npm run setup` gestartet werden, fragt Nicht-Programmierer nach den
  wichtigsten Angaben und erzeugt Kommunikationsdateien sowie fertige
  Einrichtungshilfen für Codex, Claude Code und Claude Cowork. Zusätzlich kann
  lokal ein macOS-CLI-DMG-Testpaket gebaut werden. Der DMG-Setup-Start öffnet
  am Ende sichtbar die deutsche Anleitung und den Hilfe-Ordner. Ein eigenes
  `Impressum.md` im Root hält die Anbieterangaben zusätzlich zur README bereit.
- Begründung: Die bisherige Einrichtung war noch stark terminal- und
  pfadorientiert. Der neue Assistent reduziert manuelle Schritte und macht die
  lokale Nutzung verständlicher.
- Betroffene Bereiche: `VERSION`, `README.md`, `CHANGELOG.md`,
  `Impressum.md`,
  `PROJEKT/WORKSPACE/src/setup/`, `PROJEKT/WORKSPACE/tests/setup/`,
  `PROJEKT/WORKSPACE/src/scripts/`, `PROJEKT/WORKSPACE/package.json`, Wiki-
  und Projektbetrieb-Dokumentation.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Der
  Assistent kann entfernt werden, ohne den eigentlichen MCP-Server zu verändern.

## 0.0.2 - Struktur- und Sicherheitsbereinigung

- Datum: `2026-06-07`
- Version: `0.0.2`
- Beschreibung: Projektidentität ergänzt, Git am Root initialisiert,
  OpenRouter-Demo als separater Bereich dokumentiert und Sicherheitsregeln für
  lokale Secrets geschärft. Die frühere innere Git-Historie der
  Projektdokumentation wurde gesichert, damit die Vorlage als ein sauberes
  Root-Repository funktioniert. Zusätzlich wurden Tool-Adapter für Claude Code,
  Claude Cowork und ChatGPT Codex ergänzt.
- Begründung: Die Vorlage enthielt noch Platzhalter und die Trennung zwischen
  `PROJEKT/WORKSPACE/` und `DEMOS/OPENROUTER/` war nicht eindeutig dokumentiert.
- Betroffene Bereiche: Projektroot, `VORLAGE/AI/PROJEKTREGELN/`,
  `DOKUMENTATION/`, `BACKUPS/`, `.claude/`, `.codex/`,
  `.agents/skills/`, `VORLAGE/AI/TOOLING/`, `DEMOS/OPENROUTER/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Bei Bedarf
  können die geänderten Dokumentationsdateien auf den vorherigen Stand
  zurückgeführt werden.

## 0.0.3 - Zentrale Start- und Orientierungsdokumentation

- Datum: `2026-06-07`
- Version: `0.0.3`
- Beschreibung: Eine zentrale, gut lesbare Orientierung für Menschen und
  KI-Agenten wurde unter
  `DOKUMENTATION/Informationen/Start_und_Orientierung.md` ergänzt und in den
  Root-Einstiegen verlinkt.
- Begründung: Die Vorlage soll als kopierbarer Projektstart schneller
  verständlich, nutzerfreundlicher und für KI-Agenten eindeutiger sein.
- Betroffene Bereiche: `index.md`, `AGENTS.md`, `claude.md`,
  `DOKUMENTATION/Informationen/`, `DOKUMENTATION/Dokumentation-Skills/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Die Datei
  kann entfernt werden, wenn eine andere zentrale Übersichtsstruktur eingeführt
  wird.

## 0.0.4 - Finale Vorlagenbereinigung

- Datum: `2026-06-07`
- Version: `0.0.4`
- Beschreibung: Lokale Artefakte wurden entfernt, damit neue Projekte keine
  unnötigen Abhängigkeiten, Secrets, temporären Backups oder veralteten
  Strukturhinweise übernehmen. Entfernt wurden unter anderem
  `DEMOS/OPENROUTER/node_modules/`, `DEMOS/OPENROUTER/.env`, das temporäre
  Doku-Git-Backup und eine alte Historien-Datei.
- Begründung: Die Vorlage soll als sauberer, sicherer und direkt kopierbarer
  Startpunkt für Claude Code, Claude Cowork und ChatGPT Codex dienen.
- Betroffene Bereiche: `DEMOS/OPENROUTER/`, `BACKUPS/`, `VORLAGE/`,
  `DOKUMENTATION/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Gelöschte
  lokale Abhängigkeiten können mit `npm --prefix DEMOS/OPENROUTER install`
  erneut erzeugt werden.

## 1.0.1 - Öffentliche GitHub-Vorlage

- Datum: `2026-06-07`
- Version: `1.0.1`
- Beschreibung: Die Vorlage wurde für die öffentliche Bereitstellung als
  GitHub-Repository vorbereitet. Ergänzt wurden `README.md`, `LICENSE`,
  `CHANGELOG.md`, `VERSION`, GitHub-Workflow, Release-Konfiguration und
  Issue-Vorlagen. Lokale absolute Beispielpfade wurden entfernt.
- Begründung: Die Ordnerstruktur soll allgemein verständlich, herunterladbar
  und ohne private lokale Pfade als Vorlage nutzbar sein.
- Betroffene Bereiche: Root-Dateien, `.github/`, `DOKUMENTATION/`,
  `VORLAGE/AI/SKILLS/`, Dokumentationsgenerator.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Die
  GitHub-spezifischen Dateien können entfernt werden, wenn die Vorlage nicht
  öffentlich bereitgestellt werden soll.

### Ergänzung zu 1.0.1 - Claude-Code- und Sicherheitsverbesserung

- Datum: `2026-06-07`
- Version: `1.0.1`
- Beschreibung: `CLAUDE.md` als automatisch erkannter Claude-Code-Einstieg,
  `SECURITY.md` als Sicherheitsrichtlinie, vorbereitete GitHub-Wiki-Inhalte
  und eine klarere öffentliche Positionierung als KI-Projektordner-Vorlage
  wurden ergänzt.
- Begründung: Die Vorlage soll für Anwender praktischer, sicherer und
  tool-kompatibler sein.
- Betroffene Bereiche: Root-Dateien, README, GitHub-Workflow,
  Dokumentationsgenerator, Start- und Orientierungsdokumentation,
  `DOKUMENTATION/GitHub-Wiki/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar.

## 1.1.0 - Lokales Agenten-Kommunikations-MCP Phase 1

- Datum: `2026-06-07`
- Version: `1.1.0`
- Beschreibung: Im Workspace wurde ein lokales MCP-System für Aufgaben, Chat,
  Blocker, Entscheidungen, Übergaben, Done-Bereich, History und Safety-Check
  umgesetzt. Die erste Version nutzt dateibasierten Speicher mit
  `agent_comms.md` und `agent_comms.state.json`.
- Begründung: Die bewährte Zusammenarbeit über eine gemeinsame
  Agenten-Kommunikationsdatei soll als wiederverwendbares lokales Werkzeug für
  Codex, Claude und weitere Agenten verfügbar werden.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/src/`,
  `PROJEKT/WORKSPACE/tests/`, `PROJEKT/WORKSPACE/docs/`,
  `PROJEKT/WORKSPACE/examples/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Da der
  Server keine externen Laufzeitdienste verwendet, kann die Phase-1-Umsetzung
  durch Entfernen der Workspace-Dateien rückgängig gemacht werden.

## 0.2.0 - GitHub-Projektstand Claude-Codex-MCP

- Datum: `2026-06-07`
- Version: `0.2.0`
- Beschreibung: Das Repository wurde für das GitHub-Projekt
  `MichaelGahnDESIGN/Claude-Codex-MCP` vorbereitet. Die Root-README erklärt nun
  ausführlich Zweck, lokale Nutzung, MCP-Tools, Sicherheit, Tests,
  Dokumentation, Roadmap und geplanten Veröffentlichungsweg.
- Begründung: Das Projekt soll für weitere Nutzer verständlich werden und nicht
  nur als interne lokale Arbeitsgrundlage dienen.
- Betroffene Bereiche: `README.md`, `VERSION`, `CHANGELOG.md`,
  `PROJEKT/WORKSPACE/package.json`, `PROJEKT/WORKSPACE/src/mcp/createServer.ts`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Die README
  kann bei Bedarf auf einen stärker vorlagenorientierten Text zurückgeführt
  werden.

### Ergänzung zu 0.2.0 - Interne Wiki-Dokumentation

- Datum: `2026-06-07`
- Version: `0.2.0`
- Beschreibung: Eine ausführliche interne Wiki-Dokumentation für
  `Claude-Codex-MCP` wurde unter `DOKUMENTATION/GitHub-Wiki/` vorbereitet.
  Enthalten sind
  Schnellstart, Architektur, Betrieb, MCP-Tools, Agenten-Workflows,
  Integrationen, Sicherheit, Tests, Roadmap und Freigabecheckliste.
- Begründung: Das Projekt soll vor der öffentlichen Freigabe intern sauber
  testbar und verständlich dokumentiert sein. Das echte GitHub-Wiki ist im
  privaten Repository aktuell nicht verfügbar.
- Betroffene Bereiche: `DOKUMENTATION/GitHub-Wiki/`, private
  Repository-Dokumentation.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar.

### Ergänzung zu 0.2.0 - Zwei-Agenten-Demo und Codex-Registrierung

- Datum: `2026-06-07`
- Version: `0.2.0`
- Beschreibung: Ein Zwei-Agenten-Integrationstest, ein lokales Demo-Skript,
  ein stabiles MCP-Startskript und Beispielkonfigurationen für Codex und Claude
  wurden ergänzt. Codex wurde lokal als MCP-Client für
  `claude-codex-mcp` registriert.
- Begründung: Die Zusammenarbeit zwischen Codex und Claude soll praktisch
  nachvollziehbar und nicht nur theoretisch dokumentiert sein.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/bin/`,
  `PROJEKT/WORKSPACE/src/scripts/`, `PROJEKT/WORKSPACE/tests/integration/`,
  `PROJEKT/WORKSPACE/examples/mcp-configs/`,
  `PROJEKT/WORKSPACE/docs/`.
- Rücknahme oder Wiederherstellung: Lokale Codex-Registrierung kann mit
  `codex mcp remove claude-codex-mcp` entfernt werden. Repository-Änderungen
  sind über Git-Diff nachvollziehbar.

### Ergänzung zu 0.2.0 - Öffentliche README bereinigt

- Datum: `2026-06-07`
- Version: `0.2.0`
- Beschreibung: Vertrauliche Herkunftsreferenzen wurden aus README,
  Workspace-Dokumentation und interner Wiki-Quelle entfernt. Die Root-README
  enthält nun außerdem ein Impressum.
- Begründung: Das Projekt soll privat vorbereitet und erst später öffentlich
  freigegeben werden, ohne interne Produktinformationen offenzulegen.
- Betroffene Bereiche: `README.md`, `CHANGELOG.md`,
  `PROJEKT/WORKSPACE/docs/`, `DOKUMENTATION/GitHub-Wiki/`,
  `DOKUMENTATION/Informationen/`, `DOKUMENTATION/Projektbetrieb/`.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Das
  Impressum kann bei geänderter Veröffentlichungsstrategie angepasst werden.

### Ergänzung zu 0.2.0 - Playwright-Audit und JSON-Parse-Fehler

- Datum: `2026-06-07`
- Version: `0.2.0`
- Beschreibung: Ein Playwright-Audit startet den MCP als echten stdio-Prozess
  und prüft Protokollfehler. Dabei wurde behoben, dass fehlerhaftes JSON oder
  ungültige JSON-RPC-Requests den MCP-Prozess beenden konnten. Der Server
  antwortet nun mit JSON-RPC-Protokollfehlern und bleibt empfangsbereit.
- Begründung: Codex und Claude sollen den MCP robust nutzen können, auch wenn
  ein Client einmal eine beschädigte JSON-Zeile sendet.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/src/mcp/`,
  `PROJEKT/WORKSPACE/tests/playwright/`, `PROJEKT/WORKSPACE/package.json`,
  `PROJEKT/WORKSPACE/package-lock.json`, Dokumentation.
- Rücknahme oder Wiederherstellung: Über Git-Diff nachvollziehbar. Ohne
  Playwright-Audit bliebe der Fehler nur manuell prüfbar.
