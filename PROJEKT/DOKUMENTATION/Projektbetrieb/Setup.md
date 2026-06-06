# Setup

Hier werden lokale Voraussetzungen und Einrichtungsschritte dokumentiert.

Typische Inhalte:

- benötigte Software
- Versionen
- Installationsschritte
- Umgebungsvariablen
- Startbefehle
- bekannte Stolperstellen

## Lokales Projektroot

Das Projektroot ist lokal mit Git initialisiert.

Wichtige Schutzregeln:

- `.env`-Dateien werden nicht versioniert.
- `.DS_Store`, Logs, Build-Ausgaben und `node_modules/` werden ignoriert.
- Lokale Backups unter `PROJEKT/BACKUPS/` werden nicht versioniert, außer der
  README.
- Ein GitHub-Remote ist noch nicht dokumentiert.

## Separater OpenRouter-Bereich

`OPENROUTER/` ist ein eigener Demo-Ordner und bleibt außerhalb von
`WORKSPACE/`.

Einrichtung:

```bash
cd OPENROUTER
npm install
cp .env.example .env
```

Danach den lokalen API-Schlüssel in `OPENROUTER/.env` eintragen.

Prüfung ohne API-Aufruf:

```bash
npm run check
```
