const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/ballot.js',
    '/WATERVILLE.js',
    '/buildSelectionPage.js',
    '/ovalSelection.js',
    '/buildReviewPage.js',
    '/keyboard.js',
    '/affidavitPage.js',
    
    //'/ballotpdf.js',
    //'/jspdf.min.js',
    //'/manifest.json',
    //'/qrcode.min.js',
    // and icons ?? 
];

// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
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
    //console.log('service worker activated');
});