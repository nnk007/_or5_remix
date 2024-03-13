'use client'

import { useContext, useEffect, useRef, useState } from "react"
import { Context, SideBarContext } from "../Client";

export default function Sidebar(){
    const c = useContext(Context) as SideBarContext;
    const section = c.state.section;
    const menu = useRef<HTMLDivElement>(null);
    function setSection(arg0:number){
        c.reducer({type:"setSidebarSection",section:arg0})
    }
    return (
        <nav className="grid grid-flow-col grid-rows-1 grid-cols-[auto_auto] w-min h-full gap-2 py-4 p-2 text-white/50">
                <div className="relative">
                    <div className="absolute w-1.5 bg-purple-600 top-0 left-0 rounded-full transition-all" style={
                        {
                            height:menu.current?.children[0] ? +window.getComputedStyle(menu.current.children[0]).height :'2rem',
                            translate:menu.current ? `0 ${section*(+window.getComputedStyle(menu.current).height.slice(0,-2)/4+2)}px` : '0 0'
                            }
                            }></div>
                </div>
                <div ref={menu} className="grid grid-flow-row auto-rows-min h-min w-auto gap-2">
                <div className={`${section==0 ? 'text-purple-600' : ''} hover:text-purple-600 transition-colors flex items-center justify-center p-1`}>
                        <button className='material-symbols-outlined' onClick={()=>setSection(0)}>home</button>
                    </div>
                    <div className={`${section==1 ? 'text-purple-600' : ''} hover:text-purple-600 transition-colors flex items-center justify-center p-1`}>
                        <button className='material-symbols-outlined' onClick={()=>setSection(1)}>chat</button>
                    </div>
                    <div className={`${section==2 ? 'text-purple-600' : ''} hover:text-purple-600 transition-colors flex items-center justify-center p-1`}>
                    <button className='material-symbols-outlined' onClick={()=>setSection(2)}>call</button>
                    </div>
                    <div className={`${section==3 ? 'text-purple-600' : ''} hover:text-purple-600 transition-colors flex items-center justify-center p-1`}>
                        <button className='material-symbols-outlined' onClick={()=>setSection(3)}>note_add</button>
                    </div>
                </div>
            </nav>
    )
}