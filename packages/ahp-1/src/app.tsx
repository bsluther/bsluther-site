import { Progress } from './components/progress'
import { Steps } from './core'
import { Alternatives } from './steps/alternatives'
import { Goal } from './steps/goal'
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

  return (
    <div className='w-full h-full bg-neutral-400 text-neutral-100 flex'>

      {/* <div className='w-1/3 bg-neutral-800 h-full'></div> */}

      <div className='grow h-full'>
        <StepRouter
          step={step}
          elements={{
            [Steps.Goal]: <Goal />,
            [Steps.Alternatives]: <Alternatives />,
            [Steps.Criteria]: <Goal />,
            [Steps.CompareCriteria]: <Goal />,
            [Steps.CompareAlternatives]: <Goal />,
            [Steps.Results]: <Goal />,
          }}
        />
      </div>

      <div className='w-1/5 h-full'>
        <Progress />
      </div>

    </div>
  )
}