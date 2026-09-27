import { addLog } from "./addLog.ts";
import { cloneState } from "./cloneState.ts";
import type { AgentCommsState, ReviewDisposition } from "./types.ts";

export interface RespondToReviewInput {
  reviewId: string;
  author: string;
  disposition: ReviewDisposition;
  rationale: string;
}

export function respondToReview(state: AgentCommsState, input: RespondToReviewInput): AgentCommsState {
  const next = cloneState(state);
  const review = next.reviews.find((item) => item.id === input.reviewId);
  if (!review) throw new Error(`Review ${input.reviewId} wurde nicht gefunden.`);
  if (review.status === "RESOLVED") throw new Error(`Review ${input.reviewId} ist bereits abgeschlossen.`);
  if (review.feedback.length === 0) throw new Error(`Review ${input.reviewId} enthält noch kein Feedback.`);
  if (review.requester !== input.author) throw new Error(`Review ${input.reviewId} kann nur von ${review.requester} beantwortet werden.`);

  const now = new Date().toISOString();
  review.responses.push({ createdAt: now, author: input.author, disposition: input.disposition, rationale: input.rationale });
  review.status = "RESOLVED";
  review.updatedAt = now;
  next.updatedAt = now;
  addLog(next, input.author, "REVIEW_RESPONDED", `Feedback zu ${input.reviewId} ${input.disposition.toLowerCase().replaceAll("_", " ")}.`);
  return next;
}
