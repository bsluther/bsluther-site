import { ReactNode } from 'react'
import { NavBar } from './navBar'
import { Recursive } from '@next/font/google'
import { HorizontalNavBar } from './horizontalNavBar'
import { ResponsiveNavBar } from './responsiveNavBar'

const recursive = Recursive({ weight: 'variable', subsets: ['latin'] })

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main 
      className={`max-h-fullNO max-w-full h-screen w-screenNO ${recursive.className}`}
    >
      <div className='flex flex-col h-full max-h-fullNO'>
        <ResponsiveNavBar />
        <div className='grow max-h-fullNO h-full text-black'>
          {children}
        </div>
      </div>
    </main>
  )
}