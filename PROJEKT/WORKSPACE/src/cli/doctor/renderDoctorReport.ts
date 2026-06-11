import type { DoctorReport, DoctorStatus } from "./doctorTypes.ts";

export function renderDoctorReport(report: DoctorReport): string {
  const lines = [
    "# comm doctor",
    "",
    `Projektordner: ${report.projectDir}`,
    `Status: ${report.ok ? "Bereit" : "Handlungsbedarf"}`,
    "",
    ...report.checks.map((check) => `${renderStatus(check.status)} ${check.label}: ${check.message}`),
    ""
  ];

  if (!report.ok) {
    lines.push(
      "Nächster Schritt:",
      "  Starte `comm setup` oder prüfe den Projektordner mit `--project-dir`.",
      ""
    );
  }

  return lines.join("\n");
}

function renderStatus(status: DoctorStatus): string {
  if (status === "ok") {
    return "[OK]";
  }
  if (status === "warn") {
    return "[HINWEIS]";
  }
  return "[FEHLER]";
}
