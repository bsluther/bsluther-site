import { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { Button } from 'ui'

const NameIcon = () => {
  return (
    <div className='w-24 bg-neutral-100 text-black flex flex-col items-center py-2 -space-y-1 mb-8'>
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
    </div>
  )
}

const button = cva(
  'w-24 text-center font-semibold border-2', {
    variants: {
      active: {
        true: 'bg-neutral-100 text-black',
        false: 'bg-neutral-900 border-neutral-100 text-neutral-100'
      }
    },
    defaultVariants: {
      active: false
    }
  }
)
const MenuButton = ({ children, active = false }: { children: ReactNode, active?: boolean }) => {
  return (
    <button
      className={button({ active })}
    >{children}</button>
  )
}


const Body = () => {
  return (
    <p className='text-white '>Hello! Welcome to my website. It's full of... just about nothing!</p>
  )
}

export default function Web() {
  return (
    <Body />
  )
}
