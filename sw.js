// Minimal app-shell service worker: caches the static shell so the app still
// opens offline (UI + saved recipes, which live in IndexedDB, not this cache).
// CDN libraries used for photo/PDF import (pdf.js, Tesseract.js) are loaded
// on demand and need network the first time — that's expected, not a bug.
const CACHE = "receptjes-shell-v4";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./firebase-config.js",
  "./icon-192.png",
  "./logo-wordmark.png",
  "./logo-mark.png"
];
// Versioned Firebase SDK files never change, so they are served from cache once fetched;
// without them an installed, logged-in app could not start offline.
const FIREBASE_SDK_PREFIX = "https://www.gstatic.com/firebasejs/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.url.startsWith(FIREBASE_SDK_PREFIX)) {
    event.respondWith(
      caches.match(event.request).then((hit) => hit || fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      }))
    );
    return;
  }
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // let other CDN requests pass through untouched
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
