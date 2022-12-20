import { identity, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { useBreakpoint } from 'ui'
import { Rating, Steps } from '../core'
import { Scorebar } from './scorebar'

interface SliderProps {
  rating: O.Option<Rating>
  rate: (num: number) => void
}

const Slider = ({ rating, rate }: SliderProps) => {
  return (
    pipe(
      rating,
      O.fold(
        () => 
          <input
            className='appearance-none ahp-slider-disabled' // hide the thumb
            type='range'
            min={-8}
            max={8}
            step={1}
            value={0}
            disabled
          />,
        rating =>
          <input
            className='appearance-none ahp-slider'
            type='range'
            min={-8}
            max={8}
            step={1}
            value={rating === 'EMPTY' ? 0 : rating}
            onChange={e => rate(parseInt(e.target.value))}
          />
      )
    )
  )
}

interface ContestantProps {
  title: O.Option<string>
  position: 'TO' | 'AGAINST'
}

const Contestant = ({ title, position }: ContestantProps) => {
  return (
    <div
      className='w-24 sm:w-36 h-12 text-neutral-200 text-xl font-bold rounded-t-md uppercase flex items-center justify-center'
    >{pipe(title, O.fold(
        () => '',
        identity
        // title => `${position}: ${title}`
    ))}
    </div>
  )
}

interface RoundProps {
  round: Steps.CompareCriteria | Steps.CompareAlternatives
  criteria: O.Option<string>
}

const Round = ({ round, criteria }: RoundProps) => {
  if (round === Steps.CompareCriteria) return (
    <h1 className='w-full text-4xl text-center p-4'>Criteria Round</h1>
  )
  return (
    <div className='flex flex-col w-full p-4 space-y-4'>
      <h1 className='text-4xl text-center'>Options Round</h1>
      {pipe(criteria, O.fold(
        () => <span className='h-8' />,
        criteria => <h2 className='text-2xl text-center uppercase'>By "{criteria}"</h2>
      ))}
    </div>
  )
}

interface Versus2Props {
  to: O.Option<string>
  against: O.Option<string>
  rating: O.Option<Rating>
  rate: (num: number) => void
  round: Steps.CompareAlternatives | Steps.CompareCriteria
  criteria: O.Option<string>
}

export const Versus2 = ({ to, against, rating, rate, round, criteria }: Versus2Props) => {
  const { isPastBreakpoint } = useBreakpoint()
  return  (
    <form
      style={{
        boxShadow: isPastBreakpoint('sm') ? '0 0 .2rem .2rem rgba(30 30 30)' : ''
      }}
      className='flex flex-col items-center w-11/12 sm:w-3/4 h-max sm:text-neutral-200 bg-neutral-700 rounded-md'
      onSubmit={e => e.preventDefault()}
    >
      {isPastBreakpoint('sm') && <Round round={round} criteria={criteria} />}
      <div className='w-full flex sm:px-8'>
        <div className='w-max flex flex-col items-center'>
          <Scorebar rating={rating} position='AGAINST' />
          <Contestant title={against} position='AGAINST' />
        </div>
        <div className='grow flex items-center justify-center'>
          <span className='text-neutral-500 font-bold text-4xl sm:text-8xl'>vs</span>
        </div>
        <div className='w-max flex flex-col items-center'>
          <Scorebar rating={rating} position='TO' />
          <Contestant title={to} position='TO' />
        </div>
      </div>
      <div className='bg-neutral-600NO w-full h-16 flex items-center px-4 border-4NO rounded-t-md border-neutral-800'>
        <Slider rating={rating} rate={rate} />
      </div>
    </form>
  )
}