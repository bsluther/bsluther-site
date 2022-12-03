import { Action, findEmpty, SetCriteriaCellParams } from '../appReducer'
import { Criteria, Criterion, Matrix, Steps } from '../core'
import { Textcard } from '../components/Textcard'
import { Pairwise } from '../components/compare/Pairwise'
import * as O from 'fp-ts/Option'
import { useEffect, useState } from 'react'
import { pipe } from 'fp-ts/lib/function'
import { MatrixView } from '../components/Matrix'

interface CompareCriteriaStep {
  criteria: Criteria
  criteriaOrder: string[]
  criteriaComparison: Matrix
  prereqs: {
    [Steps.Goal]: boolean
    [Steps.Criteria]: boolean
  },
  dispatch: React.Dispatch<Action>
}

export const CompareCriteriaStep = ({ criteria, criteriaOrder, criteriaComparison, prereqs, dispatch }: CompareCriteriaStep) => {
  const [comparing, setComparing] = useState(O.none as O.Option<{ x: Criterion, y: Criterion, xIndex: number, yIndex: number}>)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (O.isNone(comparing) && !complete) {
      gotoNextEmpty()
    }
  })

  console.log('complete', complete)
  console.log('comparing', comparing)

  const gotoNextEmpty = () => {
    if (complete) return
    setComparing(
      O.fold(
        () => {
          setComplete(true)
          return O.none
        },
        ({ x: xIx, y: yIx }: { x: number, y: number }) => O.some({
          x: criteria[criteriaOrder[xIx]],
          y: criteria[criteriaOrder[yIx]],
          xIndex: xIx,
          yIndex: yIx
        })
      )(findEmpty(criteriaComparison))
    )
  }

  const setCell = ({x, y, rating}: SetCriteriaCellParams) => dispatch({
    type: 'setCriteriaCell',
    payload: {
      x,
      y,
      rating
    }
  })

  if (!prereqs[Steps.Goal] && !prereqs[Steps.Criteria]) {
    return <div>You need to set a goal and choose your criteria before you can begin this step.</div>
  }

  if (!prereqs[Steps.Goal]) {
    return <div>You need to set a goal before you can begin this step.</div>
  }

  if (!prereqs[Steps.Criteria]) {
    return <div>You need to choose your criteria before you can begin this step.</div>
  }

  

  return (
    <div className='flex flex-col items-center justify-start h-full'>
      <div
        className='flex max-w-full h-full flex-wrap items-center content-start justify-center pr-8'
      >
        {criteriaOrder.map((id, ix) =>
          <Textcard
            key={id}
            entity={criteria[id]}
            index={ix}
            name='criterion'
            frozen={true}
          />)}
        
      </div>
      <div className='flex flex-col items-center'>
        <MatrixView 
            mtx={criteriaComparison} 
            focus={pipe(
              comparing,
              O.map(({ xIndex, yIndex }) => ({ xIndex, yIndex }))
            )}
          />
        {pipe(
            comparing,
            O.fold(
              () => <p>All done</p>,
              ({ x, y, xIndex, yIndex }) => (
                <Pairwise
                  Element_y={
                    <Textcard
                      entity={x}
                      index={xIndex}
                      name='criterion'
                      frozen={true}
                    />
                  }
                  Element_x={
                    <Textcard
                      entity={y}
                      index={yIndex}
                      name='criterion'
                      frozen={true}
                      />
                    }
                  rate={(rating: number) => setCell({ x: xIndex, y: yIndex, rating })}
                  rating={criteriaComparison[yIndex][xIndex]}
          />
              )
            )
          )}
      </div>
      <button onClick={() => gotoNextEmpty()}>Next</button>
    </div>
  )
}