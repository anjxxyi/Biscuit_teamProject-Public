import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../components/store/Context'
import { clearSessionStorage, readStoredMember } from '../utils/storage'

const MAX_TIMEOUT = 2_147_483_647

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => readStoredMember() ?? undefined)
  const navigate = useNavigate()

  const signoutHandler = useCallback(() => {
    clearSessionStorage()
    setUserInfo(undefined)
    alert('로그아웃 되었습니다.')
    navigate('/', { replace: true })
  }, [navigate])

  useEffect(() => {
    const expiresAt = Number(userInfo?.tokenExpiresIn)
    if (!expiresAt) return undefined

    const remaining = expiresAt - Date.now()
    if (remaining <= 0) {
      signoutHandler()
      return undefined
    }

    const tokenChecker = setTimeout(signoutHandler, Math.min(remaining, MAX_TIMEOUT))
    return () => clearTimeout(tokenChecker)
  }, [signoutHandler, userInfo?.tokenExpiresIn])

  const loginChk = useCallback(
    (authenticated) => {
      const signedIn = authenticated ?? Boolean(readStoredMember())
      if (signedIn) return true

      if (authenticated === undefined) alert('로그인 후 이용해 주세요.')
      navigate('/auth/signin')
      return false
    },
    [navigate],
  )

  const value = useMemo(
    () => ({ userInfo, setUserInfo, signoutHandler, navigate, loginChk }),
    [loginChk, navigate, signoutHandler, userInfo],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AuthProvider
