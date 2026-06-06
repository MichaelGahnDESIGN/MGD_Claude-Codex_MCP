/**
 * Zentrale Modell-Konfiguration für die separate OpenRouter-Demo.
 *
 * Die sprechenden Namen links werden im Code genutzt. Die Werte rechts sind
 * die offiziellen Modell-IDs, die an die OpenRouter-API gesendet werden.
 * Preise, Verfügbarkeit und Provider können sich bei OpenRouter ändern.
 */
export const MODELS = {
  /** MiniMax M2.5 laut OpenRouter: minimax/minimax-m2.5 */
  "MiniMax-M2.5": "minimax/minimax-m2.5",

  /** Google Gemma 4 31B Instruct laut OpenRouter: google/gemma-4-31b-it */
  "Gemma-4-31B": "google/gemma-4-31b-it",

  /** OpenAI gpt-oss-120b laut OpenRouter: openai/gpt-oss-120b */
  "GPT-OSS-120B": "openai/gpt-oss-120b",
};

/** Standardmodell, wenn keine spätere Auswahl-Logik ergänzt wird. */
export const DEFAULT_MODEL = "MiniMax-M2.5";
