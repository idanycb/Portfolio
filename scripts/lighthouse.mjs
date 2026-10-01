import { chromium } from "@playwright/test";
import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { checkMedianScores, scoreMinimums, summarizeRuns } from "./lighthouse-summary.mjs";

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
  for (const [name, path] of [
    ["home", "/"],
    ["findoc", "/work/findoc"],
    ["gitops", "/work/portfolio-gitops"],
  ].filter(([name]) => !homeOnly || name === "home")) {
    // Synchronous Lighthouse runs leave this process idle long enough for
    // pooled preflight sockets to expire. Do not reuse them between pages.
    const response = await fetch(new URL(path, baseUrl), { headers: { Connection: "close" } });
    if (!response.ok)
      throw new Error(`Lighthouse target ${path} returned HTTP ${response.status}.`);
    await response.body?.cancel();
    for (const formFactor of ["mobile", "desktop"]) {
      const reports = [];
      for (let run = 1; run <= 3; run++) {
        console.log(`Lighthouse: ${name} (${formFactor}), run ${run}/3`);
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
      const result = summarizeRuns(reports);
      const representativePath = `${runDirectory}/${name}-${formFactor}-run-${result.representativeRun}`;
      for (const extension of ["json", "html"])
        copyFileSync(
          `${representativePath}.report.${extension}`,
          `${outputDirectory}/${name}-${formFactor}.report.${extension}`,
        );
      const checks = checkMedianScores(result.scores);
      summary.pages.push({ name, path, formFactor, runDirectory, ...result, checks });
      for (const check of checks.filter((check) => !check.passed)) {
        console.error(
          `FAIL ${name} (${formFactor}): ${check.category} median ${check.median === null ? "missing" : check.median * 100}; minimum ${check.minimum * 100}`,
        );
      }
      saveSummary();
      console.log(
        `Median ${name} (${formFactor}): Performance ${Math.round(result.scores.performance.median * 100)}, LCP ${(result.metrics["largest-contentful-paint"].median / 1000).toFixed(2)}s`,
      );
    }
  }
  summary.status = "complete";
  summary.checksPassed = summary.pages.every((page) => page.checks.every((check) => check.passed));
  saveSummary();
  if (!summary.checksPassed) process.exitCode = 1;
} catch (error) {
  summary.status = "failed";
  saveSummary();
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (server?.pid && server.exitCode === null) process.kill(-server.pid, "SIGTERM");
}
