if (typeof global === "undefined") {
  window.global = window;
} // ← Yeh line bahut important hai
import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router"; // ← Yeh line add karo
import "./main.css";

const app = createApp(App);

app.use(router);
// main.js / main.ts

app.mount("#app");
