import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const buffer = await sharp({
  create: { width: 2, height: 2, channels: 3, background: "white" },
})
  .resize(1)
  .webp()
  .toBuffer();
const metadata = await sharp(buffer).metadata();
assert.equal(metadata.width, 1);
assert.equal(metadata.height, 1);
assert.equal(metadata.format, "webp");
console.log("Native image optimizer: resize and WebP encoding passed.");
