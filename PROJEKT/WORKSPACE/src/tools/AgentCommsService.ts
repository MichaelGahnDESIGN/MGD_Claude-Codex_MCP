import { addBlocker } from "../domain/addBlocker.ts";
import { addDecision } from "../domain/addDecision.ts";
import { appendChat } from "../domain/appendChat.ts";
import { claimTask } from "../domain/claimTask.ts";
import { completeTask } from "../domain/completeTask.ts";
import { createReview } from "../domain/createReview.ts";
import { createTask } from "../domain/createTask.ts";
import { chatKinds, reviewAssessments, reviewDispositions, taskPriorities, taskTypes } from "../domain/allowedValues.ts";
import { readContext } from "../domain/readContext.ts";
import { resetRound } from "../domain/resetRound.ts";
import { resolveBlocker } from "../domain/resolveBlocker.ts";
import { respondToReview } from "../domain/respondToReview.ts";
import type { CreateTaskInput } from "../domain/types.ts";
import { submitReviewFeedback } from "../domain/submitReviewFeedback.ts";
import { writeHandoff } from "../domain/writeHandoff.ts";
import { validateSafety } from "../safety/validateSafety.ts";
import type { FileStorage } from "../storage/FileStorage.ts";
import { assertSafety } from "./assertSafety.ts";
import { enumValue } from "./parseEnumValue.ts";
import { asRecord, optionalStringValue, stringArrayValue, stringValue } from "./parseInput.ts";

export class AgentCommsService {
  private readonly storage: FileStorage;

  constructor(storage: FileStorage) {
    this.storage = storage;
  }

  async readContext() {
    return readContext(await this.storage.load());
  }

  async listTasks() {
    return (await this.storage.load()).tasks;
  }

  async listReviews() {
    return (await this.storage.load()).reviews;
  }

  async createTask(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const taskInput: CreateTaskInput = {
      sender: stringValue(record, "sender"),
      recipient: stringValue(record, "recipient"),
      type: enumValue(record, "type", taskTypes),
      priority: enumValue(record, "priority", taskPriorities),
      context: stringValue(record, "context"),
      task: stringValue(record, "task"),
      acceptanceCriteria: stringArrayValue(record, "acceptanceCriteria"),
      safetyNote: stringValue(record, "safetyNote")
    };
    return this.storage.update((state) => {
      const next = createTask(state, taskInput);
      return { state: next, result: next.tasks.at(-1) };
    });
  }

  async claimTask(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const taskId = stringValue(record, "taskId");
    const agent = stringValue(record, "agent");
    return this.storage.update((state) => {
      const next = claimTask(state, { taskId, agent });
      return { state: next, result: next.tasks.find((task) => task.id === taskId) };
    });
  }

  async completeTask(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const taskId = stringValue(record, "taskId");
    return this.storage.update((state) => {
      const next = completeTask(state, {
        taskId,
        resultNote: stringValue(record, "resultNote"),
        files: stringArrayValue(record, "files"),
        tests: stringArrayValue(record, "tests"),
        commit: optionalStringValue(record, "commit"),
        pullRequest: optionalStringValue(record, "pullRequest")
      });
      return { state: next, result: next.done.find((task) => task.id === taskId) };
    });
  }

  async appendChat(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const sender = stringValue(record, "sender");
    const kind = enumValue(record, "kind", chatKinds);
    const message = stringValue(record, "message");
    return this.storage.update((state) => {
      const next = appendChat(state, { sender, kind, message });
      return { state: next, result: next.chat.at(-1) };
    });
  }

  async addBlocker(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const reporter = stringValue(record, "reporter");
    const message = stringValue(record, "message");
    const relatedTaskId = optionalStringValue(record, "relatedTaskId");
    return this.storage.update((state) => {
      const next = addBlocker(state, { reporter, message, relatedTaskId });
      return { state: next, result: next.blockers.at(-1) };
    });
  }

  async resolveBlocker(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const blockerId = stringValue(record, "blockerId");
    return this.storage.update((state) => {
      const next = resolveBlocker(state, { blockerId, resolvedBy: stringValue(record, "resolvedBy"), resolutionNote: stringValue(record, "resolutionNote") });
      return { state: next, result: next.blockers.find((blocker) => blocker.id === blockerId) };
    });
  }

  async addDecision(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const author = stringValue(record, "author");
    const title = stringValue(record, "title");
    const rationale = stringValue(record, "rationale");
    const relatedTaskId = optionalStringValue(record, "relatedTaskId");
    return this.storage.update((state) => {
      const next = addDecision(state, { author, title, rationale, relatedTaskId });
      return { state: next, result: next.decisions.at(-1) };
    });
  }

  async writeHandoff(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const from = stringValue(record, "from");
    const to = stringValue(record, "to");
    const summary = stringValue(record, "summary");
    const nextSteps = stringArrayValue(record, "nextSteps");
    const relatedTaskIds = Array.isArray(record.relatedTaskIds) ? stringArrayValue(record, "relatedTaskIds") : [];
    return this.storage.update((state) => {
      const next = writeHandoff(state, { from, to, summary, nextSteps, relatedTaskIds });
      return { state: next, result: next.handoffs.at(-1) };
    });
  }

  async createReview(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const reviewInput = {
      requester: stringValue(record, "requester"),
      reviewer: stringValue(record, "reviewer"),
      question: stringValue(record, "question"),
      acceptanceCriteria: stringArrayValue(record, "acceptanceCriteria"),
      files: stringArrayValue(record, "files"),
      taskId: optionalStringValue(record, "taskId"),
      commit: optionalStringValue(record, "commit")
    };
    return this.storage.update((state) => {
      const next = createReview(state, reviewInput);
      return { state: next, result: next.reviews.at(-1) };
    });
  }

  async submitReviewFeedback(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const reviewId = stringValue(record, "reviewId");
    const reviewer = stringValue(record, "reviewer");
    const assessment = enumValue(record, "assessment", reviewAssessments);
    const summary = stringValue(record, "summary");
    const findings = stringArrayValue(record, "findings");
    return this.storage.update((state) => {
      const next = submitReviewFeedback(state, { reviewId, reviewer, assessment, summary, findings });
      return { state: next, result: next.reviews.find((review) => review.id === reviewId) };
    });
  }

  async respondToReview(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const reviewId = stringValue(record, "reviewId");
    const author = stringValue(record, "author");
    const disposition = enumValue(record, "disposition", reviewDispositions);
    const rationale = stringValue(record, "rationale");
    return this.storage.update((state) => {
      const next = respondToReview(state, { reviewId, author, disposition, rationale });
      return { state: next, result: next.reviews.find((review) => review.id === reviewId) };
    });
  }

  async validateSafety(input: unknown) {
    return validateSafety(stringValue(asRecord(input), "content"));
  }

  async resetRound(input: unknown) {
    assertSafety(input);
    const record = asRecord(input);
    const actor = stringValue(record, "actor");
    const summary = stringValue(record, "summary");
    return this.storage.update((state) => {
      const next = resetRound(state, { actor, summary });
      return { state: next, result: { history: next.history.at(-1), openBlockers: next.blockers } };
    });
  }
}
