import { toDateString, createRequestHeaders } from '../../utils/helpers'

test('toDateString should return empty string', () => {
  const unixTime = ''
  const result = toDateString(unixTime)
  expect(result).toBe('')
})

test('toDateString should return date in dd MMM YYYY format', () => {
  const unixTime = Date.parse('01/01/1980')
  const result = toDateString(unixTime)
  expect(result).toBe('01 Jan 1980')
})

test('createRequestHeaders should return default header', () => {
  const result = createRequestHeaders()
  const authorizationHeader = result.get('Authorization')
  expect(authorizationHeader).not.toBeNull()
})

test('createRequestHeaders should return customized header', () => {
  const jsonType = 'application/json'
  const config = { 'Content-Type': jsonType }

  const result = createRequestHeaders(config)
  const contentTypeHeader = result.get('Content-Type')
  expect(contentTypeHeader).toBe(jsonType)
})
