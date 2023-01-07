import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const ProjectCard = ({ children }: { children: ReactNode}) => {
  return (
    <button className='border-2 hover:border-4 hover:font-semibold bg-neutral-100 border-neutral-800 text-neutral-800 p-4 w-28 h-28 flex items-center justify-center'>
      {children}
    </button>
  )
}

const Projects = () => {

  return (
    <section className='h-full w-full flex flex-col items-center justify-start p-8 gap-4'>
      <div className='flex flex-col md:flex-row w-full gap-4 items-center'>
        <Link href='/projects/ahp' className='flex flex-col items-center gap-2'>
          <span className='font-bold text-2xl'>AHP App</span>
          <Image src='/ahp-pairwise-demo.png' alt='AHP App' width={250} height={250} />
        </Link>
        <p className='w-full p-8'>The analytic hierarchy process (AHP) is a method for breaking down complex decisions into a series of side-by-side comparisons. In order to choose between a set of alternatives, a set of criteria are chosen to rank each alternative by. Once these alternatives and criteria are set, the criteria are compared one against another, pair after pair, in order to establish the relative importance of each criterion. Next the alternatives are compared, also one against another, but now with each comparison in regard to a specific criterion. This allows users to focus on a single criterion at a time, for example by ranking one model of car against another in regards to safety. After all comparisons are complete, the application outputs a set of weights for each criterion showing it's relative importance as well as a final analysis of the relative value of each alternative according to those weights.</p>
      </div>
    </section>
  )
}

export default Projects