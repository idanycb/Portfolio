import assert from "node:assert/strict";
import test from "node:test";

import {
  checkMedianScores,
  scoreMinimums,
  summarizeRuns,
} from "../../scripts/lighthouse-summary.mjs";

function passingScores() {
  return Object.fromEntries(
    Object.entries(scoreMinimums).map(([category, median]) => [category, { median }]),
  );
}

test("exact score floors pass; missing and below-floor medians fail without rounding", () => {
  assert.ok(checkMedianScores(passingScores()).every((check) => check.passed));
  for (const category of Object.keys(scoreMinimums)) {
    for (const median of [scoreMinimums[category] - 0.001, null, NaN, undefined]) {
      const scores = passingScores();
      scores[category] = { median };
      assert.deepEqual(
        checkMedianScores(scores)
          .filter((check) => !check.passed)
          .map((check) => check.category),
        [category],
      );
    }
    const scores = passingScores();
    delete scores[category];
    assert.equal(
      checkMedianScores(scores).find((check) => check.category === category).passed,
      false,
    );
  }
});

test("score gates use the median, allowing one slow outlier but rejecting two", () => {
  const scores = passingScores();
  scores.performance = summarizeRuns([
    report(0.9, 1000),
    report(0.5, 1000),
    report(0.92, 1000),
  ]).scores.performance;
  assert.ok(checkMedianScores(scores).every((check) => check.passed));
  scores.performance = summarizeRuns([
    report(0.9, 1000),
    report(0.5, 1000),
    report(0.89, 1000),
  ]).scores.performance;
  assert.equal(checkMedianScores(scores)[0].passed, false);
});

const metrics = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "speed-index",
  "total-blocking-time",
  "cumulative-layout-shift",
];
function report(score, measurement) {
  return {
    categories: { performance: { score }, accessibility: { score: 1 } },
    audits: Object.fromEntries(metrics.map((metric) => [metric, { numericValue: measurement }])),
  };
}

test("medians resist an outlier and preserve raw values and ranges", () => {
  const result = summarizeRuns([report(0.95, 2500), report(0.6, 9000), report(0.97, 2400)]);
  assert.deepEqual(result.scores.performance, {
    median: 0.95,
    min: 0.6,
    max: 0.97,
    runs: [0.95, 0.6, 0.97],
  });
  assert.equal(result.metrics["largest-contentful-paint"].median, 2500);
  assert.equal(result.representativeRun, 1);
});

test("metric medians need not come from the representative report; ties use the first report", () => {
  const result = summarizeRuns([report(1, 1000), report(1, 2000), report(1, 3000)]);
  assert.equal(result.representativeRun, 1);
  assert.equal(result.metrics["largest-contentful-paint"].median, 2000);
});

test("incomplete, errored, and missing measurements cannot produce a median", () => {
  assert.throws(() => summarizeRuns([report(1, 1000)]));
  assert.throws(() =>
    summarizeRuns([report(1, 1000), report(1, 1000), { runtimeError: { code: "FAILED" } }]),
  );
  assert.throws(() => summarizeRuns([report(1, 1000), report(1, 1000), report(null, 1000)]));
  assert.throws(() => summarizeRuns([report(1, 1000), report(1, 1000), report(1, undefined)]));
});
