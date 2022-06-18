<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userStore } from "@/stores/userStore";
import { weatherStore } from "@/stores/weatherStore";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { TYPE } from "vue-toastification";
import { POSITION } from "vue-toastification";
import cities from "../../data/city.list.json";
import axios from "axios";
import type { City } from "../../models/city";
import CityCard from "../components/CityCard.vue";

const uStore = userStore();
const wStore = weatherStore();

const { addToWatched, removeFromWatched, setCities } = wStore;
const { signOut } = uStore;
const { watchedCities } = storeToRefs(wStore);

const cityInput = ref<string>("");

// Fetch weather data with id's from weather store
const getWeatherInfo = async () => {
  try {
    if (wStore.watchedCities.length > 0) {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/group?id=${wStore.cityIds.join(
          ","
        )}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setCities(res.data.list);
    }
  } catch (error) {
    console.log(error);
  }
};

// Find city in json file, add to the weather store
const getCity = () => {
  let foundCity: City;
  foundCity = cities.find(
    (c) => c.name.toLowerCase() === cityInput.value.toLowerCase()
  ) as City;
  if (!foundCity) {
    toastInfo("Nie znaleziono miasta!", TYPE.ERROR);
  } else {
    if (wStore.watchedCities.some((c: any) => c.id === foundCity?.id)) {
      toastInfo("Miasto znajduje się już na liście!", TYPE.INFO);
    } else {
      addToWatched(foundCity);
      getWeatherInfo();
      toastInfo("Miasto pomyślnie dodane!", TYPE.SUCCESS);
      cityInput.value = "";
    }
  }
};

const toast = useToast();

const toastInfo = (msg: string, toastType: TYPE) => {
  toast(msg, {
    type: toastType,
    timeout: 2000,
    position: POSITION.BOTTOM_RIGHT,
  });
};

// Fetch weather data when component is mounted
onMounted(() => {
  getWeatherInfo();
});

// Fetch weather data every 60s
setInterval(() => getWeatherInfo(), 60000);
</script>

<template>
  <div>
    <main>
      <div class="p-3 p-md-4 bg-light w-100 mx-auto mt-1 w-100 text-dark weather_box">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-fill me-3 me-md-5">
            <input
              v-model="cityInput"
              @keyup.enter="getCity"
              type="text"
              id="form1"
              placeholder="Wyszukaj miasto"
              class="p-1 p-md-2 form-control"
            />
            <button @click="getCity" type="button" class="btn btn-outline search-btn">
              <i class="bi bi-search"></i>
            </button>
          </div>

          <button
            title="Wyloguj się"
            @click="signOut"
            type="button"
            class="btn btn-outline"
          >
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>

        <h4 class="fs-4 mt-3 mb-3">Obeserwowane miasta</h4>
        <div class="container-fluid">
          <div v-if="watchedCities.length > 0" class="row gap-3">
            <TransitionGroup name="slide">
              <CityCard
                v-for="city in watchedCities"
                :key="city.id"
                :id="city.id"
                :name="city.name"
                :temp="city?.main?.temp"
                :humidity="city?.main?.humidity"
                :icon="city?.weather?.[0]?.icon"
                @remove-from-watched="removeFromWatched"
              />
            </TransitionGroup>
          </div>
          <div v-else class="alert alert-info text-center" role="alert">
            Wyszukaj miasto by dodać je do obserowowanych
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.weather_box {
  max-width: 50rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

input[type="text"] {
  border-radius: 0;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
.form-control:focus {
  border-color: #8dd5ff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(79, 217, 255, 0.4);
}
.search-btn {
  border-radius: 0;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.bi-box-arrow-right {
  font-size: 1.4rem;
}
</style>
