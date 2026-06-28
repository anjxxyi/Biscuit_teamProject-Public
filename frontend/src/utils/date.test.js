import { toFormatDate } from './date'

describe('toFormatDate', () => {
  it('날짜와 시간을 두 자리 숫자로 표시한다', () => {
    expect(toFormatDate(new Date(2026, 0, 5, 9, 7))).toBe('2026.01.05 09:07')
  })

  it('유효하지 않은 날짜는 빈 문자열로 표시한다', () => {
    expect(toFormatDate('not-a-date')).toBe('')
  })

  it('자정의 시와 분을 두 자리로 유지한다', () => {
    expect(toFormatDate(new Date(2026, 1, 3, 0, 5))).toBe('2026.02.03 00:05')
  })

  it('timestamp 숫자 입력을 날짜로 변환한다', () => {
    const date = new Date(2026, 5, 30, 23, 59)
    expect(toFormatDate(date.getTime())).toBe('2026.06.30 23:59')
  })
})
