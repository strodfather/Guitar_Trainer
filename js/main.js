import{NOTES_SHARP,NOTES_DISPLAY,CHORD_QUALITIES,INTERVALS,SCALES,SCALE_INFO,INTERVAL_INFO,isPentatonic}from'./theory.js';
import{getState,setState,toggleDegree,clearHiddenDegrees,toggleBox,clearBoxes,INSTRUMENTS}from'./state.js';
import{createFretboard,renderNotes}from'./render.js';
import{startFreeplay,stopFreeplay,isFreeplayActive,isFretboardMode,handleFretboardClick,nextFreeplayQuestion,startChapterQuiz,submitChapterText,nextChapterQuestion,stopChapterQuiz,isChapterQuizActive}from'./quiz.js';
import{CHAPTERS}from'./course.js';
import{CHORD_FORMULAS,parseChordName,generateVoicings,getChordDisplayName,getChordNoteNames,setOpenNotes}from'./chords.js';
import{renderDiagram}from'./chorddiagram.js';

function populateKeys(){
    const sel=document.getElementById('key');
    NOTES_DISPLAY.forEach((label,i)=>{
        const opt=document.createElement('option');
        opt.value=NOTES_SHARP[i];
        opt.textContent=label;
        sel.appendChild(opt);
    });
    sel.value=getState().key;
}

function populateChordRoots(){
    const sel=document.getElementById('chordRoot');
    NOTES_DISPLAY.forEach((label,i)=>{
        const opt=document.createElement('option');
        opt.value=NOTES_SHARP[i];
        opt.textContent=label;
        sel.appendChild(opt);
    });
    sel.value=getState().chordRoot;
}

function buildDegreeToggles(){
    const bar=document.getElementById('degree-bar');
    bar.innerHTML='';
    const{scale}=getState();
    INTERVALS[scale].forEach((label,idx)=>{
        const btn=document.createElement('button');
        btn.classList.add('deg-btn');
        btn.dataset.idx=idx;
        btn.textContent=label;
        btn.addEventListener('click',()=>{toggleDegree(idx);btn.classList.toggle('off');renderNotes();});
        bar.appendChild(btn);
    });
}

function updateChordUI(){
    const{chordContext}=getState();
    document.getElementById('chord-selectors').style.display=chordContext?'flex':'none';
}

function updateBoxControls(){
    const{scale,showBoxes,selectedBoxes}=getState();
    const ctrl=document.getElementById('box-controls');
    if(!isPentatonic(scale)||!showBoxes){ctrl.style.display='none';if(selectedBoxes.size>0){clearBoxes();renderNotes();}return;}
    ctrl.style.display='flex';
    document.querySelectorAll('.box-btn').forEach(btn=>{
        const bv=btn.dataset.box;
        if(bv==='all') btn.classList.toggle('active',selectedBoxes.size===0);
        else btn.classList.toggle('active',selectedBoxes.has(parseInt(bv)));
    });
}

function updateScaleContext(){
    const{scale}=getState();
    const info=SCALE_INFO[scale];
    document.getElementById('sc-name').textContent=SCALES[scale].name;
    document.getElementById('sc-feel').textContent=info.feel;
    document.getElementById('sc-over').textContent='Use over: '+info.useOver;
    document.getElementById('sc-tip').textContent=info.tip;
    const pills=document.getElementById('sc-intervals');
    pills.innerHTML='';
    INTERVALS[scale].forEach(l=>{
        const p=document.createElement('span');
        p.classList.add('int-pill');
        p.textContent=l;
        pills.appendChild(p);
    });
}

function showTab(name){
    ['play','course','learn','chords'].forEach(t=>{
        document.getElementById('view-'+t).style.display=t===name?'block':'none';
        document.getElementById('tab-'+t).classList.toggle('active',t===name);
    });
}

function buildCourseGrid(){
    const grid=document.getElementById('course-grid');
    grid.innerHTML='';
    CHAPTERS.forEach(ch=>{
        const card=document.createElement('div');
        card.classList.add('chapter-card');
        card.innerHTML=`<div class="cc-icon">${ch.icon}</div><div class="cc-title">${ch.title}</div><div class="cc-sub">${ch.subtitle}</div>`;
        card.addEventListener('click',()=>openChapter(ch.id));
        grid.appendChild(card);
    });
}

function openChapter(id){
    const ch=CHAPTERS.find(c=>c.id===id);
    if(!ch) return;
    document.getElementById('course-grid').style.display='none';
    const view=document.getElementById('chapter-view');
    view.style.display='block';
    const content=document.getElementById('chapter-content');
    content.style.display='block';
    content.innerHTML=
        `<div class="ch-header"><span class="ch-icon">${ch.icon}</span><div><div class="ch-title">${ch.title}</div><div class="ch-sub">${ch.subtitle}</div></div></div>`+
        ch.sections.map(s=>`<div class="ch-section"><div class="ch-heading">${s.heading}</div><p class="ch-body">${s.body}</p></div>`).join('');
    const quizBar=document.querySelector('.ch-quiz-bar');
    if(quizBar) quizBar.style.display='flex';
    const container=document.getElementById('cq-container');
    if(container) container.style.display='none';
    document.getElementById('ch-quiz-easy').onclick=()=>startChapterQuiz(id,false,null);
    document.getElementById('ch-quiz-hard').onclick=()=>startChapterQuiz(id,true,null);
}

function closeChapter(){
    document.getElementById('chapter-view').style.display='none';
    document.getElementById('course-grid').style.display='grid';
}

function buildReferenceTab(){
    const cards=document.getElementById('mode-cards');
    if(cards&&!cards.children.length){
        Object.entries(SCALE_INFO).forEach(([key,info])=>{
            const c=document.createElement('div');
            c.classList.add('mode-card');
            c.innerHTML=`<div class="mc-name">${SCALES[key].name}</div><div class="mc-feel">${info.feel}</div><div class="mc-over">Use over: ${info.useOver}</div><div class="mc-tip">${info.tip}</div><div class="mc-intervals">${INTERVALS[key].map(l=>`<span class="int-pill">${l}</span>`).join('')}</div>`;
            cards.appendChild(c);
        });
    }
    const ref=document.getElementById('interval-ref');
    if(ref&&!ref.children.length){
        Object.entries(INTERVAL_INFO).forEach(([label,info])=>{
            const row=document.createElement('div');
            row.classList.add('int-row');
            row.innerHTML=`<span class="int-label">${label}</span><span class="int-name">${info.name}</span><span class="int-desc">${info.desc}</span>`;
            ref.appendChild(row);
        });
    }
}

function bindEvents(){
    document.querySelectorAll('.inst-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
            _syncInstButtons(btn.dataset.inst);
            switchInstrument(btn.dataset.inst);
        });
    });
    document.getElementById('key').addEventListener('change',e=>{setState({key:e.target.value,chordRoot:e.target.value});document.getElementById('chordRoot').value=e.target.value;renderNotes();updateScaleContext();});
    document.getElementById('scale').addEventListener('change',e=>{setState({scale:e.target.value,selectedBox:null});clearHiddenDegrees();buildDegreeToggles();updateBoxControls();updateScaleContext();renderNotes();});
    document.getElementById('intervalMode').addEventListener('change',e=>{setState({intervalMode:e.target.checked});renderNotes();});
    document.getElementById('showBoxes').addEventListener('change',e=>{setState({showBoxes:e.target.checked});updateBoxControls();renderNotes();});
    document.getElementById('targetMode').addEventListener('change',e=>{setState({targetMode:e.target.checked});renderNotes();});
    document.getElementById('chordContext').addEventListener('change',e=>{setState({chordContext:e.target.checked});updateChordUI();renderNotes();});
    document.getElementById('chordRoot').addEventListener('change',e=>{setState({chordRoot:e.target.value});renderNotes();});
    document.getElementById('chordQuality').addEventListener('change',e=>{setState({chordQuality:e.target.value});renderNotes();});
    document.getElementById('flipStrings').addEventListener('change',e=>{setState({flipStrings:e.target.checked});createFretboard();renderNotes();});
    document.querySelectorAll('.box-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
            if(btn.dataset.box==='all'){clearBoxes();}
            else{toggleBox(parseInt(btn.dataset.box));}
            updateBoxControls();
            renderNotes();
        });
    });
    document.getElementById('fp-easy-btn').addEventListener('click',()=>{startFreeplay(false);});
    document.getElementById('fp-hard-btn').addEventListener('click',()=>{startFreeplay(true);});
    document.getElementById('fp-stop-btn').addEventListener('click',stopFreeplay);
    document.getElementById('fp-next-btn').addEventListener('click',nextFreeplayQuestion);
    document.getElementById('tab-play').addEventListener('click',()=>showTab('play'));
    document.getElementById('tab-course').addEventListener('click',()=>showTab('course'));
    document.getElementById('tab-learn').addEventListener('click',()=>showTab('learn'));
    document.getElementById('tab-chords').addEventListener('click',()=>showTab('chords'));
    document.getElementById('back-to-course').addEventListener('click',closeChapter);
    document.addEventListener('click',e=>{
        if(!isFreeplayActive()) return;
        const note=e.target.closest('.note');
        if(!note) return;
        if(isFretboardMode()) handleFretboardClick(note);
    });
    document.addEventListener('click',e=>{
        if(e.target.id==='cq-retry'){
            const btn=document.getElementById('ch-quiz-easy');
            if(btn) btn.click();
        }
    });
}

function _syncInstButtons(inst){
    document.querySelectorAll('.inst-btn').forEach(b=>b.classList.toggle('active',b.dataset.inst===inst));
    const h=document.getElementById('instrument');
    if(h) h.value=inst;
}

function switchInstrument(inst){
    const cfg=INSTRUMENTS[inst];
    setState({instrument:inst,tuning:cfg.tuning,fretCount:cfg.fretCount,flipStrings:cfg.flip,selectedBoxes:new Set()});
    setOpenNotes(cfg.openNotes);
    clearHiddenDegrees();
    buildDegreeToggles();
    updateBoxControls();
    updateScaleContext();
    createFretboard();
    renderNotes();
    _syncInstButtons(inst);
    const title=document.querySelector('.header h1 span');
    if(title) title.textContent=inst==='ukulele'?'Uke':'Solo';
    document.getElementById('ch-voicings-grid').innerHTML='';
    document.getElementById('ch-info').style.display='none';
    document.getElementById('ch-detail-panel').style.display='none';
}

function _populateChordSelects(){
    const sel=document.getElementById('ch-root');
    if(sel&&!sel.children.length){
        NOTES_DISPLAY.forEach((lbl,i)=>{
            const o=document.createElement('option');
            o.value=NOTES_SHARP[i];o.textContent=lbl;sel.appendChild(o);
        });
        sel.value='A';
    }
}

function _runChordSearch(root,quality){
    const formula=CHORD_FORMULAS[quality];
    if(!formula) return;
    const chordName=root+(quality||'');
    const noteNames=getChordNoteNames(root,quality);
    const intervals=formula.intervals.map(i=>{
        const labels=['R','b2','2','b3','3','4','b5','5','#5','6','b7','7'];
        return labels[i]||i;
    });
    document.getElementById('chi-chord').textContent=chordName;
    document.getElementById('chi-full').textContent=formula.name;
    document.getElementById('chi-notes').textContent=noteNames.join(' · ');
    document.getElementById('chi-intervals').textContent=intervals.join(' · ');
    document.getElementById('ch-info').style.display='block';
    document.getElementById('ch-detail-panel').style.display='none';
    const grid=document.getElementById('ch-voicings-grid');
    grid.innerHTML='<div class="ch-no-results">Generating voicings…</div>';
    setTimeout(()=>{
        const{instrument}=getState();
        const cfg=INSTRUMENTS[instrument];
        const voicings=generateVoicings(root,quality);
        grid.innerHTML='';
        if(!voicings.length){
            grid.innerHTML='<div class="ch-no-results">No playable voicings found for this chord.</div>';
            return;
        }
        voicings.forEach((v,idx)=>{
            const card=document.createElement('div');
            card.classList.add('voicing-card');
            const diagDiv=document.createElement('div');
            renderDiagram(v,diagDiv,false);
            const lbl=document.createElement('div');
            lbl.classList.add('vc-label');
            lbl.textContent=v.label;
            const diff=document.createElement('div');
            diff.classList.add('vc-diff');
            for(let i=1;i<=5;i++){
                const s=document.createElement('span');
                s.classList.add('vc-star');
                if(i<=v.difficulty) s.classList.add('lit');
                s.textContent='★';
                diff.appendChild(s);
            }
            card.appendChild(diagDiv);
            card.appendChild(lbl);
            card.appendChild(diff);
            card.addEventListener('click',()=>{
                document.querySelectorAll('.voicing-card').forEach(c=>c.classList.remove('selected'));
                card.classList.add('selected');
                _showVoicingDetail(v);
            });
            grid.appendChild(card);
            if(idx===0){card.classList.add('selected');_showVoicingDetail(v);}
        });
    },10);
}

function _showVoicingDetail(v){
    const panel=document.getElementById('ch-detail-panel');
    const diagDiv=document.getElementById('ch-detail-diagram');
    const infoDiv=document.getElementById('ch-detail-info');
    renderDiagram(v,diagDiv,true);
    const{tuning}=getState();
    const stringNames=tuning;
    const stringsHTML=v.frets.map((f,si)=>{
        const muted=f===-1;
        const open=f===0;
        const fretTxt=muted?'X':open?'0':String(f);
        const noteTxt=v.noteNames[si];
        return`<div class="cdi-string">`+
            `<span class="cdi-string-name">${stringNames[si]}</span>`+
            `<span class="cdi-fret${muted?' cdi-mute':''}">${fretTxt}</span>`+
            `<span class="cdi-note${muted?' cdi-mute':''}">${muted?'—':noteTxt}</span></div>`;
    }).join('');
    const fingerLabels=['Index','Middle','Ring','Pinky'];
    const fingerMap=new Map();
    v.frets.forEach((f,si)=>{if(f>0&&v.fingers[si]>0){const fn=v.fingers[si];if(!fingerMap.has(fn)) fingerMap.set(fn,[]);fingerMap.get(fn).push({si,f});}});
    const fingerHTML=[...fingerMap.entries()].sort((a,b)=>a[0]-b[0]).map(([fn,strings])=>{
        const str=strings.map(x=>stringNames[x.si]).join(' & ');
        const fret=strings[0].f;
        const barre=strings.length>1?` (barre)`:'';
        return`${fingerLabels[fn-1]}: fret ${fret} on ${str}${barre}`;
    }).join('<br>');
    const diffStars='★'.repeat(v.difficulty)+'☆'.repeat(5-v.difficulty);
    infoDiv.innerHTML=
        `<div class="cdi-label">${v.label}</div>`+
        `<div class="cdi-strings">${stringsHTML}</div>`+
        `<div class="cdi-fingering">${fingerHTML||'Open chord — no fretting required.'}</div>`+
        `<div class="cdi-diff-row"><span class="cdi-diff-label">Difficulty</span><span style="color:var(--orange);font-size:14px">${diffStars}</span></div>`;
    panel.style.display='flex';
}

function initChordTab(){
    _populateChordSelects();
    document.getElementById('ch-find-btn').addEventListener('click',()=>{
        const root=document.getElementById('ch-root').value;
        const quality=document.getElementById('ch-quality').value;
        _runChordSearch(root,quality);
    });
    document.getElementById('ch-text-btn').addEventListener('click',()=>{
        const parsed=parseChordName(document.getElementById('ch-text-input').value);
        if(!parsed){document.getElementById('ch-voicings-grid').innerHTML='<div class="ch-no-results">Couldn\'t parse that chord name. Try e.g. Am7, Cmaj9, F#7b9.</div>';document.getElementById('ch-info').style.display='none';return;}
        document.getElementById('ch-root').value=parsed.root;
        document.getElementById('ch-quality').value=parsed.quality;
        _runChordSearch(parsed.root,parsed.quality);
    });
    document.getElementById('ch-text-input').addEventListener('keydown',e=>{if(e.key==='Enter') document.getElementById('ch-text-btn').click();});
}

function init(){
    setOpenNotes(INSTRUMENTS.guitar.openNotes);
    populateKeys();
    populateChordRoots();
    createFretboard();
    buildDegreeToggles();
    updateChordUI();
    updateBoxControls();
    updateScaleContext();
    buildCourseGrid();
    buildReferenceTab();
    initChordTab();
    showTab('play');
    renderNotes();
    bindEvents();
}

init();
