// Normalisiert Text für das Markdown-Dokument: trimmt Leerzeichen und
// vereinheitlicht Zeilenumbrüche. Markdown-Sonderzeichen werden bewusst
// nicht escaped, da Agenten-Inhalte als Markdown gerendert werden sollen.
export function normalizeMarkdownText(value: string): string {
  return value.trim().replace(/\r\n/g, "\n");
}
