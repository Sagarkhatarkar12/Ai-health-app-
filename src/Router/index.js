import { createRouter, createWebHistory } from "vue-router";
import VideoCall from "../components/page/VIdeoCalling/videoCall.vue";
import Home from "../components/page/Home.vue";
import patient from "../components/page/medicine/medicineSearch.vue";
import Login from "../components/page/auth/LoginPage.vue";
import signup from "../components/page/auth/SignupPage.vue";
import patientDashboard from "../components/page/patient/patientDashboard.vue";
import DoctorDashboard from "../components/page/Doctor/DoctorDashboard.vue";
import ayurvedic from "../components/page/ayurvedic.vue";
import { useAuthStore } from "../stores/auth";
import AdminDashboard from "../components/page/Admin/admin.vue"
// import PatientLogin from './pages/PatientLogin.vue'
const routes = [
  {
    path: "/login",
    name: "Login",
    // component: () => import('./components/auth/Login.vue')
    component: Login,
  },

  {
    path: "/call/:roomId",
    name: "VideoCall",
    component: VideoCall,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/medicine-search",
    name: "patient",
    component: patient,
  },
  {
    path: "/api/register",
    name: "reigster",
    component: signup,
  },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: signup
  // },
  {
    path: "/patient/dashboard",
    name: "PatientDashboard",
    component: patientDashboard,
  },
  {
    path: "/doctor/dashboard",
    name: "DoctorDashboard",
    component: DoctorDashboard,
  },
  {
    path: "/ayurvedic-chatbot",
    name: "AyurvedicChatbot",
    component: ayurvedic,
  },

  {

    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  // Baad mein dashboard routes add kar sakte ho
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Global navigation guard – yeh har route change se pehle chalta hai
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated; // or !!authStore.token
  console.log(isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Not logged in – redirect to login page and save the intended destination
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next(); // proceed
  }
});

export default router;
