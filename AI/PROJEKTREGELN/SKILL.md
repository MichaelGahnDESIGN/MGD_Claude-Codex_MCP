# PROJEKTREGELN

Dieser Ordner enthält ausschließlich projektspezifische Regeln, Annahmen, Ausnahmen, Freigaben und Besonderheiten.

## Ziel

`GRUNDREGELN.md` bleibt allgemein gültig für alle Projekte.

Alles, was nur für ein einzelnes Projekt gilt, wird in `AI/PROJEKTREGELN/` gesammelt und gepflegt.

## Pflichtdatei

Die verbindliche Kerndatei in diesem Ordner ist:

- `PROJEKTREGELN.md`

Sie muss für jedes Projekt vorhanden sein.

## Empfohlenes System

Für kleine Projekte reicht oft:

- `PROJEKTREGELN.md`

Für mittlere oder größere Projekte ist diese Struktur sinnvoll:

- `PROJEKTREGELN.md`
- `ARBEITSKONTEXT.md`
- `ENTSCHEIDUNGEN_UND_AUSNAHMEN.md`
- `FREIGABEN_UND_GRENZEN.md`

## Einsortierungslogik

- Verbindliche Projektregeln und Kernvorgaben gehören nach `PROJEKTREGELN.md`.
- Laufender Projektkontext, Status, Ziele und technische Eckdaten gehören nach `ARBEITSKONTEXT.md`.
- Freigegebene Sonderfälle, feste Technologieentscheidungen oder bewusste Abweichungen gehören nach `ENTSCHEIDUNGEN_UND_AUSNAHMEN.md`.
- Freigabepflichten, Scope-Grenzen, Kundenfreigaben oder sensible Grenzen gehören nach `FREIGABEN_UND_GRENZEN.md`.

## Regeln

- Nur projektspezifische Inhalte in diesem Ordner ablegen.
- Keine allgemeinen, projektübergreifenden Regeln hier duplizieren.
- Bei Widersprüchen zuerst prüfen, ob etwas wirklich projektspezifisch ist.
- Fließtext in UTF-8 mit korrekt geschriebenen Umlauten verfassen.
- Dateien klar benennen und langfristig verständlich halten.

## Zusammenspiel mit der restlichen Struktur

- Allgemeine Regeln stehen in `../../GRUNDREGELN.md`.
- Operative Agentenlogik steht in `../AGENTEN/AGENTS.md`.
- Wiederverwendbare Skills stehen in `../SKILLS/`.
- Projektdokumentation steht in `../../PROJEKT/DOKUMENTATION/`.
