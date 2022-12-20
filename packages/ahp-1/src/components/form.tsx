import { cva } from 'class-variance-authority'
import { CheckCircleSvg, useBreakpoint } from 'ui'

const button = cva(['w-12 h-12 sm:w-10 sm:h-10'], {
  variants: {
    valid: {
      true: 'text-green-800 sm:text-neutral-100 hover:fill-green-400/50 cursor-pointer',
      false: 'text-neutral-500 sm:text-neutral-300 hover:fill-red-400/25 cursor-pointer'
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
  const { isPastBreakpoint } = useBreakpoint()
  const isValid = title.length > 2

  return (
    <form
      className='w-full sm:w-max max-w-full flex flex-col items-center sm:bg-neutral-500 p-8 rounded-lg space-y-2 sm:space-y-8'
      onSubmit={e => {
        e.preventDefault()
        if (isValid) {
          handleDone()
        }
      }}
      // onBlur={() => window.scrollTo(0, 84)}
    >
      <h1 className='text-black text-xl hidden sm:inline'>{heading}</h1>
      <div className='flex w-full sm:w-max items-center gap-1 sm:gap-2'>
        <label 
          className='text-black'
          htmlFor='title'
        >Title: </label>
        <input
          className='bg-neutral-600 rounded-sm outline-neutral-700 px-2 py-1 w-full sm:w-max'
          autoFocus
          spellCheck={false}
          id='title'
          value={title}
          onChange={e => {
            if (e.target.value.length < 21) {
              updateTitle(e.target.value)
            }
          }}
          // onBlur={() => window.scrollTo(0, 84)}
        />
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-full'>
        <label 
          className='text-black hidden sm:inline'
          htmlFor='description'
        >Description: </label>
        <textarea
          className='bg-neutral-600 rounded-sm resize-none outline-neutral-700 h-24 px-2 py-1 w-full placeholder:italic'
          spellCheck={false}
          id='description'
          placeholder={isPastBreakpoint('sm') ? undefined : 'Description...'}
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