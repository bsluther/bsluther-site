import { ReactNode } from 'react'
import { Recursive } from '@next/font/google'
import localFont from '@next/font/local'
import { ResponsiveNavBar } from './responsiveNavBar'

const recursive = Recursive({ weight: 'variable', subsets: ['latin'], variable: '--font-recursive' })
const virgil = localFont({ src: '../../fonts/Virgil.woff2', variable: '--font-virgil' })

export const Layout = ({ children }: { children: ReactNode }) => {

  return (
    <main 
      className={`max-h-fullNO max-w-full h-screen w-screenNO ${recursive.className} ${virgil.variable}`}
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