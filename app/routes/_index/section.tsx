/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Section({ items }: { items: { name: string, description: string, tech: string[], tasks: string[], demo_a: string, img_src: string }[], }) {
    const [hoverI, setHI] = useState<number>(-1); 
    return (
        <div className={`flex flex-col sm:grid grid-flow-col grid-cols-[50%_50%] grid-rows-1 w-full h-screen overflow-hidden transition-[grid-template-columns] ease-out duration-300 ${hoverI && 'cursor-pointer'}`} style={hoverI != -1 ? { gridTemplateColumns: items.map((i, k) => { return k == hoverI ? '90%' : '10%' }).join(' ') } : {}}>
            {items.map((item, k) => {
                const itemDemoAvailable = item.demo_a && item.demo_a.length > 1;
                const hover = hoverI != -1 && hoverI == k;
                return (
                    <div key={k} className='w-full h-screen relative transition-all duration-300'
                        // onMouseEnter={() => {
                        //     setHI(k);
                        // }}
                        // onMouseLeave={() => {
                        //     setHI(-1)
                        // }}
                        onClick={() => {
                            setHI(hoverI == k ? -1 : k);
                        }}
                    >
                        <div className={`transition-all z-10 absolute text-white flex items-center justify-center sm:grid ${hover ? 'grid-cols-[50%_50%]' : 'grid-cols-[100%]'} grid-rows-[100%]  h-full w-full grid-flow-col max-h-full items-center justify-items-center ${hoverI != -1 && hoverI != k ? 'invisible' : ''}`}>
                            <div className={`flex flex-col h-[8ch] w-5/6 drop-shadow-[0_0_2px_#000] transition-all ${hoverI != -1 && hoverI != k ? 'sm:hidden' : ''}`}>
                                <div className="text-2xl font-semibold text-center">{item.name}</div>
                                <div className={`${hoverI != -1 && hoverI != k ? 'hidden' : ''} text-center`}>{item.description}</div>
                            </div>
                            <div className={`h-full relative ${hover ? 'opacity-100' : 'opacity-0'} ${hover ? 'translate-x-0' : 'translate-x-10'} ${hover ? 'transition-all duration-500 delay-75' : ''}`}>
                                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col text-md text-center gap-4 bg-black/50 p-2 rounded-lg">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-2xl drop-shadow-[0_0_2px_#000] font-semibold">Technologies</div>
                                        <ul className="flex flex-col items-center gap-1">
                                            {item.tech.map((t, i) => {
                                                return <li key={i}>{t}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-2xl font-semibold">Tasks</div>
                                        <ul className="flex flex-col w-max gap-1">
                                            {item.tasks.map((t, i) => {
                                                return <li key={i}>{t}</li>
                                            })}
                                        </ul>
                                    </div>
                                    {
                                        itemDemoAvailable ? 
                                        <a href={item.demo_a} className="transition-colors border border-green-500 text-green-500 hover:text-green-50 hover:bg-green-700 px-4 py-2">Demo</a>
                                        :
                                        <a href={item.demo_a} className="transition-colors border border-gray-500 text-gray-500 hover:text-gray-400 hover:bg-gray-700 hover:bg-opacity-25 px-4 py-2">Demo</a>
                                    }
                                </div>
                            </div>
                        </div>
                        <img className={`absolute top-0 left-0 h-full w-full object-cover ${hoverI != -1 ? (hoverI == k ? 'brightness-50' : 'brightness-[0.1]') : 'brightness-[0.25]'} transition-all`} src={item.img_src} alt="" height={900} width={1280} />
                    </div>)
            })}
        </div>

    )
}