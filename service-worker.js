// 缓存版本
const CACHE = 'learning-assistant-v1';

// 需要缓存的文件
const CACHE_FILES = [
  './',
  './display-score.html',
  './edit-score.html',
  './style.css',
  './service-worker.js'
];

// 安装时缓存所有必要文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CACHE_FILES))
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    })
  );
});

// 优先使用缓存
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});