import { useEffect, useState } from "react";

export default function Tooltip({ handleClick }: { handleClick: () => void }) {
    const [visible,setVisible] = useState(false);
    useEffect(()=>{
        setVisible(true);
    },[])
    return (
        <div className={`fixed z-40 top-0 left-0 w-full flex justify-center ${visible ? 'translate-y-2' : '-translate-y-full'} transition-all`}>
            <div className="flex flex-row gap-2 px-4 py-2 w-10/12 bg-white rounded-lg justify-between items-center shadow-lg">
                <div>Site is ongoing migration from Next to Remix, API routes not functional</div>
                <button className={`px-4 py-2 shadow-[0_4px_10px_-4px_black] bg-blue-500 hover:bg-blue-600 hover:outline outline-1 outline-blue-600 text-white rounded-lg`} onClick={() => {setVisible(false);setTimeout(()=>handleClick(),1000)}}>OK</button>
            </div>
        </div>
    )
}