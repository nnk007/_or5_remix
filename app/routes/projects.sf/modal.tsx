import { useEffect, useRef, useState } from "react"
export function ConsultModal({ onClose: handleClose,onSubmit:submit}: { onClose: () => any,onSubmit:(data:{name:string,tel:string})=>Promise<any> }) {
    const self = useRef<HTMLDialogElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const [sendState, setSS] = useState<'idle' | 'sending' | 'failed' | 'ok'>('idle');
    const [validInput, setVI] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    useEffect(() => {
        if (self.current && !self.current.open) {
            self.current?.showModal();
            self.current?.addEventListener('close', (ev) => {
                // self.current?.returnValue
                handleClose();
            });
            self.current.addEventListener('click', (ev) => {
                if (self.current == null) return;
                const rect = self.current.getBoundingClientRect();
                const isInDialog = (rect.top <= ev.clientY && ev.clientY <= rect.top + rect.height && rect.left <= ev.clientX && ev.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    handleClose();
                }
            })
        }
    }, []);
    useEffect(() => {
        if (sendState == "failed" || sendState == "ok") {
            setTimeout(() => setSS("idle"), 2000)
        }
    }, [sendState])

    function submitData(){
        if (!(/[\p{sc=Cyrillic}\s]+/u.test(name)) || !(/[\d\s\+]{10,15}/.test(tel))) return setVI(false);
                        setVI(true);
                        setSS('sending');
                        submit(({name:name,tel:tel}))
                        .then(()=>setSS('ok'))
                        .catch(()=>setSS('failed'));
    }
    return (
        <dialog className={`backdrop:bg-black/70 w-2/5 h-min flex flex-col gap-2 p-5 pb-10 font-light`} ref={self}>
            <div ref={wrap} onKeyUp={(ev)=>ev.code=='Enter' ? submitData() : undefined}>
                <h3 className="text-xl font-semibold py-4">Ваші дані:</h3>
                <fieldset className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                        <span className={`after:content-['*'] after:align-top after:text-base ${/[\p{sc=Cyrillic}\s]+/u.test(name) ? '' : 'after:text-red-700'}`}>{`Ім'я та прізвище`}</span>
                        <input type="text" name="" id="" className="p-2 border-black border" placeholder="Микола Парасюк" value={name} onChange={e => setName(e.currentTarget.value)} />
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2">
                        <span className={`after:content-['*'] after:align-top after:text-base ${/[\d\s\+]{10,15}/.test(tel) ? '' : 'after:text-red-700'}`}>{`Номер телефону`}</span>
                        <input type="text" name="" id="" className="p-2 border-black border" placeholder="+38 (096) 123 45 67" value={tel} onChange={e => setTel(e.currentTarget.value)}/>
                    </label>
                    <button className={`${sendState == 'ok' ? 'bg-green-700' : sendState == "failed" ? "bg-red-700" : 'bg-[#988cc4] hover:bg-[#847aa9]'} w-full py-2 text-white text-center font-normal flex items-center justify-center gap-1 z-10`} onClick={e => {
                        submitData();
                        // setTimeout(() => setSS("ok"), 1000);
                        //handle submit
                    }}>{sendState == "sending" ? <><span className="material-symbols-outlined animate-spin">sync</span>Відправляємо...</> : sendState == "idle" ? `Залишити заявку` : sendState == "failed" ? <><span className="material-symbols-outlined">sync_problem</span>Помилка. Спробуйте пізніше</> : 'Повідомлення отримано'}</button>
                    <div className={`${validInput ? '-translate-y-10 ' : 'translate-y-0'} transition-all text-center z-0 text-red-600 underline font-normal`} style={{ borderColor: 'transparent' }}>{`Заповніть обов'язкові поля`}</div>
                </fieldset>
            </div>
            <button className="material-symbols-outlined absolute right-0 top-0 p-2" onClick={() => handleClose()}>
                close
            </button>
        </dialog>
    )
}
export function BuyModal({ onClose: handleClose,onSubmit:submit }: { onClose: () => any,onSubmit:(data:{item:string,qty:number,name:string,tel:string})=>Promise<any> }) {
    const itemPrice = 10000;
    const self = useRef<HTMLDialogElement>(null);
    const wrap = useRef<HTMLDivElement>(null);
    const [sendState, setSS] = useState<'idle' | 'sending' | 'failed' | 'ok'>('idle');
    const [validInput, setVI] = useState<boolean>(true);
    const [items, setItems] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    useEffect(() => {
        if (self.current && !self.current.open) {
            self.current?.showModal();
            self.current?.addEventListener('close', (ev) => {
                // self.current?.returnValue
                handleClose();
            });
            self.current.addEventListener('click', (ev) => {
                if (self.current == null) return;
                const rect = self.current.getBoundingClientRect();
                const isInDialog = (rect.top <= ev.clientY && ev.clientY <= rect.top + rect.height && rect.left <= ev.clientX && ev.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    handleClose();
                }
            })
        }
    }, []);
    useEffect(() => {
        if (sendState == "failed" || sendState == "ok") {
            setTimeout(() => setSS("idle"), 2000)
        }
    }, [sendState])
    function submitData(){
        if (!(/[\p{sc=Cyrillic}\s]+/u.test(name)) || !(/[\d\s\+]{10,15}/.test(tel))) return setVI(false);
                        setVI(true);
                        setSS('sending');
                        submit({item:'Inverter',name:name,tel:tel,qty:items})
                        .then(
                            ()=>setSS("ok")
                        )
                        .catch(
                            ()=>setSS('failed')
                        )
    }
    return (
        <dialog className={`backdrop:bg-black/70 w-1/3 h-min flex flex-col gap-2 p-5 pb-10 font-light`} ref={self}>
            <div ref={wrap} className="divide-y gap-2 divide-neutral-300 flex flex-col" onKeyUp={(ev)=>ev.code=='Enter' ? submitData() : undefined}>
                <h3 className="text-xl font-semibold py-4">Ваше замовлення:</h3>
                <div className="grid grid-cols-[minmax(auto,150px)_repeat(2,minmax(0,auto))] grid-rows-1 text-center place-items-center">
                    <img width={500} height={500} src='/sf/static/images/i-2.jpeg' alt='' className="aspect-square" />
                    <div className="flex flex-col justify-evenly h-full">
                        <div className="font-semibold">SUG Power SGPC 2000</div>
                        <div className="grid grid-cols-[repeat(3,minmax(0,min-content))] grid-rows-1 gap-2 self-center select-none">
                            <button className="material-symbols-outlined text-white bg-black rounded-full scale-75" onClick={() => setItems(_ => _ = items == 1 ? 1 : items - 1)}>remove</button>
                            <div>{items}</div>
                            <button className="material-symbols-outlined text-white bg-black rounded-full scale-75" onClick={() => setItems(_ => _ = items < 99 ? items + 1 : items)}>add</button>
                        </div>
                    </div>
                    <div>{itemPrice * items}грн.</div>
                </div>
                <fieldset className="flex flex-col gap-4 pt-4">{ }
                    <label className="flex flex-col gap-2">
                        <span className={`after:content-['*'] after:align-top after:text-base ${/[\p{sc=Cyrillic}\s]+/u.test(name) ? '' : 'after:text-red-700'}`}>{`Ім'я та прізвище`}</span>
                        <input type="text" name="" id="" className="p-2 border-black border" placeholder="Микола Парасюк" value={name} onChange={e => setName(e.currentTarget.value)} />
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2">
                        <span className={`after:content-['*'] after:align-top after:text-base ${/[\d\s\+]{10,15}/.test(tel) ? '' : 'after:text-red-700'}`}>{`Номер телефону`}</span>
                        <input type="text" name="" id="" className="p-2 border-black border" placeholder="+38 (096) 123 45 67" value={tel} onChange={e => setTel(e.currentTarget.value)} />
                    </label>
                    <button className={`z-10 ${sendState == 'ok' ? 'bg-green-700' : sendState == "failed" ? "bg-red-700" : 'bg-[#988cc4] hover:bg-[#847aa9]'} w-full py-2 text-white text-center font-normal flex items-center justify-center gap-1`} onClick={e => {
                        submitData();
                        //handle submit
                    }}>{sendState == "sending" ? <><span className="material-symbols-outlined animate-spin">sync</span>Відправляємо...</> : sendState == "idle" ? `Залишити заявку` : sendState == "failed" ? <><span className="material-symbols-outlined">sync_problem</span>Помилка. Спробуйте пізніше</> : 'Повідомлення отримано'}</button>
                </fieldset>
                <div className={`${validInput ? '-translate-y-10 ' : 'translate-y-0'} transition-all text-center z-0 text-red-600 underline font-normal`} style={{ borderColor: 'transparent' }}>{`Заповніть обов'язкові поля`}</div>
            </div>
            <button className="material-symbols-outlined absolute right-0 top-0 p-2" onClick={() => handleClose()}>
                close
            </button>
        </dialog>
    )
}