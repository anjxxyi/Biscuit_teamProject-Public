import apiClient from '../api/client'

const createMerchantUid = (date = new Date()) =>
  `IMP${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}${date.getFullYear()}${date.getMonth()}`

function createPaymentData(info) {
  const merchantUid = createMerchantUid()
  const order = {
    pay_method: 'card',
    merchant_uid: merchantUid,
    buyer_email: info.userInfo.email,
    buyer_name: info.userInfo.name,
    buyer_tel: info.userInfo.phone,
    buyer_addr: `${info.userInfo.address} ${info.userInfo.address_detail}`,
    buyer_postcode: info.userInfo.zipCode,
    user_no: info.userInfo.no,
    name: info.name,
    amount: info.price,
    pd_type: info.pd_type,
    pd_no: info.pd_no,
    pd_cnt: info.pd_cnt,
  }

  return {
    checkout: {
      ...order,
      pg: 'kcp.{INIpayTest}',
      display: { card_quota: [3] },
    },
    order,
  }
}

async function persistPreviewOrder(order) {
  await apiClient.post('/api/orders/add', order)
  if (order.pd_type === 'R') {
    await apiClient.put(`/api/campaign/${order.pd_no}/sale`, { saleYn: 'Y' })
  }
  if (order.pd_type === 'G') {
    await apiClient.put(`/api/goods/${order.pd_no}/sale`)
  }
}

// Preview-only flow: 실제 운영 결제 승인 검증을 대신하지 않습니다.
export function requestPay(info) {
  const { checkout, order } = createPaymentData(info)
  const payment = window.IMP
  payment.init('imp55171728')

  payment.request_pay(checkout, async () => {
    await persistPreviewOrder(order)
    alert('결제가 완료되었습니다.')
  })

  return { data: checkout, result: undefined }
}
