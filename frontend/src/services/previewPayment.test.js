import apiClient from '../api/client'
import { requestPay } from './previewPayment'

vi.mock('../api/client', () => ({
  default: { post: vi.fn(), put: vi.fn() },
}))

const paymentInfo = {
  name: '바삭 정기권',
  price: 12800,
  pd_type: 'T',
  pd_no: 26,
  pd_cnt: 1,
  userInfo: {
    email: 'member@example.com',
    name: '비스킷',
    phone: '010-0000-0000',
    address: '서울시',
    address_detail: '1층',
    zipCode: '00000',
    no: 1,
  },
}

const installPaymentModule = () => {
  let completePayment
  window.IMP = {
    init: vi.fn(),
    request_pay: vi.fn((_data, callback) => {
      completePayment = callback
    }),
  }
  return (response) => completePayment(response)
}

describe('preview payment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('alert', vi.fn())
    delete window.IMP
  })

  it('결제 module이 없으면 요청하지 않고 실패 상태를 반환한다', () => {
    const result = requestPay(paymentInfo)

    expect(result.result).toBe(false)
    expect(alert).toHaveBeenCalledWith('결제 모듈을 불러오지 못했습니다.')
    expect(apiClient.post).not.toHaveBeenCalled()
  })

  it('승인 실패 시 주문을 저장하지 않는다', () => {
    window.IMP = {
      init: vi.fn(),
      request_pay: vi.fn((_data, callback) => callback({ success: false })),
    }

    requestPay(paymentInfo)

    expect(apiClient.post).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('결제가 취소되었습니다.')
  })

  it('일반 결제 승인 후 주문을 저장한다', async () => {
    apiClient.post.mockResolvedValue({})
    const completePayment = installPaymentModule()

    requestPay(paymentInfo)
    await completePayment({ success: true })

    expect(window.IMP.init).toHaveBeenCalledWith('imp55171728')
    expect(apiClient.post).toHaveBeenCalledWith('/api/orders/add', expect.objectContaining({ pd_type: 'T' }))
    expect(apiClient.put).not.toHaveBeenCalled()
    expect(alert).toHaveBeenCalledWith('결제가 완료되었습니다.')
  })

  it('캠페인 도서 결제 후 판매 상태를 변경한다', async () => {
    apiClient.post.mockResolvedValue({})
    apiClient.put.mockResolvedValue({})
    const completePayment = installPaymentModule()

    requestPay({ ...paymentInfo, pd_type: 'R', pd_no: 55 })
    await completePayment({ success: true })

    expect(apiClient.put).toHaveBeenCalledWith('/api/campaign/55/sale', { saleYn: 'Y' })
  })
})
