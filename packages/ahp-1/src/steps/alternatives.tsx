import { Form } from '../components/form'
import { Alternative } from '../core'
import { useAhpStore } from '../store'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import { CardColumn } from '../components/cardColumn'


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

  return (
    <div className='w-full h-full flex flex-col sm:flex-row'>
      <CardColumn 
        items={alternatives}
        handleClick={(id: string) => setFocus(id)}
        focus={[focus]}
        setFocus={setFocus}
        allowAppend={true}
      />
      <div className='grow flex flex-col items-center justify-center'>
        <Form
          heading={focus === 'DRAFT' ? 'Add an option' : 'Edit option'}
          title={editing.title}
          description={editing.description}
          updateTitle={title => {
            if (focus === 'DRAFT') {
              setDraft(prev => ({ ...prev, title }))
            } else {
              updateAlternative(prev => ({ ...prev, title }))(focus)
            }
          }}
          updateDescription={(description) => {
            if (focus === 'DRAFT') {
              setDraft(prev => ({ ...prev, description }))
            } else {
              updateAlternative(prev => ({ ...prev, description}))(focus)
            }

          }}
          handleDone={() => {
            if (focus === 'DRAFT') {
              appendAlternative(draft)
              setDraft(makeAlternative)
            } else {
              setFocus('DRAFT')
            }
          }}
        />
        <div className='h-1/4 w-1/4' />
      </div>
    </div>
  )
}