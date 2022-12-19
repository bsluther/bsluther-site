import { append, reduce } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { Criterion, Matrix, Steps } from '../core'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { calcFrontierWeights, prepMtx, to3dMatrix, weight } from '../matrix'
import { sequenceT } from 'fp-ts/lib/Apply'
import { Card } from '../components/cardColumn'


const prevSteps = [Steps.Goal, Steps.Alternatives, Steps.Criteria, Steps.CompareCriteria, Steps.CompareCriteria]
const incompleteSteps = (isStepComplete: (step: Steps) => boolean) =>
  pipe(
    prevSteps,
    reduce(
      [] as Steps[],
      (acc, step) => isStepComplete(step) ? acc : append(step)(acc)
    )
  )
interface CriteriaResultProps {
  criteriaComparison: Matrix
  orderedCriteria: Criterion[]
}
const CriteriaResult = ({ criteriaComparison, orderedCriteria }: CriteriaResultProps) => {
  const preppedCritiera = prepMtx(criteriaComparison)
  const weights = pipe(
    preppedCritiera,
    O.map(calcFrontierWeights),
    O.map(A.mapWithIndex((ix, rowWeight) => [orderedCriteria[ix].title, rowWeight.toFixed(3).toString()]))
  )

  return (
    <div className='flex flex-col space-y-2'>
      <h1 className='text-xl text-neutral-900'>Criteria Weights:</h1>
      {pipe(
        weights,
        O.fold(
          () => <span>Criteria Result Calculation Error</span>,
          weights =>
            <div className='flex flex-col space-y-2'>
              {weights.map(([title, weight]) => 
                <div 
                  key={title}
                  className='flex items-center space-x-2' 
                >
                  <Card title={title} contentType='criteria' />
                  <span className='text-neutral-900'>{weight}</span>
                </div>
              )}
            </div> 
        )
      )}
    </div>
  )
}
interface AlternativesResult {
  criteriaWeights: O.Option<number[]>
}
const AlternativesResult = ({ criteriaWeights }: AlternativesResult) => {
  const {
    alternativeComparisons,
    alternativesOrder,
    criteriaOrder,
    orderedAlternatives,
  } = useAhpStore(state => ({
    alternativeComparisons: state.comparisons.alternatives,
    alternativesOrder: state.goal.alternativesOrder,
    criteriaOrder: state.goal.criteriaOrder,
    orderedAlternatives: state.goal.orderedAlternatives()
  }))

  const altWeights = pipe(
    to3dMatrix(alternativeComparisons, alternativesOrder, criteriaOrder),
    O.map(A.map(calcFrontierWeights))
  )

  const result = pipe(
    sequenceT(O.Applicative)(criteriaWeights, altWeights),
    O.map(([cWeights, aWeights]) => weight(cWeights, aWeights)),
    O.map(O.fromEither),
    O.flatten,
    O.map(
      A.mapWithIndex((ix, result) => [orderedAlternatives[ix].title, result.toFixed(3).toString()])
    )
  )
  console.log(result)

  return (
    <div className='flex flex-col space-y-2'>
      <h1 className='text-xl text-neutral-900'>Results:</h1>
      {pipe(
        result,
        O.fold(
          () => [<span>Error</span>],
          A.map(([title, result]) => (
            <div 
              key={title}
              className='flex items-center space-x-2' 
            >
              <Card title={title} contentType='alternatives' />
              <span className='text-neutral-900'>{result}</span>
            </div>
          ))
        )
      )}
    </div>
  )
}

export const Results = () => {
  const { 
    isStepComplete,
    criteriaComparison,
    orderedCriteria,
    alternativesComparisons,
    criteriaOrder,
    alternativesOrder
  } = useAhpStore(state => ({
    isStepComplete: state.isStepComplete,
    criteriaComparison: state.comparisons.criteria,
    orderedCriteria: state.goal.orderedCriteria(),
    alternativesComparisons: state.comparisons.alternatives,
    criteriaOrder: state.goal.criteriaOrder,
    alternativesOrder: state.goal.alternativesOrder
  }))

  const incomplete = incompleteSteps(isStepComplete)

  // if (incomplete.length > 0) {
  //   return <Incomplete incomplete={incomplete} />
  // }

  const preppedCritiera = prepMtx(criteriaComparison)
  const criteriaWeights = pipe(
    preppedCritiera,
    O.map(calcFrontierWeights)
  )

  console.log('mtx: ', to3dMatrix(alternativesComparisons, alternativesOrder, criteriaOrder))

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-start space-y-12 p-12'    
    >
      {/* <div>unprepped</div>
      <MatrixView
        labels={orderedCriteria.map(crt => crt.title)}
        focus={O.none}
        goto={() => null}
        mtx={criteriaComparison}
      />
      {pipe(
        preppedCritiera,
        O.fold(
          () => <span>incomplete matrix</span>,
          (mtx) => 
            <MatrixView 
              labels={orderedCriteria.map(crt => crt.title)}
              focus={O.none}
              goto={() => null}
              mtx={mtx}
            />
        )
      )} */}
      <CriteriaResult
        criteriaComparison={criteriaComparison}
        orderedCriteria={orderedCriteria}
      />
      <AlternativesResult
        criteriaWeights={criteriaWeights}
      />
    </div>
  )
}