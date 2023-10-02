<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md" style="max-width: 400px">

      <q-form
        @submit="enterNameFilter"
        @reset="resetNameFilter"
        class="q-gutter-md"
>
          <q-input
            filled
            type = 'text'
            v-model="this.pagination.nameFilter"
            label="Name: "
            lazy-rules
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>

    <div class="q-pa-md" style="max-width: 400px">

      <q-form
        @submit="enterDateFilter"
        @reset="resetDateFilter"
        class="q-gutter-md"
>
          <q-input
            filled
            type = 'date'
            v-model="this.pagination.dateFilter"
            label="Name: "
            lazy-rules
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
      </q-form>
    </div>

    <div class="row">
      <q-table
        title= 'FSTEC'
        :rows = 'rows'
        :columns = 'columns'
        row-key = 'id'
        :rows-per-page-options = '[10, 30, 50, 70, 100]'
        v-model:pagination = 'pagination'
        :loading = 'loading'
        @request = 'onRequest'
      >
      <template #loading>
        <q-inner-loading
          showing
          color = 'secondary'
        />
      </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
import { getJwtToken } from 'src/boot/jwt'
import { getRowsNumberCount, fetchDataFromServer } from 'src/boot/requests'

export default {

  name: 'MainPage',

  data () {
    return {
      token: '',
      rows: [],
      loading: false,
      pagination: {
        sortBy: 'id',
        nameFilter: null,
        dateFilter: null,
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: row => row.id,
          align: 'center'
        },
        {
          name: 'name',
          label: 'Name',
          field: row => row.attributes.vul_name,
          align: 'left'
        },
        {
          name: 'date',
          label: 'Date',
          field: row => row.attributes.vul_datv,
          align: 'center'
        }
      ]
    }
  },

  async mounted () {
    this.token = await getJwtToken()
    await this.onRequest({
      pagination: this.pagination
    })
  },

  methods: {

    async onRequest (props) {
      // eslint-disable-next-line no-unused-vars
      const { sortBy, nameFilter, dateFilter, descending, page, rowsPerPage } = props.pagination

      this.loading = true

      this.pagination.rowsNumber = await getRowsNumberCount(this.token)

      const feetchCount = rowsPerPage === 0 ? this.pagination.value.rowsNumber : rowsPerPage
      const startRow = (page - 1) * rowsPerPage

      const returnedData = await fetchDataFromServer(this.token, startRow, feetchCount)

      this.rows.splice(0, this.rows.length, ...returnedData)

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage

      this.loading = false
    },

    // nameFilter-block:
    async enterNameFilter () {
      this.pagination.sortBy = 'name'

      await this.onRequest({
        pagination: this.pagination
      })
    },

    async resetNameFilter () {
      this.pagination.sortBy = 'id'
      this.pagination.nameFilter = null
      console.log(this.pagination.nameFilter, this.pagination.sortBy, 'nameFilter - disconnect!')

      await this.onRequest({
        pagination: this.pagination
      })
    },

    // dateFilter-block:
    async enterDateFilter () {
      this.pagination.sortBy = 'date'

      await this.onRequest({
        pagination: this.pagination
      })
    },

    async resetDateFilter () {
      this.pagination.sortBy = 'id'
      this.pagination.dateFilter = null
      console.log(this.pagination.dateFilter, this.pagination.sortBy, 'dataFilter - disconnect!')

      await this.onRequest({
        pagination: this.pagination
      })
    }

  }

}
</script>
