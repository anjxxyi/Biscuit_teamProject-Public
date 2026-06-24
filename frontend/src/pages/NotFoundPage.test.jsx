import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {
  it('잘못된 경로 안내와 홈 이동 link를 제공한다', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없습니다.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '홈으로 이동' })).toHaveAttribute('href', '/')
  })
})
