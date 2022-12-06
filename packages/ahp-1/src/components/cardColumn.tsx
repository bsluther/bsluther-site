import { cva } from 'class-variance-authority'
import { useRef } from 'react'
import { PlusSvg, useOutsideClick } from 'ui'
import { Alternative, Criterion } from '../core'

const card = cva(['w-48 h-8 text-center bg-neutral-600 rounded-sm px-2 py-1 cursor-pointer'], {
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
      className='flex flex-col h-full w-max p-4 bg-neutral-800 space-y-4'
    >
      {items.map(itm => 
        <Card 
          key={itm.id}
          title={itm.title} 
          handleClick={() => handleClick(itm.id)}
          isFocused={focus.includes(itm.id)}
        />)}
      {allowAppend && 
        <PlusSvg className={card({ active: focus.includes('DRAFT') })} onClick={() => setFocus('DRAFT')} />}
    </ul>
  )
}