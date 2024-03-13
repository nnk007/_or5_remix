'use client';

import { useState } from "react";

export default function Profile({ user, logout }: { user: { id: string, name: string, photo: string }, logout: () => any }) {
    const [popOver, setPO] = useState(false);
    return (
        <>
            <div className={`h-full relative flex-col flex transition-all`}>
                <div className="flex items-center gap-2 p-2">
                    <span className="select-none opacity-0">{user.name}</span>
                    <button type="button" className="z-30 w-[50px] aspect-square rounded-full relative hover:shadow-[0px_0px_10px_2px_var(--tw-shadow-color)] shadow-blue-500 ring ring-inset hover:outline outline-2 outline-blue-400" onClick={() => { setPO(!popOver) }}>
                        <span className="hidden">.</span>
                        <img src={user.photo} alt="" width={500} height={500}  className="w-full aspect-square overflow-hidden rounded-full"/>
                    </button>
                </div>
                <div className={`absolute flex flex-col bg-neutral-700 rounded-md overflow-hidden transition-all origin-top-right  ${popOver ? 'opacity-1 scale-100' : 'scale-0 opacity-0'}`}>
                        <div className="flex items-center gap-2 p-2">
                            <div className=" flex flex-col">
                                <span className="text-white/80">{user.name}</span>
                                <span className="text-white/50">{user.id}</span>
                                </div>
                            <button type="button" className="z-0 opacity-0 h-[50px] aspect-square rounded-full relative ring ring-inset overflow-hidden" onClick={() => { setPO(!popOver) }} tabIndex={-1}>
                                <span className="hidden">.</span>
                                <img src={user.photo} alt="" width={500} height={500} />
                            </button>
                        </div>
                        <button className="p-2 hover:text-white" tabIndex={popOver ? 0:-1}>Settings</button>
                        <button className="w-full bg-red-600 hover:text-white text-white/50 p-2" onClick={()=>{logout(); window.location.href = `/tools/ftp/login`}} tabIndex={popOver ? 0:-1}>Log out</button>
                    </div>
            </div>
        </>
    )
}