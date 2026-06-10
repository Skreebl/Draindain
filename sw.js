// Даємо нову унікальну назву кешу з версією
const CACHE_NAME = 'draincalc-cache-v2'; 

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Додаємо правильний шлях /Draincalc/ до всіх файлів
      return cache.addAll([
        '/Draincalc/',
        '/Draincalc/index.html',
        '/Draincalc/styles.css',
        '/Draincalc/script.js',
        '/Draincalc/icon-192x192.png',
        '/Draincalc/icon-512x512.png'
      ]);
    })
  );
});

// Додаємо подію activate, щоб телефон точно забув старий кеш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Видалення старого кешу:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
