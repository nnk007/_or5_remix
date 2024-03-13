/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react'
import Gallery from './components/Gallery';
import { Post } from './lib/booru-api/post';
import DetailedPostView from './components/DetailedPostView';
import Searchbar from './components/Searchbar';


export default function App() {
  const [fullView, setFullView] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | undefined>(undefined);
  const [searchParams, setSP] = useState<SearchParams>({ rating: 'g', page: 1, tags: [] });
  useEffect(() => {
    Booru.Posts.get('tags=rating:g&page=1')
      .then(posts => setPosts(() => posts));
  }, [])
  useEffect(() => {
    Booru.Posts.get(getParamString(searchParams))
      .then(posts => setPosts(() => posts));
  }, [searchParams])
  function getParamString(p: SearchParams) {
    let str = '';
    str += `page=${searchParams.page}&`
    str += `tags=rating:${searchParams.rating}`;
    str += searchParams.tags.length > 0 ? `+${searchParams.tags.join('+')}` : '';
    return str;
  }
  return (
    <div className={`bg-[#030202] grid grid-flow-row grid-rows-[auto_1fr_auto] w-screen h-screen ${fullView ? 'overflow-hidden' : ''}`}>
      <nav className='bg-[#5b8664] w-full z-10 text-white flex justify-between'>
        <div className='flex items-center p-2 text-black'>
          <Searchbar onSubmit={(tag) => {
            setSP({ ...searchParams, tags: [...searchParams.tags, tag] });
          }} />
          <div className='ml-2 flex gap-1 items-center'>
            {searchParams.tags.map((tag, i, a) => {
              return <div key={i} className='cursor-pointer px-2 py-1 rounded-md text-white bg-black' onClick={() => {
                const index = searchParams.tags.findIndex((t) => t == tag);
                searchParams.tags.splice(index, 1);

                setSP({ ...searchParams, tags: searchParams.tags });
              }}>{tag}</div>
            })}
          </div>
        </div>
        <div className='grid grid-cols-3 items-center p-2'>
          <div className='flex items-center cursor-pointer text-neutral-300 hover:text-white' onClick={() => { const sp = { ...searchParams, page: searchParams.page > 1 ? searchParams.page - 1 : searchParams.page }; setSP(_ => _ = sp) }}>
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </div>
          <div className='flex items-center justify-center'>{searchParams.page}</div>
          <div className='flex items-center cursor-pointer text-neutral-300 hover:text-white' onClick={() => { const sp = { ...searchParams, page: searchParams.page + 1 }; setSP(_ => _ = sp) }}>
            <span className="material-symbols-outlined">
              arrow_forward
            </span></div>
        </div>
      </nav>
      <Gallery posts={posts} onPostOpen={(post) => {
        setActivePost(post);
        setFullView(true);
      }} />
      <div className=' p-2 bg-[#5b8664] text-white/50'>
        <div>Created by <a className='hover:text-white/90' href={'/'}>Or5anisation</a></div>
      </div>
      {activePost ? <DetailedPostView post={activePost as Post} active={fullView && activePost != undefined} onClose={() => {
        setFullView(false);
      }} /> : undefined}
    </div>
  )
}

class Booru {
  static Posts = {
    get: async function (extra = ''): Promise<Post[]> {
      const req = fetch(
        "https://safebooru.donmai.us/posts.json?" + extra,
        {
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
          },
          "body": "_method=get",
          "method": "POST",
        });
      return await (await req).json()
    }
  }
}

interface SearchParams {
  rating: General | Questionable | Sensistive | Explicit,
  page: number
  tags: string[]
}
type General = "g";
type Questionable = "q";
type Sensistive = "s";
type Explicit = "e";