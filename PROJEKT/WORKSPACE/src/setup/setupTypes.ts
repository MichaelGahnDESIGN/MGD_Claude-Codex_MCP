export interface SetupOptions {
  mcpProjectRoot: string;
  outputDir: string;
  projectDir: string;
  projectName: string;
}

export interface SetupResult {
  generatedFiles: string[];
  outputDir: string;
  projectDir: string;
}
