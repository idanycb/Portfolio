import { execFileSync } from "node:child_process";

export function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}
export function assertClean() {
  if (git("status", "--porcelain", "--untracked-files=no")) {
    throw new Error("Tracked files must match HEAD. Commit or stash changes before pushing.");
  }
  // Local-only files belong in .git/info/exclude, which --exclude-standard honors.
  if (git("ls-files", "--others", "--exclude-standard")) {
    throw new Error(
      "Untracked files exist. Commit them, or list local-only files in .git/info/exclude.",
    );
  }
}
function validateUpdates(input, head) {
  for (const line of input.trim().split("\n").filter(Boolean)) {
    const [localRef, localSha, remoteRef] = line.split(/\s+/);
    if (!remoteRef?.startsWith("refs/heads/") || /^0+$/.test(localSha) || localSha !== head) {
      throw new Error(
        `Push target ${localRef} must be checked HEAD on a branch. Check out the intended branch and push HEAD. Release tags are created by CI.`,
      );
    }
  }
}
export function validateTag(tag) {
  if (
    !/^v(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(
      tag ?? "",
    )
  ) {
    throw new Error("Expected release tag vMAJOR.MINOR.PATCH (optional prerelease).");
  }
}

export function validateReleasePush(input, head, receipt, [remoteName, remoteUrl]) {
  if (
    receipt?.sha !== head ||
    !receipt?.branch ||
    remoteName !== "origin" ||
    !receipt?.remote ||
    receipt.remote !== remoteUrl
  ) {
    throw new Error("Missing or mismatched release receipt. Use pnpm release:push.");
  }
  validateUpdates(input, head);
  for (const line of input.trim().split("\n").filter(Boolean)) {
    const [, , remoteRef] = line.split(/\s+/);
    if (remoteRef !== `refs/heads/${receipt.branch}`)
      throw new Error("Push target differs from checked release branch. Use pnpm release:push.");
  }
}
