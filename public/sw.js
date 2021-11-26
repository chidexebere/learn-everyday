const CACHE_VERSION = 'version-1.00';
const filesToCache = ['/', '/index.html', '/offline.html'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  // self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('Cache opened');
      return cache.addAll(filesToCache).catch((error) => {
        console.log(`Cache open failed: ${error}`);
      });
    }),
  );
  self.skipWaiting();
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
  clients.claim();
});

// Intercept requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (cacheResponse) =>
        cacheResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== 'basic'
            ) {
              return networkResponse;
            }
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => caches.match('offline.html')),
    ),
  );
});
