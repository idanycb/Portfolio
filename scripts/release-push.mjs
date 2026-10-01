import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { assertClean, git, validateTag } from "./git-state.mjs";

function gh(...args) {
  return execFileSync("gh", args, { encoding: "utf8" }).trim();
}
let receiptDirectory;
try {
  if (process.argv.length > 3) throw new Error("Usage: pnpm release:push [v1.2.3]");
  let tag = process.argv[2];
  if (!tag) {
    if (!process.stdin.isTTY || !process.stdout.isTTY)
      throw new Error("Interactive terminal required without a tag. Use pnpm release:push v1.2.3.");
    const tags = git("ls-remote", "--tags", "--refs", "--sort=-version:refname", "origin");
    const latest = tags
      .split("\n")
      .map((line) => line.split("refs/tags/")[1])
      .find((candidate) => {
        try {
          validateTag(candidate);
          return true;
        } catch {
          return false;
        }
      });
    console.log(latest ? `Last release tag: ${latest}` : "No release tags found on origin.");
    const prompt = createInterface({ input: process.stdin, output: process.stdout });
    try {
      tag = (
        await prompt.question("New release tag (vMAJOR.MINOR.PATCH, Enter for push only): ")
      ).trim();
    } finally {
      prompt.close();
    }
  }
  if (tag) validateTag(tag);
  assertClean();
  const sha = git("rev-parse", "HEAD");
  const branch = git("symbolic-ref", "--short", "HEAD");
  const remote = git("config", "--get", "remote.origin.url");
  let repo;
  let defaultBranch;
  if (tag) {
    const match = remote.match(
      /^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([^/]+\/[^/]+?)(?:\.git)?$/,
    );
    if (!match) throw new Error("origin must be a GitHub repository.");
    repo = match[1];
    gh("auth", "status");
    const workflow = JSON.parse(gh("api", `repos/${repo}/actions/workflows/deploy.yml`));
    if (workflow.state !== "active")
      throw new Error("Release workflow is not active on the default branch.");
    defaultBranch = gh("api", `repos/${repo}`, "--jq", ".default_branch");
    const content = JSON.parse(
      gh(
        "api",
        `repos/${repo}/contents/.github/workflows/deploy.yml?ref=${encodeURIComponent(defaultBranch)}`,
      ),
    );
    if (!Buffer.from(content.content, "base64").toString().includes("workflow_dispatch:")) {
      throw new Error("Merge the dispatched release workflow onto the default branch first.");
    }
    const tags = git("ls-remote", "--tags", "origin", `refs/tags/${tag}`, `refs/tags/${tag}^{}`);
    if (tags) {
      const lines = tags.split("\n");
      const existing = (lines.find((line) => line.endsWith("^{}")) ?? lines[0]).split(/\s+/)[0];
      if (existing !== sha)
        throw new Error("Release tag already points to another commit. Tags never move.");
    }
  }
  const checks = spawnSync("pnpm", ["check:local"], { stdio: "inherit" });
  if (checks.error || checks.status !== 0)
    throw new Error("Required local checks failed; nothing was pushed.");
  assertClean();
  if (git("rev-parse", "HEAD") !== sha) throw new Error("HEAD changed during checks.");
  receiptDirectory = mkdtempSync(join(tmpdir(), "portfolio-release-check-"));
  const receipt = join(receiptDirectory, "receipt.json");
  writeFileSync(receipt, JSON.stringify({ sha, branch, remote }), { mode: 0o600 });
  // Reuse only this invocation's successful checks. The hook still validates HEAD and source.
  const push = spawnSync(
    "git",
    ["-c", "push.followTags=false", "push", "origin", `HEAD:refs/heads/${branch}`],
    { stdio: "inherit", env: { ...process.env, PORTFOLIO_CHECK_RECEIPT: receipt } },
  );
  if (push.status !== 0) throw new Error("Push failed; release was not dispatched.");
  assertClean();
  if (git("rev-parse", "HEAD") !== sha)
    throw new Error("HEAD changed during push; release was not dispatched.");
  if (tag) {
    gh(
      "workflow",
      "run",
      "deploy.yml",
      "--repo",
      repo,
      "--ref",
      defaultBranch,
      "-f",
      `tag_name=${tag}`,
      "-f",
      `commit_sha=${sha}`,
      "-f",
      `source_branch=${branch}`,
    );
    console.log(
      `Requested ${tag} for ${sha}. Watch: gh run list --repo ${repo} --workflow deploy.yml`,
    );
  } else {
    console.log(`Pushed ${branch} at ${sha}. No release requested.`);
  }
} catch (error) {
  console.error(`Release stopped: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (receiptDirectory) rmSync(receiptDirectory, { recursive: true, force: true });
}
