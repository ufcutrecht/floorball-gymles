/* Gymles-app: laadt een programmapagina uit de trainersapp (repository floorball-training, bijv.
   /floorball-training/gymles/index.html) en toont die met het UFC Utrecht-logo, de gymles-iconen en een
   terugknop naar de startpagina van deze app.
   De oefeningen staan dus maar op één plek; wijzig ze altijd in de map van het programma zelf.
   Woorden (gymles i.p.v. training) en kopteksten per programma staan hieronder in APP.
   Gebruik: <script src="../loader.js" data-program="gymles"></script> */
(function () {
  var me = document.currentScript, PROGRAM = me.getAttribute("data-program");
  var abs = function (rel) { return new URL(rel, me.src).href; };      // ten opzichte van deze app (floorball-gymles/)
  var TRAIN = abs("../floorball-training/");                         // trainersapp, zelfde domein (ufcutrecht.github.io)
  var APP = {
    id: "gymzaal",                                                   // app-id voor de scores in Supabase: niet wijzigen
    logo: abs("icons/ufc-logo.png"),
    logoAlt: "UFC Utrecht",
    logoLabel: "gymles",                                             // tekst onder het logo
    appName: "Floorball gymles",                                     // naam op het beginscherm
    home: abs("./"),
    sw: abs("sw.js"), swScope: abs("./"),                            // eigen offline-app
    words: { unit: "gymles", Unit: "Gymles", title: "Mijn gymles", inLabel: "In de gymles", btnLabel: "Gymles",
             libName: "Gymles", libTitle: "Bewaarde gymlessen", units: "gymlessen",
             people: "kinderen", hallWord: "zaalindeling", hallName: "zaal",          // in de gymles: kinderen en zaal, geen spelers en veld
             extra: "Reken 10 minuten extra voor uitleg en afsluiten." },
    texts: ({
      gymles: { title: "Gymles groep 3–6 · Floorball in de gymles", eyebrow: "Floorball in de gymles · 6–9 jaar", h1: "Groep 3–6",
                lead: "Spel- en oefenvormen waarin iedereen tegelijk meedoet: veel bewegen, veel balcontacten en plezier." },
      o12:    { title: "Gymles groep 7–8 · Floorball in de gymles", eyebrow: "Floorball in de gymles · 9–12 jaar", h1: "Groep 7–8",
                lead: "Spel- en oefenvormen waarin iedereen tegelijk meedoet: veel bewegen, keuzes maken, samenspelen en mikken." }
    })[PROGRAM] || {}
  };
  var msg = function (t) { var m = document.getElementById("msg"); if (m) m.textContent = t; };
  /* De pagina uit de trainersapp aanpassen per onderdeel (niet door letterlijke tekst te vervangen),
     zodat een kleine wijziging in de html van de trainersapp dit niet ongemerkt breekt. */
  function adapt(html) {
    var doc = new DOMParser().parseFromString(html, "text/html"), head = doc.head;
    var el = function (tag, attrs) { var e = doc.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; };
    var put = function (sel, tag, attrs) {                          // bestaand element bijwerken, anders toevoegen
      var e = head.querySelector(sel) || doc.querySelector(sel);
      if (!e) { e = el(tag, {}); head.appendChild(e); }
      for (var k in attrs) e.setAttribute(k, attrs[k]);
    };
    put('link[rel="manifest"]', "link", { rel: "manifest", href: abs("manifest.webmanifest") });
    put('link[rel="icon"]', "link", { rel: "icon", href: abs("icons/gymles-192.png") });
    put('link[rel="apple-touch-icon"]', "link", { rel: "apple-touch-icon", href: abs("icons/gymles-apple-touch-icon.png") });
    put('meta[name="apple-mobile-web-app-title"]', "meta", { name: "apple-mobile-web-app-title", content: APP.appName });
    if (APP.texts.title) doc.title = APP.texts.title;
    /* base en FB_APP moeten vóór alle andere scripts staan */
    var cfg = el("script", {}); cfg.textContent = "window.FB_APP=" + JSON.stringify(APP);
    head.insertBefore(cfg, head.firstChild);
    head.insertBefore(el("base", { href: TRAIN + PROGRAM + "/" }), head.firstChild);
    return "<!doctype html>" + doc.documentElement.outerHTML;
  }
  fetch(TRAIN + PROGRAM + "/index.html", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (html) { html = adapt(html); document.open(); document.write(html); document.close(); })
    .catch(function () { msg("De oefeningen konden niet worden geladen. Controleer je internetverbinding en probeer het opnieuw."); });
})();
