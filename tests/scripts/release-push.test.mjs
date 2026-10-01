import assert from "node:assert/strict";
import test from "node:test";
import { validateReleasePush } from "../../scripts/git-state.mjs";

const head = "a".repeat(40);
const remote = "git@github.com:example/portfolio.git";
const receipt = { sha: head, branch: "main", remote };
const update = `HEAD ${head} refs/heads/main ${"b".repeat(40)}\n`;

test("checked release accepts only its captured HEAD, branch, and origin", () => {
  assert.doesNotThrow(() => validateReleasePush(update, head, receipt, ["origin", remote]));
  // An already-pushed branch has no updates; dispatch retries must still work.
  assert.doesNotThrow(() => validateReleasePush("", head, receipt, ["origin", remote]));
  for (const invalid of [undefined, {}, { ...receipt, sha: "b".repeat(40) }]) {
    assert.throws(() => validateReleasePush(update, head, invalid, ["origin", remote]));
  }
  assert.throws(() => validateReleasePush(update, head, receipt, ["other", remote]));
  assert.throws(() => validateReleasePush(update, head, receipt, ["origin", "other-url"]));
  assert.throws(() => validateReleasePush(update, head, receipt, []));
});

test("release receipt never authorizes tags, deletion, other commits, or other branches", () => {
  for (const invalid of [
    update.replace("refs/heads/main", "refs/tags/v2.1.4"),
    update.replace(head, "0".repeat(40)),
    update.replace(head, "c".repeat(40)),
    update.replace("refs/heads/main", "refs/heads/other"),
    `${update}${update.replace("refs/heads/main", "refs/tags/v2.1.4")}`,
  ]) {
    assert.throws(() => validateReleasePush(invalid, head, receipt, ["origin", remote]));
  }
});
