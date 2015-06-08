export default validate

export const isValidMsisdn = (msisdn) => valid('msisdn')(msisdn)
export const isValidMobile = (mobile) => valid('mobile')(mobile)
export const isValidEmail = (email) => valid('email')(email)

export function isValidIsoDate(date) {
  if (!pattern.isoDate.test(date)) return false

  const [year, month, day] = date.split('-')
  const check = new Date(year, month - 1, day, 12)

  return date === check.toISOString().slice(0, 10);
}

// extra exports so different import options work

validate.isValidMsisdn = isValidMsisdn
validate.isValidMobile = isValidMobile
validate.isValidEmail = isValidEmail
validate.isValidIsoDate = isValidIsoDate

function validate({msisdn, mobile}) {

  if (!(mobile ^ msisdn)) throw Error(`please provide one of 'mobile' or 'msisdn' to validate`)

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

const toMsisdn = (validMobile) => `27${validMobile.slice(-9)}`
const toMobile = (validMsisdn) => `0${validMsisdn.slice(-9)}`
const valid = (type) => (entity) => pattern[type].test(entity)

const pattern = {
  // standard MSISDN format: 27849266611
  msisdn: /^27[6-8][0-9]{8}$/,

  // any format a human might write (excluding brackets and spaces)
  // 0849266611 / +278492666111 / 0027 etc etc
  mobile: /^(\+?(00)?270?|0)[6-8][0-9]{8}$/,

  // YYYY-MM-DD, with years limited to 1900-2100
  isoDate: /^(19|20|21)\d\d-[0|1]\d-[0-3]\d$/,

  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}