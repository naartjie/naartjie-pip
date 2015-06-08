export function isoToHuman(date) {
  if (!date) return undefined

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
