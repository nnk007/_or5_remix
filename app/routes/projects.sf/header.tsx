export default function Header({ onPurchase: handlePurchase, onNext: handleNext }: { onPurchase: () => any, onNext: () => any }) {
    return (
        <header className="w-screen overflow-hidden grid grid-rows-[auto_1fr_min-content] grid-cols-1 h-screen text-white bg-[url(/sf/static/images/i-2.jpeg)] bg-no-repeat bg-center bg-contain relative">
            <nav className="grid  grid-cols-[1fr_auto] sm:grid-cols-2 px-4 sm:px-10 py-10 z-10">
                <div className="nav-logo italic font-medium text-2xl">[Company Name]</div>
                <div className="flex text-xl justify-end gap-8 items-center">
                    <a className="text-xl" href="tel:+381234567890">+38 123 456 78 90</a>
                    <button className="hidden sm:flex px-8 py-3 bg-white text-black font-semibold rounded-3xl text-sm"
                        onClick={() =>
                            // document.querySelector('.sell-container').scrollIntoView({behaviour:'smooth'})
                            handlePurchase()
                        }>Замовити
                    </button>
                </div>
            </nav>
            <main className="flex items-center justify-evenly flex-col z-10 text-center">
                <h1 className="text-3xl p-2 sm:p-0 sm:text-7xl font-bold drop-shadow-[0px_2px_5px_rgba(0,0,0,0.8)] leading-normal">Потужний інвертор з безперебійником (UPS) SUG Power SGPC 2000</h1>
                <p className="text-2xl font-light drop-shadow-[0px_2px_5px_rgba(0,0,0,0.8)]">Залишайтеся під напругою в будь-якій надзвичайній ситуації
                </p>
                <button className="text-2xl px-16 py-5 bg-white text-black rounded-[50px] font-semibold" onClick={() => handleNext()}>
                    Детальніше
                </button>
            </main>
            <div className="justify-self-center animate-bounce pb-4 z-10 fill-white cursor-pointer" onClick={() => handleNext()}><svg role="presentation" height="20px" viewBox="0 0 38.417 18.592">
                <g>
                    <path
                        d="M19.208,18.592c-0.241,0-0.483-0.087-0.673-0.261L0.327,1.74c-0.408-0.372-0.438-1.004-0.066-1.413c0.372-0.409,1.004-0.439,1.413-0.066L19.208,16.24L36.743,0.261c0.411-0.372,1.042-0.342,1.413,0.066c0.372,0.408,0.343,1.041-0.065,1.413L19.881,18.332C19.691,18.505,19.449,18.592,19.208,18.592z">
                    </path>
                </g>
            </svg></div>
            <div className="absolute h-full w-full bg-gradient-to-t from-[rgb(103,98,131)]/60 to-[rgb(75,66,151)]/60"></div>
        </header>
    )
}