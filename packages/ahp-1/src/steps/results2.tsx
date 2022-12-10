import { calcFrontierWeights, prepMtx, sum, sumColumns, to3dMatrix, transpose } from '../matrix'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import * as T from 'fp-ts/Tuple'
import { pipe } from 'fp-ts/lib/function'
import { StackedBarChart } from '../components/stackedBarChart'
import { sequenceT } from 'fp-ts/lib/Apply'
import { Ord } from 'fp-ts/lib/string'
import { log } from 'fp-ts/lib/Console'



export const Results2 = () => {
  const {
    alternatives,
    alternativesComparisons,
    alternativesOrder,
    criteria,
    criteriaComparison, 
    criteriaOrder
  } = useAhpStore(state => ({
    alternatives: state.goal.alternatives,
    alternativesComparisons: state.comparisons.alternatives,
    alternativesOrder: state.goal.alternativesOrder,
    criteria: state.goal.criteria,
    criteriaComparison: state.comparisons.criteria,
    criteriaOrder: state.goal.criteriaOrder
  }))

  const criteriaWeights = pipe(
    criteriaComparison,
    prepMtx,
    O.map(calcFrontierWeights)
  )

  const alternativesWeights = pipe(
    to3dMatrix(alternativesComparisons, alternativesOrder, criteriaOrder),
    O.map(A.map(calcFrontierWeights))
  )

  const alternativesData = pipe(
    alternativesWeights,
    O.map(transpose),
    altWeights => sequenceT(O.Apply)(criteriaWeights, altWeights),
    O.map(([crtWeights, altWeights]) =>
      pipe(
        altWeights,
        A.map((altWeights) =>
          pipe(
            crtWeights,
            A.reduceWithIndex([] as { [key: string]: number }[], (crtIx, acc, crt) => 
              acc.concat({ [criteria[criteriaOrder[crtIx]].title.replace(' ', '_')]: Math.trunc(altWeights[crtIx] * crt * 1000) }))
          )
        )
      )
    ),
    O.map(A.mapWithIndex((ix, row) => 
      pipe(
        row,
        A.reduce(
          { alternativeTitle: alternatives[alternativesOrder[ix]].title.replace(' ', '_') },
          // {},
          (acc, x) => ({ ...acc, ...x })
        )
      )

    
    ))
  )

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>

      {pipe(alternativesData, O.fold(() => null,
        altsData =>
          <StackedBarChart
            data={{
              alternativesLabels: alternativesOrder.map(altId => alternatives[altId].title.replace(' ', '_')),
              criteriaLabels: criteriaOrder.map(crt => criteria[crt].title.replace(' ', '_')),
              alternativesData: altsData
            }}
          />
      ))}
      
    </div>
  )
}