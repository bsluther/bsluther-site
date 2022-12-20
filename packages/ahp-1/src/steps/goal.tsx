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
      className='w-full sm:h-full flex flex-col items-center justify-center sm:px-0 px-4'
    >
      <Form 
        title={title}
        description={description}
        heading={'Set a Goal'}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        handleDone={() => gotoStep(Steps.Alternatives)}
      />
      <div className='sm:h-1/4 sm:w-1/4' />
      <div className='flex py-4 space-x-4 text-sm sm:text-md'>
        <button className={viewButton({ active: false })} onClick={loadNytData}>Load NYT Data</button>
        <button className={viewButton({ active: false })} onClick={loadBriansData}>Load Work Data</button>
        <button className={viewButton({ active: false })} onClick={loadBriansData2}>Load Work Data - 2</button>
      </div>
    </div>
  )
}