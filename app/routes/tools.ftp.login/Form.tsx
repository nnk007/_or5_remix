'use client';

import { useEffect, useRef, useState } from "react";

export default function Form({action}:{action:()=>any}) {
    return (
        <div className="w-11/12">
            <div className="grid flex-row auto-rows-fr">

            <Input placeholder="Username" onChange={d => d} />
            <Input placeholder="Password" onChange={d => d} />
                <div className="px-2">
                    <button className="font-normal text-sm">Forgot password?</button>
                </div>
            </div>
                
            <div className="flex justify-between font-normal">
                <button className="text-blue-500">Request account</button>
                <button className="bg-blue-500 p-2 rounded-md text-white" onClick={()=>action()}>Sign In</button>
            </div>
        </div>
    )
}

function Input({ placeholder, onChange: handleChage }: { placeholder: string, onChange: (value: string) => any }) {
    const i = useRef<HTMLInputElement>(null)
    const [inp, setInp] = useState('');
    const [iFocused, setIF] = useState(false);
    const [size, setSize] = useState({ h: '', w: '' });
    useEffect(() => {
        setSize({ h: window.getComputedStyle(i.current!).height, w: window.getComputedStyle(i.current!).width });
    }, [i])
    useEffect(() => { handleChage(inp) }, [inp, handleChage]);
    return (
        <label htmlFor="" className="relative p-2 flex">
            {size.h.length > 0 ? <span className={`absolute pointer-events-none text-center flex items-center justify-center transition-transform ${iFocused || inp.length > 0 ? ` scale-75 -translate-y-1/2 font-medium ${inp.length > 0 ? iFocused ? 'text-blue-500' : 'text-neutral-500 ' : 'text-blue-500'}` : 'text-neutral-500'} `} style={{ height: size.h, width: size.w }}><span className="bg-white px-1">{placeholder}</span></span> : <></>}
            <input type="text" title="username" className="border w-full p-2 focus:outline-2 outline-blue-500" onFocus={() => setIF(true)} onBlur={() => setIF(false)} ref={i} value={inp} onChange={e => setInp(e.currentTarget.value)} />
        </label>
    );
}