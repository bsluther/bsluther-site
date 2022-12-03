import { cva } from 'class-variance-authority'
import { boolean } from 'fp-ts'
import { Steps } from '../core'
import { useAhpStore } from '../store'



const stepCard = cva(['flex items-center space-x-2 w-48 h-20 rounded-l-md text-neutral-100 p-2'], {
  variants: {
    active: {
      true: 'outline outline-neutral-100',
      false: ''
    },
    complete: {
      true: 'bg-green-800/75',
      false: 'bg-neutral-600'
    }
  }
})

interface StepCardProps {
  caption: string
  step: Steps
  isActive: boolean
}
const StepCard = ({ caption, step, isActive }: StepCardProps) => {
  const isComplete = useAhpStore(state => state.isStepComplete(step))
  const gotoStep = useAhpStore(state => state.gotoStep)
  return (
    <button
      className={stepCard({ active: isActive, complete: isComplete })}
      onClick={() => gotoStep(step)}
    >
      <span>{step}.</span>
      <span>{caption}</span>
    </button>
  )
}

interface ProgressProps {
  
}
export const Progress = ({}: ProgressProps) => {
  const currentStep = useAhpStore(state => state.step)

  return (
    <nav className='w-full h-full'>
      <ol className='w-full h-full flex flex-col items-end justify-evenly py-2'>
        <StepCard
          caption='Set a goal'
          step={Steps.Goal}
          isActive={currentStep === Steps.Goal}
        />
        <StepCard
          caption='Choose options'
          step={Steps.Alternatives}
          isActive={currentStep === Steps.Alternatives}
        />
        <StepCard
          caption='Choose criteria'
          step={Steps.Criteria}
          isActive={currentStep === Steps.Criteria}
        />
        <StepCard
          caption='Compare criteria'
          step={Steps.CompareCriteria}
          isActive={currentStep === Steps.CompareCriteria}
        />
        <StepCard
          caption='Compare options'
          step={Steps.CompareAlternatives}
          isActive={currentStep === Steps.CompareAlternatives}
        />
        <StepCard
          caption='Results'
          step={Steps.Results}
          isActive={currentStep === Steps.Results}
        />
      </ol>
    </nav>
  )
}