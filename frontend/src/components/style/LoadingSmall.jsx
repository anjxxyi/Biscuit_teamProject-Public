import React from 'react'

import '../../styles/base/sub.css'

function LoadingSmall({ opacity }) {
  return (
    <div id="loadingSmall" className='basicLoading' style={opacity ? {background: "none"} : {}}>
        <div className="iconBox">
            <img className="icon" src="/images/biscuitIcon.svg" alt="" />
            <div className="shadow"></div>
        </div>
        <p>Please wait for a moment</p>
    </div>
  )
}

export default LoadingSmall
