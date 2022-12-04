import { useEffect } from 'react'
import { CardColumn } from '../components/cardColumn'
import { Versus } from '../components/versus'
import { Steps } from '../core'
import { getCell } from '../matrix'
import { useAhpStore } from '../store'
import { useMatrixPosition } from '../useMatrixPosition'

export const CompareCriteria = () => {
  const { alternatives, criteria, orderedCriteria, criteriaOrder, criteriaStepComplete, criteriaComparison, rateCriteria } = useAhpStore(state => ({
    alternatives: state.goal.orderedAlternatives(),
    criteria: state.goal.criteria,
    orderedCriteria: state.goal.orderedCriteria(),
    criteriaOrder: state.goal.criteriaOrder,
    criteriaStepComplete: state.isStepComplete(Steps.Criteria),
    criteriaComparison: state.comparisons.criteria,
    rateCriteria: state.comparisons.rateCriteria
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
          // rating={criteriaComparison[yIndex][xIndex]}
          rate={(rating) => rateCriteria({ x: xIndex, y: yIndex, rating })}
        />
        <div className='h-1/4 w-1/4' />
      </div>
    </div>
  )
}