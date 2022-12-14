import { cva } from 'class-variance-authority'
import { useRef } from 'react'
import { PlusSvg, useOutsideClick } from 'ui'
import { Alternative, Criterion } from '../core'

const card = cva(['sm:w-48 sm:text-base text-xs w-max h-max sm:h-8 text-center rounded-sm px-2 py-1 cursor-pointer'], {
  variants: {
    active: {
      true: 'outline outline-2 outline-green-500',
      false: ''
    },
    contentType: {
      criteria: 'bg-neutral-600 sm:bg-neutral-600 sm:text-neutral-100',
      alternatives: 'bg-neutral-900 sm:bg-neutral-600 sm:text-neutral-100'
    }
  }, 
})

const plusCard = cva(['sm:w-48 sm:text-base text-xs w-10 h-6 sm:h-8 text-center rounded-sm cursor-pointer flex items-center justify-center'], {
  variants: {
    active: {
      true: 'outline outline-2 outline-green-500',
      false: ''
    },
    contentType: {
      criteria: 'bg-neutral-600 sm:bg-neutral-600 sm:text-neutral-100',
      alternatives: 'bg-neutral-900 sm:bg-neutral-600 sm:text-neutral-100'
    }
  }, 
})
interface CardProps {
  title: string
  handleClick?: () => void
  isFocused?: boolean
  contentType: 'criteria' | 'alternatives'
}
export const Card = ({ title, handleClick = () => null, isFocused = false, contentType }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // useOutsideClick([ref], handleBlur)
  return (
    <div 
      className={card({ active: isFocused, contentType })}
      onClick={() => handleClick()}
      ref={ref}
    >
      {title}
    </div>
  )
}

interface AlternativesColumnProps {
  items: (Alternative | Criterion)[]
  handleClick: (id: string) => void
  focus: string[]
  setFocus: (str: string) => void
  allowAppend: boolean
  contentType: 'criteria' | 'alternatives'
}
export const CardColumn = ({ items, handleClick, focus, setFocus, allowAppend, contentType }: AlternativesColumnProps) => {

  return (
    <ul
      className={`flex flex-wrap items-center justify-center w-full h-max p-2 sm:p-4 gap-2
        sm:flex-col sm:h-full sm:w-max sm:bg-neutral-800 sm:justify-start

      `}
    >
      {items.map(itm => 
        <Card 
          key={itm.id}
          title={itm.title} 
          handleClick={() => handleClick(itm.id)}
          isFocused={focus.includes(itm.id)}
          contentType={contentType}
        />)}
      {allowAppend &&
        <div className={plusCard({ active: focus.includes('DRAFT'), contentType })} onClick={() => setFocus('DRAFT')}>
          <PlusSvg className={'w-6 h-6'} onClick={() => setFocus('DRAFT')} />
        </div>}
    </ul>
  )
}