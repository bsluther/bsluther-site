import * as React from 'react'
import { CheckCircleSvg, CheckSvg } from 'ui'

export const ChooseGoal = ({ goal, setGoal }: { goal: string, setGoal: (str: string) => void }) => {


  return (
    <div className='border border-green-400 w-max p-8 rounded-md flex flex-col justify-center items-center space-y-4'>
      <h1 className='text-green-400'>What's your goal?</h1>
      <textarea 
        className='bg-green-400 opacity-50 rounded-md outline-none text-black placeholder:text-neutral-600 p-2 w-72 h-max text-center' 
        placeholder='choose a name for my cat' 
      />
      <CheckCircleSvg className='w-10 h-10 text-green-400 hover:fill-green-400/25 cursor-pointer' strokeWidth={1} />
    </div>
  )
}