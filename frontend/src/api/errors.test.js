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

  it('빈 서버 메시지 대신 다음 오류 내용을 사용한다', () => {
    const error = { response: { data: { message: ' ', error: 'invalid request' } } }
    expect(getApiErrorMessage(error)).toBe('invalid request')
  })

  it('오류 정보가 없으면 공통 안내를 반환한다', () => {
    expect(getApiErrorMessage({})).toBe('요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.')
  })
})
