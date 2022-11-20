import { useReducer } from 'react'
import { ChooseGoal } from './components/ChooseGoal'
import { ProgressBar } from './components/ProgressBar'
import { Steps } from './core'
import { appReducer, initStore } from './appReducer'
import { AlternativesStep } from './components/AlternativesStep'
import { CriteriaStep } from './components/CriteriaStep'


interface StepRouterProps {
  step: Steps
  elements: Record<Steps, JSX.Element>
}
const StepRouter = ({ step, elements }: StepRouterProps) => {
  return elements[step]
}

export const App = () => {
  const [store, dispatch] = useReducer(appReducer, {}, initStore)

  return (
    <div className='text-neutral-100 w-full h-full flex items-center justify-center'>

        <div className='grow h-full flex items-center justify-center'>
          <StepRouter
            step={store.step}
            elements={{
              [Steps.Goal]:
                <ChooseGoal 
                  goal={store.goal.description} 
                  setGoal={str => dispatch({ type: 'describeGoal', payload: str })} 
                />,
              [Steps.Alternatives]:
                <AlternativesStep 
                  alternatives={store.goal.alternatives} 
                  alternativesOrder={store.goal.alternativesOrder}
                  dispatch={dispatch} 
                />,
              [Steps.Criteria]:
                <CriteriaStep
                  criteria={store.goal.criteria}
                  criteriaOrder={store.goal.criteriaOrder}
                  dispatch={dispatch}
                />,
              [Steps.CompareCriteria]:
                <></>,
              [Steps.CompareAlternatives]:
                <></>,
              [Steps.Results]:
                <></>
              
            }}
          />
        </div>
        <div className='h-full'>
          <ProgressBar
            store={store}
            currentStep={store.step}
            gotoStep={(step: Steps) => dispatch({ type: 'gotoStep', payload: step })}
          />
        </div>

    </div>
  )
}