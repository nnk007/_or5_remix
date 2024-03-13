'use client';

import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
const message = { author: { name: 'Message author', pfp: '/pfp.jpeg' }, content: 'Test message', timestamp: 0 }
export default function ChatWindow() {
    const [messages, setMessages] = useState([message, message, message, message]);
    return (
        <div className="w-full h-full bg-purple-300/10 grid grid-flow-row grid-rows-[auto_1fr_auto] grid-cols-1 divide-y divide-white/50">
            <div className="flex justify-between py-4 px-6">
                <div className="grid grid-rows-1 grid-cols-[auto_1fr] place-items-center gap-2">
                    <div className="relative w-16 aspect-square overflow-hidden rounded-full">
                        <img alt="" src={'/pfp.jpeg'} className="object-cover" />
                    </div>
                    <div className="grid grid-rows-2 grid-cols-1 place-content-center ">
                        <div className="text-xl font-semibold">Chat name</div>
                        <div className="text-sm font-normal text-white/50">Chat description</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className='material-symbols-outlined !text-3xl p-2 hover:bg-white/5 rounded-md'>search</button>
                    <button className='material-symbols-outlined !text-3xl p-2 hover:bg-white/5 rounded-md'>videocam</button>
                    <button className='material-symbols-outlined !text-3xl p-2 hover:bg-white/5 rounded-md'>call</button>
                    <button className='material-symbols-outlined !text-3xl p-2 hover:bg-white/5 rounded-md'>more_vert</button>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row auto-rows-min justify-start items-end gap-2 px-6 overflow-x-hidden overflow-y-auto">
                <div className="flex justify-center p-2 text-lg text-purple-400 font-bold">Today</div>
                <>
                    {
                        messages.map((message, i) => {
                            return (<ChatMessage key={i} message={message} self={message.timestamp !== 0} />)
                        })
                    }
                </>
                {/* <ChatMessage message={message} self/> */}
            </div>
            <ChatInput onSendMessage={(msg) => {
                setMessages([...messages, { ...message, content: msg, timestamp: Date.now() }])
            }} />
        </div>
    )
}

function ChatMessage({ message, self }: { message: { author: { pfp: string, name: string }, timestamp: number, content: string }, self?: boolean }) {
    const [animationEnd, setAE] = useState(false);
    const element = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!animationEnd) {
            const tm = setTimeout(() => {
                setAE(true);
                element.current?.scrollIntoView({ behavior: "smooth", inline: 'end'})
            }, 100);
            return () => { clearTimeout(tm) }
        }
    }, [animationEnd])
    return (
        <div className="w-full h-full" ref={element}>
            <div className={`grid grid-flow-col grid-cols-[auto_minmax(max-content,50%)] ${self && 'grid-cols-[minmax(max-content,50%)_auto] justify-end justify-items-end'} grid-rows-1 p-2 gap-4 justify-start transition-all ease ${animationEnd ? 'translate-x-0' : self ? 'translate-x-full' : '-translate-x-full'}`}>
                <div className={`relative overflow-hidden rounded-full w-12 aspect-square ${self && 'col-start-2'}`}>
                    <img alt="" src={message.author.pfp} className="object-cover" />
                </div>
                <div className={`grid grid-rows-[auto_min-content] grid-flow-row grid-cols-1 text-white bg-neutral-600/50 rounded-xl ${self ? 'bg-purple-400 text-black justify-end round rounded-tr-sm' : 'rounded-tl-sm'} pr-6 p-3 w-max`}>
                    <div className="text-base whitespace-nowrap font-bold">{message.author.name}</div>
                    <div className="text-sm grid grid-cols-[1fr_auto] grid-flow-col font-light gap-2 items-center">
                        <div>{message.content}</div>
                        <div className="text-xs text-purple-400">{`0${(new Date(message.timestamp)).getHours()}`.slice(-2)}:{`0${(new Date(message.timestamp)).getMinutes()}`.slice(-2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}