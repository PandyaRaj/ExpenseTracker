export function getFormatDate(date) {
  // Adjust to local time before ISO conversion
  const tzOffset = date.getTimezoneOffset() * 60000
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 10)
  return localISOTime
}

export function getDateMinusDays(date, days) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}
