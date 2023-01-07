import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'

const BlogNav = () => {
  return (
    <nav className='flex-col hidden md:flex w-max px-4 bg-neutral-500 text-neutral-300 pt-4'>
      <Link href='gainzville-the-big-picture'>Gainzville: The Big Picture</Link>
      <p className='text-neutral-100' />
      {/* <Link href='the-abstract-ecosystem'>The Abstract Ecosystem</Link> */}
    </nav>
  )
}

const components = {
  h1: (props: any) => <h1 {...props} className='text-2xl underline' />,
  h3: (props: any) => <h1 {...props} className='text-xl underline' />,
  code: (props: any) => {
    if (props.className === 'hljs language-js') {
      return <code {...props} />
    }
    return <code {...props} className='font-bold' />
  },
  pre: (props: any) => <pre className='' {...props} />,
  p: (props: any) => <p {...props} className='' />,
  li: (props: any) => <li {...props} className='text-blue-800 pl-2'>- {props.children}</li>,
  blockquote: (props: any) => <blockquote className='ml-8 px-2 bg-red-800 text-neutral-400' {...props} />
}

export const BlogLayout = ({ children }: { children: JSX.Element }) => {

  return (
    <div className='w-full flex'>
      <div className='max-w-full grow flex justify-center'>
        <div className='w-full md:max-w-3xl p-4 space-y-4'>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
        </div>
      </div>
      <BlogNav />
    </div>
  )
}