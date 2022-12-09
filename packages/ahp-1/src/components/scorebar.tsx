import { Rating } from '../core'

interface LightProps {
  on: boolean
}
const Light = ({ on }: LightProps) => {
  return (
    <div className={`w-12 h-2 ${on ? 'bg-red-400' : 'bg-neutral-400'} drop-shadow-lg transition-opacity`} />
  )
}

interface ScorebarProps {
  rating: Rating
}

const to16 = (rating: Rating) => {
  if (rating === 'EMPTY' || rating === 0) return 8
  return 8 + rating
}

export const Scorebar = ({ rating }: ScorebarProps) => {
  const score = to16(rating)
  console.log('score', score)
  const bars = new Array(16).fill(8).map((_, ix) => (ix) < score).reverse()
  console.log(bars)
  return (
    <div className='flex flex-col w-max space-y-1 p-4 bg-neutral-900'>
      {bars.map((on, ix) => <Light key={ix} on={on} />)}
    </div>
  )
}