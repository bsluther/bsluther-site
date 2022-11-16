import { ReactNode } from 'react'
import { NavBar } from './navBar'
import { Recursive } from '@next/font/google'

const recursive = Recursive({ weight: 'variable', subsets: ['latin'] })

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main 
      className={`h-screen w-screen bg-neutral-900 ${recursive.className}`}
    >
      <div className='flex h-full'>
        <NavBar />
        <div className='grow h-full p-4'>
          {children}
        </div>
      </div>
    </main>
  )
}