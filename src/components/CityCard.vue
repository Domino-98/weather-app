<script setup lang="ts">
interface CityWeather {
  id: number;
  name: string;
  temp?: number;
  humidity?: number;
  icon?: string;
}

const props = defineProps<CityWeather>();
</script>

<template>
  <div
    class="weather_card flex-grow-1"
    :style="[
      icon
        ? {
            backgroundImage: `url(./assets/${icon}.jpg)`,
          }
        : '',
    ]"
  >
    <div class="d-flex flex-column h-100">
      <div class="text-white mb-auto card_info">
        <div class="d-flex justify-content-between">
          <p class="text-center fs-4">{{ name }}</p>
          <img
            class="weather_icon"
            :src="icon ? `http://openweathermap.org/img/wn/${icon}@2x.png` : ''"
          />
        </div>

        <div class="d-flex justify-content-between">
          <p class="card_text">
            W <span class="fw-bold">{{ humidity }}</span
            >%
          </p>
          <p class="card_text">
            <span class="fw-bold">{{ temp }}</span
            ><sup class="fs-6">°C</sup>
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-between card_buttons">
        <button
          title="Usuń z obserwowanych"
          @click="$emit('removeFromWatched', id)"
          class="btn btn-sm btn-danger remove_btn left-50"
        >
          <i class="bi bi-trash-fill"></i>
        </button>
        <router-link :to="{ name: 'chart', params: { id: id } }"
          ><i title="Wyświetl prognoze" class="bi bi-graph-up"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather_card {
  width: calc(33% - 1rem);
  min-height: 15rem;
  padding: 1rem;
  overflow: hidden;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@media screen and (max-width: 900px) {
  .weather_card {
    width: calc(50% - 1rem);
  }
}
@media screen and (max-width: 600px) {
  .weather_card {
    width: 100%;
  }
}

.weather_card:before {
  content: "";
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.3);
}

.weather_card .card_buttons {
  visibility: visible;
  opacity: 1;
}

.weather_card:hover .card_buttons {
  visibility: visible;
  opacity: 1;
}

@media (hover: hover) {
  .weather_card .card_buttons {
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s;
  }
}

.card_info,
.card_buttons {
  z-index: 100;
}

.remove_btn {
  width: 2.4rem;
  height: 2.4rem;
}

.weather_icon {
  width: 4rem;
  height: 4rem;
}
.card_text {
  font-size: 1.4rem;
}
.bi-graph-up {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.25rem;
  background-color: #eee;
  font-size: 1.4rem;
  color: #000;
}
</style>
