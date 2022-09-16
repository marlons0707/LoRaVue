<template>
  <div>
    <b-row class="match-height">
      <!-- DOOR -->
      <b-col
        md="6"
        lg="6"
      >
        <b-card
          v-if="bgDoorCard != ''"
          :bg-variant="bgDoorCard"
          text-variant="white"
        >
          <b-card-title class="text-white">
            Estado de puerta
          </b-card-title>
          <b-card-text>
            {{ timeDoorStatus }}
          </b-card-text>
        </b-card>
      </b-col>

      <!-- CURRENT AMBIENT -->
      <b-col
        md="3"
        lg="3"
      >
        <b-card
          title="Temperatura"
        >
          <h2><b>{{ currentTemperature }}°C</b></h2>
        </b-card>
      </b-col>
      <b-col
        md="3"
        lg="3"
      >
        <b-card
          title="Humedad"
        >
          <h2><b>{{ currentHumidity }}%</b></h2>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col
        md="6"
        lg="6"
      >
        <b-card
          _title="Temperatura"
        >
          <div class="text-center">
            Actualizado el {{ currentTime() }}
          </div>
          <chartjs-component-line-chart
            v-if="dataTemp.labels.length > 0"
            :key="componentTempKey"
            :height="250"
            :data="dataTemp"
            :options="optionsTemp"
          />
          <!-- <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            class="mt-2"
            variant="outline-primary"
          >
            Ver más
          </b-button> -->
        </b-card>
      </b-col>

      <b-col
        md="6"
        lg="6"
      >
        <b-card
          _title="Humedad"
        >
          <div class="text-center">
            Actualizado el {{ currentTime() }}
          </div>
          <chartjs-component-line-chart
            v-if="dataTemp.labels.length > 0"
            :key="componentHumKey"
            :height="250"
            :data="dataHum"
            :options="optionsHum"
          />
          <!-- <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            class="mt-2"
            variant="outline-primary"
          >
            Ver más
          </b-button> -->
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BCard, BCardText, BCardTitle, BButton, BRow, BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import moment from 'moment'
import dotenv from 'dotenv'
import ChartjsComponentLineChart from './charts-components/ChartjsComponentLineChart.vue'

dotenv.config()

export default {

  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BCardText,
    BCardTitle,
    ChartjsComponentLineChart,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      bgDoorCard: '',
      timeDoorStatus: '',
      currentTemperature: '',
      currentHumidity: '',

      dataTemp: {
        labels: [], // Dates
        datasets: [
          {
            data: [], // Temperatures
            label: 'Temperatura',
            borderColor: '#FFA533',
            fill: true,
          },
        ],
      },
      optionsTemp: {
        title: {
          display: true,
          text: 'Temperatura ambiente (en grados centígrados)',
        },
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback(value) {
                return `$${value}`
              },
            },
          },
        },
      },

      dataHum: {
        labels: [], // Dates
        datasets: [
          {
            data: [], // Humedad
            label: 'Humedad',
            borderColor: '#33D4FF',
            fill: true,
          },
        ],
      },
      optionsHum: {
        title: {
          display: true,
          text: 'Humedad ambiente (en porcentaje)',
        },
      },

      dataDoor: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      optionsDoor: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050',
        },
      },

      intervalDoorValue: null,
      intervalAmbientValue: null,

      componentTempKey: 0,
      componentHumKey: 0,
    }
  },

  beforeMount() {
    this.doorStatus()
    this.getAmbientData()
  },

  created() {
    this.loadDoorData()
    this.loadAmbientData()
  },
  beforeDestroy() {
    clearInterval(this.intervalDoorValue)
    clearInterval(this.intervalAmbientValue)
  },

  methods: {
    currentTime() {
      return moment().format('DD/MM/YYYY, h:mm:ss a')
    },
    forceRerender() {
      this.componentTempKey += 1
      this.componentHumKey += 1
    },

    loadDoorData() {
      if (this.intervalDoorValue) return // I was hoping this would prevent 2nd kick-off, but nope
      const intervalDoorValue = setInterval(() => {
        this.doorStatus()
      }, 5000)
      this.intervalDoorValue = intervalDoorValue
    },

    loadAmbientData() {
      if (this.intervalAmbientValue) return // I was hoping this would prevent 2nd kick-off, but nope
      const intervalAmbientValue = setInterval(() => {
        this.getAmbientData()
        this.forceRerender()
      }, 30000)
      this.intervalAmbientValue = intervalAmbientValue
    },

    async doorStatus() {
      await fetch(`${process.env.VUE_APP_REST_API}/door/status`)
        .then(response => response.json())
        .then(res => {
          if (res.length > 0) {
            if (res[0].DOOR_OPEN_STATUS === 'OPEN') {
              this.bgDoorCard = 'danger'
              this.timeDoorStatus = `Abierta el ${moment(res[0].TIME).format('DD/MM/YYYY, h:mm:ss a')}`
            }

            if (res[0].DOOR_OPEN_STATUS === 'CLOSE') {
              this.bgDoorCard = 'success'
              this.timeDoorStatus = `Cerrada el ${moment(res[0].TIME).format('DD/MM/YYYY, h:mm:ss a')}`
            }
          }
        })
    },

    async getAmbientData() {
      this.dataTemp.datasets[0].data = []
      this.dataTemp.labels = []

      this.dataHum.datasets[0].data = []
      this.dataHum.labels = []

      await fetch(`${process.env.VUE_APP_REST_API}/temperature/top`)
        .then(response => response.json())
        .then(res => {
          if (res.length > 0) {
            res.forEach(element => {
              const hour = element.TIME.split(' ')

              this.dataTemp.labels.push(hour[1].slice(0, -3))
              this.dataHum.labels.push(hour[1].slice(0, -3))

              // Grafica 1
              this.dataTemp.datasets[0].data.push(element.TEMPC_SHT)

              // Grafica 2
              this.dataHum.datasets[0].data.push(element.HUM_SHT)

              this.currentHumidity = element.HUM_SHT
              this.currentTemperature = element.TEMPC_SHT
            })
          }
        })
    },
  },
}
</script>
