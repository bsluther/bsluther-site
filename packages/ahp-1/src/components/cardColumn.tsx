import { cva } from 'class-variance-authority'
import { useRef } from 'react'
import { PlusSvg, useOutsideClick } from 'ui'
import { Alternative, Criterion } from '../core'

const card = cva(['sm:w-48 w-max h-8 text-center bg-neutral-600 rounded-sm px-2 py-1 cursor-pointer'], {
  variants: {
    active: {
      true: 'outline',
      false: ''
    }
  }
})
interface CardProps {
  title: string
  handleClick?: () => void
  isFocused?: boolean
  // handleBlur: () => void
}
export const Card = ({ title, handleClick = () => null, isFocused = false }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // useOutsideClick([ref], handleBlur)
  return (
    <div 
      className={card({ active: isFocused })}
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
}
export const CardColumn = ({ items, handleClick, focus, setFocus, allowAppend }: AlternativesColumnProps) => {

  return (
    <ul
      className='flex flex-wrap items-center w-full h-max p-4 bg-neutral-800 gap-2
      sm:flex-col sm:h-full sm:w-max'
    >
      {items.map(itm => 
        <Card 
          key={itm.id}
          title={itm.title} 
          handleClick={() => handleClick(itm.id)}
          isFocused={focus.includes(itm.id)}
        />)}
      {allowAppend && 
        <PlusSvg className={card({ active: focus.includes('DRAFT'), className: 'w-8' })} onClick={() => setFocus('DRAFT')} />}
    </ul>
  )
}