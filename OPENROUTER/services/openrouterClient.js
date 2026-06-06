const OPENROUTER_CHAT_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Sendet eine einzelne Chat-Anfrage an OpenRouter.
 *
 * Der API-Schlüssel wird nur im Authorization-Header verwendet und nicht
 * geloggt. Die optionalen OpenRouter-Header identifizieren diese lokale Demo,
 * ohne personenbezogene Daten oder Secrets zu übertragen.
 */
export async function callOpenRouter({ apiKey, model, prompt }) {
  const response = await fetch(OPENROUTER_CHAT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://local.example/claude-codex-mcp-openrouter-demo",
      "X-Title": "Claude-Codex-MCP OpenRouter Demo",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API-Fehler ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}
