import { useState } from 'react'
import { Matrix } from '../core'
import { findEmpty, getCell } from '../matrix'
import { useAhpStore } from '../store'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { CardColumn } from '../components/cardColumn'
import { Versus } from '../components/versus'
import { Criteria } from './criteria'

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
    criteriaOrder 
  } = useAhpStore(state => ({
    alternatives: state.goal.alternatives,
    criteria: state.goal.criteria,
    orderedAlternatives: state.goal.orderedAlternatives(),
    orderedCriteria: state.goal.orderedCriteria(),
    alternativesOrder: state.goal.alternativesOrder,
    alternativeComparisons: state.comparisons.alternatives,
    criteriaOrder: state.goal.criteriaOrder
  }))
  const matrix = criteriaOrder.map(crtId => alternativeComparisons[crtId])
  const { x, y, z, xIndex, yIndex, zIndex, compareNextEmpty, compare, pickZ } = use3dMatrixPosition({
    xLegend: alternativesOrder,
    yLegend: alternativesOrder,
    zLegend: criteriaOrder,
    matrix
  })

  

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
        {z && <span className='text-black'>Criteria: {criteria[z].title}</span>}
        {x && y && z && 
          <Versus 
            left={x && alternatives[x].title} 
            right={y && alternatives[y].title}
            rating={getCell(xIndex, yIndex, alternativeComparisons[z])}
            // rate={(rating) => rateCriteria({ x: xIndex, y: yIndex, rating })}
          />
        }
        <div className='h-1/4 w-1/4' />
      </div>
      <button
        onClick={compareNextEmpty}
      >Next</button>
    </div>
  )
}