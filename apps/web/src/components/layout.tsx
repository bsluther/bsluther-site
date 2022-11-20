import { ReactNode } from 'react'
import { NavBar } from './navBar'
import { Recursive } from '@next/font/google'
import { HorizontalNavBar } from './horizontalNavBar'

const recursive = Recursive({ weight: 'variable', subsets: ['latin'] })

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main 
      className={`h-screen w-screen bg-neutral-900 ${recursive.className}`}
    >
      <div className='flex flex-col h-full'>
        <HorizontalNavBar />
        <div className='grow h-full p-4'>
          {children}
        </div>
      </div>
    </main>
  )
}