const CACHE='guitar-trainer-v3';

const STATIC=[
    './icon-192.png',
    './icon-512.png',
    './manifest.json'
];

const NETWORK_FIRST=[
    './guitar_trainer.html',
    './js/theory.js',
    './js/state.js',
    './js/render.js',
    './js/quiz.js',
    './js/main.js',
    './js/course.js',
    './js/chords.js',
    './js/chorddiagram.js',
    './sw.js'
];

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE).then(c=>c.addAll([...STATIC,...NETWORK_FIRST]))
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
    const isStatic=STATIC.some(p=>e.request.url.endsWith(p.replace('./','/')));

    if(isFont||isStatic){
        e.respondWith(
            caches.match(e.request).then(cached=>
                cached||fetch(e.request).then(res=>{
                    if(res.ok){const c=res.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c));}
                    return res;
                })
            )
        );
        return;
    }

    e.respondWith(
        fetch(e.request).then(res=>{
            if(res.ok){const c=res.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c));}
            return res;
        }).catch(()=>caches.match(e.request).then(cached=>cached||caches.match('./guitar_trainer.html')))
    );
});
