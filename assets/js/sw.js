const CACHE_NAME = "offline-cache-v1";
const OFFLINE_PAGE = "../../offline.html";

const ASSETS_TO_CACHE = [
    "../../index.html",
    "../../offline.html",
];

// Install Service Worker dan cache file yang dibutuhkan
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Intercept Fetch Requests
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                return response || caches.match(OFFLINE_PAGE);
            });
        })
    );
});
