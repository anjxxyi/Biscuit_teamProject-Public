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

describe('preview payment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('alert', vi.fn())
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
})
