# /Doku Skill - Dokumentation automatisch aktualisieren

## Überblick

Der **`/Doku`-Skill** ist das Herzstück dieser Vorlage.

Er **erkennt automatisch Änderungen** im Projekt und **hält die Dokumentation aktuell**, damit:
- Alle verstehen, wie das Projekt funktioniert
- Entscheidungen nachvollziehbar sind
- Neue Dateien korrekt dokumentiert werden
- Versionierung transparent bleibt

**Nutze ihn regelmäßig** - idealerweise nach jedem größeren Arbeitsschritt.

---

## Wie es funktioniert

### **Automatische Erkennung**

`/Doku` scannt regelmäßig:

1. **Neue Dateien in `PROJEKT/WORKSPACE/`** (Code, Assets, Konfigurationen)
2. **Neue Skills und Agenten** in `VORLAGE/AI/SKILLS/` und `VORLAGE/AI/AGENTEN/`
3. **Änderungen in PROJEKTREGELN** (`VORLAGE/AI/PROJEKTREGELN/`)
4. **Git-Commits** (wenn Git genutzt wird)
5. **Versionsänderungen** (in `PROJEKT/WORKSPACE/DOKUMENTATION/Projektbetrieb/Versionen.md`)

### **Automatische Aktualisierung**

`/Doku` erstellt oder aktualisiert dann:

```
DOKUMENTATION/
├── Informationen/
│   ├── Projektueberblick.md       ← kurze Beschreibung
│   ├── Entscheidungen.md          ← Architektur-Entscheidungen
│   ├── Risiken.md                 ← bekannte Probleme
│   └── Kosten_und_Lizenzen.md    ← Abhängigkeiten

├── Projektbetrieb/
│   ├── Setup.md                   ← So startest du das Projekt
│   ├── Deployment.md              ← So deployst du
│   ├── Versionen.md               ← Technischer Changelog
│   └── Backups.md                 ← Sicherungs-Richtlinien

├── Rechtliches/
│   ├── Rechtliches.md             ← Rechtliche Punkte
│   └── Pflicht-Checkliste_DE-EU.md ← Compliance-Checklist

└── ToDo/
    └── Offene_Punkte.md           ← Noch zu erledigen

PROJEKT/WORKSPACE/DOKUMENTATION/   ← Projekt-spezifische Doku
├── Informationen/Projektueberblick.md
├── Projektbetrieb/Versionen.md
├── Projektbetrieb/Versions-Log.md
└── ... weitere

index.html                         ← Visuelle Übersicht (auto-updated)
```

---

## Wie du `/Doku` nutzt

### **Claude Code**

```
Du:      "/Doku"
Claude:  Scannt das Projekt, erkennt Änderungen, aktualisiert Doku
Ergebnis: Alle Dateien sind aktualisiert
```

### **Codex/ChatGPT**

```
Du:      "/doku"
Codex:   Führt Custom Command aus, scannt, aktualisiert Doku
Ergebnis: Alle Dateien sind aktualisiert
```

### **Mit Parameter** (optional)

```
Claude:  "/Doku full"         - Komplette Neu-Generierung
Claude:  "/Doku workspace"    - Nur WORKSPACE-Doku aktualisieren
Claude:  "/Doku changelog"    - Nur Versionierung updaten
Codex:   /doku --full         - Analog für Codex
```

---

## Die zwei Dokumentationssysteme

### **1. Dev Dokumentation** (`DOKUMENTATION/`)

Dokumentiert die **Vorlage und Entwicklungsumgebung**:

```
Was wird dokumentiert?
- Wie die Vorlage funktioniert
- Welche Agenten und Skills verfügbar sind
- Projektregeln und Grenzen
- Setup- und Deployment-Hinweise

Wer liest das?
- Du selbst (zum verstehen der Vorlage)
- Projektmanager (zum steuern)
- Neuer Entwickler (zum Einarbeiten)

Updated durch: /Doku
```

### **2. Projekt Dokumentation** (`PROJEKT/WORKSPACE/DOKUMENTATION/`)

Dokumentiert das **konkrete, entstehende Projekt**:

```
Was wird dokumentiert?
- Was das Projekt ist und kann
- Technische Entscheidungen
- Risiken und offene Punkte
- Versionshistorie (Versions-Log)
- Rechtliche und Compliance-Punkte

Wer liest das?
- Entwickler (zum verstehen des Projekts)
- Tester (zum prüfen)
- Kunden (zum nutzen)
- Zukünftige Maintainer

Updated durch: /Doku
```

**Wichtig:** `/Doku` hält BEIDE Systeme aktuell!

---

## Was `/Doku` konkret macht

### **Phase 1: Scan & Erkennung**

```
1. Durchsucht PROJEKT/WORKSPACE/ nach:
   - Neuen Dateien / Ordnern
   - Gelöschten Dateien
   - Geänderten Dateien (wenn Git aktiviert)

2. Liest VORLAGE/REGELN/PROJEKTREGELN.md um zu verstehen:
   - Projektart (Website, Plugin, App, etc.)
   - Technischer Rahmen
   - Besonderheiten

3. Scannt Versionierung:
   - Git Commits (falls vorhanden)
   - Einträge in Versionen.md
```

### **Phase 2: Dokumentation generieren/aktualisieren**

```
4. Erstellt oder aktualisiert:
   - Projektueberblick.md
     * Was ist das Projekt?
     * Welche Technologien?
     * Aktueller Status?

   - Entscheidungen.md
     * Warum diese Architektur?
     * Warum diese Tools?
     * Welche Alternativen?

   - Risiken.md
     * Bekannte Probleme
     * Performance-Hotspots
     * Sicherheitsbedenken

   - Setup.md
     * Node/Rust/Python installieren
     * Repository klonen/setup
     * Abhängigkeiten installieren
     * Lokale Umgebung starten

   - Deployment.md
     * Build-Schritte
     * Publishing-Prozess
     * Rollback-Strategie

   - Versionen.md
     * Technischer Changelog
     * Wer hat was wann geändert?
     * Git commits mapping

   - Versions-Log.md
     * Lesbare Änderungsübersicht
     * Release-Noten
     * Breaking Changes

   - Rechtliches.md
     * DSGVO/Datenschutz Checks
     * Lizenzen der Dependencies
     * Compliance-Anforderungen

   - Offene_Punkte.md
     * TODO-Items
     * Risiken
     * Ungewisse Punkte
```

### **Phase 3: index.html regenerieren**

```
5. Ruft Python-Skript auf:
   DOKUMENTATION/Dokumentation-Skills/generate_dokumentationsdaten.py
   
6. Script generiert:
   - JSON-Datei mit allen Metadaten
   - JavaScript-Datei für index.html
   - Folder-Trees und Link-Maps

7. index.html wird gerendert mit:
   - Tab-Switch: Dev Doku ↔ Projekt Doku
   - Folder-Navigation
   - Quick-Access Links
   - Changelog mit Git-Integration
   - Rechtliches mit Status-Übersicht
   - AI-Tools Übersicht (Agenten + Skills)
```

### **Phase 4: Git Integration** (falls Git aktiviert)

```
8. Optional: Neuer Commit
   "docs: update documentation with /Doku"
   
9. Optional: Git Tags für Releases
   "v1.2.0" + "released: 2026-04-03"
```

---

## Wichtige Datei-Beschreibungen

### **Projektueberblick.md**

Kurze 1-2 Seite über das Projekt:

```markdown
# [Projektname]

**Was ist das?**  
[Eine Zeile Beschreibung]

**Ziel:**  
[Was soll am Ende fertig sein?]

**Aktueller Status:**  
[Alpha / Beta / Live / Wartung]

**Hauptbestandteile:**  
- [Komponente 1]
- [Komponente 2]
- ...

**Technologie:**  
- Frontend: [...]
- Backend: [...]
- Datenbank: [...]

**Wichtige Links:**  
- Repository: [...]
- Live-Site/Demo: [...]
- Issue-Tracker: [...]
```

### **Entscheidungen.md**

Dokumentiert **WARUM** Entscheidungen getroffen wurden:

```markdown
# Architektur-Entscheidungen

## React statt Vue
**Entscheidung:** React wählen  
**Grund:** Großere Community, mehr Libraries, Team-Know-how  
**Alternativen geprüft:** Vue, Angular, Svelte  
**Risiken:** Größeres Bundle-Size  
**Datum:** 2026-03-15

## PostgreSQL statt MongoDB
**Entscheidung:** Relationale Datenbank  
**Grund:** Komplexe Queries nötig, Daten-Integrität wichtig  
**Alternativen geprüft:** MongoDB, DynamoDB  
**Risiken:** Scaling kann teuer werden  
**Datum:** 2026-03-18
```

### **Risiken.md**

Bekannte Probleme und Unsicherheiten:

```markdown
# Bekannte Risiken

## Performance bei hohem Traffic
**Problem:** API kann 100+ gleichzeitige Requests nicht handlen  
**Impact:** Site wird langsam bei Spitzenlast  
**Wahrscheinlichkeit:** Mittel (wenn erfolgreich)  
**Mitigation:** Caching + Load-Balancing geplant  
**Zeitpunkt:** vor Release

## Vendor-Lock-in bei Hosting
**Problem:** Custom-Config für Hoster, Migration schwierig  
**Impact:** Hohe Ausstiegskosten  
**Wahrscheinlichkeit:** Hoch  
**Mitigation:** Docker + IaC nutzen  
**Zeitpunkt:** jetzt schon implementieren
```

### **Versionen.md**

Technischer Changelog (für Maschinen lesbar):

```
## [0.3.0] - 2026-04-03

### Added
- Git integration in /Doku skill
- Auto-generated index.html
- Versions-Log.md creation

### Changed
- Improved Codex integration
- Updated index.md structure

### Fixed
- Doku-skill Python errors
- Missing PROJEKT/WORKSPACE/DOKUMENTATION folder

### Deprecated
- Old Python 3.8 support

### Security
- Updated dependencies for CVE-2026-12345
```

### **Versions-Log.md**

Menschlich lesbare Release-Noten:

```
# Releases & Changelog

## v0.3.0 - April 3, 2026
**Bereich:** Dokumentation & Tools  
**Highlights:**
- /Doku-Skill komplett überarbeitet
- Codex-Integration neu geschrieben
- index.html wird jetzt auto-generiert

**Breaking Changes:** Keine  
**Upgrade-Zeit:** < 5 Minuten

## v0.2.0 - March 30, 2026
[...]
```

---

## Best Practices für `/Doku`

### **✅ TUN:**

- Nutze `/Doku` nach jedem **Arbeitsblock** (nicht nur am Ende)
- Schreibe **Risiken** auf, wenn du Unsicherheiten hast
- Dokumentiere **WARUM** du etwas gemacht hast (nicht nur WAS)
- Nutze `/Doku full` bei großen Änderungen
- Lese **Entscheidungen.md** vor großen neuen Features

### **❌ NICHT:**

- Dateien manuell in DOKUMENTATION/ bearbeiten (außer Risiken)
- Veraltete Informationen nicht aktualisieren
- Doku vergessen, wenn es "nur ein kleiner Fix" ist
- Rechtliche Punkte ignorieren
- Versionsnummern ohne /Doku erhöhen

---

## Troubleshooting

**Problem: `/Doku` wird nicht ausgeführt**

→ Überprüfe ob:
- Claude oder Codex "doku-skill.md" kennt
- DOKUMENTATION/ Ordner existiert
- Python installiert ist (für generate_dokumentationsdaten.py)

**Problem: index.html wird nicht aktualisiert**

→ Überprüfe ob:
- `generate_dokumentationsdaten.py` funktioniert
- `DOKUMENTATION/Dokumentation-Skills/generated/` Ordner existiert
- Browser-Cache löscht (Strg+Shift+Delete)

**Problem: Git-Integration funktioniert nicht**

→ Überprüfe ob:
- Git im Projekt initialisiert ist (`git init`)
- `.git/` Ordner existiert
- Commits vorhanden sind

---

## Zusammenfassung

| Punkt | Details |
|-------|---------|
| **Zweck** | Dokumentation aktuell halten |
| **Auslöser** | Manuell: `/Doku` (Claude) oder `/doku` (Codex) |
| **Was erkannt** | Neue Dateien, Entscheidungen, Risiken, Versionen, Git-Commits |
| **Was updated** | Dev Doku + Projekt Doku + index.html |
| **Häufigkeit** | Nach jedem Arbeitsblock (mind. täglich) |
| **Abhängigkeiten** | Python 3.8+, Git (optional aber empfohlen) |
| **Zeit pro Run** | 30 Sekunden - 2 Minuten |

**Regel:** Dokumentation ist nicht optional - sie ist dein Gedächtnis! 🧠

