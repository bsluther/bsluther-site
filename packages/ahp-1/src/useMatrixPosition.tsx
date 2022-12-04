import { findEmpty } from './matrix'
import { Matrix } from './core'
import * as O from 'fp-ts/Option'
import { useState } from 'react'
import { pipe } from 'fp-ts/lib/function'

export const useMatrixPosition = (orderedIds: string[], matrix: Matrix) => {
  const [comparingX, setComparingX] = useState(null as null | string)
  const [comparingY, setComparingY] = useState(null as null | string)
  const [complete, setComplete] = useState(false)

  const compareNextEmpty = () => {
    if (complete) return
    const nextEmpty = findEmpty(matrix)
    pipe(
      nextEmpty,
      O.fold(
        () => {
          setComparingX(null)
          setComparingY(null)
          setComplete(true)
        },
        ({ x, y }) => {
          setComplete(false)
          setComparingX(orderedIds[x])
          setComparingY(orderedIds[y])
        }
      )
    )
  }

  const compare = (id: string) => {
    if (comparingX === id) {
      setComparingX(null)
      return
    }
    if (comparingY === id) {
      setComparingY(null)
      return
    }
    if (!comparingX) {
      setComparingX(id)
      return
    }
    if (!comparingY) {
      setComparingY(id)
      return
    }
    else {
      const prevX = comparingX
      setComparingX(id)
      setComparingY(prevX)
    }
  }

  return ({
    x: comparingX,
    y: comparingY,
    xIndex: orderedIds.findIndex(id => id === comparingX),
    yIndex: orderedIds.findIndex(id => id === comparingY),
    compare,
    compareNextEmpty
  })
}
