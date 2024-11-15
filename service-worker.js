self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/alarm-jadwal/audio/alertalarm.wav'  // Pastikan path ini sesuai dengan struktur folder Anda
      ]);
    }).catch((error) => {
      console.error('Error while caching: ', error);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-cache-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
