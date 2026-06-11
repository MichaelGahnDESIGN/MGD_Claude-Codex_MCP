import type { AgentCommsState } from "../../domain/types.ts";

export interface RenderCliStatusOptions {
  projectDir: string;
  state: AgentCommsState;
}

export function renderCliStatus(options: RenderCliStatusOptions): string {
  const openTasks = options.state.tasks.filter((task) => task.status !== "DONE" && task.status !== "CANCELED").length;
  const inProgressTasks = options.state.tasks.filter((task) => task.status === "IN_PROGRESS").length;
  const doneTasks = options.state.done.length;
  const openBlockers = options.state.blockers.filter((blocker) => blocker.status === "OPEN").length;
  const lastLog = options.state.logs.at(-1);

  return [
    "# comm status",
    "",
    `Projekt: ${options.state.projectName}`,
    `Projektordner: ${options.projectDir}`,
    `Aktualisiert: ${options.state.updatedAt}`,
    "",
    `Offene Aufgaben: ${openTasks}`,
    `In Arbeit: ${inProgressTasks}`,
    `Erledigt: ${doneTasks}`,
    `Offene Blocker: ${openBlockers}`,
    "",
    `Letzter Log: ${lastLog ? `${lastLog.actor} - ${lastLog.message}` : "Noch kein Log vorhanden."}`,
    ""
  ].join("\n");
}
