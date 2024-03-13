import {readdir,stat} from "fs/promises";
import path from "path";
import mime from 'mime-types';
async function getFiles(): Promise<FileEntry[]> {
    const files = await readdir(process.env.OR5FS as string,{withFileTypes:true});
    const fes:FileEntry[] = await Promise.all(files.filter(f=>!f.isDirectory()).map(async (file,i)=>{
        const s = await stat(process.env.OR5FS as string + '/'+file.name);
        return {id:i,name:file.name,size:s.size,date_created:s.birthtime.toUTCString()};
    }))
    return fes;
}

async function downloadFile(fileName:string){
    'use server';
    const p = or5fs+'/'+fileName;
    const file = await readFile(p);
    const type = mime.lookup(path.parse(p).ext);
    if(!type) throw new Error();
    return {name:fileName,type:type,data:file.toJSON().data};
}
async function handleUpload(file:{name:string,size:number,type:string,data:Uint8Array}){
    'use server'
    try {
        const p = or5fs as string +'/temp/'+file.name;
        await writeFile(p,new Uint8Array(file.data));
        const s = await stat(p);
        if(s.size!=file.size){
            await unlink(p);
            throw new Error('size mismatch');
        } else {
            await copyFile(p,or5fs as string + '/' + file.name)
            await unlink(p);
            return true;
        }
    } catch(err){
        console.error(err);
        return(false);
    }
}

async function deleteFile(fileName:string){
    'use server';
    try{
        await unlink(or5fs as string + '/' + fileName);
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}