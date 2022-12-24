import { Steps } from '../core'

const incompleteToStr = (incomplete: Steps[]) =>
  incomplete.length > 1
    ? `You still need to complete steps ${incomplete.slice(0, incomplete.length - 1).join(', ')}, and ${incomplete.slice(-1)}.`
    : `You still need to complete step ${incomplete[0]}.`

export const Incomplete = ({ incomplete }: { incomplete: Steps[] }) => {


  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <span
        className='bg-neutral-800 px-4 py-2 w-maxNO h-maxNO rounded-md'
      >{incompleteToStr(incomplete)}</span>
      <span className='h-1/4 w-1/4' />
    </div>
  )
}