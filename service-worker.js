const CACHE_NAME = 'prp-cache-v2';

const PRECACHE = [
  // App shell
  'index.html',
  'map.html',
  'style.css',
  'manifest.webmanifest',

  // Icons
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',

  // Maps
  'maps/floor-G.svg',
  'maps/floor-1.svg',
  'maps/floor-2.svg',
  'maps/floor-3.svg',
  'maps/floor-4.svg',
  'maps/floor-5.svg',
  'maps/floor-6.svg',
  'maps/floor-7.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Special case for navigation (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((cached) => {
        return cached || fetch(event.request);
      })
    );
    return;
  }

  // Cache-first for all other requests
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
