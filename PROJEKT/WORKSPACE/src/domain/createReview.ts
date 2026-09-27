import { addLog } from "./addLog.ts";
import { cloneState } from "./cloneState.ts";
import { nextId } from "./id.ts";
import type { AgentCommsState } from "./types.ts";

export interface CreateReviewInput {
  requester: string;
  reviewer: string;
  question: string;
  acceptanceCriteria: string[];
  files: string[];
  taskId?: string;
  commit?: string;
}

export function createReview(state: AgentCommsState, input: CreateReviewInput): AgentCommsState {
  const next = cloneState(state);
  const now = new Date().toISOString();
  const reviewId = nextId(next.counters, "review");
  next.reviews.push({
    id: reviewId,
    createdAt: now,
    updatedAt: now,
    requester: input.requester,
    reviewer: input.reviewer,
    question: input.question,
    acceptanceCriteria: input.acceptanceCriteria,
    files: input.files,
    taskId: input.taskId,
    commit: input.commit,
    status: "OPEN",
    feedback: [],
    responses: []
  });
  next.updatedAt = now;
  addLog(next, input.requester, "REVIEW_CREATED", `Review ${reviewId} an ${input.reviewer} erstellt.`);
  return next;
}
