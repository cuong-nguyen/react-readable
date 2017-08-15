const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qIjoicmVhZGFibGUiLCJuYW1lIjoiQ3VvbmcgTmd1eWVuIiwic3RhdHVzIjoic2luZ2xlIn0.207hT9JVAzcdI0tmxdYC3IiCXu_0sEYSAI0T82f7fOU'

export const createRequestHeaders = (config) => {
	let headers = new Headers()
	headers.set('authorization', token)

	if (config) {
		return Object.assign({}, headers, config)
	}

	return headers
}