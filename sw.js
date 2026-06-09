/* Minimal service worker for offline caching */
var CACHE = 'tindi-selma-v1';
var ASSETS = ['/', '/index.html', '/css/style.css', '/js/main.js'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
