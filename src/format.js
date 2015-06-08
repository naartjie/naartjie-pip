export function isoToHuman(date) {
  if (!date) return undefined

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export function humanToIso(date) {
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day}`
}