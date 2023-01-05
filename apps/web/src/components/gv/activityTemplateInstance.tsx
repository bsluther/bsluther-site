import Image from 'next/image'
import atiSvg from '../../../public/activity-template-instance.svg'

export const AtiGraphic = ({ svg }: { svg: SVGSVGElement }) => {
  return (
    <div className='font-virgil'>
      <Image src={atiSvg} width={200} height={200} alt='example' />
    </div>
  )
}