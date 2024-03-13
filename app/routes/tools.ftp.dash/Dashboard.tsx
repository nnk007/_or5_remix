import Scrollable from "./Scrollable";
import { DLButton, DeleteButton, LikeButton, UploadButton } from "./client";
import Profile from "./Profile";
// import {G_AUTH,SESH} from "~/cookies.server";
import { useEffect, useState } from "react";
// const or5fs = process.env.OR5FS as string|undefined
// if(!or5fs) throw new Error();

interface FileEntry {
    id: number,
    name: string,
    date_created: string,
    size: number
}

async function getFiles():Promise<[]>{
    const req = await fetch("/api/ftp/user1/files");
    return req.json();
}

export default function Dashboard() {
    const [files,setFiles] = useState<[]>([]);
    useEffect(()=>{
        getFiles().then(files=>setFiles(files)).catch(err=>{console.error("Failed loading files",err)});
    },[])
    return (
        <div className="grid grid-cols-[minmax(20%,auto)_1fr] grid-rows-1 max-h-screen w-full h-full text-neutral-400 text-lg font-semibold gap-2 p-2">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col p-2  rounded-lg bg-neutral-900 gap-2">
                    <button className="flex items-center gap-2 hover:text-white"><span className="material-symbols-outlined">home</span><span>Home</span></button>
                    <button className="flex items-center gap-2 hover:text-white"><span className="material-symbols-outlined">search</span><span>Search</span></button>
                    <UploadButton className="flex items-center gap-2 hover:text-white" action={async ()=>true/* handleUpload */}>
                    <span className="material-symbols-outlined">upload</span><span>Upload</span>
                    </UploadButton>
                </div>
                <div className="h-full flex flex-col p-2  rounded-lg bg-neutral-900 gap-2">
                    <div className="flex items-center gap-2 select-none">
                        <span className="material-symbols-outlined">home_storage</span><span>Your collections</span>
                    </div>
                    {
                        files.length > 0 ?
                            <div className="flex items-center gap-2 hover:text-white cursor-pointer" >
                                <span className="material-symbols-outlined">folder</span>
                                <span>All files</span>
                                <span className="inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium border border-white/50">
                                    {files.length}
                                </span>
                            </div>
                            :
                            <div className="flex items-center justify-center h-full">
                                <div className="flex items-center gap-2 animate-[pulse_5s_ease_infinite]"><span>{`It's empty here`}</span>
                                    <span className="material-symbols-outlined">scan_delete</span>
                                </div>
                            </div>
                    }

                </div>
            </div>
            <div className="flex flex-col rounded-lg bg-neutral-900 gap-2 p-2 h-full">
                <Scrollable>
                    <div className="sticky top-0 grid grid-cols-[1fr_auto] items-center justify-between">
                        <div className="px-2">
                            <input type="text" name="" id="" placeholder="Search files.." className="p-2 transition-all w-[20%] outline-white outline-1 hover:outline focus:outline rounded-md focus:w-full bg-inherit"/>
                        </div>
                        <Profile user={{name:'test user',id:'#0001',photo:'/pfp.jpeg'}} logout={logout}/>
                    </div>
                    <div className="grid grid-cols-[minmax(50px,min-content)_repeat(3,1fr)_min-content] auto-rows-fr gap-2 place-items-start">
                        <>
                            <div className="w-full text-center">#</div>
                            <div>Name</div>
                            <div>Size</div>
                            <div>Date created</div>
                            <div></div>
                        </>
                        {files.map((f, i, a) =>
                            <File file={{ ...f, id: i }} key={f.name} />
                        )}
                    </div>
                </Scrollable>
            </div>
        </div>
    )
}

async function logout(){

    // cookies().delete('G_AUTH');
    // cookies().delete('$SESH');
    return;
}
function File({ file }: { file: FileEntry }) {
    function fileSizeSI(a:number,b?:any,c?:any,d?:any,e?:any){
        return (b=Math,c=b.log,d=1000,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
        +' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
       }
    return (
        // <div className="grid grid-cols-[minmax(50px,min-content)_repeat(3,1fr)_min-content] grid-rows-1 gap-2">
        <>
            <div className="flex w-full justify-center">{file.id}</div>
            <div>{file.name}</div>
            <div>{fileSizeSI(file.size)}</div>
            <div>{file.date_created}</div>
            <div className="flex">
                <LikeButton className="material-symbols-outlined" action={async () => {}}>
                    favorite
                </LikeButton>
                <DLButton className="material-symbols-outlined" action={async ()=>{return {data:[1],name:"dog",type:"dog"}}}>
                    download
                </DLButton>
                <DeleteButton className="material-symbols-outlined" action={async () => true}>
                    delete
                </DeleteButton>
            </div>
            {/* </div> */}
        </>
    )
}
