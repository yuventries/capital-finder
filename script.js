/* ============================================================
   Capital Finder - home page
   When the user selects a country, its capital is printed
   next to the list.

   Needs data/flags.js (HAND_FLAGS) and data/countries.js
   (COUNTRIES), both loaded before this file.
   ============================================================ */

var select = document.getElementById("country");
var output = document.getElementById("output");

/* slug -> country record, built once */
var BY_SLUG = {};
for (var i = 0; i < COUNTRIES.length; i++) {
  BY_SLUG[COUNTRIES[i].slug] = COUNTRIES[i];
}

/* The flag image, with the same offline fallback the static pages use:
   a hand-drawn SVG where there is one, otherwise a monogram tile. */
function buildFlag(c) {
  var box = document.createElement("div");
  box.className = "flagbox flagbox--big";

  var img = document.createElement("img");
  img.className = "flag flag--img";
  img.src = "https://flagcdn.com/w320/" + c.iso2 + ".png";
  img.alt = "Flag of " + c.name;
  img.decoding = "async";
  img.onerror = function () { box.classList.add("is-fallback"); };
  box.appendChild(img);

  if (HAND_FLAGS[c.slug]) {
    box.insertAdjacentHTML("beforeend", HAND_FLAGS[c.slug]);
  } else {
    var mono = document.createElement("div");
    mono.className = "flag flag--mono";
    mono.setAttribute("aria-hidden", "true");
    mono.textContent = c.iso2.toUpperCase();
    box.appendChild(mono);
  }
  return box;
}

/* Builds one small pill such as "Continent  Asia". */
function makeChip(label, value) {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(label + " "));
  var b = document.createElement("b");
  b.textContent = value;
  li.appendChild(b);
  return li;
}

/* Shows the "nothing chosen yet" card. */
function showPlaceholder() {
  output.innerHTML =
    '<div class="placeholder">' +
      '<svg class="placeholder__icon" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" fill="none" ' +
              'stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' +
        '<circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" ' +
                'stroke-width="1.7"/>' +
      '</svg>' +
      '<p class="placeholder__text">No country selected yet</p>' +
    '</div>';
}

/* Prints the capital of the chosen country next to the list. */
function showCapital(slug) {
  var data = BY_SLUG[slug];
  if (!data) {
    showPlaceholder();
    return;
  }

  var box = document.createElement("div");
  box.className = "result";

  box.appendChild(buildFlag(data));

  var label = document.createElement("p");
  label.className = "result__label";
  label.textContent = "Capital city of";
  box.appendChild(label);

  var country = document.createElement("p");
  country.className = "result__country";
  country.textContent = data.name;
  box.appendChild(country);

  /* The capital itself - styled by the .capital rule in style.css.
     A few countries have a capital like "Pretoria (executive; ...)";
     the city goes in the big heading, the rest in small type below. */
  var split = data.capital.indexOf(" (");
  var capital = document.createElement("p");
  capital.className = "capital";
  capital.textContent = split === -1 ? data.capital : data.capital.slice(0, split);
  box.appendChild(capital);

  if (split !== -1) {
    var note = document.createElement("p");
    note.className = "capital__note";
    note.textContent = data.capital.slice(split + 2).replace(/\)$/, "");
    box.appendChild(note);
  }

  var meta = document.createElement("ul");
  meta.className = "meta";
  meta.appendChild(makeChip("Continent", data.continent));
  meta.appendChild(makeChip("Currency", data.currency));
  meta.appendChild(makeChip("Population", data.population));
  box.appendChild(meta);

  /* one good thing about the country */
  var good = document.createElement("p");
  good.className = "result__fact";
  good.textContent = data.fact;
  box.appendChild(good);

  var more = document.createElement("a");
  more.className = "result__more";
  more.href = "countries/" + data.slug + ".html";
  more.textContent = "Full page for " + data.name;
  box.appendChild(more);

  output.innerHTML = "";
  output.appendChild(box);
}

/* React to every change of the selection box. */
select.addEventListener("change", function () {
  showCapital(this.value);
});

/* Keep the page correct if the browser restores an old selection on reload. */
showCapital(select.value);
