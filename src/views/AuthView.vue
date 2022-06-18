<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

type auth = "register" | "login";

let authState = ref<auth>("login");
</script>

<template>
  <div>
    <main>
      <div class="p-4 bg-light w-100 mx-auto mt-3 text-dark auth_box">
        <div class="d-flex justify-content-center align-items-center mb-2">
          <img src="../assets/weather.png " class="logo me-1" />
          <h3 class="text-center">Weather app</h3>
        </div>
        <LoginForm
          v-if="authState === 'login'"
          @change-state="(state) => (authState = state)"
        />
        <RegisterForm v-else @change-state="(state) => (authState = state)" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth_box {
  max-width: 25rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.logo {
  width: 2.2rem;
  height: 2.2rem;
}

.logo + h3 {
  text-transform: uppercase;
}
</style>
