import { useReducer } from 'react'
import { ChooseGoal } from './steps/ChooseGoal'
import { ProgressBar } from './components/ProgressBar'
import { Steps } from './core'
import { appReducer, findEmpty, initStore, isStepComplete } from './appReducer'
import { AlternativesStep } from './steps/AlternativesStep'
import { CriteriaStep } from './steps/CriteriaStep'
import { CompareCriteriaStep } from './steps/CompareCriteria2'


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
                <CompareCriteriaStep 
                  criteria={store.goal.criteria}
                  criteriaOrder={store.goal.criteriaOrder}
                  criteriaComparison={store.comparisons.criteria}
                  prereqs={{
                    [Steps.Goal]: isStepComplete[Steps.Goal](store),
                    [Steps.Criteria]: isStepComplete[Steps.Criteria](store)
                  }}
                  dispatch={dispatch}
                />,
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