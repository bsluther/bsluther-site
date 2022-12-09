import { SliderIcon } from 'ui'

export const Range = () => {

  return (
    <div>

      <input
        style={{
          WebkitAppearance: 'none',
          // backgroundImage: 'url(../sliderIcon.svg)',
          backgroundSize: 'contain', 
          cursor: 'pointer',
          width: '100%',
        }}
        type='range'
        className='ahp-slider'
      />
    </div>
  )
}