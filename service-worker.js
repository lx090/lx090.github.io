// 缓存版本
const CACHE = 'my-app-v1';

// 安装时缓存
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE));
});

// 优先使用缓存
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});