const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const listeners = new Map();
const stores = new Map();
const deletedCaches = [];
let networkOnline = true;
let networkRequests = 0;
let skipWaitingCalled = false;
let claimCalled = false;

function requestKey(request) {
  return typeof request === "string" ? request : request.url;
}

function cacheFor(name) {
  if (!stores.has(name)) stores.set(name, new Map());
  const store = stores.get(name);
  return {
    async addAll(assets) {
      for (const asset of assets) {
        store.set(asset, { source: "cache", url: asset });
      }
    },
    async match(request) {
      return store.get(requestKey(request));
    },
    async put(request, response) {
      store.set(requestKey(request), response);
    },
  };
}

const context = {
  console,
  Promise,
  URL,
  importScripts(relativePath) {
    const source = fs.readFileSync(
      path.join(root, relativePath.replace(/^\.\//, "").split("?")[0]),
      "utf8",
    );
    vm.runInContext(source, context, { filename: relativePath });
  },
  caches: {
    async open(name) {
      return cacheFor(name);
    },
    async keys() {
      return [...stores.keys()];
    },
    async delete(name) {
      deletedCaches.push(name);
      return stores.delete(name);
    },
    async match(request) {
      const key = requestKey(request);
      for (const store of stores.values()) {
        if (store.has(key)) return store.get(key);
      }
      return undefined;
    },
  },
  async fetch(request) {
    networkRequests++;
    if (!networkOnline) throw new Error("offline");
    return {
      source: "network",
      url: requestKey(request),
      ok: true,
      clone() {
        return { source: "network-cache", url: requestKey(request), ok: true };
      },
    };
  },
  self: {
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    skipWaiting() {
      skipWaitingCalled = true;
    },
    clients: {
      claim() {
        claimCalled = true;
      },
    },
  },
};
context.self.self = context.self;
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "sw.js"), "utf8"), context, {
  filename: "sw.js",
});

async function dispatchExtendable(type) {
  let completion;
  listeners.get(type)({
    waitUntil(promise) {
      completion = Promise.resolve(promise);
    },
  });
  assert(completion, `${type} must register asynchronous completion`);
  await completion;
}

async function dispatchFetch(url) {
  let response;
  listeners.get("fetch")({
    request: { url, method: "GET", mode: url.endsWith("index.html") ? "navigate" : "same-origin" },
    respondWith(promise) {
      response = Promise.resolve(promise);
    },
  });
  assert(response, "fetch must provide a response");
  return response;
}

(async () => {
  const cacheName = context.self.CARRIEFIT_META.serviceWorkerCache;
  assert.strictEqual(cacheName, "carriefit-v1-1-7-shell");

  await dispatchExtendable("install");
  assert.strictEqual(skipWaitingCalled, true, "new worker must activate promptly");
  const currentStore = stores.get(cacheName);
  assert(currentStore, "install must create the current shell cache");
  for (const asset of [
    "./",
    "./index.html",
    "./app.css",
    "./scheduling.js",
    "./workout-navigation.js",
    "./app.js",
    "./manifest.webmanifest",
    "./assets/exercise-library/original/cable-hammer-curl-red-cage.webp",
    "./assets/exercise-library/original/arm-circles-posture.webp",
    "./assets/exercise-library/original/bodyweight-squat-posture.webp",
    "./assets/exercise-library/original/lat-pulldown-red-cage.webp",
    "./assets/exercise-library/original/hip-hinge-posture.webp",
    "./assets/exercise-library/original/incline-cable-press-cage.webp",
    "./assets/exercise-library/original/treadmill-walk-posture.webp",
  ]) {
    assert(currentStore.has(asset), `install must cache ${asset}`);
  }

  stores.set("carriefit-phase10-1-v1", new Map([["./index.html", { stale: true }]]));
  stores.set("unrelated-cache", new Map([["other", { keep: true }]]));
  await dispatchExtendable("activate");
  assert.strictEqual(claimCalled, true, "updated worker must claim open clients");
  assert(
    deletedCaches.includes("carriefit-phase10-1-v1"),
    "activation must remove the prior CarrieFit cache",
  );
  assert(stores.has(cacheName), "activation must retain the current cache");
  assert(stores.has("unrelated-cache"), "activation must not delete unrelated caches");

  networkOnline = false;
  const requestsBeforeOfflineRelaunch = networkRequests;
  const cachedRelaunch = await dispatchFetch("./index.html");
  assert.strictEqual(cachedRelaunch.source, "cache");
  assert.strictEqual(
    networkRequests,
    requestsBeforeOfflineRelaunch + 1,
    "offline relaunch must attempt a refresh before falling back to the cached shell",
  );

  networkOnline = true;
  const refreshedApp = await dispatchFetch("./app.js");
  assert.strictEqual(refreshedApp.source, "network");
  assert.strictEqual(
    stores.get(cacheName).get("./app.js").source,
    "network-cache",
    "mutable application files must refresh the offline cache while online",
  );
  const networkResponse = await dispatchFetch("./not-cached.txt");
  assert.strictEqual(networkResponse.source, "network");
  assert.strictEqual(
    networkRequests,
    requestsBeforeOfflineRelaunch + 3,
    "uncached requests must fall back to the network",
  );

  console.log(
    "Offline PWA smoke tests passed: install, shell caching, update cleanup, client claim, and offline relaunch.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
