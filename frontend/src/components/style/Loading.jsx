import React from 'react'

import '../../styles/base/sub.css'

function Loading({opacity}) {
  return (
    <div id="loading" className="basicLoading" style={opacity ? {backgroundColor: "var(--ModalBgColor)"} : null}>
        <div className="iconBox">
            <img className="icon" src="/images/biscuitIcon.svg" alt="" />
            <div className="shadow"></div>
        </div>
        <p>Please wait for a moment</p>
    </div>
  )
}

export default Loading