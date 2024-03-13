/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { HeadersFunction } from "@remix-run/node"; // or cloudflare/deno
import { ReactNode, useEffect, useState } from 'react';
import { Post as BooruPost } from '../lib/booru-api/post';

export const headers: HeadersFunction = ({
    actionHeaders,
    errorHeaders,
    loaderHeaders,
    parentHeaders,
}) => ({
    "Access-Control-Allow-Origin": "*cdn.donmai.us",
});
export default function Gallery({ posts, onPostOpen }: { posts: BooruPost[], onPostOpen: (post: BooruPost) => any }) {
    return (
        <div className={`select-none grid grid-cols-5 grid-rows-[repeat(4,minmax(400px,400px))] gap-2 p-2 bg-white overflow-y-scroll h-full`}>
            {
                posts.map((post, i, a) => {
                    return <Post key={post.id} post={post} onOpen={() => onPostOpen(post)} />
                })
            }
        </div>
    )
}

function Post({ post, onOpen: openPost }: { post: BooruPost, onOpen: () => any }) {
    const [hovering, setHovering] = useState(false);
    const [errored, setErrored] = useState(false);
    useEffect(() => {
        fetch(post.preview_file_url).then()
            .catch(err => {
                console.log(err);
                setErrored(true);
            })
    }, [post])
    // if(errored) return null
    return (
        <div
            className={`rounded-md outline-1 outline outline-[#5b8664] w-full h-full overflow-hidden relative transition-[outline] hover:outline hover:outline-[#645b86] hover:outline-4`}
            onMouseEnter={() => { setHovering(true); }}
            onMouseLeave={() => setHovering(false)}>
            <div className={`z-10 absolute w-full h-10 bottom-0 left-0 flex justify-evenly items-center bg-[#645b86] transition-all ${!hovering ? 'translate-y-full' : 'translate-y-0'}`}>
                <div
                    className='flex items-center cursor-pointer'
                    onClick={() => { openPost() }}>
                    <span className="material-symbols-outlined text-white">
                        expand_content
                    </span>
                </div>
            </div>
                {
                    (()=>{if(errored) return (<div className="w-full h-full flex items-center justify-center">Image load error</div>)})()
                }
                {
                    post.tag_string_meta.includes('video') ?
                        <video className='object-cover w-full h-full' src={post.file_url} />
                        :
                        <SuspendedImage className={`object-cover w-full h-full`} imgSrc={post.file_url} fallback={<div className={`blur w-full h-full bg-no-repeat bg-cover`} style={{ backgroundImage: `url(${post.preview_file_url})` }}></div>} />
                }
        </div>
    )
}

function SuspendedImage({ imgSrc, className, fallback }: { imgSrc: string, className?: string, fallback: ReactNode }) {
    // const [loadState, setLS] = useState<'initial' | 'loading' | 'loaded'>('initial');
    const [image, setImage] = useState<string | undefined>(undefined);
    useEffect(() => {
        console.log(imgSrc);
        fetch(imgSrc)
            .then(async (r) => {
                const blob = await r.blob();
                const src = window.URL.createObjectURL(blob);
                setImage(src);
            })
            .catch((err) => {
                setImage(undefined);
            });
    }, []);
    if (!imgSrc) throw new Error('empty img source');
    return (
        <>
            {image && imgSrc ? <img alt='' src={image} className={className} /> : fallback}
        </>
    )
}