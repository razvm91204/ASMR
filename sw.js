// Change this to your repository name
var GHPATH = '/ASMR';

// Choose a different app prefix name
var APP_PREFIX = 'soothe_';

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_00';

// The files to make available for offline use. make sure to add 
// others to this list
// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = [    
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/fonts/Avenir.ttf`,
    `${GHPATH}/fonts/Avenir-Heavy.ttf`,
    `${GHPATH}/styles/styles.css`,
    `${GHPATH}/styles/slider.css`,
    `${GHPATH}/icons/bird.svg`,
    `${GHPATH}/icons/boat.svg`,
    `${GHPATH}/icons/city.svg`,
    `${GHPATH}/icons/coffee-shop.svg`,
    `${GHPATH}/icons/fireplace.svg`,
    `${GHPATH}/icons/pause.svg`,
    `${GHPATH}/icons/pink-noise.svg`,
    `${GHPATH}/icons/play.svg`,
    `${GHPATH}/icons/rain.svg`,
    `${GHPATH}/icons/storm.svg`,
    `${GHPATH}/icons/summer-night.svg`,
    `${GHPATH}/icons/trash.svg`,
    `${GHPATH}/icons/waves.svg`,
    `${GHPATH}/icons/white-noise.svg`,
    `${GHPATH}/icons/wind.svg`,
    `${GHPATH}/main.js`
  ];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});