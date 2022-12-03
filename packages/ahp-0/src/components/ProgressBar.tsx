import { cva } from 'class-variance-authority'
import { CheckSvg } from 'ui'
import { AppState, isStepComplete } from '../appReducer'
import { Steps } from '../core'

interface StepProps {
  isComplete: boolean
  isActive: boolean
  completeText: string
  incompleteText: string
  step: Steps,
  gotoStep: (step: Steps) => void
}

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

const Step = ({ isComplete, isActive, completeText, incompleteText, step, gotoStep }: StepProps) => {

  return (
    <div className='relative cursor-pointer' onClick={() => gotoStep(step)}>
      <div className={stepCva({ complete: isComplete, active: isActive })}>
        {isComplete ? completeText : incompleteText}
      </div>
      <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 border bg-black rounded-full w-6 h-6 text-center
        ${isComplete ? 'border-green-400' : 'border-neutral-400'}`}>
        {isComplete
          ? <CheckSvg className='text-green-400' />
          : step}
      </div>
    </div>
  )
}

interface ProgressBarProps {
  store: AppState,
  currentStep: Steps,
  gotoStep: (step: Steps) => void
}
export const ProgressBar = ({ store, currentStep, gotoStep }: ProgressBarProps) => {
  console.log('store', store)
  return (
    <div className='flex flex-col space-y-4'>
      <Step 
        isComplete={isStepComplete[Steps.Goal](store)}
        isActive={currentStep === Steps.Goal}
        completeText={`Goal: ${store.goal.description}`}
        incompleteText='Set a goal'
        step={Steps.Goal}
        gotoStep={gotoStep}
      />
      <Step 
        isComplete={isStepComplete[Steps.Alternatives](store)}
        isActive={currentStep === Steps.Alternatives}
        completeText='Alternatives complete'
        incompleteText='Pick your alternatives'
        step={Steps.Alternatives}
        gotoStep={gotoStep}
      />
      <Step 
        isComplete={isStepComplete[Steps.Criteria](store)}
        isActive={currentStep === Steps.Criteria}
        completeText='Criteria complete'
        incompleteText='Choose your criteria'
        step={Steps.Criteria}
        gotoStep={gotoStep}
      />
      <Step 
        isComplete={isStepComplete[Steps.CompareCriteria](store)}
        isActive={currentStep === Steps.CompareCriteria}
        completeText='Criteria comparison complete'
        incompleteText='Compare your criteria'
        step={Steps.CompareCriteria}
        gotoStep={gotoStep}
      />
      <Step 
        isComplete={isStepComplete[Steps.CompareAlternatives](store)}
        isActive={currentStep === Steps.CompareAlternatives}
        completeText='Alternative comparison complete'
        incompleteText='Compare your alternatives'
        step={Steps.CompareAlternatives}
        gotoStep={gotoStep}
      />
      <Step 
        isComplete={isStepComplete[Steps.Results](store)}
        isActive={currentStep === Steps.Results}
        completeText='View results'
        incompleteText='View results'
        step={Steps.Results}
        gotoStep={gotoStep}
      />
    </div>
  )
}