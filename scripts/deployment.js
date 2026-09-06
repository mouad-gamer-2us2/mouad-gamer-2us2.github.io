import { site } from "../src/data/site.js";

export function resolveDeployment(env = process.env) {
  const [owner, repository] = (
    env.GITHUB_REPOSITORY || `${site.githubUsername}/${site.repository}`
  ).split("/");
  const customUrl =
    env.SITE_URL || (site.customDomain ? `https://${site.customDomain}/` : "");
  const defaultBase =
    repository.toLowerCase() === `${owner}.github.io`.toLowerCase()
      ? "/"
      : `/${repository}/`;
  const url = new URL(customUrl || `https://${owner}.github.io${defaultBase}`);
  if (url.protocol !== "https:" || url.search || url.hash)
    throw new Error(
      "SITE_URL doit être une URL HTTPS sans paramètres ni ancre.",
    );
  const base = env.VITE_BASE_PATH || url.pathname;
  if (
    !base.startsWith("/") ||
    !base.endsWith("/") ||
    base.includes("..") ||
    /[?#<>"\s]/.test(base)
  )
    throw new Error(
      "VITE_BASE_PATH doit être un chemin absolu terminé par /, sans caractères spéciaux.",
    );
  url.pathname = base;
  return {
    base,
    url: url.href,
    customDomain: url.hostname.endsWith(".github.io") ? "" : url.hostname,
  };
}

export const escapeHtml = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
