/* ============================================================
   Hand-drawn inline-SVG flags.

   Real flag images come from flagcdn.com; these are the offline
   fallback for the thirteen countries the page shipped with
   originally, and they are what you see if the CDN is blocked or
   unreachable. Every flag uses the same 60 x 40 viewBox (3:2).

   Loaded as a plain <script> in the browser (global HAND_FLAGS)
   and required by tools/build.js in Node.
   ============================================================ */

/* A 5-pointed star, outer radius 1, centred on the origin. */
var STAR = "0,-1 .225,-.309 .951,-.309 .363,.118 .588,.809 " +
           "0,.382 -.588,.809 -.363,.118 -.951,-.309 -.225,-.309";

var HAND_FLAGS = {

  brazil:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Brazil">' +
      '<rect width="60" height="40" fill="#009C3B"/>' +
      '<polygon points="30,5 55,20 30,35 5,20" fill="#FFDF00"/>' +
      '<circle cx="30" cy="20" r="8.5" fill="#002776"/>' +
      '<path d="M22 17.5a17 17 0 0 1 16 3.6" fill="none" stroke="#FFFFFF" ' +
            'stroke-width="2.2"/>' +
    '</svg>',

  canada:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Canada">' +
      '<rect width="60" height="40" fill="#FFFFFF"/>' +
      '<rect width="15" height="40" fill="#D80621"/>' +
      '<rect x="45" width="15" height="40" fill="#D80621"/>' +
      '<path transform="translate(30,20) scale(.3) translate(-50,-53)" fill="#D80621" ' +
            'd="M50 12 54.5 30 67 25 63 40 78 37 72 48 88 50 74 59 79 66 61 69 63 82 ' +
               '53 75 51 94 49 94 47 75 37 82 39 69 21 66 26 59 12 50 28 48 22 37 ' +
               '37 40 33 25 45.5 30Z"/>' +
    '</svg>',

  china:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of China">' +
      '<rect width="60" height="40" fill="#EE1C25"/>' +
      '<g fill="#FFDE00">' +
        '<polygon points="' + STAR + '" transform="translate(10,10) scale(6)"/>' +
        '<polygon points="' + STAR + '" transform="translate(20,4.5) rotate(23) scale(2)"/>' +
        '<polygon points="' + STAR + '" transform="translate(24.5,9) rotate(46) scale(2)"/>' +
        '<polygon points="' + STAR + '" transform="translate(24.5,15) rotate(70) scale(2)"/>' +
        '<polygon points="' + STAR + '" transform="translate(20,19.5) rotate(23) scale(2)"/>' +
      '</g>' +
    '</svg>',

  france:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of France">' +
      '<rect width="20" height="40" fill="#002395"/>' +
      '<rect x="20" width="20" height="40" fill="#FFFFFF"/>' +
      '<rect x="40" width="20" height="40" fill="#ED2939"/>' +
    '</svg>',

  germany:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Germany">' +
      '<rect width="60" height="13.34" fill="#000000"/>' +
      '<rect y="13.34" width="60" height="13.33" fill="#DD0000"/>' +
      '<rect y="26.67" width="60" height="13.33" fill="#FFCE00"/>' +
    '</svg>',

  ghana:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Ghana">' +
      '<rect width="60" height="13.34" fill="#CE1126"/>' +
      '<rect y="13.34" width="60" height="13.33" fill="#FCD116"/>' +
      '<rect y="26.67" width="60" height="13.33" fill="#006B3F"/>' +
      '<polygon points="' + STAR + '" fill="#000000" ' +
               'transform="translate(30,20) scale(5.4)"/>' +
    '</svg>',

  greece:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Greece">' +
      '<rect width="60" height="40" fill="#0D5EAF"/>' +
      '<g fill="#FFFFFF">' +
        '<rect y="4.44"  width="60" height="4.44"/>' +
        '<rect y="13.33" width="60" height="4.44"/>' +
        '<rect y="22.22" width="60" height="4.44"/>' +
        '<rect y="31.11" width="60" height="4.44"/>' +
      '</g>' +
      '<rect width="22.22" height="22.22" fill="#0D5EAF"/>' +
      '<g fill="#FFFFFF">' +
        '<rect x="8.89" width="4.44" height="22.22"/>' +
        '<rect y="8.89" width="22.22" height="4.44"/>' +
      '</g>' +
    '</svg>',

  india:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of India">' +
      '<rect width="60" height="13.34" fill="#FF9933"/>' +
      '<rect y="13.34" width="60" height="13.33" fill="#FFFFFF"/>' +
      '<rect y="26.67" width="60" height="13.33" fill="#138808"/>' +
      '<circle cx="30" cy="20" r="5" fill="none" stroke="#000080" stroke-width="1"/>' +
      '<circle cx="30" cy="20" r="2.5" fill="none" stroke="#000080" stroke-width="5" ' +
              'stroke-dasharray="0.33 0.32"/>' +
      '<circle cx="30" cy="20" r="0.9" fill="#000080"/>' +
    '</svg>',

  japan:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Japan">' +
      '<rect width="60" height="40" fill="#FFFFFF"/>' +
      '<circle cx="30" cy="20" r="12" fill="#BC002D"/>' +
    '</svg>',

  nigeria:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Nigeria">' +
      '<rect width="20" height="40" fill="#008751"/>' +
      '<rect x="20" width="20" height="40" fill="#FFFFFF"/>' +
      '<rect x="40" width="20" height="40" fill="#008751"/>' +
    '</svg>',

  peru:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Peru">' +
      '<rect width="20" height="40" fill="#D91023"/>' +
      '<rect x="20" width="20" height="40" fill="#FFFFFF"/>' +
      '<rect x="40" width="20" height="40" fill="#D91023"/>' +
    '</svg>',

  sweden:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Sweden">' +
      '<rect width="60" height="40" fill="#006AA7"/>' +
      '<rect x="16" width="7" height="40" fill="#FECC00"/>' +
      '<rect y="16.5" width="60" height="7" fill="#FECC00"/>' +
    '</svg>',

  thailand:
    '<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Flag of Thailand">' +
      '<rect width="60" height="40" fill="#A51931"/>' +
      '<rect y="6.67" width="60" height="26.66" fill="#F4F5F8"/>' +
      '<rect y="13.34" width="60" height="13.32" fill="#2D2A4A"/>' +
    '</svg>'
};

if (typeof module !== "undefined") { module.exports = HAND_FLAGS; }
