export default validate

export const isValidMsisdn = (msisdn) => valid('msisdn')(msisdn)
export const isValidMobile = (mobile) => valid('mobile')(mobile)
export const isValidEmail = (email) => valid('email')(email)

export function isValidIsoDate(date) {
  if (!valid('isoDate')(date)) return false

  const [year, month, day] = date.split('-')
  const check = new Date(year, month - 1, day, 12)

  return date === check.toISOString().slice(0, 10);
}

export function isValidHumanDate(date) {

  if (!valid('humanDate')(date)) return false

  let [day, month, year] = date.split('/')
  const check = new Date(year, month - 1, day, 12)

  day = pad(2, check.getDate())
  month = pad(2, check.getMonth() + 1)
  year = pad(4, check.getFullYear())

  return date === `${day}/${month}/${year}`
}

function pad(len, str) {
  return `0000000000${str}`.slice(-len)
}

// extra exports so different import options work
validate.sameNumbers = sameNumbers
validate.isValidMsisdn = isValidMsisdn
validate.isValidMobile = isValidMobile
validate.isValidEmail = isValidEmail
validate.isValidIsoDate = isValidIsoDate
validate.isValidHumanDate = isValidHumanDate

/**
 * @param {msisdn, mobile}
 * @returns {isValid, msisdn, mobile}
 */
export function validate({mobile, msisdn}) {

  if (mobile && msisdn) throw Error(`please provide only one, 'mobile' or 'msisdn'`)
  if (!mobile && !msisdn) return {isValid: false}

  if (mobile && isValidMobile(mobile)) return {
    isValid: true,
    msisdn: toMsisdn(mobile),
    mobile: toMobile(mobile),
  }

  else if (isValidMsisdn(msisdn)) return {
    isValid: true,
    msisdn: msisdn,
    mobile: toMobile(msisdn),
  }

  else return {
    isValid: false
  }
}

export function sameNumbers({mobile, msisdn}) {
  return validate({mobile}).msisdn === msisdn
}

export function toMsisdn(validMobile) {
  return `27${validMobile.slice(-9)}`
}

export function toMobile(validMsisdn) {
  return `0${validMsisdn.slice(-9)}`
}

const valid = (type) => (entity) => pattern[type].test(entity)

// normalized MSISDN format: 27849266611
const msisdnZA = '27[6-8][0-9]{8}'

// any format a human might write (excluding brackets and spaces)
// 0849266611 / +278492666111 / 0027 etc etc
const mobileZA = '(\\+?(00)?270?|0)[6-8][0-9]{8}'

const pattern = {
  msisdn: new RegExp(`^(${msisdnZA})$`),
  mobile: new RegExp(`^(${mobileZA})$`),

  // YYYY-MM-DD, with years limited to 1900-2100
  isoDate: /^(19|20|21)\d\d-[0|1]\d-[0-3]\d$/,

  // DD-MM-YYYY
  humanDate: /^[0-3]\d\/[0|1]\d\/(19|20|21)\d\d$/,


  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}