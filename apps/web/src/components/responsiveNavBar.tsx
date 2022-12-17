import { useRouter } from 'next/router'
import { useBreakpoint } from 'ui'
import { DropdownNavButton, NameIconSm, NavButton } from './horizontalNavBar'


const NameIcon = () => {
  const router = useRouter()
  const { breakpoint, isPastBreakpoint } = useBreakpoint()
  
  return (
    <button 
      className='w-max h-max bg-neutral-100 text-black flex flex-col items-center px-2 py-1
        text-xs sm:text-sm'
      onClick={() => router.push('/')}
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

export const ResponsiveNavBar = () => {
  const { breakpoint, isPastBreakpoint } = useBreakpoint()

  return (
    <section className='flex w-full h-max p-4 items-center space-x-12'>
      <NameIcon />
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