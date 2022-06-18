<script setup lang="ts">
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { userStore } from "../stores/userStore";
const store = userStore();
const { loginUser } = store;

const email = ref<string>("");
const password = ref<string>("");

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email jest wymagany").email("Email jest nieprawidłowy"),
  password: Yup.string().required("Hasło jest wymagane"),
});

function login(values: any) {
  const { email, password } = values;
  console.log(email, password);
  loginUser(email, password);
}
</script>

<template>
  <Form @submit="login" :validation-schema="loginSchema" v-slot="{ errors }">
    <h4 class="text-center mb-3">Zaloguj się</h4>
    <div v-show="store.loading" class="alert alert-info text-center" role="alert">
      Trwa logowanie...
    </div>
    <div v-show="store.successMsg" class="alert alert-success text-center" role="alert">
      {{ store.successMsg }}
    </div>
    <div v-show="store.errorMsg" class="alert alert-danger text-center" role="alert">
      {{ store.errorMsg }}
    </div>
    <div class="form-floating mb-3">
      <Field
        :class="{ 'is-invalid': errors.email }"
        name="email"
        type="email"
        class="form-control"
        id="email"
        placeholder="name@example.com"
      />
      <label for="email">Adres email</label>
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>
    <div class="form-floating mb-3">
      <Field
        :class="{ 'is-invalid': errors.password }"
        name="password"
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
      />
      <label for="password">Hasło</label>
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>
    <p class="text-center mb-2">
      Nie masz konta?
      <span
        @click="
          $emit('changeState', 'register'), (store.errorMsg = ''), (store.successMsg = '')
        "
        class="text-info"
        style="cursor: pointer"
        >Zarejestruj się</span
      >
    </p>
    <div class="text-center">
      <button type="submit" class="btn btn-outline">Zaloguj się</button>
    </div>
  </Form>
</template>

<style scoped></style>
