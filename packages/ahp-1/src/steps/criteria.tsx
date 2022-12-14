import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { CardColumn } from '../components/cardColumn'
import { Form } from '../components/form'
import { Criterion } from '../core'
import { useAhpStore } from '../store'

const makeCriterion = (): Criterion => ({
  id: uuid(),
  title: '',
  description: ''
})

export const Criteria = () => {
  const [draft, setDraft] = useState(makeCriterion)
  const [focus, setFocus] = useState('DRAFT')
  const { criteria, alternatives, appendCriterion, updateCriterion, editing } = useAhpStore(state => ({
    alternatives: state.goal.orderedAlternatives(),
    criteria: state.goal.orderedCriteria(),
    appendCriterion: state.goal.appendCriterion,
    updateCriterion: state.goal.updateCriterion,
    editing: focus === 'DRAFT'
      ? draft
      : state.goal.criteria[focus] 
  }))

  return (
    <div className='w-full h-full flex flex-col sm:flex-row'>
      <CardColumn 
        items={alternatives}
        handleClick={() => null}
        focus={['']}
        setFocus={() => null}
        allowAppend={false}
        contentType='alternatives'
      />
      <CardColumn 
        items={criteria}
        handleClick={(id: string) => setFocus(id)}
        focus={[focus]}
        setFocus={setFocus}
        allowAppend={true}
        contentType='criteria'
      />
      <div className='grow flex flex-col items-center justify-center sm:justify-center px-4 sm:px-0'>
        <Form
          heading={focus === 'DRAFT' ? 'Add a criterion' : 'Edit criterion'}
          title={editing.title}
          titlePlaceholder="Enter a criterion to rank options by."
          description={editing.description}
          descriptionPlaceholder="Describe this criterion in more detail (option)."
          updateTitle={title => {
            if (focus === 'DRAFT') {
              setDraft(prev => ({ ...prev, title }))
            } else {
              updateCriterion(prev => ({ ...prev, title }))(focus)
            }
          }}
          updateDescription={(description) => {
            if (focus === 'DRAFT') {
              setDraft(prev => ({ ...prev, description }))
            } else {
              updateCriterion(prev => ({ ...prev, description}))(focus)
            }

          }}
          handleDone={() => {
            if (focus === 'DRAFT') {
              appendCriterion(draft)
              setDraft(makeCriterion)
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