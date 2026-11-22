/* Offline-app "Floorball gymles": eerst het netwerk (zodat iedereen de nieuwste versie krijgt), anders de bewaarde kopie.
   De oefeningen en gedeelde scripts komen uit de trainersapp (../floorball-training/) op hetzelfde domein. */
const CACHE = "gymles-v9";
const T = "../floorball-training/";
const CORE = ["./", "index.html", "manifest.webmanifest", "loader.js", "gymles/", "o12/",
  "icons/ufc-logo.png", "icons/gymles-192.png", "icons/gymles-512.png", "icons/gymles-apple-touch-icon.png",
  T + "gymles/index.html", T + "o12/index.html",
  T + "shared/shim.js", T + "shared/config.js", T + "shared/online.js", T + "shared/exercises.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {   // alleen eigen oude caches opruimen; de trainersapp deelt hetzelfde domein
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("gymles-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.hostname.endsWith("supabase.co")) return;          // scores altijd live
  const external = url.origin !== location.origin;
  if (external && !/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.hostname)) return;
  if (external) {                                              // lettertypes en pdf-bibliotheek: uit de cache als het kan
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match("index.html"))));
});
