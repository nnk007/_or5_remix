'use client';

import { useEffect, useState } from "react";

export default function Text({items}:{items:{word:string,color:string}[]}){
    const [wordIndex,setWI] = useState(0);
    const [animated,setAnimated] = useState(0);
    useEffect(()=>{
        const t = setTimeout(()=>{
            const nextIndex = wordIndex+1<items.length ? wordIndex+1 : 0;
            setWI(nextIndex);
        },5000);
        const t2 = setTimeout(()=>{setAnimated(1)},100);
        const t3 = setTimeout(()=>{setAnimated(2)},4900);
        return ()=>{[t,t2,t3].forEach(_t=>clearTimeout(_t));setAnimated(_=>_=0)}
    },[wordIndex,items])
    return (
        <>
        <div className={`text-transparent bg-clip-text inline ${animated!=0?'transition-all':'transition-none'} ${animated==0 ? '-translate-y-full' : animated==1 ? 'translate-y-0' : 'translate-y-full'} bg-gradient-to-b ${items[wordIndex].color}`}>{items[wordIndex].word}</div>
        </>

    )
}