// Screen builders for the Fan Concierge visuals. Generic copy only:
// no real fixtures, prices, member data, or internal URLs.
const CLUBS = {
  sufc:  { cls: "sufc",  name: "Sheffield United",   nick: "The Blades",    init: "SU", ground: "Bramall Lane" },
  qpr:   { cls: "qpr",   name: "Queens Park Rangers", nick: "The R's",      init: "QPR", ground: "Loftus Road" },
  ccfc:  { cls: "ccfc",  name: "Cardiff City",        nick: "The Bluebirds", init: "CC", ground: "Cardiff City Stadium" },
  swans: { cls: "swans", name: "Swansea City",        nick: "The Swans",     init: "SC", ground: "Swansea.com Stadium" },
};
const STEP_NAMES = ["Find your club", "Club page", "Link season ticket", "Fan area"];

function side(active) {
  const li = STEP_NAMES.map((n, i) => {
    const s = i + 1, cls = s < active ? "done" : s === active ? "on" : "";
    return `<li class="${cls}"><b>${s < active ? "✓" : s}</b>${n}</li>`;
  }).join("");
  return `<aside class="side"><div class="logo"><i></i><div>Fan Concierge<small>on ASI:One</small></div></div>
    <h5>Your journey</h5><ul class="steps">${li}</ul>
    <div class="foot">Club Concierge + partner agents<br>powered by Fetch.ai</div></aside>`;
}
const crest = (c) => `<div class="crest">${c.init}</div>`;

function picker() {
  const cards = Object.values(CLUBS).map((c) => `<div class="clubcard ${c.cls}">${crest(c)}<div><h4>${c.name}</h4><p>${c.nick} · EFL Championship</p></div><span class="go">Select →</span></div>`).join("");
  return `<div class="app neutral">${side(1)}<main class="main">
    <div class="h">Find your club</div><div class="sub">One concierge, four clubs. Pick yours to see what members unlock.</div>
    <div class="search">Search clubs</div><div class="clubs">${cards}</div></main></div>`;
}

function club(k) {
  const c = CLUBS[k];
  return `<div class="app ${c.cls}">${side(2)}<main class="main">
    <div class="band">${crest(c)}<div><div class="h">${c.name}</div><div class="sub">${c.nick} · ${c.ground}</div></div></div>
    <div class="tiles">
      <div class="tile"><h6>Next fixture</h6><div class="big">Matchday</div><div class="muted">Kick-off, gates and travel in one place</div>
        <div class="btn ghost">Ask the concierge</div></div>
      <div class="tile"><h6>What you unlock</h6><ul class="unlock">
        <li>Club Concierge agent for fixtures, FAQs and membership help</li>
        <li>Digital season ticket pass</li><li>Partner offers: merch, signed memorabilia, hospitality</li>
        <li>Members-only experiences and competitions</li></ul>
        <div class="btn">Link your season ticket →</div></div>
    </div></main></div>`;
}

function pass(k) {
  const c = CLUBS[k];
  return `<div class="app ${c.cls}">${side(3)}<main class="main">
    <div class="h">You're in.</div><div class="sub">Your season ticket is linked. Here's your digital pass.</div>
    <div class="stepper"><span>Membership number + surname</span><em></em><span>Verifying</span><em></em><span>Pass ready</span></div>
    <div class="passwrap"><div class="pass"><div class="top">${crest(c)}<span class="kind">Season ticket holder</span></div>
      <div class="name">${c.name}</div>
      <div class="row"><div><small>Member</small>A. Fan</div><div><small>Membership no.</small>•••• ••••</div><div><small>Ground</small>${c.ground}</div></div>
      <span class="verified">✓ Verified</span></div></div></main></div>`;
}

function fan(k, locked) {
  const c = CLUBS[k];
  const body = `<div class="fa ${locked ? "lock" : ""}">
      <div class="chat"><div class="who"><i></i><div><b>${c.nick.replace("The ", "")} Concierge</b><small>● Club Concierge agent</small></div></div>
        <div class="bub me">What do I need to know for Saturday?</div>
        <div class="bub ai">Here's your matchday rundown:<ul><li>Kick-off and gate times</li><li>Travel and parking options</li><li>Where to collect member offers</li></ul></div>
        <div class="bub me">Can I bring a guest?</div>
        <div class="chips"><span>Fixtures</span><span>Membership help</span><span>FAQs</span></div></div>
      <div class="stack">
        <div class="partner"><h6>Fetch.ai partner agent</h6><b>Shop &amp; experiences</b><p>Merch, signed memorabilia, hospitality and competitions, through one chat.</p></div>
        <div class="mini"><i>%</i><div><b>Member offers</b><span>From club partners</span></div></div>
        <div class="mini"><i>★</i><div><b>Experiences</b><span>Members-only events</span></div></div>
        <div class="mini"><i>▣</i><div><b>Digital pass</b><span>Linked and verified</span></div></div>
      </div></div>`;
  const overlay = locked ? `<div class="locked-overlay"><div><div class="padlock">🔒</div><h4>Members only</h4><p>Link your season ticket to unlock your concierge, offers and experiences.</p><div class="btn">Link season ticket →</div></div></div>` : "";
  return `<div class="app ${c.cls}">${side(locked ? 3 : 5)}<main class="main">
    <div class="h">${locked ? c.name : "Welcome back"}</div><div class="sub">${locked ? "Fan area" : c.name + " members area"}</div>
    ${body}${overlay}</main></div>`;
}

function browserFrame(inner, url, zoom) {
  return `<div class="browser"><div class="bar"><i></i><i></i><i></i><div class="url">${url}</div></div>
    <div class="vp" style="width:${1100 * zoom}px;height:${690 * zoom}px"><div style="zoom:${zoom}">${inner}</div></div></div>`;
}
