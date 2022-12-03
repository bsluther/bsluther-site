
interface PairwiseProps {
  Element_x: JSX.Element
  Element_y: JSX.Element
  rate: (rating: number) => void
  rating: number | 'EMPTY'
}

// export const debounce = (callback: Function, wait: number) => {
//   let timeoutId: number
//   return (...args) => {
//     window.clearTimeout(timeoutId);
//     timeoutId = window.setTimeout(() => {
//       callback.apply(null, args);
//     }, wait);
//   };
// }

export const Pairwise = ({ Element_x, Element_y, rate, rating }: PairwiseProps) => {
  
  return (
    <div className='flex flex-col borderNO border-red-400 rounded-md'>
      <div className='flex items-center'>
        {Element_x}
        <div className='text-red-400'>VERSUS</div>
        {Element_y}
      </div>
      <input
        className='fill-green-400 accent-green-400'
        type='range'
        min={-8}
        max={8}
        step={1}
        value={rating === 'EMPTY' ? 0 : rating}
        onChange={e => {
          rate(parseFloat(e.target.value))
        }}
      />
    </div>
  )
}