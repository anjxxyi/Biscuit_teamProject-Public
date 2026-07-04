import {
  previewArticles,
  previewBookclasses,
  previewBooklog,
  previewBooklogs,
  previewBooks,
  previewCampaigns,
  previewComments,
  previewEvents,
  previewGoods,
  previewOrders,
  previewUser,
  previewReader,
} from './fixtures'

const clone = (value) => JSON.parse(JSON.stringify(value))
const wait = (duration = 120) => new Promise((resolve) => setTimeout(resolve, duration))

const state = {
  comments: clone(previewComments),
  subscriptions: [],
  bookclasses: clone(previewBookclasses),
  clips: previewBooks.map((book) => ({ no: book.no, books: clone(book), updatedAt: '2026-11-16T20:00:00' })),
  orders: clone(previewOrders),
  participants: Object.fromEntries(previewEvents.map((event) => [event.no, [
    { no: event.no * 10, created_at: [2026, 11, 16], user_no: clone(previewReader) },
  ]])),
}

const parseData = (value) => {
  if (!value || typeof value !== 'string') return value ?? {}
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const response = (config, data, status = 200) => ({
  config,
  data: clone(data),
  headers: {},
  request: {},
  status,
  statusText: status === 200 ? 'OK' : 'Created',
})

const rejected = (config, status, data) => {
  const error = new Error('Preview request rejected')
  error.config = config
  error.response = response(config, data, status)
  return Promise.reject(error)
}

const goodsDetail = (no) => {
  const item = previewGoods.find(({ goods }) => String(goods.no) === String(no)) ?? previewGoods[0]
  return [
    { goods: item.goods, images: item.images },
    { goods: item.goods, images: { imgPath: item.detailImage } },
  ]
}

const eventList = () => previewEvents.map((event) => ({
  event,
  images: { imgName: event.title, imgPath: event.thumbnail, thumbnailYn: 'Y' },
}))

const eventDetail = (no) => {
  const event = previewEvents.find((item) => String(item.no) === String(no)) ?? previewEvents[0]
  return [{ event, images: { imgName: event.title, imgPath: event.contentImage, thumbnailYn: 'N' } }]
}

const filterByKeyword = (items, keyword, fields) => {
  if (!keyword) return items
  const normalized = keyword.toLowerCase()
  return items.filter((item) => fields.some((field) => String(field(item) ?? '').toLowerCase().includes(normalized)))
}

export async function previewAdapter(config) {
  await wait()

  const method = (config.method ?? 'get').toLowerCase()
  const requestUrl = new URL(config.url, window.location.origin)
  const path = requestUrl.pathname
  const body = parseData(config.data)

  if (method === 'post' && path === '/api/auth/signin') {
    if (body.userId !== 'preview' || body.password !== 'biscuit123!') {
      return rejected(config, 401, { status: 401 })
    }
    return response(config, previewUser)
  }
  if (method === 'post' && path === '/api/auth/signup') return response(config, { ...previewUser, ...body }, 201)
  if (method === 'get' && path === '/api/auth/idCheck') return response(config, false)
  if (method === 'get' && path === '/api/auth/idCheck/quitYn') return response(config, false)
  if (method === 'get' && path === '/api/auth/nicknameCheck') return response(config, false)
  if (path === '/api/auth/findId') return response(config, { userId: 'preview' })
  if (path.startsWith('/api/auth/findPw')) return response(config, { userId: 'preview' })

  if (method === 'post' && path === '/api/books/list') {
    const items = filterByKeyword(previewBooks, body.title, [(book) => book.title, (book) => book.author])
    return response(config, { display: items.length, items, total: items.length })
  }
  if (method === 'post' && path === '/api/books/info') {
    const book = previewBooks.find((item) => item.isbn === body.isbn) ?? previewBooks[0]
    return response(config, { book, cliped: state.clips.some((item) => item.books.no === book.no) })
  }
  if (method === 'put' && path === '/api/books/delclip') {
    state.clips = state.clips.filter((item) => item.books.no !== Number(body.bookNo))
    return response(config, { success: true })
  }
  if (method === 'post' && path === '/api/books/clip') {
    const book = previewBooks.find((item) => item.isbn === body.isbn)
    if (book && !state.clips.some((item) => item.books.no === book.no)) state.clips.push({ no: book.no, books: clone(book), updatedAt: new Date().toISOString() })
    return response(config, { success: true })
  }
  if (path === '/api/booklogarticles/books') return response(config, previewBooks)
  if (path === '/api/booklogarticles/books/search') {
    return response(config, filterByKeyword(previewBooks, requestUrl.searchParams.get('title'), [(book) => book.title]))
  }

  if (method === 'get' && path.startsWith('/api/goods/list')) {
    if (path.endsWith('/inventory')) return response(config, previewGoods.filter(({ goods }) => goods.inventory === 0))
    const showAll = path.endsWith('/all') || requestUrl.searchParams.get('saleYn') == null
    return response(config, showAll ? previewGoods : previewGoods.filter(({ goods }) => goods.saleYn === 'Y'))
  }
  if (method === 'get' && /^\/api\/goods\/\d+$/.test(path)) return response(config, goodsDetail(path.split('/').pop()))

  if (method === 'get' && path === '/api/events') return response(config, eventList())
  if (method === 'get' && /^\/api\/events\/\d+$/.test(path)) return response(config, eventDetail(path.split('/').pop()))
  if (method === 'get' && path.startsWith('/api/participations/events/')) return response(config, state.participants[path.split('/').pop()] ?? [])
  const participationMatch = path.match(/^\/api\/events\/(\d+)\/participate\/(\d+)$/)
  if (participationMatch && ['post', 'delete'].includes(method)) {
    const [, eventNo, userNo] = participationMatch
    const participants = state.participants[eventNo]
    const user = [previewUser, previewReader].find((item) => String(item.no) === userNo)
    if (!participants || !user) return rejected(config, 404, { status: 404 })
    if (method === 'post' && !participants.some((item) => item.user_no.no === user.no)) {
      const now = new Date()
      participants.push({ no: Date.now(), created_at: [now.getFullYear(), now.getMonth() + 1, now.getDate()], user_no: clone(user) })
    } else if (method === 'delete') {
      state.participants[eventNo] = participants.filter((item) => item.user_no.no !== user.no)
    }
    return response(config, { success: true })
  }

  if (method === 'get' && path.startsWith('/api/campaign/list')) {
    const acceptYn = requestUrl.searchParams.get('acceptYn')
    return response(config, acceptYn ? previewCampaigns.filter((item) => item.acceptYn === acceptYn) : previewCampaigns)
  }
  if (method === 'get' && /^\/api\/campaign\/\d+$/.test(path)) {
    return response(config, previewCampaigns.find((item) => String(item.recycleNo) === path.split('/').pop()) ?? previewCampaigns[0])
  }

  if (method === 'post' && ['/api/bookclass/party/in', '/api/bookclass/party/out'].includes(path)) {
    const item = state.bookclasses.find((entry) => entry.no === Number(body.bookclassNo))
    if (!item) return rejected(config, 404, { status: 404 })
    const joining = path.endsWith('/in')
    if (joining && item.partyMemCnt >= item.memberCnt) return response(config, 'max')
    if (joining !== item.joined) item.partyMemCnt += joining ? 1 : -1
    item.joined = joining
    return response(config, 'success')
  }
  if (method === 'get' && path.startsWith('/api/bookclass/list/')) return response(config, state.bookclasses)
  if (method === 'get' && path.startsWith('/api/bookclass/search/')) {
    const keyword = decodeURIComponent(path.match(/q=([^&]+)/)?.[1] ?? '')
    return response(config, filterByKeyword(previewBookclasses, keyword, [(item) => item.title, (item) => item.intro]))
  }
  if (method === 'get' && path.startsWith('/api/bookclass/all/')) return response(config, previewBookclasses)
  if (method === 'get' && /\/api\/bookclass\/classNo=/.test(path)) {
    const no = path.match(/classNo=(\d+)/)?.[1]
    return response(config, state.bookclasses.find((item) => String(item.no) === no) ?? state.bookclasses[0])
  }
  if (method === 'get' && /^\/api\/bookclass\/\d+\/e$/.test(path)) {
    return response(config, previewBookclasses.find((item) => String(item.no) === path.split('/')[3]) ?? previewBookclasses[0])
  }

  if (method === 'get' && path === '/api/booklogarticles') return response(config, previewArticles)
  if (method === 'get' && path === '/api/booklogarticles/search') {
    const keyword = requestUrl.searchParams.get('keyword')
    return response(config, filterByKeyword(previewArticles, keyword, [(item) => item.title, (item) => item.content]))
  }
  if (method === 'get' && path.startsWith('/api/paginate/booklogarticles')) {
    const page = Number(requestUrl.searchParams.get('page') ?? 0)
    return response(config, { content: page === 0 ? previewArticles : [], last: true, totalElements: previewArticles.length })
  }
  if (method === 'get' && path.startsWith('/api/booklogarticles/user/')) return response(config, previewArticles.filter((article) => String(article.booklog.user.no) === path.split('/').pop()))
  if (method === 'get' && /^\/api\/booklogarticles\/\d+$/.test(path)) {
    return response(config, previewArticles.find((item) => String(item.no) === path.split('/').pop()) ?? previewArticles[0])
  }
  if (method === 'get' && path === '/api/booklogs') return response(config, previewBooklogs)
  if (method === 'get' && path === '/api/booklogs/search') return response(config, previewBooklogs)
  if (method === 'get' && path.startsWith('/api/booklogs/')) return response(config, previewBooklogs.find((blog) => blog.user.userId === path.split('/').pop()) ?? previewBooklog)
  if (method === 'post' && /^\/api\/subscribe\/\d+\/\d+$/.test(path)) {
    const [, , , source, target] = path.split('/')
    const user = previewBooklogs.find((blog) => String(blog.user.no) === source)?.user
    const followed = previewBooklogs.find((blog) => String(blog.user.no) === target)?.user
    if (user && followed && source !== target && !state.subscriptions.some((item) => item.user_no.no === user.no && item.subed_no.no === followed.no)) {
      state.subscriptions.push({ no: Date.now(), user_no: user, subed_no: followed })
    }
    return response(config, { success: true })
  }
  if (method === 'delete' && /^\/api\/subscriptions\/\d+\/\d+$/.test(path)) {
    const [, , , source, target] = path.split('/')
    state.subscriptions = state.subscriptions.filter((item) => !(String(item.user_no.no) === source && String(item.subed_no.no) === target))
    return response(config, { success: true })
  }
  if (method === 'get' && path.startsWith('/api/subscribers/')) return response(config, state.subscriptions.filter((item) => String(item.user_no.no) === path.split('/').pop()))
  if (method === 'get' && path.startsWith('/api/subscribeBlog/')) return response(config, state.subscriptions.filter((item) => String(item.subed_no.no) === path.split('/').pop()))

  if (method === 'get' && path.startsWith('/api/comments/booklogarticles/')) return response(config, state.comments)
  if (method === 'get' && /\/api\/comments\/\d+\/recomments/.test(path)) return response(config, [])
  if (method === 'get' && path.startsWith('/api/comments/count/')) return response(config, state.comments.length)
  if (method === 'post' && path === '/api/comments') {
    state.comments.push({ no: Date.now(), content: body.content, del_yn: 'N', updated_at: [2026, 11, 17, 20, 0, 0], user_no: clone(previewUser) })
    return response(config, state.comments.at(-1), 201)
  }

  if (method === 'get' && path.startsWith('/api/orders/list/')) return response(config, state.orders)
  if (method === 'post' && path === '/api/orders/sort') return response(config, state.orders.filter((item) => item.statusCode === body.order_status))
  if ((method === 'get' && path.startsWith('/api/orders/cancel/')) || (method === 'post' && path === '/api/orders/change')) {
    const no = Number(body.order_no ?? path.split('/').pop())
    const item = state.orders.find((entry) => entry.no === no)
    if (item) {
      item.statusCode = method === 'get' ? 'C' : body.order_status
      item.status = item.statusCode === 'C' ? '주문 취소' : '배송완료'
    }
    return response(config, { success: true })
  }
  if (method === 'post' && path === '/api/member/clip') {
    const items = [...state.clips]
    if (body.sortNum === 1) items.sort((a, b) => a.books.price - b.books.price)
    return response(config, items)
  }
  if (method === 'post' && path.startsWith('/api/member/class/')) {
    let items = state.bookclasses.filter((item) => path.endsWith('/open') ? item.leaderNickname === previewUser.nickname : item.joined)
    if (body.sortNum === 1) items = items.filter((item) => item.status === '모집중')
    if (body.sortNum === 2) items = items.filter((item) => item.status === (path.endsWith('/open') ? '신청중' : '종료됨'))
    return response(config, items.map((item) => ({ ...item, createdAt: '2026-11-01T19:00:00' })))
  }
  if (method === 'get' && path.startsWith('/api/admin/list/')) return response(config, [previewUser])

  if (method === 'get') return response(config, [])
  return response(config, { success: true, preview: true }, method === 'post' ? 201 : 200)
}
