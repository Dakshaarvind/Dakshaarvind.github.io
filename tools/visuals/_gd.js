// Gardening Assistant concept pieces: leaf badge, potted plant, phone screens.
function leaf(state, size = 64) {
  const ok = state === "happy";
  const fill = ok ? "#3f8f4e" : "#d39a2c", bg = ok ? "#e3f2e1" : "#fbeccd";
  const rot = ok ? 0 : 38;
  const mark = ok
    ? `<path d="M24 34l6 6 11-13" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="M32 22v12" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/><circle cx="32" cy="42" r="2.8" fill="#fff"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="${bg}"/>
   <g transform="rotate(${rot} 32 34)"><path d="M32 8C49 15 54 33 44 47c-5 7-19 7-24 0C10 33 15 15 32 8z" fill="${fill}"/>
   <path d="M32 50v8" stroke="${fill}" stroke-width="3" stroke-linecap="round"/></g>${ok ? mark : `<g>${mark}</g>`}</svg>`;
}
function plant(w = 180, droop = false) {
  const c = droop ? "#8fae5a" : "#3f8f4e", c2 = droop ? "#a9bf6a" : "#5aa867";
  const L = (x, y, r, rx, ry, col) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${r} ${x} ${y})" fill="${col}"/>`;
  const d = droop ? 25 : 0;
  return `<svg width="${w}" viewBox="0 0 180 200">
   <path d="M90 130V70" stroke="#3a6b3a" stroke-width="4"/>
   ${L(60, 78 + d / 2, -40 + d * 1.6, 34, 14, c)}${L(120, 78 + d / 2, 40 - d * 1.6, 34, 14, c)}
   ${L(70, 50 + d / 3, -60 + d, 30, 12, c2)}${L(110, 50 + d / 3, 60 - d, 30, 12, c2)}${L(90, 40, 0, 11, 28, c)}
   ${L(56, 108, -20 + d, 30, 11, c2)}${L(124, 108, 20 - d, 30, 11, c2)}
   <path d="M48 128h84l-10 64H58z" fill="#c8643b"/><rect x="42" y="122" width="96" height="16" rx="5" fill="#b8582f"/></svg>`;
}
const status = `<div class="sb"><span>9:41</span><span>●●● ▮</span></div>`;
function scan() {
  return `<div class="scr dark">${status}<div class="sh">Scan a plant</div>
   <div class="vf"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i>${plant(170, true)}</div>
   <div class="hint">Fit one plant in the frame</div><div class="shut"><b></b></div></div>`;
}
function result() {
  return `<div class="scr">${status}<div class="back">← Scan</div>
   <div class="ph">${plant(120, true)}</div>
   <div class="res">${leaf("help", 58)}<div><small>Health check</small><b>Needs help</b></div></div>
   <p class="why">Something looks off. You don't need a diagnosis to fix it. Start here:</p>
   <div class="step"><span>1</span><div><b>Check the soil</b>If the top inch is dry, water deeply until it drains.</div></div>
   <div class="step"><span>2</span><div><b>Scan again in 3 days</b>We'll compare and tell you if it's turning around.</div></div>
   <div class="cta">Remind me</div></div>`;
}
function natives() {
  const P = [["California poppy", "Full sun · Low water"], ["Hummingbird sage", "Part shade · Low water"], ["Deergrass", "Full sun · Low water"], ["Toyon", "Sun to part shade · Low water"]];
  return `<div class="scr">${status}<div class="sh2">Native picks</div><div class="loc">For Southern California gardens</div>
   <div class="why2">Natives are adapted to local weather, so they forgive more mistakes.</div>
   ${P.map(([n, t], i) => `<div class="np"><i style="background:${["#f2b33d", "#b65a8a", "#9db36a", "#c4473a"][i]}"></i><div><b>${n}</b><span>${t}</span></div><em>+</em></div>`).join("")}
   <div class="tabbar"><span>Scan</span><span>My plants</span><span class="on">Natives</span></div></div>`;
}
