import { createRouter, createWebHistory } from 'vue-router'
import VideoCall from '../components/page/VIdeoCalling/videoCall.vue'

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('./components/auth/Signup.vue')
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



  // Baad mein dashboard routes add kar sakte ho
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router