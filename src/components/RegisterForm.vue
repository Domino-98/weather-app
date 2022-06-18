<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { userStore } from "../stores/userStore";
const store = userStore();
const { registerUser } = store;

const registerSchema = Yup.object().shape({
  email: Yup.string().required("Email jest wymagany").email("Email jest nieprawidłowy"),
  password: Yup.string()
    .min(6, "Hasło musi zawierać minimum 6 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła nie pasują do siebie")
    .required("Potwierdzenie hasła jest wymagane"),
});

function register(values: any) {
  const { email, password } = values;
  console.log(email, password);
  registerUser(email, password);
}
</script>

<template>
  <Form @submit="register" :validation-schema="registerSchema" v-slot="{ errors }">
    <h4 class="text-center mb-3">Zarejestruj się</h4>
    <div v-show="store.loading" class="alert alert-info text-center" role="alert">
      Trwa rejestracja...
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
        id="floatingInput"
        placeholder="name@example.com"
        required
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
        id="floatingPassword"
        placeholder="Password"
        required
      />
      <label for="password">Hasło</label>
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>
    <div class="form-floating mb-3">
      <Field
        :class="{ 'is-invalid': errors.confirmPassword }"
        name="confirmPassword"
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        required
      />
      <label for="password">Powtórz hasło</label>
      <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
    </div>
    <p class="text-center mb-2">
      Masz już konto?
      <span
        @click="
          $emit('changeState', 'login'), (store.errorMsg = ''), (store.successMsg = '')
        "
        class="text-info"
        style="cursor: pointer"
        >Zaloguj się</span
      >
    </p>
    <div class="text-center">
      <button type="submit" class="btn btn-outline">Zarejestruj się</button>
    </div>
  </Form>
</template>

<style scoped></style>
