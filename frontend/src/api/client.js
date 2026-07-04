import axios from 'axios'
import { annotateApiError } from './errors'
import { previewAdapter } from '../preview/adapter'
import { isPreviewMode } from '../preview/config'

const apiClient = axios.create({
  adapter: isPreviewMode ? previewAdapter : undefined,
  baseURL: isPreviewMode ? undefined : import.meta.env.VITE_API_HOST,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(annotateApiError(error)),
)

export default apiClient
