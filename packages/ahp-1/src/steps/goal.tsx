import { Form } from '../components/form'
import { Steps } from '../core'
import { useAhpStore } from '../store'
import { viewButton } from './results2'

export const Goal = () => {
  const { title, description, updateTitle, updateDescription, gotoStep, loadNytData, loadBriansData, loadBriansData2 } = useAhpStore(state => ({ 
    title: state.goal.title,
    description: state.goal.description,
    updateTitle: state.goal.updateTitle,
    updateDescription: state.goal.updateDescription,
    gotoStep: state.gotoStep,
    loadNytData: state.loadNytData,
    loadBriansData: state.loadBriansData,
    loadBriansData2: state.loadBriansData2
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
      <div className='flex py-4 space-x-4'>
        <button className={viewButton({ active: false })} onClick={loadNytData}>Load NYT Data</button>
        <button className={viewButton({ active: false })} onClick={loadBriansData}>Load Work Data</button>
        <button className={viewButton({ active: false })} onClick={loadBriansData2}>Load Work Data - 2</button>
      </div>
    </div>
  )
}