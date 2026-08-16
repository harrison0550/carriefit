/* Keep this query aligned with app-meta.js so Safari cannot reuse stale imported metadata. */
importScripts("./app-meta.js?build=2026.08.15.1");

const CACHE=self.CARRIEFIT_META.serviceWorkerCache;
const CACHE_PREFIX="carriefit-";
const MUTABLE_ASSETS=[
  "index.html",
  "app.css",
  "app-meta.js",
  "exercise-library.js",
  "data.js",
  "adaptive-coaching.js",
  "scheduling.js",
  "workout-navigation.js",
  "workout-history.js",
  "app.js",
  "manifest.webmanifest",
  "assets/icon.svg",
  "assets/apple-touch-icon.png",
  "assets/icon-192.png",
  "assets/icon-512.png"
];
const ASSETS=[
  "./",
  "./index.html",
  "./app.css",
  "./app-meta.js",
  "./exercise-library.js",
  "./data.js",
  "./adaptive-coaching.js",
  "./scheduling.js",
  "./workout-navigation.js",
  "./workout-history.js",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/exercise-library/generated/dead-bug-female.gif",
  "./assets/exercise-library/generated/bird-dog-female.gif",
  "./assets/exercise-library/generated/side-plank-from-knees-female.gif",
  "./assets/exercise-library/generated/hip-glute-mobility-female.gif",
  "./assets/exercise-library/generated/slow-breathing-female.gif",
  "./assets/exercise-library/generated/post-workout-stretch-female.gif",
  "./assets/exercise-library/original/cable-hammer-curl-red-cage.webp",
  "./assets/exercise-library/original/arm-circles-posture.webp",
  "./assets/exercise-library/original/bodyweight-squat-posture.webp",
  "./assets/exercise-library/original/lat-pulldown-red-cage.webp",
  "./assets/exercise-library/generated/hip-flexor-mobility.gif",
  "./assets/exercise-library/generated/hamstring-mobility.gif",
  "./assets/exercise-library/generated/chest-shoulder-mobility.gif",
  "./assets/exercise-library/original/hip-hinge-posture.webp",
  "./assets/exercise-library/original/incline-cable-press-cage.webp",
  "./assets/exercise-library/generated/treadmill-easy-walk.gif",
  "./assets/exercise-library/generated/treadmill-incline-walk.gif",
  "./assets/exercise-library/generated/treadmill-hiit-interval.gif",
  "./assets/exercise-library/wger/hip-flexor-stretch.webp",
  "./assets/exercise-library/wger/triceps-pushdown.webp",
  "./assets/exercise-library/wger/smith-split-squat.gif",
  "./assets/exercise-library/ritfit/cable-chest-press.webp",
  "./assets/exercise-library/ritfit/cable-crunch.webp",
  "./assets/exercise-library/ritfit/cable-curl.webp",
  "./assets/exercise-library/ritfit/cable-face-pull.webp",
  "./assets/exercise-library/ritfit/cable-lateral-raise.webp",
  "./assets/exercise-library/ritfit/cable-shoulder-press.webp",
  "./assets/exercise-library/ritfit/high-to-low-cable-chop.webp",
  "./assets/exercise-library/ritfit/rear-delt-cable-fly.webp",
  "./assets/exercise-library/ritfit/seated-cable-row.webp",
  "./assets/exercise-library/ritfit/single-arm-cable-row.webp",
  "./assets/exercise-library/ritfit/smith-machine-calf-raise.webp",
  "./assets/exercise-library/ritfit/smith-machine-rdl.webp",
  "./assets/exercise-library/ritfit/smith-machine-squat.webp",
  "./assets/exercise-library/ritfit/straight-arm-pulldown.webp"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys=>Promise.all(
        keys
          .filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE)
          .map(key=>caches.delete(key))
      )),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch",event=>{
  const requestUrl=typeof event.request==="string"?event.request:event.request.url;
  const requestPath=requestUrl.split("?")[0];
  const isMutable=event.request.mode==="navigate"||MUTABLE_ASSETS.some(asset=>requestPath.endsWith(asset));
  if(!isMutable){
    event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request)));
    return;
  }
  event.respondWith(
    fetch(event.request).then(async response=>{
      if(response&&response.ok!==false){
        const cache=await caches.open(CACHE);
        await cache.put(event.request,response.clone?response.clone():response);
      }
      return response;
    }).catch(async()=>{
      const cached=await caches.match(event.request);
      return cached||caches.match("./index.html");
    })
  );
});
