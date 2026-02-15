import axios from 'axios'
import { annotateApiError } from './errors'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(annotateApiError(error)),
)

export default apiClient
