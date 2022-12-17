import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

export const NameIcon = () => {
  const router = useRouter()
  return (
    <button 
      className='w-24 bg-neutral-100 text-black flex flex-col items-center py-2 -space-y-1 mb-8'
      onClick={() => router.push('/')}
    >
      <div className='flex flex-col -space-y-2 font-semibold items-start text-xl'>
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
    </button>
  )
}

const button = cva(
  'w-24 text-center font-semibold', {
    variants: {
      active: {
        true: 'bg-neutral-100 text-black',
        false: 'bg-neutral-900 border-neutral-100 text-neutral-100'
      },
      stacked: {
        true: 'border-b-2 border-x-2',
        false: 'border-2'
      }
    },
    defaultVariants: {
      active: false,
      stacked: false
    }
  }
)

export const ExpandableMenuButton = ({ href, children, subitems }: { href: string, children: ReactNode, active?: boolean, subitems: [string, string][] }) => {
  const router = useRouter()

  return (
    <div className='relative w-max h-max flex flex-col'>
      <Link
        href={href}
        className={button({ active: router.route === href })}
      >{children}</Link>

      <div className={`
        flex flex-col
        transform ease-in-out delay-100 duration-300 origin-top ${router.asPath.includes(href) ? 'scale-y-100' : 'scale-y-0 opacity-0 h-0'}
      `}>
        {subitems.map(([label, href]) => 
          <MenuButton key={href} href={href} stacked={true}>{label}</MenuButton>
        )}
      </div>
    </div>
  )
}

export const MenuButton = ({ href, children, stacked }: { href: string, children: ReactNode, stacked?: boolean }) => {
  const router = useRouter()

  return (
    <Link
      href={href}
      className={button({ active: router.route === href, stacked })}
    >{children}</Link>
  )
}

export const NavBar = () => {
  return (
    <section className='flex flex-col w-max space-y-4 p-4'>
      <NameIcon />
      <MenuButton href='/'>Home</MenuButton>
      <ExpandableMenuButton 
        href='/projects' 
        subitems={[
          ['MeasureTS', '/projects/measure-ts'],
          ['AHP', '/projects/ahp']
        ]}
      >Projects</ExpandableMenuButton>
      <MenuButton href='/cv'>CV</MenuButton>
      <MenuButton href='/blog'>Blog</MenuButton>
    </section>
  )
}