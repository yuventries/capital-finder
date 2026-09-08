# Capital Finder

An HTML page with a selection box of countries. When a country is selected, its
**capital is printed next to the list**, styled through CSS (colour, bold, large
font size).

Every country also has its own static page with its capital, a flag, a few facts,
and **one good thing about that country**.

## Files

```
index.html          the main page (open this one)
style.css           all styling, including the .capital rule
script.js           the change handler that prints the capital
data/countries.js   generated: every country and its facts
data/flags.js       hand-drawn inline-SVG flags (offline fallback)
data/chunks/*.json  source data, one file per region
countries/          one generated page per country + an A-Z browse page
tools/build.js      generator: chunks -> data/countries.js + countries/*.html
404.html            styled "page not found" (used by GitHub Pages)
favicon.svg         tab icon
.nojekyll           tells GitHub Pages to serve the files as-is
```

Open `index.html` in any browser, or serve the folder:

```bash
python -m http.server 8134 --directory Lab4
```

To rebuild the country pages after editing anything in `data/chunks/`:

```bash
node tools/build.js
```

The generator merges the chunks, validates every record (required fields, slug
and ISO-code shape, no duplicates), writes `data/countries.js`, writes one page
per country plus `countries/index.html`, and refreshes the `<option>` list in
`index.html` between the `BEGIN options` / `END options` markers. The published
site itself is plain static HTML, with nothing built at request time.

## The data

Each country carries a name, slug, ISO 3166-1 alpha-2 code, capital, continent,
currency, population, main language, and one positive fact. The facts and supporting
fields were compiled per region and verified against standard reference lists: complete
country set, no duplicates, and a cross-check of capitals and ISO codes.

Population figures are approximate 2024 estimates and are labelled as such.

## Flags

Real flags come from [flagcdn.com](https://flagcdn.com) as lazy-loaded images.
If that request fails (offline, or the CDN blocked), the image's `onerror`
reveals a fallback behind it: a hand-drawn inline SVG for the thirteen countries
that have one in `data/flags.js`, and a coloured monogram tile for the rest. No
flag images are stored in the repository.
