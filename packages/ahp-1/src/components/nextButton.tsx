import { ChevronRightSvg } from 'ui'


export const NextButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      // style={{
      //   boxShadow: '0 0 .15rem .1rem rgba(30 30 30)'
      // }}
      className='flex items-center text-neutral-100 bg-neutral-700 pl-2 py-1 rounded-md border-2 border-green-400'
      onClick={onClick}
    >
      <span className='text-xl text-green-400'>Next Comparison</span>
      <ChevronRightSvg className='w-6 h-6 text-green-400' strokeWidth={3} />
    </button>
  )
}