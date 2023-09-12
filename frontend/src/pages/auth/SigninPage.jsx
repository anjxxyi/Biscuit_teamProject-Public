import React from 'react'
import SigninForm from '../../components/auth/SigninForm'

import '../../styles/base/sub.css'
import '../../styles/base/authStyle.css'

const SigninPage = () => {
  return (
    <main id="pageContainer" className="auth signin styleSide">
      <div id="pageVisual">
        <h2 className="title">
          Hello, 
          <span><img src="/images/biscuitIcon.svg" alt="" />Biscuit</span>
        </h2>
      </div>

      {/* #pageContents --- START */}
      <div id="pageContents">
        <SigninForm />
      </div>
      {/* #pageContents --- END */}
    </main>
  )
}

export default SigninPage