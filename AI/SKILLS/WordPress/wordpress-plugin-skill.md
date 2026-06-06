---
name: wordpress-plugin-skill
description: Use when creating, reviewing, extending, or debugging WordPress plugins with update-safe architecture, hook-based integration, admin settings, and core security basics.
---

# WordPress Plugin Skill

## Einsatz

Nutze diesen Skill für WordPress-Plugins, Admin-Funktionen, REST- oder AJAX-Logik, Hook-Integrationen und pluginnahe Erweiterungen.

## Arbeitsweise

1. Plugin-Zweck und Einbaupunkt klar definieren.
2. WordPress-Hooks, Rechte, Datenfluss und Einstellungen planen.
3. update-sichere Plugin-Architektur bevorzugen.
4. Eingaben absichern und Ausgabe sauber behandeln.
5. Konflikte mit Themes, Rollen oder anderen Plugins prüfen.

## Guardrails

- keine Core-Hacks
- keine Optionen ohne Rechteprüfung
- keine Formulare ohne Nonce- oder Sicherheitskonzept
- keine versteckten Abhängigkeiten auf ein einzelnes Theme ohne Kennzeichnung

## Ergebnis

Klar dokumentieren:

- Hooks oder Integrationspunkte
- Admin- oder Frontend-Auswirkungen
- nötige Tests
- Upgrade- oder Kompatibilitaetsrisiken
