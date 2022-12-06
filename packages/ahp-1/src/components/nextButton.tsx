import { ChevronRightSvg } from 'ui'


export const NextButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
      className='flex items-center text-neutral-100 bg-neutral-700 pl-2 py-1 rounded-md'
      onClick={onClick}
    >
      <span className='text-xl'>Next</span>
      <ChevronRightSvg className='w-6 h-6' strokeWidth={3} />
    </button>
  )
}