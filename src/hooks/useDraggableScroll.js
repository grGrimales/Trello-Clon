import { useRef, useState } from 'react'

export function useDraggableScroll() {
  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = (e) => {
    if (e.target.closest('[data-rbd-drag-handle-id]')) return
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return

    setIsDragging(true)
    setStartX(e.pageX - ref.current.offsetLeft)
    setScrollLeft(ref.current.scrollLeft)
    ref.current.style.cursor = 'grabbing'
  }

  const onMouseLeave = () => {
    setIsDragging(false)
    if (ref.current) ref.current.style.cursor = 'grab'
  }

  const onMouseUp = () => {
    setIsDragging(false)
    if (ref.current) ref.current.style.cursor = 'grab'
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - startX) * 1.5 
    
    ref.current.scrollLeft = scrollLeft - walk
  }

  return {
    ref,
    events: { 
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove
    }
  }
}