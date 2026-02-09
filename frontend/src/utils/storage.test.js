import { clearSessionStorage, readStoredMember } from './storage'

describe('storage utilities', () => {
  beforeEach(() => localStorage.clear())

  it('저장된 회원 정보를 안전하게 읽는다', () => {
    localStorage.setItem('member', JSON.stringify({ no: 7 }))
    expect(readStoredMember()).toEqual({ no: 7 })
  })

  it('잘못된 회원 정보는 제거한다', () => {
    localStorage.setItem('member', '{invalid')
    expect(readStoredMember()).toBeNull()
    expect(localStorage.getItem('member')).toBeNull()
  })

  it('아이디 저장 설정을 제외한 세션 값을 제거한다', () => {
    localStorage.setItem('LS_KEY_ID', 'biscuit')
    localStorage.setItem('member', '{}')
    clearSessionStorage()
    expect(localStorage.getItem('LS_KEY_ID')).toBe('biscuit')
    expect(localStorage.getItem('member')).toBeNull()
  })
})
