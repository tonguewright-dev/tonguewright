/* eslint-disable @typescript-eslint/no-explicit-any */
import { self } from '$app/service-worker';
import { version } from '$app/env';
import { immutable, assets } from '$app/manifest';
import { resolve } from '$app/paths';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// `immutable`/`assets` paths from `$app/manifest` are relative to the
// base path, so resolve them to absolute pathnames that can be matched
// against `url.pathname` in the `fetch` handler
const ASSETS = [
  ...immutable.map((asset) => resolve(asset.path as any)), // the Vite output
  ...assets.map((asset) => resolve(asset.path as any)) // everything in `static`
];

self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    console.log('[SW] Installing...');
    const cache = await caches.open(CACHE);
    // Cache each URL individually so one failure doesn't abort SW install
    await Promise.allSettled(
      ASSETS.map((url) =>
        cache.add(url.replace(/^#/, '')).catch((err) => {
          console.warn('[SW] Could not cache:', url, err);
        })
      )
    );
    // Activate immediately rather than waiting for old SW to be replaced
    self.skipWaiting();
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    console.log('[SW] Activating...');
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
    // Take control of all pages in scope immediately
    await self.clients.claim();
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  if (event.request.method !== 'GET') return;

  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    const cachedResponse = await cache.match(event.request);

    // `immutable`/`assets` can always be served from the cache (unless items are evicted under cache pressure...)
    if (cachedResponse && ASSETS.includes(url.pathname as any)) {
      return cachedResponse;
    }

    // for everything else, try the network first...
    try {
      const response = await fetch(event.request);

      if (response.status === 200 && !response.headers.get('cache-control')?.includes('no-store')) {
        // ...and cache responses in the background for next time....
        void cache.put(event.request, response.clone());
      }

      return response;
    } catch (error) {
      // ...otherwise fall back to previously cached data if it exists...
      if (cachedResponse) {
        return cachedResponse;
      }

      // ...or throw the error
      throw error;
    }
  }

  event.respondWith(respond());
});
