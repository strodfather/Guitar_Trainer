export const CHAPTERS=[
{
id:'neck',title:'The Guitar Neck',subtitle:'Know where you are',icon:'🎸',
sections:[
{heading:'The Six Strings',body:'Your guitar has six strings. From thickest (lowest pitch) to thinnest (highest pitch) they are: E – A – D – G – B – E. A handy way to remember them: Every Amateur Does Get Better Eventually. The low E is the fat string closest to your face when playing. The high E is the thin string closest to the floor.'},
{heading:'Frets and Semitones',body:'Every fret you move up the neck raises the pitch by one semitone — the smallest step in Western music. Move two frets and you have a whole tone. The distance from any note to the next note with the same name (for example E to the next E) is 12 semitones, which is called an octave. This means that at fret 12, every string plays the exact same note as the open string — just one octave higher. The fretboard repeats itself completely after fret 12.'},
{heading:'Finding Notes',body:'The fretboard displays every note on every string at a glance. Use the trainer with Intervals mode ON to see the interval of each note relative to your chosen key. The root (your home note) always glows in magenta. Once you know the open string names and can count semitones, you can find any note on any string.'}
],
quiz:{
easy:[
{q:'What are the six open strings from low to high?',options:['E A D G B E','E B G D A E','E A D F B E','E A D G B F'],answer:0},
{q:'How many semitones are in one octave?',options:['7','8','10','12'],answer:3},
{q:'At which fret do notes repeat one octave higher?',options:['Fret 7','Fret 9','Fret 12','Fret 15'],answer:2},
{q:'Moving one fret up the neck raises pitch by:',options:['One whole tone','One semitone','One octave','Two semitones'],answer:1}
],
hard:[
{q:'Name the 6 open strings from low E to high E (e.g. E A D G B E)',answer:'e a d g b e',hint:'Every Amateur Does Get Better Eventually'},
{q:'How many frets equal one octave?',answer:'12',hint:'Notes repeat at this fret position'}
]}
},
{
id:'minPent',title:'Minor Pentatonic',subtitle:'Five notes that work everywhere',icon:'⚡',
sections:[
{heading:'Why Five Notes?',body:'The minor pentatonic is the most important scale for rock, blues, pop, and metal soloing. It has only five notes, chosen because they all sound good together — there are no notes that seriously clash with each other or with most minor and blues-based chords. This forgiveness makes it the perfect starting point.'},
{heading:'The Five Intervals',body:'The minor pentatonic is built from these five intervals above the root: Root (R), Minor 3rd (b3), Perfect 4th (4), Perfect 5th (5), and Minor 7th (b7). The b3 gives it the dark, bluesy sound. The b7 creates forward motion and energy. None of these five notes are a semitone away from each other — which is exactly why they never clash.'},
{heading:'Box Positions',body:'These five notes appear across the entire neck, but guitarists organise them into five hand positions called boxes, each covering a comfortable stretch without shifting. Box 1 starts with the root on the low E string and is the most important to learn first. Each box overlaps with the next — master one, and you already know part of the next. In the Play tab, select Minor Pentatonic and use the Box buttons to isolate each position.'}
],
quiz:{
easy:[
{q:'How many notes does the minor pentatonic have?',options:['4','5','6','7'],answer:1},
{q:'Which intervals make up the minor pentatonic?',options:['R 2 b3 4 5','R b3 4 5 b7','R b3 b4 5 b7','R 2 4 5 b7'],answer:1},
{q:'Why does the minor pentatonic sound "safe" to solo with?',options:['It has all 12 notes','Its notes never clash with each other','It only uses open strings','It avoids the root note'],answer:1},
{q:'How many box positions does the minor pentatonic have across the neck?',options:['3','4','5','6'],answer:2}
],
hard:[
{q:'Type the 5 interval names of the minor pentatonic (e.g. R b3 4 5 b7)',answer:'r b3 4 5 b7',hint:'Root, minor 3rd, perfect 4th, perfect 5th, minor 7th'},
{q:'What is the interval that gives the minor pentatonic its dark, bluesy sound?',answer:'b3',hint:'It\'s the note that defines a minor chord'}
]}
},
{
id:'blues',title:'The Blues Scale',subtitle:'Adding the note with soul',icon:'🎵',
sections:[
{heading:'One Extra Note',body:'The blues scale is the minor pentatonic with one note added: the flat 5th (b5), also called the blue note or the tritone. This one note completely changes the emotional character of the scale. It sounds raw, tense, and expressive — like a bending, crying note that wants to resolve either up to the 5th or down to the 4th.'},
{heading:'Using the Blue Note',body:'The b5 is not a note you live on — you pass through it. The classic blues technique is to approach the 5 from below: slide or bend from the b5 up to the 5, or hammer from the 4 through the b5 to the 5. This movement is the essence of blues phrasing. You can hear it in almost every BB King, Stevie Ray Vaughan, or Eric Clapton solo.'},
{heading:'Major and Minor Blues',body:'There are two blues scales: the Blues Minor (minor pentatonic + b5) and the Blues Major (major pentatonic + b3). Blues Minor is the dark, raw one used in most rock and blues. Blues Major is warmer and brighter — great for shuffles and major-key blues. Both are available in the Scale selector. Notice how the b5 blue note lights up differently from the other scale tones.'}
],
quiz:{
easy:[
{q:'What note is added to the minor pentatonic to make the blues scale?',options:['b2','b5','b6','#4 (different name only)'],answer:1},
{q:'The b5 in the blues scale is nicknamed:',options:['The money note','The blue note','The jazz note','The pivot note'],answer:1},
{q:'The best way to use the blue note is to:',options:['Land on it and hold it','Pass through it towards the 4th or 5th','Avoid it completely','Use it only on the first string'],answer:1},
{q:'Blues Minor has how many notes?',options:['5','6','7','8'],answer:1}
],
hard:[
{q:'Type the 6 interval names of the blues minor scale',answer:'r b3 4 b5 5 b7',hint:'Minor pentatonic + one extra tense note between 4 and 5'},
{q:'What two notes does the b5 typically resolve to?',answer:'4 5',hint:'The notes directly below and above it'}
]}
},
{
id:'chordTones',title:'Chord Tones & Arpeggios',subtitle:'The notes that define the harmony',icon:'🎯',
sections:[
{heading:'What Is a Chord?',body:'Every chord is built by stacking notes in intervals of thirds. A basic triad — the most common chord — has three notes: the Root (R), the 3rd, and the 5th. The Root names the chord (A minor, C major). The 3rd determines whether the chord is major or minor. The 5th adds stability.'},
{heading:'Major vs Minor — One Note',body:'The entire emotional difference between a major chord (bright, happy) and a minor chord (dark, sad) comes down to a single note: the 3rd. A major 3rd sits 4 semitones above the root. A minor 3rd sits 3 semitones above the root. Everything else can stay the same. That one semitone difference changes the entire emotional character of the chord.'},
{heading:'What Is an Arpeggio?',body:'An arpeggio is a chord played one note at a time instead of strummed together. When you pick out R – 3 – 5 in sequence while a chord is playing, your melody outlines the harmony directly. This is the difference between random noodling and intentional phrasing. In the Play tab, enable Chord Context, select the chord you\'re playing over, and use the degree toggles to isolate just the chord tones. Those green notes are your arpeggios.'},
{heading:'7th Chords',body:'Add a 7th interval to a triad and you get a 7th chord — much richer and more complex. A dominant 7 chord (R, 3, 5, b7) is the cornerstone of blues and jazz. A major 7 (R, 3, 5, 7) sounds lush and jazzy. A minor 7 (R, b3, 5, b7) is smooth and cool. When you solo over a 7th chord, including the 7th interval in your line directly references the harmony.'}
],
quiz:{
easy:[
{q:'A basic triad (three-note chord) consists of which intervals?',options:['R 2 5','R 3 5','R b3 b5','R 4 5'],answer:1},
{q:'What makes a minor chord different from a major chord?',options:['The 5th is flattened','The root is different','The 3rd is flattened by one semitone','The 7th is removed'],answer:2},
{q:'An arpeggio is:',options:['A scale with 8 notes','Chord tones played one at a time','A chord with a flat 7th','A rhythm strumming pattern'],answer:1},
{q:'The interval that determines major vs minor is:',options:['The Root','The 2nd','The 3rd','The 5th'],answer:2}
],
hard:[
{q:'Name the three intervals of a major triad',answer:'r 3 5',hint:'Root, major 3rd, perfect 5th'},
{q:'Name the three intervals of a minor triad',answer:'r b3 5',hint:'Root, minor 3rd, perfect 5th'}
]}
},
{
id:'majPent',title:'Major Pentatonic',subtitle:'The brighter five',icon:'☀️',
sections:[
{heading:'Five Bright Notes',body:'The major pentatonic uses five different intervals from the minor pentatonic: Root (R), Major 2nd (2), Major 3rd (3), Perfect 5th (5), and Major 6th (6). The 3rd is major here — that one change flips the whole emotional character from dark and bluesy to bright and uplifting. Country, pop, classic rock, and soul all use this scale heavily.'},
{heading:'The Relative Relationship',body:'The major pentatonic and minor pentatonic are deeply related — they share exactly the same notes, just starting from a different root. For example, A minor pentatonic (A C D E G) and C major pentatonic (C D E G A) are the same five notes. This means any minor pentatonic box shape you know is also a major pentatonic shape — just consider a different note as your root. The same visual pattern, two completely different sounds.'},
{heading:'When to Use It',body:'Use the major pentatonic over major chords and major key progressions. When a track feels resolved and uplifting, major pentatonic fits naturally. The major 3rd in the scale mirrors the major 3rd in the chord — they lock together perfectly. Try it over a I–IV–V in a major key or over a country shuffle. In the Play tab, switch Chord Context ON, set the chord to Major, and watch the major pentatonic notes align with the green chord tones.'}
],
quiz:{
easy:[
{q:'Which intervals make up the major pentatonic?',options:['R 2 3 5 6','R 2 4 5 6','R 2 3 4 5','R 3 4 5 6'],answer:0},
{q:'Compared to the minor pentatonic, the major pentatonic sounds:',options:['Darker and heavier','More dissonant','Brighter and more uplifting','Exactly the same'],answer:2},
{q:'The major and minor pentatonic scales:',options:['Have completely different notes','Share the same notes starting from different roots','Have the same root but different notes','Are unrelated'],answer:1},
{q:'The key note that makes the major pentatonic sound bright is:',options:['The 2nd','The major 3rd','The 5th','The 6th'],answer:1}
],
hard:[
{q:'Type the 5 interval names of the major pentatonic',answer:'r 2 3 5 6',hint:'No 4th or 7th — those are the missing notes'},
{q:'A minor pentatonic and its relative major pentatonic share the same notes — true or false?',answer:'true',hint:'They use identical notes, just different starting points'}
]}
},
{
id:'natMinor',title:'Natural Minor',subtitle:'The full seven-note scale',icon:'🌑',
sections:[
{heading:'From Five to Seven',body:'The natural minor scale (also called Aeolian mode) is the full expansion of the minor pentatonic. It adds two more notes: the flat 6th (b6) and the major 2nd (2). These extra notes fill in the gaps in the pentatonic, giving you more melodic options and the ability to create longer, more elaborate lines.'},
{heading:'The Seven Intervals',body:'Natural minor: R – 2 – b3 – 4 – 5 – b6 – b7. The b3, b6, and b7 are all flattened compared to the major scale — three notes lowered by one semitone each. This collection of flattenings creates the characteristic dark, melancholic sound of minor music. The b6 in particular is very dark and dramatic.'},
{heading:'How It Relates to the Modes',body:'The natural minor scale is identical to the Aeolian mode — the 6th mode of the major scale. If you know C major (C D E F G A B), then A natural minor uses those exact same notes (A B C D E F G) but treats A as home. This relative relationship means once you know one, you know the other. The notes are identical — what changes is which note feels like the tonic, the resolution point.'}
],
quiz:{
easy:[
{q:'How many notes does the natural minor scale have?',options:['5','6','7','8'],answer:2},
{q:'Which mode is identical to the natural minor scale?',options:['Dorian','Phrygian','Mixolydian','Aeolian'],answer:3},
{q:'How many notes are flattened in natural minor compared to major?',options:['1','2','3','4'],answer:2},
{q:'Natural minor adds which two notes to the minor pentatonic?',options:['b2 and b6','2 and b6','2 and 6','b2 and b7'],answer:1}
],
hard:[
{q:'Type the 7 intervals of the natural minor scale',answer:'r 2 b3 4 5 b6 b7',hint:'Think minor pentatonic (R b3 4 5 b7) then add 2 and b6'},
{q:'What is another name for the natural minor scale?',answer:'aeolian',hint:'It is the 6th church mode'}
]}
},
{
id:'modes',title:'The Modes',subtitle:'One scale, seven starting points',icon:'🌀',
sections:[
{heading:'The Big Secret',body:'The seven church modes — Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian — are not seven separate scales. They are the same major scale, played starting from each of its seven degrees. C Ionian and C Dorian use different notes, but D Dorian and C Ionian use exactly the same notes — D Dorian just treats D as home. The emotional character changes completely depending on which note you treat as the tonal centre.'},
{heading:'The Seven Modes',body:'Starting from C major (C D E F G A B): Ionian starts on C (bright, major sound — this IS the major scale). Dorian starts on D (minor but with a raised 6th — cool and sophisticated). Phrygian starts on E (dark with a flat 2nd — Spanish, intense). Lydian starts on F (major with raised 4th — dreamy, floating). Mixolydian starts on G (major with flat 7th — bluesy, rock). Aeolian starts on A (the natural minor scale). Locrian starts on B (very unstable, rare in practice).'},
{heading:'How to Use Them',body:'In practice: match the mode to the chord. Over a minor chord in a jazz or funk context, try Dorian — the raised 6th gives it a sophisticated flavour compared to plain Aeolian. Over a dominant 7 chord in rock, Mixolydian is your friend — it is basically major with a flat 7 that matches the chord perfectly. Over a major chord for a dreamy, film-score quality, try Lydian. The trainer shows you each mode on the fretboard — enable Chord Context to see how each mode\'s notes relate to the chord underneath.'}
],
quiz:{
easy:[
{q:'Church modes are based on which parent scale?',options:['Minor pentatonic','Harmonic minor','Major (Ionian)','Melodic minor'],answer:2},
{q:'Dorian mode starts from which degree of the major scale?',options:['1st','2nd','3rd','4th'],answer:1},
{q:'Which mode has a flat 2nd giving it a Spanish or dark sound?',options:['Dorian','Lydian','Phrygian','Mixolydian'],answer:2},
{q:'Mixolydian is like major but with:',options:['A flat 3rd','A flat 5th','A flat 7th','A flat 6th'],answer:2},
{q:'Which mode sounds dreamy and floating due to a raised 4th?',options:['Dorian','Lydian','Aeolian','Locrian'],answer:1}
],
hard:[
{q:'Name the 7 modes of the major scale in order',answer:'ionian dorian phrygian lydian mixolydian aeolian locrian',hint:'I Don\'t Play Loud Music At Local Concerts'},
{q:'Which mode is identical to the natural minor scale?',answer:'aeolian',hint:'The 6th mode'}
]}
},
{
id:'overChanges',title:'Soloing Over Chords',subtitle:'Matching your scale to the harmony',icon:'🎶',
sections:[
{heading:'The Golden Rule',body:'The single most important concept in soloing: match your scale to the chord underneath you. The chord being played defines which notes are home — your scale gives you a vocabulary to move around those home notes. When your scale shares the same chord tones as the backing chord, everything sounds intentional and musical rather than accidental.'},
{heading:'Landing on Chord Tones',body:'Notes in your scale are not all equal. Chord tones (root, 3rd, 5th, 7th of the current chord) are safe landing spots — they reinforce the harmony. Tension notes (one semitone away from a chord tone) create energy and want to resolve. The secret of musical soloing: use tension notes to move between positions, and land on chord tones on strong beats. Enable Chord Context in the Play tab to see the fretboard show you exactly where the green (safe) and red (tense) notes are.'},
{heading:'Thinking in Chord Tones',body:'A powerful habit: before soloing, identify the chord tones of whatever chord is playing, then consciously aim to land on one of those notes on beat 1 of each bar. Everything between your landings can be runs, bends, or passing notes from your scale. That one intentional landing note transforms pattern-running into real musicality.'},
{heading:'Quick Reference',body:'Over major chords: Major Pentatonic or Lydian for bright sounds, Mixolydian for a bluesy edge. Over minor chords: Minor Pentatonic is always safe, Dorian for a jazzier flavour, Phrygian for intensity. Over dominant 7 chords: Mixolydian is the classic choice, Phrygian Dominant for an exotic sound, Blues Minor always works. When in doubt over anything: Minor Pentatonic. It fits over almost every chord type in rock and blues.'}
],
quiz:{
easy:[
{q:'When soloing over a minor chord, which scale is always the safest choice?',options:['Major pentatonic','Lydian','Minor pentatonic','Whole tone'],answer:2},
{q:'Chord tones are the notes that:',options:['Are hardest to reach on the neck','Define the sound of the chord underneath','Are always avoided in solos','Come from outside the key'],answer:1},
{q:'Over a dominant 7 chord, which mode fits best?',options:['Lydian','Phrygian','Mixolydian','Locrian'],answer:2},
{q:'The key to sounding musical when soloing is:',options:['Playing as fast as possible','Staying in one box position','Landing on chord tones on strong beats','Avoiding the root note'],answer:2}
],
hard:[
{q:'Name two scales that work well over a dominant 7 chord',answer:'mixolydian blues',hint:'One is a mode, one is a pentatonic variant'},
{q:'What are the three notes that always define any chord as a triad?',answer:'r 3 5',hint:'Root, third, fifth — in interval notation'}
]}
},
{
id:'harmonicFunctions',title:'Harmonic Functions',subtitle:'Why chords do what they do',icon:'⚗️',
sections:[
{heading:'Tonic, Dominant, Subdominant',body:'Every chord in a key has a harmonic function — a dramatic role in the story of tension and resolution. The three most important: the Tonic (I) is home. It sounds complete and resolved. The Dominant (V) creates maximum tension — it desperately wants to return to tonic. The Subdominant (IV) is restless but not urgent — it moves away from home without the strong pull of the dominant. Every chord progression in Western music is fundamentally a story told with these three forces.'},
{heading:'The Dominant — Maximum Tension',body:'The dominant chord is built on the 5th degree of the scale. In the key of A, the dominant is E. What makes it so tense is the tritone interval hidden inside a dominant 7 chord: in E7 (E G# B D), the G# and D are exactly 6 semitones apart — maximum dissonance, pulling strongly toward resolution. When you hear a dominant 7 chord, your ear is physically expecting it to resolve back to the tonic. This is the engine of harmony in jazz, blues, and classical music.'},
{heading:'The I-IV-V Progression',body:'The most important chord progression in all of Western music: tonic (I), subdominant (IV), dominant (V). In A: A (I), D (IV), E (V). The entire 12-bar blues is built from this. Rock and roll, country, folk — all I-IV-V at the core. Your minor pentatonic works over all three chords because it avoids the most clashing notes. To sound more sophisticated, use the Chord Context tool and notice how the same scale note changes role depending on which chord is playing underneath.'},
{heading:'Perfect Intervals — 4th and 5th',body:'The "perfect" intervals — unison, 4th, 5th, octave — are called perfect because they are the most acoustically stable. They have simple frequency ratios that sound harmonically pure. The Perfect 5th (7 semitones) is the power chord interval — always stable, never clashes, your fallback safe note. The Perfect 4th (5 semitones) is open and strong, but it can clash over a major I chord because it creates tension against the major 3rd. Use the 4th to pass through, not to land on, when soloing over a major tonic chord.'},
{heading:'The ii-V-I — The Jazz Engine',body:'The ii-V-I is the fundamental jazz progression. In C major: Dm7 (ii) → G7 (V) → Cmaj7 (I). The ii chord is a minor 7th that prepares the dominant. The V chord (dominant 7th) has maximum tension. The I chord resolves it completely. This three-chord motion appears constantly in jazz standards, bossa nova, and pop. Understanding it allows you to target specific chord tones as the harmony moves rather than simply staying in one scale. The Chord Context tool in the Play tab lets you see how note roles shift as you move from ii to V to I.'},
{heading:'Training with the App',body:'Open the Play tab. Choose a key — say A. Set scale to Minor Pentatonic. Enable Chord Context. Now set the chord to "A Minor" (I chord) — see which notes are green chord tones. Then change the chord to "D Minor" (IV) and watch the colours shift. Then change to "E Dom 7" (V) — notice the tension notes (red) that now appear. Those red notes are creating the pull back toward home. Practice landing on green notes for each chord and you will immediately sound more intentional.'}
],
quiz:{
easy:[
{q:'The tonic chord is:',options:['The V chord — maximum tension','The IV chord — subdominant','The I chord — home base','The ii chord — jazz preparation'],answer:2},
{q:'Which chord creates the strongest tension and wants to resolve to tonic?',options:['The I chord','The IV chord (subdominant)','The V chord (dominant)','The vi chord'],answer:2},
{q:'In the key of G, what is the dominant chord?',options:['C','F','D','A'],answer:2},
{q:'The I-IV-V progression is the foundation of:',options:['Only classical music','Only jazz','The blues, rock and roll, and country','Only metal'],answer:2},
{q:'A Perfect 5th is how many semitones?',options:['5','6','7','8'],answer:2}
],
hard:[
{q:'Name the I, IV and V chords in the key of A',answer:'a d e',hint:'Count up the A major scale: A is I, D is IV, E is V'},
{q:'What three chord types appear in a ii-V-I progression?',answer:'minor dominant major',hint:'Or: minor 7, dominant 7, major 7'},
{q:'How many semitones is a Perfect 4th?',answer:'5',hint:'E to A, A to D, D to G — these are all perfect 4ths'}
]}
}
];

export function normalizeAnswer(str){
    return str.toLowerCase().replace(/[,\-\/\|]/g,' ').replace(/\s+/g,' ').trim();
}

export function checkTextAnswer(userInput,expected){
    const u=normalizeAnswer(userInput);
    const e=normalizeAnswer(expected);
    if(u===e) return true;
    const uWords=new Set(u.split(' '));
    const eWords=new Set(e.split(' '));
    if(uWords.size===eWords.size){
        return [...eWords].every(w=>uWords.has(w));
    }
    return false;
}
