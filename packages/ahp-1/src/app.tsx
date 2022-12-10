import { Progress } from './components/progress'
import { Scorebar } from './components/scorebar'
import { Steps } from './core'
import { Alternatives } from './steps/alternatives'
import { CompareAlternatives } from './steps/compareAlternatives'
import { CompareCriteria } from './steps/compareCriteria'
import { Criteria } from './steps/criteria'
import { Goal } from './steps/goal'
import { Results } from './steps/results'
import { Results2 } from './steps/results2'
import { useAhpStore } from './store'

interface StepRouterProps {
  step: Steps
  elements: Record<Steps, JSX.Element>
}
const StepRouter = ({ step, elements }: StepRouterProps) => {
  return elements[step]
}

export const App = () => {
  const step = useAhpStore(state => state.step)
  const store = useAhpStore()
  console.log('STORE', store)

  return (
    <div className='w-full h-full bg-neutral-400 text-neutral-100 flex'>

      <div className='grow h-full'>
        <StepRouter
          step={step}
          elements={{
            [Steps.Goal]: <Goal />,
            [Steps.Alternatives]: <Alternatives />,
            [Steps.Criteria]: <Criteria />,
            [Steps.CompareCriteria]: <CompareCriteria />,
            [Steps.CompareAlternatives]: <CompareAlternatives />,
            [Steps.Results]: <Results2 />,
          }}
        />
      </div>

      <div className='w-1/5 h-full'>
        <Progress />
      </div>

    </div>
  )
}