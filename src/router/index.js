import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dp_index from '../views/Dp_index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dp_index',
      name: 'dp_index',
      component: Dp_index,
    },
  ],
})

export default router
