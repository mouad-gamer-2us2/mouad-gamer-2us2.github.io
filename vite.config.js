import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolveDeployment, escapeHtml } from "./scripts/deployment.js";
import { site } from "./src/data/site.js";

export default defineConfig(({ mode }) => {
  const deployment = resolveDeployment({
    ...loadEnv(mode, process.cwd(), ""),
    ...process.env,
  });
  return {
    base: deployment.base,
    plugins: [
      react(),
      {
        name: "portfolio-static-metadata",
        transformIndexHtml(html) {
          return {
            html: html
              .replace(
                /<title>.*?<\/title>/,
                `<title>${escapeHtml(site.title)}</title>`,
              )
              .replace(
                /<meta name="description" content="[^"]*" \/>/,
                `<meta name="description" content="${escapeHtml(site.description)}" />`,
              ),
            tags: [
              {
                tag: "link",
                attrs: { rel: "canonical", href: deployment.url },
                injectTo: "head",
              },
              ...Object.entries({
                "og:title": site.title,
                "og:description": site.description,
                "og:url": deployment.url,
                "og:image": `${deployment.url}images/social-card.png`,
                "og:image:alt":
                  "Mouad Jaalouti — Élève ingénieur en sécurité informatique",
                "og:image:width": "1200",
                "og:image:height": "630",
              }).map(([property, content]) => ({
                tag: "meta",
                attrs: { property, content },
                injectTo: "head",
              })),
            ],
          };
        },
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: `User-agent: *\nAllow: /\nSitemap: ${deployment.url}sitemap.xml\n`,
          });
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(deployment.url)}</loc></url></urlset>`,
          });
          this.emitFile({
            type: "asset",
            fileName: "404.html",
            source: `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page introuvable | Mouad Jaalouti</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b111b;color:#edf2f7;font:18px/1.7 system-ui}main{padding:30px;max-width:500px}small,a{color:#7be0bd}h1{font-size:42px}a{display:inline-block;padding:12px 0}a:focus-visible{outline:2px solid #7be0bd;outline-offset:5px}</style><main><small>404 / MOUAD JAALOUTI</small><h1>Cette page est introuvable.</h1><p>Retrouvez mes projets et mon parcours sur le portfolio.</p><a href="${escapeHtml(deployment.base)}">Retour à l’accueil →</a></main></html>`,
          });
          if (deployment.customDomain)
            this.emitFile({
              type: "asset",
              fileName: "CNAME",
              source: deployment.customDomain,
            });
        },
      },
    ],
  };
});
