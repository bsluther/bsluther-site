import { Form } from '../components/form'
import { Steps } from '../core'
import { useAhpStore } from '../store'

export const Goal = () => {
  const { title, description, updateTitle, updateDescription, gotoStep } = useAhpStore(state => ({ 
    title: state.goal.title,
    description: state.goal.description,
    updateTitle: state.goal.updateTitle,
    updateDescription: state.goal.updateDescription,
    gotoStep: state.gotoStep
  }))

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center'
    >
      <Form 
        title={title}
        description={description}
        heading={'Set a Goal'}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        handleDone={() => gotoStep(Steps.Alternatives)}
      />
      <div className='h-1/4 w-1/4' />
    </div>
  )
}