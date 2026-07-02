import{NOTES_SHARP,NOTES_DISPLAY,SCALES,INTERVALS,getScaleNotes,getRootIndex,getIntervalLabel}from'./theory.js';
import{getState}from'./state.js';
import{renderNotes}from'./render.js';
import{CHAPTERS,checkTextAnswer}from'./course.js';

let _mode=null;
let _currentQ=null;
let _answered=false;
let _score={correct:0,wrong:0};
let _qIndex=0;
let _questions=[];
let _chapterCallback=null;
let _fretboardTarget=null;

function _shuffle(arr){return arr.slice().sort(()=>Math.random()-0.5);}

function _wrongNotes(correct,count){
    const pool=NOTES_SHARP.filter(n=>n!==correct);
    return _shuffle(pool).slice(0,count);
}

function _wrongIntervals(correct,scaleType,count){
    const all=INTERVALS[scaleType];
    const pool=all.filter(i=>i!==correct);
    const extras=['b2','#4','#5','b6'].filter(i=>!all.includes(i)&&i!==correct);
    return _shuffle([...pool,...extras]).slice(0,count);
}

function _genFreeplayEasy(){
    const{key,scale}=getState();
    const scaleNotes=getScaleNotes(key,scale);
    const rootIdx=getRootIndex(key);
    const type=Math.floor(Math.random()*3);
    if(type===0){
        const ni=scaleNotes[Math.floor(Math.random()*scaleNotes.length)];
        const correct=NOTES_DISPLAY[ni];
        const wrong=_wrongNotes(NOTES_SHARP[ni],3).map(n=>NOTES_DISPLAY[NOTES_SHARP.indexOf(n)]);
        const options=_shuffle([correct,...wrong]);
        return{type:'mc',q:`What note is highlighted on the fretboard?`,options,answer:options.indexOf(correct),fretTarget:ni,highlight:true};
    }
    if(type===1){
        const ni=scaleNotes[Math.floor(Math.random()*scaleNotes.length)];
        const correct=getIntervalLabel(key,scale,ni);
        const wrong=_wrongIntervals(correct,scale,3);
        const options=_shuffle([correct,...wrong]);
        return{type:'mc',q:`What interval is "${NOTES_DISPLAY[ni]}" in the ${SCALES[scale].name} of ${key}?`,options,answer:options.indexOf(correct)};
    }
    const inNote=scaleNotes[Math.floor(Math.random()*scaleNotes.length)];
    const inName=NOTES_DISPLAY[inNote];
    const outNotes=NOTES_SHARP.filter(n=>!scaleNotes.includes(NOTES_SHARP.indexOf(n)));
    const wrong=_shuffle(outNotes).slice(0,3).map(n=>NOTES_DISPLAY[NOTES_SHARP.indexOf(n)]);
    const options=_shuffle([inName,...wrong]);
    return{type:'mc',q:`Which of these notes is IN the ${key} ${SCALES[scale].name}?`,options,answer:options.indexOf(inName)};
}

function _genFreeplayHard(){
    const{key,scale,tuning,fretCount}=getState();
    const scaleNotes=getScaleNotes(key,scale);
    const rootIdx=getRootIndex(key);
    const stringIdx=Math.floor(Math.random()*6);
    const openNote=tuning[stringIdx];
    const openNoteIdx=NOTES_SHARP.indexOf(openNote);
    const validFrets=[];
    for(let f=0;f<=fretCount;f++){
        if((openNoteIdx+f)%12===rootIdx) validFrets.push(f);
    }
    if(!validFrets.length) return _genFreeplayEasy();
    const targetFret=validFrets[Math.floor(Math.random()*validFrets.length)];
    const stringNames=['low E','A','D','G','B','high E'];
    return{type:'fretboard',q:`Click the ROOT note (${key}) on the ${stringNames[stringIdx]} string`,targetString:stringIdx,targetFret,targetNote:rootIdx};
}

function _renderFreeplayQ(){
    const panel=document.getElementById('freeplay-panel');
    const qEl=document.getElementById('fp-question');
    const optsEl=document.getElementById('fp-options');
    const inputWrap=document.getElementById('fp-input-wrap');
    const fbHint=document.getElementById('fp-fretboard-hint');
    const feedback=document.getElementById('fp-feedback');
    const scoreEl=document.getElementById('fp-score');
    panel.style.display='block';
    feedback.textContent='';
    feedback.className='fp-feedback';
    qEl.textContent=_currentQ.q;
    optsEl.innerHTML='';
    if(inputWrap) inputWrap.style.display='none';
    if(fbHint) fbHint.style.display='none';
    if(_currentQ.type==='mc'){
        _currentQ.options.forEach((opt,i)=>{
            const btn=document.createElement('button');
            btn.className='opt-btn';
            btn.textContent=opt;
            btn.addEventListener('click',()=>_submitMC(i,btn));
            optsEl.appendChild(btn);
        });
    }else if(_currentQ.type==='fretboard'){
        if(fbHint) fbHint.style.display='block';
        _fretboardTarget={string:_currentQ.targetString,fret:_currentQ.targetFret,note:_currentQ.targetNote};
    }
    if(scoreEl) scoreEl.textContent=`✓ ${_score.correct}   ✗ ${_score.wrong}`;
}

function _submitMC(chosen,btn){
    if(_answered) return;
    _answered=true;
    const correct=chosen===_currentQ.answer;
    if(correct) _score.correct++; else _score.wrong++;
    const feedback=document.getElementById('fp-feedback');
    const allBtns=document.querySelectorAll('.opt-btn');
    allBtns.forEach((b,i)=>{
        b.disabled=true;
        if(i===_currentQ.answer) b.classList.add('opt-correct');
        else if(i===chosen&&!correct) b.classList.add('opt-wrong');
    });
    feedback.textContent=correct?'✓ Correct!':'✗ Wrong — correct answer highlighted';
    feedback.className='fp-feedback '+(correct?'fb-correct':'fb-wrong');
    document.getElementById('fp-score').textContent=`✓ ${_score.correct}   ✗ ${_score.wrong}`;
}

export function handleFretboardClick(noteEl){
    if(_mode!=='freeplay-hard'||!_fretboardTarget||_answered) return true;
    const str=parseInt(noteEl.dataset.string);
    const fret=parseInt(noteEl.dataset.fret);
    const correct=str===_fretboardTarget.string&&fret===_fretboardTarget.fret;
    _answered=true;
    _fretboardTarget=null;
    const feedback=document.getElementById('fp-feedback');
    if(correct){
        _score.correct++;
        noteEl.classList.add('quiz-correct');
        feedback.textContent='✓ Correct!';
        feedback.className='fp-feedback fb-correct';
    }else{
        _score.wrong++;
        noteEl.classList.add('quiz-wrong');
        feedback.textContent='✗ Wrong — try the next one!';
        feedback.className='fp-feedback fb-wrong';
    }
    document.getElementById('fp-score').textContent=`✓ ${_score.correct}   ✗ ${_score.wrong}`;
    return false;
}

export function nextFreeplayQuestion(){
    _answered=false;
    _fretboardTarget=null;
    document.querySelectorAll('.quiz-correct,.quiz-wrong').forEach(n=>n.classList.remove('quiz-correct','quiz-wrong'));
    renderNotes();
    _currentQ=_mode==='freeplay-hard'?_genFreeplayHard():_genFreeplayEasy();
    _renderFreeplayQ();
}

export function startFreeplay(hard=false){
    _mode=hard?'freeplay-hard':'freeplay-easy';
    _score={correct:0,wrong:0};
    _answered=false;
    _currentQ=hard?_genFreeplayHard():_genFreeplayEasy();
    _renderFreeplayQ();
}

export function stopFreeplay(){
    _mode=null;
    _fretboardTarget=null;
    _answered=false;
    document.querySelectorAll('.quiz-correct,.quiz-wrong').forEach(n=>n.classList.remove('quiz-correct','quiz-wrong'));
    renderNotes();
    const panel=document.getElementById('freeplay-panel');
    if(panel) panel.style.display='none';
}

export function isFreeplayActive(){return _mode==='freeplay-easy'||_mode==='freeplay-hard';}
export function isFretboardMode(){return _mode==='freeplay-hard'&&!!_fretboardTarget&&!_answered;}

export function startChapterQuiz(chapterId,hard,onComplete){
    const ch=CHAPTERS.find(c=>c.id===chapterId);
    if(!ch) return;
    _questions=hard?ch.quiz.hard:ch.quiz.easy;
    if(!_questions||!_questions.length) return;
    _qIndex=0;
    _score={correct:0,wrong:0};
    _chapterCallback=onComplete||null;
    _mode=hard?'chapter-hard':'chapter-easy';
    const content=document.getElementById('chapter-content');
    const quizBar=document.querySelector('.ch-quiz-bar');
    if(content) content.style.display='none';
    if(quizBar) quizBar.style.display='none';
    const container=document.getElementById('cq-container');
    if(container){
        container.style.display='block';
        container.innerHTML=
            `<div class="cq-top"><span id="cq-progress" class="cq-progress"></span><button class="fp-quiz-btn stop" id="cq-stop-btn">Stop Quiz</button></div>`+
            `<div id="cq-question" class="cq-question"></div>`+
            `<div id="cq-options" class="cq-options"></div>`+
            `<div id="cq-input-wrap" class="cq-input-wrap" style="display:none"><input id="cq-input" class="cq-input" type="text" placeholder="Type your answer…"><button class="opt-btn" id="cq-submit-btn">Check</button></div>`+
            `<div id="cq-hint" class="cq-hint"></div>`+
            `<div id="cq-feedback" class="fp-feedback"></div>`+
            `<button id="cq-next" class="quiz-nav-btn" style="display:none">Next →</button>`;
        document.getElementById('cq-stop-btn').addEventListener('click',()=>stopChapterQuiz(chapterId));
        document.getElementById('cq-submit-btn').addEventListener('click',submitChapterText);
        document.getElementById('cq-input').addEventListener('keydown',e=>{if(e.key==='Enter') submitChapterText();});
        document.getElementById('cq-next').addEventListener('click',()=>{nextChapterQuestion();document.getElementById('cq-next').style.display='none';});
    }
    _renderChapterQ();
}

function _renderChapterQ(){
    const q=_questions[_qIndex];
    if(!q){_finishChapterQuiz();return;}
    _answered=false;
    _currentQ=q;
    const container=document.getElementById('cq-container');
    const qEl=document.getElementById('cq-question');
    const optsEl=document.getElementById('cq-options');
    const inputWrap=document.getElementById('cq-input-wrap');
    const feedback=document.getElementById('cq-feedback');
    const progress=document.getElementById('cq-progress');
    if(container) container.style.display='block';
    if(feedback) feedback.textContent='';
    if(progress) progress.textContent=`Question ${_qIndex+1} of ${_questions.length}`;
    qEl.textContent=q.q;
    optsEl.innerHTML='';
    if(inputWrap) inputWrap.style.display='none';
    if(q.type==='mc'){
        q.options.forEach((opt,i)=>{
            const btn=document.createElement('button');
            btn.className='opt-btn';
            btn.textContent=opt;
            btn.addEventListener('click',()=>_submitChapterMC(i,btn));
            optsEl.appendChild(btn);
        });
    }else if(q.type==='text'){
        if(inputWrap) inputWrap.style.display='flex';
        const input=document.getElementById('cq-input');
        if(input){input.value='';setTimeout(()=>input.focus(),50);}
        document.getElementById('cq-hint').textContent=q.hint?`Hint: ${q.hint}`:'';
    }
}

function _submitChapterMC(chosen,btn){
    if(_answered) return;
    _answered=true;
    const correct=chosen===_currentQ.answer;
    if(correct) _score.correct++; else _score.wrong++;
    const feedback=document.getElementById('cq-feedback');
    document.querySelectorAll('#cq-options .opt-btn').forEach((b,i)=>{
        b.disabled=true;
        if(i===_currentQ.answer) b.classList.add('opt-correct');
        else if(i===chosen&&!correct) b.classList.add('opt-wrong');
    });
    feedback.textContent=correct?'✓ Correct!':'✗ Wrong — correct answer highlighted above';
    feedback.className='fp-feedback '+(correct?'fb-correct':'fb-wrong');
    document.getElementById('cq-next').style.display='inline-block';
}

export function submitChapterText(){
    if(_answered||_currentQ.type!=='text') return;
    const input=document.getElementById('cq-input');
    if(!input||!input.value.trim()) return;
    _answered=true;
    const correct=checkTextAnswer(input.value,_currentQ.answer);
    if(correct) _score.correct++; else _score.wrong++;
    const feedback=document.getElementById('cq-feedback');
    feedback.textContent=correct?'✓ Correct!':'✗ Wrong — expected: '+_currentQ.answer;
    feedback.className='fp-feedback '+(correct?'fb-correct':'fb-wrong');
    document.getElementById('cq-next').style.display='inline-block';
}

export function nextChapterQuestion(){
    _qIndex++;
    if(_qIndex>=_questions.length){_finishChapterQuiz();return;}
    _renderChapterQ();
    document.getElementById('cq-next').style.display='none';
}

function _restoreChapterContent(){
    const content=document.getElementById('chapter-content');
    const quizBar=document.querySelector('.ch-quiz-bar');
    if(content) content.style.display='block';
    if(quizBar) quizBar.style.display='flex';
    const container=document.getElementById('cq-container');
    if(container) container.style.display='none';
}

export function stopChapterQuiz(){
    _mode=null;
    _restoreChapterContent();
}

function _finishChapterQuiz(){
    _mode=null;
    const total=_questions.length;
    const pct=Math.round((_score.correct/total)*100);
    const container=document.getElementById('cq-container');
    const content=document.getElementById('chapter-content');
    const quizBar=document.querySelector('.ch-quiz-bar');
    if(container){
        container.innerHTML=
            `<div class="cq-result">`+
            `<div class="cqr-score">${_score.correct}/${total}</div>`+
            `<div class="cqr-pct">${pct}%</div>`+
            `<div class="cqr-label">${pct>=80?'Great work!':pct>=50?'Good effort — review and try again.':'Keep studying and try again.'}</div>`+
            `<div class="cq-result-btns">`+
            `<button class="cq-retry-btn" id="cq-retry">Try Again</button>`+
            `<button class="fp-quiz-btn stop" id="cq-back-btn">Back to Chapter</button>`+
            `</div></div>`;
        document.getElementById('cq-retry')?.addEventListener('click',()=>{
            if(_chapterCallback) _chapterCallback(_score,total);
        });
        document.getElementById('cq-back-btn')?.addEventListener('click',_restoreChapterContent);
    }
    if(_chapterCallback) _chapterCallback(_score,total);
}

export function isChapterQuizActive(){return _mode==='chapter-easy'||_mode==='chapter-hard';}
