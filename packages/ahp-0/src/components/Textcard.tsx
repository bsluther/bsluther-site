import { useState } from 'react'
import { PlusSvg, XCircleSvg } from 'ui'
import { Entity } from '../core'


interface TextcardProps {
  entity: Entity
  index: number
  name: string
  removeEntity?: () => void
  describeEntity?: (str: string) => void
  frozen?: boolean
}

export const Textcard = ({ entity, index, name, removeEntity = () => null, describeEntity = () => null, frozen = false }: TextcardProps) => {
  const [hovered, setHovered] = useState(false)


  return (
    <div 
      className='relative flex flex-col justify-center items-center m-4'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='text-green-400 capitalize'>{name} #{index + 1}</div>
      <textarea
        placeholder={`describe your ${name}`}
        spellCheck={false}
        className='bg-neutral-900 border border-green-400 rounded-md outline-none text-neutral-100 placeholder:text-neutral-600 p-2 w-36 h-36 text-center text-sm'
        onChange={e => describeEntity(e.target.value)}
        value={entity.description}
      />
      {hovered && !frozen &&
        <XCircleSvg
          className='absolute top-0 right-0 translate-x-1/2 translate-y-1/2 fill-neutral-900 w-6 h-6 text-red-400 cursor-pointer' 
          onClick={removeEntity}
        />}
    </div>
  )
}

interface LastTextcardProps extends TextcardProps {
  addEntity: () => void
}

export const LastTextcard = (props: LastTextcardProps) => {
  return (
    <div className='flex items-center'>
      <Textcard 
        {...props}
      />
      <PlusSvg 
        className={`w-10 h-10 text-green-400 translate-y-[8px] cursor-pointer`} 
        onClick={props.addEntity} 
      />
    </div>
  )
}

export const NoTextcards = ({ addCard }: { addCard: () => void }) =>
  <div className='flex items-center h-48'>
    <PlusSvg 
      className={`w-10 h-10 text-green-400 translate-y-[8px] cursor-pointer`} 
      onClick={addCard} 
    />
  </div>