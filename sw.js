// Offline-first app shell, challenges saved locally on each device.
const CACHE='lettucelove-banana-v4';
const FILES=['./','./index.html','./manifest.webmanifest','./love-logo.webp','./love-icon-180.png','./love-icon-192.png','./love-icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(res=>{
   if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});}return res;
 }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
});
