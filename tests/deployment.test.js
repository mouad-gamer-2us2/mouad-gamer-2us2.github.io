import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveDeployment } from "../scripts/deployment.js";
test("user GitHub Pages uses the root", () => {
  assert.equal(
    resolveDeployment({ GITHUB_REPOSITORY: "Example/Example.github.io" }).base,
    "/",
  );
});
test("project Pages supports nested assets and its canonical URL", () => {
  assert.deepEqual(
    resolveDeployment({ GITHUB_REPOSITORY: "example/portfolio" }),
    {
      base: "/portfolio/",
      url: "https://example.github.io/portfolio/",
      customDomain: "",
    },
  );
});
test("custom domains default to root, and can use an explicit subpath", () => {
  assert.equal(
    resolveDeployment({
      GITHUB_REPOSITORY: "example/portfolio",
      SITE_URL: "https://example.com",
    }).base,
    "/",
  );
  assert.equal(
    resolveDeployment({
      SITE_URL: "https://example.com",
      VITE_BASE_PATH: "/work/",
    }).url,
    "https://example.com/work/",
  );
});
test("invalid path and protocol fail the build", () => {
  for (const base of ["portfolio", "/portfolio", "/a/../b/", "/a?b/"])
    assert.throws(() => resolveDeployment({ VITE_BASE_PATH: base }));
  assert.throws(() => resolveDeployment({ SITE_URL: "http://example.com" }));
});
