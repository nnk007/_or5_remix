'use client'

import SubmitPost from "./SubmitPost"
import { useState } from "react"
import GIcon from "~/shared/GIcon";
export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <header className={`p-2 flex flex-col items-center h-screen sticky overflow-hidden top-0 gap-2 transition-all ${collapsed ? '-translate-x-[85%] bg-blue-400/20': 'divide-y bg-gradient-to-tl from-[#253344]  to-[#345072]'}`}>
            <>
                <div className="w-11/12 flex items-center justify-center">
                    <span className="text-3xl p-4 w-full text-start">OR5 Cat Collective</span>
                    <button className={`flex gap-1  ${!collapsed ? 'rotate-180':''} items-center`} onClick={() => setCollapsed(!collapsed)}>
                        <span className={`material-symbols-outlined`}>
                            start
                        </span>
                    </button>
                </div>
                <div className="w-11/12 flex items-center justify-center hover:text-yellow-500 cursor-pointer">
                    <button className="text-xl p-4 w-full text-start">Home</button>
                    <GIcon name="home" />
                </div>
                <SubmitPost className="w-11/12 flex items-center justify-center hover:text-green-500 cursor-pointer">
                    <button className="text-xl p-4 w-full text-start">Submit</button>
                    <span className="material-symbols-outlined">
                        upload
                    </span>
                </SubmitPost>
                <div className="mt-auto border-none w-11/12 text-white/50">Part of the <a href={'/#tools'} className="hover:text-white">OR5 Tool Suite</a></div>
            </>

        </header>
    )
}