const staticCacheName = 's-app-v1'
const dynamicCacheName = 'd-app-v1'

const assetUrls = [
  'index.html',
  'css/index.css',
  'js/index.js',
  'js/downloadLabel.js',
  'js/app.js',
  'js/script.js',
  'offline.html',
  'images/salaryCalculation-64x64.png',
  'images/salaryCalculation-128x128.png',
  'images/salaryCalculation-144x144.png',
  'images/salaryCalculation-192x192.png',
  'images/salaryCalculation-256x256.png',
  'images/salaryCalculation-512x512.png',
  'images/salaryCalculation-540x720.jpg',
  'images/salaryCalculation-540x720.png'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('offline.html')
  }
}
