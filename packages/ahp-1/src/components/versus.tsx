import { cva } from 'class-variance-authority'
import { Rating } from '../core'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { rebase } from '../matrix'

// Left is <ENGLISH> Right
const ratingToEnglish = (rating: number) => ({
  0: 'equally as important as',
  1: 'moderately more important than',
  2: 'moderately more important than',
  3: 'more important than',
  4: 'more important than',
  5: 'much more important than',
  6: 'much more important than', 
  7: 'extremely important compared to',
  8: 'extremely important compared to',
  [-1]: 'moderately less important than',
  [-2]: 'moderately less important than',
  [-3]: 'less important than',
  [-4]: 'less important than',
  [-5]: 'much less important than',
  [-6]: 'much less important than',
  [-7]: 'extremely unimportant compared to',
  [-8]: 'extremely unimportant compared to'
}[rating] ?? 'ERROR GENERATING ENGLISH DESCRIPTION')

const explainRating = (left: string, right: string, rating: Rating) => {
  if (rating === 'EMPTY') return `You have not yet rated ${left} vs ${right}.`
  else return `${left.toUpperCase()} is ${ratingToEnglish(rating)} ${right.toUpperCase()}`
}

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
              className='accent-neutral-600 w-72 cursor-pointer'
              type='range'
              min={-8}
              max={8}
              step={1}
              value={rating === 'EMPTY' ? 0 : rating}
              onChange={e => rate(parseInt(e.target.value))}
            />
        ))}
      <div className='flex space-x-2'>
          {left && right && pipe(
            rating,
            O.fold(
              () => <span>unrated</span>,
              rating => 
                <div className='flex flex-col items-center text-neutral-800'>
                  <span>Rating: {rating === 'EMPTY' ? 'empty' : rebase(rating)}</span>
                  <span>{explainRating(left, right, rating)}</span>
                </div>
            )
          )}
      </div>
    </form>
  )
}