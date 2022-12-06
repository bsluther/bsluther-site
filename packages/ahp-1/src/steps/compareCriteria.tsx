import { useEffect } from 'react'
import { CardColumn } from '../components/cardColumn'
import { NextButton } from '../components/nextButton'
import { Versus } from '../components/versus'
import { Steps } from '../core'
import { getCell, isComplete } from '../matrix'
import { useAhpStore } from '../store'
import { useMatrixPosition } from '../useMatrixPosition'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'

export const CompareCriteria = () => {
  const { 
    alternatives, 
    criteria, 
    orderedCriteria, 
    criteriaOrder, 
    criteriaStepComplete, 
    criteriaComparison, 
    rateCriteria,
    gotoStep
  } = useAhpStore(state => ({
    alternatives: state.goal.orderedAlternatives(),
    criteria: state.goal.criteria,
    orderedCriteria: state.goal.orderedCriteria(),
    criteriaOrder: state.goal.criteriaOrder,
    criteriaStepComplete: state.isStepComplete(Steps.Criteria),
    criteriaComparison: state.comparisons.criteria,
    rateCriteria: state.comparisons.rateCriteria,
    gotoStep: state.gotoStep
  }))
  const { x, y, xIndex, yIndex, compare, compareNextEmpty } = useMatrixPosition(criteriaOrder, criteriaComparison)
  
  console.log(criteriaComparison)

  if (!criteriaStepComplete) {
    return <div>You must chose 2 or more criteria before you can compare them.</div> 
  }

  useEffect(() => {
    compareNextEmpty()
  }, [])

  return (
    <div className='w-full h-full flex'>
      <CardColumn 
        items={alternatives}
        handleClick={() => null}
        focus={[]}
        setFocus={() => null}
        allowAppend={false}
      />
      <CardColumn 
        items={orderedCriteria}
        handleClick={(id: string) => compare(id)}
        focus={[x ?? '', y ?? '']}
        setFocus={(id: string) => null}
        allowAppend={false}
      />
      <div className='grow flex flex-col items-center justify-center'>
        <Versus 
          left={x && criteria[x].title} 
          right={y && criteria[y].title}
          rating={getCell(xIndex, yIndex, criteriaComparison)}
          rate={(rating) => rateCriteria({ x: xIndex, y: yIndex, rating })}
        />
        <div className='h-1/4 w-1/4' />1
        <NextButton onClick={() => {
          const currentIsEmpty = pipe(
            getCell(xIndex, yIndex, criteriaComparison),
            O.fold(
              () => false,
              rating => rating === 'EMPTY'
            )
          )
          if (currentIsEmpty) {
            rateCriteria({ x: xIndex, y: yIndex, rating: 0 })
          }
          if (isComplete(criteriaComparison)) {
            gotoStep(Steps.CompareAlternatives)
          } else {
            compareNextEmpty()
          }
        }}/>
      </div>
    </div>
  )
}