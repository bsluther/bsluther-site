import { Rating } from '../core'
import * as O from 'fp-ts/Option'
import { identity, pipe } from 'fp-ts/lib/function'

const CELL_SIZE = 'w-16 h-16'

type Focus = O.Option<{ xIndex: number, yIndex: number }>

type Goto = ({ x, y }: { x: number, y: number }) => void

const Cell = ({ value, x, y, focus, onClick }: { value: Rating, x: number, y: number, focus: Focus, onClick: () => void }) => {
  const isFocused = pipe(
    focus,
    O.fold(
      () => false,
      ({ xIndex, yIndex }) => xIndex === x && yIndex === y
    )
  )
  return (
    <div 
      className={`flex items-center justify-center text-xs cursor-pointer
        ${CELL_SIZE}
        ${isFocused ? 'bg-green-400/50' : 'bg-green-400/25'}`}
      onClick={onClick}
    >{value === 'EMPTY' ? '' : value.toFixed(4)}</div>
  )
}

const LabelCell = ({ label, isFocused = false }: { label: string, isFocused?: boolean }) => {
  return (
    <div
      className={`${CELL_SIZE} ${isFocused && 'text-red-400'} flex items-center justify-center text-center break-words overflow-hidden align-middle`}>
      <div 
        className='w-full max-h-full text-center break-words'
      >
        {label}
      </div>
    </div>
  )
}

const ColLabels = ({ labels, focus }: { labels: string[], focus: Focus }) => {

  return (
    <div className='flex space-x-2 items-center justify-center'>
      <div className={CELL_SIZE} />
      {labels.map((lbl, ix) =>
        <LabelCell 
          label={lbl} 
          isFocused={pipe(
            focus,
            O.fold(
              () => false,
              ({ xIndex }) => xIndex === ix
            )
          )} 
        />)}
    </div>
  )
}

const Row = ({ row, y, focus, label, goto }: { row: Rating[], y: number, focus: Focus, label?: string, goto: Goto }) => {
  return (
    <div className='flex space-x-2'>
      <LabelCell
        label={label ?? ''} 
        isFocused={pipe(
          focus,
          O.fold(
            () => false,
            ({ yIndex }) => yIndex === y
          )
        )}
      />
      {row.map((el, ix) => 
        <Cell
          key={`${el} ${ix}`}
          value={el} 
          x={ix} 
          y={y} 
          focus={focus} 
          onClick={() => {
            if (ix !== y) {
              goto({ x: ix, y})
            }
          }} />)}
    </div>
  )
}

interface MatrixViewProps {
  mtx: Rating[][]
  focus?: Focus
  labels?: string[]
  goto?: Goto
}
export const MatrixView = ({ mtx, focus = O.none, labels = [], goto = () => null }: MatrixViewProps) => {

  return (
    <div className='flex flex-col space-y-2'>
      <ColLabels labels={labels} focus={focus} />
      {mtx.map((row, ix) => 
        <Row key={`${row.toString()} ${ix}`} row={row} y={ix} focus={focus} label={labels[ix]} goto={goto} />)}
    </div>
  )
}