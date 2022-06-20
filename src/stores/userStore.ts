import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "../router/index";

export const userStore = defineStore({
  id: "userStore",
  state: () => ({
    userLoggedIn: false,
    loading: false,
    successMsg: "",
    errorMsg: "",
  }),
  getters: {},
  actions: {
    async loginUser(email: string, password: string) {
      try {
        this.successMsg = "";
        this.loading = true;
        const { user, session, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        if (error) return (this.errorMsg = error.message);
        this.successMsg = "Pomyślnie zalogowano!";
        this.errorMsg = "";
        this.userLoggedIn = true;
        router.push({ name: "weather" });
      } catch (error) {
        if (error instanceof Error) {
          this.errorMsg = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
    async registerUser(email: string, password: string) {
      try {
        this.loading = true;
          const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          if (error) return (this.errorMsg = error.message);
          this.successMsg = "Pomyślnie zarejestrowano!";
          this.errorMsg = "";
          this.userLoggedIn = true;
          router.push({ name: "weather" });
      } catch (error) {
        if (error instanceof Error) {
          this.errorMsg = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
    async signOut() {
      try {
        this.successMsg = "Pomyślnie wylogowano!";
        supabase.auth.signOut();
        router.push({ name: "auth" });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
