import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import apiClient from '../../api/client'
import BooklogSearch from './BooklogSearch'

vi.mock('../../api/client', () => ({ default: { get: vi.fn() } }))

describe('북로그 검색 결과', () => {
  it.each(['both', 'legacy', 'current'])('응답 필드가 %s일 때 각 정보를 한 번만 표시한다', async (shape) => {
    const user = { nickname: '바삭한독서가', userId: 'preview', createdAt: '2023.08.21' }
    const blog = { no: 10 }
    if (shape !== 'current') Object.assign(blog, { user_no: user, booklog_name: '한입 독서 기록' })
    if (shape !== 'legacy') Object.assign(blog, { user, booklogName: '한입 독서 기록' })
    apiClient.get.mockImplementation((url) => Promise.resolve({ data: url === '/api/booklogs' ? [blog] : [] }))
    const view = render(<MemoryRouter><BooklogSearch /></MemoryRouter>)
    try {
      expect(await screen.findByText('바삭한독서가', { exact: true })).toBeInTheDocument()
      expect(screen.getByText('preview', { exact: true })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: '한입 독서 기록', exact: true })).toBeInTheDocument()
      expect(view.container.querySelector('.since').textContent).toBe('since2023.08.21')
      expect(screen.getByRole('link', { name: '방문하기' })).toHaveAttribute('href', '/booklog/preview')
    } finally { cleanup() }
  })
})
