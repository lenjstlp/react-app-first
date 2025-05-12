import { useEffect } from 'react'
import { throttle } from 'lodash-es'

export const useContainerScrollToBottom = (
  callback,
  containerRef,
  threshold = 50
) => {
  useEffect(() => {
    if (!containerRef?.current) return
    const container = containerRef.current

    const throttledHandler = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = container

      if (scrollHeight - (scrollTop + clientHeight) < threshold) {
        callback()
      }
    }, 1000)

    container.addEventListener('scroll', throttledHandler)
    return () => container.removeEventListener('scroll', throttledHandler)
  }, [callback, threshold, containerRef])
}
