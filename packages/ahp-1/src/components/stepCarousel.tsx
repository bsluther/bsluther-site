import { ChevronLeftSvg, ChevronRightSvg } from 'ui'
import { Steps } from '../core'
import { useAhpStore } from '../store'


const parseStep = (step: Steps) => {
  if (step === Steps.Goal) return 'Set a Goal'
  if (step === Steps.Alternatives) return 'Enter Options'
  if (step === Steps.Criteria) return 'Enter Criteria'
  if (step === Steps.CompareCriteria) return 'Compare Criteria'
  if (step === Steps.CompareAlternatives) return 'Compare Options'
  if (step === Steps.Results) return 'View Results'
  else return '' as never
}

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
    <nav className='flex items-center w-full min-h-[5rem] h-max text-neutral-100 bg-neutral-600 py-1 border-tNO border-neutral-400'>
      <div className='w-12 h-10 flex justify-end items-center'>
        {step !== Steps.Goal &&
          <ChevronLeftSvg 
            className='w-8 h-8 scale-y-150' 
            onClick={() => gotoPrevStep(step)} 
          />}
      </div>
      <ol className='flex w-full items-center'>

        <li 
          className='w-max grow text-sm opacity-60 basis-1 flex flex-col items-center'
          onClick={() => gotoPrevStep(step)}
        >
          {Steps[prevStep] && <>
            <span>Step {step - 1}:</span>
            <span className='max-w-[4rem] text-center'>{parseStep(prevStep)}</span>
          </>}
        </li>

        <li className='max-w-[4rem] text-lg flex flex-col items-center text-green-500'>
          <span className='font-bold'>Step {step}:</span>
          <div className='text-center inline-block'>{parseStep(step)}</div>
        </li>
        
        <li 
          className='w-max max-w-full grow text-sm opacity-60 basis-1 flex flex-col items-center px-1'
          onClick={() => gotoNextStep(step)}
        >
          {Steps[nextStep] && <>
            <span>Step {step + 1}:</span>
            <div className='max-w-[4rem] text-center'>{parseStep(nextStep)}</div>
          </>}
        </li>

      </ol>
      <div className='w-12 h-10 flex justify-start items-center'>
        {step !== Steps.Results &&
          <ChevronRightSvg 
            className='w-8 h-8 scale-y-150' 
            onClick={() => gotoNextStep(step)} 
          />}
      </div>
      {/* {step !== Steps.Results &&
        <ChevronRightSvg 
          className='w-8 h-8 scale-y-150'
          onClick={() => gotoNextStep(step)}
        />} */}
    </nav>
  )
}