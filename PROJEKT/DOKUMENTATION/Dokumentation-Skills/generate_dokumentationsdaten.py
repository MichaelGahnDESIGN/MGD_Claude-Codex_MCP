#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import shutil
from datetime import datetime, timezone
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve()
PROJEKT_ROOT = SCRIPT_PATH.parents[3]
DEV_DOKU_ROOT = PROJEKT_ROOT / "PROJEKT" / "DOKUMENTATION"
WORKSPACE_ROOT = PROJEKT_ROOT / "WORKSPACE"
WORKSPACE_DOKU_ROOT = WORKSPACE_ROOT / "DOKUMENTATION"
OUTPUT_DIR = DEV_DOKU_ROOT / "Dokumentation-Skills" / "generated"
OUTPUT_JSON = OUTPUT_DIR / "dokumentationsdaten.json"
OUTPUT_JS = OUTPUT_DIR / "dokumentationsdaten.js"
LEGACY_PREVIEW_DIR = OUTPUT_DIR / "preview"


def make_href(path: Path) -> str:
    return os.path.relpath(path, DEV_DOKU_ROOT).replace(os.sep, "/")


def readable_label(path: Path) -> str:
    if path.name in {"AGENTS.md", "SKILL.md"}:
        parts = path.relative_to(PROJEKT_ROOT).parts
        return "/".join(parts[-2:]) if len(parts) >= 2 else path.name
    return path.stem


def build_link_entry(path: Path) -> dict:
    href = make_href(path)
    return {
        "label": readable_label(path),
        "path": path.relative_to(PROJEKT_ROOT).as_posix(),
        "sourceHref": href,
        "href": href,
    }


def tree_entry(path: Path, max_depth: int, current_depth: int = 0) -> dict:
    href = make_href(path)
    entry = {
        "name": path.name,
        "path": path.relative_to(PROJEKT_ROOT).as_posix(),
        "sourceHref": href,
        "href": href,
        "type": "dir" if path.is_dir() else "file",
    }
    if path.is_dir() and current_depth < max_depth:
        children = []
        for child in sorted(path.iterdir(), key=lambda p: (p.is_file(), p.name.lower())):
            if child.name.startswith(".") or child.name == "__pycache__":
                continue
            if child.is_dir() or child.suffix.lower() in {".md", ".html", ".json", ".js"}:
                children.append(tree_entry(child, max_depth, current_depth + 1))
        entry["children"] = children
    return entry


def collect_links(base: Path) -> list[dict]:
    return [
        build_link_entry(path)
        for path in sorted(base.rglob("*.md"))
        if not any(part.startswith(".") for part in path.parts)
    ]


def collect_directory_links(directory: Path) -> list[dict]:
    return [build_link_entry(path) for path in sorted(directory.glob("*.md"))]


def count_tree(nodes: list[dict]) -> dict:
    counts = {"dirs": 0, "files": 0}

    def walk(items: list[dict]) -> None:
        for item in items:
            if item["type"] == "dir":
                counts["dirs"] += 1
            else:
                counts["files"] += 1
            walk(item.get("children", []))

    walk(nodes)
    return counts


def build_documentation_areas(root: Path, configs: list[dict]) -> list[dict]:
    areas = []
    for config in configs:
        directory = root / config["directory"]
        if not directory.exists():
            continue
        areas.append(
            {
                "key": config["key"],
                "title": config["title"],
                "description": config["description"],
                "links": collect_directory_links(directory),
            }
        )
    return areas


def build_dev_folder_overview() -> dict:
    ai_root = PROJEKT_ROOT / "AI"
    projekt_dir = PROJEKT_ROOT / "PROJEKT"

    ai_tree = tree_entry(ai_root, 2)
    projekt_tree = tree_entry(projekt_dir, 2)
    ai_counts = count_tree(ai_tree.get("children", []))
    projekt_counts = count_tree(projekt_tree.get("children", []))

    return {
        "intro": "Diese Übersicht zeigt die Vorlage als Systemkarte mit Einstieg, Hauptsäulen und optionalen Details.",
        "start": {
            "title": "Start dieser Vorlage",
            "description": "Diese vier Einstiegspunkte erklären die Grundlogik der Vorlage, bevor du in Agenten, Regeln oder Projektarbeit gehst.",
            "entries": [
                {
                    "label": "Grundregeln",
                    "technicalName": "GRUNDREGELN.md",
                    "description": "Allgemein gültige Regeln, Qualitätsmaßstäbe und Pflichtlogik.",
                    "href": make_href(PROJEKT_ROOT / "GRUNDREGELN.md"),
                },
                {
                    "label": "Root-Skill",
                    "technicalName": "SKILL.md",
                    "description": "Kurzer Einstieg in die Struktur und die wichtigsten Startpunkte.",
                    "href": make_href(PROJEKT_ROOT / "SKILL.md"),
                },
                {
                    "label": "AI",
                    "technicalName": "AI/",
                    "description": "Agenten, Skills und projektspezifische Regeln für die Arbeitslogik.",
                    "href": make_href(ai_root / "AGENTEN" / "AGENTS.md"),
                },
                {
                    "label": "PROJEKT",
                    "technicalName": "PROJEKT/",
                    "description": "Umsetzung, Dokumentation, Backups und eigentliche Arbeitsstände.",
                    "href": make_href(projekt_dir / "DOKUMENTATION" / "SKILL.md"),
                },
            ],
        },
        "systems": [
            {
                "title": "AI",
                "subtitle": "Arbeitslogik mit Rollen, Skills und Regeln",
                "purpose": "Hier wird festgelegt, wie KI-Agenten arbeiten, welche Skills sie nutzen und welche projektspezifischen Grenzen gelten.",
                "counts": {
                    "subareas": 3,
                    "directories": ai_counts["dirs"],
                    "files": ai_counts["files"],
                },
                "primaryLinks": [
                    {
                        "label": "Agenten",
                        "technicalName": "AGENTEN/",
                        "description": "Rollen, Teams und Spezialagenten.",
                        "href": make_href(ai_root / "AGENTEN" / "AGENTS.md"),
                    },
                    {
                        "label": "Skills",
                        "technicalName": "SKILLS/",
                        "description": "Fachliche Hilfen und Arbeitsmuster.",
                        "href": make_href(ai_root / "SKILLS" / "SKILL.md"),
                    },
                    {
                        "label": "Projektregeln",
                        "technicalName": "PROJEKTREGELN/",
                        "description": "Abweichungen, Grenzen und Projektbesonderheiten.",
                        "href": make_href(ai_root / "PROJEKTREGELN" / "PROJEKTREGELN.md"),
                    },
                ],
                "detailsTree": ai_tree.get("children", []),
            },
            {
                "title": "PROJEKT",
                "subtitle": "Projektarbeit, Nachweise und Sicherung",
                "purpose": "Hier liegt die eigentliche technische Arbeit sowie die laufende Dokumentation und Absicherung des Projekts.",
                "counts": {
                    "subareas": 3,
                    "directories": projekt_counts["dirs"],
                    "files": projekt_counts["files"],
                },
                "primaryLinks": [
                    {
                        "label": "Workspace",
                        "technicalName": "WORKSPACE/",
                        "description": "Technische Ergebnisse, Code und KI-erstellte Projektartefakte.",
                        "href": make_href(projekt_dir / "WORKSPACE"),
                    },
                    {
                        "label": "Dokumentation",
                        "technicalName": "DOKUMENTATION/",
                        "description": "Projektwissen, Rechtliches, Changelog und Nachweise.",
                        "href": make_href(projekt_dir / "DOKUMENTATION" / "SKILL.md"),
                    },
                    {
                        "label": "Backups",
                        "technicalName": "BACKUPS/",
                        "description": "Sicherungen und Hinweise zur Wiederherstellung.",
                        "href": make_href(projekt_dir / "BACKUPS" / "README.md"),
                    },
                ],
                "detailsTree": projekt_tree.get("children", []),
            },
        ],
    }


def build_workspace_folder_overview() -> dict:
    workspace_tree = tree_entry(WORKSPACE_ROOT, 2)
    docs_tree = tree_entry(WORKSPACE_DOKU_ROOT, 2) if WORKSPACE_DOKU_ROOT.exists() else {"children": []}
    workspace_counts = count_tree(workspace_tree.get("children", []))
    docs_counts = count_tree(docs_tree.get("children", []))

    return {
        "intro": "Diese Übersicht erklärt das tatsächlich entstandene Projekt im Workspace und die dazugehörige Projektdokumentation.",
        "start": {
            "title": "Start des Workspace-Projekts",
            "description": "Diese Einstiege helfen dir, das konkret gebaute Projekt, seine Dokumentation und den Versionsstand schnell zu erfassen.",
            "entries": [
                {
                    "label": "Workspace-Doku",
                    "technicalName": "WORKSPACE/DOKUMENTATION/SKILL.md",
                    "description": "Einstieg in die Dokumentation des konkreten Projekts.",
                    "href": make_href(WORKSPACE_DOKU_ROOT / "SKILL.md"),
                },
                {
                    "label": "Projektüberblick",
                    "technicalName": "WORKSPACE/DOKUMENTATION/Informationen/Projektueberblick.md",
                    "description": "Kurzbeschreibung, Ziel und Status des entstandenen Projekts.",
                    "href": make_href(WORKSPACE_DOKU_ROOT / "Informationen" / "Projektueberblick.md"),
                },
                {
                    "label": "Versionen",
                    "technicalName": "WORKSPACE/DOKUMENTATION/Projektbetrieb/Versionen.md",
                    "description": "Technischer Versionsstand und Änderungsverlauf des Projekts.",
                    "href": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versionen.md"),
                },
                {
                    "label": "Versions-Log",
                    "technicalName": "WORKSPACE/DOKUMENTATION/Projektbetrieb/Versions-Log.md",
                    "description": "Lesbare Verlaufssicht für Releases, Änderungen und Freigaben.",
                    "href": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versions-Log.md"),
                },
            ],
        },
        "systems": [
            {
                "title": "WORKSPACE",
                "subtitle": "Konkrete technische Projektumsetzung",
                "purpose": "Hier liegt das tatsächlich erstellte Projekt mit Code, Assets, Konfigurationen und seiner konkreten technischen Struktur.",
                "counts": {
                    "subareas": len(workspace_tree.get("children", [])),
                    "directories": workspace_counts["dirs"],
                    "files": workspace_counts["files"],
                },
                "primaryLinks": [
                    {
                        "label": "Projektordner",
                        "technicalName": "WORKSPACE/",
                        "description": "Gesamter Arbeitsbereich des entstandenen Projekts.",
                        "href": make_href(WORKSPACE_ROOT),
                    },
                    {
                        "label": "Projekt-Dokumentation",
                        "technicalName": "WORKSPACE/DOKUMENTATION/",
                        "description": "Die projektbezogene Dokumentationsschicht des Workspace.",
                        "href": make_href(WORKSPACE_DOKU_ROOT / "SKILL.md"),
                    },
                ],
                "detailsTree": workspace_tree.get("children", []),
            },
            {
                "title": "Projekt-Dokumentation",
                "subtitle": "Dokumentation, Versionierung und Verlauf",
                "purpose": "Hier werden Entscheidungen, Risiken, Setup, Deployment, Versionen und Änderungsverlauf des gebauten Projekts dokumentiert.",
                "counts": {
                    "subareas": len(docs_tree.get("children", [])),
                    "directories": docs_counts["dirs"],
                    "files": docs_counts["files"],
                },
                "primaryLinks": [
                    {
                        "label": "Projektüberblick",
                        "technicalName": "Informationen/Projektueberblick.md",
                        "description": "Überblick über Ziel, Scope und Status des Projekts.",
                        "href": make_href(WORKSPACE_DOKU_ROOT / "Informationen" / "Projektueberblick.md"),
                    },
                    {
                        "label": "Versionen",
                        "technicalName": "Projektbetrieb/Versionen.md",
                        "description": "Führende Datei für Versionierung und Änderungen.",
                        "href": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versionen.md"),
                    },
                    {
                        "label": "Versions-Log",
                        "technicalName": "Projektbetrieb/Versions-Log.md",
                        "description": "Kompakte Verlaufssicht für das entstandene Projekt.",
                        "href": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versions-Log.md"),
                    },
                ],
                "detailsTree": docs_tree.get("children", []),
            },
        ],
    }


def build_dev_documentation() -> dict:
    dev_area_config = [
        {
            "key": "informationen",
            "title": "Informationen",
            "directory": "Informationen",
            "description": "Projektbeschreibung, Entscheidungen, Risiken und Kosten für die fachliche und strategische Einordnung.",
        },
        {
            "key": "projektbetrieb",
            "title": "Projektbetrieb",
            "directory": "Projektbetrieb",
            "description": "Setup, Deployment, Backups und Versionen für den laufenden Betrieb und die Nachvollziehbarkeit.",
        },
        {
            "key": "rechtliches",
            "title": "Rechtliches",
            "directory": "Rechtliches",
            "description": "Vorhandenes, Bedenken, Empfehlungen und Quellen für rechtlich sensible Projektpunkte.",
        },
        {
            "key": "todo",
            "title": "ToDo",
            "directory": "ToDo",
            "description": "Offene Punkte, Rückfragen, Freigaben und noch nicht erledigte Aufgaben.",
        },
        {
            "key": "dokumentation_skills",
            "title": "Dokumentation-Skills",
            "directory": "Dokumentation-Skills",
            "description": "Hilfen, Vorlagen und Spezialanleitungen für die Dokumentationsarbeit selbst.",
        },
    ]
    return {
        "key": "dev",
        "tabLabel": "Dev Dokumentation",
        "title": "Klare Übersicht für Struktur, Regeln und laufende Änderungen.",
        "eyebrow": "Dev Dokumentation",
        "lead": "Diese Seite bündelt die Entwicklungs-, Vorlagen- und Systemdokumentation. Im Root von DOKUMENTATION liegen bewusst nur diese Übersicht und die begleitende SKILL.md.",
        "defaultDocumentHref": make_href(DEV_DOKU_ROOT / "SKILL.md"),
        "quickAccess": [
            build_link_entry(path)
            for path in [
                DEV_DOKU_ROOT / "SKILL.md",
                DEV_DOKU_ROOT / "Informationen" / "Projektueberblick.md",
                PROJEKT_ROOT / "AI" / "AGENTEN" / "AGENTS.md",
                PROJEKT_ROOT / "AI" / "SKILLS" / "SKILL.md",
                DEV_DOKU_ROOT / "Rechtliches" / "Rechtliches.md",
                DEV_DOKU_ROOT / "Projektbetrieb" / "Versionen.md",
                DEV_DOKU_ROOT / "ToDo" / "Offene_Punkte.md",
            ]
            if path.exists()
        ],
        "folderOverview": build_dev_folder_overview(),
        "documentationAreas": build_documentation_areas(DEV_DOKU_ROOT, dev_area_config),
        "showAiTools": True,
        "rechtliches": {
            "href": make_href(DEV_DOKU_ROOT / "Rechtliches" / "Rechtliches.md"),
            "label": "Rechtliches/Rechtliches.md",
        },
        "changelog": {
            "href": make_href(DEV_DOKU_ROOT / "Projektbetrieb" / "Versionen.md"),
            "label": "Projektbetrieb/Versionen.md",
        },
        "resources": {
            "title": "Medien und Gestaltungsressourcen",
            "lead": "Visuelle und gestalterische Materialien werden in eigenen Ordnern gehalten, damit sie nicht mit Textdokumentation oder Projektdateien vermischt werden.",
            "items": [
                {"title": "Bilder", "text": "für allgemeine Bildmaterialien und Referenzen"},
                {"title": "Screenshots", "text": "für Zustandsnachweise, Tests und Freigaben"},
                {"title": "Logos", "text": "für Marken- und Projektlogos"},
                {"title": "Fonts", "text": "für Schriften und Font-bezogene Hinweise"},
                {"title": "Icons", "text": "für Iconsets oder einzelne Symbole"},
                {"title": "Styles", "text": "für visuelle Richtlinien, Tokens oder Styling-Hilfen"},
            ],
        },
    }


def build_workspace_documentation() -> dict:
    workspace_area_config = [
        {
            "key": "informationen",
            "title": "Informationen",
            "directory": "Informationen",
            "description": "Überblick, Entscheidungen und Risiken des tatsächlich gebauten Projekts im Workspace.",
        },
        {
            "key": "projektbetrieb",
            "title": "Projektbetrieb",
            "directory": "Projektbetrieb",
            "description": "Setup, Deployment, Versionen, Versions-Log und Backups des konkreten Projekts.",
        },
        {
            "key": "rechtliches",
            "title": "Rechtliches",
            "directory": "Rechtliches",
            "description": "Projektbezogene Pflichtinhalte, Bedenken, Empfehlungen und Quellen für das entstandene Produkt.",
        },
        {
            "key": "todo",
            "title": "ToDo",
            "directory": "ToDo",
            "description": "Offene Punkte, Restarbeiten und Freigaben für das gebaute Projekt.",
        },
    ]
    return {
        "key": "projekt",
        "tabLabel": "Projekt Dokumentation",
        "title": "Klare Übersicht für das entstandene Projekt im Workspace.",
        "eyebrow": "Projekt Dokumentation",
        "lead": "Diese Sicht dokumentiert das konkret entstandene Projekt in WORKSPACE, inklusive Struktur, Versionierung, Versions-Log und projektbezogener Betriebsdokumentation.",
        "defaultDocumentHref": make_href(WORKSPACE_DOKU_ROOT / "SKILL.md"),
        "quickAccess": [
            build_link_entry(path)
            for path in [
                WORKSPACE_DOKU_ROOT / "SKILL.md",
                WORKSPACE_DOKU_ROOT / "Informationen" / "Projektueberblick.md",
                WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versionen.md",
                WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versions-Log.md",
                WORKSPACE_DOKU_ROOT / "Rechtliches" / "Rechtliches.md",
                WORKSPACE_DOKU_ROOT / "ToDo" / "Offene_Punkte.md",
            ]
            if path.exists()
        ],
        "folderOverview": build_workspace_folder_overview(),
        "documentationAreas": build_documentation_areas(WORKSPACE_DOKU_ROOT, workspace_area_config),
        "showAiTools": False,
        "rechtliches": {
            "href": make_href(WORKSPACE_DOKU_ROOT / "Rechtliches" / "Rechtliches.md"),
            "label": "WORKSPACE/DOKUMENTATION/Rechtliches/Rechtliches.md",
        },
        "changelog": {
            "href": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versions-Log.md"),
            "label": "WORKSPACE/DOKUMENTATION/Projektbetrieb/Versions-Log.md",
            "secondaryHref": make_href(WORKSPACE_DOKU_ROOT / "Projektbetrieb" / "Versionen.md"),
            "secondaryLabel": "WORKSPACE/DOKUMENTATION/Projektbetrieb/Versionen.md",
        },
        "resources": {
            "title": "Projektbezogene Arbeitsbereiche",
            "lead": "Diese Sicht konzentriert sich auf das entstandene Produkt, seine Doku und seinen Änderungsverlauf innerhalb des Workspace.",
            "items": [
                {"title": "Projektüberblick", "text": "für Ziel, Scope, Status und Hauptbestandteile des Projekts"},
                {"title": "Entscheidungen", "text": "für Architektur-, UI- und Technikentscheidungen des konkreten Produkts"},
                {"title": "Versionen", "text": "für den führenden technischen Änderungsverlauf"},
                {"title": "Versions-Log", "text": "für die kompakte, lesbare Verlaufssicht"},
                {"title": "Deployment", "text": "für Release- und Ausrollhinweise des Projekts"},
                {"title": "Backups", "text": "für Sicherungs- und Wiederherstellungsnotizen"},
            ],
        },
    }


def build_data(generated_at: str) -> dict:
    ai_root = PROJEKT_ROOT / "AI"
    return {
        "schemaVersion": 4,
        "generatedAt": generated_at,
        "projectRoot": PROJEKT_ROOT.as_posix(),
        "documentationRoot": DEV_DOKU_ROOT.as_posix(),
        "tabs": {
            "dev": build_dev_documentation(),
            "projekt": build_workspace_documentation(),
        },
        "activeTab": "projekt",
        "agents": collect_links(ai_root / "AGENTEN"),
        "skills": collect_links(ai_root / "SKILLS"),
    }


def without_generated_at(data: dict) -> dict:
    comparable = dict(data)
    comparable.pop("generatedAt", None)
    return comparable


def keep_timestamp_when_content_is_same(data: dict) -> dict:
    if not OUTPUT_JSON.exists():
        return data

    try:
        existing_data = json.loads(OUTPUT_JSON.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return data

    # Der Zeitstempel soll nur neue Inhalte markieren. Ohne diese Prüfung würde
    # jeder Generatorlauf einen Git-Diff erzeugen, obwohl sich fachlich nichts
    # geändert hat.
    if without_generated_at(existing_data) == without_generated_at(data):
        data["generatedAt"] = existing_data.get("generatedAt", data["generatedAt"])

    return data


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if LEGACY_PREVIEW_DIR.exists():
        shutil.rmtree(LEGACY_PREVIEW_DIR)
    generated_at = datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
    data = keep_timestamp_when_content_is_same(build_data(generated_at))
    OUTPUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUTPUT_JS.write_text(
        "window.DOKU_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Geschrieben: {OUTPUT_JSON}")
    print(f"Geschrieben: {OUTPUT_JS}")


if __name__ == "__main__":
    main()
