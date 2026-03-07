import { useEffect, useState } from 'react'

import useBodyScrollLock from '../../hooks/useBodyScrollLock'

function Dropdown({ visibility, handleDropdown, children }) {
  const [mounted, setMounted] = useState(visibility)
  useBodyScrollLock(visibility)

  useEffect(() => {
    if (visibility) {
      setMounted(true)
      return undefined
    }

    const animationTimer = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(animationTimer)
  }, [visibility])

  if (!mounted) return null

  return (
    <div
      id="headerDropdown"
      className={visibility ? 'slideFadeInDropdown' : 'slideFadeOutDropdown'}
    >
      <div className="wrapper">{children}</div>
      <button
        type="button"
        className="dropdownBackdrop"
        aria-label="메뉴 닫기"
        onClick={handleDropdown}
      />
    </div>
  )
}

export default Dropdown
