const CACHE="carriefit-phase10-1-v1";
const ASSETS=[
  "./","./index.html","./css/app.css","./js/data.js","./js/storage.js",
  "./js/charts.js","./js/coach.js","./js/app.js","./manifest.webmanifest","./assets/equipment/road-to-12-layout-guide.png","./assets/equipment/road-to-12-blueprint.png","./assets/guides/chest-press.svg","./assets/guides/lat-pulldown.svg","./assets/guides/seated-row.svg","./assets/guides/incline-press.svg"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)))});
