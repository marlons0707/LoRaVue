<template>
  <b-card title="Información 👨🏽‍💻">
    <b-card-text>Marlon Josué Saravia Gregorio / 5190-14-3217</b-card-text>
    <b-card-text>
      Proyecto frontend realizado en VueJS, para consumir la información dada por el API Rest, mostrarla en una pantalla principal, responsive.
      También se creó el proyecto backend realizado en NodeJS, para recibir la información de los sensores, almacenarla en base de datos y exponer los datos con una API Rest.
    </b-card-text>
    <b-card-text></b-card-text>
  </b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
}
</script>
