import { cva } from 'class-variance-authority'
import { ChevronRightSvg, ChevronLeftSvg } from 'ui'

const stepCva = cva(['w-36 h-24 rounded-md text-sm p-2 outline-green-400'], {
  variants: {
    complete: {
      true: 'border-green-400 bg-green-400/10',
      false: 'border-neutral-400/50 bg-neutral-400/10'
    },
    active: {
      true: 'border outline',
      false: 'border'
    }
  },
  compoundVariants: [
    {
      complete: false,
      active: true,
      className: 'border-green-400'
    }
  ]
})

export const MockAltCompare = () => {

  return (
    <div className='w-full h-full flex flex-col text space-y-2 items-center'>
      <div
        className='text-neutral-300 borderNO border-neutral-100 rounded-md px-4'
      >Goal: Choose a new car to buy.</div>
      <div
        className='text-neutral-300 borderNO border-neutral-100 rounded-md px-4 flex space-x-4'
      >
        <span className=''>
          Criteria:
        </span>
        {['safety', 'cost', 'mpg', '4x4', 'style'].map(crt =>
            <div className={crt === 'cost' ? 'border border-blue-400/50 bg-blue-400/25 rounded-sm px-2' : 'px-2'}>{crt}</div>)}
      </div>

      <div
        className='text-neutral-300 borderNO border-neutral-100 rounded-md px-4 flex space-x-4'
      >
        <span>
          Options:
        </span>
        {['explorer', 'tacoma', 'tundra', 'forrester', 'outback'].map(crt =>
            <div className={crt === 'tacoma' || crt === 'forrester' ? 'border border-yellow-400/50 bg-yellow-400/25 rounded-sm px-2' : 'px-2'}>{crt}</div>)}
      </div>
      <div className='grow'></div>

      <div className='w-full flex justify-center items-center space-x-4 text-neutral-100'>
        <div className='flex grow basis-0 space-x-4 text-neutral-300'>
          <div className='opacity-25'>1. Set a goal</div>
          <div className='opacity-50'>2. Choose criteria</div>
          <div className='opacity-75'>3. Choose options</div>
          <div className=''>4. Compare criteria</div>
        </div>
        <div className='flex items-center text-xl space-x-4 text-green-400'>
          <ChevronLeftSvg className='w-10 h-10' />
          <div className='flex flex-col justify-center items-center'>
            <span>STEP 5:</span>
            <span>COMPARE</span>
            <span>OPTIONS</span>
          </div>
          <ChevronRightSvg className='w-10 h-10' />
        </div>
        <div className='flex grow basis-0'>
          <div>6. View results</div>
        </div>

      </div>
      <div className='w-full flex justify-center' />
    </div>
  )
}