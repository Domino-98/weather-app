<script setup lang="ts">
import { userStore } from "./stores/userStore";
import { RouterView } from "vue-router";
import { supabase } from "./supabase";

const store = userStore();

supabase.auth.onAuthStateChange(async (event) => {
  if (event !== "SIGNED_OUT") {
    store.userLoggedIn = true;
  } else {
    store.userLoggedIn = false;
  }
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="scale" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
@import "@/assets/base.css";

#app {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  background-color: #86c0ff;
  font-weight: normal;
}

#app::before {
  position: fixed;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../public/assets/bg.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  will-change: transform;
}
</style>
