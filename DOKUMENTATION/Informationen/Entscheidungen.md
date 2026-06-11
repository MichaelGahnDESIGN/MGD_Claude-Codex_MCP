# Entscheidungen

Hier werden wichtige fachliche, technische, organisatorische oder gestalterische Entscheidungen dokumentiert.

Jeder Eintrag soll mindestens enthalten:

- Datum
- Entscheidung
- Begründung
- betroffene Bereiche
- mögliche Folgen oder Trade-offs

## 2026-06-07 - OpenRouter bleibt separat

- Datum: `2026-06-07`
- Entscheidung: `DEMOS/OPENROUTER/` bleibt als separater Demo- und Testbereich im
  Projektroot.
- Begründung: Die OpenRouter-Demo ist kein eigentliches Projektartefakt im
  Sinne von `PROJEKT/WORKSPACE/`, sondern ein isolierter API-Testbereich.
- Betroffene Bereiche: `DEMOS/OPENROUTER/`, `PROJEKT/WORKSPACE/`,
  `VORLAGE/AI/PROJEKTREGELN/PROJEKTREGELN.md`, Projektdokumentation.
- Folgen oder Trade-offs: Die Trennung erleichtert Orientierung und verhindert
  Vermischung mit späteren Projektumsetzungen. Dafür muss in der Dokumentation
  klar sichtbar bleiben, warum `DEMOS/OPENROUTER/` außerhalb von `PROJEKT/WORKSPACE/` liegt.

## 2026-06-07 - Git am Projektroot initialisiert

- Datum: `2026-06-07`
- Entscheidung: Das Projektroot wird lokal mit Git versioniert.
- Begründung: Die Projektregeln verlangen nachvollziehbare Versionierung. Vorher
  existierte Git nur innerhalb von `DOKUMENTATION/`.
- Betroffene Bereiche: Projektroot, `.gitignore`, Dokumentationsabläufe.
- Folgen oder Trade-offs: Änderungen können künftig am Root nachvollzogen
  werden.

## 2026-06-07 - Verschachteltes Doku-Git bereinigt

- Datum: `2026-06-07`
- Entscheidung: Die innere Git-Historie von `DOKUMENTATION/` wurde aus der
  aktiven Vorlage entfernt.
- Begründung: Die Vorlage soll als ein sauberer Git-Root funktionieren und beim
  Kopieren neuer Projekte keine Embedded-Repository-Warnung erzeugen.
- Betroffene Bereiche: `DOKUMENTATION/`, `BACKUPS/`, Root-Git.
- Folgen oder Trade-offs: Die frühere isolierte Doku-Historie wird nicht mehr
  separat weitergeführt. Die relevante aktuelle Historie liegt im
  Root-Git-Repository.

## 2026-06-07 - Tool-Adapter für Agenten ergänzt

- Datum: `2026-06-07`
- Entscheidung: Die Vorlage erhält eigene Adapter für Claude Code, Claude
  Cowork und ChatGPT Codex.
- Begründung: Unterschiedliche KI-Werkzeuge sollen dieselbe Projektstruktur als
  Startpunkt nutzen können, ohne eigene widersprüchliche Regeln zu erzeugen.
- Betroffene Bereiche: `.claude/`, `.codex/`, `.agents/skills/`,
  `VORLAGE/AI/TOOLING/`, Root-Dateien.
- Folgen oder Trade-offs: Die Root-Dateien bleiben kurz, während
  tool-spezifische Details geordnet in eigenen Adapterordnern liegen.

## 2026-06-07 - Zentrale Orientierungsdatei ergänzt

- Datum: `2026-06-07`
- Entscheidung: Die Vorlage erhält mit
  `DOKUMENTATION/Informationen/Start_und_Orientierung.md` eine zentrale
  Übersichtsdatei für Menschen und KI-Agenten.
- Begründung: Neue Projektkopien sollen schneller verständlich sein, ohne den
  Root mit zusätzlichen Dateien zu belasten.
- Betroffene Bereiche: `index.md`, `AGENTS.md`, `claude.md`,
  `DOKUMENTATION/Informationen/`, Dokumentationsgenerator.
- Folgen oder Trade-offs: Die Orientierung ist besser gebündelt. Die Datei muss
  bei strukturellen Änderungen mit gepflegt werden.

## 2026-06-07 - Finale Vorlagenbereinigung

- Datum: `2026-06-07`
- Entscheidung: Lokale Laufzeit- und Sicherungsartefakte wurden aus der
  Vorlage entfernt. Dazu gehören `DEMOS/OPENROUTER/node_modules/`,
  `DEMOS/OPENROUTER/.env`, das temporäre Doku-Git-Backup unter `BACKUPS/` und
  eine veraltete Implementierungs-Historie.
- Begründung: Neue Projekte sollen keine lokalen Abhängigkeiten, Secrets,
  temporären Backups oder überholten Strukturhinweise mitkopieren.
- Betroffene Bereiche: `DEMOS/OPENROUTER/`, `BACKUPS/`,
  `VORLAGE/`, `DOKUMENTATION/`.
- Folgen oder Trade-offs: Die Vorlage ist schlanker und sicherer. Abhängigkeiten
  werden bei Bedarf frisch installiert, und echte Backups bleiben lokale,
  bewusst dokumentierte Arbeitsartefakte.

## 2026-06-07 - Öffentliche GitHub-Vorlage mit MIT-Lizenz

- Datum: `2026-06-07`
- Entscheidung: Die Vorlage wird als öffentlich nutzbare GitHub-Vorlage mit
  `README.md`, `LICENSE`, `CHANGELOG.md`, `VERSION` und `.github/` vorbereitet.
- Begründung: Menschen sollen die Ordnerstruktur direkt herunterladen,
  verstehen und als Startpunkt für neue Projekte einsetzen können.
- Betroffene Bereiche: Root-Dateien, `.github/`, `DOKUMENTATION/`,
  `VORLAGE/AI/SKILLS/`, Dokumentationsgenerator.
- Folgen oder Trade-offs: Der Root enthält nun bewusst einige öffentliche
  GitHub-Dateien. Die allgemeine Aufräumregel bleibt erhalten: Weitere
  Root-Dateien brauchen einen dokumentierten Grund.

## 2026-06-07 - Claude-Code-Kompatibilität und Sicherheitsrichtlinie ergänzt

- Datum: `2026-06-07`
- Entscheidung: Die Vorlage erhält zusätzlich `CLAUDE.md` als automatisch
  erkennbaren Claude-Code-Einstieg und `SECURITY.md` als öffentliche
  Sicherheitsrichtlinie.
- Begründung: Claude Code arbeitet zuverlässig mit `CLAUDE.md`. Durch den
  Import von `AGENTS.md` bleibt die gemeinsame Agentenlogik dennoch gebündelt.
  `SECURITY.md` macht den Sicherheitsfokus für GitHub-Nutzer sofort sichtbar.
- Betroffene Bereiche: Root-Dateien, README, GitHub-Workflow,
  Dokumentationsgenerator, Start- und Orientierungsdokumentation.
- Folgen oder Trade-offs: Der Root enthält zwei zusätzliche sichtbare Dateien,
  die bewusst erlaubt sind. Die Vorlage wird dadurch besser verständlich und
  kompatibler für Anwender.

## 2026-06-07 - GitHub-Wiki-Inhalte vorbereitet

- Datum: `2026-06-07`
- Entscheidung: Wiki-Inhalte wurden unter `DOKUMENTATION/GitHub-Wiki/` als
  versionierte Quelle vorbereitet.
- Begründung: Anwender sollen später eine ausführliche Wiki-Dokumentation lesen
  können, während die Inhalte im Hauptrepository nachvollziehbar pflegbar
  bleiben.
- Betroffene Bereiche: README, Dokumentation, GitHub-Wiki-Inhalte,
  `DOKUMENTATION/GitHub-Wiki/`.
- Folgen oder Trade-offs: Die Inhalte sind im Repository verfügbar. Ein echtes
  GitHub-Wiki kann erst nach öffentlicher Freigabe oder Upgrade genutzt werden.

## 2026-06-07 - Phase 1 MCP lokal und ohne Laufzeitabhängigkeiten umgesetzt

- Datum: `2026-06-07`
- Entscheidung: Der konkrete Workspace erhält einen lokalen TypeScript/Node.js
  MCP-Server unter `PROJEKT/WORKSPACE/`, der ohne externe Laufzeitdienste und
  ohne externe Laufzeitabhängigkeiten startet.
- Begründung: Die Phase-1-Anforderung ist lokal-first. Auf dem lokalen Volume
  war eine Paketinstallation unzuverlässig; deshalb nutzt die erste Version den
  Node-Test-Runner und einen kleinen JSON-RPC/MCP-Server über stdio.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/src/`,
  `PROJEKT/WORKSPACE/tests/`, `PROJEKT/WORKSPACE/docs/`.
- Folgen oder Trade-offs: Der Server bleibt sehr schlank und lokal
  nachvollziehbar. Später kann das offizielle MCP-SDK ergänzt werden, wenn der
  Paketinstallationsprozess stabil bleibt.

## 2026-06-07 - GitHub-Projekt Claude-Codex-MCP wird eigener Projektstand

- Datum: `2026-06-07`
- Entscheidung: Das GitHub-Zielprojekt
  `MichaelGahnDESIGN/Claude-Codex-MCP` erhält eine eigene ausführliche
  Projekt-README und die Versionsnummer `0.2.0`.
- Begründung: Das Projekt soll nicht nur als private lokale Arbeitsgrundlage
  dienen, sondern für weitere Nutzer verständlich und später öffentlich
  verfügbar werden.
- Betroffene Bereiche: `README.md`, `VERSION`, `CHANGELOG.md`,
  `PROJEKT/WORKSPACE/package.json`, `PROJEKT/WORKSPACE/src/mcp/createServer.ts`.
- Folgen oder Trade-offs: Die Root-README beschreibt nun das MCP-Projekt statt
  primär die alte allgemeine Projektvorlage. Die Vorlagenstruktur bleibt im
  Repository erhalten, wird aber im README als Herkunft und Arbeitsumgebung
  eingeordnet.

## 2026-06-07 - Interne Wiki-Dokumentation bis zur Freigabe

- Datum: `2026-06-07`
- Entscheidung: Die ausführliche Wiki-Dokumentation für `Claude-Codex-MCP`
  wird zunächst als versionierter Markdown-Bereich unter
  `DOKUMENTATION/GitHub-Wiki/` gepflegt.
- Begründung: Das Projekt soll erst öffentlich werden, wenn echte Codex- und
  Claude-Integrationen getestet, Sicherheitsregeln geprüft und Dokumentation
  gegengelesen sind. GitHub-Wikis sind im aktuellen privaten Repository nicht
  verfügbar.
- Betroffene Bereiche: `DOKUMENTATION/GitHub-Wiki/`, GitHub-Repository-
  Einstellungen, Veröffentlichungsprozess.
- Folgen oder Trade-offs: Private Tester können bereits mit der
  Wiki-Dokumentation und dem Code arbeiten. Nach öffentlicher Freigabe kann der
  Bereich in ein echtes GitHub-Wiki gespiegelt werden.

## 2026-06-07 - Lokale Codex-MCP-Registrierung getestet

- Datum: `2026-06-07`
- Entscheidung: `claude-codex-mcp` wurde lokal in Codex als stdio-MCP-Server
  registriert. Der gemeinsame Speicher zeigt auf
  `PROJEKT/WORKSPACE/local-agent-comms/live`.
- Begründung: Der nächste Praxisschritt ist ein echter Codex-/Claude-
  Integrationslauf mit demselben lokalen Kommunikationsordner.
- Betroffene Bereiche: lokale Codex-Konfiguration, `PROJEKT/WORKSPACE/bin/`,
  `PROJEKT/WORKSPACE/docs/`, `PROJEKT/WORKSPACE/examples/mcp-configs/`.
- Folgen oder Trade-offs: Codex kann den MCP nach Neustart der Sitzung nutzen.
  Claude ist auf diesem Rechner nicht als CLI verfügbar und muss später in
  Claude Code oder Claude Desktop mit demselben Startskript und demselben
  `AGENT_COMMS_DIR` registriert werden.

## 2026-06-07 - Öffentliche Herkunftsreferenzen neutralisiert

- Datum: `2026-06-07`
- Entscheidung: Die öffentliche README und begleitende Dokumentation nennen
  keine vertraulichen internen Projektbezüge mehr. Die Entstehungsgeschichte
  wird neutral als praktische Agenten-Arbeitsweise beschrieben. Zusätzlich
  wurde das Impressum in der Root-README ergänzt.
- Begründung: Das Repository soll später öffentlich nutzbar sein, ohne
  vertrauliche Produkt- oder Entwicklungsinformationen offenzulegen.
- Betroffene Bereiche: `README.md`, `CHANGELOG.md`,
  `PROJEKT/WORKSPACE/docs/`, `DOKUMENTATION/GitHub-Wiki/`,
  `DOKUMENTATION/Projektbetrieb/`.
- Folgen oder Trade-offs: Die öffentliche Dokumentation bleibt verständlich,
  verzichtet aber bewusst auf interne Herkunftsdetails.

## 2026-06-07 - Playwright-Audit für MCP-Prozess ergänzt

- Datum: `2026-06-07`
- Entscheidung: Der Workspace erhält Playwright als Dev-Abhängigkeit und einen
  eigenen Audit für stdio-MCP-Prozessverhalten.
- Begründung: Der MCP soll nicht nur über direkte Unit-Tests geprüft werden.
  Playwright startet den Server als echten Prozess, sendet JSON-RPC-Zeilen und
  prüft, ob Fehlerfälle den Server nicht beenden.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/package.json`,
  `PROJEKT/WORKSPACE/package-lock.json`,
  `PROJEKT/WORKSPACE/tests/playwright/`, `PROJEKT/WORKSPACE/src/mcp/`.
- Folgen oder Trade-offs: Die Laufzeit des MCP bleibt schlank. Für
  Entwicklungstests gibt es nun eine kleine Dev-Abhängigkeit mit Lockfile.

## 2026-06-11 - Impressum und sichtbare Abschlussanleitung ergänzt

- Datum: `2026-06-11`
- Entscheidung: Das Repository erhält zusätzlich zur README ein eigenes
  `Impressum.md` im Root. Der lokale macOS-DMG-Setup-Start öffnet nach
  erfolgreicher Einrichtung sichtbar die deutsche Anleitung und den
  Hilfe-Ordner.
- Begründung: Vor einer späteren öffentlichen Freigabe müssen die
  Anbieterangaben leicht auffindbar sein. Nicht-Programmierer sollen nach dem
  Setup nicht im Finder suchen müssen, sondern direkt sehen, was als Nächstes
  zu tun ist.
- Betroffene Bereiche: `README.md`, `Impressum.md`, `CHANGELOG.md`,
  `DOKUMENTATION/Projektbetrieb/Versionen.md`,
  `PROJEKT/WORKSPACE/src/scripts/buildCliDmg.ts`.
- Folgen oder Trade-offs: `Impressum.md` ist eine bewusst erlaubte
  Root-Ausnahme, weil GitHub-Besucher rechtliche Angaben schnell finden
  müssen. Eine fachliche oder rechtliche Prüfung vor öffentlicher Freigabe
  bleibt sinnvoll.

## 2026-06-11 - Feste MCP-Protokollwerte werden validiert

- Datum: `2026-06-11`
- Entscheidung: Task-Typen, Prioritäten, Statuswerte und Chat-Arten werden als
  zentrale Wertelisten geführt. Tool-Eingaben für `create_task` und
  `append_chat` werden vor dem Schreiben gegen diese Listen geprüft.
- Begründung: Die Werte waren bereits dokumentiert, wurden aber noch nicht
  konsequent technisch erzwungen. Das konnte zu uneinheitlichen States führen,
  wenn ein Client freie Texte sendet.
- Betroffene Bereiche: `PROJEKT/WORKSPACE/src/domain/allowedValues.ts`,
  `PROJEKT/WORKSPACE/src/tools/parseEnumValue.ts`,
  `PROJEKT/WORKSPACE/src/tools/AgentCommsService.ts`,
  `PROJEKT/WORKSPACE/src/tools/registerTools.ts`,
  `PROJEKT/WORKSPACE/tests/tools/validateToolInputs.test.ts`.
- Folgen oder Trade-offs: Clients müssen erlaubte Werte verwenden. Dafür
  werden Fehler früher und verständlicher gemeldet.
