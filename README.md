# Daksha Arvind · PM portfolio

Plain HTML + CSS, one tiny script, no build step. Open `index.html` straight from the file system and it works.

```
index.html              home: hero, 5 project rows, about, contact
fan-concierge.html      case study 1
firesight.html          case study 2
startnow.html           case study 3
multi-sensor.html       case study 4
gardening.html          case study 5
style.css               the only stylesheet (tokens at the top, per-project colors on <body class="p-xx">)
main.js                 fade-up on scroll + logs a TODO count to the console
assets/<project>/       every image, exported (no live widgets)
tools/                  scripts that regenerate the images and QA the site (not deployed)
```


**4. QA pass** (optional, needs Node + Google Chrome):

```sh
cd tools && npm install && npm run check
```

Loads every page at 375px and 1440px, fails on horizontal scroll, broken images, or dead internal links, and saves full-page screenshots to `tools/qa/`.

## Deploy

**Netlify Drop:** go to https://app.netlify.com/drop and drag the whole folder in. `tools/` is harmless to include, but you can leave it out (and `node_modules` definitely).

**GitHub Pages:**

```sh
git init && git add . && git commit -m "Portfolio"
gh repo create <your-username>.github.io --public --source . --push
```

Then in the repo: Settings → Pages → Deploy from branch → `main` / root. Using the repo name `<your-username>.github.io` serves it at that URL. Any other repo name serves it at `<your-username>.github.io/<repo>/`, and all links are relative, so both work.

## Editing visuals

Each image in `assets/` comes from an HTML file in `tools/visuals/` that declares its output path (`<body data-out="...">`). Edit the HTML, then:

```sh
cd tools && npm install     # once; uses your installed Chrome, no browser download
npm run render              # all visuals
node render.mjs gd-         # only files whose name contains "gd-"
```

Heroes render to JPEG (they have gradients), diagrams to PNG, both at 2x.

### What's real and what's a stand-in

| Project | Visuals | Status |
|---|---|---|
| Fan Concierge | 4 demo screens, flow, theming, locked vs unlocked | Recreated from the PRD flow, kept as the final images. If you ever want real captures instead, drop the demo at `assets/fan-concierge/demo.html`, update the selectors in `tools/capture-demo.mjs`, and run `npm run capture-demo`. |
| FireSight | 4 screenshots (dashboard, SOS, wearer close-up, glasses display) | All real, from the team's Devpost (devpost.com/software/tim-oje76l). No `tools/visuals/` source; they're exported straight to `assets/firesight/`. Facts come from Devpost and the public repo (lily1c/la-hacks-2026). |
| StartNOW | Boardroom hero, relay diagram, persona matrix, 1 real screenshot | Hero is recreated; its agent lines are copied from a real session, risk scores are illustrative (labeled on the image). `sn-disagree.png` is the team's real Devpost screenshot. Facts come from Devpost and the public repo (srikondapalli1/startup-sim). |
| Multi-Sensor | Architecture, dashboard concept, sprint timeline | Diagrams. Dashboard values are generated and labeled "Simulated data" on the image. The timeline doesn't assign shipped work to specific sprints. |
| Gardening | 3 concept phone screens, health states, scan flow | Labeled "Concept screens". Swap in the team's real screens when they exist. |

The old Agentverse case study (page, assets, visual sources) is parked in `tools/archive/agentverse/` in case you want it back.

Club crests are drawn as initials in club colors, not the real crests (trademarks).
