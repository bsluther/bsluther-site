import { AlternativesComparisons, Matrix, Rating } from './core'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
import { concat, reduce } from 'fp-ts/lib/Array'
import { reduce as reduceRecord } from 'fp-ts/lib/Record'
import { Ord } from 'fp-ts/lib/string'
import * as E from 'fp-ts/Either'

export interface SetCellParams {
  x: number
  y: number
  rating: number
}

export interface RateAlternativesParams {
  x: number
  y: number
  z: string
  rating: number
}

// RENAME TO incrementN
export const incrementDimension = (mtx: Matrix): Matrix =>
  mtx.map(row => [...row, 'EMPTY' as 'EMPTY'])
  .concat([new Array(mtx.length).fill('EMPTY' as 'EMPTY', 0, mtx.length).concat(0)])

export const removeIndex = (ix: number) => (mtx: Matrix) =>
  mtx.slice(0, ix).concat(mtx.slice(ix + 1)).map(row => row.slice(0, ix).concat(row.slice(ix + 1)))

export const findEmpty = (mtx: Matrix) => {
  let result
  // i is countings rows eg y
  // k is counting columns eg x
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

// export const setCell = ({ x, y, rating }: SetCellParams) => (mtx: Matrix) => {
//   let result = [...mtx]
//   const row = [...mtx[y]]
//   row[x] = rating
//   result[y] = row
//   return result
// }

export const setCellAndReciprocal = ({ x, y, rating }: SetCellParams) => (mtx: Matrix) =>
  pipe(
    mtx,
    setCell({ x, y, rating }),
    setCell({ x: y, y: x, rating: -rating })
  )

export const createMatrix = (n: number): Matrix => 
   new Array(n)
      .fill('')
      .map((_, ix_a) => {
    return new Array(n)
               .fill('EMPTY')
               .map((_, ix_b) => ix_a === ix_b ? 0 : 'EMPTY')
  })


export const isComplete = (mtx: Matrix): mtx is number[][] =>
  pipe(
    mtx,
    reduce(
      true,
      (acc, row) =>
        acc && pipe(
          row,
          reduce(
            true,
            (acc, x) => acc && typeof x === 'number'
          )
        )
    )
  )

export const areAltsComplete = (alts: AlternativesComparisons) =>
  pipe(
    alts,
    reduceRecord(Ord)(
      true,
      (acc, mtx) => acc && isComplete(mtx)
    )
  )


/***** DATA PREP *****/

export const to3dMatrix = (altComps: AlternativesComparisons, altOrder: string[], critOrder: string[]) => {
  const n_row = altOrder.length
  const n_col = critOrder.length
 

  if (Object.keys(altComps).length !== n_col) {
    console.error('Number of alternative comparison matrices should be equal to the number of criteria.')
  }

  const altCompSizes = pipe(
    Object.values(altComps),
    A.map(mtx => mtx.length),
    A.reduce(
      O.some(n_row),
      (acc, rowSize) =>
        pipe(
          acc,
          O.chain(size => rowSize === size ? O.some(size) : O.none)
        )
    )
  )

  if (O.isNone(altCompSizes)) {
    // console.log('altCompNs', altCompNs)
    // console.log('n_row', n_row)
    console.error('Number of items in each alternative comparison matrix should be equal to the number of alternatives.')
  }

  const mtx = critOrder.map(critId => prepMtx(altComps[critId]))
  return A.sequence(O.Applicative)(mtx)
}

const negToReciprocal = (x: number) =>
  (1 / Math.abs(x))

export const rebase = (x: number) => {
  if (x > 0) return x + 1
  if (x < 0) return negToReciprocal(x - 1)
  else return 1
}

export const prepMtx = (mtx: Matrix) =>
  isComplete(mtx)
    ? O.some(mtx.map(mtx => mtx.map(rebase)))
    : O.none

/***** RESULT CALCULATION *****/

const product = (nums: number[]) => 
  nums.reduce((acc, x) => acc * x, 1)

export const sum = (nums: number[]) =>
	nums.reduce((acc, x) => acc + x, 0)

const nthRoot = (n: number) => (x: number) => 
  Math.pow(x, 1 / n)

const geoMean = (nums: number[]) => {
  const n = nums.length
  return nthRoot(n)(product(nums))
}

// returns vector of weights
export const calcFrontierWeights = (mtx: number[][]) => {
  const geoMeans = mtx.map(geoMean)
  // console.log('geoMeans', geoMeans)
  const meanSum = sum(geoMeans)
  // console.log('meanSum', meanSum)
  const normalizedMeans = geoMeans.map(geoMean => geoMean / meanSum)
  return normalizedMeans
}

export const calcAltResult = (mtx3: number[][][]) => {
  return pipe(
    mtx3,
    A.map(calcFrontierWeights)
  )
}

const sumVectors = (v1: number[], v2: number[]) => {
  const n = v1.length
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(v1[i] + v2[i])
  }
  return result
}

const multiplyVectors = (v1: number[], v2: number[]) => {
  const n = v1.length
  let result = []
  for (let i = 0; i < n; i++) {
    result.push(v1[i] * v2[i])
  }
  return result
}

export const sumColumns = (mtx: number[][]): number[] => {
  const row_length = mtx[0].length
  return mtx.reduce(
    (acc, row) => sumVectors(acc, row),
    new Array(row_length).fill(0) as number[]
  )
}

export const applyWeights = (mtx: number[][], weights: number[]) => {
  const row_n = mtx[0].length
  return mtx.reduce(
    (acc, row, ix) => row.map(el => el * weights[ix]),
    new Array(row_n).fill(1)
  )
}

// Should figure out why this works, bit confused, but moving on
export const transpose = (mtx: number[][]) => {
  const m = mtx.length
  const n = mtx[0].length
  let result = []
  for (let i = 0; i < n; i++) {
    let newRow = []
    for (let j = 0; j < m; j++) {
      newRow.push(mtx[j][i])
    }
    result.push(newRow)
  }
  return result
}

export const matrixProduct = (A: number[][]) => (B: number[][]): E.Either<string, number[]> => {
  // should check if they are matrices
  // should check if they have consistent order
  console.log('A: ', A)
  console.log('B: ', B)
  const n = A[0].length
  if (n !== B.length) {
  	return E.left('The number of columns in A must equal the number of rows in B.') 
	}
  
  const m = A.length
  const p = B[0].length
  const result = new Array(m).fill([]).map(row => new Array(p).fill(0))
  // result will be a m x p matrix
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      let entry = 0
      for (let k = 0; k < n; k++) {
        entry += A[i][k] * B[k][j]
      }
      result[i][j] = entry
    }
  }

  return E.right(result.flat(1))
}

const log = <T>(x: T) => {
  console.log('LOG', x)
  return x
}
export const weight = (cWeight: number[], aWeights: number[][]) => {
  return pipe(
    aWeights,
    matrixProduct([cWeight])
  )
}