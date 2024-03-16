/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Post } from "../lib/booru-api/post";
export default function DeatiledPostView({ post, active, onClose: closeView }: { post: Post, active: boolean, onClose: () => any }) {
    return (
        <div className={`fixed w-screen h-screen transition-colors delay-150 ${active ? 'bg-neutral-900/40' : 'bg-neutral-900/0 pointer-events-none'} z-50`}>
            <div className={`transition-transform duration-500 w-10/12 h-5/6 bg-white grid grid-rows-[auto_minmax(0,1fr)] grid-cols-1 rounded-md overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 ${active ? '-translate-y-1/2' : '-translate-y-[200%]'}`}>
                <div className="bg-[#645b86] w-full flex justify-between items-center p-1 z-10">
                    <div></div>
                    <div className="flex items-center text-neutral-300 hover:text-white cursor-pointer" onClick={() => { closeView() }}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                </div>
                <div className="h-full w-full grid grid-rows-[minmax(auto,50%)_minmax(200px,1fr)] sm:grid-cols-[auto_minmax(200px,1fr)] sm:grid-rows-1 grid-flow-col">
                    <div className="sm:h-full">
                        {post.file_url ?
                            post.tag_string.includes('video') ?
                                <video className="min-h-[200px] h-full object-contain" src={post.file_url} controls={true} /> :
                                <img className="min-h-[200px] object-contain h-full w-full" width={1000} height={1000} src={post.large_file_url ? post.large_file_url : post.file_url} alt="" /> :
                            <div className="w-[200px] h-full flex items-center justify-center text-black">{`Can't access image`}</div>
                        }
                    </div>
                    <div className="p-2 w-full h-full shadow-[0px_0px_10px_-1px] shadow-black flex flex-col overflow-auto">
                        <div className="text-black"><span className="font-semibold">Post ID: </span>{post.id}</div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-black">Post tags:</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tag_string_general.split(' ').map((t, i, a) =>
                                    t !== '' ? <Tag key={i} name={t} className="bg-green-400" /> : undefined)}
                                {post.tag_string_character.split(' ').map((t, i, a) =>
                                    t !== '' ? <Tag key={i} className="bg-indigo-300" name={t} /> : undefined)}
                                {post.tag_string_copyright.split(' ').map((t, i, a) =>
                                    t !== '' ? <Tag key={i} className="bg-yellow-400" name={t} /> : undefined)}
                                {post.tag_string_artist.split(' ').map((t, i, a) =>
                                    t !== '' ? <Tag key={i} className="bg-red-400" name={t} /> : undefined)}
                                {post.tag_string_meta.split(' ').map((t, i, a) =>
                                    t !== '' ? <Tag key={i} className="bg-slate-400" name={t} /> : undefined)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Tag({ name, className }: { name: string, className?: string }) {
    return (
        <div className={`transition-all hover:shadow cursor-pointer p-2 rounded-md shadow-[5px_5px_15px_#bebebe,-5px_-5px_15px_#ffffff]  ` + className}>{name}</div>
    )
}