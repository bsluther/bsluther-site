import { useState } from 'react'
import { CheckCircleSvg } from 'ui'
import { cva } from 'class-variance-authority'

const button = cva(['w-10 h-10'], {
  variants: {
    valid: {
      true: 'text-green-400 hover:fill-green-400/25 cursor-pointer',
      false: 'text-neutral-600 hover:fill-red-400/25 cursor-pointer'
    }
  }
})

export const textareaCva = cva(['bg-green-400/50 rounded-md outline-none text-neutral-100 placeholder:text-neutral-600 p-2 w-72 h-max text-center'])

export const ChooseGoal = ({ goal, setGoal }: { goal: string, setGoal: (str: string) => void }) => {
  const [newGoal, setNewGoal] = useState(goal)
  const [invalidated, setInvalidated] = useState(false)
  const [saved, setSaved] = useState(false)
  // console.log('invalidated', invalidated)

  const tooShort = newGoal.length < 3

  const handleSaveGoal = (str: string) => {
    if (tooShort) {
      setInvalidated(true)
    } else {
      setInvalidated(false)
      setGoal(str)
      setSaved(true)
    }
  }

  return (
    <div className='relative w-full h-full'>
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 border border-green-400 w-max h-max px-8 py-4 rounded-md flex flex-col justify-center items-center space-y-4`}>
        <h1 className='text-green-400'>What's your goal?</h1>
        <textarea 
          className={textareaCva()}
          spellCheck={false}
          placeholder='choose a name for my cat'
          value={newGoal}
          onChange={e => {
            setNewGoal(e.target.value)
            setInvalidated(false)
          }}
        />
        <div className='w-max h-max relative'>
          <CheckCircleSvg 
            className={button({ valid: newGoal.length > 2})} 
            strokeWidth={1} 
            onClick={() => handleSaveGoal(newGoal)}
          />
          {invalidated && tooShort &&
            <div
              className='absolute left-full top-0 flex w-48 text-sm text-center bg-neutral-600 px-1 rounded-md translate-x-4'
            >Your goal must be at least 3 characters long.</div>}
        </div>
      </div>
    </div>
  )
}