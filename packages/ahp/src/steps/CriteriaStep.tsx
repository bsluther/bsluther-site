import { Action } from '../appReducer'
import { Criteria } from '../core'
import { LastTextcard, NoTextcards, Textcard } from '../components/Textcard'

interface CriteriaStepProps {
  criteria: Criteria
  criteriaOrder: string[]
  dispatch: React.Dispatch<Action>
}

export const CriteriaStep = ({ criteria, criteriaOrder, dispatch }: CriteriaStepProps) => {
  const appendCriterion = () => dispatch({
    type: 'appendCriterion',
    payload: {}
  })

  const describeCriterion = (id: string) => (desc: string) => dispatch({
    type: 'describeCriterion',
    payload: {
      id,
      description: desc
    }
  })

  const removeCriterion = (id: string) => () => dispatch({
    type: 'removeCriterion',
    payload: { id }
  })

  return (
    <div className='flex max-w-full h-full flex-wrap items-center content-start justify-center pr-8'>
      {criteriaOrder.length === 0 &&
          <NoTextcards addCard={appendCriterion} />
      }
      {criteriaOrder.map((crtId, ix) => {
        if (criteriaOrder.length === ix + 1) {
          return (
            <LastTextcard
              key={crtId} 
              entity={criteria[crtId]} 
              index={ix}
              name='criterion'
              addEntity={appendCriterion}
              describeEntity={describeCriterion(crtId)}
              removeEntity={removeCriterion(crtId)}
            />
          )
        }
        return (
          <Textcard 
            key={crtId} 
            entity={criteria[crtId]} 
            index={ix} 
            name='criterion'
            describeEntity={describeCriterion(crtId)}
            removeEntity={removeCriterion(crtId)}
          />
        )
      })}
    </div>
  )
}