// Generates the SVG equipment graphics used across the site. Run: node tools_gen_assets.js
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "assets");
fs.mkdirSync(OUT, { recursive: true });

const defs = p => `<defs>
<linearGradient id="${p}body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".55" stop-color="#e3e9ef"/><stop offset="1" stop-color="#b9c5d0"/></linearGradient>
<linearGradient id="${p}rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd8e0"/></linearGradient>
<radialGradient id="${p}cav" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3b4a59"/><stop offset=".7" stop-color="#1c2631"/><stop offset="1" stop-color="#10171f"/></radialGradient>
<radialGradient id="${p}hub" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#e9eef3"/><stop offset="1" stop-color="#7c8c9b"/></radialGradient>
<linearGradient id="${p}blade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5d7184"/><stop offset="1" stop-color="#2a3947"/></linearGradient>
<linearGradient id="${p}lv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aab7c3"/><stop offset=".5" stop-color="#eef2f6"/><stop offset="1" stop-color="#a3b0bc"/></linearGradient>
</defs>`;

function fan(p, cx, cy, r) {
  const k = r / 150, s = [];
  s.push(`<circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="#d5dde5" stroke="#b3bfca" stroke-width="3"/>`);
  s.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${p}cav)"/>`);
  for (let i = 0; i < 5; i++)
    s.push(`<path transform="translate(${cx} ${cy}) rotate(${i * 72}) scale(${k})" d="M-8,-26 C-30,-70 -40,-115 -8,-138 C24,-140 44,-100 26,-60 C18,-44 6,-32 -8,-26Z" fill="url(#${p}blade)" opacity=".95"/>`);
  for (const f of [.30, .50, .70, .90, .99])
    s.push(`<circle cx="${cx}" cy="${cy}" r="${(r * f).toFixed(1)}" fill="none" stroke="#a9b7c4" stroke-width="${(3.2 * k + .8).toFixed(1)}"/>`);
  for (let i = 0; i < 20; i++) {
    const a = i * Math.PI / 10;
    s.push(`<line x1="${(cx + Math.cos(a) * r * .2).toFixed(1)}" y1="${(cy + Math.sin(a) * r * .2).toFixed(1)}" x2="${(cx + Math.cos(a) * r).toFixed(1)}" y2="${(cy + Math.sin(a) * r).toFixed(1)}" stroke="#9aaab8" stroke-width="${(2.2 * k + .6).toFixed(1)}"/>`);
  }
  s.push(`<circle cx="${cx}" cy="${cy}" r="${(r * .2).toFixed(1)}" fill="url(#${p}hub)" stroke="#6f7f8d" stroke-width="2"/>`);
  return s.join("");
}

const condenser = (p = "c") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" role="img" aria-label="Outdoor air conditioner condenser unit">${defs(p)}
<ellipse cx="200" cy="432" rx="170" ry="11" fill="#0b2a4f" opacity=".22"/>
<rect x="50" y="402" width="64" height="20" rx="4" fill="#7d8b98"/><rect x="286" y="402" width="64" height="20" rx="4" fill="#7d8b98"/>
<rect x="18" y="14" width="364" height="392" rx="26" fill="url(#${p}body)" stroke="#c0cad4" stroke-width="2"/>
<rect x="18" y="14" width="364" height="26" rx="13" fill="url(#${p}rim)" opacity=".9"/>
<rect x="34" y="48" width="332" height="336" rx="18" fill="#dbe3ea" opacity=".7"/>
${fan(p, 200, 214, 150)}
<rect x="306" y="362" width="52" height="16" rx="4" fill="#c2cdd7"/><circle cx="318" cy="370" r="3" fill="#2fa4dc"/>
</svg>`;

const condenserSide = (p = "s") => {
  let lv = ""; for (let i = 0; i < 11; i++) lv += `<rect x="${38 + i * 11}" y="60" width="6" height="320" rx="3" fill="#8f9eac" opacity=".85"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 450" role="img" aria-label="Outdoor air conditioner condenser unit">${defs(p)}
<ellipse cx="280" cy="432" rx="250" ry="11" fill="#0b2a4f" opacity=".22"/>
<rect x="36" y="402" width="64" height="20" rx="4" fill="#7d8b98"/><rect x="460" y="402" width="64" height="20" rx="4" fill="#7d8b98"/>
<rect x="14" y="14" width="532" height="392" rx="26" fill="url(#${p}body)" stroke="#c0cad4" stroke-width="2"/>
<rect x="14" y="14" width="532" height="26" rx="13" fill="url(#${p}rim)"/>
<rect x="28" y="48" width="144" height="336" rx="14" fill="url(#${p}lv)" stroke="#b3bfca" stroke-width="2"/>
${lv}
<rect x="184" y="48" width="348" height="336" rx="18" fill="#dbe3ea" opacity=".7"/>
${fan(p, 358, 216, 150)}
</svg>`;
};

const tower = (p = "t") => {
  let bars = "", vents = "";
  for (let i = 0; i < 5; i++) bars += `<rect x="44" y="${56 + i * 34}" width="112" height="6" rx="3" fill="#9fd4ef" opacity=".55"/>`;
  for (let i = 0; i < 2; i++) vents += `<rect x="44" y="${314 + i * 8}" width="112" height="3" rx="1.5" fill="#b3bfca"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 380" role="img" aria-label="Indoor HVAC air handler">${defs(p)}
<ellipse cx="100" cy="368" rx="86" ry="8" fill="#0b2a4f" opacity=".2"/>
<rect x="12" y="8" width="176" height="356" rx="14" fill="url(#${p}body)" stroke="#c0cad4" stroke-width="2"/>
<rect x="28" y="28" width="144" height="210" rx="8" fill="#16222e"/>
<rect x="34" y="34" width="132" height="198" rx="5" fill="#27465f" opacity=".9"/>
<path d="M34 34h132L34 160z" fill="#fff" opacity=".12"/>
${bars}
<rect x="28" y="256" width="144" height="84" rx="8" fill="#e6ecf1" stroke="#c0cad4"/>
<rect x="44" y="274" width="60" height="24" rx="4" fill="#1c2631"/>
<circle cx="132" cy="286" r="8" fill="#c2cdd7" stroke="#9aaab8"/><circle cx="154" cy="286" r="5" fill="#2fa4dc"/>
${vents}
</svg>`;
};

const indoor = (p = "i") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 130" role="img" aria-label="Indoor wall-mounted air conditioner">${defs(p)}
<rect x="6" y="8" width="408" height="94" rx="26" fill="url(#${p}body)" stroke="#c0cad4" stroke-width="2"/>
<path d="M22 76h376" stroke="#9aaab8" stroke-width="2"/>
<rect x="30" y="82" width="360" height="12" rx="6" fill="#1c2631"/>
<rect x="44" y="28" width="132" height="6" rx="3" fill="#d1dae2"/>
<circle cx="376" cy="42" r="4" fill="#2fa4dc"/>
</svg>`;

function lines() {
  const blue = "#2a8fd0", org = "#f6a43a", out = [];
  for (const [a, b, c, d] of [[[20,170],[60,150],[110,60],[130,30]],[[10,210],[70,190],[140,100],[170,80]],[[0,250],[80,240],[170,200],[215,190]],[[30,120],[70,110],[100,60],[108,50]],[[40,300],[110,300],[190,270],[230,262]]])
    out.push(`<path d="M${a} C${b} ${c} ${d}" fill="none" stroke="${blue}" stroke-width="2"/><circle cx="${a[0]}" cy="${a[1]}" r="4" fill="${blue}"/>`);
  for (const [a, b, c, d] of [[[520,230],[560,228],[600,215],[640,200]],[[520,262],[570,266],[620,262],[660,250]],[[520,296],[560,300],[610,304],[650,300]]])
    out.push(`<path d="M${a} C${b} ${c} ${d}" fill="none" stroke="${org}" stroke-width="2.5"/><circle cx="${d[0]}" cy="${d[1]}" r="4.5" fill="${org}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 420" aria-hidden="true">${out.join("")}</svg>`;
}

function redLines() {
  const r = "#ff4a55", out = [];
  for (const [y, c1, c2] of [[150,[40,140],[100,60]],[[170],[60,160],[140,100]],[[190],[70,190],[170,150]],[[120],[30,100],[60,30]]].map(a => [Array.isArray(a[0]) ? a[0][0] : a[0], a[1], a[2]]))
    out.push(`<path d="M0 ${y} C${c1} ${c2} ${c2[0] + 25} ${c2[1] - 20}" fill="none" stroke="${r}" stroke-width="2"/><circle cx="${c2[0] + 25}" cy="${c2[1] - 20}" r="4" fill="${r}"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" aria-hidden="true">${out.join("")}</svg>`;
}

const inline = (svg, x, y, w, h) => {
  const inner = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
  const vb = svg.split('viewBox="')[1].split('"')[0];
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}">${inner}</svg>`;
};

function scene(kind) {
  const bgs = { repair: ["#dbeaf6", "#9cc6e6"], install: ["#e9f1f7", "#b8d3e8"], heating: ["#f9e3da", "#f2b59f"], maint: ["#dcecf6", "#a6cde8"] }[kind];
  let b = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 210" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bgs[0]}"/><stop offset="1" stop-color="${bgs[1]}"/></linearGradient></defs><rect width="320" height="210" fill="url(#bg)"/>`;
  if (kind === "repair") {
    b += `<rect y="168" width="320" height="42" fill="#8fb4d0" opacity=".55"/>` + inline(condenser("r"), 90, 22, 150, 170);
    b += `<g transform="translate(236 110) rotate(-35)"><rect x="-4" y="0" width="8" height="70" rx="4" fill="#0b2a4f"/><circle cx="0" cy="-4" r="15" fill="none" stroke="#0b2a4f" stroke-width="9"/></g>`;
    b += `<g transform="translate(40 120)"><circle r="28" fill="#fff" stroke="#0b2a4f" stroke-width="4"/><path d="M-16 8A18 18 0 0 1 16 8" fill="none" stroke="#2fa4dc" stroke-width="4"/><line x1="0" y1="8" x2="10" y2="-8" stroke="#e33a45" stroke-width="3" stroke-linecap="round"/></g>`;
  } else if (kind === "install") {
    b += `<rect y="150" width="320" height="60" fill="#8fb4d0" opacity=".5"/>` + inline(indoor("n"), 50, 34, 220, 70);
    b += `<g stroke="#2a8fd0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8">` + [90,130,170,210].map(x => `<path d="M${x} 112c0 14 6 18 0 30"/>`).join("") + `</g>`;
    b += inline(condenser("m"), 120, 120, 80, 90);
  } else if (kind === "heating") {
    b += `<rect y="168" width="320" height="42" fill="#d98e77" opacity=".45"/>` + inline(condenserSide("h"), 60, 30, 200, 160);
    b += `<g stroke="#ff5a4d" stroke-width="3" fill="none" stroke-linecap="round">` + [80,110,140].map(x => `<path d="M${x} 40c-8 -10 8 -18 0 -30" opacity=".8"/>`).join("") + `</g>`;
  } else {
    b += `<rect y="168" width="320" height="42" fill="#8fb4d0" opacity=".55"/>` + inline(condenser("k"), 30, 28, 140, 160);
    let rows = ""; for (let i = 0; i < 3; i++) rows += `<rect x="14" y="${30 + i * 30}" width="14" height="14" rx="3" fill="none" stroke="#2fa4dc" stroke-width="3"/><path d="M17 ${37 + i * 30}l4 4 7-9" stroke="#2fa4dc" stroke-width="3" fill="none"/><rect x="36" y="${34 + i * 30}" width="42" height="5" rx="2.5" fill="#9fb4c6"/>`;
    b += `<g transform="translate(200 40)"><rect width="92" height="124" rx="10" fill="#fff" stroke="#0b2a4f" stroke-width="3"/><rect x="28" y="-8" width="36" height="18" rx="6" fill="#0b2a4f"/>${rows}</g>`;
  }
  return b + "</svg>";
}

const W = (n, s) => fs.writeFileSync(path.join(OUT, n), s);
W("condenser.svg", condenser()); W("condenser-side.svg", condenserSide()); W("air-handler.svg", tower()); W("indoor-unit.svg", indoor());
W("lines-tech.svg", lines()); W("lines-red.svg", redLines());
for (const k of ["repair", "install", "heating", "maint"]) W(`service-${k}.svg`, scene(k));
console.log("ok");
