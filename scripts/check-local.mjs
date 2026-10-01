import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const commands = ["format:check", "lint", "typecheck", "knip", "build", "test:browser"];
const directory = resolve(".check-reports");
mkdirSync(directory, { recursive: true });
for (const command of commands) {
  console.log(`\nRequired check: pnpm ${command}`);
  const result = spawnSync("pnpm", [command], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}${result.error ?? ""}`;
  const report = resolve(directory, `${command.replaceAll(":", "-")}.log`);
  writeFileSync(report, output);
  process.stdout.write(output);
  if (result.status !== 0) {
    console.error(`Push blocked: pnpm ${command} failed. Report: ${report}`);
    process.exit(1);
  }
}
