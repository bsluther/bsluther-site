import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useBreakpoint } from 'ui'
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

const NameIcon = ({ onClick }: { onClick: () => void }) => {
  
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
    <div className='flex flex-col h-max'>
      <li className='flex w-full h-max'>
        <button className=''>{label}</button>
        {/* <span className='min-w-[2rem] grow' /> */}
        {/* <svg 
          className={`w-6 h-6 transition-transform duration-500 ${menuOpen && 'rotate-180'}`}
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg> */}
      </li>
      <ul className={`h-max flex flex-col border-l-2 border-neutral-900 space-y-2 pl-2 pt-2
        transition-transform duration-500 origin-top overflow-hidden
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

const MobileIcon = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  
  return (
    <nav className='relative w-full h-max'>
      <div 
        className='w-full flex items-center justify-end space-x-4'
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <div className='w-max h-max invisible'>
          <NameIcon onClick={() => null} />
        </div>
        <div className='flex text-neutral-100 grow justify-center'>
          <span className='text-neutral-100 capitalize text-2xl font-semiboldNO'>{parseRoute(router.route)}</span>
          {/* <svg 
            className={`w-6 h-6 transition-transform duration-500 ${menuOpen && 'rotate-180'}`}
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
            // onClick={() => setMenuOpen(prev => !prev)}
            >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg> */}
        </div>
        <NameIcon onClick={() => null} />
      </div>

      <ul
        className={`absolute top-full right-0 bg-neutral-100 w-max h-max px-4 py-2
          transition-transform origin-top duration-500 ease-in-out translate-y-2 space-y-2
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}
        `}
      >
        <li className={`transition transform origin-top duration-500 ease-in-out 
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Home</li>
        {/* <li className={`transition transform origin-top duration-500 ease-in-out 
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Projects</li> */}
        <Submenu 
          label='Projects' 
          baseHref='/projects'
          items={[
            ['AHP', '/ahp'],
            ['MeasureTS', '/measure-ts']
          ]}
          handleClick={() => setMenuOpen(false)}
        />
        <li className={`transition transform origin-top duration-500 ease-in-out 
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Blog</li>
      </ul>
    </nav>
  )
}

export const ResponsiveNavBar = () => {
  const { breakpoint, isPastBreakpoint } = useBreakpoint()
  const router = useRouter()

  return (
    <section className='flex w-full h-max p-4 items-center space-x-12'>
      {isPastBreakpoint('sm')
        ? <NameIcon onClick={() => router.push('/')} />
        : <MobileIcon />}
      {isPastBreakpoint('sm') && 
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
        </div>}
    </section>
  )
}