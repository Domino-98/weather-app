import { createRouter, createWebHistory } from "vue-router";
import ChartView from "../views/ChartView.vue";
import WeatherView from "../views/WeatherView.vue";
import AuthView from "../views/AuthView.vue";
import { userStore } from "../stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/weather",
    },
    {
      path: "/chart/:id",
      name: "chart",
      component: ChartView,
    },
    {
      path: "/weather",
      name: "weather",
      component: WeatherView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = userStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.userLoggedIn) {
      next();
    } else {
      next("/auth");
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const store = userStore();

  if (to.name === "auth" && store.userLoggedIn) next({ name: "weather" });

  next();
});

export default router;
