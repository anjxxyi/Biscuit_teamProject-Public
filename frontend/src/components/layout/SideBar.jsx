import React, { useEffect, useState } from 'react'
import { RiArrowUpSLine, RiShareFill } from "react-icons/Ri"

import '../../styles/base/layout.css'

const SideBar = ({ children }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {window.scrollY > 300 ? setShowButton(true) : setShowButton(false)}
    window.addEventListener("scroll", handleShowButton);
    return () => window.removeEventListener("scroll", handleShowButton);
  }, [])

  const handleScrollToTop = () => window.scrollTo({top:0, behavior:'smooth'});

  const handleCopyClipBoard = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      alert("URL이 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  }

  // 비회원 접속 확인용
  const userInfo = JSON.parse(localStorage.getItem("member"));

  return showButton && (
    <div id="sideBar">
      <div className="barBox">
        <button id="barBox_firstBtn" className="scrollTop" type="button" onClick={handleScrollToTop}><RiArrowUpSLine/></button>
        <button className="linkShare" type="button" onClick={handleCopyClipBoard}><RiShareFill/></button>
        <div style={userInfo || {display: "none"}}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default SideBar