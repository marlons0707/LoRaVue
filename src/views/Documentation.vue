<template>
  <div class="media-list">
    <b-card>
      <b-media vertical-align="top">
        <template #aside>
          <b-img
            :src="require('@/assets/images/portrait/small/s1.png')"
            blank-color="#ccc"
            width="64"
            alt="placeholder"
          />
        </template>
        <h4 class="media-heading">
          Sensor de temperatura y humedad
        </h4>
        <b-card-text class="mb-0">
          LHT65N cuenta con una batería no recargable incorporada de 2400 mAh que se puede usar hasta por 10 años (según las condiciones del proyecto). Permite enviar datos y alcanzar rangos extremadamente largos. Proporciona comunicación de espectro ensanchado de rango ultra largo y alta inmunidad a las interferencias al tiempo que minimiza el consumo de corriente. 
        </b-card-text>
      </b-media>
      <b-media vertical-align="top">
        <template #aside>
          <b-img
            :src="require('@/assets/images/portrait/small/s2.png')"
            blank-color="#ccc"
            width="64"
            alt="placeholder"
          />
        </template>
        <h4 class="media-heading">
          Sensor de apertura/cierre de puerta
        </h4>
        <b-card-text class="mb-0">
          LDS03A detecta el estado de la puerta y los informa al servidor IoT a través de la red LoRaWAN. Además del estado abierto o cerrado, también la duración abierta y la cantidad de veces que se abrió. Funciona con una batería Li-SOCI2 de 8500 mAh y se puede utilizar hasta por 10 años (según las condiciones del proyecto). Está diseñado para uso en exteriores ya que tiene una carcasa resistente a la intemperie y una batería de nivel industrial para trabajar en temperaturas bajas a altas. El sensor enviará datos periódicamente cada 2 horas, así como cada acción de apertura/cierre de puerta.
        </b-card-text>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import { BCard, BMedia, BImg, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BMedia,
    BImg,
    BCard,
    BCardText,
  },
}
</script>
