import { cva } from 'class-variance-authority'
import Link from 'next/link'

const inlineLink = cva(['text-neutral-100'])

const Body = () => {
  return (
    <main className='p-4 pt-24 flex flex-col items-center gap-4'>
      <p className=''>Hello! Welcome to my website. Head over to my <Link className={inlineLink()} href="/projects">AHP app</Link> to get some help making a tough decision.</p>
      <p>You can also check out my <Link className={inlineLink()} href='/blog'>blog</Link> which has some stuff about my other project, <Link className={inlineLink()} href="https://www.gainzville.net">Gainzville</Link>.</p>
    </main>
  )
}

export default function Web() {
  return (
    <Body />
  )
}
