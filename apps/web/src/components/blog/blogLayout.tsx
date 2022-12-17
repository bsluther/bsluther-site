import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'

const BlogNav = () => {
  return (
    <nav className='flex flex-col w-48'>
      <Link href='my-mdx-page'>My MDX Page</Link>
      <Link href='the-abstract-ecosystem'>The Abstract Ecosystem</Link>
    </nav>
  )
}

const components = {
  h1: (props: any) => <p {...props} className='text-2xl' />
}

export const BlogLayout = ({ children }: { children: JSX.Element }) => {

  return (
    <div className='w-full h-full flex'>
      <div className='grow h-full'>
        <MDXProvider components={components}>
          {children}
        </MDXProvider>
      </div>
      <BlogNav />
    </div>
  )
}