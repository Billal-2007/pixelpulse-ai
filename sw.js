// ==========================================
// PixelPulse AI - PWA Service Worker
// ==========================================

const CACHE_NAME = 'pixelpulse-cache-v1';
const assetsToCache = [
  'index.html',
  'admin.html',
  'assets/css/style.css',
  'assets/js/app.js',
  'assets/js/admin.js',
  'manifest.json'
];

// Install Event - Caching core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // Fallback if offline and asset not in cache
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
    })
  );
});
