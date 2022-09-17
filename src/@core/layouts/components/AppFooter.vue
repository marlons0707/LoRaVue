<template>
  <p class="clearfix mb-0">
    <span class="float-md-right d-none d-md-block">
      Ingeniería en Sistemas
      <b-link
        class="ml-25"
        href="#"
        target="_blank"
      >PG 2022</b-link>
    </span>

    <span class="float-md-left d-block d-md-inline-block mt-25">Universidad Mariano Gálvez
      <feather-icon
        icon="BookIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
