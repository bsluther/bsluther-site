import { ReactNode } from 'react'
import { NavBar } from './navBar'
import { Recursive } from '@next/font/google'
import { HorizontalNavBar } from './horizontalNavBar'
import { ResponsiveNavBar } from './responsiveNavBar'

const recursive = Recursive({ weight: 'variable', subsets: ['latin'] })

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main 
      className={`max-h-full max-w-full h-screenNO w-screenNO ${recursive.className}`}
    >
      <div className='flex flex-col max-h-full'>
        <ResponsiveNavBar />
        <div className='grow max-h-full bg-neutral-400 text-black'>
          {children}
        </div>
      </div>
    </main>
  )
}