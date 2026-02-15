const DEFAULT_ERROR_MESSAGE = '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.'

export function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ??
    error?.response?.data?.error ??
    error?.message ??
    DEFAULT_ERROR_MESSAGE
  )
}

export function annotateApiError(error) {
  if (error && !error.userMessage) error.userMessage = getApiErrorMessage(error)
  return error
}
