# PROJEKTREGELN

Diese Datei ergänzt die [`../../REGELN/GRUNDREGELN.md`](../../REGELN/GRUNDREGELN.md) um die konkreten Regeln, Rahmenbedingungen, Entscheidungen und Besonderheiten dieses Projekts.

Sie ersetzt die Grundregeln nicht, sondern konkretisiert sie für das jeweilige Projekt.

Diese Vorlage ist bewusst als Startpunkt für neue Projekte aufgebaut. In einer
neuen Projektkopie sollen konkrete Angaben wie Kundenname, Projektziel,
Technik, Freigaben und Grenzen zuerst in diesen Dateien gepflegt werden:

- `VORLAGE/AI/PROJEKTREGELN/ARBEITSKONTEXT.md`
- `VORLAGE/AI/PROJEKTREGELN/FREIGABEN_UND_GRENZEN.md`
- `VORLAGE/AI/PROJEKTREGELN/ENTSCHEIDUNGEN_UND_AUSNAHMEN.md`
- `DOKUMENTATION/Informationen/Projektueberblick.md`

Alles, was dauerhaft und projektübergreifend gilt, gehört in [`../../REGELN/GRUNDREGELN.md`](../../REGELN/GRUNDREGELN.md).
Alles, was die operative Zusammenarbeit von Hauptagent und Subagenten regelt, gehört in [`../AGENTEN/AGENTS.md`](../AGENTEN/AGENTS.md).
Wiederverwendbare Spezial-Workflows gehören in [`../SKILLS/`](../SKILLS/), geordnet über [`../SKILLS/SKILL.md`](../SKILLS/SKILL.md) und die jeweiligen Unterordner.
Weitere projektspezifische Ergänzungen dürfen im selben Ordner `VORLAGE/AI/PROJEKTREGELN/` in zusätzlichen Dateien gepflegt werden.

## 1. Projektidentität

Projektname:
`Claude-Codex-MCP Projektvorlage`

Kurzbeschreibung:
Wiederverwendbare lokale KI-Projektvorlage mit verbindlichen Regeln,
Agentenrollen, Skills, Dokumentationsstruktur und separatem
OpenRouter-Demobereich.

Ziel des Projekts:
Eine gut verständliche, sichere und dokumentierte Arbeitsgrundlage für
Claude-, Codex- und weitere KI-gestützte Entwicklungsabläufe bereitstellen.

Projektart:
Projektvorlage, Agenten-/Skill-System, Dokumentationsumgebung und separate
API-Demo.

## 2. Projektstatus und Arbeitsmodus

Aktueller Status:
Vorlage für neue Projekte, Strukturaufbau und lokale Weiterentwicklung.

Arbeitsmodus:
Lokal. Es ist kein Live-System betroffen.

Besonderheit:
`DEMOS/OPENROUTER/` bleibt bewusst ein separater Demonstrationsbereich und wird nicht
in `PROJEKT/WORKSPACE/` verschoben.

Konkreter Projektinhalt entsteht erst nach dem Kopieren der Vorlage in
`PROJEKT/WORKSPACE/`.

## 3. Projektstruktur in diesem Projekt

Die feste Projektstruktur lautet:

- `VORLAGE/AI/AGENTEN/`
- `VORLAGE/AI/PROJEKTREGELN/`
- `VORLAGE/AI/SKILLS/`
- `BACKUPS/`
- `DOKUMENTATION/`
- `PROJEKT/WORKSPACE/`

Dabei gilt:

- `PROJEKT/WORKSPACE/` enthält den eigentlichen von der KI erstellten Code, Konfigurationen, Assets, Build-Dateien und alle technischen Projektdateien.
- `PROJEKT/WORKSPACE/DOKUMENTATION/` enthält die konkrete Projekt-Dokumentation des tatsächlich entstandenen Produkts im Workspace.
- Dokumentationswerkzeuge und Doku-Skripte gehören in die Dokumentationsstruktur und nicht in `PROJEKT/WORKSPACE/`.
- `VORLAGE/AI/PROJEKTREGELN/` enthält die projektspezifischen Regeln, Ausnahmen, Annahmen und Freigaben.
- `DOKUMENTATION/` enthält Projektnotizen, Entscheidungen, Risiken, Setup-Hinweise, Deployment-Hinweise und Versionsstände.
- `DOKUMENTATION/` ist die Entwicklungs- und Vorlagen-Dokumentation.
- `PROJEKT/WORKSPACE/DOKUMENTATION/` ist die Projekt-Dokumentation des konkret gebauten Projekts.
- `BACKUPS/` enthält Sicherungen, Exportstände, Datenbank-Dumps, Snapshots und sonstige Wiederherstellungsdateien.
- `VORLAGE/AI/AGENTEN/` enthält operative Rollen, Delegationslogik und spezialisierte Agentenprofile.
- `VORLAGE/AI/SKILLS/` enthält wiederverwendbare Arbeitsanweisungen für Plattformen, Content, Releases und Spezialaufgaben.

Zusätzliche feste Ordner oder Strukturen in diesem Projekt:
- `DEMOS/OPENROUTER/`: separate Node.js-Demo für OpenRouter-API-Aufrufe.

## 4. Technischer Rahmen

Programmiersprachen:
Markdown, HTML, CSS, JavaScript, Python und Node.js.

Frameworks oder Systeme:
Keine große Anwendungsframework-Abhängigkeit. Die Dokumentation nutzt eine
statische HTML-/CSS-/JavaScript-Struktur. `DEMOS/OPENROUTER/` nutzt Node.js mit
ES-Modulen.

Frontend:
Statische Dokumentationsoberfläche in `DOKUMENTATION/index.html`.

Backend:
Kein produktives Backend. `DEMOS/OPENROUTER/` enthält nur eine lokale Node.js-Demo.

Datenbank:
Keine Datenbank im aktuellen Projektstand.

Hosting oder Serverumgebung:
Lokale Dateistruktur. Kein dokumentiertes Staging- oder Live-Hosting.

Externe Schnittstellen oder APIs:
OpenRouter API im separaten Ordner `DEMOS/OPENROUTER/`.

Wichtige Abhängigkeiten:
`dotenv` und `chalk` im separaten OpenRouter-Demoprojekt.

## 5. Versionierung und Veröffentlichung

Dieses Projekt wird lokal versioniert:
ja

Dieses Projekt wird mit Git versioniert:
ja

Remote Repository:
Noch nicht dokumentiert. Veröffentlichung nur nach ausdrücklicher Freigabe.

Wichtig:
Quellprojekte in diesem Projekt werden lokal versioniert, aber nicht automatisch auf entfernte Repositories veröffentlicht, sofern nicht ausdrücklich anders dokumentiert.

Versionen und größere Änderungen werden in `../../DOKUMENTATION/Projektbetrieb/Versionen.md` dokumentiert.

Für das konkret entstandene Projekt im Workspace werden Versionen und Verlauf zusätzlich in `../../PROJEKT/WORKSPACE/DOKUMENTATION/Projektbetrieb/Versionen.md` und `../../PROJEKT/WORKSPACE/DOKUMENTATION/Projektbetrieb/Versions-Log.md` dokumentiert.

## 6. Dokumentation in diesem Projekt

Wichtige Projektnotizen liegen gesammelt unter `../../DOKUMENTATION/`.

Im Root von `../../DOKUMENTATION/` sollen nur liegen:

- `index.html`
- `SKILL.md`

Folgende Dokumentationsdateien sind in diesem Projekt besonders relevant:

- `../../DOKUMENTATION/Informationen/Projektueberblick.md`
- `../../DOKUMENTATION/Informationen/Entscheidungen.md`
- `../../DOKUMENTATION/Informationen/Risiken.md`
- `../../DOKUMENTATION/Informationen/Kosten_und_Lizenzen.md`
- `../../DOKUMENTATION/Projektbetrieb/Setup.md`
- `../../DOKUMENTATION/Projektbetrieb/Deployment.md`
- `../../DOKUMENTATION/Projektbetrieb/Versionen.md`
- `../../DOKUMENTATION/Projektbetrieb/Backups.md`
- `../../DOKUMENTATION/ToDo/Offene_Punkte.md`

Wenn dieses Projekt eine lokale HTML-Dokumentation oder interne Übersichtsseite nutzt, ist `../../DOKUMENTATION/index.html` fortlaufend aktuell zu halten.

Wenn der Workspace ein konkret entstandenes Projekt enthält, ist zusätzlich `../../PROJEKT/WORKSPACE/DOKUMENTATION/` fortlaufend zu pflegen.

Wenn HTML-Dateien oder Frontends in diesem Projekt erstellt werden, sollen sie standardmäßig:

- responsive sein
- Light- und Dark-Mode unterstützen
- so barrierearm wie möglich aufgebaut sein
- ein ruhiges und angemessenes Design verwenden
- keine unnötig großen Schriftgrößen einsetzen

## 7. Backups und Wiederherstellung

Backups werden gesammelt unter `../../BACKUPS/` abgelegt.

Vor riskanten Änderungen, Migrationen, Refactorings, Datenbankeingriffen oder Deployments ist ein geeignetes Backup anzulegen, sofern die Änderung nicht rein lokal und risikolos ist.

Wenn für dieses Projekt besondere Backup-Regeln gelten, sind sie hier festzuhalten:

Vor riskanten Änderungen an Regeln, Dokumentationsgeneratoren oder
projektübergreifenden Vorlagen ist ein nachvollziehbarer Git-Stand oder ein
Backup unter `BACKUPS/` erforderlich.

## 8. Kosten, Tools und Abhängigkeiten in diesem Projekt

Bevorzugt werden kostenlose Tools mit kommerziell zulässiger Nutzung.

Wenn dieses Projekt ausnahmsweise kostenpflichtige Tools, Plugins, APIs, Dienste oder Lizenzen benötigt, sind diese hier und zusätzlich in `../../DOKUMENTATION/Informationen/Kosten_und_Lizenzen.md` zu dokumentieren.

Aktuell freigegebene Ausnahmen:
OpenRouter darf lokal als separate Demo genutzt werden. Preise, Limits und
Datenschutzfolgen sind vor produktiver Nutzung erneut zu prüfen.

Nicht freigegebene kostenpflichtige Lösungen dürfen nicht stillschweigend eingeführt werden.

## 9. Rechtlich oder sicherheitsrelevante Besonderheiten

Für dieses Projekt besonders sensibel sind:

KI-Funktionen, API-Schlüssel, Tokens, lokale `.env`-Dateien,
personenbezogene Daten in Prompts oder Logs sowie mögliche Drittanbieter-
Übertragung an Modellanbieter.

Zusätzliche Prüfpflichten oder Einschränkungen:
API-Schlüssel dürfen nie im Repository, in Logs oder in Antworten ausgegeben
werden. Prompts mit personenbezogenen Daten sind vor Drittanbieter-Übertragung
zu vermeiden oder gesondert zu prüfen.

Wenn Bereiche rechtlich oder sicherheitsrelevant sind, dürfen Änderungen dort nicht stillschweigend als freigegeben gelten.

## 10. Bevorzugte Agenten und Skills

Für dieses Projekt bevorzugte Agenten aus `../AGENTEN/`:
Hauptagent, Projektmanager, Programmierer, Tester, Datenschutz-DSGVO,
Dokumentation-QA und Controller.

Für dieses Projekt bevorzugte Skills aus `../SKILLS/`:
Allgemein/doku-skill, Allgemein/recherche-skill, Allgemein/release-skill und
bei UI-Arbeiten Allgemein/DESIGN-Skill.

Nicht benötigte Agenten oder Skills:
Keine feste Ausschlussliste. Fachagenten werden nur bei passendem Auftrag
genutzt.

## 11. Projektbezogene Qualitätsanforderungen

Vor Abschluss relevanter Änderungen sind mindestens diese Punkte zu prüfen:

Git-Status, sensible Dateien, Platzhalter, Dokumentationskonsistenz,
Generatorlauf bei Dokumentationsstrukturänderungen sowie syntaktische Prüfung
betroffener Code-Dateien.

Falls für dieses Projekt zusätzliche Tests, Freigaben oder Kontrollschritte nötig sind, sind sie hier festzuhalten:

Bei Änderungen an `DEMOS/OPENROUTER/` mindestens `npm run check` im Ordner
`DEMOS/OPENROUTER/` ausführen. Produktive API-Aufrufe nur mit bewusst gesetztem
lokalem API-Schlüssel.

## 12. Projektspezifische Entscheidungen und Ausnahmen

Hier werden nur Entscheidungen dokumentiert, die speziell dieses Projekt betreffen.

Beispiele:

- bestimmte Technologie ist gesetzt
- bestimmtes Plugin ist freigegeben
- bestimmtes Designsystem ist verbindlich
- bestimmte externe API muss verwendet werden
- bestimmte Deployment-Route ist festgelegt
- bestimmte Bestandssysteme dürfen nicht verändert werden

Aktuelle Entscheidungen oder Ausnahmen:
- `DEMOS/OPENROUTER/` bleibt separat und wird nicht nach `PROJEKT/WORKSPACE/` verschoben.
- `PROJEKT/WORKSPACE/` bleibt der Bereich für eigentliche Projektartefakte.
- Das Projektroot wird lokal mit Git versioniert.

## 13. Offene projektspezifische Punkte

Noch zu klären:
Ob ein GitHub-Remote angelegt oder verbunden werden soll.

Bekannte Risiken:
OpenRouter-Modellpreise, Modellverfügbarkeit und Datenschutzbedingungen können
sich ändern. Vor produktiver Nutzung ist eine erneute Prüfung nötig.

Abhängigkeiten zu Dritten:
OpenRouter im separaten Demo-Bereich.

## 14. Pflege dieser Datei

Diese Datei ist während des Projekts fortlaufend zu pflegen.

Sie soll nur projektspezifische Inhalte enthalten.

Allgemeine Regeln gehören in [`../../REGELN/GRUNDREGELN.md`](../../REGELN/GRUNDREGELN.md).
Agentenlogik, Delegation und Feedback-Schleifen gehören in [`../AGENTEN/AGENTS.md`](../AGENTEN/AGENTS.md).
Wiederverwendbare Arbeitsmuster gehören in `../SKILLS/` und werden über `../SKILLS/SKILL.md` strukturiert.
Weitere projektspezifische Inhalte gehören in zusätzliche Dateien innerhalb von `VORLAGE/AI/PROJEKTREGELN/`.
