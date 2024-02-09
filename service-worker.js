var cacheName = "BookingSystem-v1";
var cacheFiles = [
    "index.html",
    "lessons.js",
    "images/ArtClass Logo.jpg",
    "images/biology class.png",
    "images/bookingSystem.png",
    "images/cart-shopping-solid.svg",
    "images/chemistryClass.png",
    "images/computerClass.png",
    "images/EnglishClass Logo.jpg",
    "images/geographyClass.png",
    "images/historyClass.png",
    "images/MathClass Logo.jpg",
    "images/physicsClass.png",
    "images/ScienceClass Logo.jpg",
    "images/shopping-cart.png"
];
self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
    // check if the cache has the file
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            // 'r' is the matching file if it exists in the cache
            return r
        })
    );
});

self.addEventListener("fetch", function(e) {
    e.respondWith(
    caches.match(e.request).then(function (cachedFile) {
    //if the file is in the cache, retrieve it from there
        if (cachedFile) {
            console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
            return cachedFile;
        } else {//if the file is not in the cache, download the file
            return fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                //add the new file to the cache
                    cache.put(e.request, response.clone());
                        console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                            e.request.url);
                        return response;
                    });
                });
            }
        })
    );
});