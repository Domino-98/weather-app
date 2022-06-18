import { defineStore } from "pinia";
import type { City } from '../../models/city'

export const weatherStore = defineStore({
  id: "weatherStore",
  state: () => ({
    watchedCities: <any>[],
  }),
  getters: {
    cityIds: (state) => {
      return state.watchedCities.map((c: any) => c.id);
    },
  },
  actions: {
    addToWatched(city: City) {
       if (this.watchedCities.some((c: City) => c.id === city.id)) return;
      this.watchedCities.push(city);
    },
    removeFromWatched(cityId: number) {
      let index = this.watchedCities
        .map((c: any) => {
          return c.id;
        })
        .indexOf(cityId);

      this.watchedCities.splice(index, 1);
    },
    setCities(cities: any) {
      this.watchedCities = cities;
      console.log(cities);
    }
  },
  persist: true,
});
