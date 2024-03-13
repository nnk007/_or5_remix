'use client';
import { useState } from "react";

export default function ChatInput({onSendMessage:sendMessage}:{onSendMessage:(s:string)=>any}) {
    const [inp, setInp] = useState('');
    function submit(){
        sendMessage(inp);
    }
    return (
        <div className="p-4 px-6 grid grid-rows-1 grid-cols-[auto_1fr_auto] gap-4">
            <div className="relative overflow-hidden rounded-full aspect-square h-14">
                <img alt="" src={'/pfp.jpeg'} fill className="object-contain" />
            </div>
            <div className="flex items-center justify-stretch">
                <div className="bg-white/20 shadow-inner overflow-hidden rounded-md w-full flex justify-start relative">
                    <input type="text" placeholder="Type a Message..." className="p-2 bg-transparent w-full focus:outline-none hover:bg-white/5" value={inp} onChange={(e) => { setInp(e.target.value) }} onKeyDown={(e)=>{e.key=='Enter'&&submit()}}/>
                    <div className={`absolute top-0 right-0 h-full bg-purple-600 text-white p-2 transition-transform ${inp.length == 0 ? 'translate-x-full' : 'translate-x-0'}`}>
                        <button className='material-symbols-outlined' onClick={()=>{
                            submit();
                        }}>send</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly items-center gap-2">
                <button className='material-symbols-outlined hover:bg-white/5 p-2 rounded-xl transition-colors'>attachment</button>
                <button className='material-symbols-outlined hover:bg-white/5 p-2 rounded-xl transition-colors'>sentiment_satisfied</button>
            </div>
        </div>
    )
}