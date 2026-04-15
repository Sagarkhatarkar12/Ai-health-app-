import { createRouter, createWebHistory } from 'vue-router'
import VideoCall from '../components/page/VIdeoCalling/videoCall.vue'
import Home from '../components/page/Home.vue';
// import PatientDashboard from './pages/PatientDashboard.vue'
import patient from "../components/page/PatientDashboard.vue"
import Login from "../components/page/LoginPage.vue"
// import DoctorDashboard from '../components/page/doctorDashboard.vue'
import signup from '../components/page/SignupPage.vue'
// import DoctorLogin from './pages/DoctorLogin.vue'
// import NotFound from './pages/NotFound.vue'
import patientDashboard  from "../components/page/patient/patientDashboard.vue"
// import DoctorDashboard from "../components/page/Doctor/DoctorDashboard.vue"
import DoctorDashboard from "../components/page/Doctor/DoctorDashboard.vue"
import ayurvedic from "../components/page/ayurvedic.vue"
// import PatientLogin from './pages/PatientLogin.vue'
const routes = [

  {
    path: '/login',
    name: 'Login',
    // component: () => import('./components/auth/Login.vue')
    component:Login

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
    path: '/api/register',
    name: 'reigster',
    component: signup

  },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: signup
  // },
  {
    path:'/patient/dashboard',
    name:"PatientDashboard",
    component:patientDashboard

  }
  ,{
    path:'/doctor/dashboard',
    name:"DoctorDashboard",
    component:DoctorDashboard

  },
  {
 path:'/ayurvedic-chatbot',
 name:"AyurvedicChatbot",
 component:ayurvedic,
  }



  // Baad mein dashboard routes add kar sakte ho
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router