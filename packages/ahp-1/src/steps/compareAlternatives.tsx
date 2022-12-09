import { useEffect, useState } from 'react'
import { Matrix, Steps } from '../core'
import { areAltsComplete, findEmpty, getCell, isComplete } from '../matrix'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { CardColumn } from '../components/cardColumn'
import { Versus } from '../components/versus'
import { Criteria } from './criteria'
import { NextButton } from '../components/nextButton'

interface Use3dMatrixPositionArgs {
  xLegend: string[]
  yLegend: string[]
  zLegend: string[]
  matrix: Matrix[]
}

// note that dimensions are accessed in the following order: z, y, x
const use3dMatrixPosition = ({ xLegend, yLegend, zLegend, matrix }: Use3dMatrixPositionArgs) => {
  const [x, setX] = useState(null as null | string)
  const [y, setY] = useState(null as null | string)
  const [z, setZ] = useState(null as null | string)
  const [complete, setComplete] = useState(false)

  const compareNextEmpty = () => {
    if (complete) return
    for (let i = 0; i < matrix.length; i++) {
      const res = findEmpty(matrix[i])
      if (O.isSome(res)) {
        setZ(zLegend[i])
        pipe(
          res,
          O.fold(
            () => null,
            ({ x, y }) => {
              setX(xLegend[x])
              setY(yLegend[y])
            }
          )
        )
        setComplete(false)
        return
      }
    }
    setX(null)
    setY(null)
    setZ(null)
    setComplete(true)
  }

  const compare = (id: string) => {
    if (id === x) {
      setX(null)
      return
    }
    if (id === y) {
      setY(null)
      return
    }

    if (!x) {
      setX(id)
      return
    }

    if (!y) {
      setY(id)
      return
    }

    else {
      const prevX = x
      setX(id)
      setY(prevX)
    }


  }

  const pickZ = (id: string) => {
    if (z === id) {
      setZ(null)
      return
    }
    else {
      setZ(id)
    }
  }

  return {
    x,
    xIndex: xLegend.findIndex(id => id === x),
    y,
    yIndex: yLegend.findIndex(id => id === y),
    z,
    zIndex: zLegend.findIndex(id => id === z),
    compareNextEmpty,
    compare,
    pickZ
  }

}



export const CompareAlternatives = () => {
  const {
    alternatives,
    criteria,
    orderedAlternatives,
    orderedCriteria,
    alternativesOrder, 
    alternativeComparisons, 
    criteriaOrder ,
    rateAlternatives,
    gotoStep
  } = useAhpStore(state => ({
    alternatives: state.goal.alternatives,
    criteria: state.goal.criteria,
    orderedAlternatives: state.goal.orderedAlternatives(),
    orderedCriteria: state.goal.orderedCriteria(),
    alternativesOrder: state.goal.alternativesOrder,
    alternativeComparisons: state.comparisons.alternatives,
    criteriaOrder: state.goal.criteriaOrder,
    rateAlternatives: state.comparisons.rateAlternatives,
    gotoStep: state.gotoStep
  }))
  const matrix = criteriaOrder.map(crtId => alternativeComparisons[crtId])
  const { x, y, z, xIndex, yIndex, zIndex, compareNextEmpty, compare, pickZ } = use3dMatrixPosition({
    xLegend: alternativesOrder,
    yLegend: alternativesOrder,
    zLegend: criteriaOrder,
    matrix
  })

  useEffect(() => {
    compareNextEmpty()
  }, [])
  
  console.log('alternativeComparison:', alternativeComparisons[z])
  return (
    <div className='w-full h-full flex'>
      <CardColumn 
        items={orderedAlternatives}
        handleClick={compare}
        focus={[x ?? '', y ?? '']}
        setFocus={() => null}
        allowAppend={false}
      />
      <CardColumn 
        items={orderedCriteria}
        handleClick={(id: string) => pickZ(id)}
        focus={[z ?? '']}
        setFocus={(id: string) => null}
        allowAppend={false}
      />
      <div className='grow flex flex-col items-center justify-center'>
        {z && <span className='text-black'>{criteria[z].title} comparison</span>}
        {x && y && z && 
          <Versus 
            x={x && alternatives[x].title} 
            y={y && alternatives[y].title}
            rating={getCell(xIndex, yIndex, alternativeComparisons[z])}
            rate={(rating) => rateAlternatives({ x: xIndex, y: yIndex, z, rating })}
          />
        }
        <NextButton 
          onClick={() => {
            if (x && y && z) {
              const currentIsEmpty = pipe(
                getCell(xIndex, yIndex, alternativeComparisons[z]),
                O.fold(
                  () => false,
                  rating => rating === 'EMPTY'
                )
              )
              if (currentIsEmpty) {
                rateAlternatives({ x: xIndex, y: yIndex, z, rating: 0})
              }
            }

            if (areAltsComplete(alternativeComparisons)) {
              gotoStep(Steps.Results)
            } else {
              compareNextEmpty()
            }
          }} 
        />
        <div className='h-1/4 w-1/4' />
      </div>
    </div>
  )
}