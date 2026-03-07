import { useEffect, useState } from 'react'

export default function useScrollThreshold(threshold = 300) {
  const [passed, setPassed] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const handleScroll = () => setPassed(window.scrollY > threshold)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return passed
}
