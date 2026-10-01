import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { assertClean, git, validateReleasePush } from "./git-state.mjs";

try {
  const input = readFileSync(0, "utf8");
  const receipt = process.env.PORTFOLIO_CHECK_RECEIPT;
  if (!receipt) throw new Error("Direct pushes are disabled. Use pnpm release:push.");
  const head = git("rev-parse", "HEAD");
  assertClean();
  validateReleasePush(
    input,
    head,
    JSON.parse(readFileSync(receipt, "utf8")),
    process.argv.slice(2),
  );
  assertClean();
  if (git("rev-parse", "HEAD") !== head) throw new Error("HEAD changed. Retry pnpm release:push.");
} catch (error) {
  mkdirSync(".check-reports", { recursive: true });
  writeFileSync(".check-reports/push-gate.log", `${error.message}\n`);
  console.error(`Push blocked: ${error.message} Report: .check-reports/push-gate.log`);
  process.exit(1);
}
