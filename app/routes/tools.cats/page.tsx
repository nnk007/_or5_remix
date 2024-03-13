// import { getPlaiceholder } from "plaiceholder";
import { CatPosts } from "./components/CatPosts";
import SubmitPost from "./components/SubmitPost";
import Header from "./components/Header";
import { useEffect, useState } from "react";
export type dbPost = {
    id: number,
    caption: string,
    author: string,
    img_name: string,
    likes: number,
    status: 'pending' | 'active'
};

async function getCats(): Promise<dbPost[]> {
    return [{
        id: 1,
        caption: "string",
        author: "string",
        img_name: "string",
        likes: 1,
        status: 'active'
    }];
}

export default function Cats() {
    const [cats,setCats] = useState<dbPost[]>([]);
    useEffect(()=>{
        getCats().then(setCats);
    },[])
    return (
        <div className="bg-neutral-900 min-h-screen grid grid-cols-3 grid-rows-1 gap-2">
            <Header></Header>
            <main className="">
                    {/* @ts-ignore */}
                    <CatPosts cats={cats} />
            </main>
            <footer className="hidden sticky top-0 h-screen from-blue-400/50 to-blue-500/50 bg-gradient-to-bl w-2/3 justify-self-end">
                <div className="flex flex-col items-stretch w-2/3 mx-auto gap-2 p-2">
                {(() => {
                    const pending = cats.filter(c => c.status == 'pending');
                    if (pending.length > 0) {
                        return (
                            <>
                                <div className="text-xl">{`Latest submissions`}</div>
                                <div className="grid grid-cols-[repeat(3,33%)] auto-rows-[repeat(3,100px)] border rounded-lg auto-cols-fr overflow-hidden">
                                    {pending.slice(0, 9).map((cat, k) => {
                                        //should open id
                                        return <a key={k} className="relative h-[100px]" href={'/tools/cats/cat/'+cat.img_name}>
                                            <img src={'/tools/cats/store/' + cat.img_name} className="h-full object-cover" fill={true} alt="" />
                                        </a>
                                    })}
                                </div>
                                <button className="px-10 py-2 border rounded-md hover:bg-green-600">Vote</button></>
                        )
                    } else {
                        return (
                            <>
                                <div className="text-xl">Help expand the collection</div>
                                <SubmitPost className="w-full">
                                    <button className="w-full py-2 border rounded-md hover:bg-green-600">Submit now</button>
                                </SubmitPost>
                            </>
                        )
                    }
                })()
                }
                </div>
               
            </footer>
        </div>
    )
}

function FC() {
    return (
        <div>Err</div>
    )
}