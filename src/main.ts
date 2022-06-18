
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Toast);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
