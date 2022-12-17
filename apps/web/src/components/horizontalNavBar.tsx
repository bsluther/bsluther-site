import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'


const NameIconLg = () => {
  const router = useRouter()
  return (
    <button 
      className='w-24 bg-neutral-100 text-black flex flex-col items-center py-2 -space-y-1'
      onClick={() => router.push('/')}
    >
      <div className='flex flex-col -space-y-2 font-semibold items-start text-lg'>
        <div className='flex'>
          <span>B</span>
          <span className='text-neutral-600 text-blue-800NO'>rian</span>
        </div>
        <div>
          <span>S</span>
          <span className='text-neutral-600 text-blue-800NO'>cott</span>
        </div>
        <span>Luther</span>
      </div>
    </button>
  )
}

export const NameIconSm = () => {
  const router = useRouter()
  return (
    <button 
      className='w-max h-max bg-neutral-100 text-black flex flex-col items-center px-2 py-1 -space-y-1'
      onClick={() => router.push('/')}
    >
      <div className='flex flex-col -space-y-1 font-semibold items-start'>
        <div className='flex'>
          <span className='text-sm'>B</span>
          <span className='text-neutral-600 text-sm'>rian</span>
        </div>
        <div className='flex'>
          <span className='text-sm'>S</span>
          <span className='text-neutral-600 text-sm'>cott</span>
        </div>
        <span className='text-sm'>Luther</span>
      </div>
    </button>
  )
}

const InitialsIcon = () => {
  return (
    <div className='flex'>
      <div className='w-6 h-6 bg-neutral-100 text-center'>B</div>
      <div className='w-6 h-6 text-neutral-100 text-center'>S</div>
      <div className='w-6 h-6 bg-neutral-100 text-center'>L</div>
    </div>
  )
}




const navButton = cva(['w-max'], {
  variants: {
    active: {
      true: 'font-extrabold text-white',
      false: 'text-neutral-100'
    }
  },
  defaultVariants: {
    active: false
  }
})

export const NavButton = ({ label, href }: { label: string, href: string }) => {
  const router = useRouter()

  return (
    <Link
      href={href}
      className={navButton({ active: router.route === href })}
    >{label}</Link>
  )
}

export const DropdownNavButton = ({ label, baseHref, items }:
  { label: string, baseHref: string, items: Record<string, string> }) => {
  const router = useRouter()
  const subroute = items[router.route]

  const [hovered, setHovered] = useState(false)

  return (
    <div 
      className='relative w-max h-max flex'
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={baseHref}
        className={navButton({ active: router.route === baseHref })}
        onClick={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
      >{label}</Link>
      {subroute &&
        <>
          <div className='text-neutral-100 cursor-pointer'>/</div>
          <div className={`text-neutral-100 font-extrabold cursor-pointer`}>{subroute}</div>
        </>
      }
      {hovered &&
        <div className='absolute top-full flex flex-col bg-neutral-100 py-1 pl-1 pr-4'>
          <Link 
            className={`text-neutral-900 ${router.route === baseHref && 'font-extrabold'}`} 
            href='/projects'
          >Overview</Link>
          {Object.entries(items).map(([href, label]) =>
            <Link
              key={label}
              className={`text-neutral-900 ${subroute === label && 'font-extrabold'}`}
              href={href}
            >{label}</Link>)}
        </div>}
    </div>
  )
}



export const HorizontalNavBar = () => {

  return (
    <section className='flex w-full h-max p-4 items-center space-x-12'>
      <NameIconSm />
      <div className='grow flex space-x-12'>
        <NavButton label='Home' href='/' />
        <DropdownNavButton 
          label='Projects' 
          baseHref='/projects'
          items={{
            '/projects/measure-ts': 'MeasureTS',
            '/projects/ahp': 'AHP'
          }}
        />
        <NavButton label='Blog' href='/blog' />
        <NavButton label='CV' href='/cv' />
      </div>
    </section>
  )
}