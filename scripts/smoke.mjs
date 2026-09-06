import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolveDeployment } from "./deployment.js";
import { profile, certifications } from "../src/data/profile.js";

const origin = process.argv[2] || "http://127.0.0.1:4173";
const buildDir = process.env.BUILD_DIR || "dist";
const { base, url } = resolveDeployment();
const root = new URL(base, origin);
const response = await fetch(root);
assert.equal(response.status, 200);
const html = await response.text();
assert.ok(
  html.includes(`href="${url}"`),
  "Canonical URL must match deployment",
);
assert.ok(html.includes('lang="fr"'));
assert.ok(!html.includes("%BASE_URL%"));
const files = [
  profile.cv,
  profile.photo,
  profile.photoAlternative,
  "images/social-card.png",
  "favicon/favicon.svg",
  "favicon/apple-touch-icon.png",
  "robots.txt",
  "sitemap.xml",
  "404.html",
  ...certifications.flatMap((c) => (c.image ? [c.image] : [])),
];
const assets = await readdir(`${buildDir}/assets`);
for (const path of [...files, ...assets.map((name) => `assets/${name}`)]) {
  const res = await fetch(new URL(path, root));
  assert.equal(res.status, 200, `${path} must return 200`);
  const body = Buffer.from(await res.arrayBuffer());
  const disk = await readFile(`${buildDir}/${path}`);
  assert.deepEqual(
    body,
    disk,
    `${path} must serve the correct file, not an HTML fallback`,
  );
}
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(
  sha(await readFile(`${buildDir}/${profile.cv}`)),
  sha(await readFile("cv_mouad_jaalouti (3).pdf")),
  "CV must be identical to the source PDF",
);
console.log(
  `PASS: ${files.length + assets.length} assets, French metadata, canonical URL, and exact CV download at ${root.href}`,
);
