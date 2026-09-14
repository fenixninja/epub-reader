// Service Worker para Lector EPUB (PWA Offline)
const CACHE_NAME = "epub-reader-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./reader.js",
  "./i18n.js",
  "./manifest.json",
  "./fonts/Fast_Sans.ttf",
  "./img/epub.jpeg",
  "./img/libro.jpeg",
  "./libros/demo.epub",
  // CDN libs
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdn.jsdelivr.net/npm/epubjs@0.3.93/dist/epub.min.js",
  // Iconos PWA esenciales
  "./fenix_icons/favicon.ico",
  "./fenix_icons/favicon-32x32.png",
  "./fenix_icons/favicon-96x96.png",
  "./fenix_icons/android-icon-192x192.png",
  "./fenix_icons/favicon-256x256.png",
  "./fenix_icons/icon-512x512.png",
  "./fenix_icons/apple-icon-180x180.png"
];

// Instalación: precarga de assets estáticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn("Aviso en pre-cache del Service Worker:", err);
      })
  );
});

// Activación: limpieza de cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: Estrategia Stale-While-Revalidate para recursos estáticos y Cache-First para CDNs/fuentes
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Solo interceptar peticiones GET
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      // Intentar fetch en segundo plano para actualizar la caché
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Si no hay red y no está en caché, simplemente dejamos que falle la red
        });

      // Si está en caché, devolverlo inmediatamente; si no, esperar a la red
      return cachedResponse || fetchPromise;
    })
  );
});
