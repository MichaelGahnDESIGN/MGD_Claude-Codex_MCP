import type { ChatKind, TaskPriority, TaskStatus, TaskType } from "./types.ts";

// Diese Listen sind die zentrale Wahrheit fuer alle festen Protokollwerte.
// Sie werden von Tool-Validierung, Dokumentation und spaeteren CLIs genutzt.
export const taskStatuses = ["PENDING", "IN_PROGRESS", "DONE", "BLOCKED", "CANCELED"] as const satisfies readonly TaskStatus[];

export const taskTypes = [
  "CODE",
  "REVIEW",
  "PIXEL_ART",
  "IMAGE_GENERATION",
  "UI_CONCEPT",
  "DOCS",
  "BRAINSTORM",
  "DEPLOY",
  "QA",
  "SECURITY"
] as const satisfies readonly TaskType[];

export const taskPriorities = ["LOW", "NORMAL", "HIGH", "URGENT"] as const satisfies readonly TaskPriority[];

export const chatKinds = ["Hinweis", "Frage", "Antwort", "Status", "Warnung"] as const satisfies readonly ChatKind[];
