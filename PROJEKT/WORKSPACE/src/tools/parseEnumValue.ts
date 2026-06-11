// MCP-Clients senden Tool-Argumente als JSON. Diese Funktion wandelt einen
// Text erst dann in einen engeren Protokollwert um, wenn er wirklich erlaubt ist.
export function enumValue<T extends string>(input: Record<string, unknown>, key: string, allowedValues: readonly T[]): T {
  const value = input[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Pflichtfeld ${key} muss ein nicht-leerer Text sein.`);
  }

  const trimmed = value.trim();
  if (!allowedValues.includes(trimmed as T)) {
    throw new Error(`${key} muss einer dieser Werte sein: ${allowedValues.join(", ")}`);
  }

  return trimmed as T;
}
