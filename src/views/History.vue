<template>
  <div>
    <table-ambient-history />
    <table-door-history />
  </div>
</template>

<script>
import TableDoorHistory from './tables-components/TableDoorHistory.vue'
import TableAmbientHistory from './tables-components/TableAmbientHistory.vue'

export default {
  components: {
    TableDoorHistory,
    TableAmbientHistory,
  },
}
</script>
