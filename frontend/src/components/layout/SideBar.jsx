import { RiArrowUpSLine, RiShareFill } from 'react-icons/ri'

import useScrollThreshold from '../../hooks/useScrollThreshold'
import { readStoredMember } from '../../utils/storage'
import '../../styles/base/layout.css'

function SideBar({ children }) {
  const visible = useScrollThreshold(300)
  const userInfo = readStoredMember()

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('URL이 복사되었습니다.')
    } catch {
      alert('URL을 복사하지 못했습니다.')
    }
  }

  if (!visible) return null

  return (
    <div id="sideBar">
      <div className="barBox">
        <button
          id="barBox_firstBtn"
          className="scrollTop"
          type="button"
          aria-label="맨 위로 이동"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <RiArrowUpSLine />
        </button>
        <button
          className="linkShare"
          type="button"
          aria-label="현재 페이지 주소 복사"
          onClick={handleCopyClipboard}
        >
          <RiShareFill />
        </button>
        {userInfo && <div>{children}</div>}
      </div>
    </div>
  )
}

export default SideBar
