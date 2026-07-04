import { previewAdapter } from './adapter'

describe('preview API adapter', () => {
  it('북클립 삭제와 주문 상태 변경을 다시 조회한 목록에 반영한다', async () => {
    await previewAdapter({ method: 'put', url: '/api/books/delclip', data: JSON.stringify({ bookNo: 101 }) })
    const clips = await previewAdapter({ method: 'post', url: '/api/member/clip', data: '{}' })
    expect(clips.data.some((item) => item.books.no === 101)).toBe(false)
    await previewAdapter({ method: 'post', url: '/api/books/clip', data: JSON.stringify({ isbn: '9788936434267' }) })
    await previewAdapter({ method: 'post', url: '/api/orders/change', data: JSON.stringify({ order_no: 1, order_status: 'E' }) })
    const orders = await previewAdapter({ method: 'post', url: '/api/orders/sort', data: JSON.stringify({ order_status: 'E' }) })
    expect(orders.data[0].status).toBe('배송완료')
    expect((await previewAdapter({ method: 'post', url: '/api/orders/sort', data: JSON.stringify({ order_status: 'D' }) })).data).toEqual([])
  })

  it('북클립과 주문내역에 화면이 사용하는 필드를 제공한다', async () => {
    const clips = await previewAdapter({ method: 'post', url: '/api/member/clip', data: '{}' })
    expect(clips.data[0].books.isbn).toBeTruthy()
    expect(clips.data[0].books.bookImgUrl).toMatch(/^https:/)
    const orders = await previewAdapter({ method: 'get', url: '/api/orders/list/1' })
    expect(orders.data[0].orderPrice).toEqual(expect.any(Number))
    expect(orders.data[0].gimgPath).toBeTruthy()
    expect(orders.data[0].createdAt).toBeTruthy()
  })

  it('참여와 취소를 이벤트별로 격리하고 중복 참여를 방지한다', async () => {
    const list = (no) => previewAdapter({ method: 'get', url: `/api/participations/events/${no}` })
    const secondBefore = (await list(2)).data
    expect((await list(1)).data[0].user_no.nickname).toBe('책과쿠키')
    await previewAdapter({ method: 'post', url: '/api/events/1/participate/1' })
    await previewAdapter({ method: 'post', url: '/api/events/1/participate/1' })
    expect((await list(1)).data.filter((item) => item.user_no.no === 1)).toHaveLength(1)
    expect((await list(2)).data).toEqual(secondBefore)
    await previewAdapter({ method: 'delete', url: '/api/events/1/participate/1' })
    expect((await list(1)).data.map((item) => item.user_no.no)).toEqual([2])
    expect((await list(2)).data).toEqual(secondBefore)
  })

  it('다른 사용자 북로그의 구독 및 취소를 목록에 반영한다', async () => {
    const blog = await previewAdapter({ method: 'get', url: '/api/booklogs/reader02' })
    expect(blog.data.user_no.nickname).toBe('책과쿠키')
    await previewAdapter({ method: 'post', url: '/api/subscribe/1/2' })
    const subscribers = await previewAdapter({ method: 'get', url: '/api/subscribeBlog/2' })
    expect(subscribers.data).toHaveLength(1)
    expect(subscribers.data[0].user_no.userId).toBe('preview')
    const following = await previewAdapter({ method: 'get', url: '/api/subscribers/1' })
    expect(following.data[0].subed_no.userId).toBe('reader02')
    await previewAdapter({ method: 'delete', url: '/api/subscriptions/1/2' })
    expect((await previewAdapter({ method: 'get', url: '/api/subscribeBlog/2' })).data).toEqual([])
  })

  it('도서 검색 목록을 fixture로 반환한다', async () => {
    const response = await previewAdapter({
      data: JSON.stringify({ title: '아몬드' }),
      method: 'post',
      url: '/api/books/list',
    })

    expect(response.status).toBe(200)
    expect(response.data.items).toHaveLength(1)
    expect(response.data.items[0].title).toBe('아몬드')
  })

  it('상품 상세 화면에 thumbnail과 content image를 제공한다', async () => {
    const response = await previewAdapter({ method: 'get', url: '/api/goods/1' })

    expect(response.data).toHaveLength(2)
    expect(response.data[0].goods.name).toBe('바삭군 북마크 세트')
  })

  it('지정된 preview 계정만 로그인시킨다', async () => {
    await expect(previewAdapter({
      data: JSON.stringify({ userId: 'wrong', password: 'wrong' }),
      method: 'post',
      url: '/api/auth/signin',
    })).rejects.toMatchObject({ response: { status: 401 } })

    const response = await previewAdapter({
      data: JSON.stringify({ userId: 'preview', password: 'biscuit123!' }),
      method: 'post',
      url: '/api/auth/signin',
    })
    expect(response.data.userId).toBe('preview')
  })
})
