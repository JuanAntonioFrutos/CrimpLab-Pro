const CACHE_NAME = 'crimplab-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'favicon.png'
];

// Instalar y guardar archivos en la caché del móvil
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activar el control de la app
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Servir los archivos desde la memoria cuando no hay internet
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
