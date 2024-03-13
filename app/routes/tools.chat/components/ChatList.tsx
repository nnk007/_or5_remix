'use client';

const chats = [{ name: 'Test chat', image: '', lastMessage: { value: 'Example message', date: 'Now' } }]
export default function ChatList() {
    return (
        <div className="grid grid-flow-row grid-cols-1 grid-rows-[auto_1fr] w-full p-2">
            <div className="grid grid-cols-[minmax(max-content,70px)_1fr] gap-2 p-2 items-center">
                <div className="relative h-10 aspect-square overflow-hidden rounded-full flex items-center place-self-center">
                    <img alt="" src={'/pfp.jpeg'} className="object-contain w-full h-full" />
                </div>
                <div className="flex flex-col justify-start ">
                    <div className="text-xl font-bold text-white">Hello Test user</div>
                    <button className="text-white/50 text-sm hover:underline w-max">My account</button>
                </div>
            </div>
            {/* /https://www.behance.net/gallery/133352981/Web-app-Business-Chat-Dashboard/modules/950425889 */}
            <div className="h-full grid grid-flow-row auto-rows-min grid-cols-1 p-2 gap-4">
                <div className="grid grid-cols-[auto_1fr] p-2 rounded-md bg-white/20 text-white/50">
                    <span className='material-symbols-outlined flex items-center'>search</span>
                    <input type="text" name="" id="" placeholder="Search" className="p-0 bg-transparent" />
                </div>
                <>
                    {
                        [...chats, ...chats].map((chat, i) => {
                            return (
                                <div className={`group grid grid-rows-1 grid-cols-[min-content_1fr_4ch_2ch] gap-2 ${i==0 ? 'bg-purple-400/20':''} rounded-md p-2 w-full transition-all overflow-hidden hover:bg-white/10`} key={chat.name}>
                                    <div className="relative h-10 aspect-square overflow-hidden rounded-full">
                                        <img alt="" src="/pfp.jpeg" className="object-cover" />
                                    </div>
                                    <div className="grid grid-rows-2 grid-cols-1">
                                        <div className={`${i==0 ? 'text-purple-400':'text-white'}`}>{chat.name}</div>
                                        <div className="text-white/50">{chat.lastMessage.value}</div>
                                    </div>
                                    <div className={`text-xs flex h-full items-center justify-center ${i==0 ? 'text-purple-400':'text-white/50'}`}>{chat.lastMessage.date}</div>
                                    <div className={`justify-center items-center flex relative transition-all group-hover:translate-x-0 translate-x-[150%]`}>
                                        <button className={`(i==0 ? 'text-purple-600':'text-white') material-symbols-outlined absolute`}>more_vert</button>
                                    </div>
                                </div>)
                        })
                    }
                </>
            </div>
        </div>
    )
}