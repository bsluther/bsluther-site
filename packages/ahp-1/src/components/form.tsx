import { cva } from 'class-variance-authority'
import { CheckCircleSvg } from 'ui'

const button = cva(['w-10 h-10'], {
  variants: {
    valid: {
      true: 'text-neutral-100 hover:fill-green-400/50 cursor-pointer',
      false: 'text-neutral-300 hover:fill-red-400/25 cursor-pointer'
    }
  }
})

interface FormProps {
  title: string
  description: string
  heading: string
  updateTitle: (str: string) => void
  updateDescription: (str: string) => void
  handleDone: () => void
}
export const Form = ({ title, description, heading, updateTitle, updateDescription, handleDone }: FormProps) => {
  const isValid = title.length > 2

  return (
    <form
      className='w-max flex flex-col items-center bg-neutral-500 p-8 rounded-lg space-y-8'
      onSubmit={e => {
        e.preventDefault()
        if (isValid) {
          handleDone()
        }
      }}
    >
      <h1 className='text-black text-xl'>{heading}</h1>
      <div className='flex items-center space-x-2'>
        <label 
          className='text-black'
          htmlFor='title'
        >Title: </label>
        <input
          className='bg-neutral-600 rounded-sm outline-neutral-700 px-2 py-1'
          autoFocus
          spellCheck={false}
          id='title'
          value={title}
          onChange={e => updateTitle(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-2'>
        <label 
          className='text-black'
          htmlFor='description'
        >Description: </label>
        <textarea
          className='bg-neutral-600 rounded-sm resize-none outline-neutral-700 h-24 px-2 py-1'
          spellCheck={false}
          id='description'
          value={description}
          onChange={e => updateDescription(e.target.value)}
        />
      </div>
      <button>
        <CheckCircleSvg
          className={button({ valid: isValid })}
        />
      </button>
    </form>
  )
}