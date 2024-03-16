import type { MetaFunction } from "@remix-run/node";
import { createContext, useEffect, useState } from "react";
import Projects from "./projects";
export const meta: MetaFunction = () => {
  return [
    { title: "OR5" },
    { name: "description", content: "Rope now" },
  ];
};

export const isMobileContext = createContext<boolean>(false);

export default function Home() {
  const mobile = true;//!window.matchMedia('(min-width:768px)').matches;
  const [navbarVisible, setNV] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', () => {
      console.log(window.innerWidth, window.outerWidth)
      setIsMobile(window.innerWidth <= 640);
    })
  }, []);
  return (
    <isMobileContext.Provider value={isMobile}>
      <div className='grid sm:grid-flow-col sm:grid-cols-[auto_1fr] bg-white max-h-screen'>
        <div className={`fixed top-0 left-0 sm:static bg-white z-50 w-full sm:shadow-sm sm:shadow-black grid sm:flex flex-col text-black text-2xl sm:gap-4 text-center sm:h-full overflow-hidden transition-all`} style={{ gridTemplateRows: navbarVisible ? 'auto 10rem' : 'auto 0rem' }}>
          <button className='p-4' onClick={() => { if (mobile) setNV(!navbarVisible) }}>
            Or5anisation
            <div className='text-sm bg-gradient-to-tr from-blue-400 to-purple-400 text-transparent bg-clip-text'>now in React</div>
          </button>
          <div className={`flex flex-col w-full items-center gap-1`}>
            <a href="#about" className='hover:underline'>Home</a>
            <a href="#projects" className='hover:underline'>Projects</a>
            <a href="#tools" className='hover:underline'>Tools</a>
            <a href="#contact" className='hover:underline'>Contact</a>
          </div>
        </div>
        <div className='overflow-y-auto max-h-screen scroll-smooth'>
          <Main />
        </div>
      </div >
    </isMobileContext.Provider>
  )
}

function Main() {
  return (
    <>
      {/* about */}
      <div className='relative h-[400px]' id='about'>
        <div className='absolute z-10 h-full w-full flex justify-center items-center text-2xl drop-shadow-[0_0_2px_#000] font-semibold text-white'>
          <div className="px-2 text-center">Building web apps that might work.</div>
        </div>
        <img className='h-full w-full object-cover' src={'/bg.jpg'} alt='bg' />
      </div>
      {/* proj previews */}
      <span id='projects'>
        <h2 className="flex px-4 pt-4 pb-2 text-3xl"><a href="#projects"># Projects</a></h2>
        <Projects
          items={[{
            name: 'Consulting firm landing page',
            description: `Website developed for a small team of volunteers seeking to employ their skills
        and knowledge for a greater good of war-famished Ukraine.`,
            tech: ['AWS EC2', 'Docker', 'ClickUp API', 'Express.js', 'HTML/CSS/JS'],
            tasks: ['Website development', 'ClickUp CRM integration', 'Gmail notification', 'Tech support'],
            demo_a: '',
            img_src: '/ybi.png'
          },
          {
            name: 'Power solution store landing page',
            description: `Website developed for an Ukraine-based hardware store tasked with increasing their Internet presence. `,
            tech: ['AWS EC2', 'Docker', 'Bitrix24 API', 'Express.js', 'HTML/CSS/JS'],
            tasks: ['Website development', 'Bitrix24 CRM integration', 'Tech support'],
            demo_a: '/projects/sf',
            img_src: '/sf.png'
          }
          ]}
        />
      </span>
      {/* tools */}
      <div className='text-black shadow-md pb-2 rounded-b-xl' id='tools'>
        <h2 className="flex px-4 pt-4 pb-2 text-3xl"><a href="#tools"># Tools</a></h2>
        <div className={"sm:pl-2"}>
          <Tool tool={
            {
              name: '*Booru viewer',
              desc: `Frontend for a custom implementation of Donmai's API, which allows for a more broad list of search options, otherwise locked by a paid subscription. Locked to SFW version of the site`,
              img_src: '/booru.png',
              a: '/tools/booru'
            }
          } />
          <Tool alt tool={
            {
              name: `File storage`,
              desc: `FTP with extra steps and not actually working`,
              img_src: `/ft.png`,
              a: '/tools/ftp'
            }
          } />
          <Tool tool={
            {
              name: `Cat gallery`,
              desc: `Previously a simple wall of cat pictures, currently a gallery built to streamline cat picture storage and distribution. UGC rolls back every week.`,
              img_src: `/cats.png`,
              a: '/tools/cats'
            }
          } />
          <Tool alt tool={
            {
              name: `Chat prototype`,
              desc: `Prototype of a chat app, dropped development`,
              img_src: `/chat.png`,
              a: '/tools/chat'
            }
          } />
        </div>
      </div>
      {/* contact */}
      <div className='h-96 flex flex-col text-black font-semibold text-2xl items-center justify-center' id='contact'>
        <div>Find me here</div>
        <div className='flex gap-4'>
          <a className='h-[100px] aspect-square block' href='/contact/li'>
            <img className='object-contain h-full aspect-square' src={'/linkedin-icon.png'} alt='' height={512} width={512} />
          </a>
          <a className='h-[100px] aspect-square block' href='/contact/gh'>
            <img className='object-contain h-full aspect-square invert' src={'/github-icon.png'} alt='' height={512} width={512} />
          </a>
        </div>
      </div>
    </>
  )
}

function Tool({ tool, alt }: { tool: { name: string, img_src: string, desc: string, a?: string }, alt?: boolean }) {
  return (
    <div className='grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-4 grid-rows-3 sm:grid-rows-1'>
      <div className={`text-2xl font-semibold flex items-center justify-center  sm:row-start-auto ${alt ? 'sm:col-start-2' : ''}`}>{tool.name}</div>
      <div className='w-full flex rounded-md shadow-md overflow-hidden'>
        <a href={tool.a || ""} className='relative'>
          <div className='absolute h-full w-full flex items-center justify-center hover:bg-black/50 text-transparent hover:text-white underline'>Open</div>
          <img className='w-full object-contain' src={tool.img_src} alt="" height={720} width={1280} />
        </a>
      </div>
      <div className='sm:col-span-2 flex items-center justify-center p-4 text-center'>{tool.desc}
      </div>
    </div>
  )
}