import Link from 'next/link'

const Blog = () => {

  return (
    <p className='p-4 flex flex-col space-y-4'>
      <span>
        So far I have one post:
      </span>
      <>
        <Link 
          className='font-semibold underline'
          href='/blog/gainzville-the-big-picture'
        >Gainzville: The Big Picture</Link>
      </>
    </p>

  )
}

export default Blog