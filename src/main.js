import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'        // ← Yeh line add karo
import './main.css'

const app = createApp(App)

app.use(router)                       // ← Yeh line bahut important hai

app.mount('#app')