import {isValidHumanDate} from './validate'

export function isoToHuman(date) {
  if (!date) return undefined

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export function humanToIso(date) {
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day}`
}

export function parseHumanDate(date) {
  if (!isValidHumanDate(date)) return undefined;
  const [day, month, year] = date.split('/')
  return new Date(year, month - 1, day)
}