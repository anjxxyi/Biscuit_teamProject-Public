const USER_ID_PATTERN = /^[a-zA-Z0-9]{8,16}$/
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

export const isValidUserId = (value) => USER_ID_PATTERN.test(String(value ?? ''))
export const isValidPassword = (value) => PASSWORD_PATTERN.test(String(value ?? ''))
export const isValidNickname = (value) => {
  const nickname = String(value ?? '').trim()
  return nickname.length >= 2 && nickname.length <= 8
}
