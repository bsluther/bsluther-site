import * as React from 'react'
import { Progress } from './components/progress'
import { Steps } from './core'

export const App = () => {
  return (
    <div className='w-full h-full bg-neutral-500 text-neutral-100 flex'>

      <div className='w-1/3 bg-neutral-800 h-full'></div>

      <div className='grow h-full'></div>

      <div className='w-1/5 h-full'>
        <Progress 
          currentStep={Steps.Goal}
        />
      </div>

    </div>
  )
}