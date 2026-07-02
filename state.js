export const INSTRUMENTS={
    guitar:{tuning:["E","A","D","G","B","E"],fretCount:15,openNotes:[4,9,2,7,11,4],flip:true},
    ukulele:{tuning:["G","C","E","A"],fretCount:12,openNotes:[7,0,4,9],flip:false}
};

const _s={
    key:"A",
    scale:"minorPent",
    intervalMode:false,
    showBoxes:true,
    targetMode:true,
    tuning:["E","A","D","G","B","E"],
    fretCount:15,
    chordContext:false,
    chordRoot:"A",
    chordQuality:"min",
    hiddenDegrees:new Set(),
    selectedBoxes:new Set(),
    flipStrings:true,
    instrument:'guitar'
};

export function getState(){return{..._s,hiddenDegrees:new Set(_s.hiddenDegrees),selectedBoxes:new Set(_s.selectedBoxes)};}
export function setState(patch){Object.assign(_s,patch);}
export function toggleDegree(idx){
    if(_s.hiddenDegrees.has(idx)) _s.hiddenDegrees.delete(idx);
    else _s.hiddenDegrees.add(idx);
}
export function clearHiddenDegrees(){_s.hiddenDegrees.clear();}
export function toggleBox(idx){
    if(_s.selectedBoxes.has(idx)) _s.selectedBoxes.delete(idx);
    else _s.selectedBoxes.add(idx);
}
export function clearBoxes(){_s.selectedBoxes.clear();}
