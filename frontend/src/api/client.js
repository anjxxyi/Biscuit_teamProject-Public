import axios from 'axios'
import { annotateApiError } from './errors'
import { previewAdapter } from '../preview/adapter'
import { apiHost, isPreviewMode } from '../preview/config'

const apiClient = axios.create({
  // Keep this switch in one place. See /docs/BACKEND_RECONNECT.md before a live cutover.
  adapter: isPreviewMode ? previewAdapter : undefined,
  baseURL: isPreviewMode ? undefined : apiHost,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(annotateApiError(error)),
)

export default apiClient
