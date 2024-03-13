'use client';

import { useEffect, useRef, useState } from "react";

function max(v:number,m:number){
    return v>m ? m : v
}
function min(v:number,m:number){
    return v<m ? m : v
}
function clamp(v:number,ub:number,lb:number){
    return v>ub ? max(v,ub) : min(v,lb);
}
export default function Test() {
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [angle,setAngle] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const i = setInterval(() => {
            const unit = 2 * Math.PI / 1000;
            const _angle = new Date(Date.now()).getMilliseconds() * unit
            const _x = Math.sin(_angle);
            const _y = Math.tan((Math.abs(_angle)));
            setAngle(_angle);
            setX(clamp(_x,1,-1))
            setY(clamp(_y,1,-1));
        }, 1);
        return () => clearInterval(i);
    }, [])
    return (
        <div className="overflow-hidden h-screen w-screen absolute top-0 left-0 grid grid-cols-2 grid-rows-1 place-items-center bg-black">
            <div className="">
                <div className="w-40 rounded-full aspect-square bg-white">
                    <div className="relative w-full h-full left-1/2 top-1/2">
                        <div className="absolute rounded-full bg-red-600 p-2 -translate-x-1/2 -translate-y-1/2"  style={{top:`${Math.sin(angle)*50}%`,left:`${Math.cos(angle)*50}%`}}></div>
                    </div>
                </div>
            </div>
            <div className="h-1/2 bg-white w-1/2 flex items-center justify-center relative">
                <div className="top-1/2 left-1/2 relative h-full w-full">
                    <div className="absolute p-2 z-50 bg-red-600 rounded-full" style={{ top: `${y * 10}%`,left:`${x*10}%` }}></div>
                </div>
            </div>
        </div>
    )
}