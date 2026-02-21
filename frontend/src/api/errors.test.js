import { annotateApiError, getApiErrorMessage } from './errors'

describe('API error helpers', () => {
  it('서버 응답 메시지를 우선한다', () => {
    const error = { response: { data: { message: '로그인이 필요합니다.' } }, message: 'failed' }
    expect(getApiErrorMessage(error)).toBe('로그인이 필요합니다.')
  })

  it('화면에서 사용할 오류 메시지를 원본 error에 추가한다', () => {
    const error = new Error('network error')
    expect(annotateApiError(error)).toBe(error)
    expect(error.userMessage).toBe('network error')
  })
})
