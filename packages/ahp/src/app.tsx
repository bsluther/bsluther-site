import * as React from 'react'
import { v4 as uuid } from 'uuid'
/*
process state:
  choose goal
  choose options
  choose criteria
*/

import { useReducer } from 'react'
import { ChooseGoal } from './components/ChooseGoal'

interface Goal {
  id: string
  description: string
}

interface AppState {
  goal: Goal
}

enum ActionTypes {
  DescribeGoal = 'describeGoal'
}

interface DescribeGoalAction {
  type: 'describeGoal',
  payload: {
    description: string
  }
}

type Action = DescribeGoalAction

const initStore = () => ({
  goal: {
    id: uuid(),
    description: ''
  }
})

const reducer = (state: AppState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case 'describeGoal':
      return { ...state, goal: { ...state.goal, description: payload.description } }

    default: return state
  }
}

export const App = () => {
  const [store, dispatch] = useReducer(reducer, {}, initStore)
  console.log(store)

  return (
    <div className='border border-pink-400 text-neutral-100 w-full h-full flex items-center justify-center'>

        <ChooseGoal 
          goal={store.goal.description} 
          setGoal={str => dispatch({ type: 'describeGoal', payload: { description: str }})} 
        />

    </div>
  )
}