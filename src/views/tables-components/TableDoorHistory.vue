<template>
  <b-card-code
    title="Acciones de apertura/cierre"
    no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <!-- sorting  -->
        <b-form-group
          label="Ordenar"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="2"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
        >
          <b-input-group
            size="sm"
          >
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
            >
              <template #first>
                <option value="">
                  Ninguno
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>

        <!-- filter -->
        <b-form-group
          label="Filtrar"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Escribe para buscar"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </b-card-body>

    <b-table
      striped
      hover
      responsive
      class="position-relative"
      :per-page="perPage"
      :current-page="currentPage"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
    >
      <template #cell(DOOR_OPEN_STATUS)="data">
        <b-badge :variant="DOOR_OPEN_STATUS[1][data.value]">
          {{ DOOR_OPEN_STATUS[0][data.value] }}
        </b-badge>
      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
        label="Por página"
        label-cols="6"
        label-align="left"
        label-size="sm"
        label-for="sortBySelect"
        class="text-nowrap mb-md-0 mr-1"
      >
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          inline
          :options="pageOptions"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTable, BAvatar, BBadge, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton, BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCardCode,
    BTable,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [5, 10, 25],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: '_id', label: 'ID' },
        { key: 'DOOR_OPEN_STATUS', label: 'DOOR_OPEN_STATUS', sortable: true },
        { key: 'TIME', label: 'TIME', sortable: true },
        { key: 'ALARM', label: 'ALARM', sortable: true },
        { key: 'DOOR_OPEN_TIMES', label: 'DOOR_OPEN_TIMES', sortable: true },
        { key: 'LAST_DOOR_OPEN_DURATION', label: 'LAST_DOOR_OPEN_DURATION', sortable: true },
      ],
      items: [],
      DOOR_OPEN_STATUS: [{
        OPEN: 'OPEN', CLOSE: 'CLOSE',
      },
      {
        OPEN: 'danger', CLOSE: 'success',
      }],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },

  mounted() {
    this.getDoorData()
  },

  methods: {
    async getDoorData() {
      await fetch(`${process.env.VUE_APP_REST_API}/door`)
        .then(response => response.json())
        .then(res => {
          if (res.length > 0) {
            this.items = res
          }
        })

      this.totalRows = this.items.length
    },

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
