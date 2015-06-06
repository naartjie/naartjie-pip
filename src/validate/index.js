export const isValidMsisdn = (msisdn) => isValid('msisdn')(msisdn)
export const isValidMobile = (mobile) => isValid('mobile')(mobile)
export const isValidEmail = (email) => isValid('email')(email)

export function isValidIsoDate(date) {
  if (!pattern.isoDate.test(date)) return false

  const [year, month, day] = date.split('-')
  const check = new Date(year, month - 1, day, 12)

  return date === check.toISOString().slice(0, 10);
}

const isValid = (type) => (entity) => pattern[type].test(entity)

const pattern = {
  // standard MSISDN format: 27849266611
  msisdn: /^27[6-8][0-9]{8}$/,

  // any format a human might write (excluding brackets and spaces)
  // 0849266611 / +278492666111 / 0027 etc etc
  mobile: /^(\+?(00)?270?|0)[6-8][0-9]{8}$/,

  // YYYY-MM-DD
  isoDate: /^[1|2]\d\d\d-[0|1]\d-[0-3]\d$/,

  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}