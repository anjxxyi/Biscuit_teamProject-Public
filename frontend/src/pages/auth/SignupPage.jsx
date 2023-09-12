import React from 'react'
import SignupForm from '../../components/auth/SignupForm'

import '../../styles/base/sub.css'
import '../../styles/base/authStyle.css'

const SignupPage = () => {
  return (
    <main id="pageContainer" className="auth">
      <div id="pageVisual">
        <h2 className="title">Sign up</h2>
        <p className="info">비스킷에 오신 것을 환영합니다!</p>
      </div>
      
      {/* #pageContents --- START */}
      <div id="pageContents">
        <SignupForm />
      </div>
      {/* #pageContents --- END */}
    </main>
  )
}

export default SignupPage