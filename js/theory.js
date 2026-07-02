export const NOTES_SHARP=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
export const NOTES_DISPLAY=["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];
export const FRET_COUNT=15;

export const SCALES={
    major:          {intervals:[0,2,4,5,7,9,11],    type:"mode", name:"Major (Ionian)"},
    dorian:         {intervals:[0,2,3,5,7,9,10],    type:"mode", name:"Dorian"},
    phrygian:       {intervals:[0,1,3,5,7,8,10],    type:"mode", name:"Phrygian"},
    lydian:         {intervals:[0,2,4,6,7,9,11],    type:"mode", name:"Lydian"},
    mixolydian:     {intervals:[0,2,4,5,7,9,10],    type:"mode", name:"Mixolydian"},
    minor:          {intervals:[0,2,3,5,7,8,10],    type:"mode", name:"Natural Minor (Aeolian)"},
    locrian:        {intervals:[0,1,3,5,6,8,10],    type:"mode", name:"Locrian"},
    majorPent:      {intervals:[0,2,4,7,9],         type:"pent", name:"Major Pentatonic"},
    minorPent:      {intervals:[0,3,5,7,10],        type:"pent", name:"Minor Pentatonic"},
    bluesMajor:     {intervals:[0,2,3,4,7,9],       type:"pent", name:"Blues Major"},
    bluesMinor:     {intervals:[0,3,5,6,7,10],      type:"pent", name:"Blues Minor"},
    harmonicMinor:  {intervals:[0,2,3,5,7,8,11],   type:"mode", name:"Harmonic Minor"},
    melodicMinor:   {intervals:[0,2,3,5,7,9,11],   type:"mode", name:"Melodic Minor"},
    dimHW:          {intervals:[0,1,3,4,6,7,9,10], type:"sym",  name:"Diminished (H-W)"},
    dimWH:          {intervals:[0,2,3,5,6,8,9,11], type:"sym",  name:"Diminished (W-H)"},
    wholeTone:      {intervals:[0,2,4,6,8,10],     type:"sym",  name:"Whole Tone"},
    phrygDom:       {intervals:[0,1,4,5,7,8,10],   type:"mode", name:"Phrygian Dominant"},
    dblHarmonicMaj: {intervals:[0,1,4,5,7,8,11],   type:"mode", name:"Double Harmonic"}
};

export const INTERVALS={
    major:          ["R","2","3","4","5","6","7"],
    dorian:         ["R","2","b3","4","5","6","b7"],
    phrygian:       ["R","b2","b3","4","5","b6","b7"],
    lydian:         ["R","2","3","#4","5","6","7"],
    mixolydian:     ["R","2","3","4","5","6","b7"],
    minor:          ["R","2","b3","4","5","b6","b7"],
    locrian:        ["R","b2","b3","4","b5","b6","b7"],
    majorPent:      ["R","2","3","5","6"],
    minorPent:      ["R","b3","4","5","b7"],
    bluesMajor:     ["R","2","b3","3","5","6"],
    bluesMinor:     ["R","b3","4","b5","5","b7"],
    harmonicMinor:  ["R","2","b3","4","5","b6","7"],
    melodicMinor:   ["R","2","b3","4","5","6","7"],
    dimHW:          ["R","b2","b3","3","b5","5","6","b7"],
    dimWH:          ["R","2","b3","4","b5","b6","6","7"],
    wholeTone:      ["R","2","3","#4","#5","b7"],
    phrygDom:       ["R","b2","3","4","5","b6","b7"],
    dblHarmonicMaj: ["R","b2","3","4","5","b6","7"]
};

export const CHORD_TONES={
    major:          [0,4,7],
    dorian:         [0,3,7],
    phrygian:       [0,3,7],
    lydian:         [0,4,7],
    mixolydian:     [0,4,7,10],
    minor:          [0,3,7],
    locrian:        [0,3,6],
    majorPent:      [0,4,7],
    minorPent:      [0,3,7],
    bluesMajor:     [0,4,7],
    bluesMinor:     [0,3,7],
    harmonicMinor:  [0,3,7],
    melodicMinor:   [0,3,7],
    dimHW:          [0,3,6],
    dimWH:          [0,3,6],
    wholeTone:      [0,4,8],
    phrygDom:       [0,4,7],
    dblHarmonicMaj: [0,4,7]
};

export const PENT_BOXES=[
    [[0,3],[0,3],[0,2],[0,2],[0,3],[0,3]],
    [[3,5],[2,5],[2,5],[2,4],[3,5],[3,5]],
    [[5,7],[5,7],[4,7],[4,7],[5,8],[5,7]],
    [[7,10],[7,10],[7,9],[7,9],[8,10],[7,10]],
    [[10,12],[10,12],[9,12],[9,12],[10,13],[10,12]]
];

export function getRootIndex(key){
    return NOTES_SHARP.indexOf(key);
}

export function getScaleNotes(key,scaleType){
    const root=getRootIndex(key);
    return SCALES[scaleType].intervals.map(i=>(root+i)%12);
}

export function getChordNotes(key,scaleType){
    const root=getRootIndex(key);
    return CHORD_TONES[scaleType].map(i=>(root+i)%12);
}

export function getNoteAtFret(openNote,fret){
    return(NOTES_SHARP.indexOf(openNote)+fret)%12;
}

export function getIntervalLabel(key,scaleType,noteIndex){
    const scaleNotes=getScaleNotes(key,scaleType);
    const idx=scaleNotes.indexOf(noteIndex);
    if(idx===-1) return "";
    return INTERVALS[scaleType][idx];
}

export function isPentatonic(scaleType){
    return SCALES[scaleType].type==="pent";
}

export function getBlueNoteIndex(key,scaleType){
    const labels=INTERVALS[scaleType];
    const b5pos=labels.indexOf('b5');
    if(b5pos===-1) return null;
    return getScaleNotes(key,scaleType)[b5pos];
}

export const CHORD_QUALITIES={
    maj:  {name:"Major",      intervals:[0,4,7]},
    min:  {name:"Minor",      intervals:[0,3,7]},
    dom7: {name:"Dom 7",      intervals:[0,4,7,10]},
    maj7: {name:"Major 7",    intervals:[0,4,7,11]},
    min7: {name:"Minor 7",    intervals:[0,3,7,10]},
    dim:  {name:"Diminished", intervals:[0,3,6]},
    dim7: {name:"Dim 7",      intervals:[0,3,6,9]},
    aug:  {name:"Augmented",  intervals:[0,4,8]}
};

export function classifyNote(noteIndex,chordRootIndex,quality){
    const chordNotes=CHORD_QUALITIES[quality].intervals.map(i=>(chordRootIndex+i)%12);
    if(chordNotes.includes(noteIndex)) return 'chord';
    const isTension=chordNotes.some(cn=>Math.min(Math.abs(noteIndex-cn),12-Math.abs(noteIndex-cn))===1);
    return isTension?'tension':'color';
}

export const SCALE_INFO={
    major:         {feel:"Bright · Resolved · Happy",        useOver:"Major chords · Major progressions",    tip:"The foundation of Western music. Every church mode is this scale starting from a different degree."},
    dorian:        {feel:"Cool · Funky · Sophisticated",     useOver:"Minor chords",                         tip:"Minor with a raised 6th — more sophisticated than plain minor. Think Santana, Pink Floyd."},
    phrygian:      {feel:"Dark · Exotic · Spanish",          useOver:"Minor chords · Dramatic passages",     tip:"The b2 creates the Spanish or Middle Eastern flavour. Use it for intense, moody solos."},
    lydian:        {feel:"Dreamy · Floating · Ethereal",     useOver:"Major chords · Cinematic passages",    tip:"The raised 4th gives it a floating, unresolved quality. Great for spacious melodic phrasing."},
    mixolydian:    {feel:"Blues-rock · Confident · Driving", useOver:"Dominant 7 chords · Blues-rock",       tip:"Major scale with a flat 7 — the foundation of classic rock and blues-rock soloing."},
    minor:         {feel:"Dark · Emotional · Melancholic",   useOver:"Minor chords · Minor progressions",    tip:"The most common minor scale. Deep and expressive — the workhorse of rock and metal."},
    locrian:       {feel:"Unstable · Dissonant · Unsettled", useOver:"Diminished chords (sparingly)",        tip:"The b5 makes it sound almost atonal. Very rarely used, but striking in the right context."},
    majorPent:     {feel:"Bright · Country · Optimistic",    useOver:"Major chords · Country · Pop",         tip:"5 notes, very forgiving. Bright and uplifting — country and pop guitar lives here."},
    minorPent:     {feel:"Raw · Bluesy · Essential",         useOver:"Minor chords · Blues · Rock",          tip:"The go-to scale for rock and blues. Almost impossible to play a wrong note. Start here."},
    bluesMajor:    {feel:"Warm blues · Soulful · Bright",    useOver:"Major chords · Blues in major keys",   tip:"Major pentatonic with an added b3 — bridges the happy and the bluesy in one scale."},
    bluesMinor:    {feel:"Raw · Crying · Pure blues",        useOver:"Minor chords · Blues · Rock",          tip:"Minor pentatonic plus the b5 blue note. That one extra note is where the emotion lives."},
    harmonicMinor: {feel:"Classical · Dramatic · Exotic",    useOver:"Minor chords · Classical passages",    tip:"The raised 7th creates an augmented 2nd that gives it a classical or Middle Eastern feel."},
    melodicMinor:  {feel:"Smooth · Jazz-inflected · Lyrical",useOver:"Minor chords · Jazz",                  tip:"Raised 6th and 7th smooth out harmonic minor. Very fluid — jazz and fusion love it."},
    dimHW:         {feel:"Tense · Symmetrical · Outside",    useOver:"Dominant 7b9 chords",                  tip:"8-note scale with a repeating half-whole pattern. Very tense — use over dominant chords."},
    dimWH:         {feel:"Dark · Symmetrical · Eerie",       useOver:"Diminished chords",                    tip:"8-note whole-half pattern. Use over diminished chords to match their symmetrical tension."},
    wholeTone:     {feel:"Floating · Dreamlike · No gravity",useOver:"Augmented chords · Dominant b5",       tip:"6 notes all equal distance apart — no sense of resolution anywhere. Disorientingly open."},
    phrygDom:      {feel:"Flamenco · Metal · Intense",       useOver:"Dominant chords · Flamenco · Metal",   tip:"Phrygian with a major 3rd. The defining sound of flamenco guitar and heavy metal riffs."},
    dblHarmonicMaj:{feel:"Byzantine · Extreme · Exotic",     useOver:"Major chords · Exotic passages",       tip:"Two augmented 2nd intervals give it an extreme Eastern character. Very distinctive."}
};

export const INTERVAL_INFO={
    "R":  {name:"Root",        semis:0,  desc:"Your home base. The note that names the key. Always sounds resolved and stable."},
    "b2": {name:"Flat 2nd",    semis:1,  desc:"Maximum tension — one semitone above root. Very dark and dramatic. Think the Jaws theme."},
    "2":  {name:"2nd",         semis:2,  desc:"Open and breezy. Adds space and lift. The note in suspended 2nd chords."},
    "b3": {name:"Minor 3rd",   semis:3,  desc:"The minor sound — sad, dark, emotional. This single note defines a minor chord."},
    "3":  {name:"Major 3rd",   semis:4,  desc:"The major sound — bright and happy. This single note defines a major chord."},
    "4":  {name:"4th",         semis:5,  desc:"Strong and neutral. Slightly tense over major chords — avoid landing here on strong beats."},
    "b5": {name:"Flat 5th",    semis:6,  desc:"The blue note. Tritone — maximum dissonance. Creates intense tension that wants to resolve."},
    "#4": {name:"Sharp 4th",   semis:6,  desc:"Enharmonic with b5. In Lydian context it sounds dreamy and floating rather than tense."},
    "5":  {name:"5th",         semis:7,  desc:"The power chord note. Neutral and always safe. Your reliable backup when in doubt."},
    "#5": {name:"Sharp 5th",   semis:8,  desc:"Augmented 5th — mysterious and slightly unstable. Defines augmented chords."},
    "b6": {name:"Flat 6th",    semis:8,  desc:"Dark and tense. Pulls strongly toward the 5th. Common in Phrygian and harmonic minor."},
    "6":  {name:"6th",         semis:9,  desc:"Bright and uplifting. A stable colour tone — common in major pentatonic, country, and pop."},
    "b7": {name:"Flat 7th",    semis:10, desc:"The bluesy dominant note. Creates forward motion and tension. Essential in rock and blues."},
    "7":  {name:"Major 7th",   semis:11, desc:"Dreamy and jazzy — one semitone below root. Creates a yearning, almost-home quality."}
};
