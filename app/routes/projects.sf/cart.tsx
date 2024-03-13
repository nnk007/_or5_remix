'use client'

import { useState } from "react"

export default function Cart({onToggle:toggleScroll}:{onToggle:(s:boolean)=>any}) {
  const [items, setItems] = useState<{ item: string, amnt: string }[]>([]);
  const [full, setFull] = useState(false);
  return (
    <>
      <div className='fixed bottom-2 right-2 z-50'>
        <div className='h-10 w-10 bg-neutral-100 drop-shadow-[0px_0px_2px_rgba(0,0,0,1)] rounded-full text-center flex items-center justify-center relative select-none cursor-pointer' onClick={() => { setFull(true); toggleScroll(true) }}>
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
        </div>
      </div>
      <div className={`${full?'fixed' : 'hidden'} transition-all top-0 left-0 w-screen h-screen grid grid-cols-[repeat(4,25%)] z-50 bg-black/40`}>
        <div className={`col-start-4 col-span-1 flex flex-col bg-white divide-y w-full rounded-lg overflow-hidden ${full ? 'translate-x-0':'translate-x-full'} transition-transform`}>
          <div className="flex justify-between items-center bg-purple-600 text-white px-2 pt-2">
            <div className="text-xl">Cart</div>
            <button onClick={() => {setFull(false);toggleScroll(false)}}>
              <span className="material-symbols-outlined" style={{lineHeight:'unset'}}>
                close
              </span>
            </button>
          </div>
          <div className="h-full p-2">
            {items.length==0?<div className="w-full h-full flex items-center justify-center">Cart is empty</div> : <div></div>}
          </div>
        </div>
      </div>
    </>
  )
}