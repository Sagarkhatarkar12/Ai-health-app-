import { defineStore } from "pinia";
import api from "../services/api";
// import router from '@/router'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    doctoruser:null,
    doctorProfile: null, // Naya state doctor profile ke liye
    token: localStorage.getItem("token") || null,

  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role,
  },

  actions: {
    async login(email, password) {
      try {
        console.log("login store");
        console.log(email, password);

        const response = await api.post("/auth/login", { email, password });

        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem("token", this.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        console.log("Response hai apna " + response);
        // this.user = response.user;
      return response;
        
      } catch (error) {
        throw error;
      }
    },

    async signUp(paylaod) {
      try {
        console.log("signUp store");

        const response = await api.post("/api/auth/register", paylaod, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
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
        console.log("Fetch profile response:",response.data)
        // this.doctoruser = response.data.user;

        // Jab bhi profile fetch ho aur role doctor ho, doctor details bhi le lo
        if (this.user.role === "doctor") {
          await this.fetchDoctorProfile(response.data.user._id);
        }
      } catch {
        this.logout();
      }
    },
    // 👇 Naya action – doctor profile fetch karne ke liye
    async fetchDoctorProfile(id) {
      try {
        // Assume karte hain ki backend mein /api/doctors/profile/me endpoint hai
        // jo logged-in doctor ki details return karta hai (specialization, experience, fees, etc.)
        const response = await api.get("/api/doctors/profile/me");
        // this.doctorProfile = response.data.doctor; // ya response.data, jaisa backend bhejega

      } catch (error) {
        console.error("Failed to fetch doctor profile", error);
        // Agar error aaye toh doctorProfile ko null rakhenge, dashboard fallback UI dikha sakta hai
        this.doctorProfile = null;
      }
    },
  },
});
