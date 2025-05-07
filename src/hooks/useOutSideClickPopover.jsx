import { useRef, useEffect, useState, useCallback } from 'react'

function useOutSideClickPopover() {
  const popoverRef = useRef(null)
  const [popoverShow, setPopoverShow] = useState(false)

  const clickOutSide = useCallback(
    (e) => {
      if (
        popoverShow &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target)
      ) {
        setPopoverShow(false)
      }
    },
    [popoverShow]
  )

  useEffect(() => {
    if (!popoverShow) return
    document.addEventListener('mousedown', clickOutSide)
    return () => {
      document.removeEventListener('mousedown', clickOutSide)
    }
  }, [popoverShow])

  return { popoverShow, setPopoverShow, popoverRef }
}

export default useOutSideClickPopover
