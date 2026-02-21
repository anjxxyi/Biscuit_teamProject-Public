import { toFormatDate } from './date'

describe('toFormatDate', () => {
  it('날짜와 시간을 두 자리 숫자로 표시한다', () => {
    expect(toFormatDate(new Date(2026, 0, 5, 9, 7))).toBe('2026.01.05 09:07')
  })

  it('유효하지 않은 날짜는 빈 문자열로 표시한다', () => {
    expect(toFormatDate('not-a-date')).toBe('')
  })
})
