/* ============================================================
   Capital Finder - page generator
   ------------------------------------------------------------
   Reads the per-region JSON chunks in data/chunks/, merges them
   into data/countries.js, then writes one static HTML page per
   country into countries/ plus a browsable A-Z index.

       node tools/build.js

   Nothing here runs in the browser - the site it produces is
   plain static HTML.
   ============================================================ */

var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..");
var CHUNK_DIR = path.join(ROOT, "data", "chunks");
var OUT_DIR = path.join(ROOT, "countries");

var CONTINENT_ORDER = ["Africa", "Asia", "Europe",
                       "North America", "South America", "Oceania"];

/* ---------- helpers ---------- */

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* The flag <img> plus its offline fallback: a hand-drawn SVG where we
   have one, otherwise a monogram tile. `onerror` swaps them in without
   needing any external script. */
function flagBox(c, handFlags, big) {
  var w = big ? "w320" : "w160";
  var fallback = handFlags[c.slug]
    ? handFlags[c.slug]
    : '<div class="flag flag--mono" aria-hidden="true">' + esc(c.iso2.toUpperCase()) + "</div>";

  return '<div class="flagbox' + (big ? " flagbox--big" : "") + '">' +
           '<img class="flag flag--img" ' +
                'src="https://flagcdn.com/' + w + "/" + c.iso2 + '.png" ' +
                'alt="Flag of ' + esc(c.name) + '" loading="lazy" decoding="async" ' +
                'onerror="this.closest(\'.flagbox\').classList.add(\'is-fallback\')">' +
           fallback +
         "</div>";
}

/* Eleven countries have a capital like
   "Pretoria (executive; Cape Town legislative, ...)". The city goes in the
   big .capital heading; the qualification goes underneath in small type. */
function splitCapital(capital) {
  var i = capital.indexOf(" (");
  if (i === -1) { return { city: capital, note: "" }; }
  return { city: capital.slice(0, i), note: capital.slice(i + 2).replace(/\)$/, "") };
}

function capitalMarkup(capital) {
  var s = splitCapital(capital);
  return '<p class="capital">' + esc(s.city) + "</p>" +
    (s.note ? '\n      <p class="capital__note">' + esc(s.note) + "</p>" : "");
}

function chips(c) {
  return "<ul class=\"meta\">" +
    ["Continent " + c.continent, "Currency " + c.currency,
     "Population " + c.population, "Language " + c.language]
      .map(function (pair) {
        var i = pair.indexOf(" ");
        return "<li>" + esc(pair.slice(0, i)) + " <b>" + esc(pair.slice(i + 1)) + "</b></li>";
      }).join("") +
    "</ul>";
}

var HEAD = function (title, desc, prefix) {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "  <title>" + esc(title) + "</title>\n" +
    '  <meta name="description" content="' + esc(desc) + '">\n' +
    '  <meta name="theme-color" content="#E11D48">\n' +
    '  <meta property="og:type" content="website">\n' +
    '  <meta property="og:title" content="' + esc(title) + '">\n' +
    '  <meta property="og:description" content="' + esc(desc) + '">\n' +
    '  <link rel="icon" href="' + prefix + 'favicon.svg" type="image/svg+xml">\n' +
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '  <link rel="preconnect" href="https://flagcdn.com">\n' +
    '  <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Crimson+Pro:wght@500;600;700&display=swap" rel="stylesheet">\n' +
    '  <link rel="stylesheet" href="' + prefix + 'style.css">\n' +
    "</head>\n";
};

var GLOWS = '  <div class="glow glow--one" aria-hidden="true"></div>\n' +
            '  <div class="glow glow--two" aria-hidden="true"></div>\n';

/* ---------- one country page ---------- */

function countryPage(c, prev, next, handFlags) {
  return HEAD(c.name + " — capital " + splitCapital(c.capital).city + " | Capital Finder",
              c.fact, "../") +
  '<body>\n' + GLOWS +
  '  <main class="stage stage--narrow">\n' +
  '    <nav class="crumb" aria-label="Breadcrumb">\n' +
  '      <a href="../">Capital Finder</a><span aria-hidden="true">/</span>' +
         '<a href="./">All countries</a><span aria-hidden="true">/</span>' +
         "<em>" + esc(c.name) + "</em>\n" +
  "    </nav>\n\n" +
  '    <article class="sheet">\n' +
  '      <div class="sheet__head">\n' +
  "        " + flagBox(c, handFlags, true) + "\n" +
  "        <div>\n" +
  '          <p class="result__label">Capital city of</p>\n' +
  '          <h1 class="sheet__country">' + esc(c.name) + "</h1>\n" +
  "        </div>\n" +
  "      </div>\n\n" +
  "      " + capitalMarkup(c.capital) + "\n\n" +
  "      " + chips(c) + "\n\n" +
  '      <section class="goodthing">\n' +
  '        <h2 class="goodthing__title">One good thing about ' + esc(c.name) + "</h2>\n" +
  '        <p class="goodthing__text">' + esc(c.fact) + "</p>\n" +
  "      </section>\n" +
  "    </article>\n\n" +
  '    <nav class="pager" aria-label="Nearby countries">\n' +
  (prev ? '      <a class="pager__link" href="' + prev.slug + '.html"><span>Previous</span>' +
          esc(prev.name) + "</a>\n" : '      <span class="pager__link is-empty"></span>\n') +
  '      <a class="pager__link pager__link--mid" href="./"><span>Browse</span>All countries</a>\n' +
  (next ? '      <a class="pager__link pager__link--end" href="' + next.slug + '.html"><span>Next</span>' +
          esc(next.name) + "</a>\n" : '      <span class="pager__link is-empty"></span>\n') +
  "    </nav>\n" +
  "  </main>\n</body>\n</html>\n";
}

/* ---------- the A-Z browse page ---------- */

function indexPage(list, handFlags) {
  var cards = list.map(function (c) {
    return '      <li class="card" data-name="' + esc(c.name.toLowerCase()) +
             " " + esc(c.capital.toLowerCase()) + '">\n' +
           '        <a class="card__link" href="' + c.slug + '.html">\n' +
           "          " + flagBox(c, handFlags, false) + "\n" +
           '          <span class="card__name">' + esc(c.name) + "</span>\n" +
           '          <span class="card__capital">' + esc(c.capital.split(" (")[0]) + "</span>\n" +
           "        </a>\n      </li>";
  }).join("\n");

  return HEAD("All countries | Capital Finder",
              "Every country and its capital city, with one good thing about each.", "../") +
  '<body>\n' + GLOWS +
  '  <main class="stage">\n' +
  '    <nav class="crumb" aria-label="Breadcrumb">\n' +
  '      <a href="../">Capital Finder</a><span aria-hidden="true">/</span><em>All countries</em>\n' +
  "    </nav>\n\n" +
  '    <header class="masthead">\n' +
  '      <p class="eyebrow">' + list.length + " countries</p>\n" +
  "      <h1>Every <em>capital</em></h1>\n" +
  '      <p class="lede">One page per country, each with its capital city and one good thing ' +
        "about the place.</p>\n" +
  "    </header>\n\n" +
  '    <div class="filter">\n' +
  '      <label class="field-label" for="filter">Find a country</label>\n' +
  '      <input id="filter" type="search" placeholder="Type a country or capital…" ' +
         'autocomplete="off">\n' +
  '      <p class="hint" id="filter-count" aria-live="polite">' + list.length +
        " countries</p>\n" +
  "    </div>\n\n" +
  '    <ul class="grid">\n' + cards + "\n    </ul>\n" +
  '    <p class="empty" id="empty" hidden>No country matches that.</p>\n' +
  "  </main>\n\n" +
  "  <script>\n" +
  "  (function () {\n" +
  '    var box = document.getElementById("filter");\n' +
  '    var cards = [].slice.call(document.querySelectorAll(".card"));\n' +
  '    var count = document.getElementById("filter-count");\n' +
  '    var empty = document.getElementById("empty");\n' +
  '    box.addEventListener("input", function () {\n' +
  "      var q = this.value.trim().toLowerCase(), shown = 0;\n" +
  "      cards.forEach(function (card) {\n" +
  '        var hit = !q || card.getAttribute("data-name").indexOf(q) !== -1;\n' +
  "        card.hidden = !hit;\n" +
  "        if (hit) { shown++; }\n" +
  "      });\n" +
  '      count.textContent = shown + (shown === 1 ? " country" : " countries");\n' +
  "      empty.hidden = shown !== 0;\n" +
  "    });\n" +
  "  })();\n" +
  "  </script>\n" +
  "</body>\n</html>\n";
}

/* ---------- the <option> block for the home page ---------- */

function optionsMarkup(list) {
  var out = ['            <option value="">&mdash; Select a country &mdash;</option>'];
  CONTINENT_ORDER.forEach(function (cont) {
    var group = list.filter(function (c) { return c.continent === cont; });
    if (!group.length) { return; }
    out.push("");
    out.push('            <optgroup label="' + esc(cont) + '">');
    group.forEach(function (c) {
      out.push('              <option value="' + c.slug + '">' + esc(c.name) + "</option>");
    });
    out.push("            </optgroup>");
  });
  return out.join("\n");
}

/* ---------- main ---------- */

function main() {
  /* 1. merge the chunks */
  var files = fs.readdirSync(CHUNK_DIR).filter(function (f) { return /\.json$/.test(f); }).sort();
  if (!files.length) { throw new Error("no chunk files in " + CHUNK_DIR); }

  var all = [];
  files.forEach(function (f) {
    var rows = JSON.parse(fs.readFileSync(path.join(CHUNK_DIR, f), "utf8"));
    if (!Array.isArray(rows)) { throw new Error(f + " is not a JSON array"); }
    rows.forEach(function (r) { r._src = f; all.push(r); });
  });

  /* 2. validate */
  var need = ["name", "slug", "iso2", "capital", "continent", "currency",
              "population", "language", "fact"];
  var problems = [];
  var seen = Object.create(null);
  all.forEach(function (c) {
    need.forEach(function (k) {
      if (!c[k] || typeof c[k] !== "string" || !c[k].trim()) {
        problems.push(c.name + " (" + c._src + "): missing " + k);
      }
    });
    if (!/^[a-z0-9-]+$/.test(c.slug || "")) {
      problems.push(c.name + ": bad slug \"" + c.slug + "\"");
    }
    if (!/^[a-z]{2}$/.test(c.iso2 || "")) {
      problems.push(c.name + ": bad iso2 \"" + c.iso2 + "\"");
    }
    if (CONTINENT_ORDER.indexOf(c.continent) === -1) {
      problems.push(c.name + ": bad continent \"" + c.continent + "\"");
    }
    if (seen[c.slug]) { problems.push("duplicate slug: " + c.slug); }
    seen[c.slug] = true;
    delete c._src;
  });
  if (problems.length) {
    console.error("VALIDATION FAILED (" + problems.length + "):");
    problems.slice(0, 40).forEach(function (p) { console.error("  - " + p); });
    process.exit(1);
  }

  all.sort(function (a, b) { return a.name.localeCompare(b.name); });

  /* 3. data/countries.js — used by the home page */
  var dataFile =
    "/* Generated by tools/build.js - do not edit by hand.\n" +
    "   " + all.length + " countries, sorted by name. */\n" +
    "var COUNTRIES = " + JSON.stringify(all, null, 1) + ";\n\n" +
    "if (typeof module !== \"undefined\") { module.exports = COUNTRIES; }\n";
  fs.writeFileSync(path.join(ROOT, "data", "countries.js"), dataFile, "utf8");

  /* 4. the pages */
  var handFlags = require(path.join(ROOT, "data", "flags.js"));
  if (!fs.existsSync(OUT_DIR)) { fs.mkdirSync(OUT_DIR); }

  all.forEach(function (c, i) {
    fs.writeFileSync(path.join(OUT_DIR, c.slug + ".html"),
      countryPage(c, all[i - 1], all[i + 1], handFlags), "utf8");
  });
  fs.writeFileSync(path.join(OUT_DIR, "index.html"), indexPage(all, handFlags), "utf8");

  /* 5. splice the <option> list into index.html */
  var homePath = path.join(ROOT, "index.html");
  var home = fs.readFileSync(homePath, "utf8");
  var begin = "<!-- BEGIN options -->";
  var end = "<!-- END options -->";
  if (home.indexOf(begin) === -1 || home.indexOf(end) === -1) {
    throw new Error("index.html is missing the " + begin + " / " + end + " markers");
  }
  home = home.slice(0, home.indexOf(begin) + begin.length) + "\n" +
         optionsMarkup(all) + "\n            " +
         home.slice(home.indexOf(end));
  fs.writeFileSync(homePath, home, "utf8");

  console.log("countries : " + all.length);
  console.log("pages     : " + (all.length + 1) + " in countries/");
  console.log("data      : data/countries.js");
  console.log("home page : <option> list refreshed");
}

main();
