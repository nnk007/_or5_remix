/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useEffect, useState } from "react";
import { isMobileContext } from "./route";

export default function Projects({ items }: { items: { name: string, description: string, tech: string[], tasks: string[], demo_a: string, img_src: string }[], }) {
    const [hoverI, setHI] = useState<number | null>(null);
    const [projectActive, setProjectActive] = useState<number | null>(null);
    return (
        <div className={`w-full sm:h-screen flex flex-col sm:flex-row overflow-hidden ease-out duration-300`}>
            <Project item={items[0]} active={projectActive == 0} collapsed={projectActive != 0 && projectActive != null} onClick={() => { projectActive == 0 ? setProjectActive(null) : setProjectActive(0) }} />
            <Project item={items[1]} active={projectActive == 1} collapsed={projectActive != 1 && projectActive != null} onClick={() => { projectActive == 1 ? setProjectActive(null) : setProjectActive(1) }} />
        </div>

    )
} ``

function Project({ item, collapsed, active, onClick: handleClick }: { item: { name: string, description: string, tech: string[], tasks: string[], demo_a: string, img_src: string }, collapsed: boolean, active: boolean, onClick: () => void }) {
    const itemDemoAvailable = item.demo_a && item.demo_a.length > 1;
    const isMobile = useContext(isMobileContext);
    useEffect(() => {
        console.log(isMobile);
    }, [isMobile])
    return !isMobile ? (
        <div className={`w-1/2 ${active && 'w-[90%]'} ${collapsed && 'w-[10%]'} h-screen relative transition-all duration-300 cursor-pointer group`}
            onClick={() => {
                handleClick();
            }}
        >
            <div className={`transition-all z-10 absolute text-white items-center justify-center grid ${active ? 'grid-cols-[50%_50%]' : 'grid-cols-[100%]'} grid-rows-[100%]  h-full w-full grid-flow-col max-h-full items-center justify-items-center ${collapsed ? 'invisible' : ''}`}>
                <div className={`flex flex-col h-[8ch] w-5/6 drop-shadow-[0_0_2px_#000] transition-all ${collapsed ? 'hidden' : ''}`}>
                    <div className="text-2xl font-semibold text-center">{item.name}</div>
                    <div className={`${collapsed ? 'hidden' : ''} text-center`}>{item.description}</div>
                </div>
                <div className={`h-full relative ${active ? 'opacity-100' : 'opacity-0'} ${active ? 'translate-x-0' : 'translate-x-10'} ${active ? 'transition-all duration-500 delay-75' : ''}`}>
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
            <img className={`absolute top-0 left-0 h-full w-full object-cover ${!collapsed ? (active ? 'brightness-50' : 'brightness-[0.25] group-hover:brightness-[0.4] group-hover:scale-105') : 'brightness-[0.1] hover:brightness-[0.25]'} transition-all`} src={item.img_src} alt="" height={900} width={1280} />
        </div>)
        :
        (<div className={`w-[200%] h-screen relative transition-all duration-300 cursor-pointer`}
            onClick={() => {
                handleClick();
            }}
        >
            <div className={`transition-all z-10 absolute text-white items-center justify-center grid grid-cols-[50%_50%] grid-rows-[100%] h-full w-full grid-flow-col max-h-full justify-items-center ${active ? '-translate-x-1/2' : ''}`}>
                <div className={`flex flex-col h-[8ch] w-1/2 drop-shadow-[0_0_2px_#000] transition-all`}>
                    <div className="text-2xl font-semibold text-center">{item.name}</div>
                    <div className={`text-center`}>{item.description}</div>
                </div>
                <div className={`w-min h-full relative flex items-center justify-center`}>
                    <div className="w-full flex flex-col text-md text-center gap-4 bg-black/50 p-2 rounded-lg">
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
            <img className={`absolute top-0 left-0 h-full w-1/2 object-cover ${(active ? 'brightness-50' : 'brightness-[0.25]')} transition-all`} src={item.img_src} alt="" height={900} width={1280} />
        </div>)
}   