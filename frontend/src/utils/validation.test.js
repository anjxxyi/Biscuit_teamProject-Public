import { isValidNickname, isValidPassword, isValidUserId } from './validation'

describe('회원 입력 validation', () => {
  it('아이디 길이와 문자 범위를 검사한다', () => {
    expect(isValidUserId('biscuit01')).toBe(true)
    expect(isValidUserId('short')).toBe(false)
  })

  it('비밀번호 조합을 검사한다', () => {
    expect(isValidPassword('biscuit1!')).toBe(true)
    expect(isValidPassword('biscuit')).toBe(false)
  })

  it('공백을 제외한 닉네임 길이를 검사한다', () => {
    expect(isValidNickname(' 바삭 ')).toBe(true)
    expect(isValidNickname(' 한 ')).toBe(false)
  })
})
