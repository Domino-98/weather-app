<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import axios from "axios";

const route = useRoute();
const id = route.params.id;

const cityName = ref<string>("");
const dates = ref<[]>([]);
const temperature = ref<[]>([]);
const humidity = ref<[]>([]);

Chart.register(...registerables);

const testData = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: "Temperatura (°C)",
      data: temperature.value,
      backgroundColor: ["#001040"],
      borderColor: "#3366ff",
      yAxisID: "y",
    },
    {
      label: "Wilgotność (%)",
      data: humidity.value,
      backgroundColor: ["#0d66ff"],
      borderColor: "#5cceff",
      yAxisID: "y1",
    },
  ],
}));

const options = ref({
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "(5 kolejnych dni co 3 godziny)",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Temperatura",
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      title: {
        display: true,
        text: "Wilgotność",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
});

// Fetch city weather info, push destructured properties to new arrays
const getWeatherInfo = async () => {
  try {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    console.log(res.data);
    cityName.value = res.data.city.name;

    dates.value = res.data.list
      .map((item: any) => {
        const { dt_txt: date } = item;
        return date;
      })
      .map((date: string) => date.slice(0, -3));

    temperature.value = res.data.list.map((item: any) => {
      const { temp } = item.main;
      return temp;
    });

    humidity.value = res.data.list.map((item: any) => {
      const { humidity } = item.main;
      return humidity;
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch weather data when component is mounted
onMounted(() => {
  getWeatherInfo();
});
</script>

<template>
  <div>
    <main>
      <div class="chart-box w-100 mx-auto text-dark">
        <h3 class="text-center">
          Wykres temperatury i wilgotności w czasie dla miasta {{ cityName }}
        </h3>

        <LineChart
          :options="options"
          cssClasses="chart-container bg-light"
          :chart-data="testData"
        />

        <div class="text-center mt-4">
          <router-link :to="{ name: 'weather' }" class="btn btn-outline"
            >Wróć do listy miast</router-link
          >
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.chart-box {
  max-width: 50rem;
}
.chart-container {
  margin-top: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>
