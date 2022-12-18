import { ChevronLeftSvg, ChevronRightSvg } from 'ui'
import { Steps } from '../core'
import { useAhpStore } from '../store'

export const StepCarousel = () => {
  const step = useAhpStore(state => state.step)

  const prevStep = Steps[step - 1]
  const nextStep = Steps[step + 1]
  return (
    <nav className='flex w-full h-max text-neutral-900'>
      {step !== Steps.Goal
        ? <ChevronLeftSvg className='w-6 h-6 bg-neutral-400' />
        : <div className='w-6 h-6 bg-neutral-400' />}
      <ol className='flex w-full items-center'>
        <li className='w-max grow basis-1'>{step - 1 === 0 ? '' : `${step - 1}. `}{prevStep}</li>
        <li className='w-max text-lg'>{step}. {Steps[step]}</li>
        <li className='w-max grow basis-1'>{step + 1}. {nextStep}</li>
      </ol>
      {step !== Steps.Results &&
        <ChevronRightSvg className='w-6 h-6 bg-neutral-400' />}
    </nav>
  )
}