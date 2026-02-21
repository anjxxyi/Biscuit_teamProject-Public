const pad = (value) => String(value).padStart(2, '0')

export function toFormatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return [
    `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  ].join(' ')
}
