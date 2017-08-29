const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qIjoicmVhZGFibGUiLCJuYW1lIjoiQ3VvbmcgTmd1eWVuIiwic3RhdHVzIjoic2luZ2xlIn0.207hT9JVAzcdI0tmxdYC3IiCXu_0sEYSAI0T82f7fOU'
const hostOrigin = 'http://localhost:5001'

const createRequestHeaders = config => {
  let headers = new Headers()
  headers.set('authorization', token)

  if (config) {
    Object.keys(config).map(key => headers.set(key, config[key]))
  }

  return headers
}

const toDateString = unixTime => {
  const date = new Date(unixTime)
  return `${date.getDate()} ${monthNames[
    date.getMonth()
  ]} ${date.getFullYear()}`
}

export { hostOrigin, createRequestHeaders, toDateString }
