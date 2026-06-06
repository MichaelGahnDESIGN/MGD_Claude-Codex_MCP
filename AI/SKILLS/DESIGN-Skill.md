# DESIGN-SKILL

Dieser Skill definiert, wie Frontend- und Backend-Designs, Websites, Software und Interfaces konzipiert und umgesetzt werden sollen. Ziel ist nicht beliebiges schönes UI, sondern charakterstarkes, produktionsreifes Design mit klarer gestalterischer Richtung.

Das Ergebnis soll niemals generisch, austauschbar oder nach typischer KI Standardästhetik aussehen. Es soll wirken, als sei es bewusst gestaltet worden und nicht nur zusammengesetzt.

Der Nutzer liefert Anforderungen an eine Komponente, eine Seite, eine Anwendung oder ein Interface. Diese Anforderungen können Zielgruppe, Zweck, Stil, technische Rahmenbedingungen oder inhaltliche Wünsche enthalten.

## Grundprinzip

Bevor Code geschrieben wird, wird zuerst die gestalterische Richtung festgelegt. Nicht sofort in Komponenten denken, sondern zuerst in Wirkung, Haltung und Identität.

Jede Umsetzung muss:

- funktional und produktionsreif sein
- eine klare visuelle Haltung besitzen
- zur Aufgabe und Zielgruppe passen
- konsistent und präzise umgesetzt sein
- in den Details durchdacht wirken

## Design Thinking vor dem Coden

Vor jeder Umsetzung müssen diese Fragen geklärt werden:

### 1. Zweck
Welches Problem löst das Interface?
Wofür wird es genutzt?
Wer nutzt es?

### 2. Tonalität
Es muss eine klare ästhetische Richtung gewählt werden.
Nicht mittelmäßig, sondern bewusst.

Mögliche Richtungen zur Inspiration:

- brutal minimal
- editorial
- luxuriös und elegant
- verspielt
- retro futuristisch
- roh und brutalistisch
- technisch industriell
- weich und organisch
- maximalistisch
- geometrisch
- magazinartig
- art déco inspiriert
- futuristisch düster
- hell und poetisch

Die gewählte Richtung muss konsequent umgesetzt werden.

### 3. Rahmenbedingungen
Berücksichtige technische Anforderungen wie:

- Framework oder Stack
- Performance
- Responsiveness
- Accessibility
- Wartbarkeit
- Browserkompatibilität

### 4. Wiedererkennungswert
Jedes Design braucht einen klaren Erinnerungsmoment.

Frage immer:
Was bleibt im Kopf?
Was macht dieses Interface unverwechselbar?
Welche gestalterische Entscheidung trägt die Identität?

## Gestaltungsregeln

### Typografie
Typografie ist kein Nebenthema, sondern ein zentrales Gestaltungsmittel.

Regeln:

- Verwende keine langweiligen Standardfonts ohne Grund
- Vermeide generische Entscheidungen wie Arial, Roboto, Inter oder beliebige Systemschrift als Standardlösung
- Nutze Schrift mit Charakter
- Kombiniere möglichst eine markante Display Schrift mit einer gut lesbaren Textschrift
- Achte auf Hierarchie, Rhythmus, Kontrast und Weißraum
- Typografie soll Stimmung erzeugen, nicht nur Text anzeigen

### Farbe und Theme
Farben müssen bewusst gewählt werden und ein klares visuelles System bilden.

Regeln:

- Arbeite mit CSS Variablen für Farben, Abstände, Schatten und Radius
- Nutze ein konsistentes Farbsystem
- Bevorzuge dominante Hauptfarben mit gezielten Akzenten
- Vermeide schüchterne, gleichmäßig verteilte Paletten ohne Spannung
- Theme Entscheidungen müssen zur Marke, zur Stimmung und zum Einsatzzweck passen
- Nutze helle oder dunkle Themes nicht aus Gewohnheit, sondern aus gestalterischer Logik

### Bewegung
Animationen und Übergänge sollen nicht wahllos verteilt werden. Bewegung muss gezielt Atmosphäre, Orientierung und Qualität erzeugen.

Regeln:

- Setze Animationen bewusst und wirkungsvoll ein
- Bevorzuge bei reinem HTML und CSS zunächst CSS basierte Lösungen
- In React kann eine Motion Library eingesetzt werden, wenn vorhanden
- Gute Bewegung entsteht oft durch wenige starke Momente statt durch viele kleine Effekte
- Nutze Hover States, Entrance Animationen, Scroll Effekte und Übergänge nur, wenn sie die Erfahrung verbessern
- Animationen dürfen nie das Interface verlangsamen oder billig wirken lassen

### Räumliche Komposition
Layouts sollen nicht automatisch dem immer gleichen Muster folgen.

Erlaubt und erwünscht sind:

- Asymmetrie
- Überlagerungen
- ungewöhnliche Raster
- bewusste Brüche
- diagonale Flüsse
- kontrollierte Dichte
- großzügiger negativer Raum

Die Komposition soll Spannung und Identität erzeugen.

### Hintergründe und visuelle Details
Hintergründe und Details sind Teil der Atmosphäre.

Nutze je nach Stil:

- Texturen
- Körnung
- Mesh Verläufe
- Muster
- Transparenzen
- Layer
- Lichtstimmungen
- markante Schatten
- dekorative Linien oder Rahmen
- subtile Noise Overlays
- thematisch passende grafische Details

Vermeide flache Standardflächen ohne Charakter, wenn der Kontext nach mehr Tiefe verlangt.

## Was ausdrücklich vermieden werden soll

Diese Skill verbietet generische KI Optik.

Vermeide insbesondere:

- austauschbare SaaS Optik
- lila Verlauf auf weißem Hintergrund ohne konzeptionellen Grund
- standardisierte Kartenlayouts ohne Charakter
- immer gleiche Hero Section Muster
- immer gleiche Button, Card und Feature Grid Kombinationen
- visuell belanglose Komponenten
- Designentscheidungen, die nur deshalb getroffen wurden, weil sie häufig vorkommen
- gleiche Schrift- und Stilwahl über mehrere Projekte hinweg
- Frontends, die wie Templates statt wie Gestaltung wirken

Jede Umsetzung soll sich nach dem konkreten Kontext richten und eine eigene Persönlichkeit haben.

## Verhältnis von Stil und technischer Komplexität

Die technische Umsetzung muss zur gestalterischen Idee passen.

Regeln:

- Maximalistische oder expressive Designs dürfen komplexere CSS, Animationen und visuelle Ebenen nutzen
- Minimalistische oder elegante Designs brauchen weniger Effekte, dafür mehr Präzision in Abstand, Typografie, Proportion und Detailarbeit
- Nicht jedes Projekt braucht visuelle Lautstärke
- Entscheidend ist die Konsequenz in der Umsetzung, nicht die Menge der Effekte

## Anforderungen an den Code

Der erzeugte Code muss:

- lauffähig und funktional sein
- sauber strukturiert sein
- verständlich aufgebaut sein
- responsiv sein
- gut erweiterbar sein
- barrierearme Grundprinzipien beachten
- Design und Technik sinnvoll verbinden

Je nach Aufgabe kann die Umsetzung erfolgen in:

- HTML / CSS / JavaScript
- React
- Vue
- anderen passenden Frontend Technologien

## Arbeitsweise bei jeder Design Aufgabe

Bei jeder Aufgabe wird in dieser Reihenfolge gearbeitet:

1. Zweck, Zielgruppe und Kontext verstehen
2. Eine klare ästhetische Richtung festlegen
3. Ein unverwechselbares Kernelement definieren
4. Farbwelt, Typografie, Layoutlogik und Bewegungsprinzip bestimmen
5. Erst danach die konkrete Umsetzung bauen
6. Das Ergebnis auf Konsistenz, Wirkung und Detailqualität prüfen

## Qualitätsmaßstab

Das Ziel ist nicht nur ein funktionierendes Interface.
Das Ziel ist ein Interface, das Haltung zeigt.

Jedes Design soll:

- bewusst wirken
- eigenständig wirken
- hochwertig wirken
- relevant zum Kontext sein
- nicht nach Standard KI Oberfläche aussehen

Wenn eine Entscheidung beliebig wirkt, ist sie zu überarbeiten.

## Merksatz

Nicht einfach Oberfläche bauen.
Zuerst Identität entwerfen.
Dann präzise umsetzen.