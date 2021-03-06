//Variables
const cacheName = 'v1';//Cache version name

//Cache Object - list of files to cache
const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
];

//Call install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    //Set cache on event(e) 
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  });
  
  
  //Call install event
  self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cache =>{
                  if(cache !== cacheName){
                      console.log('Service Worker: Clearing Old Cache');
                      return caches.delete(cache);
                  }
              })
          )
      })
    );
  });

  //Call fetch Event
  self.addEventListener('fetch', e => {
      console.log('Service Worker: Fetching');
      e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  });