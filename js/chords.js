import{NOTES_SHARP,NOTES_DISPLAY}from'./theory.js';

export const CHORD_FORMULAS={
    '':       {name:'Major',            intervals:[0,4,7]},
    'm':      {name:'Minor',            intervals:[0,3,7]},
    'dim':    {name:'Diminished',       intervals:[0,3,6]},
    'aug':    {name:'Augmented',        intervals:[0,4,8]},
    'sus2':   {name:'Suspended 2nd',    intervals:[0,2,7]},
    'sus4':   {name:'Suspended 4th',    intervals:[0,5,7]},
    '5':      {name:'Power Chord',      intervals:[0,7]},
    '6':      {name:'Major 6th',        intervals:[0,4,7,9]},
    'm6':     {name:'Minor 6th',        intervals:[0,3,7,9]},
    '6/9':    {name:'Six Nine',         intervals:[0,4,7,9,2]},
    'maj7':   {name:'Major 7th',        intervals:[0,4,7,11]},
    '7':      {name:'Dominant 7th',     intervals:[0,4,7,10]},
    'm7':     {name:'Minor 7th',        intervals:[0,3,7,10]},
    'dim7':   {name:'Diminished 7th',   intervals:[0,3,6,9]},
    'm7b5':   {name:'Half Diminished',  intervals:[0,3,6,10]},
    'mMaj7':  {name:'Minor Major 7th',  intervals:[0,3,7,11]},
    'maj7#5': {name:'Major 7th #5',     intervals:[0,4,8,11]},
    '7sus4':  {name:'Dom 7 Sus4',       intervals:[0,5,7,10]},
    '7sus2':  {name:'Dom 7 Sus2',       intervals:[0,2,7,10]},
    '7b5':    {name:'7 Flat 5',         intervals:[0,4,6,10]},
    '7#5':    {name:'7 Sharp 5',        intervals:[0,4,8,10]},
    '7b9':    {name:'7 Flat 9',         intervals:[0,4,7,10,1]},
    '7#9':    {name:'7 Sharp 9',        intervals:[0,4,7,10,3]},
    '7#11':   {name:'Lydian Dominant',  intervals:[0,4,7,10,6]},
    '7b13':   {name:'7 Flat 13',        intervals:[0,4,7,10,8]},
    '7alt':   {name:'Altered Dom',      intervals:[0,4,8,10,1,3]},
    'maj9':   {name:'Major 9th',        intervals:[0,4,7,11,2]},
    '9':      {name:'Dominant 9th',     intervals:[0,4,7,10,2]},
    'm9':     {name:'Minor 9th',        intervals:[0,3,7,10,2]},
    'add9':   {name:'Add 9',            intervals:[0,4,7,2]},
    'madd9':  {name:'Minor Add 9',      intervals:[0,3,7,2]},
    'mMaj9':  {name:'Minor Major 9th',  intervals:[0,3,7,11,2]},
    '9#11':   {name:'9 Sharp 11',       intervals:[0,4,7,10,2,6]},
    '9b13':   {name:'9 Flat 13',        intervals:[0,4,7,10,2,8]},
    '7b9#11': {name:'7b9 Sharp 11',     intervals:[0,4,7,10,1,6]},
    '7#9#11': {name:'7#9 Sharp 11',     intervals:[0,4,7,10,3,6]},
    'maj11':  {name:'Major 11th',       intervals:[0,4,7,11,2,5]},
    '11':     {name:'Dominant 11th',    intervals:[0,4,7,10,2,5]},
    'm11':    {name:'Minor 11th',       intervals:[0,3,7,10,2,5]},
    'maj13':  {name:'Major 13th',       intervals:[0,4,7,11,2,5,9]},
    '13':     {name:'Dominant 13th',    intervals:[0,4,7,10,2,5,9]},
    'm13':    {name:'Minor 13th',       intervals:[0,3,7,10,2,5,9]},
    '13b9':   {name:'13 Flat 9',        intervals:[0,4,7,10,1,5,9]},
    '13#9':   {name:'13 Sharp 9',       intervals:[0,4,7,10,3,5,9]},
    '13#11':  {name:'13 Sharp 11',      intervals:[0,4,7,10,2,6,9]},
};

const _ALIASES=[
    ['Δ7','maj7'],['Δ','maj7'],['M7','maj7'],['maj7','maj7'],
    ['°7','dim7'],['dim7','dim7'],['°','dim'],
    ['ø7','m7b5'],['ø','m7b5'],['hdim7','m7b5'],['hdim','m7b5'],['-7b5','m7b5'],['m7b5','m7b5'],
    ['minMaj7','mMaj7'],['mM7','mMaj7'],['mmaj7','mMaj7'],['-M7','mMaj7'],['mMaj7','mMaj7'],
    ['augMaj7','maj7#5'],['M7#5','maj7#5'],['maj7#5','maj7#5'],
    ['7sus4','7sus4'],['7sus','7sus4'],['7sus2','7sus2'],
    ['7+11','7#11'],['7#11','7#11'],['7b13','7b13'],['7alt','7alt'],['alt','7alt'],
    ['7+5','7#5'],['aug7','7#5'],['7#5','7#5'],['+7','7#5'],
    ['7-5','7b5'],['7b5','7b5'],['7b9','7b9'],['7#9','7#9'],
    ['7b9+11','7b9#11'],['7b9#11','7b9#11'],['7#9+11','7#9#11'],['7#9#11','7#9#11'],
    ['13+11','13#11'],['13#11','13#11'],['13b9','13b9'],['13#9','13#9'],
    ['minMaj9','mMaj9'],['mM9','mMaj9'],['mMaj9','mMaj9'],
    ['9+11','9#11'],['9#11','9#11'],['9b13','9b13'],
    ['madd2','madd9'],['madd9','madd9'],['add2','add9'],['add9','add9'],
    ['M9','maj9'],['maj9','maj9'],['M11','maj11'],['maj11','maj11'],
    ['M13','maj13'],['maj13','maj13'],
    ['-13','m13'],['min13','m13'],['m13','m13'],
    ['-11','m11'],['min11','m11'],['m11','m11'],
    ['-9','m9'],['min9','m9'],['m9','m9'],
    ['-7','m7'],['min7','m7'],['m7','m7'],
    ['-6','m6'],['min6','m6'],['m6','m6'],
    ['dom7','7'],['dom','7'],
    ['-','m'],['min','m'],['mi','m'],['m','m'],
    ['sus4','sus4'],['sus','sus4'],['sus2','sus2'],
    ['aug','aug'],['+','aug'],
    ['6/9','6/9'],['69','6/9'],['6add9','6/9'],
    ['dim','dim'],['Maj',''],['maj',''],['M',''],['13','13'],['11','11'],['9','9'],['7','7'],['6','6'],['5','5'],['',''],
].sort((a,b)=>b[0].length-a[0].length);

let _OPEN=[4,9,2,7,11,4];
export function setOpenNotes(notes){_OPEN=notes;}

export function parseChordName(input){
    if(!input||!input.trim()) return null;
    let s=input.trim();
    let bass=null;
    const slashMatch=s.match(/\/([A-G][#b]?)$/);
    if(slashMatch){bass=slashMatch[1];s=s.slice(0,s.length-slashMatch[0].length);}
    const rootMatch=s.match(/^([A-G][#b]?)/);
    if(!rootMatch) return null;
    const root=rootMatch[1];
    const suffix=s.slice(root.length);
    for(const [alias,key] of _ALIASES){
        if(suffix===alias) return{root,quality:key,bass};
    }
    return null;
}

export function getChordDisplayName(root,quality){
    return root+(CHORD_FORMULAS[quality]?(' '+CHORD_FORMULAS[quality].name):'');
}

export function getChordNoteNames(root,quality){
    const ri=NOTES_SHARP.indexOf(root);
    if(ri===-1||!CHORD_FORMULAS[quality]) return[];
    return CHORD_FORMULAS[quality].intervals.map(i=>NOTES_DISPLAY[(ri+i)%12]);
}

function _required(intervals){
    const req=new Set([0]);
    if(intervals.length<=3){intervals.forEach((_,i)=>req.add(i));return req;}
    req.add(1);
    const si=intervals.findIndex(i=>i===10||i===11||i===9);
    if(si!==-1) req.add(si);
    return req;
}

function _countFingers(frets){
    return new Set(frets.filter(f=>f>0)).size;
}

function _assignFingers(frets){
    const out=Array(6).fill(0);
    const played=frets.map((f,i)=>({f,i})).filter(x=>x.f>0).sort((a,b)=>a.f-b.f||a.i-b.i);
    let fn=0,lastF=-1;
    for(const{f,i}of played){if(f!==lastF){fn++;lastF=f;}out[i]=fn;}
    return out;
}

function _detectBarre(frets){
    const played=frets.map((f,i)=>({f,i})).filter(x=>x.f>0).sort((a,b)=>a.f-b.f);
    if(!played.length) return null;
    const minF=played[0].f;
    const atMin=played.filter(x=>x.f===minF);
    if(atMin.length<2) return null;
    return{fret:minF,from:Math.min(...atMin.map(x=>x.i)),to:Math.max(...atMin.map(x=>x.i))};
}

function _noteAt(si,fret){
    return fret===0?_OPEN[si]%12:(_OPEN[si]+fret)%12;
}

function _dfs(si,frets,covered,state,minF,maxF,sopts,tones,req,results,seen){
    if(results.length>120) return;
    if(si===sopts.length){
        for(const r of req){if(!covered.has(r)) return;}
        if(_countFingers(frets)>4) return;
        const key=frets.join(',');
        if(seen.has(key)) return;
        seen.add(key);
        results.push([...frets]);
        return;
    }
    for(const opt of sopts[si]){
        let ns=state;
        if(opt===-1){
            if(state==='mid') ns='post';
            else if(state==='post') ns='post';
        }else{
            if(state==='post') continue;
            ns='mid';
        }
        let nMin=minF,nMax=maxF;
        if(opt>0){nMin=Math.min(minF===Infinity?opt:minF,opt);nMax=Math.max(maxF===-Infinity?opt:maxF,opt);}
        if(nMin!==Infinity&&nMax!==-Infinity&&nMax-nMin>4) continue;
        const nc=new Set(covered);
        if(opt>=0){const ni=tones.indexOf(_noteAt(si,opt));if(ni!==-1) nc.add(ni);}
        frets.push(opt);
        _dfs(si+1,frets,nc,ns,nMin,nMax,sopts,tones,req,results,seen);
        frets.pop();
    }
}

function _score(frets,rootTone,tones){
    let s=0;
    const played=frets.map((f,i)=>({f,i})).filter(x=>x.f!==-1);
    if(!played.length) return -99;
    const lowest=played[0];
    const bassNote=_noteAt(lowest.i,lowest.f);
    if(bassNote===rootTone) s+=6;
    const opens=frets.filter(f=>f===0).length;
    s+=opens*1.5;
    const fretted=frets.filter(f=>f>0);
    if(fretted.length){
        const avg=fretted.reduce((a,b)=>a+b,0)/fretted.length;
        s-=avg*0.15;
        const span=Math.max(...fretted)-Math.min(...fretted);
        s-=span*0.4;
    }
    s-=_countFingers(frets)*0.5;
    s+=played.length*0.3;
    const covTones=new Set(played.map(x=>tones.indexOf(_noteAt(x.i,x.f))).filter(i=>i>=0));
    s+=covTones.size*0.8;
    return s;
}

function _label(frets){
    const fretted=frets.filter(f=>f>0);
    if(!fretted.length) return'Open';
    const minF=Math.min(...fretted);
    const hasOpen=frets.includes(0);
    const barre=_detectBarre(frets);
    if(hasOpen&&minF<=4) return'Open position';
    if(barre) return`Barre · fret ${barre.fret}`;
    const rom=['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    return`Position ${rom[minF]||minF}`;
}

function _baseFret(frets){
    const fretted=frets.filter(f=>f>0);
    if(!fretted.length) return 1;
    const minF=Math.min(...fretted);
    return(minF<=4||frets.includes(0))?1:minF;
}

function _difficulty(frets){
    const fretted=frets.filter(f=>f>0);
    if(!fretted.length) return 1;
    let d=_countFingers(frets);
    if(_detectBarre(frets)) d+=1;
    if(fretted.length>=2&&Math.max(...fretted)-Math.min(...fretted)>=3) d+=1;
    return Math.max(1,Math.min(5,d));
}

function _stringNoteNames(frets){
    return frets.map((f,si)=>{
        if(f===-1) return'X';
        return NOTES_DISPLAY[_noteAt(si,f)];
    });
}

export function generateVoicings(root,quality){
    const formula=CHORD_FORMULAS[quality];
    if(!formula) return[];
    const ri=NOTES_SHARP.indexOf(root);
    if(ri===-1) return[];
    const tones=formula.intervals.map(i=>(ri+i)%12);
    const req=_required(formula.intervals);
    const seen=new Set();
    const raw=[];
    for(let ws=0;ws<=12;ws++){
        const sopts=_OPEN.map((openNote,si)=>{
            const opts=[-1];
            if(ws<=4){const n=openNote%12;if(tones.includes(n)) opts.push(0);}
            const start=Math.max(1,ws),end=ws+4;
            for(let f=start;f<=end;f++){const n=(openNote+f)%12;if(tones.includes(n)) opts.push(f);}
            return opts;
        });
        _dfs(0,[],new Set(),'pre',Infinity,-Infinity,sopts,tones,req,raw,seen);
    }
    const rootTone=tones[0];
    return raw
        .map(frets=>({
            frets,
            fingers:_assignFingers(frets),
            barre:_detectBarre(frets),
            baseFret:_baseFret(frets),
            label:_label(frets),
            difficulty:_difficulty(frets),
            noteNames:_stringNoteNames(frets),
            score:_score(frets,rootTone,tones)
        }))
        .sort((a,b)=>b.score-a.score)
        .slice(0,9);
}
