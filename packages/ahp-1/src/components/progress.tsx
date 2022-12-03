import { cva } from 'class-variance-authority'
import { boolean } from 'fp-ts'
import { Steps } from '../core'



const stepCard = cva(['flex items-center space-x-2 w-48 h-20 rounded-l-md text-neutral-100 bg-neutral-600 p-2'])

interface StepCardProps {
  caption: string
  step: Steps
  isComplete: boolean
  isFocused: boolean
}
const StepCard = ({ caption, step, isComplete, isFocused }: StepCardProps) => {
  return (
    <button
      className={stepCard()}
    >
      <span>{step}.</span>
      <span>{caption}</span>
    </button>
  )
}

interface ProgressProps {
  currentStep: Steps
}
export const Progress = ({ currentStep }: ProgressProps) => {

  return (
    <nav className='w-full h-full'>
      <ol className='w-full h-full flex flex-col justify-start items-end space-y-2 py-2'>
        <StepCard
          caption='Set a goal'
          step={Steps.Goal}
          isComplete={false}
          isFocused={false}
        />
        <StepCard
          caption='Choose options'
          step={Steps.Alternatives}
          isComplete={false}
          isFocused={false}
        />
        <StepCard
          caption='Choose criteria'
          step={Steps.Criteria}
          isComplete={false}
          isFocused={false}
        />
        <StepCard
          caption='Compare criteria'
          step={Steps.CompareCriteria}
          isComplete={false}
          isFocused={false}
        />
        <StepCard
          caption='Compare options'
          step={Steps.CompareAlternatives}
          isComplete={false}
          isFocused={false}
        />
        <StepCard
          caption='Results'
          step={Steps.Results}
          isComplete={false}
          isFocused={false}
        />
      </ol>
    </nav>
  )
}