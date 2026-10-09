// QA pass: loads every page at 375px and 1440px straight from the file system,
// flags horizontal scroll, broken images, and missing links, and saves full-page
// screenshots to ./qa (or the folder passed as the first argument).
import { chromium } from "playwright-core";
import { readdirSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(process.argv[2] || join(root, "tools", "qa"));
mkdirSync(out, { recursive: true });
const pages = readdirSync(root).filter((f) => f.endsWith(".html"));

const browser = await chromium.launch({ channel: "chrome" });
let problems = 0;
for (const width of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const f of pages) {
    await page.goto(pathToFileURL(join(root, f)).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Lazy images only load near the viewport, so force them before checking.
    await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = "eager"; return i.decode().catch(() => {}); })));
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      wide: [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 3).map((el) => el.tagName + "." + el.className),
      broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src")),
      links: [...document.querySelectorAll("a[href$='.html'], a[href*='.html#']")].map((a) => a.getAttribute("href").split("#")[0]),
      todos: document.querySelectorAll(".todo").length,
    }));
    const missing = r.links.filter((l) => !pages.includes(l));
    const bad = r.overflow > 0 || r.broken.length || missing.length;
    if (bad) problems++;
    console.log(`${bad ? "FAIL" : "ok  "} ${width}px ${f.padEnd(20)} todos=${r.todos}` +
      (r.overflow > 0 ? ` overflow=${r.overflow}px ${r.wide.join(" ")}` : "") +
      (r.broken.length ? ` broken=${r.broken}` : "") + (missing.length ? ` missing=${missing}` : ""));
    await page.screenshot({ path: join(out, `${f.replace(".html", "")}-${width}.png`), fullPage: true });
  }
  await page.close();
}
await browser.close();
process.exit(problems ? 1 : 0);
