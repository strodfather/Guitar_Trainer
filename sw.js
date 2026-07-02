const CACHE='guitar-trainer-v2';

const PRECACHE=[
    './guitar_trainer.html',
    './js/theory.js',
    './js/state.js',
    './js/render.js',
    './js/quiz.js',
    './js/main.js',
    './js/course.js',
    './js/chords.js',
    './js/chordDiagram.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE).then(cache=>cache.addAll(PRECACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate',e=>{
    e.waitUntil(
        caches.keys().then(keys=>
            Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch',e=>{
    if(e.request.method!=='GET') return;
    if(!e.request.url.startsWith('http')) return;
    const url=new URL(e.request.url);
    const isFont=url.hostname.includes('fonts.googleapis.com')||url.hostname.includes('fonts.gstatic.com');
    if(isFont){
        e.respondWith(
            caches.match(e.request).then(cached=>{
                const network=fetch(e.request).then(res=>{
                    if(res.ok){
                        const clone=res.clone();
                        caches.open(CACHE).then(c=>c.put(e.request,clone));
                    }
                    return res;
                });
                return cached||network;
            })
        );
        return;
    }
    e.respondWith(
        caches.match(e.request).then(cached=>{
            if(cached) return cached;
            return fetch(e.request).then(res=>{
                if(res.ok){
                    const clone=res.clone();
                    caches.open(CACHE).then(c=>c.put(e.request,clone));
                }
                return res;
            }).catch(()=>caches.match('./guitar_trainer.html'));
        })
    );
});
