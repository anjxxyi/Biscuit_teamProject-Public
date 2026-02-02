import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AppRoutes from './app/AppRoutes'
import Layout from './components/Layout'
import { Context } from './components/store/Context'
import { clearSessionStorage, readStoredMember } from './utils/storage'
import './styles/reset.css'
import './styles/common.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const handleDarkMode = () => setDarkMode((enabled) => !enabled)
  const [userInfo, setUserInfo] = useState()
  const navigate = useNavigate()

  useEffect(() => refreshHandler(), [])

  function refreshHandler() {
    const member = readStoredMember()
    userInfo || setUserInfo(member)
    if (member == null) return undefined

    const tokenChecker = setTimeout(() => {
      new Date().getTime() >= userInfo.tokenExpiresIn && signoutHandler()
    }, 180000)
    return () => clearTimeout(tokenChecker)
  }

  const signoutHandler = () => {
    clearSessionStorage()
    setUserInfo()
    alert('로그아웃 되었습니다.')
    navigate('/', { replace: true })
  }

  const loginChk = (authenticated) => {
    if (authenticated !== undefined) {
      if (!authenticated) navigate('/auth/signin')
      return
    }

    const member = readStoredMember()
    if (member == null || member === '') {
      alert('로그인 후 이용해 주세요.')
      navigate('/auth/signin')
    }
  }

  return (
    <Context.Provider value={{ userInfo, setUserInfo, signoutHandler, navigate, loginChk }}>
      <Layout darkMode={darkMode} handleDarkMode={handleDarkMode}>
        <AppRoutes />
      </Layout>
    </Context.Provider>
  )
}

export default App
