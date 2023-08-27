<template>
  <q-page class="flex flex-center">
      <p>JWT токен: {{ token }}</p>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      token: null
    }
  },
  async mounted () {
    await this.fetchToken()
  },
  methods: {
    async fetchToken () {
      const url = 'https://bdu.fstec.ru/site-api/v1/auth'
      const data = {
        username: 'api-demo',
        password: 'api-demo'
      }

      try {
        const response = await axios.post(url, data)
        this.token = response.data.token // Поправьте путь к токену в ответе
      } catch (error) {
        console.error('Ошибка при получении токена:', error)
      }
    }
  }
}
</script>
