import { Form } from '../components/form'
import { Alternative } from '../core'
import { useAhpStore } from '../store'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'

interface AlternativeCardProps {
  title: string
  handleClick: () => void
}
const AlternativeCard = ({ title, handleClick }: AlternativeCardProps) => {
  return (
    <div 
      className='w-48 h-8 text-center bg-neutral-600 rounded-sm px-2 py-1 cursor-pointer'
      onClick={() => handleClick()}
    >
      {title}
    </div>
  )
}

interface AlternativesColumnProps {
  alternatives: Alternative[]
  handleClick: (id: string) => void
}
const AlternativesColumn = ({ alternatives, handleClick }: AlternativesColumnProps) => {
  return (
    <ul
      className='flex flex-col h-full w-max p-4 bg-neutral-800 space-y-4'
    >
      {alternatives.map(alt => 
        <AlternativeCard 
          key={alt.id}
          title={alt.title} 
          handleClick={() => handleClick(alt.id)}
        />)}
    </ul>
  )
}

const makeAlternative = (): Alternative => ({
  id: uuid(),
  title: '',
  description: ''
})

export const Alternatives = () => {
  const [draft, setDraft] = useState(makeAlternative)
  const [focus, setFocus] = useState('DRAFT')
  const { alternatives, appendAlternative, updateAlternative, editing } = useAhpStore(state => ({
    alternatives: state.goal.orderedAlternatives(),
    appendAlternative: state.goal.appendAlternative,
    updateAlternative: state.goal.updateAlternative,
    editing: focus === 'DRAFT'
      ? draft
      : state.goal.alternatives[focus] 
  }))
  console.log(focus)
  console.log('draft', draft)
  return (
    <div className='w-full h-full flex'>
      <AlternativesColumn 
        alternatives={alternatives}
        handleClick={(id: string) => setFocus(id)}
      />
      <div className='grow flex flex-col items-center justify-center'>
        <Form
          heading={'Add an option'}
          title={editing.title}
          description={editing.description}
          updateTitle={title => {
            if (focus === 'DRAFT') {
              setDraft(prev => ({ ...prev, title }))
            } else {
              updateAlternative(prev => ({ ...prev, title }))(focus)
            }
            // focus === 'draft'
            //   ? setDraft(prev => ({ ...prev, title }))
            //   : updateAlternative(prev => ({ ...prev, title }))(focus)
          }}
          updateDescription={(description) => setDraft(prev => ({ ...prev, description }))}
          handleDone={() => {
            appendAlternative(draft)
            setDraft(makeAlternative)
          }}
        />
        <div className='h-1/4 w-1/4' />
      </div>
    </div>
  )
}