import { createRouter, createWebHistory } from 'vue-router'
import VideoCall from '../components/page/VIdeoCalling/videoCall.vue'
import Home from '../components/page/Home.vue';
// import PatientDashboard from './pages/PatientDashboard.vue'
import patient from "../components/page/PatientDashboard.vue"
import DoctorDashboard from '../components/page/doctorDashboard.vue'
import signup from '../components/page/SignupPage.vue'
// import DoctorLogin from './pages/DoctorLogin.vue'
// import NotFound from './pages/NotFound.vue'
// import PatientLogin from './pages/PatientLogin.vue'
const routes = [
  {
    path: '/signup',
    name: 'Signup',
    // component: () => import('./components/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./components/auth/Login.vue')
  },
   
  {
    path: "/call/:roomId",
    name: "VideoCall",
    component: VideoCall,
  },
  {
    path: '/',
    name: 'Home',
    component: Home

  },
    {
    path: '/patient',
    name: 'patient',
    component:patient

  },
  {
    path: '/doctor',
    name: 'DoctorDashboard',
    component: signup

  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }



  // Baad mein dashboard routes add kar sakte ho
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router