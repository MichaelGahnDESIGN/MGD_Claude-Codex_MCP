# OpenRouter Demo

Diese Demo ist ein bewusst separater Testbereich für OpenRouter und gehört
nicht in `PROJEKT/WORKSPACE/`. Sie dient dazu, einzelne Modellaufrufe lokal zu prüfen,
ohne die eigentliche Projektstruktur zu vermischen.

## Zweck

- einfacher Node.js-Aufruf der OpenRouter Chat Completions API
- API-Schlüssel nur lokal über `.env`
- Modellnamen zentral in `config.js`
- eigentlicher API-Aufruf getrennt in `services/openrouterClient.js`

## Voraussetzungen

- Node.js ab Version 18
- ein eigener OpenRouter API-Schlüssel
- Internetzugriff für den API-Aufruf

## Einrichtung

```bash
cd DEMOS/OPENROUTER
npm install
cp .env.example .env
```

Danach in `DEMOS/OPENROUTER/.env` den echten Schlüssel eintragen:

```bash
OPENROUTER_API_KEY=dein_openrouter_api_schluessel
```

Die Datei `.env` darf nicht in Git landen. Sie ist durch `.gitignore`
geschützt.

## Nutzung

```bash
npm start
```

Der Prompt steht in `index.js`. Das Standardmodell wird in `config.js`
festgelegt.

## Modelle

Die Demo kennt aktuell diese sprechenden Namen:

- `MiniMax-M2.5` -> `minimax/minimax-m2.5`
- `Gemma-4-31B` -> `google/gemma-4-31b-it`
- `GPT-OSS-120B` -> `openai/gpt-oss-120b`

Preise, Limits und Verfügbarkeit können sich bei OpenRouter ändern. Vor
produktiver Nutzung müssen die aktuellen OpenRouter-Angaben geprüft und in der
Projekt-Dokumentation bewertet werden.

## Prüfung

```bash
npm run check
```

Dieser Befehl prüft die JavaScript-Dateien syntaktisch, ohne einen API-Aufruf
auszulösen.

## Sicherheit

- keine Secrets im Code
- keine Ausgabe des API-Schlüssels
- keine Speicherung von Modellantworten
- keine personenbezogenen Daten im Beispiel-Prompt
- keine Zahlungs- oder Produktivdaten in dieser Demo
