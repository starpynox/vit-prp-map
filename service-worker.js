const CACHE_NAME = 'prp-cache-v4';
const PRECACHE = [
  'index.html',
  'map.html',
  'style.css',
  'manifest.webmanifest',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  'maps/floor-G.svg',
  'maps/floor-1.svg',
  'maps/floor-2.svg',
  'maps/floor-3.svg',
  'maps/floor-4.svg',
  'maps/floor-5.svg',
  'maps/floor-6.svg',
  'maps/floor-7.svg'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

// Fetch: handle navigation + asset caching
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond with the cached HTML for navigation
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).catch(() => caches.match('index.html'));
      })
    );
    return;
  }

  // Cache-first for other requests
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
