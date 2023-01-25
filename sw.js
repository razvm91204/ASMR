// Change this to your repository name
var GHPATH = '/ASMR';
// Choose a cache name
const CACHE_NAME = 'cache-v1';
const  APP_PREFIX = 'soothe_';
// List the files to precache
const URLS = [    
    `${GHPATH}/`,
    `${GHPATH}/index.html`,
    `${GHPATH}/fonts/Avenir.ttf`,
    `${GHPATH}/fonts/Avenir-Heavy.ttf`,
    `${GHPATH}/styles/style.css`,
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


  self.addEventListener('fetch', function (e) {
    console.log('Fetch request : ' + e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (request) {
        if (request) { 
          console.log('Responding with cache : ' + e.request.url);
          return request
        } else {       
          console.log('File is not cached, fetching : ' + e.request.url);
          return fetch(e.request)
        }
      })
    )
  })
  
  self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('Installing cache : ' + CACHE_NAME);
        return cache.addAll(URLS)
      })
    )
  })
  
  self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keyList) {
        var cacheWhitelist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX)
        })
        cacheWhitelist.push(CACHE_NAME);
        return Promise.all(keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log('Deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i])
          }
        }))
      })
    )
  })