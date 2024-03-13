import Header from './header'
import Gallery from './gallery'
import Footer from './footer'
import React, { StrictMode, useRef, useState } from 'react'
import { BuyModal, ConsultModal } from './modal'
export default function Home() {
  const [activeDialog, setAD] = useState(0);
  const buyButton = useRef<HTMLDivElement>(null)
  const scrollNext = useRef<HTMLDivElement>(null)
  return (
    <div className={`roboto-regular overflow-x-hidden overflow-y-scroll w-full h-full`}>
      <Header onPurchase={() => buyButton.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} onNext={() => scrollNext.current?.scrollIntoView({ behavior: "smooth", block: 'start' })} />
      <div className='flex flex-col lg:grid grid-cols-2 grid-flow-col place-items-center lg:pb-0 lg:pt-4 pb-4 w-full' ref={scrollNext}>
        <div className='w-11/12'>
          <Gallery />
        </div>
        <div className="text-black pb-4 w-11/12 sm:pb-0 flex flex-col items-center justify-center text-center max-w-xl gap-10 leading-6">
          <h1 className='text-3xl font-semibold'>SUG Power SGPC 2000</h1>
          <p className='font-light'>Надійне електропостачання зменшує ваш стрес та дає можливість керувати своїми планами, роботою чи
            відпочинком</p>
          <p className='font-light'>Потужний інвертор з безперебійником, зарядкою для акумулятора є одним з кращих рішень для забезпечення
            автономного електропостачання для квартир, офісів, кафе, аптек, приватних будинків
          </p>
        </div>
      </div>
      <div className="features bg-[#dbd9ea] flex flex-col items-center justify-center py-12 px-4 gap-12">
        <div className="features-title title text-4xl font-semibold mb-3">Переваги</div>
        <div className="features-grid grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 gap-4">
          <FeatureCard img='/sf/static/images/reliability.png' head='Надійне живлення в екстренних ситуаціях' text='SUG Power SGPC 2000 з зарядкою для акумулятора та чистою синусоїдою є одним з кращих рішень для
        забезпечення автономного електропостачання квартир, офісів, кафе, аптек, приватних будинків. Жодних
        важких генераторів, каністр з бензином, надмірного шуму та небезпеки пожеж' />
          <FeatureCard img='/sf/static/images/compatibility.png' head='Сумісність з широким спектром пристроїв' text={
            <>
              <span>SUG Power SGPC 2000 дозволяє заживити електроприлади різної потужності та чутливості:</span>
              <ul className='list-disc list-inside'>
                <li className=''>поуербанк, роутер, ноутбук;</li>
                <li>холодильник, чайник, мікрохвильова піч;</li>
                <li>Насоси системи опалення, газові котли, насоси скважин води приватного будинку</li>
              </ul>
            </>
          } />
          <FeatureCard img='/sf/static/images/efficiency.png' head='Ефективна та чиста потужність' text='SUG Power SGPC 2000 має сертифікат FCC/ETL. Чиста синусоїдальна хвиля генерує менше шуму та перешкод, ніж інші типи сигналів, гарантуючи плавний пуск, чисте стабільне та безпечне живлення для чутливого обладнання' />
          <FeatureCard img="/sf/static/images/safety.png" head='Інтелектуальний захист і безпека' text={
            <>
              <span>SUG Power SGPC 2000
                є простим в експлуатації, не потребує додаткового обслуговування:</span>
              <ul className='list-inside list-disc'>
                <li>вбудований інтелектуальний зарядний пристрій самостійно заряджає акумулятор і відключає його для
                  захисту від розряду;</li>
                <li>система захисту попереджує перенавантаження та коротке замикання</li>
                <li>розумний вентилятор охолодження попереджає перегрів приладу </li>
              </ul>
            </>
          } />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col w-full py-8">
        <div className="stats-title text-4xl font-semibold p-10 text-center">Технічні характеристики</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-[repeat(12,minmax(0,auto))] sm:grid-rows-[repeat(6,minmax(0,auto))] w-4/5 sm:w-3/5 gap-x-10 gap-y-3">
          <Stat name="Вхідна напруга" desc=': 12В постійого струму' />
          <Stat name="Вихідна напруга" desc=': 230В змінного струму' />
          <Stat name="Номінальна потужність" desc=": 2000 Вт" />
          <Stat name="Максимальна потужність" desc=": 4000 Вт" />
          <Stat name="USB-порт" desc=": 5В, 2А постійного струму" />
          <Stat name="Частота струму" desc=": 50/60Гц" />
          <Stat name="Сила струму зарядки акумулятора" desc=": 3-20А" />
          <Stat name='Чиста' desc=' синусоїда' />
          <Stat name="Захист" desc=": висока і низька напруга акумулятора, перевантаження, перегрів, коротке замикання" />
          <Stat name="Додаткові функції" desc=": плавний пуск, розумний вентилятор охолодження" />
          <Stat name="Розміри; вага" desc=": 435х165х113мм; 5 кг" />
          <Stat name="Комплектація" desc=": інвертор, силові кабелі для підключення, додаткові запобіжники, інструкція українською мовою" />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid grid-cols-2 place-items-center grid-flow-col">
        <div className="text-black flex flex-col items-center justify-center text-center w-11/12 gap-10 leading-6 px-2 sm:px-0">
          <h1 className='text-3xl font-semibold'>SUG Power SGPC 2000</h1>
          <p className='font-light'>Придбайте надійне живлення за допомогою інвертора з чистою синусоїдальною хвилею, який ідеально
            підходить для вашої чутливої електроніки.</p>
          <div className="price text-2xl font-semibold flex gap-2">
            <div className='after:content-["₴"] after:ml-1'>10000</div>
            <div className='text-neutral-400 line-through after:ml-1 after:content-["₴"]'>16000</div>
          </div>
          <div ref={buyButton} className="button px-14 py-4 font-semibold text-base cursor-pointer bg-[#988cc4] text-white rounded-md" onClick={() => { setAD(2) }}>ПРИДБАТИ</div>
        </div>
        <div className='w-11/12'>
        <Gallery />

        </div>
      </div >
      <Footer onContact={() => setAD(1)} />
      <StrictMode>
        {activeDialog == 1 ? <ConsultModal onClose={function () { setAD(0) }} onSubmit={async (d)=>{
          return new Promise((res,rej)=>{
            // API route ain't even there, but why load error when one can simulate error
            
            // fetch('/api/consultation',{method:'post',body:JSON.stringify(d)})
            // .then(r=>r.ok ? res(1) : rej())
            // .catch(rej)
            setTimeout(() => {
              rej()
            }, 1000);
          })
        }} /> : undefined}
        {activeDialog == 2 ? <BuyModal onClose={function () { setAD(0) }}  onSubmit={(d)=>{
          return new Promise((res,rej)=>{
            // fetch('/api/createOrder',{body:JSON.stringify(d),method:'post'})
            // .then(r=>{
            //   r.ok ? res(1) : rej()
            // }
            // )
            // .catch(rej)
            setTimeout(() => {
              rej()
            }, 1000);
          })
        }}/> : undefined}
      </StrictMode>
    </div>
  )
}


function FeatureCard({ img, head, text }: { img: string, head: string, text: string | React.ReactNode }) {
  return (
    <div className="flex flex-col  max-w-full items-center justify-center md:justify-start">
      <div className="w-full sm:w-1/2 lg:w-[20rem] px-28 flex items-center justify-center">
        <img className="object-contain aspect-square" width={500} height={500} src={img} alt="" />
      </div>
      <h1 className='text-2xl lg:text-3xl text-center font-semibold my-4 w-full'>{head}</h1>
      <div className='font-light'>{(text as string).length ? <span>{text}</span>:text}</div>
    </div>
  )
}

function Stat({ name, desc }: { name: string, desc: string }) {
  return (
    <div className="flex items-center gap-1">
      <img className="w-3 aspect-square mr-3" src="/sf/static/images/bullet.svg" alt="" width={100} height={100} />
      <div className='font-light leading-tight'><b className='font-bold'>{name}</b>{desc}</div>
    </div>
  )
}