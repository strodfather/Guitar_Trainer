const SX=[10,24,38,52,66,80];
const FY=[22,36,50,64,78,92];
const DOT_Y=FY.map((_,i)=>(FY[i]+(FY[i+1]||FY[i]+14))/2);
const MARKER_Y=13;
const W=90,H=108;

function _svgEl(tag,attrs,text){
    const el=document.createElementNS('http://www.w3.org/2000/svg',tag);
    for(const[k,v] of Object.entries(attrs)) el.setAttribute(k,v);
    if(text!==undefined) el.textContent=text;
    return el;
}

function _fretRow(fret,baseFret){
    if(fret<=0) return null;
    return fret-baseFret;
}

export function renderDiagram(voicing,container,large=false){
    const{frets,fingers,barre,baseFret}=voicing;
    const scale=large?1.6:1;
    const vw=W*scale, vh=H*scale;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    svg.setAttribute('width',vw);
    svg.setAttribute('height',vh);
    svg.style.display='block';

    const colors={
        line:'rgba(0,240,255,0.25)',
        nut:'rgba(0,240,255,0.7)',
        dot:'var(--magenta)',
        dotText:'#fff',
        open:'rgba(0,240,255,0.8)',
        mute:'rgba(255,51,85,0.8)',
        barre:'rgba(255,0,170,0.85)',
        fretLabel:'rgba(0,240,255,0.55)'
    };

    const showNut=baseFret===1&&!frets.some(f=>f>5);

    if(showNut){
        svg.appendChild(_svgEl('line',{x1:SX[0],y1:FY[0],x2:SX[5],y2:FY[0],stroke:colors.nut,'stroke-width':'3.5','stroke-linecap':'round'}));
    }else{
        svg.appendChild(_svgEl('text',{x:W-1,y:FY[0]+5,'text-anchor':'end','font-size':'8',fill:colors.fretLabel}),`${baseFret}fr`);
        const t=_svgEl('text',{x:W-1,y:FY[0]+5,'text-anchor':'end','font-size':'8',fill:colors.fretLabel});
        t.textContent=`${baseFret}fr`;
        svg.appendChild(t);
    }

    for(let i=1;i<FY.length;i++){
        svg.appendChild(_svgEl('line',{x1:SX[0],y1:FY[i],x2:SX[5],y2:FY[i],stroke:colors.line,'stroke-width':'1'}));
    }

    for(let si=0;si<6;si++){
        svg.appendChild(_svgEl('line',{x1:SX[si],y1:FY[0],x2:SX[si],y2:FY[FY.length-1],stroke:colors.line,'stroke-width':'0.8'}));
    }

    if(barre){
        const row=_fretRow(barre.fret,baseFret);
        if(row!==null&&row>=0&&row<4){
            const x1=SX[barre.from]-4,x2=SX[barre.to]+4,cy=DOT_Y[row];
            svg.appendChild(_svgEl('rect',{x:x1,y:cy-6,width:x2-x1,height:12,rx:'6',fill:colors.barre,'opacity':'0.9'}));
        }
    }

    frets.forEach((f,si)=>{
        const cx=SX[si];
        if(f===-1){
            svg.appendChild(_svgEl('text',{x:cx,y:MARKER_Y+2,'text-anchor':'middle','font-size':'9',fill:colors.mute,'font-weight':'bold'},'✕'));
        }else if(f===0){
            svg.appendChild(_svgEl('circle',{cx,cy:MARKER_Y-1,r:'4',fill:'none',stroke:colors.open,'stroke-width':'1.4'}));
        }else{
            const row=_fretRow(f,baseFret);
            if(row===null||row<0||row>=4) return;
            const cy=DOT_Y[row];
            if(!barre||f!==barre.fret){
                svg.appendChild(_svgEl('circle',{cx,cy,r:'6.5',fill:colors.dot}));
                if(fingers[si]){
                    const t=_svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7.5',fill:colors.dotText,'font-weight':'bold'});
                    t.textContent=fingers[si];
                    svg.appendChild(t);
                }
            }else if(barre&&fingers[si]){
                const t=_svgEl('text',{x:cx,y:cy+3,'text-anchor':'middle','font-size':'7.5',fill:'#fff','font-weight':'bold'});
                t.textContent=fingers[si];
                svg.appendChild(t);
            }
        }
    });

    if(barre){
        const row=_fretRow(barre.fret,baseFret);
        if(row!==null&&row>=0){
            const midX=(SX[barre.from]+SX[barre.to])/2;
            const t=_svgEl('text',{x:midX,y:DOT_Y[row]+3,'text-anchor':'middle','font-size':'7.5',fill:'#fff','font-weight':'bold'});
            t.textContent=fingers[frets.indexOf(barre.fret)]||1;
            svg.appendChild(t);
        }
    }

    container.innerHTML='';
    container.appendChild(svg);
    return svg;
}
