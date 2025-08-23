const CACHE_NAME = "prp-map-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "map.html",
  "style.css",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  // Precache all floor SVGs
  "maps/floor-G.svg",
  "maps/floor-1.svg",
  "maps/floor-2.svg",
  "maps/floor-3.svg",
  "maps/floor-4.svg",
  "maps/floor-5.svg",
  "maps/floor-6.svg",
  "maps/floor-7.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
