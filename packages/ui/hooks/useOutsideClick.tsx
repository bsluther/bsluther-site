import { MouseEvent, RefObject, useEffect } from 'react'

export const useOutsideClick = (refs: RefObject<HTMLElement>[], callback: () => void) => {

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {

      const isOutside = refs.reduce((acc, ref) => 
                                      acc 
                                      && (ref.current ?? false)
                                      &&  !ref.current?.contains(e.target as HTMLElement),
                                    true)

      if (isOutside) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [refs, callback])
}