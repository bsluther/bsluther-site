import { ReactNode } from 'react'

const ProjectCard = ({ children }: { children: ReactNode}) => {
  return (
    <button className='border-2 hover:border-4 hover:font-semibold border-neutral-100 text-neutral-100 p-4 w-40 h-40 flex items-center justify-center'>
      {children}
    </button>
  )
}

const Projects = () => {

  return (
    <section className='h-full w-full flex justify-center'>
      <ProjectCard>MeasureTS</ProjectCard>
    </section>
  )
}

export default Projects