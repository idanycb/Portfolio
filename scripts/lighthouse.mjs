import { chromium } from "@playwright/test";
import { spawn, spawnSync } from "node:child_process";
import { appendFileSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import {
  checkMedianScores,
  failedChecks,
  formatFailure,
  formatMarkdownSummary,
  formatPageRow,
  formatSummary,
  scoreMinimums,
  summarizeRuns,
} from "./lighthouse-summary.mjs";

const args = process.argv.slice(2);
const homeOnly = args.includes("--home-only");
const targets = args.filter((arg) => arg !== "--home-only");
const target = targets[0];
if (targets.length > 1 || (target && !/^https?:\/\//.test(target))) {
  throw new Error("Usage: pnpm lighthouse [https://example.com] [--home-only]");
}
const baseUrl = new URL(target ?? "http://127.0.0.1:3101");
if (
  baseUrl.username ||
  baseUrl.password ||
  baseUrl.search ||
  baseUrl.hash ||
  baseUrl.pathname !== "/"
)
  throw new Error("Lighthouse target must be an origin without credentials, a path, or query.");
const ci = process.env.GITHUB_ACTIONS === "true";
const tty = process.stdout.isTTY;
const clearLine = () => {
  if (tty) process.stdout.write("\r\x1b[K");
};
const outputDirectory = target ? ".lighthouseci/production" : ".lighthouseci";
const runDirectory = `${outputDirectory}/runs/${new Date().toISOString().replaceAll(":", "-")}`;
mkdirSync(runDirectory, { recursive: true });
const summary = {
  target: baseUrl.origin,
  runsPerPage: 3,
  scope: homeOnly ? "home" : "all",
  status: "running",
  scoreMinimums,
  checksPassed: null,
  pages: [],
};
const saveSummary = () =>
  writeFileSync(`${outputDirectory}/summary.json`, `${JSON.stringify(summary, null, 2)}\n`);
saveSummary();
const server = target
  ? undefined
  : spawn(process.execPath, ["scripts/serve-check.mjs", "3101"], {
      stdio: "inherit",
      detached: true,
    });
try {
  if (server) {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (server.exitCode !== null) throw new Error("Lighthouse test server exited.");
      try {
        const response = await fetch("http://127.0.0.1:3101", { headers: { Connection: "close" } });
        ready = response.ok;
        await response.body?.cancel();
      } catch {
        /* Server is starting. */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    if (!ready) throw new Error("Lighthouse server did not start.");
  }
  // The sitemap lists every public page, so new case studies are audited
  // without editing this script. Its URLs use the production origin; only the
  // paths are kept and resolved against the target.
  const sitemap = await fetch(new URL("/sitemap.xml", baseUrl), {
    headers: { Connection: "close" },
  });
  if (!sitemap.ok) throw new Error(`Lighthouse sitemap returned HTTP ${sitemap.status}.`);
  const paths = [...(await sitemap.text()).matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(
    ([, loc]) => new URL(loc).pathname,
  );
  if (!paths.includes("/")) throw new Error("Lighthouse sitemap does not list the home page.");
  const pages = paths
    .map((path) => [path === "/" ? "home" : path.split("/").filter(Boolean).at(-1), path])
    .filter(([name]) => !homeOnly || name === "home");
  const nameWidth = Math.max(...pages.map(([name]) => name.length));
  for (const [name, path] of pages) {
    // Synchronous Lighthouse runs leave this process idle long enough for
    // pooled preflight sockets to expire. Do not reuse them between pages.
    const response = await fetch(new URL(path, baseUrl), { headers: { Connection: "close" } });
    if (!response.ok)
      throw new Error(`Lighthouse target ${path} returned HTTP ${response.status}.`);
    await response.body?.cancel();
    for (const formFactor of ["mobile", "desktop"]) {
      const reports = [];
      if (ci) console.log(`::group::Lighthouse: ${name} (${formFactor})`);
      for (let run = 1; run <= 3; run++) {
        // A terminal shows one progress line; CI folds the run lines into a group.
        const progress = `Lighthouse: ${name} (${formFactor}), run ${run}/3`;
        if (tty) process.stdout.write(`\r\x1b[K${progress}`);
        else console.log(progress);
        const outputPath = `${runDirectory}/${name}-${formFactor}-run-${run}`;
        const result = spawnSync(
          "pnpm",
          [
            "exec",
            "lighthouse",
            new URL(path, baseUrl).href,
            "--output=json",
            "--output=html",
            `--output-path=${outputPath}`,
            "--chrome-flags=--headless --no-sandbox",
            "--quiet",
            ...(formFactor === "desktop" ? ["--preset=desktop"] : []),
          ],
          { stdio: "inherit", env: { ...process.env, CHROME_PATH: chromium.executablePath() } },
        );
        if (result.error || result.status !== 0)
          throw new Error(`Lighthouse failed for ${path} (${formFactor}), run ${run}.`);
        const report = JSON.parse(readFileSync(`${outputPath}.report.json`, "utf8"));
        if (report.runtimeError || report.configSettings.formFactor !== formFactor)
          throw new Error(`Invalid Lighthouse report for ${path} (${formFactor}), run ${run}.`);
        reports.push(report);
      }
      clearLine();
      if (ci) console.log("::endgroup::");
      const result = summarizeRuns(reports);
      const representativePath = `${runDirectory}/${name}-${formFactor}-run-${result.representativeRun}`;
      for (const extension of ["json", "html"])
        copyFileSync(
          `${representativePath}.report.${extension}`,
          `${outputDirectory}/${name}-${formFactor}.report.${extension}`,
        );
      const checks = checkMedianScores(result.scores);
      const page = { name, path, formFactor, runDirectory, ...result, checks };
      summary.pages.push(page);
      saveSummary();
      console.log(formatPageRow(page, nameWidth));
    }
  }
  summary.status = "complete";
  summary.checksPassed = summary.pages.every((page) => page.checks.every((check) => check.passed));
  saveSummary();
  console.log(`\n${formatSummary(summary.pages, outputDirectory)}`);
  if (ci) {
    for (const failure of failedChecks(summary.pages))
      console.log(`::error title=Lighthouse::${formatFailure(failure)}`);
    if (process.env.GITHUB_STEP_SUMMARY)
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, formatMarkdownSummary(summary.pages));
  }
  if (!summary.checksPassed) process.exitCode = 1;
} catch (error) {
  summary.status = "failed";
  saveSummary();
  clearLine();
  if (ci) console.log("::endgroup::");
  console.error(ci ? `::error title=Lighthouse::${error.message}` : error.message);
  process.exitCode = 1;
} finally {
  if (server?.pid && server.exitCode === null) process.kill(-server.pid, "SIGTERM");
}
