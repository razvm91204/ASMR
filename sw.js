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
var URLS = [    
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
  `${GHPATH}/sounds.js`
]