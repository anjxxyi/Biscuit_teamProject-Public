import apiClient from '../api/client'
import { requestPay } from '../services/previewPayment'
import { toFormatDate } from '../utils/date'

const GET = (url, config) => apiClient.get(url, config)
const POST = (url, data, config) => apiClient.post(url, data, config)
const PUT = (url, data, config) => apiClient.put(url, data, config)

export { GET, POST, PUT, requestPay, toFormatDate }
