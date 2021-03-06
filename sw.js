importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/images/hashes.json",
    "revision": "fe72232f35b744ddacbd0cb6afc6002e"
  },
  {
    "url": "assets/images/logo-192.png",
    "revision": "8dc95f8b15eb89a49f484e24bec7772b"
  },
  {
    "url": "assets/images/logo-512.png",
    "revision": "35cf42271eac1ed0c5c5823901f74db9"
  },
  {
    "url": "assets/images/logo4.png",
    "revision": "58c9e4e45653bde53a04a5f7217ff007"
  },
  {
    "url": "assets/images/sana-potter.jpg",
    "revision": "662f63c6e5daf6041b9e43bd820aecb5"
  }
]);

self.addEventListener('install', event => {
   const urls = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
      'https://cdn.ampproject.org/shadow-v0.js'
   ];
   const cacheName = workbox.core.cacheNames.runtime;
   event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)));
});

workbox.routing.registerRoute(/(.*)html|(.*)\/$/, workbox.strategies.networkFirst())
workbox.routing.registerRoute(/\.(?:js|css|png|gif|jpg|svg)$/,
   workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(/(.*)cdn\.ampproject\.org(.*)/,
   workbox.strategies.staleWhileRevalidate()
);