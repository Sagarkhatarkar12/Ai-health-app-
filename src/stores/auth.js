import { defineStore } from "pinia";
import api from "../services/api";
// import router from '@/router'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role,
  },

  actions: {
    async login(email, password) {
      try {
        console.log(email, password);
        // alert(email);
        const response = await api.post("/api/login", { email, password });

        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem("token", this.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        console.log("Response hai apna "+response);
        // this.user = response.user;
        console.log(this.user);
        // router.push("/patient/dashboard");
        return response;
      } catch (error) {
        throw error;
      }
    },

    async signUp(paylaod) {
      try {
        console.log("signUp store" + paylaod);
        const response = await api.post("/api/register", { paylaod });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      // router.push("/login");
    },

    async fetchProfile() {
      if (!this.token) return;
      try {
        const response = await api.get("/api/auth/me");
        this.user = response.data.user;
      } catch {
        this.logout();
      }
    },
  },
});
