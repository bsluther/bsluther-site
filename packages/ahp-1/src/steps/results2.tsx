import { calcFrontierWeights, prepMtx, to3dMatrix, transpose } from '../matrix'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
import { Datum, StackedBarChart, } from '../components/stackedBarChart'
import { sequenceT } from 'fp-ts/lib/Apply'
import { cva } from 'class-variance-authority'
import { useState } from 'react'
import { BarChart } from '../components/barChart'


const viewButton = cva(['bg-neutral-700 px-2 py-1 rounded-md'], {
  variants: {
    active: {
      true: 'text-green-400/90 outline outline-2 outline-green-400/90',
      false: 'text-neutral-100'
    }
  }
})

const toSnake = (str: string) => str.replaceAll(' ', '_')


export const Results2 = () => {
  const [viewing, setViewing] = useState('criteria' as 'criteria' | 'alternatives')
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
          { 
            alternativeTitle: alternatives[alternativesOrder[ix]].title.replace(' ', '_') 
          } as Datum,
          (acc, x) => ({ ...acc, weights: { ...acc.weights, ...x } })
        )
      )

    
    ))
  )

  // const toIterable = (obj: Record<string, number>)
  

  
  return (
    <div className='flex flex-col items-center justify-start w-full h-full'>
      <div className='flex py-4 space-x-4'>
        <button className={viewButton({ active: viewing === 'criteria' })} onClick={() => setViewing('criteria')}>Criteria Weights</button>
        <button className={viewButton({ active: viewing === 'alternatives' })} onClick={() => setViewing('alternatives')}>Option Results</button>
      </div>

      {viewing === 'criteria' && pipe(criteriaWeights, O.fold(() => null,
        crtWeights =>
          <BarChart
            criteriaTitles={criteriaOrder.map(crt => toSnake(criteria[crt].title))}
            data={crtWeights.map((weight, ix) => ({ criteriaTitle: toSnake(criteria[criteriaOrder[ix]].title), weight }))}
          />
      ))}

      {viewing === 'alternatives' && pipe(alternativesData, O.fold(() => null,
        altsData =>
          <StackedBarChart
            alternativesLabels={alternativesOrder.map(altId => alternatives[altId].title.replace(' ', '_'))}
            criteriaLabels={criteriaOrder.map(crt => criteria[crt].title.replace(' ', '_'))}
            data={altsData}
          />
      ))}
      
    </div>
  )
}