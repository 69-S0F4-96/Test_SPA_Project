import { api } from './axios'

export async function getJwtToken () {
  try {
    const response = await api.post('/api/auth', {
      username: 'api-demo',
      password: 'api-demo'
    })
    return response.data.access_token
  } catch (error) {
    console.error(error)
  }
}
