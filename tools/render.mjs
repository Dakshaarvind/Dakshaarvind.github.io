// Renders every tools/visuals/*.html (except _partials) to a PNG in /assets.
// Each visual declares its output path with <body data-out="slug/name.png">
// and puts everything to capture inside #frame.
//
// Usage (from /tools):  npm install && node render.mjs [filter]
// Uses your installed Google Chrome, so no browser download is needed.

import { chromium } from "playwright-core";
import { readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const visuals = join(here, "visuals");
const assets = resolve(here, "..", "assets");
const filter = process.argv[2] || "";

const files = readdirSync(visuals)
  .filter((f) => f.endsWith(".html") && !f.startsWith("_") && f.includes(filter));

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1400, height: 1000 } });

for (const f of files) {
  await page.goto(pathToFileURL(join(visuals, f)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const out = await page.getAttribute("body", "data-out");
  if (!out) { console.warn(`skip ${f}: no data-out`); continue; }
  // Snap to whole pixels so no page background bleeds in at the edge.
  await page.$eval("#frame", (el) => { el.style.height = Math.ceil(el.getBoundingClientRect().height) + "px"; });
  await page.locator("#frame").screenshot({ path: join(assets, out), ...(out.endsWith(".jpg") ? { type: "jpeg", quality: 88 } : {}) });
  console.log(`${f} -> assets/${out}`);
}

await browser.close();
