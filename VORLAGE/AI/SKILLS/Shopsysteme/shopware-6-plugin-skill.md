---
name: shopware-6-plugin-skill
description: Use when building or modifying Shopware 6 plugins, apps, storefront features, or administration extensions and when update-safe shop architecture matters.
---

# Shopware 6 Skill

## Einsatz

Nutze diesen Skill für Shopware-6-Plugins, Apps, Storefront-Anpassungen, Admin-Erweiterungen und technische Shop-Projekte.

## Arbeitsweise

1. klären, ob Plugin, App oder Konfiguration der richtige Weg ist
2. Storefront, Administration und Business-Logik sauber trennen
3. Integrationen, Caches und Build-Schritte mitdenken
4. Update-, Migrations- und Live-Risiken markieren
5. vor Abschluss Shop-Flows und Abhängigkeiten prüfen

## Guardrails

- keine Core-Änderungen ohne Notfallbegründung
- keine produktiven Checkout-Eingriffe ohne Gegenprüfung
- keine unklaren Annahmen über Version oder Plugin-Landschaft

## Ergebnis

Klar benennen:

- technische Einbaupunkte
- betroffene Shop-Bereiche
- Tests für Storefront, Administration oder Bestellfluss
