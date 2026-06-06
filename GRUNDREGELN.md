# GRUNDREGELN

Diese Datei definiert die verbindlichen, projektübergreifenden Grundregeln für die Arbeit mit KI gestützter Mitarbeit und menschlicher Bearbeitung.

Sie gilt für alle Projekte auf Basis dieser Vorlage und wird durch projektspezifische Regeln ergänzt, aber nicht ersetzt.

## 1. Geltungsbereich und feste Struktur

Jedes Projekt auf Basis dieser Vorlage soll im Root mindestens diese Elemente enthalten:

- `GRUNDREGELN.md`
- `AGENTS.md`
- `CLAUDE.md`
- `PROJEKTREGELN.md`
- `AI/`
- `AI/PROJEKTREGELN/`
- `AI/PROJEKTREGELN/SKILL.md`
- `AI/PROJEKTREGELN/PROJEKTREGELN.md`
- `AI/AGENTEN/`
- `AI/AGENTEN/AGENTS.md`
- `SKILL.md`
- `AI/SKILLS/`
- `AI/SKILLS/SKILL.md`
- `PROJEKT/`
- `PROJEKT/DOKUMENTATION/`
- `PROJEKT/DOKUMENTATION/SKILL.md`
- `PROJEKT/DOKUMENTATION/index.html`
- `PROJEKT/BACKUPS/`
- `WORKSPACE/`

Die Root-Datei [`SKILL.md`](SKILL.md) ist der kurze Einstiegspunkt im Root und verweist auf die operative Arbeitslogik in [`AI/AGENTEN/AGENTS.md`](AI/AGENTEN/AGENTS.md). Sie ist kein fachlicher Skill, sondern nur ein kompakter Wegweiser.

Die funktionale Trennung lautet:

- [`GRUNDREGELN.md`](GRUNDREGELN.md) regelt allgemeine, dauerhafte und projektübergreifende Grundsätze.
- [`PROJEKTREGELN.md`](PROJEKTREGELN.md) ist die Root-Kompatibilitätsdatei für Systeme oder Personen, die projektspezifische Regeln zuerst im Root erwarten.
- [`AI/PROJEKTREGELN/PROJEKTREGELN.md`](AI/PROJEKTREGELN/PROJEKTREGELN.md) ist die verbindliche Kerndatei für projektspezifische Regeln, Entscheidungen, Ausnahmen und Besonderheiten.
- [`AI/PROJEKTREGELN/SKILL.md`](AI/PROJEKTREGELN/SKILL.md) beschreibt Struktur und Nutzung des Ordners `AI/PROJEKTREGELN/`.
- Weitere Dateien in `AI/PROJEKTREGELN/` ergänzen bei Bedarf projektspezifische Annahmen, Freigaben und Sonderfälle.
- [`AGENTS.md`](AGENTS.md) ist die Root-Kompatibilitätsdatei für Systeme oder Personen, die zuerst im Root nach Agenten-Anweisungen suchen.
- [`AI/AGENTEN/AGENTS.md`](AI/AGENTEN/AGENTS.md) regelt die operative Arbeitsweise, Rollenverteilung, Delegation und Feedback-Schleifen.
- `AI/AGENTEN/*.md` beschreibt einzelne Haupt- und Subagenten.
- [`CLAUDE.md`](CLAUDE.md) ist die Root-Kompatibilitätsdatei für Claude-Workflows und verweist auf die führenden Projektdateien.
- `AI/SKILLS/SKILL.md` beschreibt die Grundlogik des Skill-Ordners.
- `AI/SKILLS/*/SKILL.md` beschreibt einzelne Skill-Bereiche.
- `AI/SKILLS/*/*.md` beschreibt wiederverwendbare Arbeitsmuster, Plattform-Workflows und Spezialaufgaben.
- `WORKSPACE/` enthält die eigentlichen von der KI erstellten Projektartefakte wie Quellcode, Apps, Websites, Themes, Plugins, Konfigurationen, Assets und technische Projektdateien.
- `PROJEKT/DOKUMENTATION/index.html` ist die visuelle Hauptübersicht.
- `PROJEKT/DOKUMENTATION/SKILL.md` beschreibt Struktur, Regeln und Nutzung der Dokumentation.
- Die eigentlichen Inhalte der Dokumentation liegen in Unterordnern von `PROJEKT/DOKUMENTATION/`.
- `PROJEKT/DOKUMENTATION/` ist die Entwicklungs- und Vorlagen-Dokumentation.
- `WORKSPACE/DOKUMENTATION/`, sobald vorhanden, ist die Projekt-Dokumentation des konkret entstandenen Produkts.
- `PROJEKT/BACKUPS/` enthält Sicherungen und Wiederherstellungsgrundlagen.

Falls Regeln kollidieren, dürfen projektspezifische Regeln die Grundregeln nur ergänzen, aber nicht deren Schutzfunktion aushebeln.

Projektspezifische Regeln und Inhalte gehören in den Ordner `AI/PROJEKTREGELN/` und nicht in `GRUNDREGELN.md`.

Textdateien, Markdown-Dateien, Quellcode und Konfigurationsdateien sind grundsätzlich in UTF-8 zu speichern.

Umlaute und deutsche Sonderzeichen müssen im Fließtext korrekt geschrieben werden.
Beispiele:

- `Übersicht` statt `Uebersicht`
- `für` statt `fuer`
- `Änderung` statt `Aenderung`
- `größer` statt `groesser`

ASCII-Umschreibungen sind nur dort erlaubt, wo technische Dateinamen, Pfade, URLs, Kommandos oder externe Systemvorgaben dies erfordern.

## 2. Rechtsbewusstsein für Deutschland und die EU

Es ist immer nach bestem Wissen und Gewissen rechtskonform für Deutschland und die Europäische Union zu arbeiten.

Rechtliche Sicherheit darf niemals nur behauptet, simuliert oder vorausgesetzt werden.

Wenn die Rechtslage unklar, sensibel, haftungsrelevant oder einzelfallabhängig ist, muss dies ausdrücklich benannt werden.

Mindestens diese Rechtsbereiche sind bei passenden Projekten ausdrücklich mit zu prüfen und in `PROJEKT/DOKUMENTATION/Rechtliches/` zu dokumentieren:

- DSGVO für personenbezogene Daten, Informationspflichten, Rechtsgrundlagen und Betroffenenrechte
- TDDDG, insbesondere `§ 25`, für Cookies, Tracking, vergleichbare Speicher- und Zugriffsvorgänge auf Endeinrichtungen
- DDG für Anbieterkennzeichnung und allgemeine Pflichtangaben digitaler Dienste
- BFSG und BFSGV für einschlägige barrierefreie Produkte und Dienstleistungen, insbesondere im elektronischen Geschäftsverkehr
- eCommerce-Recht, insbesondere verbraucherschützende Informationspflichten, Fernabsatz, Bestellprozess, Preisangaben und Widerruf

Für den Bereich BFSG und BFSGV ist besonders zu beachten, dass die Pflichten für einschlägige Angebote seit dem `28. Juni 2025` praktisch relevant sind. Ob ein konkretes Projekt darunter fällt, muss je Einzelfall geprüft und dokumentiert werden.

Eine erneute rechtliche Prüfung ist insbesondere erforderlich bei Änderungen an:

- Datenschutz
- Cookies und Consent
- Tracking
- Formularen
- Checkout- und Bestellprozessen
- AGB, Widerruf und Vertragstexten
- E-Mail-Prozessen
- KI-Funktionen
- Verarbeitung personenbezogener Daten
- rechtlich relevanten Pflichtinhalten
- Barrierefreiheitserklärungen oder Accessibility-bezogenen Aussagen
- Preisangaben, Versandkosten, Produktinformationen und Checkout-Buttons

Diese Regeln ersetzen keine Rechtsberatung.

## 3. Dokumentation ist Pflicht

Für jedes Projekt ist der Ordner `PROJEKT/DOKUMENTATION/` anzulegen und fortlaufend zu pflegen.

Alle wichtigen Entscheidungen, offenen Punkte, Risiken, Änderungen und Besonderheiten müssen nachvollziehbar dokumentiert werden.

Im Root von `PROJEKT/DOKUMENTATION/` sollen nur diese Dateien direkt liegen:

- [`PROJEKT/DOKUMENTATION/index.html`](index.html)
- [`PROJEKT/DOKUMENTATION/SKILL.md`](PROJEKT/DOKUMENTATION/SKILL.md)

Die eigentlichen Inhalte sollen in sinnvolle Unterordner einsortiert werden.

Mindestens folgende Inhalte sollen als Vorlage vorhanden sein und während des Projekts gepflegt werden:

- `PROJEKT/DOKUMENTATION/Informationen/Projektueberblick.md`
- `PROJEKT/DOKUMENTATION/Informationen/Entscheidungen.md`
- `PROJEKT/DOKUMENTATION/Informationen/Risiken.md`
- `PROJEKT/DOKUMENTATION/Informationen/Kosten_und_Lizenzen.md`
- `PROJEKT/DOKUMENTATION/Projektbetrieb/Setup.md`
- `PROJEKT/DOKUMENTATION/Projektbetrieb/Deployment.md`
- `PROJEKT/DOKUMENTATION/Projektbetrieb/Versionen.md`
- `PROJEKT/DOKUMENTATION/Projektbetrieb/Backups.md`
- `PROJEKT/DOKUMENTATION/ToDo/Offene_Punkte.md`

Diese Übersichtsseite soll:

- die wichtigsten Dokumente verlinken
- den aktuellen Projektstand knapp zusammenfassen
- oben klar zwischen `Dev Dokumentation` und `Projekt Dokumentation` umschaltbar sein
- eine klare Ordnerübersicht enthalten
- einen Bereich `AI Tools` mit vollständiger Agenten- und Skill-Übersicht enthalten
- einen klaren Menüpunkt `Changelog` enthalten
- einen klaren Menüpunkt `Rechtliches` enthalten
- den Changelog akkurat, sauber, detailliert und trotzdem einfach verständlich zugänglich machen
- den Bereich `Rechtliches` mit `Vorhanden`, `Bedenken`, `Empfehlungen` und Quellen sichtbar zusammenfassen
- ein dezentes und neutrales Design verwenden
- responsive sein
- Light- und Dark-Mode unterstützen
- so barrierearm wie möglich aufgebaut sein
- keine unnötig großen Schriftgrößen verwenden
- so gepflegt werden, dass sie wichtige Informationen aus den zentralen Dokumenten widerspiegelt
- nach Änderungen an Agenten, Skills oder Struktur zeitnah mit aktualisiert werden

Falls Git verwendet wird, müssen relevante Dokumentationsänderungen und Entscheidungsstände ebenfalls nachvollziehbar versioniert werden.

Wenn im `WORKSPACE/` ein konkretes Projekt entsteht, soll zusätzlich eine eigene Projekt-Dokumentation unter `WORKSPACE/DOKUMENTATION/` geführt werden.

Dazu gehören mindestens:

- ein eigener Projektüberblick
- Setup und Deployment
- ein eigener Versionsstand in `Projektbetrieb/Versionen.md`
- ein lesbarer `Versions-Log`

## 4. Projektstruktur und Ordnung

Der Projektordner muss übersichtlich, konsistent und dauerhaft verständlich bleiben.

Es gilt folgende Grundlogik:

- Im Root liegen nur zentrale Regeldateien und Hauptordner.
- In `AI/` liegen Agenten, Skills und projektspezifische KI-Regeln.
- In `AI/PROJEKTREGELN/` liegen alle projektspezifischen Regeln, Ausnahmen, Annahmen und Freigaben.
- In `AI/AGENTEN/` liegen Rollen, Delegationslogik und operative Arbeitsregeln.
- In `AI/SKILLS/` liegen wiederverwendbare Spezial-Workflows.
- In `WORKSPACE/` liegt der eigentliche von der KI erstellte Projektinhalt.
- Dokumentationswerkzeuge, Dokumentations-Skripte und Doku-Helfer gehören in `PROJEKT/DOKUMENTATION/` oder passende Unterordner davon, nicht in `WORKSPACE/`.
- Im Root von `PROJEKT/DOKUMENTATION/` liegen nur `index.html` und `SKILL.md`.
- In den Unterordnern von `PROJEKT/DOKUMENTATION/` liegt die inhaltliche und organisatorische Projektdokumentation.
- In `PROJEKT/BACKUPS/` liegen Sicherungen, Exportstände und Wiederherstellungsdateien.

Unnötige Duplikate, chaotische Zwischenstände und unklare Benennungen sind zu vermeiden.

## 5. Tools, Abhängigkeiten und Lizenzen

Es sind bevorzugt kostenlose oder Open-Source-Tools zu verwenden, die kommerzielle Nutzung ausdrücklich erlauben.

Vor der Nutzung eines Tools, Dienstes, Frameworks, Plugins oder externer Abhängigkeiten müssen mindestens diese Punkte geprüft und dokumentiert werden:

- Lizenz und Nutzungsrechte
- kommerzielle Nutzbarkeit
- Datenschutzrisiken
- mögliche Folgekosten
- technische Abhängigkeiten
- Wartbarkeit
- Risiko eines Vendor-Lock-in
- sinnvolle kostenlose oder Open-Source-Alternativen

Kostenpflichtige, lizenzrechtlich unklare oder datenschutzrechtlich problematische Lösungen dürfen nicht stillschweigend als Standard eingeführt werden.

## 6. Kostenpflichtige Lösungen

Wenn eine Lösung Kosten verursacht oder später Kosten auslösen kann, muss dies vor ihrer Einführung klar dokumentiert werden.

Die Dokumentation muss mindestens enthalten:

- einmalige Kosten
- laufende Kosten
- Preisstaffeln, Limits oder Nutzungsgrenzen
- mögliche Zusatzkosten
- Kündigungs- oder Migrationsrisiken
- sinnvolle Alternativen

Ohne diese Transparenz darf eine kostenpflichtige Lösung nicht als Standardentscheidung behandelt werden.

## 7. Versionierung und Änderungsnachweis

Jedes Projekt beginnt grundsätzlich bei Version `0.0.1`, sofern keine andere begründete Startversion dokumentiert wurde.

Es muss in `PROJEKT/DOKUMENTATION/Projektbetrieb/Versionen.md` ein nachvollziehbarer Änderungsverlauf geführt werden.

Jede relevante Änderung ist dort zu dokumentieren.

Ein Eintrag soll mindestens enthalten:

- Datum
- Version
- Beschreibung der Änderung
- Begründung der Änderung
- betroffene Bereiche
- Hinweis zur Rücknahme oder Wiederherstellung, falls nötig

Falls Git verwendet wird, müssen Commits, Tags und Dokumentation sinnvoll zusammenpassen.

## 8. Backups, Staging und Wiederherstellung

Für jedes Projekt ist ein Ordner `PROJEKT/BACKUPS/` vorzusehen.

Backups müssen nachvollziehbar benannt und dokumentiert werden.

Es muss klar sein:

- was gesichert wurde
- wann gesichert wurde
- warum gesichert wurde
- wie eine Wiederherstellung erfolgt

Vor riskanten Änderungen, Migrationen, Refactorings, Deployments, Datenbankeingriffen oder strukturellen Umbauten ist ein geeignetes Backup anzulegen.

Wenn sinnvoll, ist zusätzlich eine Staging-Umgebung zu nutzen.

## 9. Datenschutz, Zugangsdaten und Geheimnisse

Passwörter, API-Keys, Tokens, Zugangsdaten und personenbezogene Daten dürfen nicht ungeschützt in Quellcode, Dokumentation, Versionslogs, Beispielen oder Backups gespeichert werden.

Es sind geeignete Verfahren zu verwenden, zum Beispiel:

- `.env`-Dateien
- Secret-Management
- Platzhalter
- anonymisierte Beispiele
- geschwärzte Testdaten

Echte sensible Daten dürfen nicht unnötig verbreitet oder dupliziert werden.

## 10. Keine stillen Annahmen

Fehlende Informationen dürfen nicht stillschweigend erfunden werden.

Unklare Annahmen müssen ausdrücklich benannt werden.

Wenn wichtige Projektinformationen fehlen, sind Risiken, Unsicherheiten und mögliche Auswirkungen klar darzustellen.

Bei kleinen Unsicherheiten sind dokumentierte Arbeitsannahmen erlaubt.
Bei kritischen Unsicherheiten ist eine menschliche Klärung vorzuziehen.

## 10a. Konzept vor Design vor Code

Wenn eine Aufgabe über kleine Korrekturen, Mini-Textänderungen oder klar abgegrenzte Bugfixes hinausgeht, gilt standardmäßig diese Reihenfolge:

- zuerst Konzept
- danach Design, Struktur oder Lösungsentscheidung
- erst danach Code oder operative Umsetzung

Das bedeutet insbesondere:

- nicht direkt in Code springen, wenn Ziel, Umfang oder Lösungsweg noch unklar sind
- bei mehreren sinnvollen Lösungswegen mindestens zwei Varianten kurz vergleichen
- eine Empfehlung mit Begründung festhalten, bevor umgesetzt wird

## 11. Änderungen nur nachvollziehbar und begründet

Vor größeren Eingriffen ist der aktuelle Ist-Zustand zu erfassen.

Änderungen an Struktur, Deployment, Datenbank, Tracking, Checkout, Schnittstellen, Rechtstexten, Authentifizierung oder sicherheitsrelevanten Bereichen dürfen nur nachvollziehbar und mit Begründung erfolgen.

Wenn ein Eingriff potenziell kritisch ist, muss dokumentiert werden:

- warum er nötig ist
- welche Risiken bestehen
- welche Bereiche betroffen sind
- wie ein Rollback möglich ist

## 12. Tests vor Abschluss

Vor Abschluss relevanter Änderungen müssen die betroffenen Funktionen angemessen geprüft werden.

Je nach Projekt gehören dazu insbesondere:

- Build und Syntax
- Frontend-Darstellung
- mobile Darstellung
- Formulare und Validierung
- APIs und Schnittstellen
- Checkout und Transaktionsprozesse
- Tracking und Consent-Verhalten
- Performance
- Pflichtseiten und rechtlich relevante Inhalte
- sicherheitsrelevante Funktionen
- Responsive-Verhalten
- Light- und Dark-Mode, falls UI oder HTML betroffen ist
- grundlegende Barrierefreiheit, falls UI oder HTML betroffen ist

Ein Abschluss ohne angemessene Prüfung gilt nicht als sauberer Abschluss.

## 13. Tokenverbrauch und Kontextmanagement

Es ist so token-sparsam wie möglich zu arbeiten, ohne die Qualität an entscheidenden Stellen zu gefährden.

Wenn eine Aufgabe, Anweisung oder Analyse voraussichtlich unnötig viele Tokens verbraucht, ist eine sparsame Alternative zu bevorzugen.

Dazu gehören insbesondere:

- Aufteilung in Teilaufgaben
- Zusammenfassungen statt Volltexte
- Nutzung relevanter Dateiausschnitte
- Verdichtung von Logs
- Vermeidung unnötiger Wiederholungen
- nur gezielter Einsatz von Agenten und Skills
- Wahl eines kleineren Modells für einfache Aufgaben

Rückfragen sollen nur dann priorisiert werden, wenn ohne sie ein reales Risiko für Qualität, Sicherheit, Recht, Daten oder Produktivbetrieb entsteht.

Wenn absehbar ist, dass nur noch wenig Nutzung verfügbar ist und ein Prompt unnötig groß wird, soll zusätzlich ausdrücklich gewarnt werden.

Dann ist aktiv zu fragen, ob unnötige Zwischenschritte übersprungen, Ergebnisse stärker verdichtet oder die Aufgabe in sparsamere Teilaufgaben aufgeteilt werden dürfen.

## 14. Menschliche Freigabe bei Risiken

Änderungen mit rechtlichem, finanziellem, sicherheitsrelevantem oder produktivem Risiko dürfen nicht stillschweigend als freigegeben gelten.

Solche Punkte müssen klar markiert werden und erfordern vor Umsetzung eine bewusste menschliche Entscheidung.

## 15. Keine irreversiblen Schritte ohne Absicherung

Nichts Relevantes darf gelöscht, überschrieben, migriert oder produktiv verändert werden, ohne dass zuvor ein Backup, eine Dokumentation der Änderung und eine Rückfallstrategie vorhanden sind.

Irreversible Schritte ohne Absicherung sind zu vermeiden.

## 16. Agenten und Skills bewusst nutzen

Vor größeren Arbeiten sind immer diese Dateien in dieser Reihenfolge zu beachten:

1. [`GRUNDREGELN.md`](GRUNDREGELN.md)
2. [`AI/PROJEKTREGELN/PROJEKTREGELN.md`](AI/PROJEKTREGELN/PROJEKTREGELN.md)
3. [`AI/AGENTEN/AGENTS.md`](AI/AGENTEN/AGENTS.md)
4. [`AI/SKILLS/SKILL.md`](AI/SKILLS/SKILL.md)
5. passende Skill-Dateien in den Unterordnern von [`AI/SKILLS/`](AI/SKILLS/)

Subagenten und Skills sind Werkzeuge und keine Pflicht.

Sie sollen nur eingesetzt werden, wenn sie:

- echten Qualitätsgewinn bringen
- Kontext sparen
- Risiken sichtbarer machen
- eine Plattform oder Spezialaufgabe sicherer machen

## 17. Ziel dieser Regeln

Diese Regeln dienen dazu, Projekte sauber, konsistent, nachvollziehbar, wirtschaftlich sinnvoll und mit möglichst geringem Risiko umzusetzen.

Im Zweifel gilt immer:

Dokumentation vor Vergessen.  
Transparenz vor Annahme.  
Absicherung vor Risiko.  
Rechtsbewusstsein vor Bequemlichkeit.  
Nachvollziehbarkeit vor Schnellschuss.

## 18. Nächsten sinnvollen Prompt mitdenken

Nach Abschluss einer Abarbeitung sollen Codex oder Claude, wenn es fachlich sinnvoll ist, immer einen kurzen Vorschlag für den nächsten hilfreichen Prompt oder nächsten sinnvollen Arbeitsschritt anzeigen.

Dieser Vorschlag soll:

- knapp sein
- zum aktuellen Projektstand passen
- keine unnötigen Wiederholungen enthalten
- nur dann erscheinen, wenn er echten Mehrwert bringt
