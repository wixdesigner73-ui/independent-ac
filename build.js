// Builds the static HTML pages (shared header/footer) — run: node build.js
const fs = require("fs"), path = require("path");
const PHONE = "(239) 699-3569", TEL = "+12396993569";

const I = {
  snow: '<path d="M12 2v20M4.2 7l15.6 10M4.2 17L19.8 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  flame: '<path d="M12 22c4 0 7-2.8 7-6.8 0-3.6-2.6-5.6-3.8-8.2-1.6 1.2-2.4 2.6-2.6 4C11 9 10.4 5.6 12 2 8 4.4 5 8.6 5 14.2 5 19 8 22 12 22z"/>',
  build: '<path d="M4 21V5l8-3v19M12 9h8v12M8 8h1M8 12h1M8 16h1M16 13h1M16 17h1M2 21h20"/>',
  gauge: '<path d="M4 18a9 9 0 1 1 16 0M12 13l4-4"/><circle cx="12" cy="14" r="1.2"/>',
  duct: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M8 7v10M13 7v10M17 7v10"/>',
  pool: '<path d="M3 17c2 0 2 1.5 4.5 1.5S10 17 12 17s2.500 1.500 4.500 1.500S19 17 21 17M7 14V6a2 2 0 0 1 4 0M13 14V6a2 2 0 0 1 4 0M7 10h6"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 6v1M9 13v3"/>',
  wrench: '<path d="M4 20l8-8M14 4l6 6-3 3-6-6z"/>',
  heart: '<path d="M12 21s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 6-8 11-8 11z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.500l2.800 2.800L16 9.500"/>',
  clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v11h14V10M10 21v-6h4v6"/>',
};
const ico = k => `<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg></span>`;

const logo = `<a class="logo" href="index.html" aria-label="Independent A/C home"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M16 3C11 11 6 16 6 23a10 10 0 0 0 20 0c0-7-5-12-10-20z" fill="#1d78c2"/><path d="M28 14c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z" fill="#e3343f"/><path d="M11 25a5 5 0 0 0 5 5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/></svg><span>Independent A/C<small>Heating &amp; Cooling</small></span></a>`;

const nav = cur => ["Home:index", "About:about", "Services:services", "Contact:contact"].map(s => {
  const [n, f] = s.split(":");
  return `<a href="${f}.html"${f === cur ? ' aria-current="page"' : ""}>${n}</a>`;
}).join("");

const header = cur => `<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap"><div class="bar">
${logo}
<nav class="nav" id="site-nav" aria-label="Main">${nav(cur)}<a class="btn btn-red m-cta" href="contact.html#request">Request Service</a></nav>
<a class="btn btn-outline btn-sm head-cta" href="contact.html#request">Request Service</a>
<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
</div></div></header>`;

const footer = `<footer class="foot"><div class="wrap">
<div class="foot-grid">
<div>${logo.replace('class="logo"', 'class="logo"')}<p style="max-width:320px">Professional residential and commercial HVAC services serving Cape Coral and Southwest Florida.</p></div>
<div><h4>Navigation</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="services.html">Services</a></li><li><a href="contact.html">Contact</a></li></ul></div>
<div><h4>Services</h4><ul><li><a href="services.html#repair">A/C Repair</a></li><li><a href="services.html#installation">A/C Installation</a></li><li><a href="services.html#heating">Heating</a></li><li><a href="services.html#maintenance">Maintenance</a></li><li><a href="services.html#commercial">Commercial HVAC</a></li></ul></div>
<div><h4>Contact</h4><ul><li><a href="tel:${TEL}">${PHONE}</a></li><li>4523 Del Prado Blvd S, Suite B<br>Cape Coral, FL 33904</li></ul></div>
</div>
<div class="foot-bottom"><span>&copy; <span id="yr">2026</span> Independent A/C. All rights reserved.</span><span>Cape Coral, Florida</span></div>
</div></footer>
<script>document.getElementById("yr").textContent=new Date().getFullYear()</script>
<script src="js/main.js"></script>`;

const head = (title, desc) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}">
<meta name="theme-color" content="#155fa6">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head><body>`;

const unit = (cls, img, extra = "") => `<div class="unit ${cls}" style="--m:url(assets/${img}.svg)" aria-hidden="true"><img src="assets/${img}.svg" alt="" ${extra}></div>`;

const cta = `<section class="cta"><div class="wrap reveal">
<h2>Need HVAC Service?</h2>
<p>From repairs and maintenance to new installations, we're ready to help with your heating and cooling needs.</p>
<div class="hero-actions"><a class="btn btn-red" href="contact.html#request">Request Service</a><a class="btn btn-ghost" href="tel:${TEL}">Call ${PHONE}</a></div>
</div></section>`;

const pageHero = (h, p, img) => `<section class="page-hero">${unit("", img)}<div class="wrap"><h1>${h}</h1><p>${p}</p></div></section>`;

// ---------- HOME ----------
const svc = [
  ["img/repair.jpg", "A/C Repair", "Get your cooling system back on track with professional repair services.", "repair"],
  ["img/install.jpg", "A/C Installation", "Upgrade your comfort with professional air conditioning installation.", "installation"],
  ["img/heating.jpg", "Heating Services", "Reliable heating solutions to keep your property comfortable year-round.", "heating"],
  ["img/maintenance.jpg", "Annual Maintenance", "Keep your HVAC system performing efficiently with routine maintenance.", "maintenance"],
];
const home = head("Independent A/C | HVAC & Air Conditioning in Cape Coral, FL", "Residential and commercial air conditioning and HVAC services in Cape Coral and Southwest Florida. Call (239) 699-3569.") + header("index") + `
<main id="main">
<section class="hero">
<div class="glow g1"></div><div class="glow g2"></div><div class="floor"></div>
${unit("u-left", "condenser")}${unit("u-right", "condenser-side")}${unit("u-tower", "air-handler")}${unit("u-small", "condenser")}
<div class="wrap"><div class="hero-copy">
<h1>Stay Comfortable<br>All Year Long</h1>
<p>Reliable air conditioning and HVAC services for homes and businesses throughout Cape Coral and Southwest Florida.</p>
<div class="hero-actions"><a class="btn btn-red" href="contact.html#request">Request Service</a><a class="btn btn-ghost" href="tel:${TEL}">Call Now</a></div>
</div></div>
</section>

<section class="sky-bg" style="padding-bottom:10px">
<div class="features wrap"><div class="grid-3">
<article class="fcard reveal">${ico("snow")}<h3>Comfort You Can Count On</h3><p>Reliable air conditioning solutions designed to keep your home or business comfortable.</p><a class="btn btn-red btn-sm" href="about.html">Learn More</a></article>
<article class="fcard reveal">${ico("pin")}<h3>Local HVAC Expertise</h3><p>Professional heating and cooling services backed by years of experience serving Southwest Florida.</p><a class="btn btn-red btn-sm" href="services.html">Explore Services</a></article>
<article class="fcard reveal">${ico("tool")}<h3>Service That Fits Your Needs</h3><p>From repairs and maintenance to installation, we provide practical HVAC solutions for every property.</p><a class="btn btn-red btn-sm" href="contact.html#request">Get Started</a></article>
</div></div>

<div class="section">
<div class="wrap">
<div class="section-head center reveal"><h2 class="h2">Book Your HVAC Expert Today!</h2><p class="lead">From repairs and maintenance to installation, Independent A/C provides dependable HVAC solutions for homes and businesses.</p></div>
<div class="grid-4">
${svc.map(s => `<a class="scard reveal" href="services.html#${s[3]}"><div class="pic"><img src="assets/${s[0]}" alt="${s[1]}" loading="lazy"></div><div class="txt"><h3>${s[1]}</h3><p>${s[2]}</p><span class="more">Learn more</span></div></a>`).join("\n")}
</div></div></div>
</section>

<section class="promo sky-bg" style="background:linear-gradient(180deg,var(--sky),#fff)"><div class="wrap section"><div class="promo-grid">
<div class="promo-art reveal"><img class="lines" src="assets/lines-tech.svg" alt="" aria-hidden="true"><img class="main" src="assets/condenser.svg" alt="Outdoor air conditioner condenser unit" loading="lazy"></div>
<div class="reveal"><h2 class="h2">Reliable Comfort Starts Here</h2><p style="margin-top:18px">Whether you need an immediate repair, routine maintenance, or a complete system installation, Independent A/C is here to help keep your property comfortable.</p><a class="btn btn-red" href="contact.html#request">Request Service</a></div>
</div></div></section>

<section class="section"><div class="wrap about-prev">
<div class="about-art reveal"><img src="assets/img/about.jpg" alt="HVAC technician at work" loading="lazy"></div>
<div class="reveal"><div class="eyebrow">About Us</div><h2 class="h2">Local HVAC Experience You Can Trust</h2><p>Independent A/C provides residential and commercial HVAC services throughout Cape Coral and surrounding Southwest Florida communities. Our focus is simple: dependable service, quality workmanship, and comfortable spaces.</p><a class="btn btn-red" href="about.html">About Independent A/C</a></div>
</div></section>
${cta}
</main>` + footer + `</body></html>`;

// ---------- ABOUT ----------
const about = head("About Independent A/C | Cape Coral HVAC", "Learn about Independent A/C, a residential and commercial HVAC company serving Cape Coral and Southwest Florida.") + header("about") + `
<main id="main">
${pageHero("About Independent A/C", "A local HVAC company focused on dependable service, quality workmanship, and comfortable spaces.", "condenser")}
<section class="section"><div class="wrap">
<div class="grid-2" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
<div class="info-card reveal">${ico("pin")}<h3>Local Experience</h3><p>Independent A/C is based in Cape Coral and serves homes and businesses throughout Southwest Florida.</p></div>
<div class="info-card reveal">${ico("build")}<h3>Residential &amp; Commercial HVAC</h3><p>We work with homeowners and commercial properties, with services for cooling, heating, and ongoing system care.</p></div>
<div class="info-card reveal">${ico("clip")}<h3>Professional Service</h3><p>Clear communication and organized, respectful service from the first call through the finished job.</p></div>
<div class="info-card reveal">${ico("tool")}<h3>Quality Workmanship</h3><p>We care about doing the work properly so your system runs the way it should.</p></div>
<div class="info-card reveal">${ico("heart")}<h3>Customer-Focused Approach</h3><p>Every property is different. We listen first and recommend practical solutions that fit your needs.</p></div>
</div></div></section>
<section class="section sky-bg"><div class="wrap split">
<div class="split-art photo reveal"><img src="assets/img/about-2.jpg" alt="Outdoor air conditioner condenser unit" loading="lazy"></div>
<div class="reveal"><div class="eyebrow">Who We Serve</div><h2>Comfort for Homes and Businesses</h2><p>Independent A/C provides residential and commercial HVAC services throughout Cape Coral and surrounding Southwest Florida communities. Whether it's a single-family home or a commercial space, our focus is the same: dependable service, quality workmanship, and comfortable spaces.</p><ul class="checks"><li>Repairs, installation, and maintenance</li><li>Heating and cooling services</li><li>Commercial HVAC and refrigeration</li></ul><a class="btn btn-red" href="services.html">View Our Services</a></div>
</div></section>
${cta}
</main>` + footer + `</body></html>`;

// ---------- SERVICES ----------
const services = [
  ["img/repair.jpg", "A/C Repair", "flame", "When your air conditioner isn't cooling the way it should, we'll diagnose the problem and get it back on track.", ["Cooling that isn't keeping up", "Unusual noises or performance changes", "Residential and commercial systems"], "img/repair.jpg"],
  ["installation", "A/C Installation", "home", "Upgrade your comfort with professional air conditioning installation for new or existing properties.", ["System replacement and new installs", "Equipment sized for your space", "Residential and commercial properties"], "img/install.jpg"],
  ["maintenance", "Preventive Maintenance", "clip", "Routine maintenance helps keep your HVAC system performing efficiently throughout the year.", ["Regular system check-ups", "Helps catch issues early", "Available for homes and businesses"], "img/maintenance.jpg"],
  ["commercial", "Commercial HVAC", "build", "HVAC service for commercial properties, handled with the same attention to quality as every job.", ["Repair, installation, and maintenance", "Keeps business spaces comfortable", "Serving Cape Coral and Southwest Florida"], "img/commercial.jpg"],
  ["ductwork", "Ductwork Services", "duct", "Properly functioning ductwork is key to even airflow and a comfortable property.", ["Ductwork evaluation and service", "Airflow concerns", "Residential and commercial"], "img/ductwork.jpg"],
  ["img/heating.jpg", "Heating Services", "flame", "Reliable heating solutions to keep your property comfortable year-round.", ["Heating repair and service", "System installation", "Residential and commercial"], "img/heating.jpg"],
  ["pool-heating", "Pool Heating", "pool", "Extend your swimming season with pool heating service from Independent A/C.", ["Pool heating service", "Questions about options for your pool", "Call us to discuss your property"], "img/pool.jpg"],
  ["refrigeration", "Commercial Refrigeration", "fridge", "Support for commercial refrigeration equipment that keeps your business running.", ["Commercial refrigeration service", "Call for details on your equipment", "Serving Southwest Florida businesses"], "img/refrigeration.jpg"],
];
const servicesPage = head("HVAC Services in Cape Coral | Independent A/C", "A/C repair, installation, maintenance, commercial HVAC, ductwork, heating, pool heating and commercial refrigeration in Cape Coral, FL.") + header("services") + `
<main id="main">
${pageHero("Our HVAC Services", "Dependable heating and cooling solutions for homes and businesses throughout Cape Coral and Southwest Florida.", "condenser-side")}
<section class="section"><div class="wrap">
<nav class="svc-jump" aria-label="Services">${services.map(s => `<a href="#${s[0]}">${s[1]}</a>`).join("")}</nav>
<div class="svc-list">
${services.map((s, i) => `<div class="split${i % 2 ? " rev" : ""} reveal" id="${s[0]}">
<div class="split-art photo"><img src="assets/${s[5]}" alt="${s[1]}" loading="lazy"></div>
<div>${ico(s[2])}<h2 style="margin-top:16px">${s[1]}</h2><p>${s[3]}</p><ul class="checks">${s[4].map(x => `<li>${x}</li>`).join("")}</ul><a class="btn btn-red" href="contact.html#request">Request Service</a></div>
</div>`).join("\n")}
</div></div></section>
${cta}
</main>` + footer + `</body></html>`;

// ---------- CONTACT ----------
const contact = head("Contact Independent A/C | Cape Coral, FL", "Request HVAC service from Independent A/C. Call (239) 699-3569 or visit 4523 Del Prado Blvd S, Suite B, Cape Coral, FL 33904.") + header("contact") + `
<main id="main">
${pageHero("Request Service", "Tell us what you need and we'll help with your heating and cooling. You can also call us directly.", "condenser")}
<section class="section"><div class="wrap">
<div class="contact-grid">
<div class="reveal"><h2 class="h2" style="font-size:1.9rem">Contact Information</h2>
<div class="contact-list">
<div>${ico("phone")}<p><strong>Phone</strong><a href="tel:${TEL}">${PHONE}</a></p></div>
<div>${ico("pin")}<p><strong>Address</strong><span>4523 Del Prado Blvd S, Suite B<br>Cape Coral, FL 33904</span></p></div>
<div>${ico("build")}<p><strong>Service Area</strong><span>Cape Coral and Southwest Florida</span></p></div>
</div>
<a class="btn btn-red" style="margin-top:28px" href="tel:${TEL}">Call ${PHONE}</a></div>
<form class="form reveal" id="service-form" novalidate-placeholder>
<h2 id="request">Request Service</h2><p>Fill out the form and tell us about your HVAC needs.</p>
<div class="form-ok" id="form-ok" role="status">Your request is ready, but online submissions aren't connected yet. To book now, please call ${PHONE}.</div>
<div class="row"><div class="field"><label for="name">Name</label><input id="name" name="name" required autocomplete="name"></div>
<div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" required autocomplete="tel"></div></div>
<div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email"></div>
<div class="field"><label for="service">Service Needed</label><select id="service" name="service" required><option value="">Select a service</option>${services.map(s => `<option>${s[1]}</option>`).join("")}<option>Other / Not sure</option></select></div>
<div class="field"><label for="message">Message</label><textarea id="message" name="message" placeholder="Tell us what's going on"></textarea></div>
<button class="btn btn-red" type="submit">Request Service</button>
<p class="form-note">Prefer to talk? Call <a href="tel:${TEL}" style="color:var(--red);font-weight:700">${PHONE}</a></p>
</form>
</div>
<div class="map reveal"><iframe title="Map showing Independent A/C location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=4523+Del+Prado+Blvd+S+Suite+B+Cape+Coral+FL+33904&output=embed"></iframe></div>
</div></section>
</main>` + footer + `</body></html>`;

const out = (f, s) => fs.writeFileSync(path.join(__dirname, f), s.replace(" novalidate-placeholder", ""));
out("index.html", home); out("about.html", about); out("services.html", servicesPage); out("contact.html", contact);
fs.writeFileSync(path.join(__dirname, "assets/favicon.svg"), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M16 3C11 11 6 16 6 23a10 10 0 0 0 20 0c0-7-5-12-10-20z" fill="#1d78c2"/><path d="M28 14c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12z" fill="#e3343f"/></svg>');
console.log("built");
