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


const MobileIcon = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='relative w-max h-max'>
      <NameIcon onClick={() => setMenuOpen(prev => !prev)} />

      <ul
        className={`absolute top-full left-0 bg-neutral-100 w-max h-max pl-4 pr-8 py-2
          transition-transform origin-top duration-500 ease-in-out translate-y-2
          ${menuOpen ? 'scale-y-100' : 'scale-y-0'}
        `}
      >
        <li className={`transition transform origin-top duration-500 ease-in-out ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Home</li>
        <li className={`transition transform origin-top duration-500 ease-in-out ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Projects</li>
        <li className={`transition transform origin-top duration-500 ease-in-out ${menuOpen ? 'scale-y-100' : 'scale-y-0'}`}>Blog</li>
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