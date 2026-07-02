import{NOTES_DISPLAY,PENT_BOXES,getRootIndex,getScaleNotes,getChordNotes,getNoteAtFret,getIntervalLabel,isPentatonic,classifyNote,getBlueNoteIndex}from'./theory.js';
import{getState}from'./state.js';

const SCALE_LENGTH=860;

function getFretWidth(fret){
    if(fret===0) return 18;
    const c=SCALE_LENGTH-(SCALE_LENGTH/Math.pow(2,fret/12));
    const n=SCALE_LENGTH-(SCALE_LENGTH/Math.pow(2,(fret+1)/12));
    return Math.max(n-c,34);
}

export function createFretboard(){
    const fb=document.getElementById("fretboard");
    fb.innerHTML="";
    const{tuning,fretCount,flipStrings,instrument}=getState();
    fb.classList.toggle('uke-mode',instrument==='ukulele');
    for(let fret=0;fret<=fretCount;fret++){
        const col=document.createElement("div");
        col.classList.add("fret-col");
        col.style.width=getFretWidth(fret)+"px";
        if(fret===0) col.classList.add("open");
        const marker=document.createElement("div");
        marker.classList.add("marker");
        if([3,5,7,9,12].includes(fret)) marker.textContent=fret;
        col.appendChild(marker);
        if(fret===12){
            const dots=document.createElement("div");
            dots.classList.add("double-dot");
            dots.innerHTML="<span></span><span></span>";
            col.appendChild(dots);
        }else if([3,5,7,9].includes(fret)){
            const dot=document.createElement("div");
            dot.classList.add("single-dot");
            col.appendChild(dot);
        }
        const n=tuning.length;
        const strIndices=flipStrings
            ?Array.from({length:n},(_,i)=>n-1-i)
            :[...Array(n).keys()];
        strIndices.forEach(si=>{
            const openNote=tuning[si];
            const wrap=document.createElement("div");
            wrap.classList.add("string-wrap",`string-${si}`);
            const note=document.createElement("div");
            note.classList.add("note");
            const lbl=document.createElement("div");
            lbl.classList.add("note-label");
            note.appendChild(lbl);
            note.dataset.noteIndex=getNoteAtFret(openNote,fret);
            note.dataset.string=si;
            note.dataset.fret=fret;
            wrap.appendChild(note);
            col.appendChild(wrap);
        });
        fb.appendChild(col);
    }
}

export function renderNotes(){
    const{key,scale,intervalMode,showBoxes,targetMode,chordContext,chordRoot,chordQuality,hiddenDegrees,selectedBoxes}=getState();
    const rootIndex=getRootIndex(key);
    const scaleNotes=getScaleNotes(key,scale);
    const chordNotes=getChordNotes(key,scale);
    const chordRootIndex=getRootIndex(chordRoot);
    const blueNote=getBlueNoteIndex(key,scale);
    document.querySelectorAll(".note").forEach(note=>{
        note.className="note";
        const lbl=note.querySelector(".note-label");
        const ni=parseInt(note.dataset.noteIndex);
        if(!scaleNotes.includes(ni)){
            note.classList.add("hidden");
            lbl.textContent="";
            return;
        }
        const degIdx=scaleNotes.indexOf(ni);
        if(hiddenDegrees.has(degIdx)){
            note.classList.add("hidden");
            lbl.textContent="";
            return;
        }
        note.classList.add("active");
        lbl.textContent=intervalMode?getIntervalLabel(key,scale,ni):NOTES_DISPLAY[ni];
        if(ni===rootIndex){
            note.classList.add("root");
        }else if(chordContext){
            note.classList.add(classifyNote(ni,chordRootIndex,chordQuality));
        }else if(targetMode&&chordNotes.includes(ni)){
            note.classList.add("target");
        }
        if(blueNote!==null&&ni===blueNote) note.classList.add("blue-note");
    });
    if(showBoxes&&isPentatonic(scale)){
        document.querySelectorAll(".note").forEach(note=>{
            if(note.classList.contains("hidden")) return;
            const fret=parseInt(note.dataset.fret);
            const str=parseInt(note.dataset.string);
            if(selectedBoxes.size>0){
                let inAny=false;
                selectedBoxes.forEach(bi=>{if(PENT_BOXES[bi][str].includes(fret%12)) inAny=true;});
                if(inAny) note.classList.add("box");
                else note.classList.add("dimmed");
            }else{
                PENT_BOXES.forEach(b=>{if(b[str].includes(fret%12)) note.classList.add("box");});
            }
        });
    }
}
