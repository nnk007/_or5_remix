'use client'
import { useEffect, useState,Suspense } from "react"
import { dbPost } from "../page"

export default function CatPost({ cat: _ }: { cat: dbPost }) {
    const [liked, setLiked] = useState(false);
    const [toast, setToast] = useState<string | undefined>(undefined)
    const [cat, setCat] = useState(_)
    const [created_at, setCA] = useState('');
    useEffect(() => {
        setCA(new Date(Math.floor(Date.now() - Math.random() * 1000000000)).toISOString());
    }, [])
    useEffect(() => {
        if (toast !== undefined) {
            setTimeout(() => {
                setToast(undefined)
            }, 1000)
        }
    }, [toast])
    function toggleLike() {
        setLiked(_ => _ = !liked)
        fetch('http://localhost:3000/api/cats/post/' + cat.id, { body: JSON.stringify({ field: 'likes', val: liked ? -1 : 1 }), method: 'put' })
            .then(async (res) => {
                if (res.status == 200) {
                    setCat({ ...cat, likes: (await res.json() as { likes: number }).likes });
                } else {
                    console.log(res.status);
                }
            })
            .catch(console.error);
    }
    return (
        <div className="w-full py-4 h-min rounded-lg flex flex-col bg-blue-400/20" >
            <div className="h-[500px] p-2">
                <div className="border border-neutral-900 h-full rounded-lg overflow-hidden">
                <a href={`/tools/cats/cat/${cat.img_name}`} className="h-full ">
                    <Cat cat={{ name: cat.img_name }}/>
                </a>
                </div>

            </div>
            <div className="p-2 grid grid-cols-[auto_1fr] text-start">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div>{cat.caption}</div>
                        <div className="h-1 w-1 aspect-square rounded-full bg-white/50"></div>
                        <div className="text-neutral-200/50">{cat.author}</div>
                    </div>
                    <div className="text-neutral-300">Created at {created_at}</div>
                </div>
                <div className="flex justify-end gap-1 items-center h-min select-none">
                    <div className="flex items-center align-middle">
                        <span className="material-symbols-outlined cursor-pointer" style={liked ? {
                            fontVariationSettings: `'FILL' 1,'wght' 400,'GRAD' 0, 'opsz' 48`
                        } : {}} onClick={() => toggleLike()}>
                            favorite
                        </span>
                        <span>{cat.likes ? cat.likes : 0}</span>
                    </div>
                    <span className="material-symbols-outlined cursor-pointer relative" onClick={() => {
                        navigator.clipboard.writeText('localhost:3000/tools/cats/cat/' + cat.img_name)
                            .then(() => setToast('Link copied to clipboard'))
                            .catch(() => setToast('Can\'t access clipboard'))
                    }}>
                        {toast !== undefined ? <div className="absolute top-0 left-0 -translate-x-1/2 text-base bg-white text-black z-20">{toast}</div> : undefined}
                        share
                    </span>
                    <span className="material-symbols-outlined">
                        flag
                    </span>
                </div>
            </div>
        </div>
    )
}
function Cat({ cat, src }: { cat: { name: string }, src?: string }) {
    const [error, setErr] = useState(false);
    if (error)
    return <div className="w-full h-full flex items-center justify-center">Image was deleted</div>
    return <Suspense fallback={<Loading />}>
        <img className="w-full h-full object-cover object-center" src={src ? src : `/tools/cats/store/${cat.name}`} alt="" width={1000} height={1000} onError={() => setErr(true)} />
    </Suspense>
}



function Loading() {
    return (
        <div className="w-full h-full bg-neutral-400 animate-pulse"></div>
    )
}