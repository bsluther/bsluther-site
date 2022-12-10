import { Rating } from '../core'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
import { cva } from 'class-variance-authority'

const to16 = (postion: 'TO' | 'AGAINST') => (rating: Rating) => {
  if (rating === 'EMPTY' || rating === 0) return 8
  return postion === 'AGAINST'
    ? 8 - rating
    : 8 + rating
}


const bars = (score: number) =>
  new Array(16).fill(8).map((_, ix) => (ix) < score).reverse()

interface LightProps {
  on: boolean
}
const Light = ({ on }: LightProps) => {
  return (
    <div className={`w-12 h-2 ${on ? 'bg-red-400' : 'bg-neutral-400'} drop-shadow-lg transition-opacity`} />
  )
}

const light = cva(['w-12 h-2 transition-colors duration-500 ease-in-out'], {
  variants: {
    status: {
      on: 'bg-red-400',
      off: 'bg-red-400/30',
      disabled: 'bg-neutral-400/50'
    },
    // disabled: {
    //   true: 'bg-neutral-400',
    //   false: ''
    // }
  }
})





interface ScorebarProps {
  rating: O.Option<Rating>
  position: 'TO' | 'AGAINST'
}

export const Scorebar = ({ rating, position }: ScorebarProps) => {
  // const score = to16(rating)
  // console.log('score', score)
  // const bars = new Array(16).fill(8).map((_, ix) => (ix) < score).reverse()
  // console.log(bars)
  return (
    <div className='flex flex-col w-max space-y-1 p-4 bg-neutral-600NO rounded-t-sm'>
      {pipe(
        rating,
        O.fold(
          () => new Array(16).fill(0).map((el, ix) =>
            <div key={ix} className={light({ status: 'disabled' })} />
          ),
          rating => pipe(
            rating,
            to16(position),
            bars,
            A.mapWithIndex((ix, on) => 
              <div key={ix} className={light({ status: on ? 'on' : 'off' })} />)
          )

        )
      )}
      {/* {bars.map((on, ix) => <Light key={ix} on={on} />)} */}
    </div>
  )
}