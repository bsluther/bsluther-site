import { Matrix, Rating } from './core'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { concat } from 'fp-ts/lib/Array'

export interface SetCellParams {
  x: number
  y: number
  rating: number
}

export const incrementDimension = (mtx: Matrix): Matrix =>
  mtx.map(row => [...row, 'EMPTY' as 'EMPTY'])
  .concat([new Array(mtx.length).fill('EMPTY' as 'EMPTY', 0, mtx.length).concat(1)])

export const removeIndex = (ix: number) => (mtx: Matrix) =>
  mtx.slice(0, ix).concat(mtx.slice(ix + 1)).map(row => row.slice(0, ix).concat(row.slice(ix + 1)))

export const findEmpty = (mtx: Matrix) => {
  let result
  for (let i = 0; i < mtx.length; i++) {
    for (let k = 0; k < mtx[i].length; k++) {
      if (mtx[i][k] === 'EMPTY') {
        result = ({ x: k, y: i })
        break
      }
    }
    if (result) {
      break
    }
  }
  return result ? O.some(result) : O.none
}

const updateIndex = <T>(updater: (el: T) => T) => (ix: number) => (arr: T[]) => {
  const left = arr.slice(0, ix)
  const right = arr.slice(ix + 1)
  const newEl = [updater(arr[ix])]

  return pipe(
  	left,
    concat(newEl),
    concat(right)
  )
}

export const getCell = <T,>(x: number, y: number, matrix: T[][]): O.Option<T> => {
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

export const setCell = ({ x, y, rating}: SetCellParams) => (mtx: Matrix) => {
  return updateIndex<Rating[]>(row => updateIndex<Rating>(() => rating)(x)(row))
                              (y)
                              (mtx)
}

export const setCellAndReciprocal = ({ x, y, rating }: SetCellParams) => (mtx: Matrix) =>
  pipe(
    mtx,
    setCell({ x, y, rating }),
    setCell({ x: y, y: x, rating: -rating })
  )

export const createMatrix = (n: number): Matrix => 
   new Array(n).fill('').map((_, ix_a) => {
    return new Array(n).fill('EMPTY').map((el, ix_b) => ix_a === ix_b ? 1 : 'EMPTY')
  })

