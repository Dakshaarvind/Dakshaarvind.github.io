// Captures the real Fan Concierge demo once it's in place at
// assets/fan-concierge/demo.html. Writes demo-01.png ... demo-04.png next to it.
//
// The selectors in STEPS are guesses: open the demo, find what you click to move
// between stages, and update them. Each step runs its actions, then screenshots.
//
// Usage (from /tools):  node capture-demo.mjs
// Then frame the PNGs by pointing tools/visuals/fc-hero.html at them, or use them as-is.

import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "assets", "fan-concierge");
const demo = join(dir, "demo.html");
if (!existsSync(demo)) {
  console.error("Missing assets/fan-concierge/demo.html. Drop the June demo file there first.");
  process.exit(1);
}

const STEPS = [
  { name: "demo-01", actions: [] },                                              // club picker
  { name: "demo-02", actions: [{ click: "text=Sheffield United" }] },            // club page
  { name: "demo-03", actions: [{ click: "text=Link" }, { fill: ["input >> nth=0", "12345678"] }, { fill: ["input >> nth=1", "Fan"] }, { click: "button[type=submit]" }, { wait: 2500 }] }, // pass reveal
  { name: "demo-04", actions: [{ click: "text=Fan area" }] },                    // fan area
];

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(demo).href, { waitUntil: "networkidle" });

for (const step of STEPS) {
  for (const a of step.actions) {
    if (a.click) await page.click(a.click);
    if (a.fill) await page.fill(...a.fill);
    if (a.wait) await page.waitForTimeout(a.wait);
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(dir, `${step.name}.png`) });
  console.log(`saved assets/fan-concierge/${step.name}.png`);
}
await browser.close();
