import { useEffect, useState } from 'react'
import { debounce } from '../util/debounce'

const breakpoints = [
  ['sm', 640],
  ['md', 768],
  ['lg', 1024],
  ['xl', 1280],
  ['2xl', 1536]
] as [string, number][]

// const debounce = (fn: )

const calcBreakpoint = (w: number) => {
  let breakpoint = 'xs'
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const [bp, lowerBound] = breakpoints[i]
    const [, upperBound] = breakpoints[i + 1]
    if (lowerBound <= w && w < upperBound) {
      breakpoint = bp
      break
    } else if (1536 < w) {
      breakpoint = '2xl'
    }
  }
  return breakpoint
}

const breakpointsTable = {
  'xs': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
}

type Breakpoint =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'

const isPastBreakpoint = (w: number) => (bp: Breakpoint) => {
  return breakpointsTable[bp] <= w
}

export const useBreakpoint = () => {
  const [currWidth, setCurrWidth] = useState(0)

  useEffect(() => {
    const resizeHandler = () => {
      setCurrWidth(window.innerWidth)
    }
    resizeHandler()
    window.addEventListener('resize', debounce(resizeHandler, 50))

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return ({
    breakpoint: calcBreakpoint(currWidth),
    isPastBreakpoint: isPastBreakpoint(currWidth)
  })
  // return calcBreakpoint(currWidth)
}