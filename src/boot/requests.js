import { api } from './axios'

export async function fetchDataFromServer (token, startRow, count) {
  try {
    const response = await api.get('/api/Vuls?page[limit]=' + String(count) + '&page[offset]=' + String(startRow) + '&sort=-id', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export async function getRowsNumberCount (token) {
  try {
    const response = await api.get('/api/Vuls?', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.meta.count
  } catch (error) {
    console.error(error)
  }
}
