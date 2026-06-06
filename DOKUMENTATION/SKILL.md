# DOKUMENTATION

Dieser Ordner enthält die Projektdokumentation in einer bewusst aufgeräumten Struktur.

Diese Dokumentation ist die `Dev Dokumentation` der Vorlage.

Für das konkret entstandene Projekt im `PROJEKT/WORKSPACE/` soll zusätzlich eine eigene `Projekt Dokumentation` in `PROJEKT/WORKSPACE/DOKUMENTATION/` geführt werden.

## Root-Regel

Direkt im Root von `DOKUMENTATION/` sollen nur diese Dateien liegen:

- `index.html`
- `SKILL.md`

Alles andere gehört in passende Unterordner.

## Ziel

Die Dokumentation soll übersichtlich, schnell erfassbar und langfristig wartbar bleiben.

## Unterordner anlegen

Neue Unterordner sind erlaubt und erwünscht, wenn sie die Dokumentation klarer machen.

Typische Beispiele:

- `Informationen/`
- `Rechtliches/`
- `Projektbetrieb/`
- `ToDo/`
- `Dokumentation-Skills/`
- `Bilder/`
- `Screenshots/`
- `Fonts/`
- `Icons/`
- `Logos/`
- `Styles/`

## Einsortierungslogik

- Projektwissen, Entscheidungen und Risiken gehören nach `Informationen/`.
- Die zentrale Start- und Orientierungsdatei liegt unter
  `Informationen/Start_und_Orientierung.md`.
- rechtlich sensible Dokumentation, Prüflisten, Quellen und Bewertungen gehören nach `Rechtliches/`.
- Setup, Deployment, Versionen und Backups gehören nach `Projektbetrieb/`.
- offene Aufgaben und Sammellisten gehören nach `ToDo/`.
- Anleitungen für Dokumentationsarbeit gehören nach `Dokumentation-Skills/`.
- visuelle Assets gehören in die jeweils passenden Medienordner.

## Regeln

- keine neuen Dateien lose im Root ablegen
- Dateinamen klar und dauerhaft lesbar halten
- lieber einen passenden Unterordner anlegen als unstrukturierte Sammeldateien wachsen lassen
- `index.html` bei strukturellen oder inhaltlich wichtigen Änderungen mitpflegen
- `index.html` soll oben klar zwischen `Dev Dokumentation` und `Projekt Dokumentation` umschaltbar sein
- neue Agenten, Skills und Strukturänderungen vollständig und zeitnah in `index.html` nachziehen
- nach Änderungen an Ordnern, Agenten oder Skills den lokalen Generator für die Dokumentationsdaten erneut ausführen
  - Standardbefehl: `python3 DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py`
- Dokumentationswerkzeuge gehören in `DOKUMENTATION/` und nicht in `PROJEKT/WORKSPACE/`
- Medienordner nicht mit Projektcode vermischen
- Fließtext immer in UTF-8 mit korrekt geschriebenen Umlauten verfassen
- ASCII-Umschreibungen wie `Uebersicht` oder `fuer` nur in technischen Dateinamen oder Pfaden verwenden

## Nutzung von `index.html`

`index.html` ist die visuelle Hauptübersicht.

Sie soll:

- den Aufbau von `DOKUMENTATION/` erklären
- zusätzlich die getrennte `Projekt Dokumentation` in `PROJEKT/WORKSPACE/DOKUMENTATION/` zugänglich machen
- eine klare Ordnerübersicht für Root, `VORLAGE/AI/` und `PROJEKT/` enthalten
- wichtige Inhalte knapp zusammenziehen
- einen Bereich `AI Tools` mit vollständiger Agenten- und Skill-Übersicht enthalten
- Agenten-, Skill- und Ordnerübersicht möglichst aus automatisch erzeugten Daten beziehen statt mehrfach manuell gepflegt zu werden
- auf relevante Unterordner und Dateien verlinken
- einen klaren Menüpunkt `Changelog` enthalten
- einen klaren Menüpunkt `Rechtliches` enthalten
- den Changelog sauber, akkurat, detailliert und einfach verständlich abbilden
- den Bereich `Rechtliches` mit `Vorhanden`, `Bedenken`, `Empfehlungen` und Quellenangaben sichtbar zusammenfassen
- ein dezentes und neutrales Design verwenden
- responsive sein
- Light- und Dark-Mode unterstützen
- so barrierearm wie möglich aufgebaut sein
- unnötig große Schriftgrößen vermeiden
- als schneller Einstieg in das Projekt dienen
- nach Abschluss sinnvoller Arbeiten, wenn passend, einen kurzen Vorschlag für den nächsten hilfreichen Prompt oder nächsten sinnvollen Schritt unterstützen
