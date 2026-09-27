import { addLog } from "./addLog.ts";
import { cloneState } from "./cloneState.ts";
import type { AgentCommsState, ReviewAssessment } from "./types.ts";

export interface SubmitReviewFeedbackInput {
  reviewId: string;
  reviewer: string;
  assessment: ReviewAssessment;
  summary: string;
  findings: string[];
}

export function submitReviewFeedback(state: AgentCommsState, input: SubmitReviewFeedbackInput): AgentCommsState {
  const next = cloneState(state);
  const review = next.reviews.find((item) => item.id === input.reviewId);
  if (!review) throw new Error(`Review ${input.reviewId} wurde nicht gefunden.`);
  if (review.status === "RESOLVED") throw new Error(`Review ${input.reviewId} ist bereits abgeschlossen.`);
  if (review.reviewer !== input.reviewer) throw new Error(`Review ${input.reviewId} ist ${review.reviewer} zugewiesen.`);

  const now = new Date().toISOString();
  review.feedback.push({ createdAt: now, reviewer: input.reviewer, assessment: input.assessment, summary: input.summary, findings: input.findings });
  review.status = "FEEDBACK_GIVEN";
  review.updatedAt = now;
  next.updatedAt = now;
  addLog(next, input.reviewer, "REVIEW_FEEDBACK_SUBMITTED", `Feedback zu ${input.reviewId} eingetragen.`);
  return next;
}
