const MEMBER_KEY = 'member'
const PRESERVED_AUTH_KEYS = ['LS_KEY_SAVE_ID_FLAG', 'LS_KEY_ID']

export function readStoredMember(storage = localStorage) {
  const value = storage.getItem(MEMBER_KEY)
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    storage.removeItem(MEMBER_KEY)
    return null
  }
}

export function clearSessionStorage(storage = localStorage) {
  Object.keys(storage).forEach((key) => {
    if (!PRESERVED_AUTH_KEYS.includes(key)) storage.removeItem(key)
  })
}
