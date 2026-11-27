// Service worker mínimo: permite instalar la app. Siempre busca la versión nueva en internet;
// si no hay conexión, muestra la última página guardada.
const CACHE = "ofertas-vive-v1";
const HOME = new URL("./", self.location).href;
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || req.mode !== "navigate") return;
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(HOME, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(HOME))
  );
});
