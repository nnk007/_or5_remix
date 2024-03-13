'use client'
import { Suspense, useEffect, useState } from "react";
import CatPost from "./CatPost";
import { dbPost } from "../page";

export function CatPosts({ cats: _ }: { cats: dbPost[] }) {
    const [cats, setCats] = useState(_);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        if (filter.length == 0) return setCats(_);
        const c = _.filter((cat) => cat.caption.includes(filter));
        function catsEq() {
            let eq = true;
            for (let i = 0; i < c.length; i++) {
                if (c.findIndex(v=>v==cats[i])==-1) {
                    eq = false;
                    break;
                } continue
            }
            return eq;
        };
        if (c.length != cats.length || !catsEq()) {
            console.log(c);
            setCats(__=>__=c);
        }
    }, [filter, cats, _])
    return (
        <>
            <div className=" h-auto leading-none flex flex-col gap-2 text-center">
                {/* <div className="py-4">We've got <span className="text-purple-400">{cats.length}</span> cat images so far</div> */}
                <label htmlFor="" className="p-2 w-full flex items-center justify-center sticky top-0 bg-black/50">
                    <input className="p-2 w-full text-black bg-neutral-100" type="text" placeholder={`Search among ${_.length} cat images`} value={filter} onChange={e => setFilter(e.currentTarget.value)} />
                </label>
                {cats.map((cat, k, a) =>
                <Suspense key={cat.id} fallback={'Err'}>
                        <CatPost cat={cat} key={cat.id}/>
                    </Suspense>
                )}
            </div>
        </>

    );
}

