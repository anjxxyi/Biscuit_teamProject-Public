import { render, screen } from '@testing-library/react'

import LoadingSmall from './LoadingSmall'

describe('LoadingSmall', () => {
  it('대기 메시지를 표시한다', () => {
    render(<LoadingSmall />)

    expect(screen.getByText('Please wait for a moment')).toBeInTheDocument()
  })

  it('투명 배경 옵션을 적용한다', () => {
    const { container } = render(<LoadingSmall opacity />)

    expect(container.firstChild).toHaveStyle({ background: 'none' })
  })
})
