import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer">
        <ul className="footNav">
          <li><Link to={`/policy/terms`}>서비스 이용약관</Link></li>
          <li><Link to={`/policy/privacy`}>개인정보 처리방침</Link></li>
          <li><Link to={`/policy/oppolicy`}>운영정책</Link></li>
          <li><Link to={`/faq`}>FAQ</Link></li>
        </ul>
        <p className="copy">Copyright © <b>Biscuit</b>. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer