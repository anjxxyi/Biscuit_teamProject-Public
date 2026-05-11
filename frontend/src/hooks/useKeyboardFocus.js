import { useEffect } from 'react'

export default function useKeyboardFocus() {
  useEffect(() => {
    const root = document.documentElement
    const previous = root.dataset.inputModality
    root.dataset.inputModality = 'pointer'
    const onKeyDown = (event) => {
      if (event.key === 'Tab') root.dataset.inputModality = 'keyboard'
    }
    const onPointerDown = () => { root.dataset.inputModality = 'pointer' }
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('pointerdown', onPointerDown, true)
      if (previous === undefined) delete root.dataset.inputModality
      else root.dataset.inputModality = previous
    }
  }, [])
}
