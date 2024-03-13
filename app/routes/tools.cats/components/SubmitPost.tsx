'use client'

import { DragEvent, useEffect, useRef, useState } from "react"

export default function SubmitPost({ children, className }: { children: React.ReactNode, className?: string }) {
    const [modalOpen, setMO] = useState(false);
    return (
        <>
            <div className={className} onClick={() => setMO(true)}>
                {children}
            </div>
            {modalOpen ? <SubmitModal onClose={() => setMO(false)} /> : undefined}
        </>
    )
}

function SubmitModal({ onClose: close }: { onClose: () => any }) {
    const modal = useRef<HTMLDialogElement>(null)
    const [file, setFile] = useState<File | undefined>(undefined);
    const [caption,setCaption] = useState('');
    const [author,setAuthor] = useState('');
    const [id,setID] = useState<number|undefined>(undefined)
    const image = useRef<HTMLImageElement>(null);
    useEffect(() => {
        if (!modal || modal.current?.open) return;
        modal.current?.showModal();
        modal.current?.addEventListener('close', () => {
            close();
        })
    }, [close, modal])
    function handleDrop(e: DragEvent<HTMLButtonElement>) {
        if (!e.dataTransfer) return;
        if(id&&id>0 ? true:false) return;
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...e.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile() as File;
                    setFile(file);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...e.dataTransfer.files].forEach((file, i) => {
                setFile(file);
            });
        }
    }
    async function handleSubmit():Promise<number>{
        const ab= await file!.arrayBuffer();
        const b = new Int8Array(ab);
        console.log(b.length)
        try {
        const r = await fetch('http://localhost:3000/api/cats/post',{method:'post',body:JSON.stringify({caption:caption,author:author,file:{name:file!.name,int8a:b}})})
        const {id} =await r.json() as {id:number};
        return id;
        } catch(err){
            throw new Error('Failed creating submission');
        }
    }
    return (
        <dialog ref={modal} className="bg-black backdrop:bg-black/40 text-white w-1/2 h-min" style={{ border: '1px solid white' }} onDragOver={e => e.preventDefault()} onDrop={(e) => e.preventDefault()}>
            <div className="flex flex-col divide-y">
                <div className="flex justify-between items-center">
                    <div className="text-xl p-2">{id&&id>0 ? `Created post n${id}` : 'Submit post'}</div>
                    <button onClick={() => {
                        close();
                    }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-3/5 aspect-square m-2 relative">
                    <button className={`${file ? 'opacity-0' : 'opacity-100'} absolute w-full h-full border-dashed text-neutral-400 hover:text-neutral-300 border-neutral-400 hover:border-neutral-300 border-2 flex items-center justify-center text-center`} onClick={() => { }} onDrop={(e) => handleDrop(e)}>Upload image</button>
                        {
                            file ?
                                <img src={file ? URL.createObjectURL(file) : ""} alt="" ref={image} className="w-full h-full object-contain"/>
                                :
                                undefined
                        }
                    </div>
                </div>
                <div className="p-2">
                    <label htmlFor="" className="text-white/70 p-2">Caption
                        <textarea name="" id="" cols={30} rows={3} placeholder="Caption..." maxLength={140} value={caption} onChange={(e)=>{setCaption(e.currentTarget.value)}} disabled={id&&id>0 ? true:false} className="bg-black w-full p-2 break-words resize-none overflow-y-auto"></textarea>
                    </label>
                </div>
                <div className="flex justify-between pt-4">
                    <div className="relative ">
                        <div className="absolute  py-2 px-4 z-10 w-full">{author.length==0 ? '' : `@${author}`}</div>
                        <input type="text" name="" id="" placeholder="Author handle" className=" py-2 px-4 bg-black absolute text-transparent" maxLength={16} value={author} onChange={(e)=>setAuthor(e.currentTarget.value)} disabled={id&&id>0 ? true:false}/>
                    </div>
                    {
                        id&&id>0 ? 
                        <button className={`border py-2 px-4 text-lg transition-colors enabled:hover:bg-green-500`} onClick={()=>close()}>Close</button>
                        :
                    <button className={`border py-2 px-4 text-lg transition-colors enabled:hover:bg-green-500 disabled:cursor-not-allowed disabled:hover:bg-red-950`} disabled={!(file&&caption.length>0)} onClick={()=>handleSubmit().then(id=>setID(id)).catch(()=>setID(-1))} >Submit</button>

                    }
                </div>
            </div>
        </dialog>
    )
}