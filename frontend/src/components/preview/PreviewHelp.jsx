import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isPreviewMode } from '../../preview/config'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
import './previewHelp.css'

const HIDDEN_UNTIL_KEY = 'biscuit.preview.intro.hiddenUntil'

function shouldShowIntro() {
  try {
    return Number(localStorage.getItem(HIDDEN_UNTIL_KEY) || 0) <= Date.now()
  } catch {
    return true
  }
}

function PreviewHelp() {
  const { pathname, key: locationKey } = useLocation()
  const [dismissed, setDismissed] = useState(() => !shouldShowIntro())
  const [hideToday, setHideToday] = useState(false)
  const dialog = useRef(null)
  const visible = isPreviewMode && pathname === '/' && !dismissed

  useBodyScrollLock(visible)

  useEffect(() => {
    if (pathname === '/') {
      setDismissed(!shouldShowIntro())
      setHideToday(false)
    }
  }, [pathname, locationKey])

  const dismiss = () => {
    try {
      if (hideToday) {
        const midnight = new Date()
        midnight.setHours(24, 0, 0, 0)
        localStorage.setItem(HIDDEN_UNTIL_KEY, String(midnight.getTime()))
      }
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
    setDismissed(true)
  }

  useEffect(() => {
    if (!visible) return undefined
    const previousFocus = document.activeElement
    dialog.current?.focus()
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [visible])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') dismiss()
    if (event.key !== 'Tab') return
    const controls = dialog.current.querySelectorAll('button, input')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!visible) return null

  return (
    <div
      className="previewIntroBackdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        className="previewIntro"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-intro-title"
        aria-describedby="preview-intro-description"
        tabIndex={-1}
        ref={dialog}
        onKeyDown={handleKeyDown}
      >
        <button className="previewIntroClose" type="button" aria-label="안내 닫기" onClick={dismiss}>
          ×
        </button>
        <h2 id="preview-intro-title">UI Preview 모드</h2>
        <p id="preview-intro-description">화면과 주요 기능을 확인할 수 있도록 예시 데이터를 제공합니다.</p>
        <p className="previewIntroNotice">
          회원가입과 결제는 실제로 진행되지 않으며,
          <br />
          입력한 정보는 서버에 저장되지 않습니다.
        </p>
        <label className="previewIntroToday">
          <input type="checkbox" checked={hideToday} onChange={(event) => setHideToday(event.target.checked)} />
          <span>오늘 하루 보지 않기</span>
        </label>
      </section>
    </div>
  )
}

export default PreviewHelp
