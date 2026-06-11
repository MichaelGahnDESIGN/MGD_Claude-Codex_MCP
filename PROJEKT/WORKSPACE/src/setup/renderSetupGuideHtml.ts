import { shellQuote } from "./shellQuote.ts";

export interface RenderSetupGuideHtmlOptions {
  generatedFiles: string[];
  outputDir: string;
  projectDir: string;
  projectName: string;
}

export function renderSetupGuideHtml(options: RenderSetupGuideHtmlOptions): string {
  const projectName = escapeHtml(options.projectName);
  const projectDir = escapeHtml(options.projectDir);
  const outputDir = escapeHtml(options.outputDir);
  const codexCommand = escapeHtml(`bash ${shellQuote(`${options.outputDir}/codex-einrichten.sh`)}`);

  return [
    "<!doctype html>",
    '<html lang="de">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    "  <title>Claude-Codex-MCP Anleitung</title>",
    "  <style>",
    "    :root { color-scheme: light dark; --bg: #f6f7f9; --fg: #17191f; --muted: #5f6673; --panel: #ffffff; --border: #d9dde5; --accent: #2463eb; --code: #eef2ff; }",
    "    @media (prefers-color-scheme: dark) { :root { --bg: #111318; --fg: #f2f4f8; --muted: #aab2c0; --panel: #1b1f29; --border: #333a48; --accent: #7aa2ff; --code: #222a3b; } }",
    "    * { box-sizing: border-box; }",
    "    body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.55 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",
    "    .layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 28px; max-width: 1180px; margin: 0 auto; padding: 32px 22px; }",
    "    main, aside { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; }",
    "    main { padding: 28px; }",
    "    aside { position: sticky; top: 18px; align-self: start; padding: 20px; }",
    "    h1 { margin: 0 0 10px; font-size: 2rem; line-height: 1.15; }",
    "    h2 { margin-top: 34px; font-size: 1.35rem; }",
    "    h3 { margin: 22px 0 8px; font-size: 1rem; }",
    "    p, li { color: var(--fg); }",
    "    .lead, .muted { color: var(--muted); }",
    "    .step { border-left: 4px solid var(--accent); padding: 12px 0 12px 16px; margin: 14px 0; }",
    "    code, pre { background: var(--code); border-radius: 6px; }",
    "    code { padding: 2px 5px; }",
    "    pre { overflow: auto; padding: 12px; }",
    "    a { color: var(--accent); }",
    "    .term { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 12px; }",
    "    .term strong { display: block; }",
    "    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } aside { position: static; } }",
    "  </style>",
    "</head>",
    "<body>",
    '  <div class="layout">',
    "    <main>",
    "      <h1>Claude-Codex-MCP Einfach Starten</h1>",
    `      <p class="lead">Projekt: <strong>${projectName}</strong></p>`,
    "      <p>Diese Anleitung ist für Menschen ohne Programmierkenntnisse geschrieben. Du musst nicht verstehen, was ein MCP technisch ist. Wichtig ist: Codex und Claude bekommen einen gemeinsamen lokalen Aufgabenbereich.</p>",
    "      <section class=\"step\">",
    "        <h2>Schritt 1: Prüfe, was erstellt wurde</h2>",
    `        <p><strong>Kommunikationsordner:</strong> <code>${projectDir}</code></p>`,
    `        <p><strong>Hilfe-Dateien:</strong> <code>${outputDir}</code></p>`,
    "        <ul>",
    "          <li><code>agent_comms.md</code> ist die Datei, die du selbst lesen kannst.</li>",
    "          <li><code>agent_comms.state.json</code> ist die technische Datei für MCP-Tools.</li>",
    "        </ul>",
    "      </section>",
    "      <section class=\"step\">",
    "        <h2>Schritt 2: Merke dir /comm</h2>",
    "        <p>Der wichtigste Begriff ist:</p>",
    "        <pre>/comm</pre>",
    "        <p><code>/comm</code> bedeutet: Öffne den gemeinsamen Kommunikations- und Aufgabenbereich für Codex, Claude oder andere KI-Agenten.</p>",
    "      </section>",
    "      <section class=\"step\">",
    "        <h2>Schritt 3: Richte dein Werkzeug ein</h2>",
    "        <p><strong>ChatGPT Codex:</strong></p>",
    `        <pre>${codexCommand}</pre>`,
    "        <p><strong>Claude Code:</strong> Öffne <code>claude-code-einrichten.md</code>.</p>",
    "        <p><strong>Claude Cowork oder Claude Desktop:</strong> Nutze <code>claude-cowork-config.json</code>.</p>",
    "      </section>",
    "      <section class=\"step\">",
    "        <h2>Schritt 4: Arbeite mit den Agenten</h2>",
    "        <ol>",
    "          <li>Codex liest den aktuellen Stand.</li>",
    "          <li>Codex legt eine Aufgabe für Claude an.</li>",
    "          <li>Claude übernimmt die Aufgabe.</li>",
    "          <li>Claude schreibt Rückfragen oder Ergebnisse hinein.</li>",
    "          <li>Codex liest den neuen Stand und arbeitet weiter.</li>",
    "        </ol>",
    "      </section>",
    "      <section class=\"step\">",
    "        <h2>Schritt 5: Sicherheit</h2>",
    "        <p>Bitte niemals Passwörter, API-Keys, Tokens, <code>.env</code>-Inhalte, private Schlüssel, Datenbank-Zugänge, Kundendaten oder private Logs eintragen.</p>",
    "      </section>",
    "      <h2>Erzeugte Dateien</h2>",
    "      <ul>",
    ...options.generatedFiles.map((file) => `        <li><code>${escapeHtml(file)}</code></li>`),
    "      </ul>",
    "    </main>",
    "    <aside aria-label=\"Begriffe und Schritte\">",
    "      <h2>Sidebar</h2>",
    "      <p class=\"muted\">Hier stehen die wichtigsten Begriffe in einfacher Sprache.</p>",
    "      <div class=\"term\"><strong>MCP</strong><span>Eine lokale Schnittstelle, über die KI-Werkzeuge strukturierte Aufgaben lesen und schreiben können.</span></div>",
    "      <div class=\"term\"><strong>Projektordner</strong><span>Der Ordner, in dem deine gemeinsame Agenten-Datei liegt.</span></div>",
    "      <div class=\"term\"><strong>agent_comms.md</strong><span>Menschenlesbare Aufgaben- und Chat-Datei.</span></div>",
    "      <div class=\"term\"><strong>agent_comms.state.json</strong><span>Technische Zustandsdatei. Nicht von Hand bearbeiten.</span></div>",
    "      <div class=\"term\"><strong>/comm</strong><span>Dein Startsignal im Agenten-Chat.</span></div>",
    "      <div class=\"term\"><strong>Safety-Check</strong><span>Schutz gegen offensichtliche Secrets wie Tokens, Passwörter oder private Schlüssel.</span></div>",
    "    </aside>",
    "  </div>",
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
