import { ChevronLeftSvg, ChevronRightSvg } from 'ui'
import { Steps } from '../core'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import * as IO from 'fp-ts/IO'
import { pipe } from 'fp-ts/lib/function'



export const StepCarousel = () => {
  const step = useAhpStore(state => state.step)
  const gotoStep = useAhpStore(state => state.gotoStep)

  const prevStep = step - 1
  const nextStep = step + 1

  const gotoPrevStep = (step: Steps) => {
    if (Steps[prevStep]) {
      gotoStep(step - 1)
    }
  }

  const gotoNextStep = (step: Steps) => {
    if (Steps[nextStep]) {
      gotoStep(step + 1)
    }
  }

  return (
    <nav className='flex items-center w-full h-max text-neutral-100 bg-neutral-800'>
      {step !== Steps.Goal
        ? <ChevronLeftSvg 
            className='w-8 h-8' 
            onClick={() => gotoPrevStep(step)} 
          />
        : <div className='w-8 h-8' />}
      <ol className='flex w-full items-center'>
        <li className='w-max grow text-sm opacity-60 basis-1 flex flex-col items-center'>
          {Steps[prevStep] && <>
            <span>Step {step - 1}:</span>
            <span>{Steps[prevStep]}</span>
          </>}
        </li>

        <li className='w-max text-lg flex flex-col items-center'>
          <span>Step {step}:</span>
          <span>{Steps[step] === 'Alternatives' ? 'Options' : Steps[step]}</span>
        </li>
        
        <li className='w-max grow text-sm opacity-60 basis-1 flex flex-col items-center'>
          {Steps[nextStep] && <>
            <span>Step {step + 1}:</span>
            <span>{Steps[nextStep]}</span>
          </>}
        </li>
      </ol>
      {step !== Steps.Results &&
        <ChevronRightSvg 
          className='w-8 h-8'
          onClick={() => gotoNextStep(step)}
        />}
    </nav>
  )
}