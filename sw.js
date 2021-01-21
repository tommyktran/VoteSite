const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    'affidavitPage.js',
    '/ballot.css',
    '/ballot.js',
    '/buildReviewPage.js',
    '/buildSelectionPage.js',
    '/ovalSelection.js',
    '/WATERVILLE.js'
];

// install event
self.addEventListener('install', evt => {
    console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('service worker fetched', evt);
});