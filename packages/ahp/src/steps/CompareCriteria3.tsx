import { Action, SetCriteriaCellParams } from '../appReducer'
import { Criteria, Matrix, Rating, Steps } from '../core'
import { useEffect } from 'react'
import { ChevronLeftSvg, ChevronRightSvg } from 'ui'
import { useMatrixPosition } from '../useMatrixPosition'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'

interface CompareCriteriaStep {
  criteria: Criteria
  criteriaOrder: string[]
  criteriaComparison: Matrix
  prereqs: {
    [Steps.Goal]: boolean
    [Steps.Criteria]: boolean
  },
  setCriteriaCell: (args: SetCriteriaCellParams) => void
}

const Range = ({ rating, update }: { rating: Rating, update: (rating: number) => void }) => {
  return (
    <input
      className='accent-neutral-400'
      type='range'
      min={-8}
      max={8}
      step={1}
      value={rating === 'EMPTY' ? 0 : rating}
      onChange={e => {
        update(parseFloat(e.target.value))
      }}
    />
  )
}

const getCell = <T,>(x: number, y: number, matrix: T[][]): O.Option<T> => {
  if (x === -1 || y === -1) {
    return O.none
  }
  if (!(matrix.length > y)) {
    return O.none
  }
  const row = matrix[y]
  if (!(row.length > x)) {
    return O.none
  }
  return O.some(row[x])
}

export const CompareCriteria3 = ({ criteria, criteriaOrder, criteriaComparison, prereqs, setCriteriaCell }: CompareCriteriaStep) => {
  const { x, y, xIndex, yIndex, compare, compareNextEmpty } = useMatrixPosition(criteriaOrder, criteriaComparison)


  console.log(criteriaComparison)

  useEffect(() => {
    compareNextEmpty()
  }, [])

  return (
    <div
      className='w-full h-full flex flex-col items-center'
    >
      <div className='flex space-x-4'>
        <span>Criteria:</span>
        {criteriaOrder.map(id =>
          <span
            key={id}
            className={`cursor-pointer px-1 rounded-sm
              ${id === x ? 'outline outline-red-400' : ''}
              ${id === y ? 'outline outline-red-400' : ''}
            `}
            onClick={() => compare(id)}
          >{criteria[id].description}</span>
        )}
      </div>

      <div className='flex flex-col grow items-center justify-center'>
        <div className='flex flex-col border border-red-400 rounded-sm p-8 space-y-8'>
          <div className='flex items-center space-x-8'>
            <div className='flex flex-col items-center'>
              <span>{x ? criteria[x].description : '...'}</span>
            </div>
            <span className='text-red-400'>vs</span>
            <div className='flex flex-col items-center'>
              <span>{y ? criteria[y].description : '...'}</span>
            </div>
          </div>
          {pipe(
            getCell(xIndex, yIndex, criteriaComparison),
            O.fold(
              () => null,
              (rating) =>
              <Range 
                rating={rating}
                update={rating => setCriteriaCell({ x: xIndex, y: yIndex, rating })}
              />
            )
          )}
        </div>
      <span className='h-12' />
      <button 
        className='flex items-center border rounded-md px-2 py-1'
        onClick={compareNextEmpty}
      >
        Next
        <ChevronRightSvg className='w-6 h-6' />
      </button>
      </div>

    </div>
  )
}