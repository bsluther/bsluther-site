import { useState } from 'react'
import { PlusSvg, XCircleSvg } from 'ui'
import { Action } from '../appReducer'
import { Alternative, Alternatives } from '../core'

// add
// edit
// delete
// finish

interface AlternativeProps {
  alternative: Alternative
  dispatch: React.Dispatch<Action>
  index: number
}
const Alternative = ({ alternative, dispatch, index }: AlternativeProps) => {
  const [hovered, setHovered] = useState(false) 

  return (
    <div 
      className='relative flex flex-col justify-center items-center m-4'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='text-green-400'>Alternative #{index + 1}</div>
      <textarea
        placeholder='describe your alternative'
        spellCheck={false}
        className='bg-neutral-900 border border-green-400 rounded-md outline-none text-neutral-100 placeholder:text-neutral-600 p-2 w-36 h-36 text-center text-sm'
        onChange={e => dispatch({
          type: 'updateAlternative',
          payload: { id: alternative.id, description: e.target.value } 
        })}
        value={alternative.description}
      />
      {hovered && 
        <XCircleSvg 
          className='absolute top-0 right-0 translate-x-1/2 translate-y-1/2 fill-neutral-900 w-6 h-6 text-red-400 cursor-pointer' 
          onClick={() => dispatch({ type: 'removeAlternative', payload: { id: alternative.id }})}
        />}
    </div>
  )
}

interface LastAlternativeProps extends AlternativeProps {
  addAlternative: () => void
}

const LastAlternative = ({ alternative, dispatch, index, addAlternative }: LastAlternativeProps) => {
  return (
    <div className='flex items-center'>
      <Alternative 
        alternative={alternative}
        dispatch={dispatch}
        index={index}
      />
      <PlusSvg 
        className={`w-10 h-10 text-green-400 translate-y-[8px] cursor-pointer`} 
        onClick={addAlternative} 
      />
    </div>
  )
}

const NoTextcards = ({ addCard }: { addCard: () => void }) =>
  <div className='flex items-center h-48'>
    <PlusSvg 
      className={`w-10 h-10 text-green-400 translate-y-[8px] cursor-pointer`} 
      onClick={addCard} 
    />
  </div>

interface AlternativesStepProps {
  alternatives: Alternatives,
  alternativesOrder: string[]
  dispatch: React.Dispatch<Action>
}

export const AlternativesStep = ({ alternatives, alternativesOrder, dispatch }: AlternativesStepProps) => {
  const addAlternative = () => dispatch({ type: 'addAlternative', payload: {} })

  return (
    <div className='flex max-w-full h-full flex-wrap items-center content-start justify-center pr-8'>
      {alternativesOrder.length === 0 &&
          <NoTextcards addCard={addAlternative} />
      }
      {alternativesOrder.map((altId, ix) => {
        if (alternativesOrder.length === ix + 1) {
          return (
            <LastAlternative 
              key={altId} 
              alternative={alternatives[altId]} 
              dispatch={dispatch} 
              index={ix}
              addAlternative={addAlternative}
            />
          )
        }
        return (
          <Alternative 
            key={altId} 
            alternative={alternatives[altId]} 
            dispatch={dispatch} 
            index={ix} 
          />
        )
      })}
    </div>
  )
}