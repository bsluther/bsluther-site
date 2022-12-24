import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useBreakpoint, useOutsideClick } from 'ui'
import { DropdownNavButton, NameIconSm, NavButton } from './horizontalNavBar'


const WithDropdown = ({ children }: { children: JSX.Element }) => {

  return (
    <div className='absolute w-max h-max'>
      {children}
      <nav
        className='relative bottom-0 left-0'
      >

      </nav>
    </div>
  )
}

const NameIcon = ({ onClick = () => null }: { onClick?: () => void }) => {
  
  return (
    <button 
      className='w-max h-max bg-neutral-100 text-black flex flex-col items-center px-2 py-1
        text-xs sm:text-sm'
      onClick={onClick}
    >
      <div className='flex flex-col -space-y-[.125rem] sm:-space-y-1 font-semibold items-start'>
        <div className='flex'>
          <span className=''>B</span>
          <span className='text-neutral-500 '>rian</span>
        </div>
        <div className='flex'>
          <span className=''>S</span>
          <span className='text-neutral-500 '>cott</span>
        </div>
        <span className=''>Luther</span>
      </div>
    </button>
  )
}
interface SubmenuProps {
  label: string
  baseHref: string
  items: [string, string][]
  handleClick: () => void
}


const Submenu = ({ label, baseHref, items, handleClick }: SubmenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className={`flex flex-col items-start h-max pb-2
      transition-transform duration-300 origin-top
      ${menuOpen ? 'scale-y-100NO' : 'scale-y-0NO'}`}>
      <Link 
        href={baseHref} 
        onClick={() => {
          handleClick()
          setMenuOpen(false)
        }}
      >{label}</Link>
      <ul className={`h-max flex flex-col items-start border-l-2 border-neutral-900 space-y-2 pl-2 pt-2
        transition-transform duration-300 origin-top overflow-hidden
        ${menuOpen ? 'scale-y-100NO' : 'scale-y-0NO'}`}
      >
        {items.map(([label, href]) =>
          <Link
            onClick={handleClick}
            key={href}
            href={baseHref.concat(href)}
          >{label}</Link>)}
      </ul>
    </div>
  )
}

const parseRoute = (href: string) => {
  if (href === '/projects/measure-ts') return 'MeasureTS'
  if (href === '/projects/ahp') return 'AHP'
  
  return href.slice(href.lastIndexOf('/') + 1)
}

const InitialsIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex' onClick={onClick}>
      <div className='w-6 h-6 bg-neutral-100 text-center'>B</div>
      <div className='w-7 h-6 text-neutral-100 bg-neutral-800NO text-center'>S</div>
      <div className='w-6 h-6 bg-neutral-100 text-center'>L</div>
    </div>
  )
}

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef<HTMLDivElement>(null)

  useOutsideClick([hamburgerRef], () => setMenuOpen(false))
  return (
    <div
      className='relative'
      ref={hamburgerRef}
    >
      <svg 
        role='button'
        className="w-6 h-6 text-neutral-100 scale-x-125" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <path 
          fillRule="evenodd" 
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
          clipRule="evenodd" 
        />
      </svg>
      <ul
        className={`absolute z-50 top-full right-0 bg-neutral-100 w-max h-max px-4 py-2
          flex flex-col items-start
          transition-transform origin-top duration-300 ease-in-out translate-y-2 space-y-2
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}
        `}
      >
        <Link 
          className={`transition-transform origin-top duration-300 ease-in-out 
            ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}
          href='/'
          onClick={() => setMenuOpen(false)}
        >Home</Link>
        <Submenu 
          label='Projects' 
          baseHref='/projects'
          items={[
            ['Overview', '/'],
            ['AHP', '/ahp'],
            ['MeasureTS', '/measure-ts']
          ]}
          handleClick={() => setMenuOpen(false)}
        />
        <Link 
          className={`transition-transform origin-top duration-300 ease-in-out 
            ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}
          href='/blog'
          onClick={() => setMenuOpen(false)}
        >Blog</Link>
      </ul>
    </div>
  )
}

export const ResponsiveNavBar = () => {
  const { isPastBreakpoint } = useBreakpoint()
  const router = useRouter()

  if (!isPastBreakpoint('sm')) return (
    <section className='w-full h-max py-3 px-4 flex items-center bg-neutral-700'>
      <InitialsIcon onClick={() => router.push('/')} />
      <div className='grow'></div>
      <Hamburger />
    </section>
  )
  return (
    <section className='flex w-full h-max p-4 items-center space-x-12 bg-neutral-700'>
      <NameIcon onClick={() => router.push('/')} />
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