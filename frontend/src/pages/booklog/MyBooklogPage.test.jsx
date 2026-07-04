import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Context } from '../../components/store/Context'
import { previewAdapter } from '../../preview/adapter'
import { previewUser } from '../../preview/fixtures'
import apiClient from '../../api/client'
import MyBooklogPage from './MyBooklogPage'

describe('북로그 조회', () => {
  it.each([undefined, previewUser])('비로그인과 로그인 상태에서 공개 북로그와 게시글을 표시한다', async (userInfo) => {
    const previousAdapter = apiClient.defaults.adapter
    apiClient.defaults.adapter = previewAdapter
    const loginChk = vi.fn()
    const view = render(
      <MemoryRouter initialEntries={['/booklog/preview']}>
        <Context.Provider value={{ userInfo, loginChk }}>
          <Routes><Route path="/booklog/:no" element={<MyBooklogPage />} /></Routes>
        </Context.Provider>
      </MemoryRouter>,
    )
    try {
      expect(await screen.findByText('바삭한독서가')).toBeInTheDocument()
      fireEvent.click(screen.getAllByRole('tab')[1])
      expect(await screen.findByRole('link', { name: /마음을 이해하는 연습/ })).toHaveAttribute('href', '/booklog/preview/1')
      expect(loginChk).not.toHaveBeenCalled()
    } finally {
      view.unmount()
      apiClient.defaults.adapter = previousAdapter
    }
  })
})
