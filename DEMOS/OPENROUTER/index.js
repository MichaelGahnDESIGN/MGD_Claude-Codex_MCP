import "dotenv/config";
import chalk from "chalk";
import { DEFAULT_MODEL, MODELS } from "./config.js";
import { callOpenRouter } from "./services/openrouterClient.js";

// Diese Demo bleibt bewusst separat vom WORKSPACE-Projekt.
// DEMOS/OPENROUTER/.env enthält den lokalen API-Schlüssel und wird nicht versioniert.
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error(
    chalk.red(
      "OPENROUTER_API_KEY fehlt. Trage den Schlüssel in DEMOS/OPENROUTER/.env ein oder exportiere ihn vor dem Start."
    )
  );
  process.exit(1);
}

// Hier kann später eine CLI-Auswahl ergänzt werden. Für die Demo reicht ein
// klarer Standardwert, der zentral in config.js gepflegt wird.
const SELECTED_MODEL = DEFAULT_MODEL;
const PROMPT = "Write a short, friendly greeting in German.";

try {
  const reply = await callOpenRouter({
    apiKey: OPENROUTER_API_KEY,
    model: MODELS[SELECTED_MODEL],
    prompt: PROMPT,
  });

  console.log(chalk.cyan("\nModellantwort:\n"));
  console.log(reply ?? "[keine Antwort erhalten]");
} catch (error) {
  console.error(chalk.red(`\nOpenRouter-Aufruf fehlgeschlagen: ${error.message}`));
  process.exit(1);
}
