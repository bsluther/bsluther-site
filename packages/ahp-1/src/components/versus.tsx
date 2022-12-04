import { cva } from 'class-variance-authority'
import { Rating } from '../core'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'


interface VersusProps {
  left: string | null
  right: string | null
  rating: O.Option<Rating>
  rate: (num: number) => void
}

const contestant = cva(['w-32 h-20 bg-neutral-600 flex items-center justify-center'])



export const Versus = ({ left, right, rate, rating }: VersusProps) => {
  console.log('rating', rating)
  return (
    <form 
      className='flex flex-col items-center space-y-4'
      onSubmit={e => e.preventDefault()}
    >
      <div className='flex items-center space-x-4'>
        <span className={contestant()}>{left}</span>
        <span className='text-red-700'>vs.</span>
        <span className={contestant()}>{right}</span>
      </div>
      {pipe(
        rating, 
        O.fold(
          () => <></>,
          (rating) => 
            <input
              className='accent-neutral-600 w-full cursor-pointer'
              type='range'
              min={-8}
              max={8}
              step={1}
              value={rating === 'EMPTY' ? 0 : rating}
              onChange={e => rate(parseInt(e.target.value))}
            />
        ))}
    </form>
  )
}